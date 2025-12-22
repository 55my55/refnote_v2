/**
 * FixArticleApi.spec
 * @package apis
 */
import { jest } from '@jest/globals'
import { initFixedArticleData } from '@/constants/initState'
import { getPolicyApi, getTermApi } from './FixArticleApi'

describe('【Apiテスト】FixArticleApi', () => {
  const fetchMock = jest.fn()

  beforeEach(() => {
    fetchMock.mockReset()
    ;(globalThis as any).$fetch = fetchMock
  })

  test('【正常系】getPolicyApiでデータを取得できる', async () => {
    fetchMock.mockResolvedValueOnce(initFixedArticleData)

    await expect(getPolicyApi()).resolves.toEqual(initFixedArticleData)
  })

  test('【異常系】getTermApiで例外が発生する', async () => {
    fetchMock.mockRejectedValueOnce(new Error('fetch error'))

    await expect(getTermApi()).rejects.toThrow('fetch error')
  })
})
