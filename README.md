# SolidJS Monorepo Starter

A security-focused SolidJS and Go monorepo starter designed for fast prototyping and clear application boundaries.

Built and maintained by Edward Siwek.

> **Applications own composition. Libraries own capabilities.**

This repository is being constructed incrementally from first principles.

The repository is being designed around explicit ownership, minimal dependencies, reproducible verification, and SolidJS-native architecture.

## Current status

The repository provides a reviewed frontend toolchain, a minimal SolidJS reference application, and repository-owned verification as a foundation for future SolidJS applications and Go services.

The current baseline includes:

- SolidJS 2 release-candidate packages;
- the native Solid compiler through `@solidjs/vite-plugin`;
- Vite;
- TypeScript;
- an exact Node.js and pnpm toolchain baseline;
- pnpm dependency and supply-chain policy;
- a committed lockfile;
- explicit denial of dependency-provided agent skills;
- a canonical repository verification command with a Babel-blocked native TSX compiler fixture;
- a minimal reference application in `projects/reference-app` with explicit development, build, and type-check scripts;
- trusted GitHub Actions verification with SHA-pinned actions and minimal permissions.

Further applications, reusable libraries, Go services, testing infrastructure, routing, state management, and other capabilities will be introduced only when their responsibilities are established and reviewed.

## Toolchain baseline

The repository currently pins:

```text
Node.js     24.20.0
pnpm        12.15.0
Vite        8.3.5
TypeScript  7.0.2
```

The current SolidJS packages are:

```text
solid-js               2.0.0-rc.19
@solidjs/web            2.0.0-rc.19
@solidjs/vite-plugin    3.0.0-next.56
```

SolidJS 2 is currently being used deliberately because this repository requires the native Solid compiler rather than Babel as the application compiler.

The SolidJS prerelease dependency decision is therefore intentional and should be reviewed again when a suitable stable SolidJS 2 release becomes available.

## Native Solid compiler

The Vite configuration explicitly selects the native Solid compiler:

```ts
solid({
  compiler: 'native',
})
```

This selects the native SolidJS compiler for the repository's configured JSX and TSX compilation.

The official Vite plugin still declares Babel packages as dependencies to support its alternative compiler backend. Consequently, `@babel/core` and `@solidjs/babel-plugin` remain installed transitively in this repository even when `compiler: 'native'` is selected. **Installed dependencies and modules actually loaded during a build are different properties.**

### Native compiler verification and limitations

Canonical `pnpm verify` builds a representative reactive TSX fixture with Node.js module-resolution hooks that reject recognised Babel imports. With the pinned plugin version, the fixture compiles successfully while this blocker is enabled. The same check runs in GitHub Actions.

This verifies the tested native compilation path; it does **not** establish that Babel is absent from the installed dependency graph or that every development, server-rendering, custom-options, or reference-application build path avoids Babel. Reference-application verification is handled separately.

The upstream Babel-free native installation change was merged in [solidjs/solid-vite-plugin#532](https://github.com/solidjs/solid-vite-plugin/pull/532) and published in `@solidjs/vite-plugin@3.0.0-next.57` on 6 November 2026. That version makes Babel packages optional peers. This repository deliberately remains on pinned `3.0.0-next.56` until the newer version satisfies the enforced 72-hour release-age policy, at which point the lockfile and Babel-free dependency graph require a separate reviewed upgrade. Do not force-remove Babel dependencies through overrides.

## Local development server network binding

The Vite development and preview servers explicitly bind to the IPv4 loopback address `127.0.0.1` rather than relying on hostname resolution or wildcard interface defaults.

Run the reference application with:

```bash
pnpm dev:reference-app
```

The default development URL is `http://127.0.0.1:5173/` when that port is available. Vite may select a different port if it is in use; use the address printed by Vite.

The loopback bind reduces exposure to other machines on LAN or VPN interfaces, but it is **not** authentication: other local processes, browser-originated requests, and intentional forwarding or tunnelling remain relevant. Do not use production secrets or real customer data in local development. The intended host/interface for containers and production deployments must be explicitly reviewed separately.

For more detail, see [Localhost Is Not a Security Boundary](https://github.com/bigtechricchie/engineering-articles/blob/main/articles/localhost-development-server-exposure.md).

## Dependency policy

Dependencies are added deliberately and should remain minimal.

The repository currently uses:

- exact dependency versions;
- a committed pnpm lockfile;
- strict engine enforcement;
- a 72-hour dependency-release cooldown (`minimumReleaseAge: 4320`);
- frozen-lockfile installation in CI;
- explicit dependency permissions.

The workspace explicitly denies dependency-provided agent skills for both `solid-js` and `@solidjs/web`:

```yaml
permissions:
  '@solidjs/web':
    skills: false
  solid-js:
    skills: false
```

Installing a framework package does not authorise its agent instructions. Any additional permissions require separate review.

## Repository verification

The canonical repository verification command is:

```bash
pnpm verify
```

The command verifies the repository-owned Node.js and pnpm versions, confirms that Vite and TypeScript can be invoked from the installed dependency graph, builds a native SolidJS TSX fixture with recognised Babel module imports blocked, type-checks the reference application, and production-builds the reference application with the same Babel module-resolution blocker enabled.

The same verification entry point is used locally and by GitHub Actions.

The verification command does not install or repair dependencies automatically.

Before running verification on a fresh checkout, install the reviewed dependency graph with:

```bash
pnpm install --frozen-lockfile
```

Then run:

```bash
pnpm verify
```

The reference application also has separate development, build, and type-check commands:

```bash
pnpm dev:reference-app
pnpm build:reference-app
pnpm typecheck:reference-app
```

Canonical `pnpm verify` now invokes the reference application's type-check and performs its production build through repository-owned verification tooling. The verification build uses a temporary output directory and does not leave generated `dist/` content in the source tree.

A successful verification confirms only that the checks currently implemented by the repository passed. It is not a security certification or proof that future application code is correct.


## Local Git Hooks - Security Without Additional Dependencies

This repository uses native Git hooks to provide lightweight security and quality checks during local development.

We deliberately avoid third-party Git hook managers such as Husky because Git already provides the functionality we need.

This approach:

- **Minimises supply-chain risk:** No additional npm packages or transitive dependencies are required to manage Git hooks.
- **Keeps configuration transparent:** Hook scripts are stored in the repository and can be reviewed directly.
- **Protects developer environments:** Hooks are enabled explicitly and do not modify global Git configuration.
- **Provides early feedback:** Checks can identify potential credentials, invalid commit messages and dependency vulnerabilities before changes are pushed.
- **Avoids unnecessary tooling:** Native Git capabilities are sufficient for the current requirements.

The pre-push hook automatically runs `pnpm audit --audit-level=high` and `pnpm verify`. If a vulnerability is reported, dependency updates are investigated and applied manually after reviewing the advisory, affected packages, available versions and transitive dependencies.

Git hooks never automatically install, upgrade or modify dependencies.

### Enable local Git hooks

After cloning the repository, run:

```bash
bash tools/scripts/setup-hooks.sh
```

This configures the repository-local `core.hooksPath` to use `tools/hooks`.

Git hooks are local safeguards and can be bypassed. They do not replace independent security checks in GitHub Actions.

See `tools/README.md` for implementation details.


## Continuous integration

GitHub Actions performs independent repository verification for pushes to `main` and pull requests.

The workflow currently:

1. checks out the repository using a SHA-pinned GitHub Action;
2. installs the repository-owned Node.js version;
3. installs the exact pnpm version;
4. verifies the pnpm version;
5. installs dependencies using the frozen lockfile;
6. audits dependencies for known high or critical advisories;
7. runs the canonical `pnpm verify` gate;
8. validates tracked shell-script syntax.

Workflow permissions are deliberately minimal and currently grant read access to repository contents only.

Additional CI checks will be added only when corresponding repository capabilities exist.

## Engineering principles

- Keep dependencies minimal and justify every addition.
- Prefer platform and framework-native capabilities before introducing third-party abstractions.
- Introduce abstractions only after a real need is proven.
- Keep commits small, atomic, and reviewable.
- Prefer explicit ownership, clear boundaries, and descriptive names.
- Treat security and simplicity as complementary engineering goals.
- Treat dependency installation and build tooling as part of the software supply chain.
- Pin direct dependency and tool versions deliberately.
- Keep the lockfile reviewed and reproducible.
- Do not silently install tools or modify global development configuration from repository verification.
- Evaluate framework-specific architecture independently and prefer SolidJS-native patterns over transferred conventions from other frameworks.
- Use SolidJS-native architecture rather than transferring React or Angular patterns mechanically.
- Keep generated artifacts out of source control.

## Target architecture

The repository will evolve toward responsibility-based areas as those responsibilities become real:

```text
projects/   frontend applications
libs/       reusable capabilities
services/   backend services
tools/      repository development and verification tooling
docs/       architecture and engineering documentation
```

Directories should not be added merely to satisfy a theoretical architecture.

## Development approach

New capabilities should normally follow this sequence:

```text
requirement
→ decision
→ security and trust review
→ scope
→ implementation
→ verification
→ review
→ commit
```

Framework features, libraries, infrastructure, and repository automation should be introduced only when they solve a defined problem.

The starter is intended to remain small enough to understand, review, and adapt rather than becoming a collection of speculative infrastructure.

## Security decisions

Security-oriented repository decisions, trust boundaries, temporary exceptions, and verification limitations are documented in [docs/security-decisions.md](docs/security-decisions.md).

The document records what the current controls do and, equally importantly, what they do not prove.
