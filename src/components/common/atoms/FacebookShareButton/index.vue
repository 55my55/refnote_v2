<script setup lang="ts">
import { computed } from 'vue'

type FacebookShareButtonProps = {
  shareUrl: string
  size?: number
  radius?: number
}

const props = withDefaults(defineProps<FacebookShareButtonProps>(), {
  size: 40,
  radius: 10,
})

/**
 * Facebook のシェア URL
 */
const shareLink = computed(() => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    props.shareUrl
  )}`
})

/**
 * アイコンのスタイル
 */
const iconStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  borderRadius: `${props.radius}px`,
}))

const facebookLogoSrc = new URL('@/svgs/facebook.svg', import.meta.url).href
</script>

<template>
  <a
    :href="shareLink"
    target="_blank"
    rel="noopener noreferrer"
    class="share-btn"
  >
    <img
      :src="facebookLogoSrc"
      alt="Facebookでシェア"
      :style="iconStyle"
    />
  </a>
</template>

<style scoped>
.share-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
