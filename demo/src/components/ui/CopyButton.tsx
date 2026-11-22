import * as React from 'react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textToCopy: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  style,
  ...props
}) => {
  const { copied, copy } = useCopyToClipboard();

  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.25rem 0.65rem',
    fontSize: '0.75rem',
    fontWeight: 500,
    borderRadius: 'var(--rl-demo-radius-sm)',
    border: '1px solid var(--rl-demo-border)',
    backgroundColor: copied ? 'rgba(34, 197, 94, 0.15)' : 'var(--rl-demo-surface-elevated)',
    color: copied ? '#4ade80' : 'var(--rl-demo-text-muted)',
    transition: 'all 0.15s ease',
    ...style,
  };

  return (
    <button
      type="button"
      onClick={() => copy(textToCopy)}
      style={buttonStyle}
      aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
      {...props}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
};
