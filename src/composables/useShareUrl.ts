/**
 * useShareUrl
 * シェア用 URL を生成し、UI から分離して扱うための状態管理ロジック
 * 現在のルート情報から共有リンクを一元的に作成する
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createShareUrlLogic } from '@/logic/CommonLogic'

export const useShareUrl = () => {
  const router = useRouter()

  // 一度だけ計算したシェア用URL
  const shareUrl = ref(createShareUrlLogic(router))

  return {
    shareUrl,
  }
}
