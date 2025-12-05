<script setup lang="ts">
/**
 * common/molecules/HighlightBody
 * @package Component
 */

import 'highlight.js/styles/shades-of-purple.css'

/* styles */
import styles from './styles.module.scss'

interface Props {
  highlightedBody: string
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="styles.contents"
    v-html="props.highlightedBody"
  ></div>
</template>
