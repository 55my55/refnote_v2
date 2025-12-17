<script setup lang="ts">
/**
 * layouts/BasePostPageLayout
 * @package Component
 */
import BaseLayout from '@/components/layouts/BaseLayout/index.vue'
import Aside from '~/components/layouts/Aside/index.vue'
import type { MetaHeadType } from '@/types/MetaHead'
import styles from './styles.module.scss'

type Props = {
  metaData: MetaHeadType
  breadName?: string
}

const props = defineProps<Props>()
</script>

<template>
  <BaseLayout :metaData="props.metaData" :breadName="props.breadName">
    <article :class="styles.article">
      <slot />
    </article>
    <div :class="styles.aside">
      <Aside />
    </div>
  </BaseLayout>
</template>
