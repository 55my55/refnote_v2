<script setup lang="ts">
/**
 * 404ページ
 * @package pages
 */

import { watch } from 'vue'
import Error404Template from '@/components/pages/Error404Template/index.vue'
import { useSetData } from '@/composables/useSetData'
import { getArchiveListService } from '@/service/ArchiveService'
import { getCategoriesApi } from '@/apis/CategoryApi'
import { getProfileByApi } from '@/apis/ProfileApi'
import type { CategoryType } from '@/types/Category'
import type { ArchiveType } from '@/types/Archive'
import type { ProfileType } from '@/types/Profile'

type Error404PageData = {
  categories: CategoryType[]
  archiveList: ArchiveType[]
  profile: ProfileType
}

/**
 * グローバル状態 setter
 * （カテゴリ・アーカイブを 404 ページ表示前に反映する）
 */
const { setCategoryData, setArchiveData, setProfileData } = useSetData()
const archiveListState = useState<ArchiveType[]>('archiveList', () => [])

/**
 * カテゴリー・アーカイブの取得
 */
const { data } = await useAsyncData<Error404PageData>('error-404-page', async () => {
  const archiveListPromise = archiveListState.value.length
    ? Promise.resolve(archiveListState.value)
    : getArchiveListService()
  const [categories, archiveList, profile] = await Promise.all([
    getCategoriesApi(),
    archiveListPromise,
    getProfileByApi(),
  ])

  return {
    categories,
    archiveList,
    profile,
  }
})

/**
 * 取得データをグローバル状態に反映
 */
watch(
  data,
  (value) => {
    if (!value) return
    setCategoryData(value.categories)
    setArchiveData(value.archiveList)
    setProfileData(value.profile)
  },
  { immediate: true },
)

/**
 * 404 ページはインデックスさせない
 */
useHead({
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <Error404Template />
</template>
