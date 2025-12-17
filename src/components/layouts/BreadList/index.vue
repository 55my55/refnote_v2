<script setup lang="ts">
import styles from './styles.module.scss'

interface Props {
  breadName: string
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="styles.bread">
    <ul :class="styles.bread__list">
      <li :class="styles.bread__item">
        <NuxtLink to="/">
          <span :class="styles.bread__link">HOME</span>
        </NuxtLink>
      </li>

      <li :class="styles.breadName">
        {{ props.breadName }}
      </li>
    </ul>
  </div>
</template>
