# Native CSS architecture

The reference application uses **plain CSS files** and browser-native layout and styling primitives. We deliberately avoid Sass/SCSS, Tailwind CSS and runtime CSS-in-JS libraries for the current scope. This is a maintainability and supply-chain decision, not a claim that other approaches are inherently insecure.

## Current ownership

| File | Responsibility |
| --- | --- |
| `projects/reference-app/src/styles/tokens.css` | Shared, meaningful design values such as colours, spacing and typography |
| `projects/reference-app/src/styles/reset.css` | Minimal document and form control resets |
| `projects/reference-app/src/styles/base.css` | Base document colours, type and visible keyboard focus styles |
| `projects/reference-app/src/styles/layout.css` | Generic application layout container |
| `projects/reference-app/src/App.css` | Application shell, header, navigation and page-content layout |
| `projects/reference-app/src/components/starter-feedback/StarterFeedback.css` | Feedback component styling |

The entry point `src/index.tsx` imports the foundational stylesheets. `App.tsx` imports `App.css`, while `StarterFeedback.tsx` owns its component stylesheet. Components may import CSS as a build input; CSS declarations remain in CSS files, not as component-generated rules.

The page components currently reuse the application-local `app__content` and `app__section-title` classes. Add page-specific styles only when a page has a demonstrated, distinct requirement.

## Conventions

- Prefer semantic HTML before writing CSS workarounds for structure or behaviour.
- Use native CSS Grid, Flexbox, logical properties and custom properties. No preprocessor is required for the current design.
- Follow the existing BEM-style naming for application and component styles. Preserve ownership boundaries; avoid making unrelated components depend on private selectors.
- Use design tokens for genuinely shared design semantics, not every incidental numeric value.
- Prefer descriptive selectors and alphabetical property order where practical, without obscuring related fallback declarations.
- Keep keyboard focus visible and preserve accessible interaction patterns. A visually hidden instruction is not a substitute for visible essential guidance.
- Avoid adding a CSS framework, Sass, CSS modules, CSS-in-JS or styling dependencies without a concrete requirement and dependency review.

## Trade-offs and limitations

Plain CSS is not automatically smaller or more secure. Poorly scoped selectors, excessive global rules or incorrect responsive styling can still create bugs. Review style changes for cascade interactions, keyboard focus, legibility, narrow viewports and unintended effects across pages.

The existing build uses Vite to process and bundle imported CSS. **Importing a stylesheet from a TSX file does not make this a CSS-in-JS implementation.** Native CSS support does not eliminate the build toolchain or its supply-chain risks.

For general dependency, build and verification controls, read [Security Decisions](security-decisions.md).

## Review checklist

Before approving material styling changes:

1. Check the selector belongs in the correct stylesheet.
2. Confirm existing design tokens were used where semantically appropriate.
3. Check visible focus, semantic landmarks and narrow layouts when affected.
4. Ensure new packages or compilers were not introduced without justification.
5. Run relevant existing checks and record manual browser validation separately when performed.
