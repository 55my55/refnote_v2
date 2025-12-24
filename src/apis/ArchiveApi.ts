// src/apis/ArchiveApi.ts

/**
 * ArchiveApi
 * アーカイブ取得用 API ラッパー
 * @package apis
 */

import type { ArchiveType } from '~/types/Archive'

export const getArchiveListApi = async (): Promise<ArchiveType[]> => {
  let archiveList: ArchiveType[] = []

  try {
    const res = await $fetch<ArchiveType[]>('/api/microcms/archives')
    archiveList = res
  } catch (error) {
    console.error(error)
    throw new Error('API ERROR: getArchiveListApi')
  }

  return archiveList
}
