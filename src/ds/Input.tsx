import { useId, useState, type CSSProperties, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  /** Style applied to the wrapping label element. */
  wrapperStyle?: CSSProperties;
}

/**
 * Input — a single-line text field. White surface with dark text (the form sits
 * on the gradient), refined to a 44px hit target.
 */
export function Input({ label, type = 'text', error, id, wrapperStyle = {}, ...rest }: InputProps) {
  const [focus, setFocus] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
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
      <input
        id={inputId}
        type={type}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          height: 'var(--input-height)',
          padding: '0 var(--space-4)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-on-light)',
          background: 'var(--surface-input)',
          border: `1px solid ${error ? 'var(--danger)' : focus ? 'var(--brand-indigo)' : 'var(--border-on-light)'}`,
          borderRadius: 'var(--radius-sm)',
          outline: 'none',
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
