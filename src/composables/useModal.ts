// src/composables/useModal.ts

/**
 * useModal
 * 検索モーダル・メニューモーダルの表示状態と遷移アクションを管理するロジック
 * UI から状態管理と画面遷移を切り離すための責務レイヤー
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NAVIGATION_LINK } from '@/constants/navigation'

export const useModal = () => {
  const router = useRouter()

  // SearchModal の表示状態
  const isSearchModalVisible = ref(false)
  // MenuModal の表示状態
  const isMenuModalVisible = ref(false)

  /**
   * SearchModal を開く
   */
  const handleOpenSearchModal = () => {
    isSearchModalVisible.value = true
  }

  /**
   * SearchModal を閉じる
   */
  const handleCloseSearchModal = () => {
    isSearchModalVisible.value = false
  }

  /**
   * MenuModal を開く
   */
  const handleOpenMenuModal = () => {
    isMenuModalVisible.value = true
  }

  /**
   * MenuModal を閉じる
   */
  const handleCloseMenuModal = () => {
    isMenuModalVisible.value = false
  }

  /**
   * 「ホーム」画面遷移処理
   */
  const handleHomeLink = () => {
    router.push(NAVIGATION_LINK.TOP)
    handleCloseMenuModal()
  }

  /**
   * 「このブログについて」画面遷移処理
   */
  const handleAboutLink = () => {
    router.push(NAVIGATION_LINK.ABOUT)
    handleCloseMenuModal()
  }

  /**
   * 「プロフィール」画面遷移処理
   */
  const handleProfileLink = () => {
    router.push(NAVIGATION_LINK.PROFILE)
    handleCloseMenuModal()
  }

  return {
    // state
    isSearchModalVisible,
    isMenuModalVisible,
    // actions
    handleOpenSearchModal,
    handleCloseSearchModal,
    handleOpenMenuModal,
    handleCloseMenuModal,
    handleHomeLink,
    handleAboutLink,
    handleProfileLink,
  }
}
