// server/api/microcms/profile.get.ts
import { defineEventHandler, createError } from 'h3'
import type { ProfileType } from '@/types/Profile'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const url = `https://${config.microcmsServiceDomain}.microcms.io/api/v1/profile`

  try {
    const data = await $fetch<ProfileType>(url, {
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
    })

    return { profile: data }
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch profile from microCMS',
    })
  }
})
