import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from '../i18n/LanguageContext';
import { LEGAL_CONTENT, type LegalBlock, type LegalKind, type LegalSection } from '../content/legal';

interface LegalModalProps {
  /** Which legal document to show, or `null` when the modal is closed. */
  kind: LegalKind | null;
  /** Called when the user requests to close the modal. */
  onClose: () => void;
}

/** Renders a single content block of a legal section. */
function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'p':
      return <p className="legal-p">{block.text}</p>;
    case 'address':
      return (
        <address className="legal-address">
          {block.lines.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </address>
      );
    case 'list':
      return (
        <ul className="legal-list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case 'links':
      return (
        <ul className="legal-links">
          {block.items.map((item, i) => (
            <li key={i}>
              <a href={item.href} target="_blank" rel="noreferrer noopener">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      );
  }
}

/** Renders a titled section of a legal document. */
function Section({ section }: { section: LegalSection }) {
  return (
    <section className="legal-section">
      {section.heading && <h3 className="legal-heading">{section.heading}</h3>}
      {section.blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </section>
  );
}

/**
 * Accessible modal dialog that presents a legal document (Impressum or
 * Datenschutzerklärung) in the active UI language, styled to match the design.
 * Closes on Escape, backdrop click or the close button; locks body scroll while
 * open and is rendered into a portal so it overlays the whole page.
 */
export function LegalModal({ kind, onClose }: LegalModalProps) {
  const { lang, t } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!kind) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [kind, onClose]);

  if (!kind) return null;

  const doc = LEGAL_CONTENT[lang][kind];
  const titleId = `legal-title-${kind}`;

  return createPortal(
    <div className="legal-overlay" onClick={onClose} role="presentation">
      <div
        className="legal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="legal-dialog-header">
          <h2 id={titleId} className="legal-title">
            {doc.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="legal-close"
            aria-label={t.a11y.closeMenu}
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className="legal-body">
          {doc.updated && <p className="legal-updated">{doc.updated}</p>}
          {doc.sections.map((section, i) => (
            <Section key={i} section={section} />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
