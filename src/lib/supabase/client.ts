import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // During SSR/build, env vars may be empty or placeholders.
  // Return a throwaway (non-cached) dummy client so builds don't crash.
  // IMPORTANT: Do NOT cache this — once real env vars load on the client,
  // the next call must create and cache the real client.
  if (!url || !key || !url.startsWith("http")) {
    return createBrowserClient(
      "https://placeholder.supabase.co",
      "placeholder-key"
    );
  }

  client = createBrowserClient(url, key);
  return client;
}
