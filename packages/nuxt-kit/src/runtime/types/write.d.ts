declare module '#lyonkit' {
  import { createLyonkitWriteApiClient as createLyonkitClient } from "@lyonkit/ts-client";

  export const lyonkitConfig: { apiKey?: string, readOnly: boolean };
  export function useLyonkit(): ReturnType<typeof createLyonkitClient>;
}
