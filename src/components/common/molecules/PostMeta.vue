<template>
  <div class="post-meta">
    <time :datetime="publishedAt" class="post-meta__published-at">
      {{ formattedDate }}
    </time>
    <span v-if="category" class="post-meta__category">{{ category }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  publishedAt: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: '',
  },
})

const formattedDate = computed(() => {
  if (!props.publishedAt) return ''
  return new Date(props.publishedAt).toLocaleDateString('ja-JP')
})
</script>

<style scoped lang="scss">
.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.875rem;
  color: #555;

  &__published-at {
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }

  &__category {
    padding: 2px 8px;
    border-radius: 4px;
    background-color: #f0f0f0;
    font-size: 0.75rem;
  }
}
</style>
