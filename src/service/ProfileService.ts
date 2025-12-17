// src/service/ProfileService.ts

/**
 * ProfileService
 * プロフィール取得のサービス層
 * @package service
 */

import { getProfileByApi } from '~/apis/ProfileApi'
import type { ProfileType } from '~/types/Profile'

/**
 * プロフィール情報を取得
 */
export const getProfileService = async (): Promise<ProfileType> => {
  const profile = await getProfileByApi()
  return profile
}
