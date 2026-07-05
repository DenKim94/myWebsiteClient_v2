import { icons } from '../assets/icons';
import { useI18n } from '../i18n/LanguageContext';
import { useLegal } from '../context/LegalContext';

/** Site footer with legal link and social-media icons. */
export function Footer() {
  const { t } = useI18n();
  const { open: openLegal } = useLegal();
  return (
    <footer className="kit-footer">
      <button type="button" className="footer-legal-link" onClick={() => openLegal('impressum')}>
        {t.footer.imprint}
      </button>
      <div className="social">
        <a href="https://github.com/DenKim94" target="_blank" rel="noreferrer" aria-label="GitHub">
          <img src={icons.github} width={22} height={22} alt="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/denis-kim-1a3752111"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <img src={icons.linkedin} width={22} height={22} alt="LinkedIn" />
        </a>
      </div>
    </footer>
  );
}
