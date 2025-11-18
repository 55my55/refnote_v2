<template>
  <div>
    <div v-if="pending" class="loading-state">
      <p>Loading post...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p>Could not load the post.</p>
      <p>
        {{ error.message }}
      </p>
    </div>
    <article v-else-if="post" class="post-detail">
      <Head>
        <Title>{{ post.title }} | My Tech Blog</Title>
        <Meta name="description" :content="metaDescription" />
      </Head>

      <h1 class="post-detail__title">{{ post.title }}</h1>
      <PostMeta :published-at="post.publishedAt" class="post-detail__meta" />
      <div class="post-detail__body" v-html="post.body"></div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePostDetail } from '~/composables/usePostDetail'
import PostMeta from '~/components/common/molecules/PostMeta.vue'

const { post, pending, error } = usePostDetail()

const metaDescription = computed(() => {
  const html = post.value?.body
  if (!html) return 'A post from My Tech Blog.'

  const text = html.replace(/<[^>]+>/g, '')
  return text.substring(0, 160)
})


</script>

<style scoped lang="scss">
.loading-state,
.error-state {
  padding: 2rem;
  text-align: center;
  color: #666;
}

.post-detail {
  &__title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  &__meta {
    margin-bottom: 2.5rem;
  }

  &__body {
    // Basic styling for microCMS rich editor output
    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
      margin-top: 2em;
      margin-bottom: 1em;
      font-weight: 600;
    }

    :deep(p) {
      line-height: 1.8;
      margin-bottom: 1.5em;
    }

    :deep(a) {
      color: #007bff;
      text-decoration: underline;
    }

    :deep(pre) {
      background-color: #2d2d2d;
      color: #f8f8f2;
      padding: 1em;
      border-radius: 0.5em;
      overflow-x: auto;
      margin: 1.5em 0;
    }

    :deep(code) {
      font-family: 'Fira Code', 'Courier New', monospace;
    }

    :deep(blockquote) {
      border-left: 4px solid #ccc;
      margin: 1.5em 0;
      padding: 0.5em 1em;
      color: #666;
    }

    :deep(ul),
    :deep(ol) {
      margin: 1.5em 0;
      padding-left: 2em;
    }

    :deep(li) {
      margin-bottom: 0.5em;
    }
  }
}
</style>
