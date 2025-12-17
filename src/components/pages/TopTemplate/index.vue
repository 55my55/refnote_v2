<script setup lang="ts">
import { computed, type PropType } from 'vue'
import BasePostPageLayout from '~/components/layouts/BasePostPageLayout/index.vue'
import BlogItem from '~/components/common/molecules/BlogItem/index.vue'
import BlogItemResponsive from '~/components/common/molecules/BlogItemResponsive/index.vue'
import Pagination from '~/components/common/molecules/Pagination/index.vue'
import { useMetaData } from '~/composables/useMetaData'
import { BLOG_SHOW_COUNT } from '~/constants/config'
import type { BlogItemType } from '~/types/Blog'
import styles from './styles.module.scss'

const props = defineProps({
  blogs: {
    type: Array as PropType<BlogItemType[]>,
    default: () => [],
  },
  totalCount: {
    type: Number,
    default: 0,
  },
  pending: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Object as PropType<Error | null>,
    default: null,
  },
})

const blogList = computed<BlogItemType[]>(() => props.blogs ?? [])
const hasBlogs = computed(() => blogList.value.length > 0)
const hasPagination = computed(() => props.totalCount / BLOG_SHOW_COUNT > 1)
const { metaData } = useMetaData({})
</script>

<template>
  <BasePostPageLayout :meta-data="metaData">
    <div v-if="pending" :class="styles.status">読み込み中です...</div>
    <div v-else-if="error" :class="styles.status">データの取得に失敗しました</div>
    <template v-else>
      <div v-if="hasBlogs">
        <!-- PC向け一覧 -->
        <div :class="styles.blogItem">
          <BlogItem
            v-for="(blogItem, index) in blogList"
            :key="`${blogItem.slug || blogItem.id}_${index}`"
            :blog-item="blogItem"
          />
        </div>

        <!-- SP向け一覧 -->
        <div :class="styles.blogItem__responsive">
          <BlogItemResponsive
            v-for="(blogItem, index) in blogList"
            :key="`${blogItem.slug || blogItem.id}_${index}`"
            :blog-item="blogItem"
          />
        </div>
      </div>
      <div v-else :class="styles.status">記事がありません</div>

      <!-- ページネーション -->
      <Pagination v-if="hasPagination" :total-count="totalCount" link="/page/" />
    </template>
  </BasePostPageLayout>
</template>
