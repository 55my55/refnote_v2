/**
 * ProfileApi.ts
 * プロフィールAPI
 * @package apis
 */

import type { ProfileType } from '@/types/Profile'
import { initProfileState } from '@/constants/initState'

/**
 * constant
 */
const BASE_URL = '/api/microcms/profile'

type ProfileResponse = {
  profile: ProfileType
}

/**
 * プロフィール詳細取得
 * @returns {Promise<ProfileType>}
 */
export const getProfileByApi = async (): Promise<ProfileType> => {
  let profile: ProfileType = initProfileState

  try {
    const res = await $fetch<ProfileResponse>(BASE_URL)
    profile = res.profile
  } catch (error) {
    console.error(error)
    throw new Error('API ERROR: getProfileByApi')
  }

  return profile
}
