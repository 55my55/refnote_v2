// src/logic/CommonLogic.ts

/**
 * 共通ロジック (refnote)
 */
import type { Router } from 'vue-router'
/* constants */
import {
  REFNOTE_URL,
  BASE_TITLE,
  BLOG_SHOW_COUNT,
  METADATA_DESCRIPTION,
  METADATA_IMAGE,
} from '@/constants/config'

import { NAVIGATION_LINK, ROUTER_PATH_NAME } from '@/constants/navigation'

/**
 * ページ番号配列作成
 * @param totalCount
 */
export const createPageArrayLogic = (totalCount: number): number[] => {
  return [...Array(Math.floor(totalCount / BLOG_SHOW_COUNT) + 1)].map((_, i) => i + 1)
}

/**
 * 検索ページではないかを判定
 * @param pathName
 */
export const isNotSearchPageLogic = (pathName: string): boolean => {
  return NAVIGATION_LINK.SEARCH !== pathName
}

/**
 * メタデータのtitleを選定 (ページごとで差し替える)
 */
export const selectMetaDataTitleLogic = ({
  router,
  title,
  errorFlg,
}: {
  router: Router
  title?: string
  errorFlg?: boolean
}): string => {
  const route = router.currentRoute.value

  // エラー画面の場合
  if (errorFlg) return `NOT FOUND | ${BASE_TITLE}`

  switch (route.path) {
    case ROUTER_PATH_NAME.ARCHIVE:
    case ROUTER_PATH_NAME.CATEGORY:
      return `「${title}」の記事一覧 | ${BASE_TITLE}`
    case ROUTER_PATH_NAME.BLOG_ITEM:
    case ROUTER_PATH_NAME.POLICY:
    case ROUTER_PATH_NAME.PROFILE:
    case ROUTER_PATH_NAME.SEARCH:
    case ROUTER_PATH_NAME.TERM:
      return `${title} | ${BASE_TITLE}`
    default:
      return BASE_TITLE
  }
}

/**
 * メタデータのdescriptionを選定 (ページごとで差し替える)
 */
export const selectMetaDataDescriptionLogic = ({
  router,
  description,
  errorFlg,
}: {
  router: Router
  description?: string
  errorFlg?: boolean
}): string => {
  const route = router.currentRoute.value

  // エラー画面の場合
  if (errorFlg) return METADATA_DESCRIPTION.BASIC

  switch (route.path) {
    case ROUTER_PATH_NAME.BLOG_ITEM:
    case ROUTER_PATH_NAME.PROFILE:
      return description ? description : ''
    case ROUTER_PATH_NAME.POLICY:
      return METADATA_DESCRIPTION.POLICY
    case ROUTER_PATH_NAME.TERM:
      return METADATA_DESCRIPTION.TERM
    default:
      return METADATA_DESCRIPTION.BASIC
  }
}

/**
 * メタデータのimageを選定 (ページごとで差し替える)
 */
export const selectMetaDataImageLogic = ({
  router,
  image,
  errorFlg,
}: {
  router: Router
  image?: string
  errorFlg?: boolean
}): string => {
  const route = router.currentRoute.value

  // エラー画面の場合
  if (errorFlg) return METADATA_IMAGE.BASIC

  switch (route.path) {
    case ROUTER_PATH_NAME.BLOG_ITEM:
    case ROUTER_PATH_NAME.PROFILE:
      return image ? image : ''
    default:
      return METADATA_IMAGE.BASIC
  }
}

/**
 * メタデータのurlを選定 (ページごとで差し替える)
 */
export const selectMetaDataUrlLogic = ({
  router,
  errorFlg,
}: {
  router: Router
  errorFlg?: boolean
}): string => {
  const route = router.currentRoute.value

  // エラー画面の場合
  if (errorFlg) return REFNOTE_URL

  switch (route.path) {
    case ROUTER_PATH_NAME.TOP:
      return REFNOTE_URL
    case ROUTER_PATH_NAME.SEARCH:
      return REFNOTE_URL + route.path
    default:
      // クエリやハッシュも含めた URL
      return REFNOTE_URL + route.fullPath
  }
}

/**
 * share用のURLを作成
 */
export const createShareUrlLogic = (router: Router): string => {
  const route = router.currentRoute.value

  if (route?.fullPath) {
    return REFNOTE_URL + route.fullPath
  }
  return REFNOTE_URL
}
