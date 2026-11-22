# Project Rules: React Loading & Skeleton NPM Package

## 1. Project Overview & Scope
You are building a professional, zero-dependency React + TypeScript NPM library that handles all loading states in modern web apps.
The library consists of four core pillars:
1. **Loading State Manager**: Context Provider (`LoadingProvider`), global & scoped/keyed loading hooks (`useLoading`), and an optional fullscreen/container `LoadingOverlay`.
2. **Loader Components**: Multiple lightweight animated loaders (`Spinner`, `Dots`, `Bars`, `Pulse`, `Ring`, `ProgressBar`).
3. **Skeleton System**: Flexible `Skeleton` primitives (text, circle, rectangle, rounded) plus composable presets (`SkeletonText`, `SkeletonCard`, `SkeletonAvatar`) with `shimmer` and `pulse` animations.
4. **Demo & Documentation App**: A standalone interactive playground in `demo/` (never published to npm) where users preview components, customize props live, and copy code snippets.

---

## 2. Tech Stack & Tooling
- **Library (`src/`)**:
  - React 18+ (compatible with React 19) & TypeScript (`strict: true`).
  - **Bundler**: `tsup` outputting ESM (`.js`), CJS (`.cjs`), TypeScript declarations (`.d.ts`), and a single bundled CSS file (`dist/styles.css`).
  - **Styling**: Pure CSS with CSS Custom Properties (`--rl-*`) and scoped class prefixes (`.rl-*`). ZERO runtime CSS-in-JS (no styled-components, emotion) and ZERO Tailwind dependency inside `src/`.
- **Demo App (`demo/`)**:
  - Vite + React + TypeScript.
  - Imports library source directly from `../src` (via Vite alias) for instant HMR during development.
  - Styling for the demo UI may use Tailwind CSS or clean modular CSS, completely isolated from the library bundle.
- **Testing (if added)**: Vitest + React Testing Library.

---

## 3. Enforced Folder Structure
Maintain this exact separation between the publishable library and the demo site:

```text
.
├── src/
│   ├── context/            # LoadingProvider, LoadingContext, useLoading hook
│   ├── components/
│   │   ├── loaders/        # Spinner, Dots, Bars, Pulse, ProgressBar, etc.
│   │   ├── skeleton/       # Skeleton, SkeletonText, SkeletonCard, etc.
│   │   └── overlay/        # LoadingOverlay, LoadingWrapper
│   ├── styles/             # Pure CSS files (variables.css, animations.css, components.css, index.css)
│   ├── types/              # Shared TypeScript interfaces & union types
│   ├── utils/              # Tiny pure helpers (e.g., className merger `cn`)
│   └── index.ts            # Single public entry point (exports components, hooks, types)
├── demo/                   # Standalone Vite app for Live Demo & Docs
├── dist/                   # Auto-generated build output (gitignored, published to npm)
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md
```

---

## 4. Coding Conventions & Component Patterns
- **SSR & Next.js App Router Compatibility**:
  - Add `"use client";` at the top of any file using React hooks (`useState`, `useContext`, `useEffect`), Context, or browser APIs.
  - Never access `window` or `document` directly during render without a `typeof window !== "undefined"` guard.
- **Component Structure**:
  - Use functional components wrapped in `React.forwardRef` for all UI components so consumers can attach refs.
  - Always set `Component.displayName = "ComponentName"` on `forwardRef` components.
  - Extend native HTML attributes (e.g., `React.HTMLAttributes<HTMLDivElement>`) so `className`, `style`, `id`, and `data-*` work seamlessly.
  - Always merge consumer `className` with internal classes using a tiny internal helper (never overwrite user classes).
- **TypeScript Rules**:
  - `strict: true` everywhere. NEVER use `any` (use `unknown` or proper generics).
  - Export every public component's props interface from `src/index.ts` (e.g., `export interface SpinnerProps`).
  - Prefer union types for variants (`size?: "sm" | "md" | "lg" | number`) over enums.
- **State Manager Rules**:
  - Support both global loading (`start()`, `stop()`, `isLoading`) and keyed/scoped loading (`start("fetchUsers")`, `isLoading("fetchUsers")`).
  - Use an internal counter per key so overlapping concurrent requests do not prematurely hide the loader.
  - Provide a helper like `withLoading(asyncFn, key?)` that automatically calls `start` before and `stop` in a `finally` block.

---

## 5. Styling & CSS Isolation Rules
- Prefix ALL library CSS classes with `rl-` (e.g., `.rl-spinner`, `.rl-skeleton`) to prevent collisions with consumer stylesheets.
- Expose themeable CSS variables in `:root` (e.g., `--rl-primary`, `--rl-skeleton-base`, `--rl-skeleton-highlight`, `--rl-overlay-bg`, `--rl-speed`).
- Keep animations GPU-accelerated (`transform`, `opacity`) — avoid animating layout properties (`width`, `height`, `top`, `left`).
- Always respect reduced motion:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .rl-animated { animation-duration: 0.01ms !important; }
  }
  ```

---

## 6. Commenting & Documentation Style
- **Public APIs (REQUIRED — JSDoc)**:
  Every exported component, hook, and prop MUST have concise JSDoc comments so consumers get rich IntelliSense tooltips in VS Code. Include `@default` for optional props and `@example` on components/hooks.

  Example:
  ```tsx
  export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * Size of the spinner. Accepts preset tokens or a pixel number.
     * @default "md"
     */
    size?: "sm" | "md" | "lg" | number;
    /**
     * Accessible label announced by screen readers.
     * @default "Loading..."
     */
    label?: string;
  }

  /**
   * Circular animated loading indicator.
   * @example
   * <Spinner color="#3b82f6" size="lg"/>
   */
  export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(...);
  ```

- **Inline Comments (MINIMAL)**:
  - DO NOT write obvious comments that narrate what the code does (e.g., `// increment counter`).
  - ONLY write inline comments to explain **why** a non-obvious decision, edge case, or browser workaround exists.

---

## 7. Accessibility (a11y) Standards
- All active loaders MUST include `role="status"` and `aria-live="polite"`.
- Containers wrapped in a loading state MUST set `aria-busy="true"` while loading.
- Include visually hidden screen-reader text (`.rl-sr-only`) with a customizable `label` prop (default: `"Loading..."`).
- Decorative `Skeleton` elements MUST set `aria-hidden="true"` when inside a parent that already announces loading state.

---

## 8. Package & Dependency Rules
- **Zero Runtime Dependencies**: NEVER add packages to `dependencies` in `package.json` without explicit user approval.
- `react` and `react-dom` MUST ONLY exist in `peerDependencies` (e.g., `">=18.0.0"`) and `devDependencies`.
- `package.json` `"files"` array MUST ONLY include `["dist"]` (plus `README.md` and `LICENSE` which npm includes automatically). Never ship `src/` or `demo/` to npm.
- Export CSS cleanly in `package.json` `"exports"` (e.g., `"./styles.css": "./dist/styles.css"`).

---

## 9. Hard Constraints
- NEVER modify the `"version"` field in `package.json` automatically.
- NEVER run `npm publish` or `npm login` without explicit user confirmation.
- NEVER install heavy UI kits or icon libraries inside `src/`.
- NEVER break existing exported prop names or types without flagging it as a breaking change first.

---

## 10. Verification & Definition of Done
After implementing any feature or fix, you MUST run and verify:
1. `npx tsc --noEmit` — zero TypeScript errors.
2. `npm run build` — verify `dist/` contains `.js` (ESM), `.cjs` (CJS), `.d.ts` (Types), and `styles.css` with no warnings or missing exports.
3. If `demo/` was modified, verify it compiles cleanly without broken imports.
4. Summarize exact files created/modified and any new public exports added.