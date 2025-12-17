/**
 * axios初期設定
 * @package config
 */
import axios from 'axios'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

const globalAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': config.microcmsApiKey,
  },
})

export default globalAxios
