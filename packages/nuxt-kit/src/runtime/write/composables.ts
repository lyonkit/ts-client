import type { createLyonkitWriteApiClient } from '@lyonkit/ts-client'
import { useNuxtApp } from '#imports'

export function useLyonkit(): ReturnType<typeof createLyonkitWriteApiClient> {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$lyonkit
}

