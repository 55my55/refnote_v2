<script setup lang="ts">
/**
 * アーカイブ記事一覧
 */

import { computed, watchEffect } from 'vue'

import ArchiveTemplate from '@/components/pages/ArchiveTemplate/index.vue'

import { useSetData } from '@/composables/useSetData'

import { getBlogTargetMonthService } from '@/service/BlogService'
import { getArchiveListService } from '@/service/ArchiveService'
import { getCategoriesApi } from '@/apis/CategoryApi'
import { getProfileByApi } from '@/apis/ProfileApi'

import { changeShowYearMonthLogic } from '@/logic/DateLogic'

import { BLOG_SHOW_COUNT } from '@/constants/config'
import { useBlogActions } from '@/providers/BlogProviderInjectionKey'

import type { BlogItemType } from '@/types/Blog'
import type { CategoryType } from '@/types/Category'
import type { ProfileType } from '@/types/Profile'
import type { ArchiveType } from '@/types/Archive'

/**
 * ルートパラメータから date / page を取得
 */
const route = useRoute()

const dateParam = route.params.date as string
const pageParam = route.params.page as string | string[] | undefined

const pageNum = Math.max(1, Number(Array.isArray(pageParam) ? pageParam[0] : pageParam) || 1)

const offset = (pageNum - 1) * BLOG_SHOW_COUNT

/**
 * 画面で使う状態を一括管理する composable
 */
const { setBlogData, setCategoryData, setProfileData, setArchiveData } = useSetData()
// BlogProvider にもデータを流す（ArchiveTemplate は provider state を参照）
const { setBlogData: setBlogDataProvider } = useBlogActions()

const {
  data: pageData,
  error,
  pending,
} = await useAsyncData<{
  blogData: { blogList: BlogItemType[]; totalCount: number }
  categories: CategoryType[]
  profile: ProfileType
  archiveList: ArchiveType[]
}>(`archivePage-${dateParam}-${pageNum}`, async () => {
  const [categories, profile, archiveList] = await Promise.all([
    getCategoriesApi(),
    getProfileByApi(),
    getArchiveListService(),
  ])

  const blogData = await getBlogTargetMonthService(offset, dateParam)

  return { blogData, categories, profile, archiveList }
})

watchEffect(() => {
  if (!pageData.value) return
  setCategoryData(pageData.value.categories)
  setProfileData(pageData.value.profile)
  setArchiveData(pageData.value.archiveList)
  setBlogData(pageData.value.blogData.blogList, pageData.value.blogData.totalCount)
  setBlogDataProvider(pageData.value.blogData.blogList, pageData.value.blogData.totalCount)
})

/**
 * パンくず用の表示年月
 */
const date = dateParam
const breadName = computed(() => changeShowYearMonthLogic(date))
</script>

<template>
  <ArchiveTemplate :date="date" :breadName="breadName" />
</template>
