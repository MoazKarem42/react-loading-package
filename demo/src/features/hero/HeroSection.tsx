import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { CopyButton } from '@/components/ui/CopyButton';

export const HeroSection: React.FC = () => {
  const installCmd = 'npm install react-loading-kit';

  const sectionStyle: React.CSSProperties = {
    padding: '5rem 0 3.5rem',
    textAlign: 'center',
  };

  const badgeWrapperStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1.25rem',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    lineHeight: 1.15,
    marginBottom: '1rem',
  };

  const gradientTextStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #60a5fa, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    color: 'var(--rl-demo-text-muted)',
    maxWidth: '680px',
    margin: '0 auto 2rem',
  };

  const actionGroupStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '2.5rem',
  };

  const installBoxStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem 0.85rem',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-md)',
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '0.875rem',
  };

  return (
    <section style={sectionStyle}>
      <Container size="lg">
        <div style={badgeWrapperStyle}>
          <Badge variant="accent">Zero Dependencies</Badge>
          <Badge>Full A11y Support</Badge>
          <Badge>SSR Safe</Badge>
        </div>

        <h1 style={headingStyle}>
          Accessible Loading Indicators <br />
          <span style={gradientTextStyle}>Crafted for Modern React</span>
        </h1>

        <p style={subtitleStyle}>
          Lightweight, customizable, and production-ready spinners and loaders with instant HMR and accessible announcements.
        </p>

        <div style={actionGroupStyle}>
          <div style={installBoxStyle}>
            <span style={{ color: 'var(--rl-demo-text-muted)' }}>$</span>
            <code>{installCmd}</code>
            <CopyButton textToCopy={installCmd} />
          </div>

          <a
            href="#playground"
            style={{
              padding: '0.55rem 1.25rem',
              backgroundColor: 'var(--rl-demo-primary)',
              color: '#fff',
              fontWeight: 500,
              fontSize: '0.875rem',
              borderRadius: 'var(--rl-demo-radius-md)',
              transition: 'background-color 0.15s',
            }}
          >
            Open Playground
          </a>
        </div>
      </Container>
    </section>
  );
};
