<script setup lang="ts">
/**
 * 検索結果ページ
 * @package pages
 */
import { watch } from 'vue'
import SearchTemplate from '@/components/pages/SearchTemplate/index.vue'
import { useSetData } from '@/composables/useSetData'
import { getBlogsApi } from '@/apis/BlogApi'
import { createPageArrayLogic } from '@/logic/CommonLogic'
import { BLOG_SHOW_COUNT } from '@/constants/config'
import type { BlogItemType } from '@/types/Blog'

type SearchPageData = {
  blogList: BlogItemType[]
  totalCount: number
}

/**
 * グローバル状態 setter
 */
const { setBlogData } = useSetData()

/**
 * 検索ページ用データ取得
 */
const { data, error } = await useAsyncData<SearchPageData>(
  'search-page',
  async () => {
    const blogDataList: BlogItemType[] = []

    // まず件数だけ取得
    const { totalCount } = await getBlogsApi(0)

    // 1 ページあたりの表示件数からページ番号配列を作成
    const pageCountArray = createPageArrayLogic(totalCount)

    // 各ページ分の一覧をまとめて取得
    for (const pageNum of pageCountArray) {
      const offset = (pageNum - 1) * BLOG_SHOW_COUNT
      const blogData = await getBlogsApi(offset)
      blogData.blogList.forEach((blog) => {
        blogDataList.push(blog)
      })
    }

    return {
      blogList: blogDataList,
      totalCount,
    }
  }
)

/**
 * 一覧データをグローバル状態に反映
 */
watch(
  data,
  (value) => {
    if (!value) return
    setBlogData(value.blogList, value.totalCount)
  },
  { immediate: true }
)
</script>

<template>
  <!-- パンくず用に名前だけ渡す -->
  <SearchTemplate bread-name="検索結果" />
</template>
