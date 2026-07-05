import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { LegalModal } from '../components/LegalModal';
import type { LegalKind } from '../content/legal';

interface LegalContextValue {
  /** Opens the given legal document (Impressum / Datenschutzerklärung). */
  open: (kind: LegalKind) => void;
}

const LegalContext = createContext<LegalContextValue | undefined>(undefined);

/**
 * Provides a single shared legal modal for the whole app. Any component can call
 * `useLegal().open('impressum' | 'datenschutz')` to display the corresponding
 * document without prop drilling.
 */
export function LegalProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<LegalKind | null>(null);
  const open = useCallback((next: LegalKind) => setKind(next), []);
  const close = useCallback(() => setKind(null), []);

  return (
    <LegalContext.Provider value={{ open }}>
      {children}
      <LegalModal kind={kind} onClose={close} />
    </LegalContext.Provider>
  );
}

/** Hook to open the shared legal modal. */
export function useLegal(): LegalContextValue {
  const ctx = useContext(LegalContext);
  if (!ctx) throw new Error('useLegal must be used within a LegalProvider');
  return ctx;
}
