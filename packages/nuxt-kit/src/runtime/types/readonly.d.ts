declare module '#lyonkit' {
  import { createLyonkitReadonlyApiClient as createLyonkitClient } from "@lyonkit/ts-client";

  export const lyonkitConfig: { apiKey: string, readOnly: boolean };
  export default function useLyonkit(): ReturnType<typeof createLyonkitClient>;
}
