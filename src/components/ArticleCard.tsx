'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Article, categoryColors } from '@/lib/mock-data';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
    article: Article;
}

// 日付フォーマット（例: 2026年2月28日）
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

export default function ArticleCard({ article }: ArticleCardProps) {
    // 最初のカテゴリでバッジ色を決定（マルチセレクト対応）
    const primaryCategory = article.category[0];
    const categoryColor = categoryColors[primaryCategory] ?? categoryColors['その他'];

    return (
        <Link href={`/posts/${article.slug}`} className={styles.card}>
            {/* サムネイルエリア */}
            <div className={styles.thumbnail}>
                {/* 優先順位: 1. Notionの「サムネイル」 2. 最初の画像output 3. 絵文字 */}
                {article.thumbnail ? (
                    <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        className={styles.thumbnailImage}
                    />
                ) : article.outputs[0]?.type === 'image' ? (
                    <Image
                        src={article.outputs[0].content}
                        alt={article.outputs[0].alt || article.title}
                        fill
                        className={styles.thumbnailImage}
                    />
                ) : (
                    <div className={styles.thumbnailEmoji}>
                        <span>{article.emoji || '📄'}</span>
                    </div>
                )}
                {/* カテゴリバッジ（サムネイル左上）マルチセレクト対応 */}
                <div className={styles.categoryBadges}>
                    {article.category.map((cat) => {
                        const color = categoryColors[cat] ?? categoryColors['その他'];
                        return (
                            <span
                                key={cat}
                                className={styles.categoryBadge}
                                style={{
                                    backgroundColor: color.bg,
                                    color: color.text,
                                }}
                            >
                                {cat}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* コンテンツエリア */}
            <div className={styles.content}>
                <h2 className={styles.title}>{article.title}</h2>
                <p className={styles.description}>{article.description}</p>

                {/* タグ */}
                {article.tags.length > 0 && (
                    <div className={styles.tags}>
                        {article.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className={styles.tag}>
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* フッター（日付） */}
                <div className={styles.footer}>
                    <time className={styles.date} dateTime={article.createdAt}>
                        {formatDate(article.createdAt)}
                    </time>
                    <span className={styles.readMore}>
                        読む →
                    </span>
                </div>
            </div>
        </Link>
    );
}
