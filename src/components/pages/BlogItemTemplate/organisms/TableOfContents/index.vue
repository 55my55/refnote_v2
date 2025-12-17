<!-- src/components/pages/BlogItemTemplate/organisms/TableOfContents/index.vue -->
<script setup lang="ts">
import type { TableOfContentType } from '@/types/Blog'

const { tableOfContents } = defineProps<{
  tableOfContents: TableOfContentType[]
}>()

const scrollToHeading = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return

  const headerOffset = 140
  const rect = el.getBoundingClientRect()
  const top = window.scrollY + rect.top - headerOffset

  window.scrollTo({
    top,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div v-if="tableOfContents.length > 0" :class="$style.container" id="create-table-of-contents">
    <h4>目次</h4>
    <ul :class="$style.lists" id="lists">
      <li
        v-for="toc in tableOfContents"
        :key="toc.id"
        :id="`list ${toc.name}`"
        :class="toc.name === 'h2' ? $style['list__h2'] : $style['list__h1']"
      >
        <a href="#" @click.prevent="scrollToHeading(toc.id)">
          {{ toc.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style module src="./styles.module.scss" lang="scss" />
