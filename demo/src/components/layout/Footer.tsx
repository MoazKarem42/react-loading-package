import * as React from 'react';
import { Container } from './Container';

export const Footer: React.FC = () => {
  const footerStyle: React.CSSProperties = {
    borderTop: '1px solid var(--rl-demo-border)',
    backgroundColor: 'var(--rl-demo-bg)',
    padding: '24px 0',
    marginTop: '64px',
  };

  const innerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
    fontSize: '12px',
    fontFamily: 'var(--rl-demo-font-mono)',
  };

  const leftGroupStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--rl-demo-text-dim)',
  };

  const linksStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontFamily: 'var(--rl-demo-font-sans)',
    fontSize: '13px',
    color: 'var(--rl-demo-text-dim)',
  };

  return (
    <footer style={footerStyle}>
      <Container size="xl">
        <div style={innerStyle}>
          <div style={leftGroupStyle}>
            <span>react-loading-kit</span>
            <span style={{ color: 'var(--rl-demo-text-subtle)' }}>—</span>
            <span>MIT License</span>
          </div>

          <div style={linksStyle}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: 'color 0.15s' }}
            >
              GitHub
            </a>
            <a
              href="https://npmjs.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: 'color 0.15s' }}
            >
              npm
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: 'color 0.15s' }}
            >
              Issues
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
