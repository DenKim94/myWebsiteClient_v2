import { useState, type CSSProperties } from 'react';

export interface TabItem {
  id: string;
  label: string;
  /** Optional icon URL rendered left of the label. */
  icon?: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  style?: CSSProperties;
}

/**
 * Tabs — the About-section tabbed control. Each tab is a dark pill; the active
 * tab shows the gradient glow behind it. Optional icon per tab.
 */
export function Tabs({ tabs, activeId, onChange, style = {} }: TabsProps) {
  const current = activeId ?? tabs[0]?.id;
  return (
    <div style={{ display: 'flex', gap: 'var(--space-4)', ...style }}>
      {tabs.map((t) => (
        <TabButton
          key={t.id}
          tab={t}
          active={t.id === current}
          onClick={() => onChange?.(t.id)}
        />
      ))}
    </div>
  );
}

function TabButton({ tab, active, onClick }: { tab: TabItem; active: boolean; onClick: () => void }) {
  const [press, setPress] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseLeave={() => setPress(false)}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        padding: '10px 22px',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--fw-medium)' as unknown as number,
        color: '#fff',
        background: 'var(--ink-700)',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        opacity: active ? 1 : 0.78,
        boxShadow: active ? 'var(--halo-soft)' : 'none',
        transform: press ? 'scale(var(--press-scale))' : 'scale(1)',
        transition: 'transform var(--dur-fast) var(--ease-out), opacity var(--dur-base) var(--ease-out)',
        isolation: 'isolate',
      }}
    >
      {active && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'var(--radius-md)',
            zIndex: -1,
            background: 'var(--gradient-brand-br)',
          }}
        />
      )}
      {tab.icon && (
        <img src={tab.icon} alt="" style={{ width: 22, height: 22, objectFit: 'contain' }} />
      )}
      <span>{tab.label}</span>
    </button>
  );
}
