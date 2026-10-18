# SolidJS Monorepo Starter

A security-focused SolidJS and Go monorepo starter designed for fast prototyping and clear application boundaries.

Built by Edward Siwek.

> **Applications own composition. Libraries own capabilities.**

This repository is being constructed incrementally from first principles.

The project shares the engineering philosophy of
`angular-monorepo-starter`, while frontend framework-specific decisions are
being rebuilt using SolidJS-native tooling rather than copied from the Angular
implementation.

## Current status

The repository currently contains only its framework-independent foundation.

Node.js, pnpm, SolidJS, Vite, TypeScript, applications, libraries, Go services,
repository tooling, and Git hooks will be introduced in separate reviewable
commits as their responsibilities are established.

## Engineering principles

- Keep dependencies minimal and justify every addition.
- Introduce abstractions only after a real need is proven.
- Keep commits small, atomic, and reviewable.
- Prefer explicit ownership, clear boundaries, and descriptive names.
- Treat security and simplicity as complementary engineering goals.
- Inspect generated framework output before adopting or modifying it.
- Keep generated artifacts out of source control.
- Pin direct dependency and tool versions deliberately when tooling is introduced.
- Reuse architectural intent from the Angular starter without copying Angular-specific mechanics.

## Target architecture

The intended architecture will evolve toward responsibility-based areas for:

```text
projects/   frontend applications
libs/       reusable capabilities
services/   backend services
tools/      repository tooling
docs/       architecture and engineering documentation
```
