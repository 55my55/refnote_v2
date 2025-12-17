/**
 * FixArticleApi.ts
 * 固定ページ（プライバシーポリシー / 利用規約）取得 API
 * @package apis
 */

/* types */
import type { FixedArticleType } from '~/types/FixedArticle'

/**
 * プライバシーポリシーデータ取得
 * @returns {Promise<FixedArticleType>}
 */
export const getPolicyApi = async (): Promise<FixedArticleType> => {
  return await $fetch<FixedArticleType>('/api/fixed/policy')
}

/**
 * 利用規約データ取得
 * @returns {Promise<FixedArticleType>}
 */
export const getTermApi = async (): Promise<FixedArticleType> => {
  return await $fetch<FixedArticleType>('/api/fixed/term')
}
