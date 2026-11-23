import * as React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/features/hero/HeroSection';
import { PlaygroundSection } from '@/features/playground/PlaygroundSection';
import { ShowcaseSection } from '@/features/showcase/ShowcaseSection';
import { DocsSection } from '@/features/docs/DocsSection';
import type { LoaderId } from '@/registry/types';

export function App() {
  const [activeLoaderId, setActiveLoaderId] = React.useState<LoaderId>('spinner');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--rl-demo-bg)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <PlaygroundSection
          activeId={activeLoaderId}
          onSelectId={setActiveLoaderId}
        />
        <ShowcaseSection onSelectLoader={setActiveLoaderId} />
        <DocsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
