// src/service/SidebarService.ts

/**
 * SidebarService
 * サイドバーで必要なデータをまとめて取得
 * @package service
 */

import { getArchiveListService } from '~/service/ArchiveService'
import { getCategoryListService } from '~/service/CategoryService'
import { getProfileService } from '~/service/ProfileService'
import { initProfileState } from '~/constants/initState'
import type { SidebarDataType } from '~/types/Sidebar'

export const getSidebarDataService = async (): Promise<SidebarDataType> => {
  const [categoriesRes, profileRes, archiveRes] = await Promise.allSettled([
    getCategoryListService(),
    getProfileService(),
    getArchiveListService(),
  ])

  const categories = categoriesRes.status === 'fulfilled' ? categoriesRes.value : []
  const profile = profileRes.status === 'fulfilled' ? profileRes.value : initProfileState
  const archiveList = archiveRes.status === 'fulfilled' ? archiveRes.value : []

  return {
    categories,
    profile,
    archiveList,
  }
}
