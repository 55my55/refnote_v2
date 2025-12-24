/**
 * ArchiveApi.spec
 * @package apis
 */
import { jest } from '@jest/globals'
import type { ArchiveType } from '@/types/Archive'
import { getArchiveListApi } from './ArchiveApi'

describe('【Apiテスト】ArchiveApi', () => {
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

  test('【正常系】getArchiveListApiで一覧を取得できる', async () => {
    const archives: ArchiveType[] = [
      {
        originDate: '2024-01-01',
        linkDate: '2024-01',
        showDate: '2024年1月',
      },
    ]
    fetchMock.mockResolvedValueOnce(archives)

    await expect(getArchiveListApi()).resolves.toEqual(archives)
  })

  test('【異常系】getArchiveListApiで例外が発生する', async () => {
    fetchMock.mockRejectedValueOnce(new Error('fetch error'))

    await expect(getArchiveListApi()).rejects.toThrow('API ERROR: getArchiveListApi')
  })
})
