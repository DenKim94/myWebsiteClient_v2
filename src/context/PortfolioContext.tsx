import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchPortfolio } from '../api/apiClient';
import type { Portfolio } from '../types/portfolio';

interface PortfolioContextValue {
  portfolio: Portfolio | null;
  loading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

/**
 * Provides the portfolio data (loaded once from the backend) to the component
 * tree — the "Context/API-Layer" of the architecture.
 */
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchPortfolio(controller.signal)
      .then((data) => {
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
  }, []);

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
