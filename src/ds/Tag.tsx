import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type TagTone = 'default' | 'brand' | 'magenta';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
  children?: ReactNode;
}

const TONES: Record<TagTone, CSSProperties> = {
  default: {
    background: 'var(--ink-700)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-glass)',
  },
  brand: {
    background: 'var(--brand-indigo-tint)',
    color: '#fff',
    border: '1px solid rgba(97,87,255,0.45)',
  },
  magenta: {
    background: 'var(--brand-magenta-tint)',
    color: '#fff',
    border: '1px solid rgba(169,39,181,0.45)',
  },
};

/**
 * Tag — a small monospace chip for techstack tokens (React, NodeJS…).
 */
export function Tag({ children, tone = 'default', style = {}, ...rest }: TagProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 26,
        padding: '0 10px',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 'var(--fw-medium)' as unknown as number,
        letterSpacing: '0.01em',
        borderRadius: 'var(--radius-sm)',
        whiteSpace: 'nowrap',
        ...TONES[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
