<script setup lang="ts">
/**
 * BlogProvider
 */
import { reactive, provide } from 'vue'
import type { BlogItemType } from '@/types/Blog'
import {
  blogStateKey,
  blogActionsKey,
  type BlogState,
  type BlogActions
} from './BlogProviderInjectionKey'

/** state */
const state = reactive<BlogState>({
  blogList: [],
  totalCount: 0
})

/** actions */
const actions: BlogActions = {
  setBlogData(list: BlogItemType[], totalCount: number) {
    state.blogList = list
    state.totalCount = totalCount
  }
}

/** provide */
provide(blogStateKey, state)
provide(blogActionsKey, actions)
</script>

<template>
  <slot />
</template>
