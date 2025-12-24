// src/service/ArchiveService.ts

/**
 * ArchiveService
 * アーカイブ関連のサービス層
 * @package service
 */

/* apis */
import { getArchiveListApi } from '@/apis/ArchiveApi'
/* types */
import type { ArchiveType } from '@/types/Archive'

/**
 * アーカイブリスト取得
 * - server/api で月別一覧を一括生成した結果を取得する
 */
export const getArchiveListService = async (): Promise<ArchiveType[]> => {
  return await getArchiveListApi()
}
