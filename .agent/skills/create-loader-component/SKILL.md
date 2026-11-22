---
name: create-loader-component
description: Creates a new accessible, zero-dependency React loading component (e.g., Dots, Bars, Pulse, Ring, ProgressBar) following the library's forwardRef, CSS prefix, JSDoc, and export conventions. Trigger whenever the user asks to add or create a new loader or animation component.
---

# Create Loader Component Skill

## When to Use

Use this skill whenever the user asks to create a new loader component under `src/components/loaders/`.

## Step-by-Step Procedure

1. **Match Existing Conventions First**
   - Read `src/components/loaders/Spinner.tsx` and `src/types/index.ts` first to match the exact prop naming, `"use client"` directive (if used), and shared types (`LoaderSize`, `LoaderSpeed`, etc.).

2. **Create the Component File**
   - Path: `src/components/loaders/<ComponentName>.tsx`
   - Wrap the component in `React.forwardRef` and set `<ComponentName>.displayName = "<ComponentName>"`.
   - Extend native HTML attributes (`React.HTMLAttributes<HTMLSpanElement>` or `HTMLDivElement`).
   - Accept standard props using shared types from `../../types`: `size`, `color`, `speed`, and `label` (default `"Loading..."`).
   - Merge user `className` using `cn` from `../../utils/cn`.
   - Merge inline styles safely (`style={{ ...internalStyle, ...style }}`) so consumer `style` props are never overwritten.
   - Include accessibility attributes: `role="status"`, `aria-live="polite"`, and a `.rl-sr-only` span containing `{label}`.
   - Add concise JSDoc comments with `@default` on props and `@example` on the component.

3. **Add Scoped CSS**
   - Add styles in `src/styles/components.css` and keyframes in `src/styles/animations.css`.
   - Prefix ALL classes with `rl-` (e.g., `.rl-dots`, `.rl-bars`).
   - Use CSS variables (`--rl-primary`, `--rl-speed`) and GPU-accelerated properties (`transform`, `opacity`).
   - Apply `.rl-animated` to animated elements so `prefers-reduced-motion` is respected.

4. **Export Public API**
   - Export both the component and its props interface (e.g., `export { Dots }`, `export type { DotsProps }`) from `src/index.ts`.

## Verification Checklist

Before finishing, run and confirm:

1. `npx tsc --noEmit` passes with 0 errors.
2. `npm run build` succeeds and `dist/index.d.ts` includes the new component and its props type.
