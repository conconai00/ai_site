import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchArticle, fetchAllSlugs } from '@/lib/data';
import { categoryColors } from '@/lib/mock-data';
import PromptBlock from '@/components/PromptBlock';
import styles from './page.module.css';

// 60秒ごとにNotionから最新データを再取得（ISR）
export const revalidate = 60;

// 静的パス生成
export async function generateStaticParams() {
    const slugs = await fetchAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

// メタデータ生成
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await fetchArticle(slug);
    if (!article) return { title: '記事が見つかりません' };
    return {
        title: `${article.title} | コンの巻物`,
        description: article.description,
    };
}

// 日付フォーマット
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await fetchArticle(slug);

    // 記事が存在しない場合は404
    if (!article) {
        notFound();
    }

    // 最初のカテゴリで色を決定（マルチセレクト対応）
    const primaryCategory = article.category[0];
    const categoryColor = categoryColors[primaryCategory] ?? categoryColors['その他'];

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                {/* パンくずリスト */}
                <nav className={styles.breadcrumb}>
                    <Link href="/" className={styles.breadcrumbLink}>ホーム</Link>
                    <span className={styles.breadcrumbSep}>›</span>
                    <span className={styles.breadcrumbCurrent}>{article.title}</span>
                </nav>

                {/* 記事ヘッダー */}
                <header className={styles.articleHeader}>
                    {/* カテゴリバッジ（複数対応） */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {article.category.map((cat) => {
                            const color = categoryColors[cat] ?? categoryColors['その他'];
                            return (
                                <span
                                    key={cat}
                                    className={styles.categoryBadge}
                                    style={{ backgroundColor: color.bg, color: color.text }}
                                >
                                    {cat}
                                </span>
                            );
                        })}
                    </div>

                    {/* タイトル */}
                    <h1 className={styles.title}>{article.title}</h1>

                    {/* 説明文 */}
                    <p className={styles.description}>{article.description}</p>

                    {/* メタ情報 */}
                    <div className={styles.meta}>
                        <div className={styles.metaLeft}>
                            <Image
                                src="/kon_icon.png"
                                alt="コン"
                                width={28}
                                height={28}
                                className={styles.authorIcon}
                            />
                            <span className={styles.authorName}>コン</span>
                            <span className={styles.metaSep}>·</span>
                            <time className={styles.date} dateTime={article.createdAt}>
                                {formatDate(article.createdAt)}
                            </time>
                        </div>

                        {/* タグ */}
                        <div className={styles.tags}>
                            {article.tags.map((tag) => (
                                <span key={tag} className={styles.tag}>#{tag}</span>
                            ))}
                        </div>
                    </div>
                </header>

                {/* ======================================
            記事本文
            ====================================== */}
                <article className={styles.articleBody}>

                    {/* ─── 使用ツール ─── */}
                    {article.tools && article.tools.length > 0 && (
                        <section className={styles.toolsSection}>
                            <div className={styles.sectionLabel}>
                                <span className={styles.sectionIcon}>🛠️</span>
                                <h2 className={styles.sectionTitle}>使用ツール</h2>
                            </div>
                            <div className={styles.toolsList}>
                                {article.tools.map((tool) => (
                                    <span key={tool} className={styles.toolBadge}>{tool}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ─── セクション1: プロンプト ─── */}

                    <section className={styles.section}>
                        <div className={styles.sectionLabel}>
                            <span className={styles.sectionIcon}>📜</span>
                            <h2 className={styles.sectionTitle}>プロンプト全文</h2>
                        </div>
                        <p className={styles.sectionNote}>
                            以下のプロンプトをコピーして、ChatGPT・Claude・Geminiなどにそのまま貼り付けてください。
                            <code className={styles.inlineCode}>{'{　}'}</code> の部分はあなたの情報に書き換えてください。
                        </p>

                        {/* ⭐️ コピーボタン付きプロンプトブロック */}
                        <PromptBlock prompt={article.prompt} label={article.title} />

                        {/* ⚠️ 注意書き（Notionで設定がある場合のみ表示） */}
                        {article.note && (
                            <div className={styles.noteBox}>
                                <span className={styles.noteIcon}>⚠️</span>
                                <p className={styles.noteText}>
                                    {/* Notionの改行（\n）を <br /> に変換して表示 */}
                                    {article.note.split('\n').map((line, i, arr) => (
                                        <span key={i}>
                                            {line}
                                            {i < arr.length - 1 && <br />}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        )}
                    </section>

                    <hr className={styles.sectionDivider} />

                    {/* ─── セクション2: 成果物 ─── */}
                    <section className={styles.section}>
                        <div className={styles.sectionLabel}>
                            <span className={styles.sectionIcon}>✨</span>
                            <h2 className={styles.sectionTitle}>生成された成果物</h2>
                        </div>
                        <p className={styles.sectionNote}>
                            上記のプロンプトをAIに入力した際の実際の出力例です。
                        </p>

                        <div className={styles.outputs}>
                            {article.outputs.map((output, index) => (
                                <div key={index} className={styles.output}>
                                    {output.type === 'image' ? (
                                        /* 画像成果物 */
                                        <div className={styles.outputImage}>
                                            <Image
                                                src={output.content}
                                                alt={output.alt || '生成された画像'}
                                                width={600}
                                                height={400}
                                                className={styles.outputImageEl}
                                            />
                                            {output.alt && (
                                                <p className={styles.outputCaption}>{output.alt}</p>
                                            )}
                                        </div>
                                    ) : output.type === 'video' ? (
                                        /* 動画成果物 */
                                        <div className={styles.outputVideo}>
                                            <video
                                                src={output.content}
                                                controls
                                                playsInline
                                                className={styles.outputVideoEl}
                                                preload="metadata"
                                            >
                                                お使いのブラウザは動画再生に対応していません。
                                            </video>
                                            {output.alt && (
                                                <p className={styles.outputCaption}>{output.alt}</p>
                                            )}
                                        </div>
                                    ) : (
                                        /* テキスト成果物 */
                                        <div className={styles.outputText}>
                                            <pre className={styles.outputPre}>
                                                <code>{output.content}</code>
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                </article>

                {/* 戻るボタン */}
                <div className={styles.backLinkWrapper}>
                    <Link href="/" className={styles.backLink}>
                        ← 一覧に戻る
                    </Link>
                </div>

            </div>
        </div>
    );
}
