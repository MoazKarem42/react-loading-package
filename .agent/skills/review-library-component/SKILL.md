---
name: review-library-component
description: Audits React loading/skeleton components and CSS files against the library's strict standards (a11y, SSR safety, forwardRef, rl- prefix, JSDoc, zero-deps). Trigger whenever the user asks to review, audit, or check any component or PR changes.
---

# Library Component Review Skill

## Strict Rule
DO NOT modify any files during the review. Only inspect the code and output a structured audit report.

## Audit Checklist
Check every target component against these 5 gates:
1. **SSR & Next.js Safety:** Uses `"use client";` if hooks/context are present; no unguarded `window`/`document` access.
2. **React & TypeScript:** Wrapped in `React.forwardRef` with `displayName`, extends native HTML attributes, uses `cn` helper, zero `any` types, props interface exported from `src/index.ts`.
3. **Accessibility (a11y):** Has `role="status"`, `aria-live="polite"`, and `.rl-sr-only` text with customizable `label`.
4. **CSS Isolation & Performance:** All classes prefixed with `rl-`, uses `--rl-*` variables, GPU-only animations (`transform`/`opacity`), includes `.rl-animated` for reduced motion.
5. **Documentation:** Concise JSDoc on exported component and props (with `@default` and `@example`).
6. **Package & Bundle Size:** Run `node .agent/skills/review-library-component/scripts/check-bundle.mjs` and include the exact output (dependency count + `dist/` file sizes) in your report.

## Output Format
Start your response with: `[Skill Applied: review-library-component]`

Then output a Markdown table:
| Gate | Status (PASS / FAIL) | Finding & File:Line |
| :--- | :--- | :--- |

End with a **Verdict** (`Ready to Ship` or `Needs Fixes`) and a short bulleted fix list if anything failed.