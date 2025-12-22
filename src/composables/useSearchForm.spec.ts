/**
 * useSearchForm.spec
 * @package composables
 */
import { jest } from '@jest/globals'

const pushMock = jest.fn()
const useRouterMock = jest.fn(() => ({
  push: pushMock,
}))

await jest.unstable_mockModule('vue-router', () => ({
  useRouter: useRouterMock,
}))

const { useSearchForm } = await import('./useSearchForm')

describe('【Composablesテスト】useSearchForm', () => {
  beforeEach(() => {
    pushMock.mockClear()
    useRouterMock.mockClear()
  })

  test('【正常系】searchTextが空文字で初期化される', () => {
    const { searchText } = useSearchForm({})
    expect(searchText.value).toBe('')
  })

  test('【正常系】searchTextの値を更新できる', () => {
    const { searchText, onChangeSearchText } = useSearchForm({})
    const eventObject = {
      target: { value: 'テスト' },
    } as unknown as Event

    onChangeSearchText(eventObject)
    expect(searchText.value).toBe('テスト')
  })

  test('【正常系】EnterかつsearchTextありの場合、router.pushが実行される', () => {
    const { onChangeSearchText, onKeyUpSearchBlog } = useSearchForm({})
    const eventChangeObject = {
      target: { value: 'テスト' },
    } as unknown as Event
    const eventInputObject = {
      key: 'Enter',
    } as KeyboardEvent

    onChangeSearchText(eventChangeObject)
    onKeyUpSearchBlog(eventInputObject)

    expect(pushMock).toHaveBeenCalledWith({
      path: '/search',
      query: { keyword: 'テスト' },
    })
  })

  test('【異常系】Enter以外の場合、router.pushは実行されない', () => {
    const { onChangeSearchText, onKeyUpSearchBlog } = useSearchForm({})
    const eventChangeObject = {
      target: { value: 'テスト' },
    } as unknown as Event
    const eventInputObject = {
      key: 'Escape',
    } as KeyboardEvent

    onChangeSearchText(eventChangeObject)
    onKeyUpSearchBlog(eventInputObject)

    expect(pushMock).not.toHaveBeenCalled()
  })

  test('【正常系】モーダル版ではrouter.pushとcloseが実行される', () => {
    const handleCloseSearchModal = jest.fn()
    const { onChangeSearchText, onKeyUpSearchBlogModal } = useSearchForm({
      handleCloseSearchModal,
    })
    const eventChangeObject = {
      target: { value: 'テスト' },
    } as unknown as Event
    const eventInputObject = {
      key: 'Enter',
    } as KeyboardEvent

    onChangeSearchText(eventChangeObject)
    onKeyUpSearchBlogModal(eventInputObject)

    expect(pushMock).toHaveBeenCalled()
    expect(handleCloseSearchModal).toHaveBeenCalled()
  })
})
