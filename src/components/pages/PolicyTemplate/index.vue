<script setup lang="ts">
/**
 * pages/PolicyTemplate
 * @package Component
 */
import BaseFixedPageLayout from '@/components/layouts/BaseFixedPageLayout/index.vue'
import PageTitle from '@/components/common/atoms/PageTitle/index.vue'
import HighlightBody from '@/components/common/molecules/HighlightBody/index.vue'
import { useMetaData } from '@/composables/useMetaData'
/* styles */
import styles from './styles.module.scss'

/**
 * props
 */
interface Props {
  title: string
  highlightedBody: string
}

/**
 * PolicyTemplate
 */
const props = defineProps<Props>()

/* hooks */
const { metaData } = useMetaData({ title: props.title })
</script>

<template>
  <BaseFixedPageLayout :metaData="metaData" :breadName="props.title">
    <!-- ページタイトル -->
    <PageTitle :title="props.title" />

    <div :class="styles.body">
      <!-- 記事本文 -->
      <HighlightBody :highlightedBody="props.highlightedBody" />
    </div>
  </BaseFixedPageLayout>
</template>
