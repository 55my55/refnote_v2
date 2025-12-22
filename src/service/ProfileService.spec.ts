/**
 * ProfileService.spec
 * @package service
 */
import { jest } from '@jest/globals'
import { initProfileState } from '@/constants/initState'

const getProfileByApiMock = jest.fn()

await jest.unstable_mockModule('~/apis/ProfileApi', () => ({
  getProfileByApi: getProfileByApiMock,
}))

const { getProfileService } = await import('./ProfileService')

describe('【Serviceテスト】ProfileService', () => {
  beforeEach(() => {
    getProfileByApiMock.mockReset()
  })

  test('【正常系】プロフィールを取得できる', async () => {
    getProfileByApiMock.mockResolvedValueOnce(initProfileState)

    await expect(getProfileService()).resolves.toEqual(initProfileState)
  })
})
