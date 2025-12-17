// src/composables/useProfilePageTransition.ts

/**
 * useProfilePageTransition
 * プロフィール遷移アクションを UI から分離して再利用可能にした状態管理ロジック
 */

import { useRouter } from 'vue-router'
import { NAVIGATION_LINK } from '@/constants/navigation'

export const useProfilePageTransition = () => {
  const router = useRouter()

  /**
   * プロフィール画面遷移のクリック処理
   * Vue の template からそのまま渡して使う想定
   */
  const onClickTransitionProfilePage = (event?: MouseEvent) => {
    event?.preventDefault()
    router.push(NAVIGATION_LINK.PROFILE)
  }

  return {
    onClickTransitionProfilePage,
  }
}
