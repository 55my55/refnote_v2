/**
 * DateLogic.spec
 * @package logic
 */
import dayjs from 'dayjs'
import {
  getCurrentDateLogic,
  getBlogStartDateLogic,
  getStartOfMonthLogic,
  getEndOfMonthLogic,
  showYearMonthDayLogic,
  changeYearMonthDateLogic,
  changeYearMonthLogic,
  changeShowYearMonthLogic,
  subtractMonthDateLogic,
  addOneDayLogic,
  subtractOneDayLogic,
} from './DateLogic'

describe('【Logicテスト】DateLogic', () => {
  test('【正常系】現在日時が取得できる', () => {
    expect(getCurrentDateLogic().isValid()).toBe(true)
  })

  test('【正常系】ブログ開始日を取得できる', () => {
    expect(getBlogStartDateLogic().format('YYYY-MM-DD')).toBe('2021-04-01')
  })

  test('【正常系】月初の日時を取得', () => {
    const date = '2021-05-15'
    expect(getStartOfMonthLogic(date)).toBe(dayjs(date).startOf('month').format())
  })

  test('【正常系】月末の日時を取得', () => {
    const date = '2021-05-15'
    expect(getEndOfMonthLogic(date)).toBe(dayjs(date).endOf('month').format())
  })

  test('【正常系】「YYYY.M.D」のフォーマットに変換される', () => {
    expect(showYearMonthDayLogic('2021-05-02')).toBe('2021.5.2')
  })

  test('【正常系】「YYYY-MM-DD」のフォーマットに変換される', () => {
    expect(changeYearMonthDateLogic('2021-05-02')).toBe('2021-05-02')
  })

  test('【正常系】「YYYY-MM」のフォーマットに変換される', () => {
    expect(changeYearMonthLogic('2021-05-02')).toBe('2021-05')
  })

  test('【正常系】「YYYY年M月」のフォーマットに変換される', () => {
    expect(changeShowYearMonthLogic('2021-05-02')).toBe('2021年5月')
  })

  test('【正常系】月単位で減算処理される', () => {
    const date = '2021-05-15'
    expect(subtractMonthDateLogic(date, 1)).toBe(dayjs(date).subtract(1, 'M').format())
  })

  test('【正常系】1日増算処理が実行される', () => {
    const date = '2021-05-15'
    expect(addOneDayLogic(date)).toBe(dayjs(date).add(1, 'd').format())
  })

  test('【正常系】1日減算処理が実行される', () => {
    const date = '2021-05-15'
    expect(subtractOneDayLogic(date)).toBe(dayjs(date).subtract(1, 'd').format())
  })
})
