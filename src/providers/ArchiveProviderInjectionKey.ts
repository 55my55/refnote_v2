import type { InjectionKey } from 'vue'
import type { ArchiveType } from '@/types/Archive'

export type ArchiveStateType = {
  archiveList: ArchiveType[]
}

export type ArchiveActions = {
  setArchiveList: (list: ArchiveType[]) => void
}

export const ArchiveStateKey: InjectionKey<ArchiveStateType> = Symbol('ArchiveState')
export const ArchiveActionsKey: InjectionKey<ArchiveActions> = Symbol('ArchiveActions')
