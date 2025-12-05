<script setup lang="ts">
import { toRefs } from 'vue'

import BasePostPageLayout from '@/components/layouts/BasePostPageLayout/index.vue'
import PageTitle from '@/components/common/atoms/PageTitle/index.vue'
import BlogItem from '@/components/common/molecules/BlogItem/index.vue'
import BlogItemResponsive from '@/components/common/molecules/BlogItemResponsive/index.vue'
import Pagination from '@/components/common/molecules/Pagination/index.vue'

import { useBlogState } from '@/providers/BlogProviderInjectionKey'
import { useMetaData } from '@/composables/useMetaData'

import { BLOG_SHOW_COUNT } from '@/constants/config'
import type { BlogItemType } from '@/types/Blog'

const props = defineProps<{
  categoryId: string
  breadName: string
}>()

const { categoryId, breadName } = toRefs(props)

/* ブログ一覧・総件数 */
const { blogList, totalCount } = useBlogState()

/* meta情報 */
const { metaData } = useMetaData({
  title: breadName.value,
})
</script>

<template>
  <BasePostPageLayout
    :metaData="metaData"
    :breadName="breadName"
  >
    <!-- ページタイトル -->
    <PageTitle :title="`「${breadName}」の記事一覧`" />

    <!-- ブログ記事一覧表示（PC） -->
    <div :class="$style.blogItem">
      <BlogItem
        v-for="(blogItem, index) in blogList"
        :key="`${(blogItem as BlogItemType).id}_${index}`"
        :blogItem="blogItem"
      />
    </div>

    <!-- ブログ記事一覧表示（レスポンシブ） -->
    <div :class="$style.blogItem__responsive">
      <BlogItemResponsive
        v-for="(blogItem, index) in blogList"
        :key="`responsive_${(blogItem as BlogItemType).id}_${index}`"
        :blogItem="blogItem"
      />
    </div>

    <!-- ページネーション -->
    <Pagination
      v-if="totalCount / BLOG_SHOW_COUNT > 1"
      :totalCount="totalCount"
      :link="`/category/${categoryId}/page/`"
    />
  </BasePostPageLayout>
</template>

<style module lang="scss" src="./styles.module.scss"></style>
