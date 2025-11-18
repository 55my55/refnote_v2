// src/service/BlogService.ts
import { getBlogs, getBlogBySlug } from '~/apis/BlogApi'
import type { Blog, BlogListResponse } from '~/types/Blog'

const POSTS_PER_PAGE = 10

export const getPosts = async (
  page: number = 1,
): Promise<BlogListResponse> => {
  const offset = (page - 1) * POSTS_PER_PAGE

  return await getBlogs({
    limit: POSTS_PER_PAGE,
    offset,
    orders: '-publishedAt',
  })
}

// ★ Service 側には「getBlogBySlug」は置かず、
//   `getPostBySlug` というドメイン名でまとめる
export const getPostBySlug = async (slug: string): Promise<Blog> => {
  if (!slug) {
    throw new Error('slug is required for getPostBySlug')
  }
  return await getBlogBySlug(slug)
}
