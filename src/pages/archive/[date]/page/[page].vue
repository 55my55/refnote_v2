<script setup lang="ts">
/**
 * アーカイブ記事一覧
 */

import { computed } from 'vue'

import ArchiveTemplate from '@/components/pages/ArchiveTemplate/index.vue'

import { useSetData } from '@/composables/useSetData'

import { getBlogTargetMonthService } from '@/service/BlogService'
import { getArchiveListService } from '@/service/ArchiveService'
import { getCategoriesApi } from '@/apis/CategoryApi'
import { getProfileByApi } from '@/apis/ProfileApi'

import { createPageArrayLogic } from '@/logic/CommonLogic'
import { changeShowYearMonthLogic } from '@/logic/DateLogic'

import { BLOG_SHOW_COUNT } from '@/constants/config'

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

const pageNum =
  Number(Array.isArray(pageParam) ? pageParam[0] : pageParam) || 1

const offset = (pageNum - 1) * BLOG_SHOW_COUNT

/**
 * 画面で使う状態を一括管理する composable
 */
const { setBlogData, setCategoryData, setProfileData, setArchiveData } =
  useSetData()

/**
 * 必要なデータをまとめて取得
 */
type BlogTargetMonthResponse = {
  blogList: BlogItemType[]
  totalCount: number
}

const blogData = (await getBlogTargetMonthService(
  offset,
  dateParam
)) as BlogTargetMonthResponse

const categories = (await getCategoriesApi()) as CategoryType[]
const profile = (await getProfileByApi()) as ProfileType
const archiveList = (await getArchiveListService()) as ArchiveType[]

/**
 * useSetData に反映
 */
setCategoryData(categories)
setProfileData(profile)
setBlogData(blogData.blogList, blogData.totalCount)
setArchiveData(archiveList)

/**
 * パンくず用の表示年月
 */
const date = dateParam
const breadName = computed(() => changeShowYearMonthLogic(date))
</script>

<template>
  <ArchiveTemplate :date="date" :breadName="breadName" />
</template>
