declare module '#lyonkit' {
  import { createLyonkitWriteApiClient as createLyonkitClient } from "@lyonkit/ts-client";

  export const lyonkitConfig: { apiKey?: string, readOnly: boolean };
  export function useLyonkit(): ReturnType<typeof createLyonkitClient>;
}

declare module '#imports' {
  import { createLyonkitWriteApiClient as createLyonkitClient } from '@lyonkit/ts-client'

  export function useLyonkit(): ReturnType<typeof createLyonkitClient>
  export const lyonkitConfig: { apiKey?: string, readOnly: boolean };
}
