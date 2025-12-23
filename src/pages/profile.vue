<!-- src/pages/profile.vue -->
<script setup lang="ts">
/**
 * プロフィールページ
 * @package pages
 */
import { watch } from 'vue'
import hljs from 'highlight.js'
import ProfileTemplate from '~/components/pages/ProfileTemplate/index.vue'
import { useSetData } from '~/composables/useSetData'
import { getProfileByApi } from '~/apis/ProfileApi'
import { getCategoriesApi } from '~/apis/CategoryApi'
import { getArchiveListService } from '~/service/ArchiveService'
import type { ProfileType } from '~/types/Profile'
import type { CategoryType } from '~/types/Category'
import type { ArchiveType } from '~/types/Archive'

type ProfilePageData = {
  profile: ProfileType | null
  highlightedBody: string
  categories: CategoryType[]
  archiveList: ArchiveType[]
}

/**
 * グローバル状態 setter
 */
const { setCategoryData, setProfileData, setArchiveData } = useSetData()
const archiveListState = useState<ArchiveType[]>('archiveList', () => [])

/**
 * プロフィール＋関連データ取得
 */
const { data, error } = await useAsyncData<ProfilePageData>('profile-page', async () => {
  // プロフィール／カテゴリ／アーカイブを並列取得
  const archiveListPromise = archiveListState.value.length
    ? Promise.resolve(archiveListState.value)
    : getArchiveListService()
  const [profile, categories, archiveList] = await Promise.all([
    getProfileByApi(),
    getCategoriesApi(),
    archiveListPromise,
  ])

  // cheerio は ESM なので動的 import
  const { load } = await import('cheerio')
  const $ = load(profile.contents)

  // シンタックスハイライト適用
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })

  return {
    profile,
    highlightedBody: $.html(),
    categories,
    archiveList,
  }
})

/**
 * 取得結果をグローバル状態へ反映
 */
watch(
  data,
  (value) => {
    if (!value) return
    if (value.categories.length) setCategoryData(value.categories)
    if (value.profile) setProfileData(value.profile)
    if (value.archiveList.length) setArchiveData(value.archiveList)
  },
  { immediate: true },
)
</script>

<template>
  <!-- エラー時 -->
  <div v-if="error">読み込みに失敗しました。</div>

  <!-- 正常時 -->
  <ProfileTemplate
    v-else-if="data && data.profile"
    :profile="data.profile"
    :highlighted-body="data.highlightedBody"
  />

  <!-- ローディング中 -->
  <div v-else>読み込み中…</div>
</template>
