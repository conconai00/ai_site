// コンの巻物 — モックデータ
// Notion API接続前の開発用サンプルデータ

export type Category = '画像生成' | '文章生成' | 'コード生成' | '分析・要約' | 'その他';

export interface PromptOutput {
  type: 'text' | 'image' | 'video';
  content: string;           // text: 本文、image: URL、video: URL
  alt?: string;              // 画像のalt属性
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;       // 記事の簡単な説明
  category: Category[];      // マルチセレクト対応（複数カテゴリ可）
  tags: string[];
  tools?: string[];          // 使用したAIツール
  note?: string;             // 注意書き（任意）
  thumbnail?: string;        // アイキャッチ画像URL（Notionの「サムネイル」プロパティ）
  prompt: string;            // メインプロンプト
  outputs: PromptOutput[];   // 成果物（複数可）
  createdAt: string;
  emoji?: string;
}


// カテゴリの色定義
export const categoryColors: Record<Category, { bg: string; text: string }> = {
  '画像生成': { bg: '#F0F4FF', text: '#4A6FA5' },
  '文章生成': { bg: '#F0FFF4', text: '#2D7A4F' },
  'コード生成': { bg: '#FFF8F0', text: '#B45309' },
  '分析・要約': { bg: '#FDF4FF', text: '#7C3AED' },
  'その他': { bg: '#F5F5F5', text: '#666666' },
};

// サンプル記事データ
export const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'blog-to-instagram-caption',
    title: 'ブログ記事をInstagramキャプションに変換するプロンプト',
    description: 'ブログの長文記事を、エンゲージメントが高いInstagramキャプションに自動変換。ハッシュタグも自動生成。',
    category: ['文章生成'],
    tags: ['SNS', 'Instagram', 'リライト'],
    emoji: '📱',
    prompt: `以下のブログ記事を、Instagramに最適化したキャプションに変換してください。

【変換ルール】
- 冒頭1行目は思わず続きを読みたくなる「フック」にする
- 全体を300〜400文字以内にまとめる
- 読みやすい改行・空白を活用する
- 末尾に関連ハッシュタグを10〜15個追加する
- 絵文字を効果的に使い、親しみやすいトーンにする

【ブログ記事】
{ここにブログ記事を貼り付け}`,
    outputs: [
      {
        type: 'text',
        content: `✨ 「忙しい」を言い訳にしてませんか？

私も以前は「時間がない」が口ぐせでした。でも、たった1つの習慣を変えたことで、毎日3時間を取り戻せたんです🕐

そのコツは「時間を作る」のではなく「時間を見える化する」こと📊

スマホのスクリーンタイムを見て驚きませんでしたか？SNSに2時間、動画に1時間...気づかない間に大切な時間が消えていきます⚠️

今日から始められる3つのこと：
→ 朝の30分をゴールデンタイムに設定
→ 通知をオフにする時間を決める
→ 週に1回だけ「時間の棚卸し」をする

小さな変化が、大きな未来を変えます🌟

#時間管理 #生産性向上 #習慣化 #朝活 #タイムマネジメント #自己啓発 #ライフハック #仕事効率化 #AI活用 #プロンプト #ChatGPT #AI`,
      },
    ],
    createdAt: '2026-02-28T10:00:00+09:00',
  },
  {
    id: '2',
    slug: 'midjourney-portrait-prompt',
    title: 'Midjourneyで"雅な狐の神"を生成するプロンプト',
    description: '和風ファンタジー世界観の神秘的な狐の神様を、Midjourneyで高クオリティに生成するプロンプト集。',
    category: ['画像生成'],
    tags: ['Midjourney', '和風', 'キャラクター'],
    emoji: '🦊',
    prompt: `a majestic fox deity in japanese shrine setting, wearing ornate shrine maiden robes with golden kitsune mask, surrounded by floating red torii gates and cherry blossoms, ethereal glowing spiritual energy, ultra detailed fur texture, cinematic lighting, 8k resolution --ar 2:3 --style raw --v 6.1`,
    outputs: [
      {
        type: 'image',
        content: '/kon_icon.png',
        alt: '和風ファンタジー狐の神のAI生成画像イメージ',
      },
    ],
    createdAt: '2026-02-25T14:00:00+09:00',
  },
  {
    id: '3',
    slug: 'youtube-script-hook',
    title: 'YouTube動画のフック（冒頭30秒）を作るプロンプト',
    description: '視聴者がスキップしない、引き込まれる冒頭30秒のスクリプトを自動生成。再生維持率アップに直結。',
    category: ['文章生成'],
    tags: ['YouTube', '動画スクリプト', 'マーケティング'],
    emoji: '🎬',
    prompt: `以下の動画企画をもとに、視聴者がスキップできなくなる「冒頭30秒のフック」を作成してください。

【フックの構成】
1. 衝撃の一言（0〜3秒）: 問題提起または驚きの事実
2. 共感ポイント（3〜10秒）: 視聴者の悩みに寄り添う
3. 解決の予告（10〜20秒）: 今日の動画で得られること
4. 信頼性の担保（20〜30秒）: なぜあなたが語れるのか

【動画企画】
テーマ: {動画のテーマ}
ターゲット: {視聴者像}
動画で伝えたいこと: {メインメッセージ}

【禁止ワード】
「今日は〜について話します」「よろしくお願いします」等の定型句は使わない。`,
    outputs: [
      {
        type: 'text',
        content: `【テーマ例：「ChatGPTで副業月5万円」で生成した場合の出力】

---

（カメラに向かって、真剣な表情で）

「副業で月5万円」って聞いて、「また怪しい話か」って思いましたよね。

正直、私も1年前まで同じことを思ってました。

でも今から見せるのは、AIを使って"普通のサラリーマン"が、仕事終わりの2時間だけで達成した、再現性のある方法です。

特別なスキルも、フォロワーも、初期費用も、一切いりません。

今日この動画を最後まで見れば、あなたも明日から同じことを始められます。

まず最初に、99%の人が犯している"致命的な間違い"をお伝えします。`,
      },
    ],
    createdAt: '2026-02-20T09:00:00+09:00',
  },
  {
    id: '4',
    slug: 'code-review-prompt',
    title: 'コードレビューを10倍厳しくするプロンプト',
    description: 'シニアエンジニア視点でコードの問題点を徹底的に洗い出す。バグ・セキュリティ・パフォーマンス・可読性を多角的に分析。',
    category: ['コード生成'],
    tags: ['コードレビュー', 'エンジニア', 'セキュリティ'],
    emoji: '🔍',
    prompt: `あなたは10年以上の経験を持つシニアソフトウェアエンジニアです。
以下のコードをレビューし、問題点を指摘してください。

【レビュー観点（すべてチェック）】
1. 🐛 バグ・ロジックエラー
2. 🔒 セキュリティリスク（SQLインジェクション、XSSなど）
3. ⚡ パフォーマンス問題（N+1クエリ、不要な再計算など）
4. 📖 可読性・命名規則の問題
5. 🏗️ 設計・アーキテクチャの懸念
6. 🧪 テストが書きにくい箇所

各問題は【重要度: 高/中/低】と【改善案のコード】をセットで示してください。

【レビュー対象コード】
言語: {プログラミング言語}
\`\`\`
{コードをここに貼り付け}
\`\`\``,
    outputs: [
      {
        type: 'text',
        content: `## コードレビュー結果

### 🐛 バグ・ロジックエラー
**【重要度: 高】** \`getUserById\` 関数でエラーハンドリングが欠如しています。

改善案:
\`\`\`javascript
// 修正前
const user = await db.findById(id);
return user;

// 修正後
const user = await db.findById(id);
if (!user) {
  throw new NotFoundError(\`User with id \${id} not found\`);
}
return user;
\`\`\`

### 🔒 セキュリティリスク
**【重要度: 高】** SQLクエリに直接ユーザー入力を連結しているため、SQLインジェクションのリスクがあります。プレースホルダーを使用してください。`,
      },
    ],
    createdAt: '2026-02-15T11:00:00+09:00',
  },
  {
    id: '5',
    slug: 'meeting-minutes-summarizer',
    title: '会議の文字起こしを一発で議事録にするプロンプト',
    description: '雑多な会議の文字起こしテキストから、構造化された議事録を自動生成。アクションアイテムも自動抽出。',
    category: ['分析・要約'],
    tags: ['議事録', 'ビジネス', 'メモ'],
    emoji: '📝',
    prompt: `以下の会議の文字起こしを、読みやすい議事録に変換してください。

【出力フォーマット】
# 議事録

**日時：** {日時}
**参加者：** {名前をリスト}
**会議の目的：** {1行で}

## 決定事項
- （箇条書き）

## 議論のサマリー
（トピックごとにまとめる）

## アクションアイテム
| 担当者 | タスク内容 | 期限 |
|--------|-----------|------|

## 次回会議
{次回の予定があれば記載}

---
【文字起こし】
{文字起こしテキストをここに貼り付け}`,
    outputs: [
      {
        type: 'text',
        content: `# 議事録

**日時：** 2026年2月20日 14:00〜15:00  
**参加者：** 山田（司会）、鈴木、田中、佐藤  
**会議の目的：** 新サービスのローンチスケジュール確認

## 決定事項
- ローンチ日を3月15日（月）に確定
- βテストは3月1日〜7日の1週間実施
- テスターは社内から20名を選定する

## アクションアイテム
| 担当者 | タスク内容 | 期限 |
|--------|-----------|------|
| 鈴木 | テスター候補リストの作成 | 2/25 |
| 田中 | LP修正・公開 | 2/28 |
| 佐藤 | カスタマーサポート体制の整備 | 3/1 |`,
      },
    ],
    createdAt: '2026-02-10T16:00:00+09:00',
  },
  {
    id: '6',
    slug: 'sales-email-generator',
    title: '開封率が上がる営業メールを書くプロンプト',
    description: 'テンプレート感がなく、相手に合わせたパーソナライズ営業メールを生成。件名も同時に複数案提案。',
    category: ['文章生成'],
    tags: ['営業', 'メール', 'セールス'],
    emoji: '💌',
    prompt: `あなたは優秀なBtoBセールスライターです。
以下の情報をもとに、開封率・返信率が高い営業メールを作成してください。

【メール情報】
- 送り先企業: {企業名}
- 担当者名: {担当者名}
- 業種・課題: {業種と想定課題}
- 自社サービス: {サービス名と主な価値}
- アクション目標: {何をしてほしいか / 例: 30分の面談}

【作成ルール】
1. 件名を5パターン提案する（数字・疑問形・メリット訴求など）
2. 本文は200〜300文字以内
3. テンプレート感を出さない。"御社の〜"などの定型句禁止
4. 最後のCTAは1つだけに絞る
5. 返信のハードルを最大限下げる形で締める`,
    outputs: [
      {
        type: 'text',
        content: `【件名案 × 5】
① 採用コスト、先月いくらかかりましたか？
② Webライター採用で「ハズレを引く」を99%なくす方法
③ ○○株式会社さんの採用担当者から紹介いただきました
④ ライター採用コストを半減させた、たった1つの変化
⑤ 3分で確認できる採用改善の提案書をお送りします

---

【本文】

突然のご連絡、失礼いたします。

先日公開された貴社ブログの記事を拝読し、コンテンツ制作に力を入れていらっしゃると感じ、ご連絡いたしました。

弊社はWebライターのスキル評価ツールを提供しており、ご導入いただいた企業の採用コストが平均42%削減されています。

30分ほどで試算できる「採用コスト削減シミュレーション」をご用意しています。もしご関心があれば「見たい」の一言だけご返信ください（もちろん、その後の営業は一切いたしません）。`,
      },
    ],
    createdAt: '2026-02-05T13:00:00+09:00',
  },
];

// スラッグで記事を取得
export function getArticleBySlug(slug: string): Article | undefined {
  return mockArticles.find((article) => article.slug === slug);
}

// カテゴリで記事をフィルタリング（マルチセレクト対応）
export function getArticlesByCategory(category: Category | 'すべて'): Article[] {
  if (category === 'すべて') return mockArticles;
  return mockArticles.filter((article) => article.category.includes(category));
}

// カテゴリ一覧を取得
export const allCategories: (Category | 'すべて')[] = [
  'すべて',
  '文章生成',
  '画像生成',
  'コード生成',
  '分析・要約',
  'その他',
];
