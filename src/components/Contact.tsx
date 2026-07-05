import { useState } from 'react';
import { Button, Card, Checkbox, Input, Textarea } from '../ds';
import { Captcha } from './Captcha';
import { postContact } from '../api/apiClient';
import { useI18n } from '../i18n/LanguageContext';
import { icons } from '../assets/icons';

type Status = 'idle' | 'sending' | 'success' | 'error';

/** CONTACT section — form wired to the backend e-mail service with captcha. */
export function Contact() {
  const { lang, t } = useI18n();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const canSend =
    name.trim() !== '' &&
    emailValid &&
    message.trim() !== '' &&
    agreed &&
    captchaToken !== null &&
    status !== 'sending';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend || !captchaToken) return;
    setStatus('sending');
    try {
      const res = await postContact({ name, email, message, captchaToken, lang });
      setStatus('success');
      setFeedback(res.message);
      setName('');
      setEmail('');
      setMessage('');
      setAgreed(false);
      setCaptchaToken(null);
      window.setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setFeedback(err instanceof Error ? err.message : t.contact.errorFallback);
    }
  }

  return (
    <section
      id="contact"
      data-screen-label="Kontakt"
      style={{
        minHeight: 'calc(100vh - var(--header-height))',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'var(--space-20) var(--space-10) var(--space-16)',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'var(--text-2xl)',
            margin: '0 0 var(--space-3)',
            color: 'var(--text-primary)',
            fontWeight: 'var(--fw-bold)' as unknown as number,
          }}
        >
          {t.contact.title}
        </h2>

        <Card>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <p
              style={{
                margin: '0 0 var(--space-2)',
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              {t.contact.intro}
            </p>
            <Input label={t.contact.name} placeholder={t.contact.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} />
            <Input
              label={t.contact.email}
              type="email"
              placeholder={t.contact.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Textarea
              label={t.contact.message}
              rows={4}
              placeholder={t.contact.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Checkbox checked={agreed} onChange={setAgreed} label={t.contact.consent} />
            <Captcha onVerify={setCaptchaToken} />
            {status === 'error' && (
              <span style={{ color: 'var(--danger)', fontSize: 'var(--text-sm)' }}>{feedback}</span>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-2)' }}>
              <Button
                type="submit"
                variant="solid"
                size="lg"
                disabled={!canSend}
                iconRight={
                  <img src={icons.send} width={16} height={16} alt="" aria-hidden="true" style={{ display: 'block' }} />
                }
              >
                {status === 'sending' ? t.contact.sending : t.contact.send}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {status === 'success' && (
        <div
          role="status"
          style={{
            position: 'fixed',
            left: '50%',
            bottom: 'var(--space-12)',
            transform: 'translateX(-50%)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            padding: 'var(--space-3) var(--space-6)',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--ink-850)',
            border: '1px solid var(--border-glass)',
            boxShadow: 'var(--shadow-lg), var(--glow-brand)',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-sm)',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
          {feedback || t.contact.successToast}
        </div>
      )}
    </section>
  );
}
