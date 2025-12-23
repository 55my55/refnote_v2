import type { Meta, StoryObj } from '@storybook/vue3'
import InputForm from './index.vue'

const meta: Meta<typeof InputForm> = {
  title: 'Common/Atoms/InputForm',
  component: InputForm,
  args: {
    text: '',
    placeholder: '検索',
  },
  argTypes: {
    onChange: { action: 'change' },
    onKeyUp: { action: 'keyUp' },
    onClick: { action: 'click' },
  },
}

export default meta
type Story = StoryObj<typeof InputForm>

export const Default: Story = {}
