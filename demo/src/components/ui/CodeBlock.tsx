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
    borderRadius: 'var(--rl-demo-radius-md)',
    overflow: 'hidden',
    ...style,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.4rem 0.75rem',
    borderBottom: '1px solid var(--rl-demo-border)',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    fontSize: '0.75rem',
    color: 'var(--rl-demo-text-muted)',
  };

  const preStyle: React.CSSProperties = {
    padding: '0.875rem 1rem',
    overflowX: 'auto',
    fontSize: '0.85rem',
    color: '#e4e4e7',
    margin: 0,
    lineHeight: 1.6,
  };

  return (
    <div style={containerStyle} {...props}>
      <div style={headerStyle}>
        <span>{language}</span>
        {showCopy && <CopyButton textToCopy={code} />}
      </div>
      <pre style={preStyle}>
        <code>{code}</code>
      </pre>
    </div>
  );
};
