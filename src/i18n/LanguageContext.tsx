import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  TRANSLATIONS,
  type Language,
  type Messages,
} from './translations';

/** localStorage key under which the chosen language is persisted. */
const STORAGE_KEY = 'portfolio.lang';

interface LanguageContextValue {
  /** Currently active language. */
  lang: Language;
  /** Switches the active language (and persists the choice). */
  setLang: (lang: Language) => void;
  /** Message catalogue for the active language. */
  t: Messages;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

/** Type guard for a supported {@link Language}. */
function isLanguage(value: unknown): value is Language {
  return SUPPORTED_LANGUAGES.includes(value as Language);
}

/**
 * Determines the initial language: a previously stored preference wins, then the
 * browser's preferred language, otherwise the default. Runs only in the browser.
 */
function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLanguage(stored)) return stored;

  const navLang = window.navigator.language?.slice(0, 2).toLowerCase();
  return isLanguage(navLang) ? navLang : DEFAULT_LANGUAGE;
}

/**
 * Provides the active language and its message catalogue to the component tree.
 * Persists the choice to localStorage and keeps the document's `lang` attribute
 * in sync for accessibility and correct hyphenation.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(detectInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((next: Language) => setLangState(next), []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: TRANSLATIONS[lang] }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/**
 * Hook to consume the language context.
 * @returns `{ lang, setLang, t }` for the active language.
 */
export function useI18n(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used within a LanguageProvider');
  return ctx;
}
