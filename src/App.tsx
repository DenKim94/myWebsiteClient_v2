import { useEffect, useMemo, useState } from 'react';
import { NavBar } from './ds';
import { DKLogo } from './components/DKLogo';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { usePortfolio } from './context/PortfolioContext';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useReveal } from './hooks/useReveal';
import { NAV_ITEMS, SECTIONS } from './constants';

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
        <NavBar brand={<DKLogo />} activeId={active} onNavigate={go} items={NAV_ITEMS} />
        <button
          className="nav-burger"
          aria-label="Menü öffnen"
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
        <button className="nav-drawer-close" aria-label="Menü schließen" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <nav className="nav-drawer-links">
          {NAV_ITEMS.map((it) => (
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
