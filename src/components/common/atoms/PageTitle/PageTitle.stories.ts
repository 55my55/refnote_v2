import type { Meta, StoryObj } from '@storybook/vue3'
import PageTitle from './index.vue'

const meta: Meta<typeof PageTitle> = {
  title: 'Common/Atoms/PageTitle',
  component: PageTitle,
  args: {
    title: 'ページタイトル',
  },
}

export default meta
type Story = StoryObj<typeof PageTitle>

export const Default: Story = {}
