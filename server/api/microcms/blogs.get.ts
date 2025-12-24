import { defineEventHandler, getQuery, createError, setHeader } from 'h3'
import type { BlogDataType, MicroCMSBlogListResponse } from '~/types/Blog'
import type { CategoryType } from '~/types/Category'
import { getCache, setCache } from '~/server/utils/simpleCache'

const normalizeCategories = (raw: unknown): CategoryType[] => {
  if (Array.isArray(raw)) {
    const arr = raw as any[]
    // 文字列配列の場合
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
    // オブジェクト配列の場合（参照展開済み）
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

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const queries = getQuery(event)

  const microcmsApiUrl = `https://${config.microcmsServiceDomain}.microcms.io/api/v1/blog`
  const cacheKey = `blogs:${JSON.stringify(queries)}`

  const cached = getCache<BlogDataType>(cacheKey)
  if (cached) {
    setHeader(event, 'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return cached
  }

  try {
    // microCMS の生レスポンス
    const res = await $fetch<MicroCMSBlogListResponse>(microcmsApiUrl, {
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
      params: {
        // 一覧は軽量化のため depth 1 + 必要フィールドのみ
        depth: 1,
        fields:
          'id,title,slug,createdAt,updatedAt,publishedAt,revisedAt,description,image.url,image.width,image.height,categories',
        ...queries,
      },
    })

    // ★ 生レスポンスを BlogDataType に整形し、カテゴリを正規化
    const data: BlogDataType = {
      blogList: res.contents.map((item) => ({
        ...item,
        categories: normalizeCategories((item as any).categories),
      })),
      totalCount: res.totalCount,
    }

    setHeader(event, 'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')

    // 5 分だけメモリキャッシュ
    setCache(cacheKey, data, 5 * 60 * 1000)

    return data
  } catch (err) {
    console.error(err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch blogs from microCMS',
    })
  }
})
