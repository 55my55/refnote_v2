/**
 * config (refnote)
 *
 * @package Constants
 */

// src/constants/config.ts

// Nuxt composable は使わない
export const APP_NAME = process.env.NUXT_PUBLIC_APP_NAME || 'refnote'

/**
 * 1ページあたりの記事表示件数
 */
export const BLOG_SHOW_COUNT = Number(process.env.NUXT_PUBLIC_BLOG_SHOW_COUNT) || 10

/**
 * ブログのURL
 */
export const REFNOTE_URL = 'https://refnote.dev'

/**
 * ブログのベースタイトル
 */
export const BASE_TITLE = 'refnote'

/**
 * metadata の description 固定文言
 */
export const METADATA_DESCRIPTION = {
  BASIC:
    'refnote（リファノート）は、Webエンジニアが実務で役立てるための技術ブログです。Nuxt、Vue、TypeScript、フロントエンド設計、個人開発ノウハウを中心に、現場で使える知識をわかりやすく整理して発信しています。',
  POLICY:
    'refnote（https://refnote.dev/）では、当サイトが提供するサービスの利用規約を以下の通り定めます。',
  TERM: 'refnote（当サイト）は、ユーザーの個人情報を適切に取り扱うため、個人情報保護法その他関連法令を遵守し、以下のプライバシーポリシーを定めます。',
}

/**
 * metadata の keyword 固定文言
 */
export const METADATA_KEYWORD = {
  BASIC: 'refnote, エンジニア, プログラミング, Web開発, Nuxt, Vue, TypeScript, 個人開発',
}

/**
 * metadata の image 固定画像
 */
export const METADATA_IMAGE = {
  BASIC: REFNOTE_URL + '/assets/ogp.png',
}
