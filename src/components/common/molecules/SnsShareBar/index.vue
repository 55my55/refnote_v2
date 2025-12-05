<script setup lang="ts">
/**
 * common/molecules/SnsShareBar
 * @package Component
 */

/* components */
import HatenaShareButton from '@/components/common/atoms/HatenaShareButton/index.vue'
import TwitterShareButton from '@/components/common/atoms/TwitterShareButton/index.vue'
import FacebookShareButton from '@/components/common/atoms/FacebookShareButton/index.vue'

/* styles */
import styles from './styles.module.scss'

interface Props {
  shareUrl: string
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <ul :class="styles.container">
    <li :class="styles.content">Share!!</li>

    <!-- はてブ -->
    <li :class="styles.icon">
      <HatenaShareButton :shareUrl="props.shareUrl" :size="30" />
    </li>

    <!-- Twitter -->
    <li :class="styles.icon">
      <TwitterShareButton
        :shareUrl="props.shareUrl"
        :title="props.title"
        :size="30"
      />
    </li>

    <!-- Facebook -->
    <li :class="styles.icon">
      <FacebookShareButton :shareUrl="props.shareUrl" :size="30" />
    </li>
  </ul>
</template>
