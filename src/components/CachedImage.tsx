import { useEffect, useState, type CSSProperties } from 'react';
import { getCachedImage } from '../api/imageCache';
import { usePortfolio } from '../context/PortfolioContext';

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
  const { portfolio } = usePortfolio();
  // Content-version token for this image (once the portfolio has loaded). Used as
  // a `?v=` cache-buster so a replaced image is re-fetched despite immutable HTTP
  // caching. May be undefined on the first render (portfolio still loading).
  const version = portfolio?.imageVersions?.[name];

  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  // Reset the visible image only when the underlying image (name) changes — not
  // when the version arrives — so the image doesn't flash back to the fallback
  // box while the freshly versioned URL loads.
  useEffect(() => {
    setSrc(null);
    setFailed(false);
  }, [name]);

  useEffect(() => {
    let cancelled = false;
    getCachedImage(name, version)
      .then((url) => {
        if (!cancelled) setSrc(url);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [name, version]);

  if (failed || !src) {
    // Reserve the layout box; keeps the design stable while loading.
    return <span aria-hidden className={className} style={{ ...style, ...fallback }} />;
  }

  return <img src={src} alt={alt} className={className} style={style} />;
}
