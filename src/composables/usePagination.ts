// src/composables/usePagination.ts

/**
 * usePagination
 * ページネーションの現在ページ状態とページ番号生成の責務を持つロジック
 * UI のページ番号計算を分離し、再利用可能な状態管理を実現する
 */

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const usePagination = () => {
  const route = useRoute()

  // 現在のページ番号
  const currentPage = ref(1)

  /**
   * pageRange（ページ番号の配列生成）
   * @param start 開始ページ
   * @param end   終了ページ
   */
  const createPageRange = (start: number, end: number): number[] => {
    if (end < start) return []
    return [...Array(end - start + 1)].map((_, i) => start + i)
  }

  /**
   * route.query.page の変化を監視して currentPage を更新
   */
  watch(
    () => route.query.page,
    (page) => {
      if (typeof page === 'string') {
        currentPage.value = Number(page)
      } else {
        currentPage.value = 1
      }
    },
    { immediate: true },
  )

  return {
    currentPage,
    createPageRange,
  }
}
