import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const DocsSection: React.FC = () => {
  const sectionStyle: React.CSSProperties = {
    padding: '4rem 0',
    borderTop: '1px solid var(--rl-demo-border)',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '2.5rem',
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

  const blockStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '2rem',
  };

  const blockTitleStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'var(--rl-demo-text)',
  };

  const textStyle: React.CSSProperties = {
    color: 'var(--rl-demo-text-muted)',
    fontSize: '0.9rem',
    lineHeight: 1.6,
  };

  return (
    <section id="docs" style={sectionStyle}>
      <Container size="xl">
        <div style={headerStyle}>
          <h2 style={titleStyle}>Quick Start & Documentation</h2>
          <p style={descStyle}>Integrate accessible loaders into your application in seconds.</p>
        </div>

        <div style={blockStyle}>
          <h3 style={blockTitleStyle}>1. Installation</h3>
          <p style={textStyle}>Install the package using your favorite package manager:</p>
          <CodeBlock code="npm install react-loading-kit" language="bash" />
        </div>

        <div style={blockStyle}>
          <h3 style={blockTitleStyle}>2. Import Styles</h3>
          <p style={textStyle}>
            Import the CSS stylesheet once at the root of your application (e.g. `main.tsx`, `App.tsx`, or `_app.tsx`):
          </p>
          <CodeBlock code='import "react-loading-kit/styles.css";' language="tsx" />
        </div>

        <div style={blockStyle}>
          <h3 style={blockTitleStyle}>3. Basic Usage</h3>
          <p style={textStyle}>Import and render components with accessible defaults:</p>
          <CodeBlock
            code={`import { Spinner, Dots, Bars } from "react-loading-kit";

export function LoadingCard() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Spinner size="md" color="#3b82f6" />
      <Dots size="md" color="#10b981" />
      <Bars size="md" color="#f59e0b" />
    </div>
  );
}`}
            language="tsx"
          />
        </div>

        <div style={blockStyle}>
          <h3 style={blockTitleStyle}>4. Accessibility Standards</h3>
          <p style={textStyle}>
            All indicators include <code>role="status"</code> and <code>aria-live="polite"</code> out-of-the-box. Decorative animation elements are tagged with <code>aria-hidden="true"</code>, and customizable announcements can be provided via the <code>label</code> prop (defaults to "Loading...").
          </p>
        </div>
      </Container>
    </section>
  );
};
