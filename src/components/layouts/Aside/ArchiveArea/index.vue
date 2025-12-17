<script setup lang="ts">
/**
 * layouts/Aside/ArchiveArea
 * アーカイブ一覧エリア
 */

import { computed } from 'vue'
import { useState } from '#app'
import styles from './styles.module.scss'

import BasicAsidePartsArea from '@/components/layouts/Aside/BasicAsidePartsArea/index.vue'
import type { ArchiveType } from '@/types/Archive'

/**
 * グローバル state のアーカイブ一覧
 */
const archiveListState = useState<ArchiveType[]>('archiveList')

/**
 * null 安全に補正
 */
const archiveList = computed(() => archiveListState.value ?? [])

/**
 * 奇数・偶数でクラスを切り替えるユーティリティ
 */
const getRowClass = (index: number) => (index % 2 === 0 ? styles.archive : styles.archive_even)
</script>

<template>
  <BasicAsidePartsArea title="アーカイブ">
    <ul :class="styles.container">
      <li v-for="(archive, i) in archiveList" :key="`${archive.originDate}_${i}`">
        <NuxtLink :to="`/archive/${archive.linkDate}/page/1`">
          <div :class="getRowClass(i)">
            <span>&gt;&nbsp;&nbsp;{{ archive.showDate }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </BasicAsidePartsArea>
</template>
