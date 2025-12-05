// src/logic/DateLogic.ts

import dayjs from 'dayjs'
import 'dayjs/locale/ja'

// 日本語化
dayjs.locale('ja')

// 現在日時取得
export const getCurrentDateLogic = () => {
  return dayjs()
}

// ブログ開始日時取得
export const getBlogStartDateLogic = () => {
  return dayjs('2021-04-01')
}

// 月初の日時を取得
export const getStartOfMonthLogic = (date: string): string => {
  return dayjs(date).startOf('month').format()
}

// 月末の日時を取得
export const getEndOfMonthLogic = (date: string): string => {
  return dayjs(date).endOf('month').format()
}

// 日付フォーマット変換(YYYY.M.D)
export const showYearMonthDayLogic = (date: string): string => {
  return dayjs(date).format('YYYY.M.D')
}

// 日付フォーマット変換(YYYY-MM-DD)
export const changeYearMonthDateLogic = (date: string): string => {
  return dayjs(date).format('YYYY-MM-DD')
}

// 日付フォーマット変換(YYYY-MM)
export const changeYearMonthLogic = (date: string): string => {
  return dayjs(date).format('YYYY-MM')
}

// 日付フォーマット変換(YYYY年M月)
export const changeShowYearMonthLogic = (date: string): string => {
  return dayjs(date).format('YYYY年M月')
}

// 減算処理 (月毎)
export const subtractMonthDateLogic = (
  date: string,
  diffMonth: number
): string => {
  return dayjs(date).subtract(diffMonth, 'M').format()
}

// 1日増算処理
export const addOneDayLogic = (date: string): string => {
  return dayjs(date).add(1, 'd').format()
}

// 1日減算処理
export const subtractOneDayLogic = (date: string): string => {
  return dayjs(date).subtract(1, 'd').format()
}
