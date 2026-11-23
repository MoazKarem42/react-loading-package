# Contributing to react-loading-kit

Thank you for your interest in contributing to **react-loading-kit**! We welcome contributions, bug fixes, feature enhancements, and documentation improvements.

To ensure the library remains reliable, accessible, and ultra-lightweight, we follow strict architectural guidelines. Please review this guide before submitting code or opening a pull request.

---

## Core Principles

Every component and feature in `react-loading-kit` adheres to these four tenets:

1. **Zero Runtime Dependencies:** The library must never add external runtime dependencies to `package.json`. Everything is built with standard React and pure CSS.
2. **Accessible by Default (a11y):** All visual loaders must render screen-reader-friendly DOM elements (`role="status"`, `aria-live="polite"`, visually hidden text) and support operating system motion reduction preferences (`prefers-reduced-motion`).
3. **GPU-Accelerated Performance:** Animations must only animate hardware-accelerated CSS properties (`transform` and `opacity`) to guarantee steady 60 FPS rendering without layout thrashing.
4. **CSS Isolation & Predictable API:** All CSS classes use the `.rl-` prefix and `--rl-*` custom properties to prevent namespace collisions. All loaders extend `BaseLoaderProps` and native HTML attributes.

---

## Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or later
- **npm** (or `pnpm` / `yarn`)
- **Git**

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/react-loading-kit.git
cd react-loading-kit
npm install
```

### Available Development Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs `tsup` in watch mode to rebuild as you change files. |
| `npm run build` | Compiles the package into `dist/` (ESM, CJS, and TypeScript definitions). |
| `npm run type-check` | Runs the TypeScript compiler (`tsc --noEmit`) to validate types. |
| `npm run lint` | Runs ESLint across `src/` to enforce code quality and formatting rules. |
| `node scripts/check-bundle.mjs` | Audits the bundle to verify zero runtime dependencies and reports distribution file sizes. |

---

## Project Structure

```text
react-loading-kit/
├── .agent/                  # Project agent skills and automation
├── dist/                    # Compiled production build artifacts (git-ignored)
├── demo/                    # Interactive demo application
├── scripts/
│   └── check-bundle.mjs     # Zero-dependency health check script
├── src/
│   ├── components/
│   │   └── loaders/         # Visual loader components (Spinner, Dots, Bars, etc.)
│   ├── styles/
│   │   ├── variables.css    # CSS custom properties / theme tokens
│   │   ├── animations.css   # Keyframe definitions & reduced-motion media query
│   │   ├── components.css   # Scoped styling rules (.rl-*)
│   │   └── index.css        # Main stylesheet entry point
│   ├── types/
│   │   └── index.ts         # Shared TypeScript interfaces & types
│   ├── utils/
│   │   └── cn.ts            # Lightweight classnames concatenation utility
│   └── index.ts             # Public library barrel export
├── package.json             # Package configuration & peer dependencies
├── tsconfig.json            # TypeScript configuration
└── tsup.config.ts           # tsup bundler configuration
```

---

## Adding a New Loader Component

Follow this checklist whenever you create a new loader component:

### 1. Component Implementation (`src/components/loaders/<Name>.tsx`)

1. **`"use client"` Directive:** Add `"use client";` as the very first line of the file for full Next.js App Router support.
2. **Component Interface:**
   - Extend `BaseLoaderProps` from `../../types`.
   - Extend `React.HTMLAttributes<HTMLSpanElement>` (or appropriate container element).
   - Export the props interface (e.g. `export interface RingProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement>`).
3. **`React.forwardRef`:**
   - Wrap the component in `React.forwardRef` and forward the element ref to the root element.
   - Always assign a `displayName`: `<Name>.displayName = "<Name>"`.
4. **Accessible DOM Structure:**
   - Set `role="status"` and `aria-live="polite"` on the root container.
   - Include a visually hidden screen reader span:
     ```tsx
     <span className="rl-sr-only">{label}</span>
     ```
   - Mark all visual SVGs, tracks, and decorative spans with `aria-hidden="true"`.
5. **Class Names & Styles:**
   - Use `cn` from `../../utils/cn` to merge the base class, size modifier, and consumer-provided `className`.
   - Safely merge consumer `style` with calculated inline styles so consumer styles take precedence without breaking CSS custom variable bindings.
6. **JSDoc Documentation:**
   - Provide clear JSDoc on the exported component and every custom prop with `@default` values and `@example` code snippets.

#### Example Component Template

```tsx
"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface MyLoaderProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Additional custom configuration prop.
   * @default 4
   */
  dotCount?: number;
}

function resolveSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  }
  return { className: `rl-my-loader--${size}` };
}

/**
 * An accessible animated loader component.
 *
 * @example
 * ```tsx
 * <MyLoader size="md" color="#3b82f6" label="Loading..." />
 * ```
 */
export const MyLoader = React.forwardRef<HTMLSpanElement, MyLoaderProps>(
  (
    {
      size = "md",
      color,
      speed,
      label = "Loading...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-primary": color } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...style,
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-my-loader rl-animated", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <span className="rl-sr-only">{label}</span>
        <span className="rl-my-loader-indicator" aria-hidden="true" />
      </span>
    );
  }
);

MyLoader.displayName = "MyLoader";
```

### 2. Styling & CSS Rules

1. **Tokens (`src/styles/variables.css`):**
   - Add default tokens under `:root` using the `--rl-` prefix (e.g. `--rl-my-loader-color: var(--rl-primary);`).
2. **Animations (`src/styles/animations.css`):**
   - Define `@keyframes` with the `rl-` prefix (e.g. `@keyframes rl-my-pulse { ... }`).
   - Only animate `transform` and `opacity`.
3. **Component Styles (`src/styles/components.css`):**
   - Namespace all CSS rules with `.rl-` (e.g. `.rl-my-loader`, `.rl-my-loader--sm`).
   - Ensure the `.rl-animated` class is attached to the animated elements so it automatically receives the `@media (prefers-reduced-motion: reduce)` overrides.

### 3. Public Exports (`src/index.ts`)

Export both the component and its props interface from `src/index.ts`:

```ts
export { MyLoader } from "./components/loaders/MyLoader";
export type { MyLoaderProps } from "./components/loaders/MyLoader";
```

---

## Quality Gates & Verification

Before opening a pull request, run the verification pipeline:

```bash
# 1. Type validation (must pass with 0 errors)
npm run type-check

# 2. Linting (must pass with 0 errors/warnings)
npm run lint

# 3. Build dist bundle
npm run build

# 4. Dependency & bundle size verification (must confirm 0 runtime dependencies)
node scripts/check-bundle.mjs
```

### Pull Request Checklist

- [ ] Does not add any runtime dependencies in `package.json`.
- [ ] Component is wrapped in `React.forwardRef` with a matching `displayName`.
- [ ] Accessible announcements (`role="status"`, `aria-live="polite"`, `.rl-sr-only`, `aria-hidden="true"`) are implemented.
- [ ] Supports `@media (prefers-reduced-motion: reduce)` via the `.rl-animated` class.
- [ ] CSS class names are strictly prefixed with `rl-` and variables with `--rl-`.
- [ ] GPU-friendly animations (`transform` and `opacity` only).
- [ ] Public API and types are exported from `src/index.ts`.
- [ ] `npm run type-check`, `npm run lint`, and `npm run build` pass cleanly.

---

## Git & PR Guidelines

1. **Branch Naming:**
   - Feature: `feat/component-name` or `feat/feature-description`
   - Bug fix: `fix/issue-description`
   - Documentation: `docs/topic-name`
2. **Commit Messages:**
   - Follow standard conventional commits:
     - `feat: add PulseLoader component`
     - `fix: resolve stroke width in Safari`
     - `docs: update props API table`
3. **Pull Request Description:**
   - Clearly explain the problem or feature.
   - Include code examples or visual recordings if introducing a new loader animation.

---

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for everyone, regardless of experience level, gender, sexual orientation, disability, personal appearance, race, or religion. Please be respectful and constructive in all discussions and reviews.
