// src/apis/BlogApi.ts

/**
 * BlogApi
 * microCMS ブログ用 API ラッパー
 * @package apis
 */

import { BLOG_SHOW_COUNT } from '~/constants/config'
import { initBlogData, initBlogItem } from '~/constants/initState'
import type { BlogItemType, BlogDataType } from '~/types/Blog'

type BlogListQueries = {
  limit?: number
  offset?: number
  orders?: string
  filters?: string
  depth?: number
  fields?: string
}

/**
 * 共通一覧取得ラッパ
 */
const fetchBlogs = (queries?: BlogListQueries) =>
  $fetch<BlogDataType>('/api/microcms/blogs', {
    params: {
      // 一覧系は極力軽量に取得する
      depth: 1,
      ...queries,
    },
  })

// 一覧取得時に必要なフィールドだけに絞る
const BLOG_LIST_FIELDS =
  'id,title,slug,createdAt,updatedAt,publishedAt,revisedAt,description,image.url,image.width,image.height,categories'

/**
 * ブログ一覧取得（ページング前提）
 * @param offset 取得開始位置
 */
export const getBlogsApi = async (offset: number): Promise<BlogDataType> => {
  let blogData: BlogDataType = { ...initBlogData }

  try {
    const res = await fetchBlogs({
      offset,
      limit: BLOG_SHOW_COUNT,
      fields: BLOG_LIST_FIELDS,
    })
    blogData = res
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    throw new Error('API ERROR: getBlogsApi')
  }

  return blogData
}

/**
 * カテゴリに紐づくブログ一覧取得
 * @param offset     取得開始位置
 * @param categoryId microCMS の Category ID
 */
export const getBlogsContainCategoryApi = async (
  offset: number,
  categoryId: string
): Promise<BlogDataType> => {
  let blogData: BlogDataType = { ...initBlogData }

  try {
    const res = await fetchBlogs({
      offset,
      limit: BLOG_SHOW_COUNT,
      fields: BLOG_LIST_FIELDS,
      // microCMS の参照フィールドは ID でフィルタ
      filters: `categories[contains]${categoryId}`,
    })
    blogData = res
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    throw new Error('API ERROR: getBlogsContainCategoryApi')
  }

  return blogData
}

/**
 * 指定月のブログ一覧取得（アーカイブ用）
 * @param offset    取得開始位置
 * @param startDate 対象月の開始日（ISO 文字列）
 * @param endDate   対象月の終了日（ISO 文字列）
 */
export const getBlogContainArchiveMonthApi = async (
  offset: number,
  startDate: string,
  endDate: string
): Promise<BlogDataType> => {
  let blogData: BlogDataType = { ...initBlogData }

  try {
    const res = await fetchBlogs({
      offset: Math.max(0, offset),
      limit: BLOG_SHOW_COUNT,
      fields: BLOG_LIST_FIELDS,
      filters: `createdAt[greater_than]${startDate}[and]createdAt[less_than]${endDate}`,
    })
    blogData = res
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    throw new Error('API ERROR: getBlogContainArchiveMonthApi')
  }

  return blogData
}

/**
 * 指定月の記事数のみ取得
 * @param startDate 対象月の開始日
 * @param endDate   対象月の終了日
 */
export const getBlogArchivesCountApi = async (
  startDate: string,
  endDate: string
): Promise<number | undefined> => {
  try {
    const res = await fetchBlogs({
      filters: `createdAt[greater_than]${startDate}[and]createdAt[less_than]${endDate}`,
      // 件数だけ欲しいので limit は 0 でも可
      limit: 0,
    })
    return res.totalCount
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    throw new Error('API ERROR: getBlogArchivesCountApi')
  }
}

/**
 * ブログ記事詳細取得
 * @param id       記事 ID（slug）
 * @param draftKey プレビューモード用 draftKey（任意）
 */
export const getBlogByApi = async (
  id: string,
  draftKey = ''
): Promise<BlogItemType> => {
  let blogDetail: BlogItemType = { ...initBlogItem }

  if (!id) {
    throw new Error('id is required')
  }

  try {
    const res = await $fetch<BlogItemType>(`/api/microcms/blog/${id}`, {
      params: draftKey ? { draftKey } : undefined,
    })
    blogDetail = res
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    throw new Error('API ERROR: getBlogByApi')
  }

  return blogDetail
}

/**
 * 既存コード互換用の薄いラッパ
 * （必要なければ後で削除してもよい）
 */
export const getBlogs = (queries?: BlogListQueries) => fetchBlogs(queries)

export const getBlogBySlug = (slug: string) => getBlogByApi(slug)
