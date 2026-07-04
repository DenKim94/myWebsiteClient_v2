import { useId, type CSSProperties, type ReactNode } from 'react';

interface CheckboxProps {
  label?: ReactNode;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  style?: CSSProperties;
}

/**
 * Checkbox — used for the data-privacy consent on the contact form. Custom box
 * with the brand gradient when checked.
 */
export function Checkbox({ label, checked, onChange, id, style = {} }: CheckboxProps) {
  const generatedId = useId();
  const cbId = id ?? generatedId;
  return (
    <label
      htmlFor={cbId}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        cursor: 'pointer',
        textAlign: 'left',
        ...style,
      }}
    >
      <input
        id={cbId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span
        aria-hidden
        style={{
          width: 22,
          height: 22,
          flex: 'none',
          display: 'grid',
          placeItems: 'center',
          borderRadius: 'var(--radius-xs)',
          border: `1px solid ${checked ? 'transparent' : 'var(--border-glass-str)'}`,
          background: checked ? 'var(--gradient-brand-br)' : 'rgba(255,255,255,0.06)',
          transition:
            'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
        }}
      >
        {checked && (
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
}
