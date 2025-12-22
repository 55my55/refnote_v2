# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## テスト方針（この構成にした理由）

このプロジェクトは microCMS に依存しており、外部APIの影響でCIが不安定になりやすいです。  
そのため、CIで担保する範囲と、ステージング/手動で担保する範囲を分けています。

### 方針の結論
- CIは lint / 型チェック / ユニットテストに集中（速くて安定）
- Build / E2Eは **CIでは実行しない**（外部API依存で落ちやすい）
- Build / E2Eは **手動またはステージング**で実施（実環境の変数で確認）

これは参考プロジェクト（nochitoku-blog）と同じく、  
「CIは最低限の検証に留め、重い検証はCI外で行う」設計意図に合わせています。

### なぜCIでBuild/E2Eを回さないのか
- **外部API依存**: microCMSの不調/レート制限/未設定でCIが落ちる
- **安定性と速度**: CIを軽量に保ち、開発の回転を落とさない
- **秘密情報の運用**: Secrets管理や漏洩リスクを増やさない

### どこで担保するか
- **CI**: ロジック/状態管理/サービスのユニットテストで回帰を検知
- **ステージング/手動**: Build/E2Eで実通信と導線を確認

### いつ見直すか
以下の状況になった場合はCIにBuild/E2Eを戻す検討をします。
- Secrets運用が整備され、CIで実通信が安定して回せる
- E2Eの実行時間が十分に短く、開発速度を阻害しない
- 外部API障害時の扱い（リトライやスキップ）が整理された

## テストの実行

ユニットテスト（Jest）:
```bash
npm test
```

E2E（Cypress）は検証例として残しており、手動で実行できます:
```bash
npm run dev
npm run cy:run
```

## CIの補足

CIで実行している内容:
- lint
- type-check
- prettier check
- unit tests

Build / E2Eは `.github/workflows/ci.yml` でコメントアウトし、  
理由もコメントとして明記しています。

## E2Eの検証例について

`cypress/` は検証の痕跡として残しています。  
E2Eの粒度や導線テストの例を示すための最小構成です。
