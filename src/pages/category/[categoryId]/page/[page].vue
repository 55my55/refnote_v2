<script setup lang="ts">
import { computed, watchEffect } from 'vue'

import CategoryTemplate from '@/components/pages/CategoryTemplate/index.vue'

import { useSetData } from '@/composables/useSetData'

import { getArchiveListService } from '@/service/ArchiveService'
import { getBlogsContainCategoryApi } from '@/apis/BlogApi'
import { getCategoriesApi } from '@/apis/CategoryApi'
import { getProfileByApi } from '@/apis/ProfileApi'

import { BLOG_SHOW_COUNT } from '@/constants/config'
import { initBlogData } from '@/constants/initState'
import { useBlogActions } from '@/providers/BlogProviderInjectionKey'

import type { BlogItemType } from '@/types/Blog'
import type { CategoryType } from '@/types/Category'
import type { SidebarDataType } from '@/types/Sidebar'

// ルートパラメータ取得
const route = useRoute()

const categoryParam = route.params.categoryId as string
const pageParam = route.params.page as string | string[] | undefined
const pageNum =
  Number(Array.isArray(pageParam) ? pageParam[0] : pageParam) || 1

const offset = (pageNum - 1) * BLOG_SHOW_COUNT

// useSetData でまとめて状態管理
const { setBlogData, setCategoryData, setProfileData, setArchiveData } =
  useSetData()
const { setBlogData: setBlogDataProvider } = useBlogActions()

const {
  data: pageData,
  error,
  pending,
} = await useAsyncData<{
  categories: CategoryType[]
  profile: SidebarDataType['profile']
  archiveList: SidebarDataType['archiveList']
  blogData: { blogList: BlogItemType[]; totalCount: number }
}>(`categoryPage-${categoryParam}-${pageNum}`, async () => {
  const [categories, profile, archiveList] = await Promise.all([
    getCategoriesApi(),
    getProfileByApi(),
    getArchiveListService(),
  ])

  const targetCategory = categories.find(
    (c) => c.slug === categoryParam || c.id === categoryParam
  )
  const categoryFilterId = targetCategory?.id ?? ''

  const blogData =
    categoryFilterId !== ''
      ? await getBlogsContainCategoryApi(offset, categoryFilterId)
      : initBlogData

  return { categories, profile, archiveList, blogData }
})

const categories = computed(() => pageData.value?.categories ?? [])
const blogData = computed(() => pageData.value?.blogData ?? initBlogData)
const targetCategory = computed(() =>
  categories.value.find(
    (c) => c.slug === categoryParam || c.id === categoryParam
  )
)

// 取得したデータを状態に反映
watchEffect(() => {
  if (!pageData.value) return
  setCategoryData(pageData.value.categories)
  setProfileData(pageData.value.profile)
  setArchiveData(pageData.value.archiveList)
  setBlogData(
    pageData.value.blogData.blogList,
    pageData.value.blogData.totalCount
  )
  setBlogDataProvider(
    pageData.value.blogData.blogList,
    pageData.value.blogData.totalCount
  )
})

// パンくず用のカテゴリ名
const categoryName = computed(() => {
  return targetCategory.value ? targetCategory.value.name : ''
})

// テンプレート用にそのまま使う値
const categoryIdForLink = computed(
  () => targetCategory.value?.id ?? categoryParam
)
</script>

<template>
  <CategoryTemplate
    :categoryId="categoryIdForLink"
    :breadName="categoryName"
  />
</template>
