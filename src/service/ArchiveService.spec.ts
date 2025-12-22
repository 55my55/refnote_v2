/**
 * ArchiveService.spec
 * @package service
 */
import dayjs from 'dayjs'
import { jest } from '@jest/globals'

const isBlogsArchivesServiceMock = jest.fn()

await jest.unstable_mockModule('@/service/BlogService', () => ({
  isBlogsArchivesService: isBlogsArchivesServiceMock,
}))

const getCurrentDateLogicMock = jest.fn()
const getBlogStartDateLogicMock = jest.fn()
const getStartOfMonthLogicMock = jest.fn()
const getEndOfMonthLogicMock = jest.fn()
const changeYearMonthDateLogicMock = jest.fn()
const changeYearMonthLogicMock = jest.fn()
const changeShowYearMonthLogicMock = jest.fn()
const subtractMonthDateLogicMock = jest.fn()

await jest.unstable_mockModule('@/logic/DateLogic', () => ({
  getCurrentDateLogic: getCurrentDateLogicMock,
  getBlogStartDateLogic: getBlogStartDateLogicMock,
  getStartOfMonthLogic: getStartOfMonthLogicMock,
  getEndOfMonthLogic: getEndOfMonthLogicMock,
  changeYearMonthDateLogic: changeYearMonthDateLogicMock,
  changeYearMonthLogic: changeYearMonthLogicMock,
  changeShowYearMonthLogic: changeShowYearMonthLogicMock,
  subtractMonthDateLogic: subtractMonthDateLogicMock,
}))

const { getArchiveListService } = await import('./ArchiveService')

describe('【Serviceテスト】ArchiveService', () => {
  beforeEach(() => {
    isBlogsArchivesServiceMock.mockReset()
    getCurrentDateLogicMock.mockReset()
    getBlogStartDateLogicMock.mockReset()
  })

  test('【正常系】ブログ開始前の場合は空配列が返る', async () => {
    getCurrentDateLogicMock.mockReturnValue(dayjs('2021-03-01'))
    getBlogStartDateLogicMock.mockReturnValue(dayjs('2021-04-01'))

    await expect(getArchiveListService()).resolves.toEqual([])
  })

  test('【正常系】対象月に記事がある場合、アーカイブが1件返る', async () => {
    getCurrentDateLogicMock.mockReturnValue(dayjs('2021-06-15'))
    getBlogStartDateLogicMock.mockReturnValue(dayjs('2021-06-01'))

    getStartOfMonthLogicMock.mockReturnValue('2021-06-01')
    getEndOfMonthLogicMock.mockReturnValue('2021-06-30')
    changeYearMonthDateLogicMock.mockReturnValue('2021-06-01')
    changeYearMonthLogicMock.mockReturnValue('2021-06')
    changeShowYearMonthLogicMock.mockReturnValue('2021年6月')

    isBlogsArchivesServiceMock.mockResolvedValueOnce(true)

    await expect(getArchiveListService()).resolves.toEqual([
      {
        originDate: '2021-06-01',
        linkDate: '2021-06',
        showDate: '2021年6月',
      },
    ])
  })
})
