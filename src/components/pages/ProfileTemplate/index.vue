<script setup lang="ts">
/**
 * pages/ProfileTemplate
 * @package Component
 */
import BasePostPageLayout from '@/components/layouts/BasePostPageLayout/index.vue'
import SnsShareBar from '@/components/common/molecules/SnsShareBar/index.vue'
import PageTitle from '@/components/common/atoms/PageTitle/index.vue'
import SnsShareArea from '@/components/common/molecules/SnsShareArea/index.vue'
import HighlightBody from '@/components/common/molecules/HighlightBody/index.vue'
import { useMetaData } from '@/composables/useMetaData'
import { useShareUrl } from '@/composables/useShareUrl'
import type { ProfileType } from '@/types/Profile'
/* styles */
import styles from './styles.module.scss'

interface Props {
  profile: ProfileType
  highlightedBody: string
}

const props = defineProps<Props>()

const { metaData } = useMetaData({
  title: 'プロフィール',
  description: props.profile.description,
})

const { shareUrl } = useShareUrl()
</script>

<template>
  <BasePostPageLayout :metaData="metaData" breadName="プロフィール">
    <!-- ページタイトル -->
    <PageTitle title="プロフィール" />

    <section :class="styles.container">
      <div :class="styles.image">
        <!-- 画像最適化版 -->
        <NuxtImg
          :src="props.profile.articleImage.url"
          alt="プロフィール画像"
          width="800"
          height="450"
          format="webp"
          fit="cover"
          loading="lazy"
        />
      </div>

      <main :class="styles.main">
        <div :class="styles.leftBar">
          <!-- SNSシェアボタン -->
          <SnsShareBar title="プロフィール" :shareUrl="shareUrl" />
        </div>

        <div :class="styles.rightBar">
          <!-- 記事本文 -->
          <HighlightBody :highlightedBody="props.highlightedBody" />

          <!-- SNSシェアボタン -->
          <div :class="styles.shareArea">
            <SnsShareArea title="プロフィール" :shareUrl="shareUrl" />
          </div>
        </div>
      </main>
    </section>
  </BasePostPageLayout>
</template>
