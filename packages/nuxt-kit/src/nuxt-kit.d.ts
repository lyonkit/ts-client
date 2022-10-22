declare module '#imports' {
  interface NuxtApp {
    $lyonkit: any
  }

  interface NuxtRuntimeConfig {
    lyonkitApiKey?: string
    public?: {
      lyonkitApiKey?: string
    }
  }

  function useNuxtApp(): NuxtApp

  function defineNuxtPlugin(fn: () => any): any

  function useRuntimeConfig(): NuxtRuntimeConfig
}
