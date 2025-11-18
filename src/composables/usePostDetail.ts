import { useAsyncData, useRoute, showError } from 'nuxt/app'
import { getPostBySlug } from '~/service/BlogService'
import type { Blog } from '~/types/Blog'

export const usePostDetail = () => {
  const route = useRoute()
  const { slug } = route.params

  if (typeof slug !== 'string') {
    throw showError({
      statusCode: 400,
      statusMessage: 'Invalid slug',
    })
  }

  const {
    data: post,
    pending,
    error,
  } = useAsyncData<Blog>(`post-detail-${slug}`, async () => {
    try {
      const postData = await getPostBySlug(slug)
      if (!postData) {
        throw new Error('Post not found')
      }
      return postData
    } catch (e) {
      throw showError({
        statusCode: 404,
        statusMessage: 'Post not found',
      })
    }
  })

  return { post, pending, error }
}
