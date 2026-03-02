'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Article, Category } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';
import SakuraPetals from '@/components/SakuraPetals';
import styles from '@/app/page.module.css';

// トップページのクライアントコンポーネント
// サーバーコンポーネント（page.tsx）から記事・カテゴリデータを受け取ってUIを担当
interface HomeClientProps {
    articles: Article[];
    categories: (Category | 'すべて')[];   // Notion or モックから渡されるカテゴリ一覧
}

export default function HomeClient({ articles, categories }: HomeClientProps) {
    const [activeCategory, setActiveCategory] = useState<Category | 'すべて'>('すべて');
    const [searchQuery, setSearchQuery] = useState('');
    const [animKey, setAnimKey] = useState(0);

    // カテゴリ・検索でフィルタリング（マルチセレクト対応）
    const filteredArticles = articles.filter((article) => {
        const matchCategory = activeCategory === 'すべて' || article.category.includes(activeCategory as Category);
        const matchSearch =
            searchQuery === '' ||
            article.title.includes(searchQuery) ||
            article.description.includes(searchQuery) ||
            article.tags.some((tag) => tag.includes(searchQuery));
        return matchCategory && matchSearch;
    });

    const handleCategoryChange = (category: Category | 'すべて') => {
        setActiveCategory(category);
        setAnimKey((prev) => prev + 1);
    };

    return (
        <div className={styles.page}>
            {/* ═══════════════════════════════╗
                ヒーローセクション（和風デザイン）
                ═══════════════════════════════╝ */}
            <section className={styles.hero}>
                {/* 桜の花びら（背面） */}
                <SakuraPetals />

                {/* SVG装飾：大鳥居シルエット（背景に薄く） */}
                <div className={styles.heroToriiBg} aria-hidden="true">
                    <svg
                        viewBox="0 0 400 300"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.heroToriiSvg}
                    >
                        {/* 笠木（一番上の横材） */}
                        <rect x="20" y="40" width="360" height="14" rx="4" fill="currentColor" />
                        {/* 島木（二段目横材） */}
                        <rect x="50" y="68" width="300" height="10" rx="3" fill="currentColor" />
                        {/* 貫（中間横材） */}
                        <rect x="80" y="110" width="240" height="7" rx="3" fill="currentColor" />
                        {/* 左柱 */}
                        <rect x="88" y="78" width="18" height="222" rx="9" fill="currentColor" />
                        {/* 右柱 */}
                        <rect x="294" y="78" width="18" height="222" rx="9" fill="currentColor" />
                        {/* 左控柱 */}
                        <rect x="40" y="100" width="12" height="200" rx="6" fill="currentColor" opacity="0.5" />
                        {/* 右控柱 */}
                        <rect x="348" y="100" width="12" height="200" rx="6" fill="currentColor" opacity="0.5" />
                    </svg>
                </div>

                {/* メインコンテンツ（前面） */}
                <div className={styles.heroContent}>
                    {/* 浮遊する狐アイコン（クリックで隠しページへ） */}
                    <Link href="/secret" className={styles.heroKonWrapper} title="">
                        <Image
                            src="/kon_icon.png"
                            alt="コン"
                            width={80}
                            height={80}
                            className={styles.heroKonIcon}
                            priority
                        />
                        {/* 光輪エフェクト */}
                        <div className={styles.heroKonGlow} aria-hidden="true" />
                    </Link>

                    <h1 className={styles.heroTitle}>
                        <span className={styles.heroTitleAccent}>コン</span>の巻物
                    </h1>
                    <p className={styles.heroSubtitle}>
                        AIプロンプトの社。パッと開いて、即コピペで使えるｺﾝ🦊
                    </p>
                    <p className={styles.heroDescription}>
                        便利なAIプロンプトと生成例をまとめました。<br />
                        気に入ったプロンプトをそのままコピーして、あなたの作業に使ってｺﾝฅ^•ω•^ฅｺﾝ
                    </p>

                    {/* 検索ボックス */}
                    <div className={styles.searchWrapper}>
                        <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="search"
                            className={styles.searchInput}
                            placeholder="プロンプトを検索... (例: Instagram, 要約)"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setAnimKey((prev) => prev + 1);
                            }}
                        />
                    </div>
                </div>

                {/* 底辺の波型装飾 */}
                <div className={styles.heroWave} aria-hidden="true">
                    <svg viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0,40 C150,10 350,55 600,30 C850,5 1050,50 1200,40 L1200,60 L0,60 Z"
                            fill="var(--color-bg-page)"
                        />
                    </svg>
                </div>
            </section>

            {/* メインコンテンツ */}
            <div className={styles.main}>
                <div className="container">
                    {/* カテゴリフィルター */}
                    <div className={styles.categoryFilter}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`${styles.categoryBtn} ${activeCategory === cat ? styles.categoryBtnActive : ''}`}
                                onClick={() => handleCategoryChange(cat)}
                            >
                                {cat}
                                <span className={styles.categoryCount}>
                                    {cat === 'すべて'
                                        ? articles.length
                                        : articles.filter((a) => a.category.includes(cat as Category)).length}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* 記事グリッド */}
                    {filteredArticles.length > 0 ? (
                        <div className={styles.grid} key={animKey}>
                            {filteredArticles.map((article, index) => (
                                <div
                                    key={article.id}
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <ArticleCard article={article} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <span className={styles.emptyEmoji}>🦊</span>
                            <p className={styles.emptyText}>
                                {searchQuery
                                    ? `「${searchQuery}」に一致するプロンプトが見つかりませんでした`
                                    : 'このカテゴリにはまだプロンプトがありません'}
                            </p>
                            <button
                                className={styles.emptyReset}
                                onClick={() => { setSearchQuery(''); setActiveCategory('すべて'); }}
                            >
                                すべて表示に戻る
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
