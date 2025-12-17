<script setup lang="ts">
/**
 * common/molecules/BlogItem
 * @package Component
 */

import { computed } from 'vue'
import DateArea from '~/components/common/molecules/DateArea/index.vue'
import type { BlogItemType } from '~/types/Blog'
import styles from './styles.module.scss'

interface Props {
  blogItem: BlogItemType
}

const props = defineProps<Props>()

// 一覧用サムネイルの想定サイズ
const THUMB_WIDTH = 320
const THUMB_HEIGHT = 180

const FALLBACK_SRC = '/favicon.ico'

const thumbnail = computed(() => {
  const image = props.blogItem.image

  if (image?.url) {
    return {
      src: image.url,
      width: THUMB_WIDTH,
      height: THUMB_HEIGHT,
    }
  }

  return {
    src: FALLBACK_SRC,
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
  }
})
</script>

<template>
  <NuxtLink :to="`/${props.blogItem.slug || props.blogItem.id}`">
    <div :class="styles.container">
      <!-- 画像 -->
      <div :class="styles.image">
        <NuxtImg
          :src="thumbnail.src"
          :alt="props.blogItem.title"
          :width="thumbnail.width"
          :height="thumbnail.height"
          :quality="75"
          format="webp"
          loading="lazy"
          decoding="async"
          fit="cover"
          sizes="(max-width: 600px) 100vw, 320px"
        />
      </div>

      <!-- 本文 -->
      <div :class="styles.content">
        <h2 :class="styles.title">
          {{ props.blogItem.title }}
        </h2>

        <!-- カテゴリ一覧 -->
        <div :class="styles.category">
          <div
            v-for="(category, index) in props.blogItem.categories"
            :key="`${category.id}_${index}`"
            :class="styles.category__item"
          >
            {{ category.name }}
          </div>
        </div>

        <!-- 日付 -->
        <div :class="styles.date">
          <DateArea :date="props.blogItem.createdAt" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
