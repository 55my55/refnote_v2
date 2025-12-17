<script setup lang="ts">
import { reactive, provide } from 'vue'
import { initProfileState } from '@/constants/initState'
import {
  ProfileStateKey,
  ProfileActionsKey,
  type ProfileStateType,
  type ProfileActions,
} from './ProfileProviderInjectionKey'

const state = reactive<ProfileStateType>({
  profile: initProfileState,
})

const actions: ProfileActions = {
  setProfile(profile) {
    state.profile = profile
  },
}

provide(ProfileStateKey, state)
provide(ProfileActionsKey, actions)
</script>

<template>
  <slot />
</template>
