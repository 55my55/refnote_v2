/**
 * useSearchForm
 * 検索フォームの入力状態と検索実行アクションを UI から分離した状態管理ロジック
 * Enter での遷移処理やモーダル連携も含めて一箇所に集約する
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface UseSearchFormParam {
  handleCloseSearchModal?: () => void
}

export const useSearchForm = ({ handleCloseSearchModal }: UseSearchFormParam) => {
  const router = useRouter()

  // 検索テキスト
  const searchText = ref('')

  /**
   * 検索キーワード変更処理
   */
  const onChangeSearchText = (event: Event) => {
    const target = event.target as HTMLInputElement
    searchText.value = target.value
  }

  /**
   * 検索フォーム キーアップ処理（通常フォーム）
   */
  const onKeyUpSearchBlog = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && searchText.value !== '') {
      router.push({
        path: '/search',
        query: { keyword: searchText.value },
      })
    }
  }

  /**
   * 検索フォーム キーアップ処理（モーダル版）
   * モーダルを閉じるアクション付き
   */
  const onKeyUpSearchBlogModal = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && searchText.value !== '') {
      router.push({
        path: '/search',
        query: { keyword: searchText.value },
      })
      if (handleCloseSearchModal) handleCloseSearchModal()
    }
  }

  return {
    // state
    searchText,

    // actions
    onChangeSearchText,
    onKeyUpSearchBlog,
    onKeyUpSearchBlogModal,
  }
}
