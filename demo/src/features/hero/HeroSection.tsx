import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { CopyButton } from '@/components/ui/CopyButton';

type PackageManager = 'npm' | 'pnpm' | 'yarn';

export const HeroSection: React.FC = () => {
  const [pkgManager, setPkgManager] = React.useState<PackageManager>('npm');

  const getCommand = (): string => {
    if (pkgManager === 'pnpm') {
      return 'pnpm add react-loading-kit';
    }
    if (pkgManager === 'yarn') {
      return 'yarn add react-loading-kit';
    }
    return 'npm i react-loading-kit';
  };

  const command = getCommand();

  const heroSectionStyle: React.CSSProperties = {
    padding: '96px 0',
    borderBottom: '1px solid var(--rl-demo-border)',
    backgroundColor: 'var(--rl-demo-bg)',
  };

  const badgesRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '24px',
  };

  const badgeItemStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-md)',
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '12px',
    lineHeight: '18px',
    color: 'var(--rl-demo-text-dim)',
  };

  const dotSeparatorStyle: React.CSSProperties = {
    color: 'var(--rl-demo-text-subtle)',
    fontSize: '12px',
    userSelect: 'none',
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-sans)',
    fontSize: '40px',
    fontWeight: 600,
    lineHeight: '48px',
    letterSpacing: '-0.025em',
    color: 'var(--rl-demo-text)',
    marginBottom: '12px',
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-sans)',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '-0.01em',
    color: 'var(--rl-demo-text-muted)',
    maxWidth: '672px',
    marginBottom: '32px',
  };

  const actionGroupStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  };

  const primaryBtnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 16px',
    height: '36px',
    backgroundColor: 'var(--rl-demo-primary)',
    color: 'var(--rl-demo-text-dark)',
    fontFamily: 'var(--rl-demo-font-sans)',
    fontWeight: 500,
    fontSize: '14px',
    borderRadius: 'var(--rl-demo-radius-sm)',
    boxShadow: 'var(--rl-demo-shadow-sm)',
    transition: 'opacity 0.15s ease',
  };

  const secondaryBtnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 16px',
    height: '36px',
    backgroundColor: 'var(--rl-demo-surface)',
    border: '1px solid var(--rl-demo-border)',
    color: 'var(--rl-demo-text-secondary)',
    fontFamily: 'var(--rl-demo-font-sans)',
    fontWeight: 500,
    fontSize: '14px',
    borderRadius: 'var(--rl-demo-radius-sm)',
    transition: 'all 0.15s ease',
  };

  //Quick Start Section Styles
  const quickStartSectionStyle: React.CSSProperties = {
    padding: '64px 0',
    borderBottom: '1px solid var(--rl-demo-border)',
    backgroundColor: 'var(--rl-demo-bg)',
  };

  const quickStartCardStyle: React.CSSProperties = {
    backgroundColor: 'var(--rl-demo-surface)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-lg)',
    padding: '32px',
    boxShadow: 'var(--rl-demo-shadow-lg)',
  };

  const quickStartHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--rl-demo-border)',
    flexWrap: 'wrap',
    gap: '12px',
  };

  const titleGroupStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const tabsWrapperStyle: React.CSSProperties = {
    display: 'flex',
    padding: '2px',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-sm)',
  };

  const getTabStyle = (active: boolean): React.CSSProperties => ({
    padding: '4px 12px',
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '12px',
    borderRadius: 'var(--rl-demo-radius-xs)',
    backgroundColor: active ? 'var(--rl-demo-surface-active)' : 'transparent',
    color: active ? 'var(--rl-demo-text)' : 'var(--rl-demo-text-muted)',
    fontWeight: active ? 500 : 400,
    transition: 'all 0.15s ease',
  });

  const commandBoxStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    margin: '16px 0',
    backgroundColor: 'var(--rl-demo-bg)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-sm)',
  };

  const stepsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '16px',
    marginTop: '16px',
  };

  const stepCardStyle: React.CSSProperties = {
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-sm)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const stepHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const stepPreStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '12px',
    lineHeight: '18px',
    backgroundColor: 'var(--rl-demo-surface)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-xs)',
    padding: '10px 12px',
    overflowX: 'auto',
  };

  return (
    <>
      {/*Top Hero Section*/}
      <section style={heroSectionStyle}>
        <Container size="xl">
          <div style={badgesRowStyle}>
            <div style={badgeItemStyle}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--rl-demo-accent)',
                }}
              />
              <span style={{ color: 'var(--rl-demo-text)' }}>v0.1.0</span>
            </div>
            <span style={dotSeparatorStyle}>·</span>
            <div style={badgeItemStyle}>2.4kB gzipped</div>
            <span style={dotSeparatorStyle}>·</span>
            <div style={badgeItemStyle}>Zero dependencies</div>
          </div>

          <h1 style={headingStyle}>Zero-dependency loading states for React.</h1>

          <p style={subtitleStyle}>
            Accessible spinners, composable skeletons, and modern animated indicators engineered for precision.
          </p>

          <div style={actionGroupStyle}>
            <a href="#playground" style={primaryBtnStyle}>
              <span>Open Playground</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <a href="#quickstart" style={secondaryBtnStyle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <span>Quick Start</span>
            </a>
          </div>
        </Container>
      </section>

      {/*Quick Start Section*/}
      <section id="quickstart" style={quickStartSectionStyle}>
        <Container size="xl">
          <div style={quickStartCardStyle}>
            <div style={quickStartHeaderStyle}>
              <div style={titleGroupStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <h2
                  style={{
                    fontFamily: 'var(--rl-demo-font-sans)',
                    fontSize: '18px',
                    fontWeight: 500,
                    lineHeight: '26px',
                    letterSpacing: '-0.025em',
                    color: 'var(--rl-demo-text)',
                  }}
                >
                  Quick Start
                </h2>
                <span
                  style={{
                    fontFamily: 'var(--rl-demo-font-mono)',
                    fontSize: '12px',
                    color: 'var(--rl-demo-text-muted)',
                  }}
                >
                  Setup in 30 seconds
                </span>
              </div>

              <div style={tabsWrapperStyle}>
                <button
                  type="button"
                  style={getTabStyle(pkgManager === 'npm')}
                  onClick={() => setPkgManager('npm')}
                >
                  npm
                </button>
                <button
                  type="button"
                  style={getTabStyle(pkgManager === 'pnpm')}
                  onClick={() => setPkgManager('pnpm')}
                >
                  pnpm
                </button>
                <button
                  type="button"
                  style={getTabStyle(pkgManager === 'yarn')}
                  onClick={() => setPkgManager('yarn')}
                >
                  yarn
                </button>
              </div>
            </div>

            <div style={commandBoxStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--rl-demo-text-muted)', fontFamily: 'var(--rl-demo-font-mono)' }}>
                  $
                </span>
                <code
                  style={{
                    fontFamily: 'var(--rl-demo-font-mono)',
                    fontSize: '13px',
                    color: 'var(--rl-demo-text-secondary)',
                  }}
                >
                  {command}
                </code>
              </div>
              <CopyButton textToCopy={command} />
            </div>

            <div style={stepsGridStyle}>
              {/*Step 1*/}
              <div style={stepCardStyle}>
                <div style={stepHeaderStyle}>
                  <span
                    style={{
                      fontFamily: 'var(--rl-demo-font-sans)',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: 'var(--rl-demo-text-muted)',
                    }}
                  >
                    STEP 1: BASE STYLESHEET
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--rl-demo-font-mono)',
                      fontSize: '12px',
                      color: 'var(--rl-demo-text-muted)',
                    }}
                  >
                    global.css
                  </span>
                </div>
                <div style={stepPreStyle}>
                  <span style={{ color: 'var(--rl-demo-accent)' }}>import </span>
                  <span style={{ color: 'var(--rl-demo-text-dim)' }}>'react-loading-kit/styles.css'</span>
                  <span style={{ color: 'var(--rl-demo-text-secondary)' }}>;</span>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--rl-demo-font-sans)',
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: 'var(--rl-demo-text-muted)',
                  }}
                >
                  Injects zero-conflict CSS keyframes and hardware-accelerated transforms.
                </p>
              </div>

              {/*Step 2*/}
              <div style={stepCardStyle}>
                <div style={stepHeaderStyle}>
                  <span
                    style={{
                      fontFamily: 'var(--rl-demo-font-sans)',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: 'var(--rl-demo-text-muted)',
                    }}
                  >
                    STEP 2: COMPONENT INVOCATION
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--rl-demo-font-mono)',
                      fontSize: '12px',
                      color: 'var(--rl-demo-text-muted)',
                    }}
                  >
                    component.tsx
                  </span>
                </div>
                <div style={stepPreStyle}>
                  <span style={{ color: 'var(--rl-demo-accent)' }}>import </span>
                  <span style={{ color: 'var(--rl-demo-text-secondary)' }}>&#123; Spinner, SkeletonCard, Dots &#125; </span>
                  <span style={{ color: 'var(--rl-demo-accent)' }}>from </span>
                  <span style={{ color: 'var(--rl-demo-text-dim)' }}>'react-loading-kit'</span>
                  <span style={{ color: 'var(--rl-demo-text-secondary)' }}>;</span>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--rl-demo-font-sans)',
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: 'var(--rl-demo-text-muted)',
                  }}
                >
                  Tree-shakeable ESM imports ensure unused loaders never touch production bundles.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
