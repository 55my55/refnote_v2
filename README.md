# refnote_v2

Nuxt 4 + microCMS で構築した技術ブログ。  
初期表示の体感速度と運用安定性を重視して設計しています。

## about

サイトURL: https://refnote-v2.vercel.app/

## 詳細

microCMS の外部依存を前提に、server/api で取得を集約しつつ、  
初期表示の体感速度を最優先に調整しています。

## 機能

- ブログ一覧
- カテゴリ別記事一覧
- アーカイブ別記事一覧
- 記事検索
- パンくずリスト
- 記事詳細
- SNSシェアボタン
- 下書きプレビュー
- プロフィール
- 利用規約
- プライバシーポリシー

## 技術構成

- Nuxt 4
- microCMS (コンテンツ)
- Vercel (Hosting)
- TypeScript
- ESLint
- Prettier
- SCSS Modules
- Storybook
- Jest
- Cypress
- GitHub Actions

## microCMSのAPIスキーマ設定

### ブログ

endpoint: blog  
type: リスト形式

| フィールドID | 表示名       | 種類               |
| ------------ | ------------ | ------------------ |
| title        | タイトル     | テキストフィールド |
| body         | 本文         | リッチエディタ     |
| image        | アイキャッチ | 画像               |
| categories   | カテゴリー   | 複数コンテンツ参照 |
| description  | 記事の説明文 | テキストフィールド |
| slug         | スラッグ     | テキストフィールド |

### カテゴリー

endpoint: categories  
type: リスト形式

| フィールドID | 表示名       | 種類               |
| ------------ | ------------ | ------------------ |
| name         | カテゴリー名 | テキストフィールド |
| slug         | スラッグ     | テキストフィールド |

### プロフィール

endpoint: profile  
type: リスト形式

| フィールドID | 表示名               | 種類               |
| ------------ | -------------------- | ------------------ |
| name         | ユーザー名           | テキストフィールド |
| englishName  | 英字ユーザー名       | テキストフィールド |
| position     | 役職                 | テキストフィールド |
| introduction | 紹介文               | テキストエリア     |
| userImage    | アバター画像         | 画像               |
| articleImage | 記事画像             | 画像               |
| description  | プロフィールの紹介文 | テキストフィールド |
| contents     | 本文                 | リッチエディタ     |
| twitter      | Twitterリンク        | テキストフィールド |
| github       | Githubリンク         | テキストフィールド |
| facebook     | Facebookリンク       | テキストフィールド |

### 固定記事

endpoint: fixed  
type: リスト形式

| フィールドID | 表示名   | 種類               |
| ------------ | -------- | ------------------ |
| title        | タイトル | テキストフィールド |
| body         | 本文     | リッチエディタ     |
| slug         | スラッグ | テキストフィールド |
| image        | 画像     | 画像               |

## 設計方針

### データ取得の集約

microCMS へのアクセスは `server/api` に集約。  
フロントからは自前APIを叩く構成にしています。

### アーカイブ取得の一括集計

createdAt のみを一括取得 → 月単位に集計する方式に変更。  
API連打を避け、CDNキャッシュとメモリキャッシュを併用しています。

### 初期表示の体感速度を優先

トップページは CSR + スケルトンに切り替え、  
初期HTMLのブロッキングを外して体感速度を優先。

### ルーティングと配信方針

`nuxt.config.ts` の `routeRules` で用途別に最適化。

- `/` / `/page/**` / `/category/**` / `/archive/**` / `/policy` / `/term` / `/profile` は prerender
- `/blog/**` は ISR（60秒）

## テスト方針

- CIは lint / type-check / unit tests に集中
- Build / E2E は手動またはステージングで実施

## 環境変数

プロジェクトルートに `.env` を作成し、以下を設定してください。

```
NUXT_MICROCMS_SERVICE_DOMAIN=xxxx
NUXT_MICROCMS_API_KEY=xxxx
NUXT_PUBLIC_APP_NAME=refnote
NUXT_PUBLIC_BLOG_SHOW_COUNT=10
NUXT_PUBLIC_BASE_URL=https://xxxx.microcms.io/api/v1
```

## 開発方法

```bash
# パッケージをinstall
npm install

# 開発サーバーを起動(localhost:3000)
npm run dev

# 本番ビルド
npm run build

# 本番ビルドのプレビュー
npm run preview

# storybookを起動
npm run storybook

# 単体テストを実行
npm test

# E2Eテストを実行 (※事前にnpm run devで起動)
npm run cy:run
```
