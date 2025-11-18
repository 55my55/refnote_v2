// src/apis/BlogApi.ts
import type { Blog, BlogListResponse } from '~/types/Blog'

type BlogListQueries = {
  limit?: number
  offset?: number
  orders?: string
  filters?: string
}

export const getBlogs = (queries?: BlogListQueries) => {
  return $fetch<BlogListResponse>('/api/microcms/blogs', {
    params: queries,
  })
}

export const getBlogBySlug = (slug: string) => {
  if (!slug) {
    return Promise.reject(new Error('slug is required'))
  }

  // ★ さっき作ったサーバー API に合わせる
  return $fetch<Blog>(`/api/microcms/blog/${slug}`)
}
