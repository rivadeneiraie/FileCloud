export interface FetchOptions extends RequestInit {
  baseUrl?: string;
}

export async function fetchClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { baseUrl = process.env.NEXT_PUBLIC_API_URL, headers, ...rest } = options;

  const res = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Error ${res.status}: ${message}`);
  }

  if (res.status === 204) return {} as T;

  return res.json() as Promise<T>;
}