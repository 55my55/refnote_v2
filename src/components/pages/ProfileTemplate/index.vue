<script setup lang="ts">
/**
 * pages/ProfileTemplate
 * @package Component
 */
import BasePostPageLayout from '@/components/layouts/BasePostPageLayout/index.vue'
import PageTitle from '@/components/common/atoms/PageTitle/index.vue'
import ShareButtons from '@/components/common/molecules/ShareButtons/index.vue'
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
        <NuxtImg
          :src="props.profile.articleImage.url"
          alt="プロフィール画像"
          width="700"
          height="400"
          format="webp"
          fit="cover"
          :quality="75"
          loading="lazy"
          sizes="(max-width: 800px) 100vw, 800px"
        />
        <ShareButtons :url="shareUrl" title="プロフィール" />
      </div>
      
      <main :class="styles.main">
        <HighlightBody :highlightedBody="props.highlightedBody" />
      </main>
    </section>
  </BasePostPageLayout>
</template>
