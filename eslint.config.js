import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import vue from 'eslint-plugin-vue'
import vueTs from '@vue/eslint-config-typescript'

export default [
  {
    ignores: ['node_modules', '.nuxt', '.output', 'dist'],
  },
  js.configs.recommended,
  ...vueTs(),
  {
    plugins: { vue },
    rules: {
      'vue/multi-word-component-names': 'off',
      // 今後厳格化
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  prettier,
]
