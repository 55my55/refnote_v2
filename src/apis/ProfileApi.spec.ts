/**
 * ProfileApi.spec
 * @package apis
 */
import { jest } from '@jest/globals'
import { initProfileState } from '@/constants/initState'
import { getProfileByApi } from './ProfileApi'

describe('【Apiテスト】ProfileApi', () => {
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

  test('【正常系】getProfileByApiでプロフィールを取得できる', async () => {
    fetchMock.mockResolvedValueOnce({ profile: initProfileState })

    await expect(getProfileByApi()).resolves.toEqual(initProfileState)
  })

  test('【異常系】getProfileByApiで例外が発生する', async () => {
    fetchMock.mockRejectedValueOnce(new Error('fetch error'))

    await expect(getProfileByApi()).rejects.toThrow('API ERROR: getProfileByApi')
  })
})
