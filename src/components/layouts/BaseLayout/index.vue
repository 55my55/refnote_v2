<script setup lang="ts">
/**
 * layouts/BaseLayout
 * @package Component
 */
import MetaHead from '@/components/layouts/MetaHead/index.vue'
import Header from '@/components/layouts/Header/index.vue'
import BreadList from '@/components/layouts/BreadList/index.vue'
import Footer from '@/components/layouts/Footer/index.vue'
import ArrowIcon from '@/components/common/icons/ArrowIcon/index.vue'
import SearchModal from '@/components/modals/SearchModal/index.vue'
import MenuModal from '@/components/modals/MenuModal/index.vue'

import { useLayout } from '@/composables/useLayout'
import { useModal } from '@/composables/useModal'
import { useSearchForm } from '@/composables/useSearchForm'

import type { MetaHeadType } from '@/types/MetaHead'
import styles from './styles.module.scss'

const props = defineProps<{
  metaData: MetaHeadType
  breadName?: string
}>()

const { metaData, breadName } = toRefs(props)

// レイアウト制御
const { scrollToTop } = useLayout()

// モーダル制御
const {
  isSearchModalVisible,
  isMenuModalVisible,
  handleOpenSearchModal,
  handleCloseSearchModal,
  handleOpenMenuModal,
  handleCloseMenuModal,
  handleHomeLink,
  handleAboutLink,
  handleProfileLink,
} = useModal()

// 検索フォーム（モーダル用）
const {
  searchText,
  onChangeSearchText,
  onKeyUpSearchBlogModal,
} = useSearchForm({ handleCloseSearchModal })
</script>

<template>
  <div>
    <MetaHead :metaData="metaData" />

    <div :class="styles.wrapper">
      <div :class="styles.header">
        <Header
          :handleOpenSearchModal="handleOpenSearchModal"
          :handleOpenMenuModal="handleOpenMenuModal"
        />
        <div :class="styles.headerEmpty" />
      </div>

      <BreadList v-if="breadName" :breadName="breadName" />

      <div :class="styles.divider">
        <slot />
      </div>

      <div :class="styles.footer">
        <Footer />
      </div>

      <!-- スクロールトップボタン -->
      <div :class="styles.fixButton" @click="scrollToTop">
        <ArrowIcon :size="70" color="#c8c8c8" />
      </div>
      <!-- スクロールトップボタン SP -->
      <div :class="styles.fixButton__sp" @click="scrollToTop">
        <ArrowIcon :size="44" color="#c8c8c8" />
      </div>

      <!-- 検索モーダル -->
      <SearchModal
        :searchText="searchText"
        :isSearchModalVisible="isSearchModalVisible"
        :handleCloseSearchModal="handleCloseSearchModal"
        :onChangeSearchText="onChangeSearchText"
        :onKeyUpSearch="onKeyUpSearchBlogModal"
      />

      <!-- メニューモーダル -->
      <MenuModal
        :isMenuModalVisible="isMenuModalVisible"
        :handleCloseMenuModal="handleCloseMenuModal"
        :handleHomeLink="handleHomeLink"
        :handleAboutLink="handleAboutLink"
        :handleProfileLink="handleProfileLink"
      />
    </div>
  </div>
</template>
