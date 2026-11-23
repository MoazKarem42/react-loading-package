import * as React from 'react';
import { Container } from './Container';
import { Badge } from '@/components/ui/Badge';
import { CopyButton } from '@/components/ui/CopyButton';

export const Navbar: React.FC = () => {
  const installCmd = 'npm i react-loading-kit';

  const navStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backgroundColor: 'rgba(14, 14, 14, 0.8)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderBottom: '1px solid var(--rl-demo-border)',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
  };

  const innerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  };

  const brandGroupStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const brandStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-mono)',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '20px',
    letterSpacing: '-0.025em',
    color: 'var(--rl-demo-text)',
  };

  const linksStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    fontSize: '14px',
    fontFamily: 'var(--rl-demo-font-sans)',
  };

  const linkActiveStyle: React.CSSProperties = {
    color: 'var(--rl-demo-text)',
    fontWeight: 500,
  };

  const linkMutedStyle: React.CSSProperties = {
    color: 'var(--rl-demo-text-muted)',
    fontWeight: 400,
    transition: 'color 0.15s ease',
  };

  const rightActionsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const iconLinkStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    borderRadius: 'var(--rl-demo-radius-sm)',
    color: 'var(--rl-demo-text-dim)',
    transition: 'color 0.15s ease',
  };

  return (
    <header style={navStyle}>
      <Container size="xl">
        <div style={innerStyle}>
          <div style={brandGroupStyle}>
            <a href="#" style={brandStyle}>
              react-loading-kit
            </a>
            <Badge variant="meta">v0.1.0</Badge>
          </div>

          <nav style={linksStyle}>
            <a href="#playground" style={linkActiveStyle}>
              Playground
            </a>
            <a href="#simulation" style={linkMutedStyle}>
              State Manager
            </a>
            <a href="#components" style={linkMutedStyle}>
              Components
            </a>
            <a href="#api" style={linkMutedStyle}>
              API
            </a>
          </nav>

          <div style={rightActionsStyle}>
            <CopyButton
              textToCopy={installCmd}
              label={installCmd}
              showIcon={true}
              style={{
                fontSize: '12px',
                padding: '6px 10px',
                borderRadius: 'var(--rl-demo-radius-sm)',
              }}
            />

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={iconLinkStyle}
              title="GitHub Repository"
              aria-label="GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
};
