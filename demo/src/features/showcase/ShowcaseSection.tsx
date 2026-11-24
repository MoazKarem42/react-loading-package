import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { Spinner } from 'react-loading-kit';
import { loaderList } from '@/registry/loaders';
import { skeletonList } from '@/registry/skeletons';

export interface ShowcaseSectionProps {
  onSelectLoader: (id: string) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ onSelectLoader }) => {
  const [simulationMode, setSimulationMode] = React.useState<'overlay' | 'skeleton'>('overlay');
  const [isSimulating, setIsSimulating] = React.useState<boolean>(false);
  const [showAllLoaders, setShowAllLoaders] = React.useState<boolean>(false);
  const [showAllSkeletons, setShowAllSkeletons] = React.useState<boolean>(false);

  const INITIAL_DISPLAY_COUNT = 6;
  const displayedLoaders = showAllLoaders ? loaderList : loaderList.slice(0, INITIAL_DISPLAY_COUNT);
  const displayedSkeletons = showAllSkeletons ? skeletonList : skeletonList.slice(0, INITIAL_DISPLAY_COUNT);

  const handleSimulate = () => {
    if (isSimulating) {
      return;
    }
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 2000);
  };

  const handleInspect = (id: string) => {
    onSelectLoader(id);
    const playgroundEl = document.getElementById('playground');
    if (playgroundEl) {
      playgroundEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionStyle: React.CSSProperties = {
    padding: '64px 0',
    backgroundColor: 'var(--rl-demo-bg)',
    borderBottom: '1px solid var(--rl-demo-border)',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  };

  const tagStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '12px',
    color: 'var(--rl-demo-accent)',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-sans)',
    fontSize: '32px',
    fontWeight: 600,
    lineHeight: '40px',
    letterSpacing: '-0.025em',
    color: 'var(--rl-demo-text)',
  };

  const descStyle: React.CSSProperties = {
    fontFamily: 'var(--rl-demo-font-sans)',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '-0.005em',
    color: 'var(--rl-demo-text-muted)',
    maxWidth: '768px',
  };

  const simulationGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px',
    marginBottom: '64px',
  };

  const cardContainerStyle: React.CSSProperties = {
    backgroundColor: 'var(--rl-demo-surface)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-lg)',
    padding: '24px',
    boxShadow: 'var(--rl-demo-shadow-md)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const cardHeaderRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--rl-demo-border)',
  };

  const modePillWrapperStyle: React.CSSProperties = {
    display: 'flex',
    padding: '2px',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-sm)',
  };

  const getModeBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '4px 10px',
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '12px',
    borderRadius: 'var(--rl-demo-radius-xs)',
    backgroundColor: active ? 'var(--rl-demo-surface-active)' : 'transparent',
    color: active ? 'var(--rl-demo-text)' : 'var(--rl-demo-text-muted)',
    fontWeight: active ? 500 : 400,
    transition: 'all 0.15s ease',
  });

  const contentCardBoxStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-sm)',
    padding: '24px',
    minHeight: '190px',
    overflow: 'hidden',
  };

  const simulateBottomRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '4px',
  };

  const simulateBtnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 16px',
    height: '36px',
    backgroundColor: isSimulating ? 'var(--rl-demo-surface-active)' : 'var(--rl-demo-primary)',
    color: isSimulating ? 'var(--rl-demo-text-dim)' : 'var(--rl-demo-text-dark)',
    fontFamily: 'var(--rl-demo-font-sans)',
    fontWeight: 500,
    fontSize: '14px',
    borderRadius: 'var(--rl-demo-radius-sm)',
    transition: 'all 0.15s ease',
  };

  //Bento Grid Styles
  const bentoGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '16px',
  };

  const bentoCardStyle: React.CSSProperties = {
    backgroundColor: 'var(--rl-demo-surface)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-lg)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '192px',
    transition: 'border-color 0.15s ease',
  };

  const bentoStageStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: '100px',
  };

  const bentoBottomStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '12px',
    borderTop: '1px solid var(--rl-demo-border)',
  };

  const toggleBtnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 20px',
    backgroundColor: 'var(--rl-demo-surface-elevated)',
    border: '1px solid var(--rl-demo-border)',
    borderRadius: 'var(--rl-demo-radius-sm)',
    color: 'var(--rl-demo-text)',
    fontFamily: 'var(--rl-demo-font-mono)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  };

  return (
    <>
      {/*Section - REAL-WORLD useLoading DEMO SECTION*/}
      <section id="simulation" style={sectionStyle}>
        <Container size="xl">
          <div style={headerStyle}>
            <span style={tagStyle}>Scoped State Machine</span>
            <h2 style={titleStyle}>Scoped State Management with useLoading</h2>
            <p style={descStyle}>
              Eliminate boolean hell with named async loading scopes and automatic error handling. Keep user feedback
              localized without triggering global tree re-renders.
            </p>
          </div>

          <div style={simulationGridStyle}>
            {/*Left Column: Simulation Card*/}
            <div style={cardContainerStyle}>
              <div style={cardHeaderRowStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--rl-demo-accent)',
                      animation: isSimulating ? 'rl-pulse 1s infinite' : 'none',
                    }}
                  />
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
                    LIVE COMPONENT SCOPE
                  </span>
                </div>

                <div style={modePillWrapperStyle}>
                  <button
                    type="button"
                    style={getModeBtnStyle(simulationMode === 'overlay')}
                    onClick={() => setSimulationMode('overlay')}
                  >
                    Overlay
                  </button>
                  <button
                    type="button"
                    style={getModeBtnStyle(simulationMode === 'skeleton')}
                    onClick={() => setSimulationMode('skeleton')}
                  >
                    Skeleton
                  </button>
                </div>
              </div>

              {/*Body of Simulation Card*/}
              <div style={contentCardBoxStyle}>
                {isSimulating && simulationMode === 'skeleton' ? (
                  /*Skeleton mode active*/
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '12px',
                          backgroundColor: '#212121',
                        }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                        <div style={{ width: '40%', height: '14px', backgroundColor: '#212121', borderRadius: '2px' }} />
                        <div style={{ width: '60%', height: '12px', backgroundColor: '#212121', borderRadius: '2px' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', paddingTop: '8px', borderTop: '1px solid var(--rl-demo-border)' }}>
                      <div style={{ flex: 1, height: '36px', backgroundColor: '#212121', borderRadius: '4px' }} />
                      <div style={{ flex: 1, height: '36px', backgroundColor: '#212121', borderRadius: '4px' }} />
                      <div style={{ flex: 1, height: '36px', backgroundColor: '#212121', borderRadius: '4px' }} />
                    </div>
                  </div>
                ) : (
                  /*Normal state or Overlay state*/
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div
                          style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '12px',
                            backgroundColor: 'var(--rl-demo-surface-pill)',
                            border: '1px solid var(--rl-demo-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--rl-demo-font-mono)',
                            fontWeight: 500,
                            fontSize: '13px',
                            color: 'var(--rl-demo-text)',
                          }}
                        >
                          AC
                        </div>
                        <div>
                          <h3
                            style={{
                              fontFamily: 'var(--rl-demo-font-sans)',
                              fontSize: '18px',
                              fontWeight: 500,
                              lineHeight: '26px',
                              letterSpacing: '-0.025em',
                              color: 'var(--rl-demo-text)',
                            }}
                          >
                            Alex Chen
                          </h3>
                          <p
                            style={{
                              fontFamily: 'var(--rl-demo-font-sans)',
                              fontSize: '13px',
                              lineHeight: '18px',
                              color: 'var(--rl-demo-text-muted)',
                            }}
                          >
                            Staff Frontend Engineer
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          paddingTop: '8px',
                          borderTop: '1px solid var(--rl-demo-border)',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '13px', color: 'var(--rl-demo-text-muted)' }}>Deployments</div>
                          <div style={{ fontFamily: 'var(--rl-demo-font-mono)', fontSize: '13px', color: 'var(--rl-demo-text)', fontWeight: 500 }}>
                            1,428
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', color: 'var(--rl-demo-text-muted)' }}>Latency</div>
                          <div style={{ fontFamily: 'var(--rl-demo-font-mono)', fontSize: '13px', color: 'var(--rl-demo-text)', fontWeight: 500 }}>
                            18ms
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', color: 'var(--rl-demo-text-muted)' }}>Region</div>
                          <div style={{ fontFamily: 'var(--rl-demo-font-mono)', fontSize: '13px', color: 'var(--rl-demo-text)', fontWeight: 500 }}>
                            iad1
                          </div>
                        </div>
                      </div>
                    </div>

                    {isSimulating && simulationMode === 'overlay' && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(14, 14, 14, 0.75)',
                          backdropFilter: 'blur(4px)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                        }}
                      >
                        <Spinner size="md" color="#AEC6FF" />
                        <span style={{ fontSize: '13px', color: '#FFFFFF', fontFamily: 'var(--rl-demo-font-mono)' }}>
                          Syncing profile...
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/*Bottom Trigger Bar*/}
              <div style={simulateBottomRowStyle}>
                <span style={{ fontFamily: 'var(--rl-demo-font-mono)', fontSize: '12px', color: 'var(--rl-demo-text-muted)' }}>
                  State: {isSimulating ? 'Loading... (profile scope)' : 'Idle (profile scope)'}
                </span>

                <button
                  type="button"
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  style={simulateBtnStyle}
                >
                  <svg width="10" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Simulate API Call (2s)</span>
                </button>
              </div>
            </div>

            {/*Right Column: Code Implementation*/}
            <div style={cardContainerStyle}>
              <div style={cardHeaderRowStyle}>
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
                  IMPLEMENTATION
                </span>
                <span
                  style={{
                    fontFamily: 'var(--rl-demo-font-mono)',
                    fontSize: '12px',
                    color: 'var(--rl-demo-accent)',
                  }}
                >
                  useLoading.tsx
                </span>
              </div>

              <pre
                style={{
                  fontFamily: 'var(--rl-demo-font-mono)',
                  fontSize: '12px',
                  lineHeight: '19.5px',
                  color: 'var(--rl-demo-text-secondary)',
                  overflowX: 'auto',
                  flex: 1,
                  margin: 0,
                }}
              >
                <code>
                  <span style={{ color: 'var(--rl-demo-accent)' }}>import </span>
                  <span style={{ color: 'var(--rl-demo-text-secondary)' }}>&#123; useLoading, LoadingOverlay &#125; </span>
                  <span style={{ color: 'var(--rl-demo-accent)' }}>from </span>
                  <span style={{ color: 'var(--rl-demo-text-dim)' }}>'react-loading-kit'</span>
                  {';\n\n'}
                  <span style={{ color: 'var(--rl-demo-accent)' }}>export function </span>
                  <span style={{ color: '#FFFFFF' }}>UserProfile</span>
                  {'() {\n'}
                  <span style={{ color: 'var(--rl-demo-text-muted)' }}>  // Scoped hook with auto-cleanup & race condition shield{'\n'}</span>
                  <span style={{ color: 'var(--rl-demo-accent)' }}>  const </span>
                  {' { isLoading, withLoading } = '}
                  <span style={{ color: '#FFFFFF' }}>useLoading</span>
                  (<span style={{ color: 'var(--rl-demo-text-dim)' }}>'profile'</span>
                  {');\n\n'}
                  <span style={{ color: 'var(--rl-demo-accent)' }}>  const </span>
                  {'handleRefresh = '}
                  <span style={{ color: 'var(--rl-demo-accent)' }}>async </span>
                  {'() => {\n'}
                  <span style={{ color: 'var(--rl-demo-accent)' }}>    await </span>
                  {'withLoading('}
                  <span style={{ color: 'var(--rl-demo-accent)' }}>async </span>
                  {'() => {\n'}
                  <span style={{ color: 'var(--rl-demo-accent)' }}>      await </span>
                  {'fetchUserData();\n'}
                  {'    });\n'}
                  {'  };\n\n'}
                  <span style={{ color: 'var(--rl-demo-accent)' }}>  return </span>
                  {'(\n'}
                  {'    <LoadingOverlay active={isLoading} text="Syncing profile...">\n'}
                  {'      <ProfileCard onRefresh={handleRefresh} />\n'}
                  {'    </LoadingOverlay>\n'}
                  {'  );\n'}
                  {'}'}
                </code>
              </pre>

              <div
                style={{
                  backgroundColor: 'var(--rl-demo-surface-elevated)',
                  border: '1px solid var(--rl-demo-border)',
                  borderRadius: 'var(--rl-demo-radius-sm)',
                  padding: '12px',
                  fontFamily: 'var(--rl-demo-font-sans)',
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: 'var(--rl-demo-text-dim)',
                }}
              >
                <strong style={{ color: 'var(--rl-demo-text)' }}>Why it matters:</strong>{' '}
                <code style={{ fontFamily: 'var(--rl-demo-font-mono)', color: 'var(--rl-demo-accent)' }}>withLoading</code>{' '}
                wraps asynchronous promises directly. Even if the promise rejects, the loading state safely resets
                without needing manual <code style={{ fontFamily: 'var(--rl-demo-font-mono)' }}>finally &#123;&#125;</code> blocks.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/*Section - LOADERS SHOWCASE*/}
      <section id="components" style={sectionStyle}>
        <Container size="xl">
          <div style={headerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={titleStyle}>Loaders</h2>
              <span
                style={{
                  padding: '2px 8px',
                  backgroundColor: 'var(--rl-demo-surface-active)',
                  border: '1px solid var(--rl-demo-border)',
                  borderRadius: '12px',
                  fontFamily: 'var(--rl-demo-font-mono)',
                  fontSize: '12px',
                  color: 'var(--rl-demo-accent)',
                }}
              >
                {loaderList.length} components
              </span>
            </div>
            <p style={descStyle}>Interactive, zero-dependency CSS and SVG loading indicators with customizable geometry and timing.</p>
          </div>

          <div style={bentoGridStyle}>
            {displayedLoaders.map((item) => {
              const Comp = item.component;
              return (
                <div key={item.id} style={bentoCardStyle}>
                  <div style={bentoStageStyle}>
                    <Comp {...item.defaultProps} />
                  </div>

                  <div style={bentoBottomStyle}>
                    <span
                      style={{
                        fontFamily: 'var(--rl-demo-font-mono)',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--rl-demo-text)',
                      }}
                    >
                      &lt;{item.name} /&gt;
                    </span>

                    <button
                      type="button"
                      onClick={() => handleInspect(item.id)}
                      style={{
                        fontFamily: 'var(--rl-demo-font-sans)',
                        fontSize: '13px',
                        color: 'var(--rl-demo-text-muted)',
                        transition: 'color 0.15s ease',
                      }}
                    >
                      Inspect →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {loaderList.length > INITIAL_DISPLAY_COUNT && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
              <button
                type="button"
                onClick={() => setShowAllLoaders((prev) => !prev)}
                style={toggleBtnStyle}
              >
                {showAllLoaders ? 'Show Less' : `Show More (${loaderList.length - INITIAL_DISPLAY_COUNT} more)`}
              </button>
            </div>
          )}
        </Container>
      </section>

      {/*Section - SKELETONS SHOWCASE*/}
      <section id="skeletons" style={sectionStyle}>
        <Container size="xl">
          <div style={headerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={titleStyle}>Skeletons</h2>
              <span
                style={{
                  padding: '2px 8px',
                  backgroundColor: 'var(--rl-demo-surface-active)',
                  border: '1px solid var(--rl-demo-border)',
                  borderRadius: '12px',
                  fontFamily: 'var(--rl-demo-font-mono)',
                  fontSize: '12px',
                  color: 'var(--rl-demo-accent)',
                }}
              >
                {skeletonList.length} components
              </span>
            </div>
            <p style={descStyle}>Composable skeleton placeholders with shimmer effects and adaptive content layouts.</p>
          </div>

          {skeletonList.length === 0 ? (
            <div
              style={{
                backgroundColor: 'var(--rl-demo-surface)',
                border: '1px dashed var(--rl-demo-border)',
                borderRadius: 'var(--rl-demo-radius-lg)',
                padding: '48px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--rl-demo-surface-elevated)',
                  border: '1px solid var(--rl-demo-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--rl-demo-accent)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--rl-demo-font-sans)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--rl-demo-text)',
                  margin: 0,
                }}
              >
                Skeletons suite loading...
              </h3>
              <p
                style={{
                  fontFamily: 'var(--rl-demo-font-sans)',
                  fontSize: '13px',
                  color: 'var(--rl-demo-text-muted)',
                  maxWidth: '420px',
                  margin: 0,
                  lineHeight: '20px',
                }}
              >
                Zero-dependency adaptive skeleton placeholders (Text, Card, Avatar, and Rectangle) are coming next in Phase 3.
              </p>
            </div>
          ) : (
            <>
              <div style={bentoGridStyle}>
                {displayedSkeletons.map((item) => {
                  const Comp = item.component;
                  return (
                    <div key={item.id} style={bentoCardStyle}>
                      <div style={{ ...bentoStageStyle, width: '100%', boxSizing: 'border-box', padding: '16px' }}>
                        <Comp {...item.defaultProps} />
                      </div>

                      <div style={bentoBottomStyle}>
                        <span
                          style={{
                            fontFamily: 'var(--rl-demo-font-mono)',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: 'var(--rl-demo-text)',
                          }}
                        >
                          &lt;{item.name} /&gt;
                        </span>

                        <button
                          type="button"
                          onClick={() => handleInspect(item.id)}
                          style={{
                            fontFamily: 'var(--rl-demo-font-sans)',
                            fontSize: '13px',
                            color: 'var(--rl-demo-text-muted)',
                            transition: 'color 0.15s ease',
                          }}
                        >
                          Inspect →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {skeletonList.length > INITIAL_DISPLAY_COUNT && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAllSkeletons((prev) => !prev)}
                    style={toggleBtnStyle}
                  >
                    {showAllSkeletons ? 'Show Less' : `Show More (${skeletonList.length - INITIAL_DISPLAY_COUNT} more)`}
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
};
