<script setup lang="ts">
/**
 * common/molecules/Pagination
 * @package Component
 */

import { computed } from 'vue'
/* hooks */
import { usePagination } from '@/composables/usePagination'
/* constants */
import { BLOG_SHOW_COUNT } from '@/constants/config'
/* styles */
import styles from './styles.module.scss'

interface Props {
  totalCount: number
  link: string
}

const props = defineProps<Props>()

const { currentPage, createPageRange } = usePagination()

const pages = computed(() =>
  props.totalCount !== 0
    ? createPageRange(1, Math.ceil(props.totalCount / BLOG_SHOW_COUNT))
    : []
)
</script>

<template>
  <ul v-if="props.totalCount !== 0" :class="styles.container">
    <li
      v-for="(number, index) in pages"
      :key="index"
      :class="styles.iconArea"
    >
      <NuxtLink :to="`${props.link}${number}`">
        <span
          :class="
            currentPage !== number ? styles.icon : styles.currentIcon
          "
        >
          {{ number }}
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>
