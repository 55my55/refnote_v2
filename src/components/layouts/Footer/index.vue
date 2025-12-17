<script setup lang="ts">
import { NAVIGATION_LINK } from '@/constants/navigation'
</script>

<template>
  <div :class="$style.container">
    <ul :class="$style.lists">
      <NuxtLink :to="NAVIGATION_LINK.TOP">
        <li :class="$style.list">HOME</li>
      </NuxtLink>

      <li :class="$style.after">|</li>

      <NuxtLink :to="NAVIGATION_LINK.POLICY">
        <li :class="$style.list">プライバシーポリシー</li>
      </NuxtLink>

      <li :class="$style.after">|</li>

      <NuxtLink :to="NAVIGATION_LINK.TERM">
        <li :class="$style.list">免責事項</li>
      </NuxtLink>
    </ul>

    <p :class="$style.copy">© <span>2021 refnote.</span></p>
  </div>
</template>

<style module lang="scss" src="./styles.module.scss" />
