import { useAsyncData } from 'nuxt/app'
import { getPosts } from '~/service/BlogService'
import type { BlogListResponse } from '~/types/Blog'

export const usePostList = (page: Ref<number> = ref(1)) => {
  const {
    data: posts,
    pending,
    error,
    refresh,
  } = useAsyncData<BlogListResponse>(
    `post-list-${page.value}`,
    () => getPosts(page.value),
    {
      watch: [page],
    }
  )

  return { posts, pending, error, refresh }
}
