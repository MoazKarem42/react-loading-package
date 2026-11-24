import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { CopyButton } from '@/components/ui/CopyButton';
import { PlaygroundPreview } from './PlaygroundPreview';
import { PlaygroundControls } from './PlaygroundControls';
import { loaderRegistry, loaderList } from '@/registry/loaders';
import { skeletonRegistry, skeletonList } from '@/registry/skeletons';
import type { LoaderId, LoaderCategory } from '@/registry/types';

export interface PlaygroundSectionProps {
  activeId: string;
  onSelectId: (id: string) => void;
}

export const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({
  activeId,
  onSelectId,
}) => {
  const currentItem = loaderRegistry[activeId as LoaderId] || skeletonRegistry[activeId] || loaderRegistry.spinner;
  const [propsState, setPropsState] = React.useState<Record<string, unknown>>(currentItem.defaultProps);
  const [backgroundMode, setBackgroundMode] = React.useState<'dark' | 'light'>('dark');
  const [replayKey, setReplayKey] = React.useState<number>(0);

  //Sync default props when activeId changes
  React.useEffect(() => {
    setPropsState(currentItem.defaultProps);
  }, [currentItem]);

  const handlePropChange = (name: string, value: unknown) => {
    setPropsState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setPropsState(currentItem.defaultProps);
  };

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  const codeSnippet = currentItem.generateSnippet(propsState);

  const sectionStyle: React.CSSProperties = {
    padding: '64px 0',
    backgroundColor: 'var(--rl-demo-bg)',
    borderBottom: '1px solid var(--rl-demo-border)',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const titleRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const workspaceFrameStyle: React.CSSProperties = {
    backgroundColor: 'var(--rl-demo-surface)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-lg)',
    boxShadow: 'var(--rl-demo-shadow-workspace)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  const topToolbarStyle: React.CSSProperties = {
    height: '44px',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    borderBottom: '1px solid var(--rl-demo-border)',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const windowDotsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const toolbarRightStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const themeSwitchStyle: React.CSSProperties = {
    display: 'flex',
    padding: '2px',
    backgroundColor: 'var(--rl-demo-bg)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-sm)',
  };

  const getThemeBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '2px 8px',
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '12px',
    borderRadius: 'var(--rl-demo-radius-xs)',
    backgroundColor: active ? 'var(--rl-demo-surface-active)' : 'transparent',
    color: active ? 'var(--rl-demo-text)' : 'var(--rl-demo-text-muted)',
    fontWeight: active ? 500 : 400,
  });

  const replayBtnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    backgroundColor: 'var(--rl-demo-surface-active)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-xs)',
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '12px',
    color: 'var(--rl-demo-text)',
  };

  //3-Column Grid Layout
  const threeColumnGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '240px 1fr 280px',
    minHeight: '496px',
  };

  const navigatorColStyle: React.CSSProperties = {
    backgroundColor: 'var(--rl-demo-surface)',
    borderRight: '1px solid var(--rl-demo-border)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const categoryLabelStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-sans)',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--rl-demo-text-muted)',
    padding: '0 8px',
    marginBottom: '6px',
  };

  const navListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  };

  const getNavBtnStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '6px 10px',
    borderRadius: 'var(--rl-demo-radius-sm)',
    backgroundColor: isActive ? 'var(--rl-demo-surface-pill)' : 'transparent',
    color: isActive ? 'var(--rl-demo-text)' : 'var(--rl-demo-text-dim)',
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '13px',
    lineHeight: '18px',
    textAlign: 'left',
    transition: 'all 0.15s ease',
  });

  const bottomDrawerStyle: React.CSSProperties = {
    backgroundColor: 'var(--rl-demo-bg)',
    borderTop: '1px solid var(--rl-demo-border)',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    overflowX: 'auto',
  };

  const categories: { label: string; key: LoaderCategory }[] = [
    { label: 'LOADERS', key: 'loaders' },
    { label: 'SKELETONS', key: 'skeletons' },
  ];

  const getCategoryItems = (catKey: LoaderCategory) => {
    if (catKey === 'loaders') {
      return loaderList;
    }
    if (catKey === 'skeletons') {
      return skeletonList;
    }
    return [];
  };

  return (
    <section id="playground" style={sectionStyle}>
      <Container size="xl">
        <div style={headerStyle}>
          <div style={titleRowStyle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--rl-demo-accent)" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
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
              Interactive Playground
            </h2>
          </div>
          <p
            style={{
              fontFamily: 'var(--rl-demo-font-sans)',
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.005em',
              color: 'var(--rl-demo-text-muted)',
            }}
          >
            Real-time state modification, geometry adjustments, and dynamic code generation.
          </p>
        </div>

        <div style={workspaceFrameStyle}>
          {/*Top Toolbar*/}
          <div style={topToolbarStyle}>
            <div style={windowDotsStyle}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(255, 180, 171, 0.7)' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(216, 226, 255, 0.5)' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.4)' }} />
              <span
                style={{
                  marginLeft: '8px',
                  fontFamily: 'var(--rl-demo-font-mono)',
                  fontSize: '12px',
                  color: 'var(--rl-demo-text-muted)',
                }}
              >
                playground.workspace
              </span>
            </div>

            <div style={toolbarRightStyle}>
              <div style={themeSwitchStyle}>
                <button
                  type="button"
                  style={getThemeBtnStyle(backgroundMode === 'dark')}
                  onClick={() => setBackgroundMode('dark')}
                >
                  Dark
                </button>
                <button
                  type="button"
                  style={getThemeBtnStyle(backgroundMode === 'light')}
                  onClick={() => setBackgroundMode('light')}
                >
                  Light
                </button>
              </div>

              <button type="button" onClick={handleReplay} style={replayBtnStyle} title="Replay Animation">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                <span>Replay</span>
              </button>
            </div>
          </div>

          {/*3-Column Workspace*/}
          <div style={threeColumnGridStyle}>
            {/*Col 1: Navigator*/}
            <div style={navigatorColStyle}>
              {categories.map((cat) => {
                const items = getCategoryItems(cat.key);
                return (
                  <div key={cat.key}>
                    <div style={categoryLabelStyle}>{cat.label}</div>
                    <div style={navListStyle}>
                      {items.length === 0 ? (
                        <div
                          style={{
                            padding: '6px 10px',
                            fontSize: '12px',
                            fontFamily: 'var(--rl-demo-font-sans)',
                            color: 'var(--rl-demo-text-dim)',
                            fontStyle: 'italic',
                          }}
                        >
                          0 components
                        </div>
                      ) : (
                        items.map((item) => {
                          const isActive = item.id === activeId;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              style={getNavBtnStyle(isActive)}
                              onClick={() => onSelectId(item.id)}
                            >
                              <span>{item.name}</span>
                              {isActive && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="9 18 15 12 9 6" />
                                </svg>
                              )}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/*Col 2: Canvas Stage*/}
            <PlaygroundPreview
              item={currentItem}
              props={propsState}
              backgroundMode={backgroundMode}
              replayKey={replayKey}
            />

            {/*Col 3: Props Inspector*/}
            <PlaygroundControls
              controls={currentItem.controls}
              values={propsState}
              onChange={handlePropChange}
              onReset={handleReset}
            />
          </div>

          {/*Bottom Live Code Drawer*/}
          <div style={bottomDrawerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
              <span
                style={{
                  fontFamily: 'var(--rl-demo-font-mono)',
                  fontSize: '12px',
                  color: 'var(--rl-demo-text-muted)',
                }}
              >
                JSX
              </span>
              <code
                style={{
                  fontFamily: 'var(--rl-demo-font-mono)',
                  fontSize: '12px',
                  color: 'var(--rl-demo-accent)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {codeSnippet.split('\n').filter((l) => l.includes('<')).join(' ') || codeSnippet}
              </code>
            </div>

            <CopyButton
              textToCopy={codeSnippet}
              label="Copy Code"
              style={{ flexShrink: 0 }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
