'use client';

import { useState } from 'react';
import styles from './PromptBlock.module.css';

interface PromptBlockProps {
    prompt: string;
    label?: string;  // コードブロックのラベル（例: "プロンプト全文"）
}

export default function PromptBlock({ prompt, label = 'プロンプト' }: PromptBlockProps) {
    // コピー状態管理
    const [copied, setCopied] = useState(false);

    // クリップボードにコピー
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prompt);
            setCopied(true);
            // 2秒後に元に戻す
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard API が使えない環合はフォールバック
            const textarea = document.createElement('textarea');
            textarea.value = prompt;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className={styles.wrapper}>
            {/* ヘッダー行（ラベル + コピーボタン） */}
            <div className={styles.header}>
                <div className={styles.labelArea}>
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.label}>{label}</span>
                </div>

                {/* コピーボタン（最重要機能） */}
                <button
                    className={`${styles.copyButton} ${copied ? styles.copyButtonSuccess : ''}`}
                    onClick={handleCopy}
                    aria-label="プロンプトをコピー"
                    title="クリップボードにコピー"
                >
                    {copied ? (
                        <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>コピーしました！</span>
                        </>
                    ) : (
                        <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            <span>コピー</span>
                        </>
                    )}
                </button>
            </div>

            {/* コードブロック本体 */}
            <pre className={styles.code}>
                <code>{prompt}</code>
            </pre>
        </div>
    );
}
