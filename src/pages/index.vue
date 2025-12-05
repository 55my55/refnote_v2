<script setup lang="ts">
import { watch } from 'vue'
import TopTemplate from '@/components/pages/TopTemplate/index.vue'
import { useSetData } from '@/composables/useSetData'
import { getArchiveListService } from '@/service/ArchiveService'
import { getBlogsApi } from '@/apis/BlogApi'
import { getCategoriesApi } from '@/apis/CategoryApi'
import { getProfileByApi } from '@/apis/ProfileApi'
import type { BlogItemType } from '@/types/Blog'
import type { CategoryType } from '@/types/Category'
import type { ProfileType } from '@/types/Profile'
import type { ArchiveType } from '@/types/Archive'

/**
 * Topページで必要なドメインデータ
 */
type TopPageData = {
  blogList: BlogItemType[]
  totalCount: number
  categories: CategoryType[]
  profile: ProfileType
  archiveList: ArchiveType[]
}

/** 
 * グローバル状態のSetter群 
 * （ページ初期化タイミングで一括投入する）
 */
const {
  setBlogData,
  setCategoryData,
  setProfileData,
  setArchiveData,
} = useSetData()

/**
 * 初回レンダリング時に必要なデータをSSR側で取得
 * → App Router の getStaticProps 相当の責務
 */
const { data } = await useAsyncData<TopPageData>('topPage', async () => {
  const blogData = await getBlogsApi(0)
  const categories = await getCategoriesApi()
  const profile = await getProfileByApi()
  const archiveList = await getArchiveListService()

  return {
    blogList: blogData.blogList,
    totalCount: blogData.totalCount,
    categories,
    profile,
    archiveList,
  }
})

/**
 * 取得済みデータを状態管理へ流し込む。
 * ページ遷移直後に読み込まれるため immediate を使用。
 */
watch(
  data,
  (value) => {
    if (!value) return
    setCategoryData(value.categories)
    setProfileData(value.profile)
    setBlogData(value.blogList, value.totalCount)
    setArchiveData(value.archiveList)
  },
  { immediate: true }
)
</script>

<template>
  <TopTemplate />
</template>
