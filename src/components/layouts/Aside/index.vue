<script setup lang="ts">
import SearchInputForm from '@/components/common/molecules/SearchInputForm/index.vue'
import ProfileArea from '@/components/layouts/Aside/ProfileArea/index.vue'
import ProfileAreaResponsive from '@/components/layouts/Aside/ProfileAreaResponsive/index.vue'
import CategoryArea from '@/components/layouts/Aside/CategoryArea/index.vue'
import ArchiveArea from '@/components/layouts/Aside/ArchiveArea/index.vue'
import { useSearchForm } from '@/composables/useSearchForm'

const { searchText, onChangeSearchText, onKeyUpSearchBlog } = useSearchForm({})
</script>

<template>
  <aside :class="$style.aside">
    <!-- 検索フォーム -->
    <div :class="$style.search">
      <SearchInputForm
        :text="searchText"
        placeholder="検索"
        :on-change="onChangeSearchText"
        :on-key-up="onKeyUpSearchBlog"
      />
    </div>

    <!-- プロフィールエリア -->
    <div :class="$style.profile">
      <ProfileArea />
    </div>

    <!-- プロフィールエリア レスポンシブ -->
    <div :class="$style.profile__responsive">
      <ProfileArea />
    </div>

    <!-- 検索フォーム レスポンシブ -->
    <div :class="$style['search__responsive']">
      <SearchInputForm
        :text="searchText"
        placeholder="検索"
        :size="32"
        :on-change="onChangeSearchText"
        :on-key-up="onKeyUpSearchBlog"
      />
    </div>

    <!-- 検索フォーム SP -->
    <div :class="$style['search__sp']">
      <SearchInputForm
        :text="searchText"
        placeholder="検索"
        :size="20"
        :on-change="onChangeSearchText"
        :on-key-up="onKeyUpSearchBlog"
      />
    </div>

    <!-- カテゴリーエリア -->
    <div :class="$style.parts">
      <CategoryArea />
    </div>

    <!-- アーカイブエリア -->
    <div :class="$style.parts">
      <ArchiveArea />
    </div>
  </aside>
</template>

<style module lang="scss" src="./styles.module.scss" />
