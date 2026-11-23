# react-loading-kit

[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg?style=flat-square)](https://www.npmjs.com/package/react-loading-kit)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![Tree Shakeable](https://img.shields.io/badge/tree--shakeable-ESM%20%2B%20CJS-success.svg?style=flat-square)](https://bundlephobia.com/package/react-loading-kit)
[![React 18+](https://img.shields.io/badge/react-%3E%3D18.0.0-61dafb.svg?style=flat-square)](https://react.dev)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg?style=flat-square)](./LICENSE)

Zero-dependency, accessible loading states, spinners, and animated indicators for modern React applications. Built with 60 FPS GPU-accelerated CSS animations, full TypeScript typing, comprehensive screen reader accessibility, and automatic `prefers-reduced-motion` compliance.

---

## Features

- 🪶 **Zero Dependencies:** Zero runtime footprint outside React peer dependencies.
- ♿ **Accessible by Default:** Includes `role="status"`, `aria-live="polite"`, `.rl-sr-only` announcements, and `aria-hidden` decorative graphics.
- 🎬 **Reduced Motion Friendly:** Respects user accessibility preferences via `@media (prefers-reduced-motion: reduce)`.
- ⚡ **GPU-Accelerated Performance:** Powered exclusively by CSS `transform` and `opacity` properties for smooth 60 FPS animations.
- 🎨 **Deeply Themeable:** Global CSS custom properties (variables) with component-level prop overrides.
- 🌲 **Tree-Shakeable:** Modular ESM & CJS distribution with TypeScript definitions included.
- ⚛️ **Next.js & SSR Ready:** Preconfigured with `"use client"` directives for seamless integration into Next.js App Router and Pages Router.

---

## Installation

Install `react-loading-kit` using your preferred package manager:

```bash
# npm
npm install react-loading-kit

# pnpm
pnpm add react-loading-kit

# yarn
yarn add react-loading-kit

# bun
bun add react-loading-kit
```

### Import Stylesheet

`react-loading-kit` uses optimized CSS classes for styling and animations. Import the stylesheet once at the root of your application:

```tsx
// Next.js (app/layout.tsx or pages/_app.tsx) / Vite / Create React App (src/main.tsx or src/index.tsx)
import "react-loading-kit/styles.css";
```

---

## Quick Start

```tsx
import React from "react";
import { Spinner, DotsBounce, Bars } from "react-loading-kit";
import "react-loading-kit/styles.css";

export default function App() {
  return (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      {/* Default medium spinner */}
      <Spinner />

      {/* Customized size, color, and accessibility label */}
      <DotsBounce size="lg" color="#3b82f6" label="Loading chat history..." />

      {/* Explicit pixel dimensions */}
      <Bars size={32} color="#10b981" speed={0.8} />
    </div>
  );
}
```

---

## Unified Props API

All loader components share a consistent, predictable base API via `BaseLoaderProps`. They also extend `React.HTMLAttributes<HTMLSpanElement>`, forwarding native HTML attributes (`id`, `onClick`, `data-*`, etc.) and supporting React refs via `React.forwardRef`.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| number` | `"md"` | Loader dimensions. Accepts standard preset tokens or an explicit pixel number (e.g. `size={32}`). |
| `color` | `string` | `var(--rl-primary)` (`#3b82f6`) | Main accent color for animated elements. Accepts any valid CSS color (hex, rgb, hsl, or CSS variable). |
| `speed` | `number` | Component default | Total animation cycle duration in seconds (e.g. `speed={0.5}` for 2x faster). |
| `label` | `string` | `"Loading..."` | Accessible announcement text rendered in an `.rl-sr-only` span for screen readers. |
| `className` | `string` | `undefined` | Additional CSS class names merged with built-in library classes. |
| `style` | `React.CSSProperties` | `undefined` | Inline styles merged with component styles without overriding size or color logic. |

### Component-Specific Props

Certain loaders provide additional specialized props for fine-grained visual control:

| Component | Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `Spinner` | `thickness` | `number` | `3` | Stroke thickness in pixels for the circular path. |
| `Spinner` | `trackColor` | `string` | `var(--rl-spinner-track)` | Background track circle color. |
| `DualRing` | `thickness` | `number` | `2.5` | Stroke thickness in pixels for both concentric rings. |
| `DualRing` | `secondaryColor` | `string` | `color` or `--rl-primary` | Color for the inner counter-rotating ring. |
| `DualRing` | `trackColor` | `string` | `"transparent"` | Track color behind the rings. |
| `DashedSpinner` | `thickness` | `number` | `3` | Stroke thickness in pixels for the dashed perimeter. |
| `Orbit` | `trackColor` | `string` | `var(--rl-orbit-track)` | Color of the stationary orbit track circle. |
| `Dots` | `spacing` | `number \| string` | Auto | Gap spacing between dots (e.g. `spacing={8}` or `spacing="0.5rem"`). |
| `Bars` | `spacing` | `number \| string` | Auto | Gap spacing between bars (e.g. `spacing={6}` or `spacing="6px"`). |

---

## Available Loader Categories

### 1. Spinners & Rings
High-precision circular loaders ideal for inline buttons, form submissions, and full-screen overlays:
- **`Spinner`**: Classic circular stroke loader with customizable track color and stroke thickness.
- **`DualRing`**: Concentric dual rings rotating in opposing directions with dual-color support.
- **`ChasingRing`**: Smooth dash-offset arc that stretches and compresses as it spins.
- **`DashedSpinner`**: Segmented circular ring with distinct dashed segments.
- **`Orbit`**: Planetary satellite dot traversing an orbital trajectory around a central track.
- **`Clock`**: Minimalist clock dial with synchronized, rotating hour and minute hands.

### 2. Dots & Typing
Rhythmic, sequential dot indicators suited for conversational UIs, AI streaming responses, and cards:
- **`Dots`**: Three-dot wave pulse.
- **`DotsBounce`**: Bouncing three-dot sequence with fluid vertical translation.
- **`DotsFade`**: Subtle staggered opacity pulsing.
- **`DotsScale`**: Staggered scaling dots expanding and contracting.
- **`DotsTyping`**: Standard messaging typing indicator, ideal for chat interfaces.
- **`DotsCircle`**: Circular arrangement of 8 fading dots creating a radar/clockwork rotation.

### 3. Bars & Waves
Frequency-style bar animations suited for media streaming, audio playback, and content loading:
- **`Bars`**: Multi-bar equalizer animation with customizable bar width, height, and spacing.

### 4. Pulse & Radar
Radial loaders and radar pulses for spatial or background status updates:
- **`DotsCircle`**: Circular pulse ring.
- **`Orbit`**: Orbital focal point spinner.
- *Additional radar sweeps and skeleton loaders are in active development.*

---

## CSS Variables & Theming

`react-loading-kit` uses a design token system built on CSS custom properties. You can customize loaders globally across your entire app or scope overrides to specific themes, containers, or components.

### Global Configuration

Define overrides in your global stylesheet:

```css
:root {
  /* Brand colors */
  --rl-primary: #6366f1; /* Primary indigo loader color */
  --rl-spinner-track: rgba(99, 102, 241, 0.15); /* Light track background */

  /* Global animation speed */
  --rl-speed: 0.6s;

  /* Global size presets */
  --rl-size-sm: 18px;
  --rl-size-md: 28px;
  --rl-size-lg: 40px;
  --rl-size-xl: 56px;
}

/* Dark mode theme */
[data-theme="dark"] {
  --rl-primary: #818cf8;
  --rl-spinner-track: rgba(255, 255, 255, 0.1);
}
```

### Reference: Available CSS Variables

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--rl-primary` | `#3b82f6` | Base accent color for all loaders |
| `--rl-spinner-track` | `rgba(0, 0, 0, 0.1)` | Inactive circular track background color |
| `--rl-spinner-head` | `var(--rl-primary)` | Active spinning head color |
| `--rl-speed` | `0.75s` | Base animation cycle duration |
| `--rl-size-sm` | `16px` | Small dimension preset |
| `--rl-size-md` | `24px` | Medium dimension preset |
| `--rl-size-lg` | `36px` | Large dimension preset |
| `--rl-size-xl` | `48px` | Extra-large dimension preset |
| `--rl-dots-color` | `var(--rl-primary)` | Color for dot loader variants |
| `--rl-dots-gap-md` | `6px` | Default gap between dots |
| `--rl-bars-color` | `var(--rl-primary)` | Color for equalizer bars |

---

## Accessibility (`a11y`) & Reduced Motion

Accessibility is a core design requirement of `react-loading-kit`:

### 1. Screen Reader Live Announcements
Every loader renders with:
- `role="status"`
- `aria-live="polite"`
- An internal `.rl-sr-only` text node containing your customizable `label` prop (default: `"Loading..."`).
- Decorative SVGs and visual markers are explicitly marked with `aria-hidden="true"`, ensuring screen readers do not narrate irrelevant SVG geometry.

### 2. Automatic `prefers-reduced-motion` Support
For users sensitive to motion sickness or vestibular disorders, `react-loading-kit` respects their operating system preference automatically. When `prefers-reduced-motion: reduce` is detected:
- Animation durations are set to `0.01ms !important`.
- Iteration counts are capped to `1`.
- Infinite spinning and bouncing movements are neutralized, presenting a static, non-distracting loading indicator state while preserving live screen reader announcements.

```css
/* Built into react-loading-kit/styles.css */
@media (prefers-reduced-motion: reduce) {
  .rl-animated,
  .rl-spinner,
  [class*="rl-"] {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Integration with UI Frameworks

### Next.js (App Router)

`react-loading-kit` exports `"use client"` compatible components and works cleanly in Server and Client Components:

```tsx
// app/dashboard/loading.tsx
import { Spinner } from "react-loading-kit";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner size="lg" color="#2563eb" label="Loading dashboard..." />
    </div>
  );
}
```

### Tailwind CSS

Combine Tailwind utility classes directly with loaders via `className`:

```tsx
<Spinner className="mr-2 text-indigo-500 hover:opacity-80" size="sm" />
```

---

## License

MIT © [react-loading-kit Contributors](./LICENSE)
