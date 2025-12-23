import type { Meta, StoryObj } from '@storybook/vue3'
import FacebookShareButton from './index.vue'

const meta: Meta<typeof FacebookShareButton> = {
  title: 'Common/Atoms/FacebookShareButton',
  component: FacebookShareButton,
  args: {
    shareUrl: 'https://example.com',
    size: 40,
    radius: 10,
  },
  decorators: [
    () => ({
      template:
        '<div style="background:#111827; padding:16px; display:inline-block;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof FacebookShareButton>

export const Default: Story = {}
