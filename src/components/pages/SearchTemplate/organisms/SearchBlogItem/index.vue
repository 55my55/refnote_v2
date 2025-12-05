<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import DateArea from '@/components/common/molecules/DateArea/index.vue'
import type { BlogItemType } from '@/types/Blog'

/* props */
defineProps<{
  blogItem: BlogItemType
}>()

/* styles */
import styles from './styles.module.scss'
</script>

<template>
  <NuxtLink :to="`/${blogItem.id}`" :class="styles.container">
    <div :class="styles.image">
      <NuxtImg
        :src="blogItem.image.url"
        :alt="blogItem.title"
        format="webp"
        :width="blogItem.image.width * 2"
        :height="blogItem.image.height * 2"
      />
    </div>

    <h2 :class="styles.title">{{ blogItem.title }}</h2>

    <div :class="styles.category">
      <div
        v-for="(category, index) in blogItem.categories"
        :key="`${category.id}_${index}`"
        :class="styles.category__item"
      >
        {{ category.name }}
      </div>
    </div>

    <div :class="styles.date">
      <DateArea :date="blogItem.createdAt" />
    </div>
  </NuxtLink>
</template>
