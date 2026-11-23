import * as React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'xl',
  style,
  ...props
}) => {
  const maxWidthMap: Record<string, string> = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: 'var(--rl-demo-container-max)',
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: maxWidthMap[size] || '1280px',
    margin: '0 auto',
    padding: '0 48px',
    ...style,
  };

  return (
    <div style={containerStyle} {...props}>
      {children}
    </div>
  );
};
