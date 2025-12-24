import { defineEventHandler, createError, setHeader } from 'h3'
import dayjs from 'dayjs'
import type { ArchiveType } from '~/types/Archive'
import { getCache, setCache } from '~/server/utils/simpleCache'

type MicroCMSArchiveResponse = {
  contents: { createdAt: string }[]
  totalCount: number
  limit: number
  offset: number
}

const BLOG_FIELDS = 'createdAt'
const FETCH_LIMIT = 100
const CACHE_TTL_MS = 5 * 60 * 1000

const toArchiveList = (months: string[]): ArchiveType[] =>
  months.map((month) => {
    const date = dayjs(`${month}-01`)
    return {
      originDate: date.format('YYYY-MM-DD'),
      linkDate: date.format('YYYY-MM'),
      showDate: date.format('YYYY年M月'),
    }
  })

export default defineEventHandler(async (event) => {
  const cacheKey = 'archives'
  const cached = getCache<ArchiveType[]>(cacheKey)
  if (cached) {
    setHeader(event, 'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return cached
  }

  const config = useRuntimeConfig(event)
  const microcmsApiUrl = `https://${config.microcmsServiceDomain}.microcms.io/api/v1/blog`

  const months = new Set<string>()
  let offset = 0
  let totalCount = Infinity
  let guard = 0

  try {
    while (offset < totalCount && guard < 100) {
      const res = await $fetch<MicroCMSArchiveResponse>(microcmsApiUrl, {
        headers: {
          'X-MICROCMS-API-KEY': config.microcmsApiKey,
        },
        params: {
          depth: 1,
          fields: BLOG_FIELDS,
          orders: '-createdAt',
          limit: FETCH_LIMIT,
          offset,
        },
      })

      totalCount = res.totalCount
      res.contents.forEach((item) => {
        if (!item?.createdAt) return
        months.add(dayjs(item.createdAt).format('YYYY-MM'))
      })

      offset += res.limit
      guard += 1

      if (res.limit === 0) break
    }

    const archiveList = toArchiveList(
      Array.from(months).sort((a, b) => (a < b ? 1 : -1)),
    )

    setHeader(event, 'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    setCache(cacheKey, archiveList, CACHE_TTL_MS)
    return archiveList
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to build archives from microCMS',
    })
  }
})
