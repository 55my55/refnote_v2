<script setup lang="ts">
import type { MetaHeadType } from '@/types/MetaHead'

type Props = {
  metaData: MetaHeadType
}

const props = defineProps<Props>()
</script>

<template>
  <Head>
    <!-- 基本 -->
    <title>{{ props.metaData.title }}</title>
    <meta property="og:title" :content="props.metaData.title" />
    <meta property="og:description" :content="props.metaData.description" />
    <meta name="keywords" :content="props.metaData.keyword" />

    <!-- OGP -->
    <meta property="og:type" content="blog" />
    <meta property="og:url" :content="props.metaData.url" />
    <meta property="og:image" :content="props.metaData.image" />
    <meta property="og:site_name" :content="props.metaData.title" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@YukiOnishi" />
    <meta name="twitter:url" :content="props.metaData.url" />
    <meta name="twitter:title" :content="props.metaData.title" />
    <meta name="twitter:description" :content="props.metaData.description" />
    <meta name="twitter:image" :content="props.metaData.image" />

    <!-- canonical -->
    <link rel="canonical" :href="props.metaData.url" />

    <!-- favicon -->
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    <link rel="shortcut icon" href="/favicon.ico" />

    <!-- Windows -->
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />
  </Head>
</template>
