import * as React from 'react';
import { Container } from './Container';

export const Footer: React.FC = () => {
  const footerStyle: React.CSSProperties = {
    borderTop: '1px solid var(--rl-demo-border)',
    padding: '3rem 0 4rem',
    marginTop: '5rem',
    color: 'var(--rl-demo-text-muted)',
    fontSize: '0.875rem',
  };

  const innerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    textAlign: 'center',
  };

  return (
    <footer style={footerStyle}>
      <Container size="xl">
        <div style={innerStyle}>
          <p>
            <strong>react-loading-kit</strong> — Zero-dependency, accessible loading states for React.
          </p>
          <p>Released under the MIT License.</p>
        </div>
      </Container>
    </footer>
  );
};
