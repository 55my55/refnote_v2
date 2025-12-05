<script setup lang="ts">
/**
 * common/molecules/SearchInputForm
 * @package Component
 */

// props だけ定義（中ではまだ使わない）
interface SearchInputFormProps {
  text: string
  placeholder: string
  size?: number
  onChange?: (e: Event) => void
  onKeyUp?: (e: KeyboardEvent) => void
  onClick?: () => void
}

defineProps<SearchInputFormProps>()
</script>

<template>
  <div>
    <!-- 一旦ダミー -->
    SearchInputForm
  </div>
</template>
