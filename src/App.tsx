import { useEffect, useMemo, useState } from 'react';
import { NavBar, type NavItem } from './ds';
import { DKLogo } from './components/DKLogo';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { usePortfolio } from './context/PortfolioContext';
import { useI18n } from './i18n/LanguageContext';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useReveal } from './hooks/useReveal';
import { NAV_STRUCTURE, SECTIONS } from './constants';

/** Smoothly scrolls to a section by id. */
function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Root application: fixed navigation, mobile drawer, page sections and footer. */
export function App() {
  const sectionIds = useMemo(() => [...SECTIONS], []);
  const active = useScrollSpy(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const { portfolio } = usePortfolio();
  const { t } = useI18n();

  // Build the navigation items with labels for the active language.
  const navItems: NavItem[] = useMemo(
    () => NAV_STRUCTURE.map((item) => ({ ...item, label: t.nav[item.id] })),
    [t],
  );

  // Re-observe reveal elements once the project data has rendered.
  useReveal([Boolean(portfolio)]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const go = (id: string) => scrollToId(id);

  return (
    <>
      <div className="kit-header">
        <NavBar
          brand={<DKLogo />}
          activeId={active}
          onNavigate={go}
          items={navItems}
          trailing={<LanguageSwitcher />}
        />
        <button
          className="nav-burger"
          aria-label={t.a11y.openMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={'nav-backdrop' + (menuOpen ? ' open' : '')}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <aside className={'nav-drawer' + (menuOpen ? ' open' : '')} aria-hidden={!menuOpen}>
        <button className="nav-drawer-close" aria-label={t.a11y.closeMenu} onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <nav className="nav-drawer-links">
          {navItems.map((it) => (
            <a
              key={it.id}
              href={'#' + it.id}
              className={(active === it.id ? 'active' : '') + (it.cta ? ' cta' : '')}
              onClick={(e) => {
                e.preventDefault();
                go(it.id);
                setMenuOpen(false);
              }}
            >
              {it.label}
            </a>
          ))}
        </nav>
        <div className="nav-drawer-lang">
          <LanguageSwitcher />
        </div>
      </aside>

      <main className="kit-main">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
