<script setup lang="ts">
/**
 * common/molecules/SnsShareArea
 * @package Component
 */

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
  <div :class="styles.container">
    <div :class="styles.container__area">
      <div :class="styles.share">Share!!</div>

      <ul :class="styles.icons">
        <!-- はてブ -->
        <li :class="styles.icon">
          <HatenaShareButton :shareUrl="props.shareUrl" />
        </li>

        <!-- Twitter -->
        <li :class="styles.icon">
          <TwitterShareButton
            :shareUrl="props.shareUrl"
            :title="props.title"
          />
        </li>

        <!-- Facebook -->
        <li :class="styles.icon">
          <FacebookShareButton :shareUrl="props.shareUrl" />
        </li>

        <!-- はてブ SP -->
        <li :class="styles.icon__sp">
          <HatenaShareButton :shareUrl="props.shareUrl" :size="32" />
        </li>

        <!-- Twitter SP -->
        <li :class="styles.icon__sp">
          <TwitterShareButton
            :shareUrl="props.shareUrl"
            :title="props.title"
            :size="32"
          />
        </li>

        <!-- Facebook SP -->
        <li :class="styles.icon__sp">
          <FacebookShareButton :shareUrl="props.shareUrl" :size="32" />
        </li>
      </ul>
    </div>
  </div>
</template>
