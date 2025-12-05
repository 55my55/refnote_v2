<script setup lang="ts">
import BasePostPageLayout from '@/components/layouts/BasePostPageLayout/index.vue'
import BlogItem from '@/components/common/molecules/BlogItem/index.vue'
import BlogItemResponsive from '@/components/common/molecules/BlogItemResponsive/index.vue'
import Pagination from '@/components/common/molecules/Pagination/index.vue'
import { useMetaData } from '@/composables/useMetaData'
import { BLOG_SHOW_COUNT } from '@/constants/config'
import styles from './styles.module.scss'
import type { BlogItemType } from '@/types/Blog'

const blogListState = useState<BlogItemType[]>('blogList')
const blogTotalCount = useState<number>('blogTotalCount')
const blogList = computed<BlogItemType[]>(() => blogListState.value ?? [])
const { metaData } = useMetaData({})
</script>

<template>
  <BasePostPageLayout :meta-data="metaData">
    <!-- PC向け一覧 -->
    <div :class="styles.blogItem">
      <BlogItem
        v-for="(blogItem, index) in blogList"
        :key="`${blogItem.id}_${index}`"
        :blog-item="blogItem"
      />
    </div>

    <!-- SP向け一覧 -->
    <div :class="styles.blogItem__responsive">
      <BlogItemResponsive
        v-for="(blogItem, index) in blogList"
        :key="`${blogItem.id}_${index}`"
        :blog-item="blogItem"
      />
    </div>

    <!-- ページネーション -->
    <Pagination
      v-if="blogTotalCount / BLOG_SHOW_COUNT > 1"
      :total-count="blogTotalCount"
      link="/page/"
    />
  </BasePostPageLayout>
</template>
