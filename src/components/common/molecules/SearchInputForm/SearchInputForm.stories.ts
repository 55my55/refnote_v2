import type { Meta, StoryObj } from '@storybook/vue3'
import SearchInputForm from './index.vue'

const meta: Meta<typeof SearchInputForm> = {
  title: 'Common/Molecules/SearchInputForm',
  component: SearchInputForm,
  args: {
    text: '',
    placeholder: '検索',
    size: 16,
  },
  argTypes: {
    onChange: { action: 'change' },
    onKeyUp: { action: 'keyUp' },
    onClick: { action: 'click' },
  },
}

export default meta
type Story = StoryObj<typeof SearchInputForm>

export const Default: Story = {}
