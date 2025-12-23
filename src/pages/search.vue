<script setup lang="ts">
/**
 * 検索結果ページ
 * @package pages
 */
import { ref, watch, watchEffect } from 'vue'
import SearchTemplate from '@/components/pages/SearchTemplate/index.vue'
import { useSetData } from '@/composables/useSetData'
import { getBlogs } from '@/apis/BlogApi'
import type { BlogItemType } from '@/types/Blog'
import { useBlogActions } from '@/providers/BlogProviderInjectionKey'
import { getCategoriesApi } from '@/apis/CategoryApi'
import { getProfileByApi } from '@/apis/ProfileApi'
import { getArchiveListService } from '@/service/ArchiveService'
import type { ArchiveType } from '@/types/Archive'
import type { SidebarDataType } from '@/types/Sidebar'

type SearchPageData = {
  blogList: BlogItemType[]
  totalCount: number
}

/**
 * グローバル状態 setter
 */
const { setBlogData, setCategoryData, setProfileData, setArchiveData } = useSetData()
const { setBlogData: setBlogDataProvider } = useBlogActions()
const isNavigating = ref(false)
const archiveListState = useState<ArchiveType[]>('archiveList', () => [])

/**
 * 検索ページ用データ取得
 */
const { data, error } = await useAsyncData<SearchPageData>('search-page', async () => {
  // 検索ページ用にまとめて取得（最大100件）
  const blogData = await getBlogs({ limit: 100 })

  return {
    blogList: blogData.blogList,
    totalCount: blogData.totalCount,
  }
})

/**
 * サイドバー用データをまとめて取得（カテゴリ / プロフィール / アーカイブ）
 */
const {
  data: sidebarData,
  pending: sidebarPending,
  error: sidebarError,
} = await useAsyncData<SidebarDataType>('search-sidebar', async () => {
  const archiveListPromise = archiveListState.value.length
    ? Promise.resolve(archiveListState.value)
    : getArchiveListService()
  const [categories, profile, archiveList] = await Promise.all([
    getCategoriesApi(),
    getProfileByApi(),
    archiveListPromise,
  ])
  return {
    categories,
    profile,
    archiveList,
  }
})

// グローバル state に反映
watchEffect(() => {
  if (!sidebarData.value) return
  setCategoryData(sidebarData.value.categories)
  setProfileData(sidebarData.value.profile)
  setArchiveData(sidebarData.value.archiveList)
})

/**
 * 一覧データをグローバル状態に反映
 */
watch(
  data,
  (value) => {
    if (!value) return
    setBlogData(value.blogList, value.totalCount)
    setBlogDataProvider(value.blogList, value.totalCount)
  },
  { immediate: true },
)
</script>

<template>
  <!-- 遷移中はローディング表示のみ -->
  <div v-if="isNavigating" :style="{ padding: '80px 0', textAlign: 'center' }">
    検索結果を読み込み中...
  </div>

  <!-- 通常表示 -->
  <SearchTemplate v-else bread-name="検索結果" :onCardClick="() => (isNavigating = true)" />
</template>
