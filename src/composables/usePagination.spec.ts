/**
 * usePagination.spec
 * @package composables
 */
import { jest } from '@jest/globals'
import { nextTick } from 'vue'

const useRouteMock = jest.fn()

await jest.unstable_mockModule('vue-router', () => ({
  useRoute: useRouteMock,
}))

const { usePagination } = await import('./usePagination')

describe('【Composablesテスト】usePagination', () => {
  beforeEach(() => {
    useRouteMock.mockReset()
  })

  test('【正常系】query.pageがstringの場合、currentPageに反映される', async () => {
    useRouteMock.mockReturnValue({ query: { page: '3' } })
    const { currentPage } = usePagination()

    await nextTick()
    expect(currentPage.value).toBe(3)
  })

  test('【正常系】query.pageがundefinedの場合、currentPageは1になる', async () => {
    useRouteMock.mockReturnValue({ query: {} })
    const { currentPage } = usePagination()

    await nextTick()
    expect(currentPage.value).toBe(1)
  })

  test('【正常系】pageRangeが正しく生成される', () => {
    useRouteMock.mockReturnValue({ query: {} })
    const { createPageRange } = usePagination()

    expect(createPageRange(1, 3)).toEqual([1, 2, 3])
  })

  test('【異常系】end < start の場合、空配列が返却される', () => {
    useRouteMock.mockReturnValue({ query: {} })
    const { createPageRange } = usePagination()

    expect(createPageRange(3, 1)).toEqual([])
  })
})
