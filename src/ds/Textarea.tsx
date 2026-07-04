import { useId, useState, type CSSProperties, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  /** Style applied to the wrapping label element. */
  wrapperStyle?: CSSProperties;
}

/**
 * Textarea — multi-line message field. Matches Input styling; fixed
 * (non-resizable) like the contact form on the site.
 */
export function Textarea({ label, rows = 5, error, id, wrapperStyle = {}, ...rest }: TextareaProps) {
  const [focus, setFocus] = useState(false);
  const generatedId = useId();
  const taId = id ?? generatedId;

  return (
    <label
      htmlFor={taId}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        textAlign: 'left',
        ...wrapperStyle,
      }}
    >
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--fw-medium)' as unknown as number,
            color: '#fff',
          }}
        >
          {label}
        </span>
      )}
      <textarea
        id={taId}
        rows={rows}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          padding: 'var(--space-3) var(--space-4)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          lineHeight: 'var(--leading-normal)',
          color: 'var(--text-on-light)',
          background: 'var(--surface-input)',
          border: `1px solid ${error ? 'var(--danger)' : focus ? 'var(--brand-indigo)' : 'var(--border-on-light)'}`,
          borderRadius: 'var(--radius-sm)',
          outline: 'none',
          resize: 'none',
          boxShadow: focus ? 'var(--ring)' : 'none',
          transition:
            'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        }}
        {...rest}
      />
      {error && (
        <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--danger)' }}>{error}</span>
      )}
    </label>
  );
}
