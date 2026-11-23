import * as React from 'react';
import type { LoaderRegistryItem } from '@/registry/types';

export interface PlaygroundPreviewProps {
  item: LoaderRegistryItem;
  props: Record<string, unknown>;
  backgroundMode: 'dark' | 'light';
  replayKey: number;
}

export const PlaygroundPreview: React.FC<PlaygroundPreviewProps> = ({
  item,
  props,
  backgroundMode,
  replayKey,
}) => {
  const Component = item.component;

  const canvasStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '496px',
    backgroundColor: backgroundMode === 'dark' ? 'var(--rl-demo-bg-canvas)' : '#FFFFFF',
    overflow: 'hidden',
    padding: '48px 32px',
  };

  const gridOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(64, 64, 64, 1) 7%, rgba(64, 64, 64, 0) 7%)',
    backgroundSize: '24px 24px',
    opacity: backgroundMode === 'dark' ? 0.2 : 0.08,
    pointerEvents: 'none',
  };

  const telemetryRowStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    right: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    pointerEvents: 'none',
  };

  const telemetryBadgeStyle: React.CSSProperties = {
    padding: '2px 8px',
    backgroundColor: backgroundMode === 'dark' ? 'rgba(31, 31, 31, 0.8)' : 'rgba(240, 240, 240, 0.8)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-xs)',
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '12px',
    lineHeight: '18px',
    color: 'var(--rl-demo-text-muted)',
    backdropFilter: 'blur(8px)',
  };

  return (
    <div style={canvasStyle}>
      <div style={gridOverlayStyle} />

      <div key={replayKey} style={{ zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Component {...props} />
      </div>

      <div style={telemetryRowStyle}>
        <div style={telemetryBadgeStyle}>role=&quot;status&quot;</div>
        <div style={telemetryBadgeStyle}>60fps · CSS engine</div>
      </div>
    </div>
  );
};
