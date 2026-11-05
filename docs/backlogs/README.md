# Engineering Backlog

The backlog provides a shared coordination point for contributors working on the SolidJS Monorepo Starter.

Start with [BACKLOG.md](BACKLOG.md).

The backlog is intentionally dependency-aware. Tasks marked **Ready** may be picked up now. Tasks marked **Blocked** should not be implemented until their prerequisites are complete. **Proposed** work requires scope refinement before implementation.

## Contributor coordination

Before taking work:

1. choose one Ready task;
2. announce ownership in the pull request, issue, or agreed coordination channel;
3. identify files likely to be changed;
4. coordinate any overlap involving shared repository configuration;
5. keep the pull request limited to the selected task.

Shared configuration includes:

```text
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
tsconfig.json
vite.config.ts
.github/workflows/**
tools/scripts/**
tools/hooks/**
```

Changes in those areas can affect multiple workstreams and should not be developed independently without coordination.

## Task status

```text
Ready
→ sufficiently defined and available to start

Blocked
→ prerequisite work is incomplete

Proposed
→ direction is useful but implementation scope is not final

Completed
→ checkpoint already established
```

The backlog is an engineering coordination tool, not permission to add speculative architecture. Repository principles and review requirements remain authoritative.
