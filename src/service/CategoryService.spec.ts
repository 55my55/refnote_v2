/**
 * CategoryService.spec
 * @package service
 */
import { jest } from '@jest/globals'
import { initCategoryData } from '@/constants/initState'

const getCategoriesApiMock = jest.fn()

await jest.unstable_mockModule('~/apis/CategoryApi', () => ({
  getCategoriesApi: getCategoriesApiMock,
}))

const { getCategoryListService } = await import('./CategoryService')

describe('【Serviceテスト】CategoryService', () => {
  beforeEach(() => {
    getCategoriesApiMock.mockReset()
  })

  test('【正常系】カテゴリ一覧を取得できる', async () => {
    getCategoriesApiMock.mockResolvedValueOnce([initCategoryData])

    await expect(getCategoryListService()).resolves.toEqual([initCategoryData])
  })

  test('【異常系】APIがundefinedを返した場合は空配列になる', async () => {
    getCategoriesApiMock.mockResolvedValueOnce(undefined)

    await expect(getCategoryListService()).resolves.toEqual([])
  })
})
