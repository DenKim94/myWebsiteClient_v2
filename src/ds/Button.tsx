import { useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'solid';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const SIZES: Record<ButtonSize, { height: number; padding: string; font: string }> = {
  sm: { height: 32, padding: '0 16px', font: 'var(--text-xs)' },
  md: { height: 40, padding: '0 22px', font: 'var(--text-sm)' },
  lg: { height: 48, padding: '0 30px', font: 'var(--text-base)' },
};

/**
 * Button — the brand's pill-shaped action control. Dark ink fill with the
 * signature indigo→magenta gradient glowing behind on the primary variant;
 * gentle scale(0.95) on press.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const sz = SIZES[size] ?? SIZES.md;

  const base: CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    height: sz.height,
    padding: sz.padding,
    fontFamily: 'var(--font-sans)',
    fontSize: sz.font,
    fontWeight: 'var(--fw-medium)' as unknown as number,
    lineHeight: 1,
    borderRadius: 'var(--radius-pill)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    whiteSpace: 'nowrap',
    transform: active && !disabled ? 'scale(var(--press-scale))' : 'scale(1)',
    transition:
      'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
    isolation: 'isolate',
    color: '#fff',
    ...style,
  };

  const variants: Record<ButtonVariant, CSSProperties> = {
    primary: {
      backgroundColor: 'var(--ink-700)',
      boxShadow: hover && !disabled ? 'var(--shadow-md), var(--glow-brand)' : 'var(--shadow-md)',
    },
    secondary: {
      background: 'transparent',
      border: '1px solid var(--border-glass-str)',
      boxShadow: hover && !disabled ? 'var(--glow-white-md)' : 'none',
    },
    ghost: {
      background: hover && !disabled ? 'rgba(255,255,255,0.08)' : 'transparent',
      boxShadow: 'none',
    },
    solid: {
      background: 'var(--gradient-brand-br)',
      boxShadow: hover && !disabled ? 'var(--shadow-md), var(--glow-magenta)' : 'var(--shadow-md)',
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{ ...base, ...variants[variant] }}
      {...rest}
    >
      {variant === 'primary' && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-1px',
            borderRadius: 'var(--radius-pill)',
            zIndex: -1,
            background: 'var(--gradient-brand-br)',
            opacity: 0.92,
          }}
        />
      )}
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
