import { useState } from 'react';
import { Button, Tag } from '../ds';
import { CachedImage } from './CachedImage';
import { usePortfolio } from '../context/PortfolioContext';
import { useI18n } from '../i18n/LanguageContext';
import { icons } from '../assets/icons';
import type { Project } from '../types/portfolio';

/** A project counts as "live" unless its only URL is a source repository. */
function isLive(url: string): boolean {
  return url.length > 0 && !url.includes('github.com');
}

/** Large project card matching the design's portfolio entry. */
function BigProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();
  const [hover, setHover] = useState(false);
  const live = isLive(project.url);

  return (
    <article
      className="project-card reveal"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
        background: 'var(--surface-card)',
        backdropFilter: 'blur(var(--blur-glass))',
        WebkitBackdropFilter: 'blur(var(--blur-glass))',
        border: '1px solid var(--border-glass)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: hover ? 'var(--shadow-xl)' : 'var(--shadow-card)',
        padding: 'var(--space-8)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition:
          'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        textAlign: 'left',
        height: '100%',
      }}
    >
      <header style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-5)' }}>
        <span
          style={{
            flex: 'none',
            display: 'grid',
            placeItems: 'center',
            width: 68,
            height: 68,
            borderRadius: 'var(--radius-md)',
            background: 'transparent',
            overflow: 'hidden',
            boxShadow: hover ? 'var(--halo-soft)' : '0 0 0 transparent',
            transition: 'box-shadow var(--dur-base) var(--ease-out)',
          }}
        >
          <CachedImage
            name={project.logo}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </span>
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <h3
            style={{
              margin: 0,
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--fw-semibold)' as unknown as number,
              color: 'var(--text-primary)',
            }}
          >
            {project.title}
          </h3>

          {live ? (
            <span className="proj-meta-link" title={t.projects.liveTitle}>
              <span className="live-dot" aria-hidden="true" />
              {t.projects.live}
            </span>
          ) : (
            <span className="proj-meta-link" title={t.projects.repoTitle}>
              <img src={icons.github} width={16} height={16} alt="" aria-hidden="true" />
              {t.projects.repo}
            </span>
          )}

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
            }}
          >
            {project.effort}
          </span>
        </div>
      </header>

      <p
        className="project-desc"
        style={{
          margin: 0,
          fontSize: 'var(--text-base)',
          lineHeight: 'var(--leading-relaxed)',
          color: 'var(--text-secondary)',
        }}
      >
        {project.description}
      </p>

      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        {project.techStack.map((tech, i) => (
          <Tag key={i}>{tech}</Tag>
        ))}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
        <Button
          variant={live ? 'solid' : 'secondary'}
          size="md"
          onClick={() => window.open(project.url, '_blank', 'noopener')}
          disabled={!project.url}
          iconRight={
            <img
              src={icons.arrowRight}
              width={16}
              height={16}
              alt=""
              aria-hidden="true"
              style={{ display: 'block' }}
            />
          }
        >
          {live ? t.projects.openLive : t.projects.viewSource}
        </Button>
      </div>
    </article>
  );
}

/** PORTFOLIO section — grid of project cards driven by the backend. */
export function Projects() {
  const { portfolio, loading, error } = usePortfolio();
  const { lang, t } = useI18n();

  return (
    <section
      id="portfolio"
      data-screen-label="Portfolio"
      style={{ padding: 'var(--space-16) var(--space-10) var(--space-20)' }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'var(--text-2xl)',
            margin: '0 0 var(--space-4)',
            color: 'var(--text-primary)',
            fontWeight: 'var(--fw-bold)' as unknown as number,
          }}
        >
          {t.projects.title}
        </h2>
        <p
          lang={lang}
          style={{
            textAlign: 'justify',
            textAlignLast: 'center',
            hyphens: 'auto',
            WebkitHyphens: 'auto',
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-base)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: 760,
            margin: '0 auto var(--space-12)',
          }}
        >
          {t.projects.intro}
        </p>

        {error && (
          <p style={{ textAlign: 'center', color: 'var(--danger)' }}>{t.projects.error(error)}</p>
        )}
        {loading && !portfolio && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{t.projects.loading}</p>
        )}

        {portfolio && (
          <div className="project-grid">
            {portfolio.projects.map((p) => (
              <BigProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
