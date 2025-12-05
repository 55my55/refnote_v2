import { defineEventHandler, createError } from 'h3'
import type { BlogItemType } from '@/types/Blog'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { slug } = event.context.params!

  const microcmsApiUrl = `https://${config.microcmsServiceDomain}.microcms.io/api/v1/blog`

  try {
    // slug で検索
    const res = await $fetch<{
      contents: BlogItemType[]
    }>(microcmsApiUrl, {
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
      params: {
        limit: 1,
        filters: `slug[equals]${slug}`,
      },
    })

    const post = res.contents?.[0]
    if (!post) {
      throw createError({ statusCode: 404, statusMessage: 'Post not found' })
    }

    return post
  } catch (error: any) {
    console.error(error)
    if (error?.statusCode) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch blog by slug from microCMS',
    })
  }
})
