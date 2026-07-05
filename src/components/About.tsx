import { useState } from 'react';
import { Card, Tabs, type TabItem } from '../ds';
import { CachedImage } from './CachedImage';
import { usePortfolio } from '../context/PortfolioContext';
import { useI18n } from '../i18n/LanguageContext';
import type { Messages } from '../i18n/translations';
import { icons } from '../assets/icons';

interface TimelineItemProps {
  top: string;
  mid: string;
  sub?: string;
  period: string;
  duties?: string[];
}

/** A single entry in the career / education timeline. */
function TimelineItem({ top, mid, sub, period, duties }: TimelineItemProps) {
  return (
    <div
      style={{
        position: 'relative',
        paddingLeft: 'var(--space-6)',
        paddingBottom: 'var(--space-6)',
        borderLeft: '1px solid var(--border-glass-str)',
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: -6,
          top: 4,
          width: 11,
          height: 11,
          borderRadius: '50%',
          background: 'var(--gradient-brand-br)',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            fontWeight: 'var(--fw-semibold)' as unknown as number,
            color: 'var(--text-primary)',
            fontSize: 'var(--text-md)',
          }}
        >
          {top}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-2xs)',
            color: 'var(--text-muted)',
          }}
        >
          {period}
        </div>
      </div>
      <div style={{ color: 'var(--brand-pink)', fontSize: 'var(--text-sm)', marginTop: 2 }}>
        {mid}
        {sub ? ` · ${sub}` : ''}
      </div>
      {duties && duties.length > 0 && (
        <ul
          style={{
            margin: '8px 0 0',
            paddingLeft: '1.1em',
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-sm)',
            lineHeight: 'var(--leading-snug)',
          }}
        >
          {duties.map((d, i) => (
            <li key={i} style={{ marginBottom: 3 }}>
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Manually navigable photo slider for the "Lebensweg" tab. The caller only
 * renders this when at least one image is available (backend-driven); an empty
 * list therefore never reaches this component.
 */
function PhotoSlider({ images }: { images: string[] }) {
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);
  // Guard against an out-of-range index if the image list ever shrinks.
  const activeIdx = Math.min(idx, images.length - 1);
  const go = (n: number) => setIdx((n + images.length) % images.length);
  const activeName = images[activeIdx];

  return (
    <div className="photo-slider">
      <div className="slider-row">
        <button
          type="button"
          className="slider-arrow prev"
          onClick={() => go(activeIdx - 1)}
          aria-label={t.about.prevPhoto}
        >
          <span>‹</span>
        </button>

        <div className="slider-viewport">
          <CachedImage
            key={activeName}
            name={activeName}
            alt={t.about.photoAlt(activeIdx + 1)}
            className="slider-photo"
          />
        </div>

        <button
          type="button"
          className="slider-arrow next"
          onClick={() => go(activeIdx + 1)}
          aria-label={t.about.nextPhoto}
        >
          <span>›</span>
        </button>
      </div>

      <div className="slider-dots" role="tablist" aria-label={t.about.selectPhoto}>
        {images.map((name, i) => (
          <button
            type="button"
            key={name}
            className={'dot' + (i === activeIdx ? ' active' : '')}
            aria-label={t.about.showPhoto(i + 1)}
            aria-current={i === activeIdx}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}

/** Builds the about-section tabs for the active language. */
function buildTabs(t: Messages): TabItem[] {
  return [
    { id: 'job', label: t.about.tabs.job, icon: icons.work },
    { id: 'edu', label: t.about.tabs.edu, icon: icons.education },
    { id: 'life', label: t.about.tabs.life, icon: icons.person },
  ];
}

/** ABOUT section — tabbed timeline (career / education / life) + photo slider. */
export function About() {
  const [tab, setTab] = useState('job');
  const { portfolio } = usePortfolio();
  const { t } = useI18n();
  const tabs = buildTabs(t);

  const experience = portfolio?.experience ?? [];
  const education = portfolio?.education ?? [];
  const about = portfolio?.about;

  return (
    <section id="about" data-screen-label="Über mich" style={{ padding: 'var(--space-16) var(--space-10)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'var(--text-2xl)',
            /* Abstand Überschrift → Container um 35% vergrößert (12px → ~16.2px). */
            margin: '0 0 calc(var(--space-3) * 1.35)',
            color: 'var(--text-primary)',
            fontWeight: 'var(--fw-bold)' as unknown as number,
          }}
        >
          {t.about.title}
        </h2>

        <Card padding="var(--space-8)" style={{ height: '624px' }}>
          <div className="about-tabs" style={{ marginBottom: 'var(--space-8)' }}>
            <Tabs activeId={tab} onChange={setTab} tabs={tabs} />
          </div>
          <div className="about-content" style={{ textAlign: 'left', height: '484px' }}>
            {tab === 'job' &&
              experience.map((j, i) => (
                <TimelineItem
                  key={i}
                  top={j.jobTitle}
                  mid={j.company}
                  sub={j.location}
                  period={j.timePeriod}
                  duties={j.duties}
                />
              ))}
            {tab === 'edu' &&
              education.map((e, i) => (
                <TimelineItem
                  key={i}
                  top={e.institution}
                  mid={e.description}
                  period={e.timePeriod}
                  duties={e.duties}
                />
              ))}
            {tab === 'life' &&
              (() => {
                const lifeImages = about?.images ?? [];
                const hasImages = lifeImages.length > 0;
                return (
                  <div className="about-life">
                    {hasImages && <PhotoSlider images={lifeImages} />}
                    <p
                      style={{
                        /* Ohne Fotoslider entfällt der obere Abstand. */
                        margin: hasImages ? 'var(--space-6) 0 0' : 0,
                        whiteSpace: 'pre-line',
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--text-base)',
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                    >
                      {about?.text ?? ''}
                    </p>
                  </div>
                );
              })()}
          </div>
        </Card>
      </div>
    </section>
  );
}
