/**
 * useDate
 * 日付フォーマット処理を UI から分離し、再利用可能にした状態管理ロジック
 * 日付文字列を指定フォーマットへ変換する責務のみを担う
 */

import { computed } from 'vue'
import { showYearMonthDayLogic } from '@/logic/DateLogic'

interface UseDateParam {
  date: string
}

export const useDate = ({ date }: UseDateParam) => {
  // フォーマット済み日付（YYYY.M.D）
  const showYearMonthDate = computed(() => showYearMonthDayLogic(date))

  return {
    showYearMonthDate,
  }
}
