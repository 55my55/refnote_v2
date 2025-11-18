<template>
  <div class="post-list">
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup lang="ts">
import type { Blog } from '~/types/Blog'
import PostCard from '~/components/common/organisms/PostCard.vue'

defineProps({
  posts: {
    type: Array as () => Blog[],
    required: true,
  },
})
</script>

<style scoped lang="scss">
.post-list {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}
</style>
