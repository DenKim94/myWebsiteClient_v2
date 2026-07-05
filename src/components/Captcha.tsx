import { useEffect, useRef, useState } from 'react';
import { Checkbox } from '../ds';
import { useI18n } from '../i18n/LanguageContext';

interface CaptchaProps {
  /** Called with a verification token, or `null` when not (yet) verified. */
  onVerify: (token: string | null) => void;
}

/** Public captcha site key; when empty the development placeholder is used. */
const SITE_KEY: string = import.meta.env.VITE_CAPTCHA_SITE_KEY ?? '';

/** Minimal typing of the parts of the Google reCAPTCHA API that we use. */
interface GReCaptcha {
  render: (
    container: HTMLElement,
    parameters: {
      sitekey: string;
      theme?: 'light' | 'dark';
      size?: 'normal' | 'compact';
      callback?: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
    },
  ) => number;
  reset: (widgetId?: number) => void;
}

declare global {
  interface Window {
    grecaptcha?: GReCaptcha;
  }
}

/** Singleton promise that resolves once the reCAPTCHA API script is ready. */
let recaptchaLoader: Promise<GReCaptcha> | null = null;

/**
 * Loads the Google reCAPTCHA v2 API script once and resolves with the global
 * `grecaptcha` object as soon as its explicit-render API is available.
 * @returns Promise resolving to the ready `grecaptcha` object.
 */
function loadRecaptcha(): Promise<GReCaptcha> {
  if (recaptchaLoader) return recaptchaLoader;

  recaptchaLoader = new Promise<GReCaptcha>((resolve, reject) => {
    if (window.grecaptcha?.render) {
      resolve(window.grecaptcha);
      return;
    }

    const callbackName = '__onRecaptchaApiLoad';
    (window as unknown as Record<string, () => void>)[callbackName] = () => {
      if (window.grecaptcha) resolve(window.grecaptcha);
      else reject(new Error('reCAPTCHA API loaded without grecaptcha global.'));
    };

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA API script.'));
    document.head.appendChild(script);
  });

  return recaptchaLoader;
}

/**
 * Real Google reCAPTCHA v2 ("I'm not a robot") widget. Renders the provider
 * challenge and forwards the resulting token to the parent; the token is
 * verified server-side (`CAPTCHA_PROVIDER=recaptcha`) before an e-mail is sent.
 */
function RecaptchaWidget({ siteKey, onVerify }: { siteKey: string; onVerify: CaptchaProps['onVerify'] }) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadRecaptcha()
      .then((grecaptcha) => {
        const container = containerRef.current;
        // Guard against React 19 StrictMode double-mount (render only once).
        if (cancelled || !container || container.childElementCount > 0) return;
        grecaptcha.render(container, {
          sitekey: siteKey,
          theme: 'dark',
          callback: (token: string) => onVerify(token),
          'expired-callback': () => onVerify(null),
          'error-callback': () => {
            onVerify(null);
            setFailed(true);
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [siteKey, onVerify]);

  return (
    <div className="captcha-box">
      <div ref={containerRef} className="captcha-recaptcha" />
      {failed && (
        <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--danger)' }}>{t.captcha.loadError}</span>
      )}
    </div>
  );
}

/**
 * Development placeholder used when no `VITE_CAPTCHA_SITE_KEY` is configured:
 * a lightweight challenge (checkbox + honeypot) that produces a dev token.
 */
function PlaceholderCaptcha({ onVerify }: CaptchaProps) {
  const { t } = useI18n();
  const [checked, setChecked] = useState(false);
  // Honeypot: real users never see or fill this; bots typically do.
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (checked && honeypot.trim() === '') {
      onVerify(`dev-verified-${Date.now()}`);
    } else {
      onVerify(null);
    }
  }, [checked, honeypot, onVerify]);

  return (
    <div className="captcha-box">
      {/* Honeypot field (visually hidden, not announced to users) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      <Checkbox checked={checked} onChange={setChecked} label={t.captcha.label} />
      <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{t.captcha.devHint}</span>
    </div>
  );
}

/**
 * Bot protection for the contact form. Uses the real Google reCAPTCHA v2 widget
 * when `VITE_CAPTCHA_SITE_KEY` is configured, otherwise a local development
 * placeholder. The resulting token is verified server-side before an e-mail is
 * sent.
 */
export function Captcha({ onVerify }: CaptchaProps) {
  return SITE_KEY ? (
    <RecaptchaWidget siteKey={SITE_KEY} onVerify={onVerify} />
  ) : (
    <PlaceholderCaptcha onVerify={onVerify} />
  );
}
