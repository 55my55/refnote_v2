import type { InjectionKey } from 'vue'
import type { CategoryType } from '@/types/Category'

export type CategoryStateType = {
  categories: CategoryType[]
}

export type CategoryActions = {
  setCategories: (list: CategoryType[]) => void
}

export const CategoryStateKey: InjectionKey<CategoryStateType> =
  Symbol('CategoryState')

export const CategoryActionsKey: InjectionKey<CategoryActions> =
  Symbol('CategoryActions')
