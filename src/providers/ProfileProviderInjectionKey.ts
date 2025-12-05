import type { InjectionKey } from 'vue'
import type { ProfileType } from '@/types/Profile'

export type ProfileStateType = {
  profile: ProfileType
}

export type ProfileActions = {
  setProfile: (profile: ProfileType) => void
}

export const ProfileStateKey: InjectionKey<ProfileStateType> =
  Symbol('ProfileState')

export const ProfileActionsKey: InjectionKey<ProfileActions> =
  Symbol('ProfileActions')
