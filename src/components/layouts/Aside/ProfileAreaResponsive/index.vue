<script setup lang="ts">
/**
 * layouts/Aside/
 * @package Component
 */
import SearchInputForm from '@/components/common/molecules/SearchInputForm/index.vue'
import ProfileArea from '@/components/layouts/Aside/ProfileArea/index.vue'
import ProfileAreaResponsive from '@/components/layouts/Aside/ProfileAreaResponsive/index.vue'
import CategoryArea from '@/components/layouts/Aside/CategoryArea/index.vue'
import ArchiveArea from '@/components/layouts/Aside/ArchiveArea/index.vue'

import { useSearchForm } from '@/composables/useSearchForm'
import styles from './styles.module.scss'

// useSearchForm はオブジェクトを返すのでオブジェクト分割代入にする
const { searchText, onChangeSearchText, onKeyUpSearchBlog } = useSearchForm({})
</script>

<template>
  <aside :class="styles.aside">
    <!-- 検索フォーム -->
    <div :class="styles.search">
      <SearchInputForm
        :text="searchText"
        placeholder="検索"
        :onChange="onChangeSearchText"
        :onKeyUp="onKeyUpSearchBlog"
      />
    </div>

    <!-- プロフィールエリア -->
    <div :class="styles.profile">
      <ProfileArea />
    </div>

    <!-- プロフィールエリア レスポンシブ -->
    <div :class="styles.profile__responsive">
      <ProfileAreaResponsive />
    </div>

    <!-- 検索フォーム レスポンシブ（タブレット） -->
    <div :class="styles.search__responsive">
      <SearchInputForm
        :text="searchText"
        placeholder="検索"
        :size="32"
        :onChange="onChangeSearchText"
        :onKeyUp="onKeyUpSearchBlog"
      />
    </div>

    <!-- 検索フォーム レスポンシブ（SP） -->
    <div :class="styles.search__sp">
      <SearchInputForm
        :text="searchText"
        placeholder="検索"
        :size="20"
        :onChange="onChangeSearchText"
        :onKeyUp="onKeyUpSearchBlog"
      />
    </div>

    <!-- カテゴリーエリア -->
    <div :class="styles.parts">
      <CategoryArea />
    </div>

    <!-- アーカイブエリア -->
    <div :class="styles.parts">
      <ArchiveArea />
    </div>
  </aside>
</template>
