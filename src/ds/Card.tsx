import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: string;
  interactive?: boolean;
  children?: ReactNode;
}

/**
 * Card — the brand's dark-glass panel: translucent ink over the gradient with a
 * backdrop blur, hairline border, and 15px radius.
 */
export function Card({
  children,
  padding = 'var(--space-6)',
  interactive = false,
  style = {},
  ...rest
}: CardProps) {
  const [hover, setHover] = useState(false);
  const composed: CSSProperties = {
    background: 'var(--surface-card)',
    backdropFilter: 'blur(var(--blur-glass))',
    WebkitBackdropFilter: 'blur(var(--blur-glass))',
    border: '1px solid var(--border-glass)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: hover ? 'var(--shadow-xl)' : 'var(--shadow-card)',
    padding,
    transform: hover ? 'translateY(-2px)' : 'translateY(0)',
    transition:
      'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    ...style,
  };
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={composed}
      {...rest}
    >
      {children}
    </div>
  );
}
