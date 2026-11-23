import * as React from 'react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textToCopy: string;
  label?: string;
  showIcon?: boolean;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label,
  showIcon = true,
  style,
  ...props
}) => {
  const { copied, copy } = useCopyToClipboard();

  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: label ? '6px 12px' : '6px 8px',
    fontSize: '12px',
    fontFamily: 'var(--rl-demo-font-mono)',
    fontWeight: 400,
    borderRadius: 'var(--rl-demo-radius-sm)',
    border: '1px solid var(--rl-demo-border)',
    backgroundColor: copied ? 'rgba(80, 142, 255, 0.15)' : 'var(--rl-demo-surface-elevated)',
    color: copied ? 'var(--rl-demo-accent)' : 'var(--rl-demo-text)',
    transition: 'all 0.15s ease',
    ...style,
  };

  return (
    <button
      type="button"
      onClick={() => copy(textToCopy)}
      style={buttonStyle}
      aria-label={copied ? 'Copied' : (label || 'Copy text')}
      {...props}
    >
      {showIcon && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {copied ? (
            <polyline points="20 6 9 17 4 12" />
          ) : (
            <>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </>
          )}
        </svg>
      )}
      {copied ? 'Copied' : label}
    </button>
  );
};
