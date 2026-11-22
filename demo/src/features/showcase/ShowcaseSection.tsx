import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { loaderList } from '@/registry/loaders';
import type { LoaderId } from '@/registry/types';

export interface ShowcaseSectionProps {
  onSelectLoader: (id: LoaderId) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ onSelectLoader }) => {
  const sectionStyle: React.CSSProperties = {
    padding: '3rem 0',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '2rem',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
  };

  const descStyle: React.CSSProperties = {
    color: 'var(--rl-demo-text-muted)',
    fontSize: '0.95rem',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--rl-demo-surface)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-lg)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border-color 0.15s ease',
  };

  const previewBoxStyle: React.CSSProperties = {
    height: '180px',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    borderBottom: '1px solid var(--rl-demo-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const contentBoxStyle: React.CSSProperties = {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '0.4rem',
  };

  const cardDescStyle: React.CSSProperties = {
    color: 'var(--rl-demo-text-muted)',
    fontSize: '0.85rem',
    lineHeight: 1.5,
    marginBottom: '1.25rem',
    flex: 1,
  };

  const buttonStyle: React.CSSProperties = {
    alignSelf: 'flex-start',
    padding: '0.45rem 0.9rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-sm)',
    color: 'var(--rl-demo-text)',
    fontSize: '0.8rem',
    fontWeight: 500,
    transition: 'all 0.15s',
  };

  return (
    <section id="showcase" style={sectionStyle}>
      <Container size="xl">
        <div style={headerStyle}>
          <h2 style={titleStyle}>Component Showcase</h2>
          <p style={descStyle}>Preview the available loaders in action.</p>
        </div>

        <div style={gridStyle}>
          {loaderList.map((item) => {
            const LoaderComp = item.component;
            return (
              <div key={item.id} style={cardStyle}>
                <div style={previewBoxStyle}>
                  <LoaderComp {...item.defaultProps} size="lg" />
                </div>
                <div style={contentBoxStyle}>
                  <h3 style={cardTitleStyle}>{item.name}</h3>
                  <p style={cardDescStyle}>{item.description}</p>
                  <button
                    type="button"
                    style={buttonStyle}
                    onClick={() => {
                      onSelectLoader(item.id);
                      const el = document.getElementById('playground');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Configure in Playground →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
