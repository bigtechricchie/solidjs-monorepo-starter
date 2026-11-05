# Engineering Backlog

This file is the shared index for planned engineering work in the SolidJS Monorepo Starter.

The backlog is ordered by dependency and architectural maturity. A lower-numbered task should not be implemented merely because it appears earlier if its stated prerequisite is not complete.

Status values:

- **Ready** — sufficiently defined and may be picked up now.
- **Blocked** — depends on another task or external decision.
- **Proposed** — useful work, but scope should be refined before implementation.
- **Completed** — retained here only when it forms part of the current checkpoint.

## Current checkpoint

The repository foundation is established.

| ID | Milestone | Status |
| --- | --- | --- |
| BASE-001 | Repository identity and engineering principles | Completed |
| BASE-002 | Exact Node.js and pnpm toolchain baseline | Completed |
| BASE-003 | pnpm dependency and release-age policy | Completed |
| BASE-004 | Native Git hooks and Conventional Commits enforcement | Completed |
| BASE-005 | Dependency audit and canonical pre-push verification | Completed |
| BASE-006 | Trusted GitHub Actions verification | Completed |
| TS-001 | Strict TypeScript baseline | Completed |
| SOLID-001 | SolidJS 2 native compiler selection and verification | Completed |
| SOLID-002 | Babel module-resolution regression guard | Completed |
| SOLID-003 | Track Babel-free native installation upstream | Completed |
| APP-001 | Minimal reference application boundary | Completed |
| APP-002 | Reference-app type-check and production-build verification | Completed |
| DEV-001 | IPv4 loopback binding for Vite development and preview | Completed |
| REPO-001 | Ignore generated reference-app build output | Completed |

## Active engineering backlog

| Order | ID | Task | Type | Priority | Status | Depends on | Parallel work |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 1 | DOC-001 | Bring repository tooling documentation in sync with the current verification tree | Documentation | Medium | Ready | — | Can run independently |
| 2 | CI-001 | Add Dependabot policy for npm and GitHub Actions | Supply chain | Medium | Ready | — | Can run independently |
| 3 | SEC-001 | Add a security-decisions document for established trust boundaries and deliberate exceptions | Security docs | Medium | Ready | — | Can run independently |
| 4 | TEST-001 | Establish the minimal SolidJS unit-test baseline | Testing | High | Ready | APP-001 | Coordinate with FE-001 |
| 5 | FE-001 | Add a small interactive SolidJS reference feature using signals and event handling | Frontend | High | Ready | APP-001 | Coordinate with TEST-001 |
| 6 | CSS-001 | Establish the first native-CSS foundation from demonstrated reference-app needs | Frontend | Medium | Blocked | FE-001 | Starts after real UI styling exists |
| 7 | ROUTE-001 | Evaluate and introduce routing only when the reference app has a second meaningful page | Frontend | Medium | Blocked | FE-001 | Do not add router speculatively |
| 8 | API-001 | Establish a minimal standard-library Go HTTP service with a health endpoint | Backend | High | Ready | — | Can run in parallel with frontend work |
| 9 | API-002 | Define a framework-neutral health-response contract and runtime parser | Shared capability | Medium | Blocked | API-001 | Starts after real API contract exists |
| 10 | FE-002 | Integrate the reference app with the health endpoint, including loading and error states | Frontend/API | High | Blocked | API-001, API-002 | — |
| 11 | PROXY-001 | Add explicit local development proxying only if required by the chosen frontend/API topology | Integration | Medium | Blocked | API-001, FE-002 | — |
| 12 | I18N-001 | Introduce translation contracts only after shared user-facing wording exists | Shared capability | Low | Proposed | FE-001 | Avoid runtime i18n dependency initially |
| 13 | UI-001 | Extract reusable presentational UI only after a second real consumer demonstrates reuse | Shared capability | Low | Proposed | FE-001 | No speculative component library |
| 14 | APP-003 | Add a second independent application to prove composition boundaries | Architecture | Medium | Blocked | FE-002 | Should not import from reference-app |
| 15 | TOOL-001 | Make pre-push verification affected-work aware once multiple apps/services exist | Tooling | Medium | Blocked | API-001, APP-003 | — |
| 16 | CI-002 | Expand trusted CI to discover and verify every supported application/service boundary | CI | High | Blocked | API-001, APP-003 | — |
| 17 | GOV-001 | Establish repository backlog/task workflow once multiple contributors are actively picking work | Governance | Medium | Ready | — | Can run independently |

## Recommended parallel workstreams

The following tasks may be developed concurrently without intentional file ownership overlap:

```text
Workstream A — repository and supply-chain
DOC-001
CI-001
SEC-001

Workstream B — frontend behaviour
TEST-001
FE-001

Workstream C — backend foundation
API-001

Workstream D — contributor workflow
GOV-001
```

Developers should announce ownership before starting a task. Work that changes shared files such as `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `vite.config.ts`, CI workflows, or canonical verification scripts must be coordinated with other active workstreams.

## Architecture constraints

The backlog does not authorize implementation that violates these repository principles:

- applications own composition;
- reusable libraries own proven shared capabilities;
- applications must not depend on one another;
- dependencies require explicit justification;
- prefer platform and framework-native capabilities before third-party abstractions;
- use native CSS unless another styling layer is justified;
- keep framework-neutral contracts independent from SolidJS and browser APIs;
- keep backend services independently executable;
- do not add directories, libraries, routers, state libraries, test frameworks, or infrastructure solely to make the repository look complete.

## Picking up a task

Before starting:

1. Confirm the task status is **Ready**.
2. Confirm its prerequisites are complete.
3. Check that another developer has not already claimed overlapping files or scope.
4. Create a focused branch for one task.
5. Keep dependency additions and architectural changes inside that task's stated scope.
6. Run the repository verification required by the change.
7. Open a focused pull request and reference the task ID.

When a task proves that another abstraction is needed, record the new requirement separately rather than silently broadening the current task.
