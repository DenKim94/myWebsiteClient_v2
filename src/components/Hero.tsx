import { Button, Card } from '../ds';
import { CachedImage } from './CachedImage';
import { useTypewriter } from '../hooks/useTypewriter';
import { useI18n } from '../i18n/LanguageContext';
import { PORTRAIT_IMAGE_NAME } from '../constants';

/** Scrolls smoothly to a section by id. */
function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** HERO / START section — greeting with typewriter animation and portrait. */
export function Hero() {
  const { t } = useI18n();
  const word = useTypewriter(t.hero.words);

  return (
    <section
      id="start"
      data-screen-label="Start"
      style={{
        minHeight: 'calc(100vh - var(--header-height))',
        display: 'flex',
        alignItems: 'flex-start',
        padding: 'var(--space-20) var(--space-10) var(--space-16)',
      }}
    >
      <div
        className="hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
          gap: 'var(--space-16)',
          alignItems: 'center',
          maxWidth: 'var(--section-max-width)',
          /* Nur horizontal zentrieren; der vertikale Desktop-Offset (~15% nach
             unten) wird in landing.css via `margin-top` gesetzt. */
          marginInline: 'auto',
          width: '100%',
        }}
      >
        {/* Left — copy */}
        <div className="hero-copy" style={{ textAlign: 'left' }}>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              letterSpacing: 'var(--tracking-caps)',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-5)',
            }}
          >
            {t.hero.eyebrow}
          </div>

          <h1
            style={{
              fontSize: 'clamp(26px, 6.5vw, 50px)',
              lineHeight: 1.08,
              margin: '0 0 var(--space-6)',
              fontWeight: 'var(--fw-bold)' as unknown as number,
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--text-primary)',
            }}
          >
            {t.hero.greeting}
            <span className="type-line">
              <span className="type-word">{word}</span>
              <span className="type-caret" aria-hidden="true" />
            </span>
          </h1>

          <div style={{ maxWidth: 560, marginBottom: 'var(--space-8)' }}>
            <Card>
              <p
                style={{
                  margin: 0,
                  fontSize: 'var(--text-base)',
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--text-secondary)',
                  textAlign: 'left',
                }}
              >
                {t.hero.welcome}
              </p>
            </Card>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" onClick={() => scrollToId('portfolio')}>
              {t.hero.ctaProjects}
            </Button>
            <Button variant="primary" size="lg" onClick={() => scrollToId('contact')}>
              {t.hero.ctaContact}
            </Button>
          </div>
        </div>

        {/* Right — single portrait */}
        <div className="hero-portrait-wrap" style={{ display: 'flex', justifyContent: 'center' }}>
          <figure className="portrait">
            <div className="portrait-glow" aria-hidden="true" />
            <CachedImage name={PORTRAIT_IMAGE_NAME} alt="Porträt von Denis Kim" />
          </figure>
        </div>
      </div>
    </section>
  );
}
