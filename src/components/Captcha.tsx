import { useEffect, useState } from 'react';
import { Checkbox } from '../ds';

interface CaptchaProps {
  /** Called with a verification token, or `null` when not (yet) verified. */
  onVerify: (token: string | null) => void;
}

/** Public captcha site key; when empty the development placeholder is used. */
const SITE_KEY: string = import.meta.env.VITE_CAPTCHA_SITE_KEY ?? '';

/**
 * Bot protection for the contact form. A provider widget (reCAPTCHA / hCaptcha)
 * can be dropped in when `VITE_CAPTCHA_SITE_KEY` is configured; for local
 * development a lightweight challenge (checkbox + honeypot) is used. The
 * resulting token is verified server-side before an e-mail is sent.
 */
export function Captcha({ onVerify }: CaptchaProps) {
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        padding: 'var(--space-3) var(--space-4)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-glass)',
        background: 'rgba(255,255,255,0.04)',
      }}
    >
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
      <Checkbox checked={checked} onChange={setChecked} label="Ich bin kein Roboter." />
      {SITE_KEY === '' && (
        <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>
          Entwicklungsmodus: Platzhalter-Captcha. Für die Produktion einen Anbieter
          (reCAPTCHA/hCaptcha) via VITE_CAPTCHA_SITE_KEY einbinden.
        </span>
      )}
    </div>
  );
}
