import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

// 隠しページ — 裏コミュニティへの招待状
// コンのアイコンをクリックした人だけが辿り着けるページ

export const metadata = {
    title: '🦊 おめでとうございます — コンの巻物',
    robots: 'noindex, nofollow', // 検索エンジンに表示しない
};

export default function SecretPage() {
    return (
        <div className={styles.page}>
            {/* 星屑背景 */}
            <div className={styles.stars} aria-hidden="true" />

            <div className={styles.container}>

                {/* ── 発見演出ヘッダー ── */}
                <header className={styles.header}>
                    <div className={styles.badge}>✦ SECRET PAGE ✦</div>

                    <div className={styles.iconWrapper}>
                        <Image
                            src="/kon_icon.png"
                            alt="コン"
                            width={100}
                            height={100}
                            className={styles.icon}
                            priority
                        />
                        <div className={styles.iconRing} aria-hidden="true" />
                        <div className={styles.iconRing2} aria-hidden="true" />
                    </div>

                    <h1 className={styles.title}>
                        おめでとうございます🎉
                    </h1>
                    <p className={styles.subtitle}>
                        隠しページを見つけたあなたへ、コンからの招待状です
                    </p>
                </header>

                {/* 区切り */}
                <div className={styles.divider}>
                    <span>⛩️</span>
                </div>

                {/* ── メインコンテンツ ── */}
                <section className={styles.content}>
                    <p className={styles.lead}>
                        このページを見つけられたということは、<br />
                        あなたはただのユーザーではありません。
                    </p>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardIcon}>🦊</span>
                            <h2 className={styles.cardTitle}>裏コミュニティへ招待</h2>
                        </div>
                        <p className={styles.cardText}>
                            コンの巻物の<strong>限定メンバーだけが入れる</strong>非公開コミュニティに、
                            あなたを特別にご招待します。
                        </p>
                    </div>

                    {/* 特典リスト */}
                    <div className={styles.benefits}>
                        <h3 className={styles.benefitsTitle}>✨ 裏コミュニティで得られること</h3>
                        <ul className={styles.benefitsList}>
                            <li className={styles.benefitItem}>
                                <span className={styles.benefitIcon}>📜</span>
                                <div>
                                    <strong>限定プロンプト配布</strong>
                                    <p>サイトには載せていない上級・実験的プロンプトを先行公開</p>
                                </div>
                            </li>
                            <li className={styles.benefitItem}>
                                <span className={styles.benefitIcon}>💬</span>
                                <div>
                                    <strong>コン直接相談</strong>
                                    <p>プロンプトの使い方・AIツール選びをコンに直接聞ける</p>
                                </div>
                            </li>
                            <li className={styles.benefitItem}>
                                <span className={styles.benefitIcon}>🌙</span>
                                <div>
                                    <strong>メンバー限定情報</strong>
                                    <p>AI最新情報・おすすめツール・活用事例をいち早くシェア</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className={styles.cta}>
                        <p className={styles.ctaNote}>
                            ここでしか入れない、特別な場所です。
                        </p>
                        <a
                            href="https://x.com/con_aiwriting"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.ctaButton}
                        >
                            🦊 Xでコンに連絡して入会する
                        </a>
                        <p className={styles.ctaSmall}>
                            ※ このページのURLは秘密にしてください
                        </p>
                    </div>
                </section>

                {/* 戻るリンク */}
                <div className={styles.back}>
                    <Link href="/" className={styles.backLink}>
                        ← 巻物に戻る
                    </Link>
                </div>

            </div>
        </div>
    );
}
