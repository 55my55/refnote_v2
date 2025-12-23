<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import TopTemplate from '~/components/pages/TopTemplate/index.vue'
import { useSetData } from '~/composables/useSetData'
import { getPosts } from '~/service/BlogService'
import { getArchiveListService } from '~/service/ArchiveService'
import { getCategoriesApi } from '~/apis/CategoryApi'
import { getProfileByApi } from '~/apis/ProfileApi'
import type { BlogDataType } from '~/types/Blog'
import type { ArchiveType } from '~/types/Archive'
import type { SidebarDataType } from '~/types/Sidebar'

const { setBlogData, setCategoryData, setProfileData, setArchiveData } = useSetData()
const archiveListState = useState<ArchiveType[]>('archiveList', () => [])

// ブログ一覧 + サイドバー用データをまとめて SSR で取得
const {
  data: pageData,
  pending: pagePending,
  error: pageError,
} = await useAsyncData<{
  blogs: BlogDataType
  sidebar: SidebarDataType
}>('topPage', async () => {
  const archiveListPromise = archiveListState.value.length
    ? Promise.resolve(archiveListState.value)
    : getArchiveListService()
  const [blogs, categories, profile, archiveList] = await Promise.all([
    getPosts(1),
    getCategoriesApi(),
    getProfileByApi(),
    archiveListPromise,
  ])

  return {
    blogs,
    sidebar: {
      categories,
      profile,
      archiveList,
    },
  }
})

watchEffect(() => {
  if (!pageData.value?.blogs) return
  setBlogData(pageData.value.blogs.blogList, pageData.value.blogs.totalCount)
})

watchEffect(() => {
  if (!pageData.value?.sidebar) return
  const { categories, profile, archiveList } = pageData.value.sidebar
  setCategoryData(categories)
  setProfileData(profile)
  setArchiveData(archiveList)
})

const blogList = computed(() => pageData.value?.blogs.blogList ?? [])
const totalCount = computed(() => pageData.value?.blogs.totalCount ?? 0)
</script>

<template>
  <TopTemplate
    :blogs="blogList"
    :total-count="totalCount"
    :pending="pagePending"
    :error="pageError"
  />
</template>
