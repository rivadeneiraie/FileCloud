export interface FetchOptions extends RequestInit {
  baseUrl?: string;
}


import { useAuthStore } from "@/lib/store/authStore";
import { postRefreshToken } from "@/lib/services/AccountServices";

export async function fetchClient<T>(
  endpoint: string,
  options: FetchOptions = {},
  retry = true
): Promise<T> {
  let token: string | null = null;
  let refreshToken: string | null = null;
  try {
    const state = typeof window !== "undefined" ? useAuthStore.getState() : null;
    token = state?.token ?? null;
    refreshToken = state?.refreshToken ?? null;
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

  if (res.status === 401 && retry && refreshToken) {

    try {
      const refreshed = await postRefreshToken(refreshToken);
      useAuthStore.getState().setToken(refreshed.accessToken);
      useAuthStore.getState().setRefreshToken(refreshed.refreshToken);

      return fetchClient<T>(endpoint, options, false);

    } catch (refreshError) {

      throw new Error("No autorizado y no se pudo refrescar el token");
    }
  }

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Error ${res.status}: ${message}`);
  }

  if (res.status === 204) return {} as T;

  return res.json() as Promise<T>;
}