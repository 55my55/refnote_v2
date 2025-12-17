/**
 * ProfileApi.ts
 * プロフィールAPI
 * @package apis
 */

import type { ProfileType } from '~/types/Profile'
import { initProfileState } from '~/constants/initState'

/**
 * constant
 */
const BASE_URL = '/api/microcms/profile'

type ProfileResponse = {
  profile: ProfileType
}
type ProfileListResponse = {
  contents: ProfileType[]
  totalCount: number
  offset: number
  limit: number
}

const isProfile = (data: unknown): data is ProfileType =>
  typeof data === 'object' &&
  data !== null &&
  'id' in data &&
  typeof (data as any).id === 'string'

const extractProfile = (res: ProfileResponse | ProfileListResponse): ProfileType => {
  if ('profile' in res && isProfile((res as any).profile)) {
    return (res as any).profile
  }
  if ('contents' in res && Array.isArray(res.contents) && isProfile(res.contents[0])) {
    return res.contents[0]
  }
  return initProfileState
}

/**
 * プロフィール詳細取得
 * @returns {Promise<ProfileType>}
 */
export const getProfileByApi = async (): Promise<ProfileType> => {
  try {
    const res = await $fetch<ProfileResponse | ProfileListResponse>(BASE_URL)
    return extractProfile(res)
  } catch (error) {
    console.error(error)
    throw new Error('API ERROR: getProfileByApi')
  }
}
