import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                {/* 鳥居の絵文字ライン */}
                <div className={styles.toriiLine}>
                    <span>⛩</span>
                    <hr className={styles.divider} />
                    <span>⛩</span>
                </div>

                {/* フッターロゴ */}
                <div className={styles.logoArea}>
                    <Image
                        src="/kon_icon.png"
                        alt="コン"
                        width={40}
                        height={40}
                        className={styles.logoImage}
                    />
                    <span className={styles.logoText}>コンの巻物</span>
                </div>

                <p className={styles.tagline}>
                    コン🦊が集めた、使えるAIプロンプトの巻物
                </p>

                {/* リンク */}
                <nav className={styles.links}>
                    <Link href="/" className={styles.link}>ホーム</Link>
                    <span className={styles.separator}>·</span>
                    <Link href="/?category=文章生成" className={styles.link}>文章生成</Link>
                    <span className={styles.separator}>·</span>
                    <Link href="/?category=画像生成" className={styles.link}>画像生成</Link>
                    <span className={styles.separator}>·</span>
                    <Link href="/?category=コード生成" className={styles.link}>コード生成</Link>
                    <span className={styles.separator}>·</span>
                    {/* Xアイコンリンク */}
                    <a
                        href="https://x.com/con_aiwriting"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.xIconLink}
                        aria-label="X（旧Twitter）"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                </nav>

                <p className={styles.copyright}>
                    © 2026 コンの巻物. AI プロンプト集.
                </p>
            </div>
        </footer>
    );
}

