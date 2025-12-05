/**
 * axios初期設定
 * @package config
 */
import axios from 'axios'

// import.meta.env で環境変数を読む
const X_API_KEY: string =
  (import.meta.env.NUXT_MICROCMS_API_KEY as string | undefined) || ''

const globalAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': X_API_KEY,
  },
})

export default globalAxios
