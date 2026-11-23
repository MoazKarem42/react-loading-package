import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'meta' | 'accent' | 'pill';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  style,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    if (variant === 'accent') {
      return {
        backgroundColor: 'var(--rl-demo-surface-elevated)',
        border: '1px solid var(--rl-demo-border)',
        color: 'var(--rl-demo-accent)',
        borderRadius: 'var(--rl-demo-radius-md)',
      };
    }
    if (variant === 'pill') {
      return {
        backgroundColor: 'var(--rl-demo-surface-active)',
        border: '1px solid var(--rl-demo-border)',
        color: 'var(--rl-demo-accent)',
        borderRadius: 'var(--rl-demo-radius-xl)',
      };
    }
    if (variant === 'meta') {
      return {
        backgroundColor: 'var(--rl-demo-surface-elevated)',
        border: '1px solid var(--rl-demo-border)',
        color: 'var(--rl-demo-text-dim)',
        borderRadius: 'var(--rl-demo-radius-md)',
      };
    }
    return {
      backgroundColor: 'var(--rl-demo-surface-elevated)',
      border: '1px solid var(--rl-demo-border)',
      color: 'var(--rl-demo-text-muted)',
      borderRadius: 'var(--rl-demo-radius-sm)',
    };
  };

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '2px 8px',
    fontSize: '12px',
    fontFamily: 'var(--rl-demo-font-mono)',
    fontWeight: 400,
    lineHeight: '18px',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <span style={baseStyle} {...props}>
      {children}
    </span>
  );
};
