import * as React from 'react';
import type { LoaderControlConfig } from '@/registry/types';

export interface PlaygroundControlsProps {
  controls: LoaderControlConfig[];
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  onReset: () => void;
}

const colorPresets = [
  { label: 'White', value: '#FFFFFF' },
  { label: 'Blue', value: '#508EFF' },
  { label: 'Gray', value: '#8E9192' },
  { label: 'Amber', value: '#E5A623' },
];

export const PlaygroundControls: React.FC<PlaygroundControlsProps> = ({
  controls,
  values,
  onChange,
  onReset,
}) => {
  const panelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    backgroundColor: 'var(--rl-demo-surface)',
    borderLeft: '1px solid var(--rl-demo-border)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '8px',
    borderBottom: '1px solid var(--rl-demo-border)',
  };

  const headerLabelStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-sans)',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--rl-demo-text-muted)',
  };

  const resetBtnStyle: React.CSSProperties = {
    fontSize: '13px',
    fontFamily: 'var(--rl-demo-font-sans)',
    color: 'var(--rl-demo-text-muted)',
    transition: 'color 0.15s ease',
  };

  const propItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const propLabelRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const propLabelStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-sans)',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.04em',
    color: 'var(--rl-demo-text-secondary)',
  };

  const propValReadoutStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '12px',
    color: 'var(--rl-demo-text-muted)',
  };

  const segmentedWrapStyle: React.CSSProperties = {
    display: 'flex',
    padding: '2px',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-sm)',
    gap: '2px',
  };

  const getSegmentBtnStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '4px 0',
    textAlign: 'center',
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '12px',
    borderRadius: 'var(--rl-demo-radius-xs)',
    backgroundColor: active ? 'var(--rl-demo-surface-active)' : 'transparent',
    color: active ? 'var(--rl-demo-text)' : 'var(--rl-demo-text-muted)',
    fontWeight: active ? 500 : 400,
    transition: 'all 0.15s ease',
  });

  const speedPresets = [
    { label: 'Slow', value: 1.6 },
    { label: 'Normal', value: 0.8 },
    { label: 'Fast', value: 0.4 },
  ];

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <span style={headerLabelStyle}>PROPS INSPECTOR</span>
        <button type="button" onClick={onReset} style={resetBtnStyle}>
          Reset
        </button>
      </div>

      {controls.length === 0 && (
        <div style={{ color: 'var(--rl-demo-text-muted)', fontSize: '13px', paddingTop: '12px' }}>
          This component uses responsive default styling.
        </div>
      )}

      {controls.map((control) => {
        const val = values[control.name] ?? control.defaultValue;

        if (control.name === 'size' && control.options) {
          let displaySize = '32px';
          if (val === 'sm') {
            displaySize = '16px';
          } else if (val === 'lg') {
            displaySize = '48px';
          }
          return (
            <div key={control.name} style={propItemStyle}>
              <div style={propLabelRowStyle}>
                <span style={propLabelStyle}>Size</span>
                <span style={propValReadoutStyle}>{displaySize}</span>
              </div>
              <div style={segmentedWrapStyle}>
                {control.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    style={getSegmentBtnStyle(val === opt)}
                    onClick={() => onChange(control.name, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        if (control.type === 'color') {
          const hexVal = String(val ?? '#FFFFFF').toUpperCase();
          return (
            <div key={control.name} style={propItemStyle}>
              <div style={propLabelRowStyle}>
                <span style={propLabelStyle}>{control.label}</span>
                <span style={propValReadoutStyle}>{hexVal}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {colorPresets.map((preset) => {
                    const isSelected = hexVal === preset.value;
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => onChange(control.name, preset.value)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: preset.value,
                          boxShadow: isSelected
                            ? '0 0 0 2px var(--rl-demo-surface), 0 0 0 4px var(--rl-demo-text)'
                            : 'none',
                          transition: 'box-shadow 0.15s ease',
                        }}
                        aria-label={preset.label}
                      />
                    );
                  })}
                </div>
                <input
                  type="text"
                  value={String(val ?? '')}
                  onChange={(e) => onChange(control.name, e.target.value)}
                  style={{
                    width: '96px',
                    height: '28px',
                    padding: '4px 8px',
                    backgroundColor: 'var(--rl-demo-surface-elevated)',
                    border: '1px solid var(--rl-demo-border)',
                    borderRadius: 'var(--rl-demo-radius-xs)',
                    fontFamily: 'var(--rl-demo-font-mono)',
                    fontSize: '12px',
                    color: 'var(--rl-demo-text-secondary)',
                    textAlign: 'center',
                  }}
                />
              </div>
            </div>
          );
        }

        if (control.name === 'speed') {
          const numSpeed = typeof val === 'number' ? val : 0.8;
          return (
            <div key={control.name} style={propItemStyle}>
              <div style={propLabelRowStyle}>
                <span style={propLabelStyle}>Speed</span>
                <span style={propValReadoutStyle}>{numSpeed}s</span>
              </div>
              <div style={segmentedWrapStyle}>
                {speedPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    style={getSegmentBtnStyle(Math.abs(numSpeed - preset.value) < 0.1)}
                    onClick={() => onChange(control.name, preset.value)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        if (control.name === 'thickness') {
          const thickVal = typeof val === 'number' ? val : 3;
          return (
            <div key={control.name} style={propItemStyle}>
              <div style={propLabelRowStyle}>
                <span style={propLabelStyle}>Thickness</span>
                <span style={propValReadoutStyle}>{thickVal}px</span>
              </div>
              <input
                type="range"
                min={control.min || 1}
                max={control.max || 8}
                step={control.step || 0.5}
                value={thickVal}
                onChange={(e) => onChange(control.name, parseFloat(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--rl-demo-accent)',
                  cursor: 'pointer',
                }}
              />
            </div>
          );
        }

        //Default select or text
        if (control.type === 'select' && control.options) {
          return (
            <div key={control.name} style={propItemStyle}>
              <div style={propLabelRowStyle}>
                <span style={propLabelStyle}>{control.label}</span>
                <span style={propValReadoutStyle}>{String(val)}</span>
              </div>
              <div style={segmentedWrapStyle}>
                {control.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    style={getSegmentBtnStyle(String(val) === String(opt))}
                    onClick={() => onChange(control.name, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        return (
          <div key={control.name} style={propItemStyle}>
            <div style={propLabelRowStyle}>
              <span style={propLabelStyle}>{control.label}</span>
            </div>
            <input
              type="text"
              value={String(val ?? '')}
              onChange={(e) => onChange(control.name, e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px',
                backgroundColor: 'var(--rl-demo-surface-elevated)',
                border: '1px solid var(--rl-demo-border)',
                borderRadius: 'var(--rl-demo-radius-xs)',
                fontFamily: 'var(--rl-demo-font-mono)',
                fontSize: '12px',
                color: 'var(--rl-demo-text)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
