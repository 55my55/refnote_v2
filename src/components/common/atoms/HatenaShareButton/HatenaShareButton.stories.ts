import type { Meta, StoryObj } from '@storybook/vue3'
import HatenaShareButton from './index.vue'

const meta: Meta<typeof HatenaShareButton> = {
  title: 'Common/Atoms/HatenaShareButton',
  component: HatenaShareButton,
  args: {
    shareUrl: 'https://example.com',
    size: 40,
    radius: 10,
  },
}

export default meta
type Story = StoryObj<typeof HatenaShareButton>

export const Default: Story = {}
