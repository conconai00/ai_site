'use client';

// 紅葉アニメーションコンポーネント
// ヒーローセクションに重ねて使用する純CSS/SVGアニメーション

const LEAVES = [
    { left: 8, delay: 0, duration: 7, size: 14, drift: 60 },
    { left: 18, delay: 1.4, duration: 9, size: 11, drift: -40 },
    { left: 30, delay: 0.5, duration: 8, size: 16, drift: 80 },
    { left: 42, delay: 2.2, duration: 6, size: 12, drift: -60 },
    { left: 55, delay: 0.8, duration: 10, size: 14, drift: 50 },
    { left: 65, delay: 3.1, duration: 7, size: 11, drift: -70 },
    { left: 74, delay: 1.9, duration: 9, size: 13, drift: 45 },
    { left: 85, delay: 0.3, duration: 8, size: 12, drift: -55 },
    { left: 93, delay: 4, duration: 6, size: 10, drift: 65 },
    { left: 50, delay: 5, duration: 11, size: 13, drift: -35 },
];

// SVGの紅葉形状（もみじ）
// 中心から7枚のとがった葉が出るもみじシルエット
function MomijiLeaf({ size }: { size: number }) {
    // 紅葉のパス（30x30 viewBox、中心15,15）
    // 5葉のもみじをSVGパスで表現
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* 紅葉本体（5葉+茎） */}
            <path
                d="
                  M15 2
                  C13 5 11 5 9 4
                  C10 7 9 9 7 10
                  C4 9 3 10 2 12
                  C5 12 6 14 5 16
                  C7 15 9 16 10 18
                  C10 21 12 22 13 24
                  L15 28
                  L17 24
                  C18 22 20 21 20 18
                  C21 16 23 15 25 16
                  C24 14 25 12 28 12
                  C27 10 26 9 23 10
                  C21 9 20 7 21 4
                  C19 5 17 5 15 2
                  Z
                "
                fill="rgba(210, 80, 20, 0.82)"
            />
            {/* 葉脈（細い線） */}
            <path
                d="M15 28 L15 14"
                stroke="rgba(255,220,180,0.35)"
                strokeWidth="0.7"
            />
            <path
                d="M15 16 L8 11"
                stroke="rgba(255,220,180,0.3)"
                strokeWidth="0.5"
            />
            <path
                d="M15 16 L22 11"
                stroke="rgba(255,220,180,0.3)"
                strokeWidth="0.5"
            />
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
            {LEAVES.map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: '-24px',
                        left: `${p.left}%`,
                        animation: `sakuraFall ${p.duration}s ${p.delay}s ease-in infinite`,
                        '--drift': `${p.drift}px`,
                    } as React.CSSProperties}
                >
                    <MomijiLeaf size={p.size} />
                </div>
            ))}
        </div>
    );
}
