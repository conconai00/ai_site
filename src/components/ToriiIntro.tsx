'use client';

import { useEffect, useState } from 'react';

// 鳥居をくぐる入場アニメーション
// セッション中の初回訪問時のみ表示（sessionStorageで管理）
export default function ToriiIntro() {
    const [visible, setVisible] = useState(false);
    const [phase, setPhase] = useState<'enter' | 'fly' | 'exit'>('enter');

    useEffect(() => {
        // セッション初回訪問チェック
        const seen = sessionStorage.getItem('konIntroSeen');
        if (seen) return;
        sessionStorage.setItem('konIntroSeen', '1');

        setVisible(true);

        // フェーズ1: 鳥居が現れる（0〜0.8s）
        // フェーズ2: 鳥居をくぐる演出（0.8〜2.0s）
        const t1 = setTimeout(() => setPhase('fly'), 1000);
        // フェーズ3: フェードアウト（2.0〜3.0s）
        const t2 = setTimeout(() => setPhase('exit'), 2200);
        // 完全に非表示
        const t3 = setTimeout(() => setVisible(false), 3000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'linear-gradient(180deg, #0A0412 0%, #1A0A2E 60%, #2D0A1A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                opacity: phase === 'exit' ? 0 : 1,
                transition: phase === 'exit' ? 'opacity 0.8s ease' : 'none',
                pointerEvents: phase === 'exit' ? 'none' : 'all',
            }}
        >
            {/* 星/霧パーティクル */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            borderRadius: '50%',
                            background: i % 3 === 0
                                ? 'rgba(255,200,100,0.6)'
                                : i % 3 === 1
                                    ? 'rgba(200,100,200,0.4)'
                                    : 'rgba(255,255,255,0.3)',
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `starTwinkle ${1.5 + Math.random() * 2}s ${Math.random() * 2}s ease-in-out infinite`,
                        }}
                    />
                ))}
            </div>

            {/* 鳥居SVGコンテナ */}
            <div
                style={{
                    position: 'relative',
                    transform: phase === 'fly'
                        ? 'scale(8) translateY(10%)'
                        : 'scale(1) translateY(0)',
                    transition: phase === 'fly'
                        ? 'transform 1.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        : 'none',
                    opacity: phase === 'fly' ? 0 : 1,
                }}
            >
                {/* 大鳥居SVG */}
                <svg
                    width="280"
                    height="340"
                    viewBox="0 0 280 340"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* 鳥居の光輝エフェクト（グローフィルター用） */}
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient id="pillarGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#E8A040" />
                            <stop offset="50%" stopColor="#C8390A" />
                            <stop offset="100%" stopColor="#8B1A00" />
                        </linearGradient>
                        <radialGradient id="glowCenter" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(255,180,60,0.4)" />
                            <stop offset="100%" stopColor="rgba(255,180,60,0)" />
                        </radialGradient>
                    </defs>

                    {/* 中心光 */}
                    <ellipse cx="140" cy="170" rx="100" ry="120" fill="url(#glowCenter)" />

                    {/* 笠木（一番上の反った横材） */}
                    <path
                        d="M10,58 Q140,-8 270,58 L260,74 Q140,12 20,74 Z"
                        fill="url(#pillarGrad)"
                        filter="url(#glow)"
                    />
                    {/* 島木（二段目横材） */}
                    <rect x="38" y="84" width="204" height="14" rx="4" fill="url(#pillarGrad)" filter="url(#glow)" />
                    {/* 貫（中間横材） */}
                    <rect x="62" y="128" width="156" height="10" rx="3" fill="url(#pillarGrad)" opacity="0.85" />

                    {/* 左柱 */}
                    <rect x="68" y="94" width="20" height="246" rx="10" fill="url(#pillarGrad)" filter="url(#glow)" />
                    {/* 右柱 */}
                    <rect x="192" y="94" width="20" height="246" rx="10" fill="url(#pillarGrad)" filter="url(#glow)" />

                    {/* 左控柱（細い） */}
                    <rect x="22" y="106" width="12" height="234" rx="6" fill="#C8390A" opacity="0.5" />
                    {/* 右控柱（細い） */}
                    <rect x="246" y="106" width="12" height="234" rx="6" fill="#C8390A" opacity="0.5" />

                    {/* 扁額（中央の板） */}
                    <rect x="98" y="96" width="84" height="24" rx="4" fill="#1A0A00" stroke="#E8A040" strokeWidth="1.5" />
                    <text
                        x="140"
                        y="113"
                        textAnchor="middle"
                        fontSize="11"
                        fill="#E8A040"
                        fontFamily="serif"
                        letterSpacing="3"
                    >
                        神社
                    </text>
                </svg>

                {/* タイトルテキスト */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-60px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                    }}
                >
                    <p style={{
                        fontFamily: 'Noto Serif JP, serif',
                        fontSize: '1.6rem',
                        color: '#E8C88A',
                        letterSpacing: '0.2em',
                        textShadow: '0 0 20px rgba(232,168,64,0.8)',
                        margin: 0,
                    }}>
                        コンの巻物
                    </p>
                    <p style={{
                        fontFamily: 'Noto Sans JP, sans-serif',
                        fontSize: '0.75rem',
                        color: 'rgba(232,200,138,0.6)',
                        letterSpacing: '0.15em',
                        margin: '6px 0 0',
                    }}>
                        ⛩ AIプロンプトの社 ⛩
                    </p>
                </div>
            </div>

            {/* インラインアニメーション定義 */}
            <style>{`
                @keyframes starTwinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
            `}</style>
        </div>
    );
}
