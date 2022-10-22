import { createLyonkitReadonlyApiClient } from '@lyonkit/ts-client'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
// @ts-expect-error Untyped virtual import
import { apiKey as cfgApiKey } from '#lyonkit-options'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const apiKey = cfgApiKey ?? config.public?.lyonkitApiKey ?? config.lyonkitApiKey ?? ''
  const lyonkit = createLyonkitReadonlyApiClient({ apiKey })

  return {
    provide: {
      lyonkit,
    },
  }
})
