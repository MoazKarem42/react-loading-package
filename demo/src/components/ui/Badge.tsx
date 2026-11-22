import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'accent';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.15rem 0.6rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 500,
    border: '1px solid var(--rl-demo-border)',
    backgroundColor: variant === 'accent' ? 'rgba(99, 102, 241, 0.15)' : 'var(--rl-demo-surface-elevated)',
    color: variant === 'accent' ? '#818cf8' : 'var(--rl-demo-text-muted)',
    ...style,
  };

  return (
    <span style={baseStyle} {...props}>
      {children}
    </span>
  );
};
