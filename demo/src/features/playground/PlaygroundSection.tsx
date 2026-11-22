import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PlaygroundPreview } from './PlaygroundPreview';
import { PlaygroundControls } from './PlaygroundControls';
import { loaderRegistry, loaderList } from '@/registry/loaders';
import type { LoaderId } from '@/registry/types';

export interface PlaygroundSectionProps {
  activeId: LoaderId;
  onSelectId: (id: LoaderId) => void;
}

export const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({
  activeId,
  onSelectId,
}) => {
  const currentItem = loaderRegistry[activeId] || loaderRegistry.spinner;
  const [propsState, setPropsState] = React.useState<Record<string, any>>(currentItem.defaultProps);

  // Sync default props when activeId changes
  React.useEffect(() => {
    setPropsState(currentItem.defaultProps);
  }, [activeId]);

  const handlePropChange = (name: string, value: any) => {
    setPropsState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setPropsState(currentItem.defaultProps);
  };

  const codeSnippet = currentItem.generateSnippet(propsState);

  const sectionStyle: React.CSSProperties = {
    padding: '4rem 0',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '2rem',
  };

  const tabsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    borderBottom: '1px solid var(--rl-demo-border)',
    paddingBottom: '0.5rem',
  };

  const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.45rem 1rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    borderRadius: 'var(--rl-demo-radius-sm)',
    backgroundColor: isActive ? 'var(--rl-demo-surface-elevated)' : 'transparent',
    color: isActive ? 'var(--rl-demo-text)' : 'var(--rl-demo-text-muted)',
    border: isActive ? '1px solid var(--rl-demo-border)' : '1px solid transparent',
    transition: 'all 0.15s ease',
  });

  const layoutGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
    gap: '1.5rem',
    alignItems: 'start',
  };

  return (
    <section id="playground" style={sectionStyle}>
      <Container size="xl">
        <div style={headerStyle}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Interactive Playground
          </h2>
          <p style={{ color: 'var(--rl-demo-text-muted)', fontSize: '0.95rem' }}>
            Customize loader properties in real-time and export copy-pasteable code snippets.
          </p>
        </div>

        <div style={tabsStyle}>
          {loaderList.map((item) => (
            <button
              key={item.id}
              type="button"
              style={tabButtonStyle(item.id === activeId)}
              onClick={() => onSelectId(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div style={layoutGridStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <PlaygroundPreview item={currentItem} props={propsState} />
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--rl-demo-text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                LIVE USAGE SNIPPET
              </span>
              <CodeBlock code={codeSnippet} language="tsx" />
            </div>
          </div>

          <div>
            <PlaygroundControls
              controls={currentItem.controls}
              values={propsState}
              onChange={handlePropChange}
              onReset={handleReset}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
