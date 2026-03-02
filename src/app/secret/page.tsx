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

            {/* 提灯（左右） */}
            <div className={styles.lanternLeft} aria-hidden="true">🏮</div>
            <div className={styles.lanternRight} aria-hidden="true">🏮</div>

            {/* 花びら（舞い落ちる） */}
            <div className={styles.petal} aria-hidden="true">🌸</div>
            <div className={styles.petal} aria-hidden="true">🌸</div>
            <div className={styles.petal} aria-hidden="true">🌸</div>
            <div className={styles.petal} aria-hidden="true">🌸</div>
            <div className={styles.petal} aria-hidden="true">🌸</div>
            <div className={styles.petal} aria-hidden="true">🌸</div>


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
                        このページを見つけた方限定で<br />
                        コンから特別なご案内があります🦊
                    </p>
                </header>

                {/* 区切り */}
                <div className={styles.divider}>
                    <span>⛩️</span>
                </div>

                {/* ── メインコンテンツ ── */}
                <section className={styles.content}>

                    {/* アイキャッチ画像 */}
                    <div className={styles.eyecatch}>
                        <Image
                            src="/kitsunenoyashiro.png"
                            alt="裏コミュニティー 狐の隠れ社"
                            width={800}
                            height={450}
                            className={styles.eyecatchImage}
                            priority
                        />
                    </div>

                    <p className={styles.lead}>
                        裏コミュニティー「狐の隠れ社⛩️」への招待状
                    </p>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardIcon}>🦊</span>
                            <h2 className={styles.cardTitle}>「狐の隠れ社⛩️」とは？</h2>
                        </div>
                        <p className={styles.cardText}>
                            コンのAI知見・研究結果、今やっていること全てを曝け出すコミュニティです。<br />
                            <br />
                            コミュニティはLINEオープンチャットで運営します。<br />
                            <br />
                            もちろん、参加費は無料。この入り口を見つけたんですから🐾<br />
                            <br />
                            入り口はこの隠しサイトのみ。本当に選ばれしコン友さんしか入れないので、㊙︎情報を馬鹿みたいに垂れ流しますw
                        </p>
                    </div>

                    {/* 特典リスト */}
                    <div className={styles.benefits}>
                        <h3 className={styles.benefitsTitle}>✨ 「狐の隠れ社⛩️」で得られるもの</h3>
                        <ul className={styles.benefitsList}>
                            <li className={styles.benefitItem}>
                                <span className={styles.benefitIcon}>📜</span>
                                <div>
                                    <strong>プロンプト作成フローの共有</strong>
                                    <p>僕がこのサイトに載せるプロンプトをどのように製作しているかを公開</p>
                                </div>
                            </li>
                            <li className={styles.benefitItem}>
                                <span className={styles.benefitIcon}>🤫</span>
                                <div>
                                    <strong>㊙️ナレッジの共有</strong>
                                    <p>僕がAIとの壁打ちや業務の中で作り上げたナレッジも公開します。僕のナレッジがあればあなたのAIが数段進化すること間違いないです🐾</p>
                                </div>
                            </li>
                            <li className={styles.benefitItem}>
                                <span className={styles.benefitIcon}>🦊</span>
                                <div>
                                    <strong>コンへのリクエスト</strong>
                                    <p>「こんなものできる？」「これが作れるプロンプトが欲しい！」などのリクエストに優先的にお答えします🐾</p>
                                </div>
                            </li>
                            <li className={styles.benefitItem}>
                                <span className={styles.benefitIcon}>🤝</span>
                                <div>
                                    <strong>メンバーさん積極交流&amp;紹介</strong>
                                    <p>コンのXで爆絡み&amp;紹介をします。AIを使ったクリエイティブ付きの引用RTも実施します🐾</p>
                                </div>
                            </li>
                            <li className={styles.benefitItem}>
                                <span className={styles.benefitIcon}>🧪</span>
                                <div>
                                    <strong>コンの実験結果のシェア</strong>
                                    <p>上手くいかなかったことも積極的にシェアします。僕の屍を超えていってくださいw</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className={styles.cta}>
                        <p className={styles.ctaNote}>
                            ここからしか入れない、特別な場所
                        </p>
                        <a
                            href="https://line.me/ti/g2/wMzROmOG-u4gibAaYgxRqkEw-fJijnQAhqDWeQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.ctaButton}
                        >
                            ⛩️ 「狐の隠れ社⛩️」に参加する
                        </a>
                        <p className={styles.ctaSmall}>
                            ※このページのURLは秘密にしてください🦊
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
