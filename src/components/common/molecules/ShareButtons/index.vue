<script setup lang="ts">
import xLogoSrc from '@/svgs/x.svg?url'
import facebookLogoSrc from '@/svgs/facebook.svg?url'
import lineLogoSrc from '@/svgs/line.svg?url'
import copyLogoSrc from '@/svgs/copy.svg?url'
import styles from './styles.module.scss'

type Props = {
  url: string
  title: string
}
const props = defineProps<Props>()

const xShareUrl = computed(() => {
  const params = new URLSearchParams({
    url: props.url,
    text: props.title,
    hashtags: 'refnote',
  })
  return `https://x.com/intent/tweet?${params.toString()}`
})

const hatenaShareUrl = computed(() => {
  const params = new URLSearchParams({
    url: props.url,
    btitle: props.title,
  })
  return `https://b.hatena.ne.jp/entry/panel/?${params.toString()}`
})

const facebookShareUrl = computed(() => {
  const params = new URLSearchParams({ u: props.url })
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`
})

const lineShareUrl = computed(() => {
  const params = new URLSearchParams({ url: props.url })
  return `https://social-plugins.line.me/lineit/share?${params.toString()}`
})

const copied = ref(false)
const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(props.url)
    copied.value = true
    window.setTimeout(() => (copied.value = false), 1000)
  } catch {
    // 失敗時は何もしない（必要ならalert等に変更）
  }
}
</script>

<template>
  <div :class="styles.container">

    <div :class="styles.buttons">
      <a
        :href="xShareUrl"
        target="_blank"
        rel="noopener noreferrer"
        :class="[styles.button, styles.x]"
        aria-label="Xでシェア"
      >
        <img :src="xLogoSrc" alt="" :class="styles.icon" />
      </a>

      <a
        :href="facebookShareUrl"
        target="_blank"
        rel="noopener noreferrer"
        :class="[styles.button, styles.facebook]"
        aria-label="Facebookでシェア"
      >
        <span :class="styles.icon">f</span>
      </a>

      <a
        :href="hatenaShareUrl"
        target="_blank"
        rel="noopener noreferrer"
        :class="[styles.button, styles.hatena]"
        aria-label="はてなブックマークでシェア"
      >
        <span :class="styles.icon">B!</span>
      </a>

      <button
        type="button"
        :class="[styles.button, styles.copy]"
        aria-label="URLをコピー"
        @click="copyUrl"
      >
        <span :class="styles.icon">
          <img :src="copyLogoSrc" alt="" />
        </span>
      </button>

      <a
        :href="lineShareUrl"
        target="_blank"
        rel="noopener noreferrer"
        :class="[styles.button, styles.line]"
        aria-label="LINEでシェア"
      >
        <img :src="lineLogoSrc" alt="" :class="styles.icon" />
      </a>
    </div>
  </div>
</template>
