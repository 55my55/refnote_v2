<script setup lang="ts">
/**
 * pages/Error404Template
 * @package Component
 */

/* components */
import BaseFixedPageLayout from '@/components/layouts/BaseFixedPageLayout/index.vue'
import SearchInputForm from '@/components/common/molecules/SearchInputForm/index.vue'
import CategoryArea from '@/components/layouts/Aside/CategoryArea/index.vue'
import ArchiveArea from '@/components/layouts/Aside/ArchiveArea/index.vue'
/* composables */
import { useMetaData } from '@/composables/useMetaData'
import { useSearchForm } from '@/composables/useSearchForm'
/* styles */
import styles from './styles.module.scss'

/**
 * ページメタ情報（404ページ用）
 * errorFlg: true を渡して、404 用の meta を生成する。
 */
const { metaData } = useMetaData({ errorFlg: true })

/**
 * 検索フォームの状態とハンドラ
 */
const { searchText, onChangeSearchText, onKeyUpSearchBlog } = useSearchForm({})
</script>

<template>
  <BaseFixedPageLayout :meta-data="metaData">
    <div :class="styles.error">
      <div :class="styles.title">
        <h1>NOT FOUND</h1>
        <h2>お探しのページは見つかりませんでした。</h2>
      </div>

      <!-- 検索フォーム（PC） -->
      <div :class="styles.search">
        <SearchInputForm
          :text="searchText"
          placeholder="検索"
          :on-change="onChangeSearchText"
          :on-key-up="onKeyUpSearchBlog"
        />
      </div>

      <!-- 検索フォーム（レスポンシブ） -->
      <div :class="styles.search__responsive">
        <SearchInputForm
          :text="searchText"
          placeholder="検索"
          :size="32"
          :on-change="onChangeSearchText"
          :on-key-up="onKeyUpSearchBlog"
        />
      </div>

      <!-- 検索フォーム（SP） -->
      <div :class="styles.search__sp">
        <SearchInputForm
          :text="searchText"
          placeholder="検索"
          :size="24"
          :on-change="onChangeSearchText"
          :on-key-up="onKeyUpSearchBlog"
        />
      </div>

      <!-- カテゴリーエリア -->
      <div :class="styles.category">
        <CategoryArea />
      </div>

      <!-- アーカイブエリア -->
      <div :class="styles.archive">
        <ArchiveArea />
      </div>
    </div>
  </BaseFixedPageLayout>
</template>
