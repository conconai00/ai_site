// Notion API クライアント
// https://developers.notion.com/reference

import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import type { Article, Category, PromptOutput } from './mock-data';

// ============================================
// Notion クライアントの初期化
// ============================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notion = new Client({ auth: process.env.NOTION_API_KEY }) as any;

const n2m = new NotionToMarkdown({ notionClient: notion });

const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

// ============================================
// Notionのプロパティ取得ヘルパー
// ============================================

/** テキストプロパティを文字列として取得 */
function getText(property: Record<string, unknown>): string {
    if (!property) return '';
    const prop = property as { type: string; title?: Array<{ plain_text: string }>; rich_text?: Array<{ plain_text: string }> };
    if (prop.type === 'title') {
        return prop.title?.map((t) => t.plain_text).join('') ?? '';
    }
    if (prop.type === 'rich_text') {
        return prop.rich_text?.map((t) => t.plain_text).join('') ?? '';
    }
    return '';
}

/** Selectプロパティを文字列として取得 */
function getSelect(property: Record<string, unknown>): string {
    const prop = property as { type: string; select?: { name: string } | null };
    return prop?.select?.name ?? '';
}

/** Multi-selectプロパティを文字列配列として取得 */
function getMultiSelect(property: Record<string, unknown>): string[] {
    const prop = property as { type: string; multi_select?: Array<{ name: string }> };
    return prop?.multi_select?.map((s) => s.name) ?? [];
}

/** Checkboxプロパティを真偽値として取得 */
function getCheckbox(property: Record<string, unknown>): boolean {
    const prop = property as { type: string; checkbox?: boolean };
    return prop?.checkbox ?? false;
}

/** Dateプロパティを文字列として取得 */
function getDate(property: Record<string, unknown>): string {
    const prop = property as { type: string; date?: { start: string } | null };
    return prop?.date?.start ?? new Date().toISOString();
}

/** Filesプロパティから最初のURLを取得（サムネイル画像） */
function getFileUrl(property: Record<string, unknown>): string | undefined {
    const prop = property as {
        type: string;
        files?: Array<{ type: string; file?: { url: string }; external?: { url: string } }>;
    };
    const files = prop?.files;
    if (!files || files.length === 0) return undefined;
    const first = files[0];
    return first.type === 'file' ? first.file?.url : first.external?.url;
}

// ============================================
// Notionデータベースからカテゴリ一覧を動的取得
// ============================================
export async function getCategoriesFromNotion(): Promise<(Category | 'すべて')[]> {
    try {
        // データベースのスキーマ（プロパティ定義）を取得
        const db = await notion.databases.retrieve({ database_id: DATABASE_ID }) as {
            properties: Record<string, {
                type: string;
                select?: { options: Array<{ name: string }> }
            }>
        };

        const categoryProp = db.properties['カテゴリ'];
        if (!categoryProp || categoryProp.type !== 'select') {
            return ['すべて'];
        }

        // selectのオプション名を取得
        const cats = (categoryProp.select?.options ?? []).map((o) => o.name as Category);
        return ['すべて', ...cats];
    } catch (e) {
        console.error('[Notion] カテゴリ取得エラー:', e);
        return ['すべて'];
    }
}

// ============================================
// 記事一覧を取得（公開済みのみ）
// ============================================
export async function getArticlesFromNotion(): Promise<Article[]> {
    const response = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
            property: '公開状態',
            checkbox: { equals: true },
        },
        sorts: [
            {
                property: '作成日',
                direction: 'descending',
            },
        ],
    });

    const articles: Article[] = [];

    for (const page of response.results) {
        if (page.object !== 'page') continue;
        const notionPage = page as { id: string; properties: Record<string, Record<string, unknown>> };
        const props = notionPage.properties;

        // ページIDをスラッグとして使用（ハイフン除去）
        const id = notionPage.id.replace(/-/g, '');

        // プロパティを取得
        const title = getText(props['タイトル']);
        const description = getText(props['説明']);
        const category = getSelect(props['カテゴリ']) as Category;
        const tags = getMultiSelect(props['タグ']);
        const tools = getMultiSelect(props['使用ツール']);
        const createdAt = getDate(props['作成日']);
        const emoji = getSelect(props['絵文字']) || '📄';
        const thumbnailUrl = getFileUrl(props['サムネイル']);

        // 本文からプロンプトと成果物を取得
        const { prompt, outputs } = await getPageContent(notionPage.id);

        const note = getText(props['注意書き']) || undefined;

        const article: Article = {
            id,
            slug: id,
            title,
            description,
            category: (category as Category) || 'その他',
            tags,
            tools: tools.length > 0 ? tools : undefined,
            note,
            prompt,
            outputs: outputs.length > 0
                ? outputs
                : thumbnailUrl
                    ? [{ type: 'image', content: thumbnailUrl, alt: title }]
                    : [],
            createdAt,
            emoji,
        };

        articles.push(article);
    }

    return articles;
}

// ============================================
// 記事詳細を取得（スラッグ = Notion page ID）
// ============================================
export async function getArticleFromNotion(slug: string): Promise<Article | undefined> {
    try {
        // ページIDを復元（ハイフンなし → Notionのフォーマットに変換）
        const pageId = slug.replace(
            /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
            '$1-$2-$3-$4-$5'
        );

        const page = await notion.pages.retrieve({ page_id: pageId });
        if (page.object !== 'page') return undefined;

        const notionPage = page as { id: string; properties: Record<string, Record<string, unknown>> };
        const props = notionPage.properties;

        const title = getText(props['タイトル']);
        const description = getText(props['説明']);
        const category = getSelect(props['カテゴリ']) as Category;
        const tags = getMultiSelect(props['タグ']);
        const tools = getMultiSelect(props['使用ツール']);
        const createdAt = getDate(props['作成日']);
        const emoji = getSelect(props['絵文字']) || '📄';

        const { prompt, outputs } = await getPageContent(notionPage.id);

        return {
            id: slug,
            slug,
            title,
            description,
            category: (category as Category) || 'その他',
            tags,
            tools: tools.length > 0 ? tools : undefined,
            prompt,
            outputs,
            createdAt,
            emoji,
        };
    } catch {
        return undefined;
    }
}

// ============================================
// Notionページの本文から「プロンプト」と「成果物」を抽出
//
// 【Notionの記事構成ルール】
//  ─────────────────────────
//  # （h1）セクション「プロンプト」
//  ```（コードブロック） ← プロンプト本文
//  -----------------------
//  # （h1）セクション「成果物」
//  （テキストや画像ブロック） ← 成果物
// ============================================
async function getPageContent(pageId: string): Promise<{
    prompt: string;
    outputs: PromptOutput[];
}> {
    // ブロックを取得
    const blocks = await notion.blocks.children.list({ block_id: pageId });

    let prompt = '';
    const outputs: PromptOutput[] = [];
    let section: 'none' | 'prompt' | 'output' = 'none';

    for (const block of blocks.results) {
        const b = block as {
            type: string;
            heading_1?: { rich_text: Array<{ plain_text: string }> };
            code?: { rich_text: Array<{ plain_text: string }>; language: string };
            paragraph?: { rich_text: Array<{ plain_text: string }> };
            image?: {
                type: string;
                file?: { url: string };
                external?: { url: string };
                caption?: Array<{ plain_text: string }>;
            };
        };

        // h1セクションの判定
        if (b.type === 'heading_1') {
            const headingText = b.heading_1?.rich_text.map((t) => t.plain_text).join('') ?? '';
            if (headingText.includes('プロンプト')) {
                section = 'prompt';
            } else if (headingText.includes('成果物') || headingText.includes('出力')) {
                section = 'output';
            }
            continue;
        }

        // プロンプトセクション: コードブロックを取得
        if (section === 'prompt' && b.type === 'code') {
            prompt = b.code?.rich_text.map((t) => t.plain_text).join('') ?? '';
        }

        // 成果物セクション: テキストと画像を取得
        if (section === 'output') {
            if (b.type === 'paragraph') {
                const text = b.paragraph?.rich_text.map((t) => t.plain_text).join('') ?? '';
                if (text.trim()) {
                    // 既存のテキスト出力に追記 or 新規追加
                    const lastOutput = outputs[outputs.length - 1];
                    if (lastOutput && lastOutput.type === 'text') {
                        lastOutput.content += '\n' + text;
                    } else {
                        outputs.push({ type: 'text', content: text });
                    }
                }
            }

            if (b.type === 'image') {
                const imageUrl = b.image?.type === 'file' ? b.image.file?.url : b.image?.external?.url;
                const alt = b.image?.caption?.map((c) => c.plain_text).join('') || '生成された画像';
                if (imageUrl) {
                    outputs.push({ type: 'image', content: imageUrl, alt });
                }
            }
        }
    }

    return { prompt, outputs };
}
