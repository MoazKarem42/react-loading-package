import * as React from 'react';
import type { LoaderRegistryItem } from '@/registry/types';

export interface PlaygroundPreviewProps {
  item: LoaderRegistryItem;
  props: Record<string, unknown>;
}

export const PlaygroundPreview: React.FC<PlaygroundPreviewProps> = ({ item, props }) => {
  const [backgroundMode, setBackgroundMode] = React.useState<'dark' | 'light'>('dark');
  const Component = item.component;

  const containerStyle: React.CSSProperties = {
    backgroundColor: backgroundMode === 'dark' ? 'var(--rl-demo-surface)' : '#ffffff',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-lg)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '360px',
  };

  const topBarStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid var(--rl-demo-border)',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
  };

  const canvasStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2.5rem',
  };

  return (
    <div style={containerStyle}>
      <div style={topBarStyle}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--rl-demo-text)' }}>
          {item.name} Preview
        </span>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button
            type="button"
            onClick={() => setBackgroundMode('dark')}
            style={{
              padding: '0.2rem 0.5rem',
              fontSize: '0.75rem',
              borderRadius: 'var(--rl-demo-radius-sm)',
              backgroundColor: backgroundMode === 'dark' ? 'var(--rl-demo-border)' : 'transparent',
              color: 'var(--rl-demo-text)',
            }}
          >
            Dark
          </button>
          <button
            type="button"
            onClick={() => setBackgroundMode('light')}
            style={{
              padding: '0.2rem 0.5rem',
              fontSize: '0.75rem',
              borderRadius: 'var(--rl-demo-radius-sm)',
              backgroundColor: backgroundMode === 'light' ? 'var(--rl-demo-border)' : 'transparent',
              color: 'var(--rl-demo-text)',
            }}
          >
            Light
          </button>
        </div>
      </div>

      <div style={canvasStyle}>
        <Component {...props} />
      </div>
    </div>
  );
};
