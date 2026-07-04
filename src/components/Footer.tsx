import { icons } from '../assets/icons';

/** Site footer with legal link and social-media icons. */
export function Footer() {
  return (
    <footer className="kit-footer">
      <a href="#">Impressum</a>
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
