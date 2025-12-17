import { defineEventHandler, createError, getQuery } from 'h3'
import type { BlogItemType, MicroCMSBlogListResponse } from '~/types/Blog'
import type { CategoryType } from '~/types/Category'
import { getCache, setCache } from '~/server/utils/simpleCache'

const normalizeCategories = (raw: unknown): CategoryType[] => {
  if (Array.isArray(raw)) {
    const arr = raw as any[]
    // 文字列配列
    if (arr.every((item) => typeof item === 'string')) {
      return (arr as string[]).map((name) => ({
        id: name,
        name,
        slug: name,
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
        revisedAt: '',
      }))
    }
    // オブジェクト配列（参照展開）
    if (arr.every((item) => typeof item === 'object' && item !== null)) {
      return arr.map((item: any) => ({
        id: item.id ?? item.slug ?? item.name ?? '',
        name: item.name ?? item.title ?? '',
        slug: item.slug ?? item.id ?? '',
        createdAt: item.createdAt ?? '',
        updatedAt: item.updatedAt ?? '',
        publishedAt: item.publishedAt ?? '',
        revisedAt: item.revisedAt ?? '',
      }))
    }
  }

  if (typeof raw === 'string') {
    const name = raw
    return [
      {
        id: name,
        name,
        slug: name,
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
        revisedAt: '',
      },
    ]
  }

  if (typeof raw === 'object' && raw !== null) {
    const obj = raw as any
    return [
      {
        id: obj.id ?? obj.slug ?? obj.name ?? '',
        name: obj.name ?? obj.title ?? '',
        slug: obj.slug ?? obj.id ?? '',
        createdAt: obj.createdAt ?? '',
        updatedAt: obj.updatedAt ?? '',
        publishedAt: obj.publishedAt ?? '',
        revisedAt: obj.revisedAt ?? '',
      },
    ]
  }

  return []
}
// BlogItemType がある前提なら一緒に import してもOK
// import type { BlogItemType } from '~/types/Blog'

export default defineEventHandler<BlogItemType>(async (event) => {
  const config = useRuntimeConfig(event)
  const { slug } = event.context.params as { slug: string }

  const query = getQuery(event) as { draftKey?: string }
  const draftKey = typeof query.draftKey === 'string' ? query.draftKey : undefined
  const cacheKey = `blog:${slug}:${draftKey ?? 'public'}`

  const cached = getCache<BlogItemType>(cacheKey)
  if (cached) return cached

  const baseUrl = `https://${config.microcmsServiceDomain}.microcms.io/api/v1/blog`

  try {
    // プレビューモード（draftKey あり）は詳細 API を使用
    const DETAIL_FIELDS =
      'id,title,slug,body,description,createdAt,updatedAt,publishedAt,revisedAt,image.url,image.width,image.height,categories.id,categories.name,categories.slug'

    if (draftKey) {
      const post = await $fetch<BlogItemType>(`${baseUrl}/${slug}`, {
        headers: {
          'X-MICROCMS-API-KEY': config.microcmsApiKey,
        },
        params: {
          draftKey,
          depth: 1,
          fields: DETAIL_FIELDS,
        },
      })

      if (!post) {
        throw createError({ statusCode: 404, statusMessage: 'Post not found' })
      }

      const normalized = {
        ...post,
        categories: normalizeCategories((post as any).categories),
      }
      setCache(cacheKey, normalized, 2 * 60 * 1000) // 2 分キャッシュ
      return normalized
    }

    // 通常時は slug でフィルタして 1 件取得
    const res = await $fetch<MicroCMSBlogListResponse>(baseUrl, {
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
      params: {
        limit: 1,
        filters: `slug[equals]${slug}`,
        depth: 1, // カテゴリ参照を展開
        fields: DETAIL_FIELDS,
      },
    })

    const post = res.contents?.[0]
    // slug でヒットしなかった場合は contentId 直接指定でもう一度試す
    const fallbackPost: BlogItemType | null =
      post ||
      (await $fetch<BlogItemType>(`${baseUrl}/${slug}`, {
        headers: { 'X-MICROCMS-API-KEY': config.microcmsApiKey },
        params: {
          depth: 1,
          fields: DETAIL_FIELDS,
        },
      }).catch(() => null))

    if (!fallbackPost) {
      throw createError({ statusCode: 404, statusMessage: 'Post not found' })
    }

    const normalized = {
      ...fallbackPost,
      categories: normalizeCategories((fallbackPost as any).categories),
    }
    setCache(cacheKey, normalized, 2 * 60 * 1000)
    return normalized
  } catch (error: any) {
    console.error('microCMS blog fetch error:', error)
    if (error?.statusCode) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch blog by slug from microCMS',
    })
  }
})
