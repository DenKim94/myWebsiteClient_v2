import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';

/** Small globe icon used as the language-switcher affordance. */
function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    </svg>
  );
}

/**
 * Header language switcher — a dropdown that lets the user choose the content
 * language (German / English). The active language and its message catalogue
 * come from the {@link useI18n} context; switching re-fetches backend content
 * and re-renders all localized UI.
 */
export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        type="button"
        className="lang-switcher-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.language.label}
        onClick={() => setOpen((o) => !o)}
      >
        <GlobeIcon />
        <span className="lang-code">{lang.toUpperCase()}</span>
        <span className={'lang-caret' + (open ? ' open' : '')} aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul className="lang-menu" role="listbox" aria-label={t.language.label}>
          {SUPPORTED_LANGUAGES.map((code) => (
            <li key={code} role="option" aria-selected={code === lang}>
              <button
                type="button"
                className={'lang-option' + (code === lang ? ' active' : '')}
                onClick={() => {
                  setLang(code);
                  setOpen(false);
                }}
              >
                <span className="lang-option-code">{code.toUpperCase()}</span>
                {t.language.names[code]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
