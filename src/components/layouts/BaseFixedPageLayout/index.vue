<script setup lang="ts">
/**
 * layouts/BaseFixedPageLayout
 * @package Components
 */

/* components */
import BaseLayout from '@/components/layouts/BaseLayout/index.vue'
/* types */
import type { MetaHeadType } from '@/types/MetaHead'
/* styles */
import styles from './styles.module.scss'

/**
 * Props
 */
interface Props {
  metaData: MetaHeadType
  breadName?: string
}

const props = defineProps<Props>()
</script>

<template>
  <BaseLayout :meta-data="props.metaData" :bread-name="props.breadName">
    <article :class="styles.article">
      <slot />
    </article>
  </BaseLayout>
</template>
