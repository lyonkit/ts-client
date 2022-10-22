import type { createLyonkitReadonlyApiClient } from '@lyonkit/ts-client'
import { useNuxtApp } from '#imports'

export function useLyonkit(): ReturnType<typeof createLyonkitReadonlyApiClient> {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$lyonkit
}

