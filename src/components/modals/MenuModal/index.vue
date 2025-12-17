<script setup lang="ts">
/**
 * modals/MenuModal
 * @package Component
 */
import CloseIcon from '@/components/common/icons/CloseIcon/index.vue'

const props = defineProps<{
  isMenuModalVisible: boolean
  handleCloseMenuModal: () => void
  handleHomeLink: () => void
  handleAboutLink: () => void
  handleProfileLink: () => void
}>()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="props.isMenuModalVisible"
      :class="$style.overlay_base"
      @click.self="props.handleCloseMenuModal"
    >
      <div :class="$style.content_base">
        <ul :class="$style.links">
          <li :class="$style.title">MENU</li>
          <li :class="$style.link" @click="props.handleHomeLink">ホーム</li>
          <li :class="$style.link" @click="props.handleAboutLink">このブログについて</li>
          <li :class="$style.link" @click="props.handleProfileLink">プロフィール</li>
        </ul>

        <div :class="$style.close" @click="props.handleCloseMenuModal">
          <div :class="$style.close__icon">
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style module lang="scss" src="./styles.module.scss"></style>
