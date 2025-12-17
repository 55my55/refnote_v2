// server/api/microcms/profile.get.ts
import { defineEventHandler, createError } from 'h3'
import type { ProfileType } from '~/types/Profile'
import { initImageState, initProfileState } from '~/constants/initState'
import { getCache, setCache } from '~/server/utils/simpleCache'

type MicroCMSProfileListResponse = {
  contents: Record<string, unknown>[]
  totalCount: number
  offset: number
  limit: number
}

// NOTE:
// microCMS レスポンスを軽量化するため depth:1 + fields で必要最小限のみ取得
// microCMS のフィールドIDは snake_case 前提
const PROFILE_FIELDS =
  'id,name,english_name,position,introduction,description,contents,createdAt,updatedAt,publishedAt,revisedAt,user_image.url,user_image.width,user_image.height,article_image.url,article_image.width,article_image.height,twitter,github,facebook'

// microCMS の snake_case を ProfileType の camelCase に正規化
const normalizeProfile = (raw: Record<string, any> | null | undefined): ProfileType => {
  if (!raw) return initProfileState

  const userImage = raw.userImage ?? raw.user_image ?? initImageState
  const articleImage = raw.articleImage ?? raw.article_image ?? initImageState

  return {
    id: raw.id ?? 'profile',
    createdAt: raw.createdAt ?? '',
    updatedAt: raw.updatedAt ?? '',
    publishedAt: raw.publishedAt ?? '',
    revisedAt: raw.revisedAt ?? '',
    name: raw.name ?? '',
    englishName: raw.englishName ?? raw.english_name ?? '',
    position: raw.position ?? '',
    introduction: raw.introduction ?? '',
    userImage: {
      url: userImage.url ?? '',
      width: userImage.width ?? 0,
      height: userImage.height ?? 0,
    },
    articleImage: {
      url: articleImage.url ?? '',
      width: articleImage.width ?? 0,
      height: articleImage.height ?? 0,
    },
    description: raw.description ?? '',
    contents: raw.contents ?? '',
    twitter: raw.twitter ?? '',
    github: raw.github ?? '',
    facebook: raw.facebook ?? '',
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const baseUrl = `https://${config.microcmsServiceDomain}.microcms.io/api/v1`
  const cacheKey = 'profile'

  const cached = getCache<{ profile: ProfileType }>(cacheKey)
  if (cached) return cached

  const fetchSingle = async () =>
    await $fetch<Record<string, unknown>>(`${baseUrl}/profile`, {
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
      params: {
        depth: 1,
        fields: PROFILE_FIELDS,
      },
    })

  const fetchList = async () =>
    await $fetch<MicroCMSProfileListResponse>(`${baseUrl}/profiles`, {
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
      params: { limit: 1, depth: 1, fields: PROFILE_FIELDS },
    })

  try {
    // single -> list の順で試す。どちらも失敗したら初期値を返す
    const resSingle = await fetchSingle().catch(() => null)
    if (resSingle) {
      const normalized = { profile: normalizeProfile(resSingle) }
      setCache(cacheKey, normalized, 5 * 60 * 1000) // 5 分キャッシュ
      return normalized
    }

    const resList = await fetchList().catch(() => null)
    const first = resList?.contents?.[0] ?? null

    const normalized = { profile: normalizeProfile(first) }
    setCache(cacheKey, normalized, 5 * 60 * 1000)
    return normalized
  } catch (error) {
    console.error(error)
    // 失敗時も初期値を返して UI を壊さない
    return { profile: initProfileState }
  }
})
