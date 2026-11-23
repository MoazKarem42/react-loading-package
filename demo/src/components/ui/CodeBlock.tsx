import * as React from 'react';
import { CopyButton } from './CopyButton';

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  showCopy?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'tsx',
  showCopy = true,
  style,
  ...props
}) => {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: 'var(--rl-demo-surface)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--rl-demo-shadow-sm)',
    ...style,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px',
    borderBottom: '1px solid var(--rl-demo-border)',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    fontSize: '11px',
    fontFamily: 'var(--rl-demo-font-sans)',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--rl-demo-text-muted)',
  };

  const preStyle: React.CSSProperties = {
    padding: '16px',
    overflowX: 'auto',
    fontSize: '12px',
    fontFamily: 'var(--rl-demo-font-mono)',
    color: 'var(--rl-demo-text-secondary)',
    margin: 0,
    lineHeight: 1.6,
  };

  return (
    <div style={containerStyle} {...props}>
      <div style={headerStyle}>
        <span>{language}</span>
        {showCopy && <CopyButton textToCopy={code} label="Copy" />}
      </div>
      <pre style={preStyle}>
        <code>{code}</code>
      </pre>
    </div>
  );
};
