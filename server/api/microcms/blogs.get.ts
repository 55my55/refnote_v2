import { defineEventHandler, getQuery, createError } from 'h3'
import type { BlogDataType, BlogItemType } from '@/types/Blog'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const queries = getQuery(event)

  const microcmsApiUrl = `https://${config.microcmsServiceDomain}.microcms.io/api/v1/blog`

  try {
    // microCMS の生レスポンス
    const res = await $fetch<{
      contents: BlogItemType[]
      totalCount: number
    }>(microcmsApiUrl, {
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
      params: queries,
    })

    // ★ 生レスポンスを BlogDataType に整形
    const data: BlogDataType = {
      blogList: res.contents,
      totalCount: res.totalCount,
    }

    return data
  } catch (err) {
    console.error(err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch blogs from microCMS',
    })
  }
})
