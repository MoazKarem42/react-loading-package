# react-loading-kit

Zero-dependency, accessible loading states, spinners, and skeleton loaders for React. Engineered with 60 FPS GPU-accelerated CSS animations, full TypeScript typing, comprehensive screen reader accessibility, and automatic `prefers-reduced-motion` compliance.

[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg?style=flat-square)](https://www.npmjs.com/package/react-loading-kit)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![Tree Shakeable](https://img.shields.io/badge/tree--shakeable-ESM%20%2B%20CJS-success.svg?style=flat-square)](https://bundlephobia.com/package/react-loading-kit)
[![React 18+](https://img.shields.io/badge/react-%3E%3D18.0.0-61dafb.svg?style=flat-square)](https://react.dev)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg?style=flat-square)](./LICENSE)

**Live Demo / Interactive Playground**: [react-loading-package-demo.vercel.app](https://react-loading-package-demo.vercel.app/)

---

## Features

- **Zero Dependencies**: Pure React with zero runtime dependencies beyond React peer dependencies.
- **Accessible by Default**: Implements `role="status"`, `aria-live="polite"`, screen reader announcements (`.rl-sr-only`), and `aria-hidden` decorative graphics.
- **Reduced Motion Friendly**: Automatically respects user preferences via `@media (prefers-reduced-motion: reduce)`.
- **Hardware-Accelerated**: Animations use CSS `transform` and `opacity` properties for smooth 60 FPS performance.
- **Themeable Design Tokens**: Customizable via CSS custom properties with prop-level overrides.
- **Tree-Shakeable**: Dual ESM and CJS builds with TypeScript declarations.
- **SSR & Next.js Compatible**: Marked with `"use client"` directives for seamless Next.js App Router and Pages Router support.

---

## Installation

Install via your preferred package manager:

```bash
# npm
npm install react-loading-kit

# pnpm
pnpm add react-loading-kit

# yarn
yarn add react-loading-kit
```

### Import Stylesheet

Import the library stylesheet once at the root of your application (e.g. `layout.tsx`, `_app.tsx`, or `main.tsx`):

```tsx
import "react-loading-kit/styles.css";
```

---

## Quick Start

```tsx
import React from "react";
import { Spinner, DotsBounce, SkeletonCard } from "react-loading-kit";
import "react-loading-kit/styles.css";

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Default spinner */}
      <Spinner />

      {/* Customized loader */}
      <DotsBounce size="lg" color="#3b82f6" speed={0.8} label="Fetching messages..." />

      {/* Skeleton card placeholder */}
      <SkeletonCard lines={3} animation="shimmer" />
    </div>
  );
}
```

---

## Unified Props API

### BaseLoaderProps

All loader components extend `React.HTMLAttributes<HTMLSpanElement>`, forward native DOM attributes, support refs via `React.forwardRef`, and accept standard base props:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| number` | `"md"` | Size preset (`sm` = 16px, `md` = 24px, `lg` = 36px, `xl` = 48px) or explicit numeric pixel size. |
| `color` | `string` | `var(--rl-primary)` | Accent color for animated elements. Accepts any valid CSS color. |
| `speed` | `number` | Component default | Animation cycle duration in seconds (e.g. `0.6`). |
| `label` | `string` | `"Loading..."` | Screen reader announcement text rendered in an `.rl-sr-only` element. |
| `className` | `string` | `undefined` | Additional CSS class names merged with component classes. |
| `style` | `React.CSSProperties` | `undefined` | Inline styles merged with component styles. |

### Component-Specific Loader Props

Certain loaders accept specialized properties:

| Component | Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `Spinner` | `thickness` | `number` | `3` | Stroke thickness in pixels. |
| `Spinner` | `trackColor` | `string` | `var(--rl-spinner-track)` | Background circular track color. |
| `DualRing` | `thickness` | `number` | `2.5` | Stroke thickness in pixels. |
| `DualRing` | `secondaryColor` | `string` | `color` / `--rl-primary` | Inner counter-rotating ring color. |
| `DualRing` | `trackColor` | `string` | `"transparent"` | Track ring color. |
| `DashedSpinner` | `thickness` | `number` | `3` | Stroke thickness in pixels. |
| `Orbit` | `trackColor` | `string` | `var(--rl-orbit-track)` | Stationary orbit track color. |
| `Dots` | `spacing` | `number \| string` | Auto | Gap between dots (e.g. `8` or `"8px"`). |
| `Bars` | `spacing` | `number \| string` | Auto | Gap between equalizer bars. |

### BaseSkeletonProps

Skeleton components extend `React.HTMLAttributes<HTMLSpanElement>` and share the following foundation:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `string \| number` | `undefined` | Explicit width (CSS string or pixel number). |
| `height` | `string \| number` | `undefined` | Explicit height (CSS string or pixel number). |
| `borderRadius` | `string \| number` | `undefined` | Custom border radius (CSS string or pixel number). |
| `variant` | `"text" \| "circular" \| "rectangular" \| "rounded"` | `"text"` | Visual geometry variant. |
| `animation` | `"shimmer" \| "pulse" \| "none"` | `"shimmer"` | Animation style effect. |

---

## Component Catalog

### Loaders (19 Components)

1. **Circular & Spinners**:
   - `Spinner`: Classic circular loader with stroke thickness and track color options.
   - `DualRing`: Concentric dual rings rotating in opposing directions with dual-color support.
   - `ChasingRing`: Smooth dash-offset arc that stretches and rotates.
   - `DashedSpinner`: Segmented circular ring with distinct dashes.
   - `Orbit`: Satellite dot rotating around a central circular track.
   - `Clock`: Minimalist dial with synchronized rotating hour and minute hands.

2. **Dots & Typing**:
   - `Dots`: Three-dot horizontal wave.
   - `DotsBounce`: Bouncing three-dot sequence with vertical translation.
   - `DotsFade`: Staggered opacity pulsing dots.
   - `DotsScale`: Staggered scaling dots expanding and contracting.
   - `DotsTyping`: Standard typing indicator for chat and messaging interfaces.
   - `DotsCircle`: Circular arrangement of 8 fading dots.

3. **Bars & Equalizers**:
   - `Bars`: Multi-bar equalizer with custom spacing and dimensions.
   - `BarsWave`: Smooth vertical wave oscillation across bars.
   - `BarsScale`: Staggered height scaling bars.
   - `BarsFade`: Equalizer bars pulsating opacity.

4. **Pulse & Ripple**:
   - `Pulse`: Expanding concentric radial pulse effect.
   - `Ripple`: Water-drop ripple shockwave animation.
   - `Heartbeat`: Rhythmic double-beat pulse animation.

### Skeletons (10 Components)

- `Skeleton`: Foundational placeholder with variant, width, height, and animation modes.
- `SkeletonText`: Multi-line text block with organic trailing line widths.
- `SkeletonAvatar`: Profile avatar placeholder (circular, rounded, or square) with optional text.
- `SkeletonButton`: Action button placeholder supporting size and corner radius presets.
- `SkeletonCard`: Media card placeholder with banner image, text block, and footer.
- `SkeletonList`: Repeating list item placeholders with optional avatars and dividers.
- `SkeletonProfile`: Account profile placeholder with banner, avatar, header, and stats.
- `SkeletonTable`: Tabular data placeholder with configurable rows, columns, and header.
- `SkeletonImage`: Media image placeholder with centered icon graphic.
- `SkeletonForm`: Form layout placeholder with label, inputs, and submit button.

---

## CSS Variables & Theming

Override design tokens globally or scope them within components or theme containers:

```css
:root {
  /* Brand colors */
  --rl-primary: #3b82f6;
  --rl-spinner-track: rgba(0, 0, 0, 0.1);
  --rl-spinner-head: var(--rl-primary);

  /* Animation timing */
  --rl-speed: 0.75s;

  /* Sizing presets */
  --rl-size-sm: 16px;
  --rl-size-md: 24px;
  --rl-size-lg: 36px;
  --rl-size-xl: 48px;

  /* Skeleton tokens */
  --rl-skeleton-base: #e2e8f0;
  --rl-skeleton-highlight: #f8fafc;
  --rl-skeleton-radius-sm: 4px;
  --rl-skeleton-radius-md: 8px;
}

/* Dark mode theme */
[data-theme="dark"] {
  --rl-primary: #60a5fa;
  --rl-spinner-track: rgba(255, 255, 255, 0.1);
  --rl-skeleton-base: #1e293b;
  --rl-skeleton-highlight: #334155;
}
```

---

## Accessibility & Reduced Motion

- **Live Screen Reader Announcements**: Every loader includes `role="status"` and `aria-live="polite"`. The internal label text is wrapped in `.rl-sr-only` to ensure screen reader narration without visual clutter.
- **Decorative Graphics**: SVG elements are marked with `aria-hidden="true"` so screen readers ignore decorative geometry.
- **Automatic Reduced Motion**: Complies with `@media (prefers-reduced-motion: reduce)` by neutralizing rapid rotations and animations into non-distracting indicators while preserving full accessibility announcements.

---

## License

MIT © 2026 [Moaz Karem](./LICENSE)
