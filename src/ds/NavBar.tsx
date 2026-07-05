import { useState, type CSSProperties, type ReactNode } from 'react';

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  /** Highlights the item as a contact call-to-action. */
  cta?: boolean;
}

interface NavBarProps {
  brand?: ReactNode;
  items: NavItem[];
  activeId?: string;
  onNavigate?: (id: string) => void;
  /** Optional element rendered at the end of the nav (e.g. a language switcher). */
  trailing?: ReactNode;
  style?: CSSProperties;
}

/**
 * NavBar — the fixed header: wordmark on the left, nav links on the right with
 * the brand's white-glow hover. The last item can be a contact CTA and an
 * optional `trailing` element (e.g. the language switcher) follows the links.
 */
export function NavBar({ brand = 'Denis Kim', items, activeId, onNavigate, trailing, style = {} }: NavBarProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'var(--header-height)',
        background: 'var(--surface-header)',
        padding: '0 var(--space-8)',
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--fw-bold)' as unknown as number,
          fontSize: 'var(--text-xl)',
          color: '#fff',
          letterSpacing: 'var(--tracking-tight)',
        }}
      >
        {brand}
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
        {items.map((it) => (
          <NavLink key={it.id} item={it} active={it.id === activeId} onNavigate={onNavigate} />
        ))}
        {trailing}
      </nav>
    </header>
  );
}

function NavLink({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  onNavigate?: (id: string) => void;
}) {
  const [hover, setHover] = useState(false);
  const isCta = item.cta;
  return (
    <a
      href={item.href ?? '#'}
      className={isCta ? 'nav-cta' : undefined}
      onClick={(e) => {
        if (onNavigate) {
          e.preventDefault();
          onNavigate(item.id);
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: hover ? 600 : 520,
        color: '#fff',
        textDecoration: 'none',
        padding: isCta ? '7px 16px' : '5px 2px',
        borderRadius: isCta ? 'var(--radius-sm)' : 0,
        border: isCta ? '1px solid rgba(255,255,255,0.85)' : 'none',
        background: isCta ? 'var(--brand-violet)' : 'transparent',
        borderBottom: !isCta ? `2px solid ${active ? 'var(--brand-pink)' : 'transparent'}` : undefined,
        filter: hover ? 'drop-shadow(var(--glow-white-md))' : 'none',
        transition:
          'filter var(--dur-base) var(--ease-out), font-weight var(--dur-fast) var(--ease-out)',
        cursor: 'pointer',
      }}
    >
      {item.label}
    </a>
  );
}
