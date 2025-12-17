// src/service/CategoryService.ts

/**
 * CategoryService
 * カテゴリー取得のサービス層
 * @package service
 */

import { getCategoriesApi } from '~/apis/CategoryApi'
import type { CategoryType } from '~/types/Category'

/**
 * カテゴリー一覧を取得
 */
export const getCategoryListService = async (): Promise<CategoryType[]> => {
  const categories = await getCategoriesApi()
  return categories ?? []
}
