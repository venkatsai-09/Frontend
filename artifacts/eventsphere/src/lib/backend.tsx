import { useEffect, useState, useCallback } from "react";

export async function fetchJson<T = any>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || res.statusText || String(res.status));
  }
  return res.json();
}

export function useFetch<T = any>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    if (!url) return;
    setIsLoading(true);
    setError(null);
    try {
      const json = await fetchJson<T>(url);
      setData(json);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, isLoading, error, refresh: load } as const;
}
