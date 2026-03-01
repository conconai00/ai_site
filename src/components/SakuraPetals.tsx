'use client';

// 桜の花びらアニメーションコンポーネント
// ヒーローセクションに重ねて使用する純CSS/SVGアニメーション

const PETALS = [
    { left: 8, delay: 0, duration: 7, size: 10, drift: 60 },
    { left: 18, delay: 1.4, duration: 9, size: 8, drift: -40 },
    { left: 30, delay: 0.5, duration: 8, size: 12, drift: 80 },
    { left: 42, delay: 2.2, duration: 6, size: 9, drift: -60 },
    { left: 55, delay: 0.8, duration: 10, size: 11, drift: 50 },
    { left: 65, delay: 3.1, duration: 7, size: 8, drift: -70 },
    { left: 74, delay: 1.9, duration: 9, size: 10, drift: 45 },
    { left: 85, delay: 0.3, duration: 8, size: 9, drift: -55 },
    { left: 93, delay: 4, duration: 6, size: 7, drift: 65 },
    { left: 50, delay: 5, duration: 11, size: 10, drift: -35 },
];

// SVGの桜花びら形状
function SakuraPetal({ size }: { size: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* 花びら5枚 */}
            {[0, 72, 144, 216, 288].map((angle) => (
                <ellipse
                    key={angle}
                    cx="10"
                    cy="10"
                    rx="4"
                    ry="7.5"
                    fill="rgba(255, 182, 193, 0.85)"
                    transform={`rotate(${angle} 10 10) translate(0 -4)`}
                />
            ))}
            <circle cx="10" cy="10" r="2" fill="rgba(255, 220, 210, 0.9)" />
        </svg>
    );
}

export default function SakuraPetals() {
    return (
        <div
            aria-hidden="true"
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        >
            {PETALS.map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: '-20px',
                        left: `${p.left}%`,
                        animation: `sakuraFall ${p.duration}s ${p.delay}s ease-in infinite`,
                        '--drift': `${p.drift}px`,
                    } as React.CSSProperties}
                >
                    <SakuraPetal size={p.size} />
                </div>
            ))}
        </div>
    );
}
