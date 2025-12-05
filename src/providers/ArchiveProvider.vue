<script setup lang="ts">
import { reactive, provide } from 'vue'
import type { ArchiveType } from '@/types/Archive'
import {
  ArchiveStateKey,
  ArchiveActionsKey,
  type ArchiveStateType,
  type ArchiveActions
} from './ArchiveProviderInjectionKey'

// 初期状態
const state = reactive<ArchiveStateType>({
  archiveList: [],
})

// Actions
const actions: ArchiveActions = {
  setArchiveList(list: ArchiveType[]) {
    state.archiveList = list
  },
}

// provide
provide(ArchiveStateKey, state)
provide(ArchiveActionsKey, actions)
</script>

<template>
  <slot />
</template>
