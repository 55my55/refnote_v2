// server/api/microcms/categories.get.ts
import { defineEventHandler, createError } from 'h3'
import type { CategoryType } from '~/types/Category'
import { getCache, setCache } from '~/server/utils/simpleCache'

// NOTE:
// microCMS レスポンスを軽量化するため depth:1 + fields で必要最小限のみ取得
const CATEGORY_FIELDS = 'id,name,slug,createdAt,updatedAt'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const baseUrl = `https://${config.microcmsServiceDomain}.microcms.io/api/v1`
  const cacheKey = 'categories'

  const cached = getCache<{
    contents: CategoryType[]
    totalCount: number
    limit: number
    offset: number
  }>(cacheKey)
  if (cached) return cached

  const fetchCategories = async (endpoint: string) =>
    await $fetch<{
      contents: CategoryType[]
      totalCount: number
      limit: number
      offset: number
    }>(`${baseUrl}/${endpoint}`, {
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
      // 全件取得
      params: {
        limit: 100,
        depth: 1,
        fields: CATEGORY_FIELDS,
      },
    })

  try {
    // contentId が category / categories どちらでも拾えるようにフォールバック
    let data: { contents: CategoryType[]; totalCount: number; limit: number; offset: number }
    try {
      data = await fetchCategories('category')
    } catch (err) {
      data = await fetchCategories('categories')
    }

    setCache(cacheKey, data, 5 * 60 * 1000) // 5 分キャッシュ
    return data
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch categories from microCMS',
    })
  }
})
