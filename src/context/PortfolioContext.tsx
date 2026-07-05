import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { fetchPortfolio } from '../api/apiClient';
import { useI18n } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';
import type { Portfolio } from '../types/portfolio';

interface PortfolioContextValue {
  portfolio: Portfolio | null;
  loading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

/**
 * Provides the portfolio data (loaded from the backend for the active language)
 * to the component tree — the "Context/API-Layer" of the architecture. When the
 * language changes the data is re-fetched; already loaded languages are served
 * from an in-memory cache to avoid redundant round-trips.
 */
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { lang } = useI18n();
  const cache = useRef<Map<Language, Portfolio>>(new Map());
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = cache.current.get(lang);
    if (cached) {
      setPortfolio(cached);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    fetchPortfolio(lang, controller.signal)
      .then((data) => {
        cache.current.set(lang, data);
        setPortfolio(data);
        setError(null);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [lang]);

  return (
    <PortfolioContext.Provider value={{ portfolio, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
}

/** Hook to consume the portfolio context. */
export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return ctx;
}
