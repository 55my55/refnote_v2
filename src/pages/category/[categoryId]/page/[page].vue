<script setup lang="ts">
import { computed } from 'vue'

import CategoryTemplate from '@/components/pages/CategoryTemplate/index.vue'

import { useSetData } from '@/composables/useSetData'

import { getArchiveListService } from '@/service/ArchiveService'
import { getBlogsContainCategoryApi } from '@/apis/BlogApi'
import { getCategoriesApi } from '@/apis/CategoryApi'
import { getProfileByApi } from '@/apis/ProfileApi'

import { BLOG_SHOW_COUNT } from '@/constants/config'

import type { BlogItemType } from '@/types/Blog'
import type { CategoryType } from '@/types/Category'
import type { ProfileType } from '@/types/Profile'
import type { ArchiveType } from '@/types/Archive'

// ルートパラメータ取得
const route = useRoute()

const categoryIdParam = route.params.categoryId as string
const pageParam = route.params.page as string | string[] | undefined
const pageNum =
  Number(Array.isArray(pageParam) ? pageParam[0] : pageParam) || 1

const offset = (pageNum - 1) * BLOG_SHOW_COUNT

// useSetData でまとめて状態管理
const { setBlogData, setCategoryData, setProfileData, setArchiveData } =
  useSetData()

// 一覧・カテゴリ・プロフィール・アーカイブをまとめて取得
type CategoryBlogResponse = {
  blogList: BlogItemType[]
  totalCount: number
}

const blogData = (await getBlogsContainCategoryApi(
  offset,
  categoryIdParam
)) as CategoryBlogResponse

const categories = (await getCategoriesApi()) as CategoryType[]
const profile = (await getProfileByApi()) as ProfileType
const archiveList = (await getArchiveListService()) as ArchiveType[]

// 取得したデータを状態に反映
setCategoryData(categories)
setProfileData(profile)
setBlogData(blogData.blogList, blogData.totalCount)
setArchiveData(archiveList)

// パンくず用のカテゴリ名
const categoryName = computed(() => {
  const target = categories.find((c) => c.id === categoryIdParam)
  return target ? target.name : ''
})

// テンプレート用にそのまま使う値
const categoryId = categoryIdParam
</script>

<template>
  <CategoryTemplate :categoryId="categoryId" :breadName="categoryName" />
</template>
