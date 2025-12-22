/**
 * CategoryApi.spec
 * @package apis
 */
import { jest } from '@jest/globals'
import { initCategoryData } from '@/constants/initState'
import { getCategoriesApi, getCategoryByApi } from './CategoryApi'

describe('【Apiテスト】CategoryApi', () => {
  const fetchMock = jest.fn()
  let consoleErrorSpy: jest.SpyInstance

  beforeEach(() => {
    fetchMock.mockReset()
    ;(globalThis as any).$fetch = fetchMock
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  test('【正常系】getCategoriesApiで一覧を取得できる', async () => {
    fetchMock.mockResolvedValueOnce({ contents: [initCategoryData] })

    await expect(getCategoriesApi()).resolves.toEqual([initCategoryData])
  })

  test('【異常系】getCategoriesApiで例外が発生する', async () => {
    fetchMock.mockRejectedValueOnce(new Error('fetch error'))

    await expect(getCategoriesApi()).rejects.toThrow('API ERROR: getCategoriesApi')
  })

  test('【正常系】getCategoryByApiで詳細を取得できる', async () => {
    fetchMock.mockResolvedValueOnce(initCategoryData)

    await expect(getCategoryByApi('test-id')).resolves.toEqual(initCategoryData)
  })

  test('【異常系】getCategoryByApiで例外が発生する', async () => {
    fetchMock.mockRejectedValueOnce(new Error('fetch error'))

    await expect(getCategoryByApi('test-id')).rejects.toThrow('API ERROR: getCategoryByApi')
  })
})
