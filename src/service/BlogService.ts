// src/service/BlogService.ts

/**
 * BlogService
 * ブログ取得まわりのサービス層
 * @package service
 */

/* apis */
import {
  getBlogsApi,
  getBlogByApi,
  getBlogContainArchiveMonthApi,
  getBlogArchivesCountApi,
} from '@/apis/BlogApi'
/* logics */
import {
  getStartOfMonthLogic,
  getEndOfMonthLogic,
  addOneDayLogic,
  subtractOneDayLogic,
} from '@/logic/DateLogic'
/* constants */
import { BLOG_SHOW_COUNT } from '@/constants/config'
/* types */
import type { BlogItemType, BlogDataType } from '@/types/Blog'

/**
 * 一覧取得（ページング付き）
 * - Next版の getBlogsApi を page ベースでラップ
 */
export const getPosts = async (page = 1): Promise<BlogDataType> => {
  const offset = (page - 1) * BLOG_SHOW_COUNT
  return await getBlogsApi(offset)
}

/**
 * 詳細取得
 * - slug(id) + draftKey 付きで取得したいケースも想定してラップ
 */
export const getPostBySlug = async (
  id: string,
  draftKey = ''
): Promise<BlogItemType> => {
  if (!id) throw new Error('id is required for getPostBySlug')
  return await getBlogByApi(id, draftKey)
}

/**
 * 対象月の記事一覧取得
 * - 月初の前日〜月末の翌日で範囲を広げて API を叩く
 */
export const getBlogTargetMonthService = async (
  page: number,
  targetDate: string
): Promise<BlogDataType> => {
  const offset = (page - 1) * BLOG_SHOW_COUNT

  const startMonth = subtractOneDayLogic(getStartOfMonthLogic(targetDate))
  const endMonth = addOneDayLogic(getEndOfMonthLogic(targetDate))

  return await getBlogContainArchiveMonthApi(offset, startMonth, endMonth)
}

/**
 * 対象月に記事が存在するか判定
 * - アーカイブ一覧用の有無チェック
 */
export const isBlogsArchivesService = async (
  startDate: string,
  endDate: string
): Promise<boolean> => {
  const queryStartDate = subtractOneDayLogic(startDate)
  const queryEndDate = addOneDayLogic(endDate)

  const totalCount = await getBlogArchivesCountApi(queryStartDate, queryEndDate)

  if (!totalCount) return false
  return totalCount > 0
}
