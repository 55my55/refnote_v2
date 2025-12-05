<script setup lang="ts">
import { reactive, provide } from 'vue'
import {
  CategoryStateKey,
  CategoryActionsKey,
  type CategoryStateType,
  type CategoryActions,
} from './CategoryProviderInjectionKey'

const state = reactive<CategoryStateType>({
  categories: [],
})

const actions: CategoryActions = {
  setCategories(list) {
    state.categories = list
  },
}

provide(CategoryStateKey, state)
provide(CategoryActionsKey, actions)
</script>

<template>
  <slot />
</template>
