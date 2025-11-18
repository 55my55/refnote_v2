import { defineEventHandler, getQuery, createError } from 'h3'
import type { BlogListResponse } from '~/types/Blog'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const queries = getQuery(event)

  const microcmsApiUrl = `https://${config.microcmsServiceDomain}.microcms.io/api/v1/blog`

  try {
    const data = await $fetch<BlogListResponse>(microcmsApiUrl, {
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
      params: queries,
    })
    return data
  } catch (err) {
    console.error(err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch blogs from microCMS',
    })
  }
})
