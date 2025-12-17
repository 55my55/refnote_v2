<script setup lang="ts">
import { useRoute } from 'vue-router'
import SearchIcon from '@/components/common/icons/SearchIcon/index.vue'
import MenuIcon from '@/components/common/icons/MenuIcon/index.vue'
import { NAVIGATION_LINK } from '@/constants/navigation'
import { isNotSearchPageLogic } from '@/logic/CommonLogic'
import styles from './styles.module.scss'

type Props = {
  handleOpenSearchModal: () => void
  handleOpenMenuModal: () => void
}

const props = defineProps<Props>()
const route = useRoute()
</script>

<template>
  <div :class="styles.container">
    <div :class="styles.top" />
    <div :class="styles.main">
      <NuxtLink to="/">
        <div :class="styles.title">
          <h1>refnote</h1>
          <p>Web開発の備忘録</p>
        </div>
      </NuxtLink>

      <!-- PC ナビゲーションリンク -->
      <div :class="styles.link">
        <NuxtLink :to="NAVIGATION_LINK.TOP">
          <h2 data-test-id="home-header-link">ホーム</h2>
        </NuxtLink>
        <NuxtLink :to="NAVIGATION_LINK.ABOUT">
          <h2 data-test-id="about-header-link">このブログについて</h2>
        </NuxtLink>
        <NuxtLink :to="NAVIGATION_LINK.PROFILE">
          <h2 data-test-id="profile-header-link">プロフィール</h2>
        </NuxtLink>
      </div>

      <!-- SP アイコン -->
      <div :class="styles.sp">
        <!-- 検索 -->
        <div
          v-if="isNotSearchPageLogic(route.path)"
          :class="styles.sp__search"
          @click="props.handleOpenSearchModal"
        >
          <SearchIcon />
        </div>

        <!-- ハンバーガー -->
        <div
          :class="styles.sp__menu"
          @click="props.handleOpenMenuModal"
        >
          <MenuIcon />
        </div>
      </div>
    </div>
  </div>
</template>
