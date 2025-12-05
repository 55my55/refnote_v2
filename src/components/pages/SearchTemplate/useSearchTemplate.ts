/**
 * useSearchTemplate
 */
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
/* logics */
import { searchBlogListLogic } from '@/logic/BlogLogic'
/* contexts */
import { useBlogState } from '@/providers/BlogProviderInjectionKey'

export const useSearchTemplate = () => {
  const route = useRoute()
  const { blogList } = useBlogState() // blogList は BlogItemType[] の配列

  // 初期検索キーワード（クエリから取得）
  const queryText = computed(() => {
    const keyword = route.query.keyword
    return typeof keyword === 'string' ? keyword : ''
  })

  // 検索ページで動的に変更する検索キーワード
  const searchText = ref(queryText.value)

  // 検索キーワードに Hit したブログ記事一覧
  const showBlogList = ref(
    searchBlogListLogic(blogList, queryText.value) // ← .value なし
  )

  /**
   * 動的検索キーワード更新処理
   * 更新時にブログリストの検索も同時実行
   */
  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const value = target.value

    searchText.value = value
    showBlogList.value = searchBlogListLogic(blogList, value) // ← .value なし
  }

  // 画面遷移などでクエリ or blogList が変わったときの再検索
  watch(
    () => [queryText.value, blogList] as const,
    ([keyword, list]) => {
      showBlogList.value = searchBlogListLogic(list, keyword)
    }
  )

  return {
    searchText,
    showBlogList,
    onChange,
  }
}
