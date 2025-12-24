<script setup lang="ts">
/**
 * layouts/Aside/CategoryArea
 * @package Component
 */

import { computed } from 'vue'
import BasicAsidePartsArea from '@/components/layouts/Aside/BasicAsidePartsArea/index.vue'
import { useState } from '#app'
import type { CategoryType } from '@/types/Category'
import styles from './styles.module.scss'

/* カテゴリー一覧（グローバル状態） */
const categories = useState<CategoryType[]>('categories')

type CategoryView = Pick<CategoryType, 'id' | 'name'> & { isDummy?: boolean }

const dummyCategories: CategoryView[] = [
  { id: 'dummy-1', name: 'Category', isDummy: true },
  { id: 'dummy-2', name: 'Category', isDummy: true },
  { id: 'dummy-3', name: 'Category', isDummy: true },
  { id: 'dummy-4', name: 'Category', isDummy: true },
]

const categoryItems = computed<CategoryView[]>(() => {
  if (categories.value?.length) return categories.value
  return dummyCategories
})
</script>

<template>
  <BasicAsidePartsArea title="カテゴリー">
    <ul :class="styles.container">
      <li
        v-for="(category, index) in categoryItems"
        :key="`${category.id}_${index}`"
        :class="styles.list"
      >
        <div v-if="category.isDummy" :class="[styles.category, styles.category_dummy]">
          <span>{{ category.name }}</span>
        </div>
        <NuxtLink v-else :to="`/category/${category.id}/page/1`">
          <div :class="styles.category">
            <span>{{ category.name }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </BasicAsidePartsArea>
</template>
