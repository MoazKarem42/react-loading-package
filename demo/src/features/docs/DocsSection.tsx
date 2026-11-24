import * as React from 'react';
import { Container } from '@/components/layout/Container';

interface ThemePreset {
  id: string;
  name: string;
  color: string;
  tag: string;
}

const themePresets: ThemePreset[] = [
  { id: 'monochrome', name: 'Vercel Monochrome', color: '#FFFFFF', tag: 'Active' },
  { id: 'blue', name: 'Vercel Blue', color: '#508EFF', tag: '#508EFF' },
  { id: 'amber', name: 'Amber Alert', color: '#E5A623', tag: '#E5A623' },
];

interface ApiPropRow {
  prop: string;
  type: string;
  defaultVal: string;
  description: string;
}

const apiPropsData: ApiPropRow[] = [
  {
    prop: 'size',
    type: 'LoaderSize (string | number)',
    defaultVal: "'md' (24px)",
    description: "Preset ('sm' = 16px, 'md' = 24px, 'lg' = 36px, 'xl' = 48px) or numeric pixel dimension.",
  },
  {
    prop: 'color',
    type: 'string',
    defaultVal: 'var(--rl-primary)',
    description: "Any valid CSS color string or custom property (hex, rgb, hsl, or CSS variable).",
  },
  {
    prop: 'speed',
    type: 'number',
    defaultVal: 'Component default',
    description: 'Animation cycle duration in seconds (e.g. 0.8s).',
  },
  {
    prop: 'thickness',
    type: 'number',
    defaultVal: '3',
    description: 'Stroke thickness in pixels for border/ring SVG loaders.',
  },
  {
    prop: 'label',
    type: 'string',
    defaultVal: "'Loading...'",
    description: 'Screen reader announcement text rendered in an internal .rl-sr-only element.',
  },
  {
    prop: 'animation',
    type: "'shimmer' | 'pulse' | 'none'",
    defaultVal: "'shimmer'",
    description: 'Animation effect applied to skeleton placeholder components.',
  },
];

export const DocsSection: React.FC = () => {
  const [activeThemeId, setActiveThemeId] = React.useState<string>('monochrome');

  const handleSelectTheme = (preset: ThemePreset) => {
    setActiveThemeId(preset.id);
    const rootEl = document.documentElement;
    if (preset.id === 'blue') {
      rootEl.style.setProperty('--rl-primary', '#508EFF');
      rootEl.style.setProperty('--rl-skeleton-highlight', '#1e293b');
    } else if (preset.id === 'amber') {
      rootEl.style.setProperty('--rl-primary', '#E5A623');
      rootEl.style.setProperty('--rl-skeleton-highlight', '#2e2010');
    } else {
      rootEl.style.setProperty('--rl-primary', '#FFFFFF');
      rootEl.style.setProperty('--rl-skeleton-highlight', '#282828');
    }
  };

  const sectionStyle: React.CSSProperties = {
    padding: '64px 0',
    backgroundColor: 'var(--rl-demo-bg)',
    borderBottom: '1px solid var(--rl-demo-border)',
  };

  const metricGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  };

  const metricCardStyle: React.CSSProperties = {
    backgroundColor: 'var(--rl-demo-surface)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-lg)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const metricTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '20px',
    color: 'var(--rl-demo-text)',
  };

  const metricDescStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-sans)',
    fontSize: '13px',
    lineHeight: '18px',
    color: 'var(--rl-demo-text-muted)',
  };

  const themingCardStyle: React.CSSProperties = {
    backgroundColor: 'var(--rl-demo-surface)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-lg)',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    marginBottom: '64px',
  };

  const themingHeaderStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  const themingTitleRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const themingSplitStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    alignItems: 'center',
  };

  const codeBoxStyle: React.CSSProperties = {
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-sm)',
    padding: '16px',
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '12px',
    lineHeight: '19.5px',
    overflowX: 'auto',
  };

  const presetListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const getPresetBtnStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderRadius: 'var(--rl-demo-radius-sm)',
    backgroundColor: isActive ? 'var(--rl-demo-surface-active)' : 'var(--rl-demo-surface-elevated)',
    border: isActive ? '1px solid var(--rl-demo-primary)' : '1px solid var(--rl-demo-border)',
    color: 'var(--rl-demo-text)',
    transition: 'all 0.15s ease',
  });

  //Table Styles
  const tableFrameStyle: React.CSSProperties = {
    backgroundColor: 'var(--rl-demo-surface)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-lg)',
    boxShadow: 'var(--rl-demo-shadow-sm)',
    overflowX: 'auto',
    marginTop: '24px',
  };

  const tableHeaderColStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-sans)',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--rl-demo-text-muted)',
    padding: '14px 16px',
    textAlign: 'left',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    borderBottom: '1px solid var(--rl-demo-border)',
  };

  const tableCellColStyle: React.CSSProperties = {
    padding: '14px 16px',
    borderTop: '1px solid var(--rl-demo-border)',
    verticalAlign: 'middle',
  };

  return (
    <>
      {/*Section - WHY REACT-LOADING-KIT & THEMING*/}
      <section style={sectionStyle}>
        <Container size="xl">
          <div style={metricGridStyle}>
            <div style={metricCardStyle}>
              <div style={metricTitleStyle}>0 Dependencies</div>
              <p style={metricDescStyle}>
                Zero runtime packages for ultimate supply chain security and immediate cold-starts.
              </p>
            </div>
            <div style={metricCardStyle}>
              <div style={metricTitleStyle}>&lt; 4KB Gzipped</div>
              <p style={metricDescStyle}>
                Modular tree-shakeable ESM exports. You only ship the exact loader styles used.
              </p>
            </div>
            <div style={metricCardStyle}>
              <div style={metricTitleStyle}>Next.js &amp; SSR Ready</div>
              <p style={metricDescStyle}>
                Zero hydration flicker or client layout shifts. Compatible with React Server Components.
              </p>
            </div>
            <div style={metricCardStyle}>
              <div style={metricTitleStyle}>WAI-ARIA Compliant</div>
              <p style={metricDescStyle}>
                Pre-wired with polite live-regions, <code style={{ fontFamily: 'var(--rl-demo-font-mono)' }}>role=&quot;status&quot;</code>, and customizable screen reader labels.
              </p>
            </div>
          </div>

          <div style={themingCardStyle}>
            <div style={themingHeaderStyle}>
              <div style={themingTitleRowStyle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--rl-demo-accent)" strokeWidth="2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                <h3
                  style={{
                    fontFamily: 'var(--rl-demo-font-sans)',
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: '32px',
                    letterSpacing: '-0.025em',
                    color: 'var(--rl-demo-text)',
                  }}
                >
                  Global CSS Custom Properties
                </h3>
              </div>
              <p style={{ fontFamily: 'var(--rl-demo-font-sans)', fontSize: '13px', color: 'var(--rl-demo-text-muted)' }}>
                Seamlessly override design tokens at the document or container root.
              </p>
            </div>

            <div style={themingSplitStyle}>
              {/*Code Definition*/}
              <div style={codeBoxStyle}>
                <span style={{ color: 'var(--rl-demo-text-muted)' }}>:root &#123;{'\n'}</span>
                <span style={{ color: 'var(--rl-demo-accent)' }}>  --rl-primary</span>
                <span style={{ color: 'var(--rl-demo-text-secondary)' }}>: </span>
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>#FFFFFF</span>
                <span style={{ color: 'var(--rl-demo-text-secondary)' }}>;{'\n'}</span>
                <span style={{ color: 'var(--rl-demo-accent)' }}>  --rl-skeleton-base</span>
                <span style={{ color: 'var(--rl-demo-text-secondary)' }}>: </span>
                <span style={{ color: 'var(--rl-demo-text-dim)', fontWeight: 700 }}>#161616</span>
                <span style={{ color: 'var(--rl-demo-text-secondary)' }}>;{'\n'}</span>
                <span style={{ color: 'var(--rl-demo-accent)' }}>  --rl-skeleton-highlight</span>
                <span style={{ color: 'var(--rl-demo-text-secondary)' }}>: </span>
                <span style={{ color: 'var(--rl-demo-text-dim)', fontWeight: 700 }}>#282828</span>
                <span style={{ color: 'var(--rl-demo-text-secondary)' }}>;{'\n'}</span>
                <span style={{ color: 'var(--rl-demo-accent)' }}>  --rl-speed</span>
                <span style={{ color: 'var(--rl-demo-text-secondary)' }}>: </span>
                <span style={{ color: 'var(--rl-demo-accent-ice)', fontWeight: 700 }}>0.8s</span>
                <span style={{ color: 'var(--rl-demo-text-secondary)' }}>;{'\n'}</span>
                <span style={{ color: 'var(--rl-demo-text-muted)' }}>&#125;</span>
              </div>

              {/*Theme Switcher*/}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--rl-demo-font-sans)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--rl-demo-text-muted)',
                    marginBottom: '8px',
                  }}
                >
                  CHOOSE PRESET
                </div>
                <div style={presetListStyle}>
                  {themePresets.map((preset) => {
                    const isActive = activeThemeId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        style={getPresetBtnStyle(isActive)}
                        onClick={() => handleSelectTheme(preset)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              backgroundColor: preset.color,
                            }}
                          />
                          <span style={{ fontFamily: 'var(--rl-demo-font-sans)', fontSize: '13px', fontWeight: 500 }}>
                            {preset.name}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--rl-demo-font-mono)',
                            fontSize: '12px',
                            color: 'var(--rl-demo-text-muted)',
                          }}
                        >
                          {preset.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/*Section - API REFERENCE TABLE*/}
      <section id="api" style={sectionStyle}>
        <Container size="xl">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h2
              style={{
                fontFamily: 'var(--rl-demo-font-sans)',
                fontSize: '32px',
                fontWeight: 600,
                lineHeight: '40px',
                letterSpacing: '-0.025em',
                color: 'var(--rl-demo-text)',
              }}
            >
              API Reference
            </h2>
            <p
              style={{
                fontFamily: 'var(--rl-demo-font-sans)',
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '-0.005em',
                color: 'var(--rl-demo-text-muted)',
              }}
            >
              Core loader props accepted by Spinner, Ring, Dots, and skeleton primitives.
            </p>
          </div>

          <div style={tableFrameStyle}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={tableHeaderColStyle}>PROP</th>
                  <th style={tableHeaderColStyle}>TYPE</th>
                  <th style={tableHeaderColStyle}>DEFAULT</th>
                  <th style={tableHeaderColStyle}>DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {apiPropsData.map((row) => (
                  <tr key={row.prop}>
                    <td style={tableCellColStyle}>
                      <code
                        style={{
                          fontFamily: 'var(--rl-demo-font-mono)',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: 'var(--rl-demo-text)',
                        }}
                      >
                        {row.prop}
                      </code>
                    </td>
                    <td style={tableCellColStyle}>
                      <span
                        style={{
                          padding: '1px 8px',
                          backgroundColor: 'var(--rl-demo-surface-elevated)',
                          border: '1px solid var(--rl-demo-border)',
                          borderRadius: 'var(--rl-demo-radius-xs)',
                          fontFamily: 'var(--rl-demo-font-mono)',
                          fontSize: '12px',
                          color: 'var(--rl-demo-accent)',
                        }}
                      >
                        {row.type}
                      </span>
                    </td>
                    <td style={tableCellColStyle}>
                      <span
                        style={{
                          fontFamily: 'var(--rl-demo-font-mono)',
                          fontSize: '12px',
                          color: 'var(--rl-demo-text-muted)',
                        }}
                      >
                        {row.defaultVal}
                      </span>
                    </td>
                    <td style={tableCellColStyle}>
                      <span
                        style={{
                          fontFamily: 'var(--rl-demo-font-sans)',
                          fontSize: '13px',
                          lineHeight: '18px',
                          color: 'var(--rl-demo-text-dim)',
                        }}
                      >
                        {row.description}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
};
