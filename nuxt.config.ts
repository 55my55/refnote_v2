import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  srcDir: 'src',
  compatibilityDate: '2025-11-14',

  runtimeConfig: {
    // サーバーサイド専用
    microcmsServiceDomain: process.env.NUXT_MICROCMS_SERVICE_DOMAIN || '',
    microcmsApiKey: process.env.NUXT_MICROCMS_API_KEY || '',

    // クライアントから参照可
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'refnote',
    },
  },

  typescript: {
    strict: true,
  },

  vite: {
    resolve: {
      alias: {

        // SCSS 変数・mixin 用エイリアス
        '@variable': fileURLToPath(
          new URL('./src/styles/variable.scss', import.meta.url)
        ),
      },
    },
  },

  modules: ['@nuxt/image'],

    image: {
    domains: ['images.microcms-assets.io'],
  },
})