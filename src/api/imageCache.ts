import { imageUrl } from './apiClient';

/**
 * In-memory cache of backend images. Fetched binaries are stored as object URLs
 * and de-duplicated by file name, so an image is downloaded from the backend at
 * most once per session — fulfilling the requirement to cache backend images to
 * optimize runtime performance. HTTP-level caching (long-lived Cache-Control
 * headers from the server) provides a second, persistent layer.
 */
const cache = new Map<string, Promise<string>>();

/**
 * Returns a (cached) object URL for a backend image. Concurrent requests for the
 * same image share a single fetch.
 * @param name File name of the image (as referenced by the database).
 */
export function getCachedImage(name: string): Promise<string> {
  const existing = cache.get(name);
  if (existing) return existing;

  const promise = fetch(imageUrl(name))
    .then((response) => {
      if (!response.ok) throw new Error(`Image "${name}" failed to load (HTTP ${response.status})`);
      return response.blob();
    })
    .then((blob) => URL.createObjectURL(blob))
    .catch((error: unknown) => {
      // Remove the failed entry so a later attempt can retry.
      cache.delete(name);
      throw error;
    });

  cache.set(name, promise);
  return promise;
}

/** Clears the image cache and revokes object URLs (e.g. for tests). */
export async function clearImageCache(): Promise<void> {
  for (const promise of cache.values()) {
    try {
      const url = await promise;
      URL.revokeObjectURL(url);
    } catch {
      /* ignore */
    }
  }
  cache.clear();
}
