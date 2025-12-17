<script setup lang="ts">
import DateArea from '@/components/common/molecules/DateArea/index.vue'

import type { BlogItemType } from '@/types/Blog'
import type { ImageType } from '@/types/Image'

import styles from './styles.module.scss'

interface Props {
  blogItem: BlogItemType & {
    image: ImageType
  }
}

const props = defineProps<Props>()
</script>

<template>
  <NuxtLink :to="`/${props.blogItem.slug || props.blogItem.id}`">
    <div :class="styles.container">
      <!-- 画像 -->
      <div :class="styles.image">
        <NuxtImg
          :src="props.blogItem.image.url"
          :alt="props.blogItem.title"
          format="webp"
          width="320"
          height="180"
          fit="cover"
          quality="70"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 600px) 100vw, 320px"
        />
      </div>

      <!-- タイトル -->
      <h2 :class="styles.title">
        {{ props.blogItem.title }}
      </h2>

      <!-- カテゴリ -->
      <div :class="styles.category">
        <div
          v-for="(category, index) in props.blogItem.categories"
          :key="`${category.id}_${index}`"
          :class="styles.category__item"
        >
          {{ category.name }}
        </div>
      </div>

      <!-- 日付（PC） -->
      <div :class="styles.date">
        <DateArea :date="props.blogItem.createdAt" :size="18" />
      </div>

      <!-- 日付（SP） -->
      <div :class="styles.date__sp">
        <DateArea :date="props.blogItem.createdAt" :size="12" />
      </div>
    </div>
  </NuxtLink>
</template>
