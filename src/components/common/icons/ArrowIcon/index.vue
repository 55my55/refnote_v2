<script setup lang="ts">
/**
 * common/icons/ArrowIcon
 * @package Component
 */

type ArrowIconProps = {
  size?: number
  color?: string
}

const props = withDefaults(defineProps<ArrowIconProps>(), {
  size: 24,
  color: '#423a57',
})
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.59 15.4099L12 10.8299L7.41 15.4099L6 13.9999L12 7.99991L18 13.9999L16.59 15.4099Z"
      :fill="props.color"
    />
  </svg>
</template>
