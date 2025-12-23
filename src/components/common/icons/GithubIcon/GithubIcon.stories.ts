import type { Meta, StoryObj } from '@storybook/vue3'
import GithubIcon from './index.vue'

const meta: Meta<typeof GithubIcon> = {
  title: 'Common/Icons/GithubIcon',
  component: GithubIcon,
  args: {
    size: 24,
    color: '#423a57',
  },
}

export default meta
type Story = StoryObj<typeof GithubIcon>

export const Default: Story = {}
