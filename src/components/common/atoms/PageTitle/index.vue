<script setup lang="ts">
/**
 * common/atoms/PageTitle
 * @package Component
 */

/* styles */
import styles from './styles.module.scss'

/**
 * props
 */
type Props = {
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="styles.title">
    <h2 :class="styles.title__content">{{ props.title }}</h2>
    <p :class="styles.title__border"></p>
  </div>
</template>
