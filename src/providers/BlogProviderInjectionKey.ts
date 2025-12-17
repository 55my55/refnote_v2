// src/providers/BlogProviderInjectionKey.ts
/**
 * BlogProviderInjection
 * 状態/アクションの型定義と inject 用キーを提供
 */
import type { InjectionKey } from 'vue'
import type { BlogItemType } from '@/types/Blog'

export type BlogState = {
  blogList: BlogItemType[]
  totalCount: number
}

export type BlogActions = {
  setBlogData: (list: BlogItemType[], totalCount: number) => void
}

export const blogStateKey: InjectionKey<BlogState> = Symbol('BlogState')
export const blogActionsKey: InjectionKey<BlogActions> = Symbol('BlogActions')

export const useBlogState = () => {
  const state = inject(blogStateKey)
  if (!state) throw new Error('BlogState not provided.')
  return state
}

export const useBlogActions = () => {
  const actions = inject(blogActionsKey)
  if (!actions) throw new Error('BlogActions not provided.')
  return actions
}
