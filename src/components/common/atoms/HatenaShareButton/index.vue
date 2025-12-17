<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  shareUrl: string
  size?: number
  radius?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 40,
  radius: 10,
})

// はてなブックマークのシェアURL
const hatenaShareUrl = computed(() => {
  return `https://b.hatena.ne.jp/entry/panel/?url=${encodeURIComponent(props.shareUrl)}`
})

const onClick = () => {
  // 画面サイズは適宜調整
  window.open(hatenaShareUrl.value, 'hatena', 'width=550,height=420')
}
</script>

<template>
  <button type="button" class="hatena-share-button" @click="onClick">
    <!-- 本家の B! アイコン代わり。後でSVGアイコンに差し替えてOK -->
    <span class="hatena-share-button__icon">B!</span>
  </button>
</template>

<style scoped lang="scss">
.hatena-share-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  // React版の size / radius をざっくり再現
  width: 40px;
  height: 40px;
  border-radius: 10px;

  background-color: #00a4de;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}

.hatena-share-button__icon {
  line-height: 1;
}
</style>
