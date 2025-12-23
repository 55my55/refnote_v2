import type { Meta, StoryObj } from '@storybook/vue3'
import SearchIcon from '@/components/common/icons/SearchIcon/index.vue'

const meta: Meta<typeof SearchIcon> = {
  title: 'Icons/SearchIcon',
  component: SearchIcon,
}

export default meta

type Story = StoryObj<typeof SearchIcon>

export const Default: Story = {}
