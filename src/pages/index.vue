<template>
  <div>
    <Head>
      <Title>My Tech Blog | Top</Title>
      <Meta name="description" content="A blog about technology and programming." />
    </Head>

    <h1>Blog Posts</h1>

    <div v-if="pending" class="loading-state">
      <p>Loading posts...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p>An error occurred while fetching posts. Please try again later.</p>
      <pre>{{ error.message }}</pre>
    </div>
    <div v-else-if="posts && posts.contents.length > 0">
      <PostList :posts="posts.contents" />
      <!-- Pagination can be added here later -->
    </div>
    <div v-else class="empty-state">
      <p>No posts found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostList } from '~/composables/usePostList'
import PostList from '~/components/common/organisms/PostList.vue'

const page = ref(1)
const { posts, pending, error } = usePostList(page)
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
}

.loading-state,
.error-state,
.empty-state {
  padding: 2rem;
  text-align: center;
  color: #666;
  background-color: #fafafa;
  border-radius: 8px;
}
</style>
