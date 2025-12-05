<script setup lang="ts">
/**
 * common/molecules/DateArea
 * @package Component
 */

/* components */
import ClockIcon from '@/components/common/icons/ClockIcon/index.vue'

/* composables */
import { useDate } from '~/composables/useDate'

/* styles */
import styles from './styles.module.scss'

/**
 * props
 */
interface Props {
  date: string
  size?: number
}

const props = defineProps<Props>()

/* composable */
const { showYearMonthDate } = useDate({ date: props.date })
</script>

<template>
  <div :class="styles.container">
    <div :class="styles.icon">
      <ClockIcon :size="props.size" />
    </div>

    <p :class="styles.date">
      {{ showYearMonthDate }}
    </p>
  </div>
</template>
