'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { Category } from '@/lib/mock-data';
import styles from './Header.module.css';

interface HeaderProps {
    // Notionから動的に取得したカテゴリ一覧（'すべて'を除く）
    categories: (Category | 'すべて')[];
}

// カテゴリに対応する絵文字マップ
const CATEGORY_EMOJI: Record<string, string> = {
    'ホーム': '🏠',
    '文章生成': '✍️',
    '画像生成': '🎨',
    'コード生成': '💻',
    '分析・要約': '📊',
    'その他': '📦',
};

export default function Header({ categories }: HeaderProps) {
    // ナビの開閉状態（スマホ用）
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 'すべて'と'ホーム'以外のカテゴリのみナビに表示
    const navCategories = categories.filter((c) => c !== 'すべて');

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                {/* ロゴ */}
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <Image
                            src="/kon_icon.png"
                            alt="コン"
                            width={36}
                            height={36}
                            className={styles.logoImage}
                            priority
                        />
                    </div>
                    <span className={styles.logoText}>コンの巻物</span>
                </Link>

                {/* デスクトップナビ（Notion連動カテゴリ） */}
                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>ホーム</Link>
                    {navCategories.map((cat) => (
                        <Link
                            key={cat}
                            href={`/?category=${encodeURIComponent(cat)}`}
                            className={styles.navLink}
                        >
                            {cat}
                        </Link>
                    ))}
                </nav>

                {/* ハンバーガーボタン（スマホ） */}
                <button
                    className={styles.menuButton}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="メニュー"
                >
                    <span className={`${styles.menuLine} ${isMenuOpen ? styles.menuLineOpen1 : ''}`} />
                    <span className={`${styles.menuLine} ${isMenuOpen ? styles.menuLineOpen2 : ''}`} />
                    <span className={`${styles.menuLine} ${isMenuOpen ? styles.menuLineOpen3 : ''}`} />
                </button>
            </div>

            {/* スマホナビ */}
            {isMenuOpen && (
                <nav className={styles.mobileNav}>
                    <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                        {CATEGORY_EMOJI['ホーム']} ホーム
                    </Link>
                    {navCategories.map((cat) => (
                        <Link
                            key={cat}
                            href={`/?category=${encodeURIComponent(cat)}`}
                            className={styles.mobileNavLink}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {CATEGORY_EMOJI[cat] ?? '📄'} {cat}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}
