/**
 * FixArticleApi.ts
 * 固定ページ（プライバシーポリシー / 利用規約）取得 API
 * @package apis
 */

/* config */
import globalAxios from '@/config/globalAxios'
/* constants */
import { initFixedArticleData } from '@/constants/initState'
/* types */
import type { FixedArticleType } from '@/types/FixedArticle'

/**
 * BASE_URL
 * - Nuxt の公開環境変数 NUXT_PUBLIC_BASE_URL を優先
 * - 未設定時はローカルホストを利用
 */
const BASE_URL =
  (import.meta.env.NUXT_PUBLIC_BASE_URL as string | undefined) ??
  'http://localhost:3000/'

/**
 * プライバシーポリシーデータ取得
 * @returns {Promise<FixedArticleType>}
 */
export const getPolicyApi = async (): Promise<FixedArticleType> => {
  let policyData = initFixedArticleData

  try {
    const res = await globalAxios.get(`${BASE_URL}/fixed/policy`)
    policyData = res.data
  } catch (_error) {
    throw new Error('API ERROR: getPolicyApi')
  }

  return policyData
}

/**
 * 利用規約データ取得
 * @returns {Promise<FixedArticleType>}
 */
export const getTermApi = async (): Promise<FixedArticleType> => {
  let termData = initFixedArticleData

  try {
    const res = await globalAxios.get(`${BASE_URL}/fixed/term`)
    termData = res.data
  } catch (_error) {
    throw new Error('API ERROR: getTermApi')
  }

  return termData
}
