import * as React from 'react';
import { Container } from './Container';
import { Badge } from '@/components/ui/Badge';

export const Navbar: React.FC = () => {
  const navStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backgroundColor: 'rgba(9, 9, 11, 0.8)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid var(--rl-demo-border)',
  };

  const innerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '4rem',
  };

  const brandStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontWeight: 600,
    fontSize: '1.1rem',
    color: '#fff',
  };

  const linksStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    fontSize: '0.9rem',
    color: 'var(--rl-demo-text-muted)',
  };

  return (
    <header style={navStyle}>
      <Container size="xl">
        <div style={innerStyle}>
          <a href="#" style={brandStyle}>
            <span>react-loading-kit</span>
            <Badge variant="accent">v0.1.0</Badge>
          </a>

          <nav style={linksStyle}>
            <a href="#showcase" style={{ transition: 'color 0.15s' }}>
              Showcase
            </a>
            <a href="#playground" style={{ transition: 'color 0.15s' }}>
              Playground
            </a>
            <a href="#docs" style={{ transition: 'color 0.15s' }}>
              Docs
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.35rem 0.75rem',
                backgroundColor: 'var(--rl-demo-surface-elevated)',
                border: '1px solid var(--rl-demo-border)',
                borderRadius: 'var(--rl-demo-radius-sm)',
                color: 'var(--rl-demo-text)',
              }}
            >
              GitHub
            </a>
          </nav>
        </div>
      </Container>
    </header>
  );
};
