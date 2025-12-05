// server/api/microcms/categories.get.ts
import { defineEventHandler, createError } from 'h3'
import type { CategoryType } from '@/types/Category'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const microcmsApiUrl = `https://${config.microcmsServiceDomain}.microcms.io/api/v1/categories`

  try {
    const data = await $fetch<{
      contents: CategoryType[]
      totalCount: number
      limit: number
      offset: number
    }>(microcmsApiUrl, {
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
      // 全件取得
      params: {
        limit: 100,
      },
    })

    return {
      categories: data.contents,
    }
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch categories from microCMS',
    })
  }
})
