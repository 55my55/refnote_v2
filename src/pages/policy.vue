<!-- src/pages/policy.vue -->
<script setup lang="ts">
/**
 * プライバシーポリシーページ
 * @package pages
 */

import PolicyTemplate from '@/components/pages/PolicyTemplate/index.vue'
import hljs from 'highlight.js'
import { getPolicyApi } from '@/apis/FixArticleApi'

type PolicyPageData = {
  title: string
  highlightedBody: string
}

/**
 * プライバシーポリシー本文取得＋ハイライト
 * Next の getStaticProps 相当
 */
const { data, error } = await useAsyncData<PolicyPageData>('policy', async () => {
  // プライバシーポリシーデータ取得
  const policyData = await getPolicyApi()

  // cheerio は ESM なので動的 import
  const { load } = await import('cheerio')
  const $ = load(policyData.body)

  // シンタックスハイライト適用
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })

  return {
    title: policyData.title,
    highlightedBody: $.html(),
  }
})
</script>

<template>
  <!-- エラー時はとりあえず何かしらメッセージだけ出す -->
  <div v-if="error">読み込みに失敗しました。</div>

  <PolicyTemplate v-else-if="data" :title="data.title" :highlighted-body="data.highlightedBody" />

  <!-- data も error もまだ無い瞬間用（初回ローディング） -->
  <div v-else>読み込み中…</div>
</template>
