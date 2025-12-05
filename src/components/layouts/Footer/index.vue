<script setup lang="ts">
import { NAVIGATION_LINK } from '@/constants/navigation'
</script>

<template>
  <div class="container">
    <ul class="lists">
      <NuxtLink :to="NAVIGATION_LINK.TOP">
        <li class="list">HOME</li>
      </NuxtLink>

      <li class="after">|</li>

      <NuxtLink :to="NAVIGATION_LINK.POLICY">
        <li class="list">プライバシーポリシー</li>
      </NuxtLink>

      <li class="after">|</li>

      <NuxtLink :to="NAVIGATION_LINK.TERM">
        <li class="list">免責事項</li>
      </NuxtLink>
    </ul>

    <p class="copy">
      © <span>2021 NOCHITOKU.</span>
    </p>
  </div>
</template>
