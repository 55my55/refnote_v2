<template>
  <!-- 一覧ページの見た目は PageTemplate に全部おまかせ -->
  <PageTemplate />
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import PageTemplate from '@/components/pages/PageTemplate/index.vue'
import { BLOG_SHOW_COUNT } from '@/constants/config'
import { getBlogsApi } from '@/apis/BlogApi'
import { getCategoriesApi } from '@/apis/CategoryApi'
import { getProfileByApi } from '@/apis/ProfileApi'
import { getArchiveListService } from '@/service/ArchiveService'
import { useSetData } from '@/composables/useSetData'

const route = useRoute()

// /page/[page] の [page] パラメータを取得
const pageNum = computed(() => {
  const raw = route.params.page
  const n = Array.isArray(raw) ? Number(raw[0]) : Number(raw ?? 1)
  return Number.isNaN(n) || n < 1 ? 1 : n
})

// SSR 側で必要データをまとめて取得
const { data } = await useAsyncData(
  () => `blog-list-page-${pageNum.value}`,
  async () => {
    const offset = (pageNum.value - 1) * BLOG_SHOW_COUNT

    const [blogData, categories, profile, archiveList] = await Promise.all([
      getBlogsApi(offset),
      getCategoriesApi(),
      getProfileByApi(),
      getArchiveListService(),
    ])

    return {
      blogList: blogData.blogList,
      totalCount: blogData.totalCount,
      categories,
      profile,
      archiveList,
    }
  }
)

// グローバル状態（useSetData）に流し込む
const { setBlogData, setCategoryData, setProfileData, setArchiveData } = useSetData()

watchEffect(() => {
  if (!data.value) return

  const { blogList, totalCount, categories, profile, archiveList } = data.value

  setCategoryData(categories)
  setProfileData(profile)
  setBlogData(blogList, totalCount)
  setArchiveData(archiveList)
})
</script>
