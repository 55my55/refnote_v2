import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config) {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': resolve(__dirname, '../src'),
      '~': resolve(__dirname, '../src'),
      '@variable': resolve(__dirname, '../src/styles/variable.scss'),
    }
    config.define = {
      ...(config.define || {}),
      'process.env': {},
    }
    config.css = config.css || {}
    config.css.preprocessorOptions = {
      ...(config.css.preprocessorOptions || {}),
      scss: {
        ...(config.css.preprocessorOptions?.scss || {}),
        // keep for future global SCSS settings
      },
    }
    config.plugins = [...(config.plugins || []), vue()]
    return config
  },
}

export default config
