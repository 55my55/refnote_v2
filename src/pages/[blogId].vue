<script setup lang="ts">
import { computed, watch } from 'vue'
import hljs from 'highlight.js'
import BlogItemTemplate from '~/components/pages/BlogItemTemplate/index.vue'
import Error404Template from '~/components/pages/Error404Template/index.vue'
import { useSetData } from '~/composables/useSetData'
import { getArchiveListService } from '~/service/ArchiveService'
import { getBlogByApi } from '~/apis/BlogApi'
import { getCategoriesApi } from '~/apis/CategoryApi'
import { getProfileByApi } from '~/apis/ProfileApi'
import type { BlogItemType, TableOfContentType } from '~/types/Blog'
import type { CategoryType } from '~/types/Category'
import type { ProfileType } from '~/types/Profile'
import type { ArchiveType } from '~/types/Archive'

/**
 * ページで扱うデータ型
 */
type BlogItemPageData = {
  blogItem: BlogItemType | null
  highlightedBody: string
  tableOfContents: TableOfContentType[]
  categories: CategoryType[]
  profile: ProfileType | null
  archiveList: ArchiveType[]
  draftKey: string
}

/**
 * パラメータ取得（/［blogId］?draftKey=xxx）
 */
const route = useRoute()
const blogId = computed(() => route.params.blogId as string)
const draftKey = computed(() => (route.query.draftKey as string | undefined) ?? '')

/**
 * グローバル状態 setter（カテゴリ / プロフィール / アーカイブ）
 */
const { setCategoryData, setProfileData, setArchiveData } = useSetData()

/**
 * 記事詳細データ取得（Next の getStaticProps 相当）
 */
const { data } = await useAsyncData<BlogItemPageData>(
  () => `blogItem-${blogId.value}-${draftKey.value}`,
  async () => {
    try {
      // 取得処理の計測開始 -----------------------------
      console.time('blogItem-fetch')

      // ブログ記事詳細・カテゴリ・プロフィール・アーカイブを並列取得
      const [blogDetailData, categories, profile, archiveList] = await Promise.all([
        getBlogByApi(blogId.value, draftKey.value),
        getCategoriesApi(),
        getProfileByApi(),
        getArchiveListService(),
      ])

      console.timeEnd('blogItem-fetch')

      // シンタックスハイライトと目次生成はサーバー側のみで実行（クライアント遷移時のエラーを防止）
      let highlightedBody = blogDetailData.body
      let tableOfContents: TableOfContentType[] = []

      if (import.meta.server) {
        console.time('blogItem-highlight')
        // Nuxt4 では cheerio を ESM として扱うため dynamic import を利用
        // 型は any で握りつぶし、環境依存のエラーを回避する
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cheerio = (await import('cheerio')) as any
        const $ = cheerio.load(blogDetailData.body)

        $('pre code').each((_: unknown, elm: any) => {
          const result = hljs.highlightAuto($(elm).text())
          $(elm).html(result.value)
          $(elm).addClass('hljs')
        })
        console.timeEnd('blogItem-highlight')

        // 目次作成（h1, h2 を走査）
        const headings = $('h1, h2').toArray()
        tableOfContents = headings.map((node: any) => {
          return {
            text: String(node.children?.[0]?.data ?? ''),
            id: node.attribs?.id ?? '',
            name: node.name ?? '',
          }
        })

        highlightedBody = $.html()
      }

      return {
        blogItem: blogDetailData,
        highlightedBody,
        tableOfContents,
        categories,
        profile,
        archiveList,
        draftKey: draftKey.value,
      }
    } catch (_e) {
      // 404 相当
      return {
        blogItem: null,
        highlightedBody: '',
        tableOfContents: [],
        categories: [],
        profile: null,
        archiveList: [],
        draftKey: draftKey.value,
      }
    }
  },
)

/**
 * 取得したマスタ系データをグローバル状態に反映
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

/**
 * 404 時は noindex を付与
 */
watch(
  () => data.value?.blogItem,
  (blogItem) => {
    if (!blogItem) {
      useHead({
        meta: [{ name: 'robots', content: 'noindex' }],
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <Error404Template v-if="!data || !data.blogItem" />
  <BlogItemTemplate
    v-else
    :blog-item="data.blogItem"
    :highlighted-body="data.highlightedBody"
    :table-of-contents="data.tableOfContents"
    :draft-key="data.draftKey"
  />
</template>
