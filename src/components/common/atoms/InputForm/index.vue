<script setup lang="ts">
/**
 * common/atoms/InputForm
 * @package Component
 */

/* styles */
import styles from './styles.module.scss'

interface InputFormProps {
  text: string
  placeholder?: string
  onChange?: (e: Event) => void
  onKeyUp?: (e: KeyboardEvent) => void
  onClick?: () => void
}

const props = withDefaults(defineProps<InputFormProps>(), {
  placeholder: '',
  onChange: () => {},
})

const emit = defineEmits<{
  (e: 'update:text', value: string): void
}>()

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:text', target.value)
  props.onChange?.(e)
}

const handleKeyUp = (e: KeyboardEvent) => {
  props.onKeyUp?.(e)
}

const handleClick = () => {
  props.onClick?.()
}
</script>

<template>
  <input
    :class="styles.input"
    type="text"
    :value="props.text"
    :placeholder="props.placeholder"
    @input="handleInput"
    @keyup="handleKeyUp"
    @click="handleClick"
  />
</template>
