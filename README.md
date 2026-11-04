# SolidJS Monorepo Starter

A security-focused SolidJS and Go monorepo starter designed for fast prototyping and clear application boundaries.

Built and maintained by Edward Siwek.

> **Applications own composition. Libraries own capabilities.**

This repository is being constructed incrementally from first principles.

The repository is being designed around explicit ownership, minimal dependencies, reproducible verification, and SolidJS-native architecture.

Framework-specific decisions are introduced deliberately and reviewed on their own merits rather than inherited from another frontend architecture.

## Current status

The repository currently provides the reviewed frontend toolchain and repository-verification foundation for future SolidJS applications and Go services.

The current baseline includes:

- SolidJS 2 release-candidate packages;
- the native Solid compiler through `@solidjs/vite-plugin`;
- Vite;
- TypeScript;
- an exact Node.js and pnpm toolchain baseline;
- pnpm dependency and supply-chain policy;
- a committed lockfile;
- explicit denial of dependency-provided agent skills;
- a canonical repository verification command;
- trusted GitHub Actions verification with SHA-pinned actions and minimal permissions.

Applications, reusable libraries, Go services, testing infrastructure, Git hooks, routing, state management, and other capabilities will be introduced only when their responsibilities are established and reviewed.

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
solid-js               2.0.0-rc.10
@solidjs/web            2.0.0-rc.10
@solidjs/vite-plugin    3.0.0-next.46
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

This means application JSX and TSX compilation uses the native Solid compiler.

Babel-related packages may still appear as transitive dependencies of the official Solid Vite integration because the integration supports multiple compiler backends.

Their presence in the dependency graph does not mean Babel is being used to compile this application's source code.

## Dependency policy

Dependencies are added deliberately and should remain minimal.

The repository currently uses:

- exact dependency versions;
- a committed pnpm lockfile;
- strict engine enforcement;
- a dependency-release cooldown;
- frozen-lockfile installation in CI;
- explicit dependency permissions.

The workspace currently denies the `solid-js` dependency-provided agent skill:

```yaml
permissions:
  solid-js:
    skills: false
```

Using `solid-js` as an application dependency is independent from trusting package-provided instructions for AI coding agents.

## Repository verification

The canonical repository verification command is:

```bash
pnpm verify
```

The command currently verifies the repository-owned Node.js and pnpm versions and checks that the expected Vite and TypeScript tooling can be invoked from the installed dependency graph.

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

A successful verification confirms only that the checks currently implemented by the repository passed. It is not a security certification or proof that future application code is correct.


## Local Git hooks

After cloning the repository, enable the tracked local Git hooks:

```bash
bash tools/scripts/setup-hooks.sh
```

The hooks provide local development safeguards but do not replace trusted CI verification.

See `tools/README.md` for the hook ownership and setup model.


## Continuous integration

GitHub Actions performs independent repository verification for pushes to `main` and pull requests.

The workflow currently:

1. checks out the repository using a SHA-pinned GitHub Action;
2. installs the repository-owned Node.js version;
3. installs the exact pnpm version;
4. verifies the pnpm version;
5. installs dependencies using the frozen lockfile;
6. runs the canonical `pnpm verify` gate.

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
