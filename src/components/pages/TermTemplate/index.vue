<script setup lang="ts">
/**
 * pages/TermTemplate
 * @package Components
 */

import { toRefs } from 'vue'

/* components */
import BaseFixedPageLayout from '@/components/layouts/BaseFixedPageLayout/index.vue'
import PageTitle from '@/components/common/atoms/PageTitle/index.vue'
import HighlightBody from '@/components/common/molecules/HighlightBody/index.vue'

/* composables */
import { useMetaData } from '@/composables/useMetaData'

/* styles */
import styles from './styles.module.scss'

/**
 * props
 */
const props = defineProps<{
  title: string
  highlightedBody: string
}>()

const { title, highlightedBody } = toRefs(props)

/* composables */
const { metaData } = useMetaData({
  title: title.value,
})
</script>

<template>
  <BaseFixedPageLayout
    :metaData="metaData"
    :breadName="title"
  >
    <!-- ページタイトル -->
    <PageTitle :title="title" />

    <div :class="styles.body">
      <!-- 記事本文 -->
      <HighlightBody :highlightedBody="highlightedBody" />
    </div>
  </BaseFixedPageLayout>
</template>
