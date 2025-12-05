// src/constants/navigation.ts

/**
 * navigation
 *
 * @package Constants
 */

/**
 * ページリンク（UI で使うナビゲーション用）
 */
export const NAVIGATION_LINK = {
  TOP: '/',               // トップページ
  ABOUT: '/about',        // ブログについて
  PROFILE: '/profile',    // プロフィール
  POLICY: '/policy',      // プライバシーポリシー
  TERM: '/term',          // 利用規約
  SEARCH: '/search',      // 検索ページ
} as const

/**
 * ルーターのパス名（ロジックで使う判定用）
 */
export const ROUTER_PATH_NAME = {
  TOP: '/',
  PROFILE: '/profile',
  POLICY: '/policy',
  TERM: '/term',
  SEARCH: '/search',

  // 動的ルーティング（Next.jsの構造をそのまま判定用として使用）
  CATEGORY: '/category/[categoryId]/page/[page]',
  ARCHIVE: '/archive/[date]/page/[page]',
  BLOG_ITEM: '/[blogId]',
  PAGE: '/page/[page]',
} as const
