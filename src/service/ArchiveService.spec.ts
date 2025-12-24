/**
 * ArchiveService.spec
 * @package service
 */
import { jest } from '@jest/globals'

const getArchiveListApiMock = jest.fn()

await jest.unstable_mockModule('~/apis/ArchiveApi', () => ({
  getArchiveListApi: getArchiveListApiMock,
}))

const { getArchiveListService } = await import('./ArchiveService')

describe('【Serviceテスト】ArchiveService', () => {
  beforeEach(() => {
    getArchiveListApiMock.mockReset()
  })

  test('【正常系】APIの結果がそのまま返る', async () => {
    const archiveList = [
      {
        originDate: '2024-01-01',
        linkDate: '2024-01',
        showDate: '2024年1月',
      },
    ]
    getArchiveListApiMock.mockResolvedValueOnce(archiveList)

    await expect(getArchiveListService()).resolves.toEqual(archiveList)
  })

  test('【異常系】APIで例外が発生した場合は例外が投げられる', async () => {
    getArchiveListApiMock.mockRejectedValueOnce(new Error('fetch error'))

    await expect(getArchiveListService()).rejects.toThrow('fetch error')
  })
})
