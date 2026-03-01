import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'コンの巻物 — AIプロンプト集',
  description: 'コン🦊が集めた使えるAIプロンプトと成果物の巻物。パッと開いて、即コピペ。',
  keywords: ['AIプロンプト', 'ChatGPT', 'Midjourney', 'プロンプト集', 'コピペ'],
  openGraph: {
    title: 'コンの巻物 — AIプロンプト集',
    description: 'コン🦊が集めた使えるAIプロンプトと成果物の巻物。パッと開いて、即コピペ。',
    type: 'website',
    locale: 'ja_JP',
  },
};

// サーバーコンポーネント: カテゴリをNotionから取得してHeaderに渡す
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // カテゴリ一覧をNotionから動的取得（Headerに渡すため）
  const categories = await fetchCategories();

  return (
    <html lang="ja">
      <body>
        <Header categories={categories} />
        <main style={{ minHeight: 'calc(100vh - 64px - 120px)' }}>
          {children}
        </main>
        <Footer categories={categories} />
      </body>
    </html>
  );
}
