import type { Meta, StoryObj } from '@storybook/vue3'
import Pagination from './index.vue'

const meta: Meta<typeof Pagination> = {
  title: 'Common/Molecules/Pagination',
  component: Pagination,
  args: {
    totalCount: 50,
    link: '/page/',
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {}
