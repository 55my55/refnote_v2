/**
 * 超軽量なメモリキャッシュ（Nitro サーバー常駐時のみ有効）
 * h3 にキャッシュヘルパーが無い環境向けの代替
 */

type CacheEntry<T> = {
  value: T
  expires: number
}

const cacheStore = new Map<string, CacheEntry<unknown>>()

export const getCache = <T>(key: string): T | null => {
  const entry = cacheStore.get(key)
  if (!entry) return null
  if (Date.now() > entry.expires) {
    cacheStore.delete(key)
    return null
  }
  return entry.value as T
}

export const setCache = <T>(key: string, value: T, ttlMs: number) => {
  cacheStore.set(key, { value, expires: Date.now() + ttlMs })
}
