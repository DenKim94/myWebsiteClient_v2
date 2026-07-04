import { useEffect, useState, type CSSProperties } from 'react';
import { getCachedImage } from '../api/imageCache';

interface CachedImageProps {
  /** Backend image file name (as referenced by the database). */
  name: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** Optional element rendered while the image is loading or on error. */
  fallback?: CSSProperties;
}

/**
 * Renders a backend-served image through the client-side image cache. The
 * binary is fetched from `/api/images/:name` once and reused across renders.
 */
export function CachedImage({ name, alt, className, style, fallback }: CachedImageProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setSrc(null);
    setFailed(false);
    getCachedImage(name)
      .then((url) => {
        if (!cancelled) setSrc(url);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [name]);

  if (failed || !src) {
    // Reserve the layout box; keeps the design stable while loading.
    return <span aria-hidden className={className} style={{ ...style, ...fallback }} />;
  }

  return <img src={src} alt={alt} className={className} style={style} />;
}
