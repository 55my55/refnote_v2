import { defineEventHandler, createError } from 'h3'
import type { FixedArticleType } from '~/types/FixedArticle'
import { initFixedArticleData } from '~/constants/initState'

type FixedListResponse = {
  contents: FixedArticleType[]
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const baseUrl = `https://${config.microcmsServiceDomain}.microcms.io/api/v1`

  try {
    const res = await $fetch<FixedListResponse>(`${baseUrl}/fixed`, {
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
      params: {
        limit: 1,
        filters: 'slug[equals]term',
      },
    })

    const term = res.contents?.[0] ?? initFixedArticleData
    return term
  } catch (error) {
    console.error('fetch term error', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch term from microCMS',
    })
  }
})
