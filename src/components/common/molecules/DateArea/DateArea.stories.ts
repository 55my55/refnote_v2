import type { Meta, StoryObj } from '@storybook/vue3'
import DateArea from './index.vue'

const meta: Meta<typeof DateArea> = {
  title: 'Common/Molecules/DateArea',
  component: DateArea,
  args: {
    date: '2024-01-01',
    size: 14,
  },
}

export default meta
type Story = StoryObj<typeof DateArea>

export const Default: Story = {}
