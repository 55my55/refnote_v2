import type { Meta, StoryObj } from '@storybook/vue3'
import ClockIcon from './index.vue'

const meta: Meta<typeof ClockIcon> = {
  title: 'Common/Icons/ClockIcon',
  component: ClockIcon,
  args: {
    size: 16,
    color: '#423a57',
  },
}

export default meta
type Story = StoryObj<typeof ClockIcon>

export const Default: Story = {}
