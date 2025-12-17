<script setup lang="ts">
import BasePostPageLayout from '@/components/layouts/BasePostPageLayout/index.vue'
import BlogItem from '@/components/common/molecules/BlogItem/index.vue'
import BlogItemResponsive from '@/components/common/molecules/BlogItemResponsive/index.vue'
import Pagination from '@/components/common/molecules/Pagination/index.vue'

import { BLOG_SHOW_COUNT } from '@/constants/config'
import { useMetaData } from '@/composables/useMetaData'
import styles from './styles.module.scss'

// 型 import
import type { BlogItemType } from '@/types/Blog'

// --- useState の型指定 ---
const blogList = useState<BlogItemType[]>('blogList', () => [])
const blogTotalCount = useState<number>('blogTotalCount', () => 0)

const { metaData } = useMetaData({})
</script>

<template>
  <BasePostPageLayout :metaData="metaData">
    <div :class="styles.blogItem">
      <BlogItem
        v-for="(blogItem, index) in blogList"
        :key="`${blogItem.slug || blogItem.id}_${index}`"
        :blogItem="blogItem"
      />
    </div>

    <div :class="styles.blogItem__responsive">
      <BlogItemResponsive
        v-for="(blogItem, index) in blogList"
        :key="`${blogItem.slug || blogItem.id}_${index}`"
        :blogItem="blogItem"
      />
    </div>

    <Pagination
      v-if="blogTotalCount / BLOG_SHOW_COUNT > 1"
      :totalCount="blogTotalCount"
      link="/page/"
    />
  </BasePostPageLayout>
</template>
