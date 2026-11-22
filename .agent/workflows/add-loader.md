---
description: End-to-end pipeline to create, build, audit, and auto-fix a new loader component.
---

# Add Loader Component Workflow

Execute the following steps strictly in order for the loader requested by the user:

1. **Build the Component**
   - Apply the `create-loader-component` skill to create the component, its scoped `rl-` CSS, and export it from `src/index.ts`.

2. **Type-Check & Build**
   - Run `npx tsc --noEmit` and `npm run build`.
   - If any error occurs, fix it before moving to step 3.

3. **Self-Audit**
   - Apply the `review-library-component` skill (including running `node .agent/skills/review-library-component/scripts/check-bundle.mjs`) on the newly created component.

4. **Auto-Fix Loop**
   - If the audit verdict is `Needs Fixes`, apply all items in the Fix List, re-run `npm run build`, and re-run the audit until the verdict is `Ready to Ship`.

5. **Final Deliverable**
   - Output the final passing audit table, bundle sizes, and a suggested conventional git commit message (e.g., `feat(loaders): add <Bars /> component`).
