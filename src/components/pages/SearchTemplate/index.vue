<script setup lang="ts">
/**
 * pages/SearchTemplate
 * @package Component
 */

import BaseLayout from '@/components/layouts/BaseLayout/index.vue'
import PageTitle from '@/components/common/atoms/PageTitle/index.vue'
import SearchInputForm from '@/components/common/molecules/SearchInputForm/index.vue'
import SearchBlogItem from '@/components/pages/SearchTemplate/organisms/SearchBlogItem/index.vue'
import BlogItemResponsive from '@/components/common/molecules/BlogItemResponsive/index.vue'

import { useSearchTemplate } from '@/components/pages/SearchTemplate/useSearchTemplate'
import { useMetaData } from '@/composables/useMetaData'

/* styles */
import styles from './styles.module.scss'

type Props = {
  breadName: string
}

const props = defineProps<Props>()

/* state */
const { searchText, showBlogList, onChange } = useSearchTemplate()
const { metaData } = useMetaData({ title: props.breadName })
</script>

<template>
  <BaseLayout :meta-data="metaData" :bread-name="props.breadName">
    <div :class="styles.container">
      <PageTitle title="検索結果" />

      <!-- 検索フォーム -->
      <div :class="styles.input">
        <SearchInputForm
          :text="searchText"
          placeholder="検索"
          :on-change="onChange"
        />
      </div>

      <!-- 検索フォーム レスポンシブ -->
      <div :class="styles.input__responsive">
        <SearchInputForm
          :text="searchText"
          placeholder="検索"
          :size="32"
          :on-change="onChange"
        />
      </div>

      <!-- 検索フォーム SP -->
      <div :class="styles.input__sp">
        <SearchInputForm
          :text="searchText"
          placeholder="検索"
          :size="24"
          :on-change="onChange"
        />
      </div>

      <!-- 検索結果一覧 PC -->
      <div :class="styles.list">
        <template v-if="showBlogList.length > 0">
          <SearchBlogItem
            v-for="blog in showBlogList"
            :key="blog.id"
            :blog-item="blog"
          />
        </template>
        <div v-else :class="styles.unknown">
          <p>検索したキーワードは記事がありませんでした。</p>
          <p>別のキーワードで検索してみてください。</p>
        </div>
      </div>

      <!-- 検索結果一覧 レスポンシブ -->
      <div :class="styles.list__responsive">
        <template v-if="showBlogList.length > 0">
          <BlogItemResponsive
            v-for="blog in showBlogList"
            :key="blog.id"
            :blog-item="blog"
          />
        </template>
        <div v-else :class="styles.unknown">
          <p>検索したキーワードは記事がありませんでした。</p>
          <p>別のキーワードで検索してみてください。</p>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
