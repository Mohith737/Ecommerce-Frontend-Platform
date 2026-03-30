export { createClient } from './client/client.gen';
export { createConfig, mergeHeaders } from './client/utils.gen';
export type {
  Client,
  ClientOptions,
  Config,
  Options,
  RequestOptions,
  RequestResult,
  ResolvedRequestOptions,
  ResponseStyle,
  TDataShape,
} from './client/types.gen';

const BASE_URL = 'https://ecom-api-956506160468.us-central1.run.app';
const MAX_RETRIES = 3;

function getToken(): string | null {
  return localStorage.getItem('access_token');
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  requiresAuth?: boolean;
}

function isRetryableStatus(status: number): boolean {
  return status === 500 || status === 502 || status === 503 || status === 504;
}

function delayForAttempt(attempt: number): Promise<void> {
  const base = 250;
  const waitMs = base * 2 ** attempt;
  return new Promise(resolve => window.setTimeout(resolve, waitMs));
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, requiresAuth = false } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (requiresAuth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });

      if (response.ok) {
        if (response.status === 204) {
          return undefined as T;
        }

        return (await response.json()) as T;
      }

      const canRetry = isRetryableStatus(response.status) && attempt < MAX_RETRIES;
      if (canRetry) {
        await delayForAttempt(attempt);
        continue;
      }

      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = (await response.json()) as { detail?: string };
        errorMessage = errorData?.detail ?? errorMessage;
      } catch {
        // Ignore JSON parse failures for non-JSON error bodies.
      }
      throw new Error(errorMessage);
    } catch (error) {
      const isNetworkError = error instanceof TypeError;
      const canRetry = isNetworkError && attempt < MAX_RETRIES;
      if (canRetry) {
        await delayForAttempt(attempt);
        continue;
      }
      throw error;
    }
  }

  throw new Error('Request failed after retries');
}
