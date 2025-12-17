<script setup lang="ts">
/**
 * common/molecules/SearchInputForm
 * @package Component
 */

import InputForm from '~/components/common/atoms/InputForm/index.vue'
import SearchIcon from '~/components/common/icons/SearchIcon/index.vue'
import styles from './styles.module.scss'

interface Props {
  text: string
  placeholder: string
  size?: number
  onChange?: (e: Event) => void
  onKeyUp?: (e: KeyboardEvent) => void
  onClick?: () => void
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="styles.container">
    <InputForm
      :text="props.text"
      :placeholder="props.placeholder"
      :on-change="props.onChange"
      :on-key-up="props.onKeyUp"
      :on-click="props.onClick"
    />
    <div :class="styles.icon">
      <SearchIcon :size="props.size" />
    </div>
  </div>
</template>
