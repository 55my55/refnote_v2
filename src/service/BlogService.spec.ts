/**
 * BlogService.spec
 * @package service
 */
import { jest } from '@jest/globals'
import { initBlogItem } from '@/constants/initState'

const getBlogsApiMock = jest.fn()
const getBlogByApiMock = jest.fn()
const getBlogContainArchiveMonthApiMock = jest.fn()
const getBlogArchivesCountApiMock = jest.fn()

await jest.unstable_mockModule('~/apis/BlogApi', () => ({
  getBlogsApi: getBlogsApiMock,
  getBlogByApi: getBlogByApiMock,
  getBlogContainArchiveMonthApi: getBlogContainArchiveMonthApiMock,
  getBlogArchivesCountApi: getBlogArchivesCountApiMock,
}))

const getStartOfMonthLogicMock = jest.fn((date: string) => date)
const getEndOfMonthLogicMock = jest.fn((date: string) => date)
const addOneDayLogicMock = jest.fn((date: string) => date)
const subtractOneDayLogicMock = jest.fn((date: string) => date)

await jest.unstable_mockModule('~/logic/DateLogic', () => ({
  getStartOfMonthLogic: getStartOfMonthLogicMock,
  getEndOfMonthLogic: getEndOfMonthLogicMock,
  addOneDayLogic: addOneDayLogicMock,
  subtractOneDayLogic: subtractOneDayLogicMock,
}))

const { getPostBySlug, isBlogsArchivesService } = await import('./BlogService')

describe('【Serviceテスト】BlogService', () => {
  beforeEach(() => {
    getBlogByApiMock.mockReset()
    getBlogArchivesCountApiMock.mockReset()
  })

  test('【正常系】getPostBySlugで記事詳細を取得できる', async () => {
    getBlogByApiMock.mockResolvedValueOnce(initBlogItem)

    await expect(getPostBySlug('test-id')).resolves.toEqual(initBlogItem)
  })

  test('【異常系】getPostBySlugでidが空の場合に例外が発生する', async () => {
    await expect(getPostBySlug('')).rejects.toThrow('id is required for getPostBySlug')
  })

  test('【正常系】isBlogsArchivesServiceで記事が存在する場合trueが返る', async () => {
    getBlogArchivesCountApiMock.mockResolvedValueOnce(1)

    await expect(isBlogsArchivesService('2021-01-01', '2021-01-31')).resolves.toBe(
      true,
    )
  })

  test('【異常系】isBlogsArchivesServiceで記事が存在しない場合falseが返る', async () => {
    getBlogArchivesCountApiMock.mockResolvedValueOnce(0)

    await expect(isBlogsArchivesService('2021-01-01', '2021-01-31')).resolves.toBe(
      false,
    )
  })
})
