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
  status: {
    type: String as PropType<'idle' | 'pending' | 'success' | 'error'>,
    default: 'idle',
  },
  error: {
    type: Object as PropType<Error | null>,
    default: null,
  },
})

const blogList = computed<BlogItemType[]>(() => props.blogs ?? [])
const hasBlogs = computed(() => blogList.value.length > 0)
const hasPagination = computed(() => props.totalCount / BLOG_SHOW_COUNT > 1)
const isLoading = computed(
  () =>
    !props.error &&
    (props.pending || props.status === 'pending' || props.status === 'idle'),
)
const shouldShowSkeleton = computed(() => !hasBlogs.value && isLoading.value)
const shouldShowEmpty = computed(() => !hasBlogs.value && !isLoading.value)
const skeletonItems = computed(() => Array.from({ length: 4 }, (_, index) => index))
const { metaData } = useMetaData({})
</script>

<template>
  <BasePostPageLayout :meta-data="metaData">
    <div v-if="error" :class="styles.status">データの取得に失敗しました</div>
    <template v-else>
      <div v-if="shouldShowSkeleton">
        <!-- PC向けダミー一覧 -->
        <div :class="styles.blogItem">
          <div v-for="item in skeletonItems" :key="`skeleton-pc-${item}`" :class="styles.skeleton">
            <div :class="styles.skeleton__image" />
            <div :class="styles.skeleton__content">
              <div :class="styles.skeleton__title" />
              <div :class="styles.skeleton__tags">
                <span :class="styles.skeleton__tag" />
                <span :class="styles.skeleton__tag" />
              </div>
              <div :class="styles.skeleton__date" />
            </div>
          </div>
        </div>

        <!-- SP向けダミー一覧 -->
        <div :class="styles.blogItem__responsive">
          <div
            v-for="item in skeletonItems"
            :key="`skeleton-sp-${item}`"
            :class="styles.skeletonResponsive"
          >
            <div :class="styles.skeletonResponsive__image" />
            <div :class="styles.skeletonResponsive__title" />
            <div :class="styles.skeletonResponsive__tag" />
          </div>
        </div>
      </div>
      <div v-else-if="hasBlogs">
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
      <div v-else-if="shouldShowEmpty" :class="styles.status">記事がありません</div>

      <!-- ページネーション -->
      <Pagination v-if="hasPagination" :total-count="totalCount" link="/page/" />
    </template>
  </BasePostPageLayout>
</template>
