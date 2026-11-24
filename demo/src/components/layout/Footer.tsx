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
    gap: '8px',
    color: 'var(--rl-demo-text-dim)',
  };

  const authorGroupStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--rl-demo-text-muted)',
    fontSize: '13px',
    fontFamily: 'var(--rl-demo-font-sans)',
  };

  const linkedinLinkStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--rl-demo-text-dim)',
    transition: 'color 0.15s ease',
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
            <span style={{ fontWeight: 500, color: 'var(--rl-demo-text)' }}>react-loading-kit</span>
            <span style={{ color: 'var(--rl-demo-text-subtle)' }}>—</span>
            <span>MIT License</span>
          </div>

          <div style={authorGroupStyle}>
            <span>
              Built by <strong style={{ color: 'var(--rl-demo-text)', fontWeight: 600 }}>Moaz Karem</strong>
            </span>
            <a
              href="https://www.linkedin.com/in/moaz-karem-98a537234/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Moaz Karem LinkedIn"
              title="Moaz Karem LinkedIn"
              style={linkedinLinkStyle}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

          <div style={linksStyle}>
            <a
              href="https://github.com/MoazKarem42/react-loading-package"
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: 'color 0.15s' }}
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/react-loading-kit"
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: 'color 0.15s' }}
            >
              npm
            </a>
            <a
              href="https://github.com/MoazKarem42/react-loading-package/issues"
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
