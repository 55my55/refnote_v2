<script setup lang="ts">
/**
 * common/atoms/TwitterShareButton
 * @package Component
 */

type TwitterShareButtonProps = {
  shareUrl: string
  title: string
  size?: number
  radius?: number
}

const props = withDefaults(defineProps<TwitterShareButtonProps>(), {
  size: 40,
  radius: 10,
})

// Twitter のシェアタイトル
const shareTitle = `\n\n${props.title}`

// シェアリンク組み立て
const twitterShareUrl = `https://twitter.com/intent/tweet?${new URLSearchParams(
  {
    url: props.shareUrl,
    text: shareTitle,
    hashtags: 'NOCHITOKU',
  }
).toString()}`
</script>

<template>
  <a
    :href="twitterShareUrl"
    target="_blank"
    rel="noopener noreferrer"
    style="display: inline-flex; align-items: center; justify-content: center;"
  >
    <!-- とりあえず最低限の丸アイコン（後で SVG に差し替えればOK） -->
    <div
      :style="{
        width: `${props.size}px`,
        height: `${props.size}px`,
        borderRadius: `${props.radius}px`,
        backgroundColor: '#1DA1F2',
      }"
    ></div>
  </a>
</template>
