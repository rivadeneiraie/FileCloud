export interface FetchOptions extends RequestInit {
  baseUrl?: string;
}

import { useAuthStore } from "@/lib/store/authStore";

export async function fetchClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {

  let token: string | null = null;
  try {
    token = typeof window !== "undefined" ? useAuthStore.getState().token : null;
  } catch {}

  const { baseUrl = process.env.NEXT_PUBLIC_API_URL, headers, ...rest } = options;
  const mergedHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };
  if (token) {
    (mergedHeaders as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${endpoint}`, {
    headers: mergedHeaders,
    ...rest,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Error ${res.status}: ${message}`);
  }

  if (res.status === 204) return {} as T;

  return res.json() as Promise<T>;
}