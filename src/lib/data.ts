// データソース切り替えレイヤー
// 環境変数 NEXT_PUBLIC_DATA_SOURCE が "notion" の場合はNotion APIを使用
// それ以外（デフォルト）はモックデータを使用

import { mockArticles, getArticleBySlug as getMockArticle, allCategories, type Article } from './mock-data';

/** 記事一覧を取得 */
export async function fetchArticles(): Promise<Article[]> {
    if (process.env.NEXT_PUBLIC_DATA_SOURCE === 'notion') {
        // Notionからデータを取得（動的インポートで本番時のみbundle対象に）
        const { getArticlesFromNotion } = await import('./notion');
        return getArticlesFromNotion();
    }
    // モックデータを返す（Promise.resolve でラップ）
    return Promise.resolve(mockArticles);
}

/** スラッグから記事詳細を取得 */
export async function fetchArticle(slug: string): Promise<Article | undefined> {
    if (process.env.NEXT_PUBLIC_DATA_SOURCE === 'notion') {
        const { getArticleFromNotion } = await import('./notion');
        return getArticleFromNotion(slug);
    }
    return Promise.resolve(getMockArticle(slug));
}

/** 全スラッグ一覧を取得（静的パス生成用） */
export async function fetchAllSlugs(): Promise<string[]> {
    const articles = await fetchArticles();
    return articles.map((a) => a.slug);
}

/** カテゴリ一覧を取得（Notion連動 or モック） */
export async function fetchCategories() {
    if (process.env.NEXT_PUBLIC_DATA_SOURCE === 'notion') {
        const { getCategoriesFromNotion } = await import('./notion');
        return getCategoriesFromNotion();
    }
    // 記事から実際に使用されているカテゴリだけを抽出してもよいが、
    // モックデータの場合はallCategories定義をそのまま返す
    return Promise.resolve(allCategories);
}

