import type { Meta, StoryObj } from '@storybook/vue3'
import FaceBookIcon from './index.vue'

const meta: Meta<typeof FaceBookIcon> = {
  title: 'Common/Icons/FaceBookIcon',
  component: FaceBookIcon,
  args: {
    size: 24,
    color: '#423a57',
  },
}

export default meta
type Story = StoryObj<typeof FaceBookIcon>

export const Default: Story = {}
