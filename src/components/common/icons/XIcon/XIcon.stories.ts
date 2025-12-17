import type { Meta, StoryObj } from '@storybook/vue3'
import XIcon from './index.vue'

const meta: Meta<typeof XIcon> = {
  title: 'Common/Icons/XIcon',
  component: XIcon,
  args: {
    size: 24,
  },
}

export default meta
type Story = StoryObj<typeof XIcon>

export const Default: Story = {}
