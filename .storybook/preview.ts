import '../src/styles/globals.scss'
import { setup } from '@storybook/vue3'
import type { Preview } from '@storybook/vue3'
import { createRouter, createWebHistory, RouterLink } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div />' } }],
})

router.replace({ path: '/', query: { page: '1' } })

setup((app) => {
  app.use(router)
  app.component('NuxtLink', RouterLink)
})

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fdfdfd' },
        { name: 'dark', value: '#111827' },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
