import { fetchArticles, fetchCategories } from '@/lib/data';
import HomeClient from '@/components/HomeClient';

// サーバーコンポーネント: データ取得のみ担当
// Notion連動時はNotion DBから記事・カテゴリ一覧を取得
// 60秒ごとにNotionから最新データを再取得（ISR）
export const revalidate = 60;
export default async function HomePage() {
  // 記事とカテゴリを並列取得（パフォーマンス最適化）
  const [articles, categories] = await Promise.all([
    fetchArticles(),
    fetchCategories(),
  ]);

  return <HomeClient articles={articles} categories={categories} />;
}

