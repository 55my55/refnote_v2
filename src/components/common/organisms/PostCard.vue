<template>
  <article class="post-card">
    <NuxtLink :to="`/posts/${post.slug}`" class="post-card__link">
      <div class="post-card__content">
        <h2 class="post-card__title">{{ post.title }}</h2>
        <PostMeta :published-at="post.publishedAt" />
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Blog } from '~/types/Blog'
import PostMeta from '~/components/common/molecules/PostMeta.vue'

defineProps({
  post: {
    type: Object as () => Blog,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.post-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &__link {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  &__content {
    padding: 16px 24px;
  }

  &__title {
    margin: 0 0 12px;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
  }
}
</style>
