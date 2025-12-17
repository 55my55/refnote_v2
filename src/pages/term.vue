<script setup lang="ts">
/**
 * 利用規約ページ
 * @package pages
 */

import hljs from 'highlight.js'
import TermTemplate from '@/components/pages/TermTemplate/index.vue'
import { getTermApi } from '@/apis/FixArticleApi'

type TermPageData = {
  title: string
  highlightedBody: string
}

/**
 * 利用規約データ取得
 * Next の getStaticProps 相当
 */
const { data } = await useAsyncData<TermPageData>('term-page', async () => {
  const termData = await getTermApi()

  // cheerio は ESM のため dynamic import で読み込む
  const { load } = await import('cheerio')
  const $ = load(termData.body)

  // シンタックスハイライト適用
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })

  return {
    title: termData.title,
    highlightedBody: $.html(),
  }
})
</script>

<template>
  <!-- データ取得完了後に利用規約テンプレートを表示 -->
  <TermTemplate v-if="data" :title="data.title" :highlighted-body="data.highlightedBody" />
</template>
