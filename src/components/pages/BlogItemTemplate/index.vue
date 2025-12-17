<script setup lang="ts">
import BasePostPageLayout from '@/components/layouts/BasePostPageLayout/index.vue'
import ShareButtons from '@/components/common/molecules/ShareButtons/index.vue'
import TitleArea from './organisms/TitleArea/index.vue'
import TableOfContents from './organisms/TableOfContents/index.vue'
import HighlightBody from '@/components/common/molecules/HighlightBody/index.vue'
import { useMetaData } from '@/composables/useMetaData'
import { useShareUrl } from '@/composables/useShareUrl'
import type { BlogItemType, TableOfContentType } from '@/types/Blog'

const { blogItem, highlightedBody, tableOfContents, draftKey } = defineProps<{
  blogItem: BlogItemType
  highlightedBody: string
  tableOfContents: TableOfContentType[]
  draftKey?: string
}>()

const { metaData } = useMetaData({
  title: blogItem.title,
  description: blogItem.description,
  imagePath: blogItem.image.url,
})

const { shareUrl } = useShareUrl()
</script>

<template>
  <BasePostPageLayout :metaData="metaData" :breadName="blogItem.title">
    <section :class="$style.container">
      <div v-if="draftKey">
        現在プレビューモードで閲覧中です。
        <NuxtLink :to="`/api/cancel-preview?id=${blogItem.id}`"> プレビューを解除 </NuxtLink>
      </div>

      <!-- タイトル・カテゴリ・日時 -->
      <TitleArea :blogItem="blogItem" />

      <div :class="$style.image">
        <!-- 記事のメイン画像（最適化版） -->
        <NuxtImg
          :src="blogItem.image.url"
          :alt="blogItem.title"
          :width="blogItem.image.width"
          :height="blogItem.image.height"
          format="webp"
          :quality="75"
          loading="lazy"
          sizes="(max-width: 800px) 100vw, 960px"
        />
      </div>

      <!-- SNSシェアボタン 記事最下層 -->
      <ShareButtons :url="shareUrl" :title="blogItem.title" />

      <main :class="$style.main">
        <div :class="$style.rightBar">
          <!-- 目次 -->
          <TableOfContents :tableOfContents="tableOfContents" />

          <!-- 記事本文 -->
          <HighlightBody :highlightedBody="highlightedBody" />
        </div>
      </main>
    </section>
  </BasePostPageLayout>
</template>

<style module lang="scss" src="./styles.module.scss"></style>
