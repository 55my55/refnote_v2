export default defineNuxtConfig({
  srcDir: 'src',

  compatibilityDate: '2025-11-14',

  runtimeConfig: {
    // サーバーサイド専用（useRuntimeConfig().microcmsServiceDomain で取る）
    microcmsServiceDomain: process.env.NUXT_MICROCMS_SERVICE_DOMAIN || 'refnote',
    microcmsApiKey: process.env.NUXT_MICROCMS_API_KEY || '',

    // クライアントから参照してよい値
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'refnote',
    },
  },

  typescript: {
    strict: true,
  },
})
