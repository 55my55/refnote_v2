// server/api/microcms/blog/[slug].get.ts
import { defineEventHandler, createError } from 'h3'
import type { BlogListResponse, Blog } from '~/types/Blog'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { slug } = event.context.params as { slug?: string }

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required',
    })
  }

  const microcmsApiUrl =
    `https://${config.microcmsServiceDomain}.microcms.io/api/v1/blog`

  try {
    // ★ slug で検索する
    const data = await $fetch<BlogListResponse>(microcmsApiUrl, {
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
      params: {
        limit: 1,
        filters: `slug[equals]${slug}`,
      },
    })

    const post = data.contents[0] as Blog | undefined

    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found',
      })
    }

    return post
  } catch (error: any) {
    console.error(error)
    // 404 など createError 済みならそれをそのまま投げ直す
    if (error?.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch blog by slug from microCMS',
    })
  }
})
