/**
 * CategoryApi.ts
 * カテゴリーAPI
 * @package apis
 */

import type { CategoryType } from '@/types/Category'
import { initCategoryData } from '@/constants/initState'

/**
 * constant
 */
const BASE_URL = '/api/microcms/categories'

/**
 * カテゴリー一覧取得
 * @returns {Promise<CategoryType[]>}
 */
export const getCategoriesApi = async (): Promise<CategoryType[]> => {
  let categoryList: CategoryType[] = []

  try {
    const res = await $fetch<{ contents: CategoryType[] }>(BASE_URL)
    categoryList = res.contents
  } catch (error) {
    console.error(error)
    throw new Error('API ERROR: getCategoriesApi')
  }

  return categoryList
}

/**
 * カテゴリー詳細取得
 * @param {string} id
 * @returns {Promise<CategoryType>}
 */
export const getCategoryByApi = async (id: string): Promise<CategoryType> => {
  let category: CategoryType = initCategoryData

  try {
    const res = await $fetch<CategoryType>(`${BASE_URL}/${id}`)
    category = res
  } catch (error) {
    console.error(error)
    throw new Error('API ERROR: getCategoryByApi')
  }

  return category
}
