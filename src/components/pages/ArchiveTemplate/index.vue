<script setup lang="ts">
/**
 * pages/ArchiveTemplate (Nuxt版)
 */

import BasePostPageLayout from '~/components/layouts/BasePostPageLayout/index.vue'
import PageTitle from '~/components/common/atoms/PageTitle/index.vue'
import BlogItem from '~/components/common/molecules/BlogItem/index.vue'
import BlogItemResponsive from '~/components/common/molecules/BlogItemResponsive/index.vue'
import Pagination from '~/components/common/molecules/Pagination/index.vue'

import { useBlogState } from '~/providers/BlogProviderInjectionKey'
import { useMetaData } from '~/composables/useMetaData'
import { BLOG_SHOW_COUNT } from '~/constants/config'

type Props = {
  date: string
  breadName: string
}

const props = defineProps<Props>()

// contexts 相当
const { blogList, totalCount } = useBlogState()

// meta 情報
const { metaData } = useMetaData({ title: props.breadName })
</script>

<template>
  <BasePostPageLayout :metaData="metaData" :breadName="props.breadName">
    <!-- ページタイトル -->
    <PageTitle :title="`${props.breadName}の記事一覧`" />

    <!-- ブログ記事一覧表示 PC -->
    <div :class="$style.blogItem">
      <BlogItem
        v-for="(blogItem, index) in blogList"
        :key="`${blogItem.id}_${index}`"
        :blogItem="blogItem"
      />
    </div>

    <!-- ブログ記事一覧表示 レスポンシブ -->
    <div :class="$style.blogItem__responsive">
      <BlogItemResponsive
        v-for="(blogItem, index) in blogList"
        :key="`${blogItem.id}_${index}`"
        :blogItem="blogItem"
      />
    </div>

    <!-- ページネーション -->
    <Pagination
      v-if="totalCount / BLOG_SHOW_COUNT > 1"
      :totalCount="totalCount"
      :link="`/archive/${props.date}/page/`"
    />
  </BasePostPageLayout>
</template>

<style module lang="scss" src="./styles.module.scss"></style>
