<script setup lang="ts">
/**
 * common/icons/XIcon
 * @package Component
 */
import xLogoSrc from '@/svgs/x.svg?url'

type XIconProps = {
  size?: number
}

const props = withDefaults(defineProps<XIconProps>(), {
  size: 24,
})
</script>

<template>
  <img :src="xLogoSrc" alt="" :width="props.size" :height="props.size" />
</template>
