/**
 * BlogApi.spec
 * @package apis
 */
import { jest } from '@jest/globals'
import { initBlogData, initBlogItem } from '@/constants/initState'
import { getBlogsApi, getBlogByApi } from './BlogApi'

describe('【Apiテスト】BlogApi', () => {
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

  test('【正常系】getBlogsApiでデータを取得できる', async () => {
    const blogData = { ...initBlogData, totalCount: 1 }
    fetchMock.mockResolvedValueOnce(blogData)

    await expect(getBlogsApi(0)).resolves.toEqual(blogData)
  })

  test('【異常系】getBlogsApiで例外が発生する', async () => {
    fetchMock.mockRejectedValueOnce(new Error('fetch error'))

    await expect(getBlogsApi(0)).rejects.toThrow('API ERROR: getBlogsApi')
  })

  test('【正常系】getBlogByApiで詳細を取得できる', async () => {
    fetchMock.mockResolvedValueOnce(initBlogItem)

    await expect(getBlogByApi('test-id')).resolves.toEqual(initBlogItem)
  })

  test('【異常系】getBlogByApiで例外が発生する', async () => {
    fetchMock.mockRejectedValueOnce(new Error('fetch error'))

    await expect(getBlogByApi('test-id')).rejects.toThrow('API ERROR: getBlogByApi')
  })
})
