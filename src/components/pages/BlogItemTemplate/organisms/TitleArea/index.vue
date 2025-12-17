<script setup lang="ts">
import DateArea from '@/components/common/molecules/DateArea/index.vue'
import type { BlogItemType } from '@/types/Blog'

const props = defineProps<{
  blogItem: BlogItemType
}>()
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.category">
      <div v-for="category in blogItem.categories" :key="category.id">
        <NuxtLink :to="`/category/${category.id}/page/1`">
          <div :class="$style.category__item">
            {{ category.name }}
          </div>
        </NuxtLink>
      </div>
    </div>

    <h2 :class="$style.title">{{ blogItem.title }}</h2>

    <div :class="$style.date">
      <DateArea :date="blogItem.createdAt" />
    </div>
  </div>
</template>

<style module lang="scss" src="./styles.module.scss"></style>
