// src/service/ArchiveService.ts

/**
 * ArchiveService
 * アーカイブ関連のサービス層
 * @package service
 */

/* service */
import { isBlogsArchivesService } from '@/service/BlogService'
/* logic */
import {
  getCurrentDateLogic,
  getBlogStartDateLogic,
  getStartOfMonthLogic,
  getEndOfMonthLogic,
  changeYearMonthDateLogic,
  changeYearMonthLogic,
  changeShowYearMonthLogic,
  subtractMonthDateLogic,
} from '@/logic/DateLogic'
/* types */
import type { ArchiveType } from '@/types/Archive'

/**
 * アーカイブリスト取得
 * - ブログ開始月〜現在月までを走査し、記事がある月だけ ArchiveType に整形して返す
 */
export const getArchiveListService = async (): Promise<ArchiveType[]> => {
  const currentDate = getCurrentDateLogic()      // 現在日時
  const startBlogDate = getBlogStartDateLogic()  // ブログ開始日時

  // ブログ開始前ならアーカイブなし
  if (currentDate < startBlogDate) return []

  // 現在月とブログ開始月の差分（月数）
  const diffMonthCount = currentDate.diff(startBlogDate, 'month')

  const archiveList: ArchiveType[] = []

  // 差分月数ぶんループして、各月に記事があるか判定
  for (let i = 0; i <= diffMonthCount; i++) {
    let targetDate = currentDate.format()

    // 現在月以外は month を減算
    if (i > 0) {
      targetDate = subtractMonthDateLogic(targetDate, i)
    }

    const startMonth = getStartOfMonthLogic(targetDate) // 月初
    const endMonth = getEndOfMonthLogic(targetDate)     // 月末

    // 対象月に記事が存在する場合のみアーカイブに追加
    if (await isBlogsArchivesService(startMonth, endMonth)) {
      archiveList.push({
        originDate: changeYearMonthDateLogic(startMonth), // YYYY-MM-DD
        linkDate:   changeYearMonthLogic(startMonth),      // YYYY-MM
        showDate:   changeShowYearMonthLogic(startMonth),  // 表示用（例: 2024年01月）
      })
    }
  }

  return archiveList
}
