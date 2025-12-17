<script setup lang="ts">
import CategoryProvider from '@/providers/CategoryProvider.vue'
import ProfileProvider from '@/providers/ProfileProvider.vue'
import ArchiveProvider from '@/providers/ArchiveProvider.vue'
import BlogProvider from '@/providers/BlogProvider.vue'
</script>

<template>
  <CategoryProvider>
    <ProfileProvider>
      <ArchiveProvider>
        <BlogProvider>
          <slot />
        </BlogProvider>
      </ArchiveProvider>
    </ProfileProvider>
  </CategoryProvider>
</template>
