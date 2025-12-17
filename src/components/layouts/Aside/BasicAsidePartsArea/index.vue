<script setup lang="ts">
/**
 * layouts/Aside/BasicAsidePartsArea
 * @package Component
 */

import styles from './styles.module.scss'

/* props */
interface Props {
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    <h6 :class="styles.title">{{ props.title }}</h6>
    <div :class="styles.bar" />
    <div :class="styles.field">
      <slot />
    </div>
  </div>
</template>
