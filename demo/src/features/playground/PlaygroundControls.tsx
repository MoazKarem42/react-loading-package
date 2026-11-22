import * as React from 'react';
import type { LoaderControlConfig } from '@/registry/types';

export interface PlaygroundControlsProps {
  controls: LoaderControlConfig[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onReset: () => void;
}

export const PlaygroundControls: React.FC<PlaygroundControlsProps> = ({
  controls,
  values,
  onChange,
  onReset,
}) => {
  const panelStyle: React.CSSProperties = {
    backgroundColor: 'var(--rl-demo-surface)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-lg)',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid var(--rl-demo-border)',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--rl-demo-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.35rem',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.45rem 0.65rem',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-sm)',
    color: 'var(--rl-demo-text)',
    fontSize: '0.85rem',
  };

  const resetBtnStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--rl-demo-text-muted)',
    textDecoration: 'underline',
  };

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Props & Controls</span>
        <button type="button" onClick={onReset} style={resetBtnStyle}>
          Reset defaults
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {controls.map((control) => {
          const val = values[control.name] ?? control.defaultValue;

          if (control.type === 'select') {
            return (
              <div key={control.name}>
                <label style={labelStyle}>{control.label}</label>
                <select
                  value={val}
                  onChange={(e) => onChange(control.name, e.target.value)}
                  style={inputStyle}
                >
                  {control.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (control.type === 'color') {
            return (
              <div key={control.name}>
                <label style={labelStyle}>{control.label}</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={val}
                    onChange={(e) => onChange(control.name, e.target.value)}
                    style={{
                      width: '36px',
                      height: '36px',
                      padding: '2px',
                      borderRadius: 'var(--rl-demo-radius-sm)',
                      border: '1px solid var(--rl-demo-border)',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                    }}
                  />
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => onChange(control.name, e.target.value)}
                    style={{ ...inputStyle, flex: 1 }}
                  />
                </div>
              </div>
            );
          }

          if (control.type === 'number') {
            return (
              <div key={control.name}>
                <div style={labelStyle}>
                  <span>{control.label}</span>
                  <span style={{ color: 'var(--rl-demo-text)' }}>
                    {val}
                    {control.unit || ''}
                  </span>
                </div>
                <input
                  type="range"
                  min={control.min ?? 0}
                  max={control.max ?? 100}
                  step={control.step ?? 1}
                  value={val}
                  onChange={(e) => onChange(control.name, parseFloat(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>
            );
          }

          if (control.type === 'text') {
            return (
              <div key={control.name}>
                <label style={labelStyle}>{control.label}</label>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => onChange(control.name, e.target.value)}
                  style={inputStyle}
                />
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};
