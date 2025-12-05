// src/composables/useLayout.ts

/**
 * useLayout
 * レイアウト操作（ページトップスクロールなど）の責務をまとめたロジック
 * UI からイベント処理を切り離し、再利用性を高める分離レイヤー
 */


export const useLayout = () => {
  /**
   * ページトップへスクロール
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return {
    scrollToTop,
  }
}
