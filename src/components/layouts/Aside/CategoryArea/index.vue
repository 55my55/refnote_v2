<script setup lang="ts">
/**
 * layouts/Aside/CategoryArea
 * @package Component
 */

import BasicAsidePartsArea from '@/components/layouts/Aside/BasicAsidePartsArea/index.vue'
import { useState } from '#app'
import type { CategoryType } from '@/types/Category'
import styles from './styles.module.scss'

/* カテゴリー一覧（グローバル状態） */
const categories = useState<CategoryType[]>('categories')
</script>

<template>
  <BasicAsidePartsArea title="カテゴリー">
    <ul :class="styles.container">
      <li
        v-for="(category, index) in categories"
        :key="`${category.id}_${index}`"
        :class="styles.list"
      >
        <NuxtLink :to="`/category/${category.id}/page/1`">
          <div :class="styles.category">
            <span>{{ category.name }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </BasicAsidePartsArea>
</template>
