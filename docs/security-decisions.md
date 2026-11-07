# Security Decisions

This document records security-oriented engineering decisions that shape the SolidJS Monorepo Starter.

The goal is not to claim that the starter is secure by default, production-ready, enterprise-grade, banking-grade, or immune to supply-chain compromise.

Instead, the repository makes selected trust boundaries, dependency controls, local-development safeguards, and verification limitations explicit so they can be reviewed and changed deliberately.

## Principles

The repository follows these recurring principles:

- minimise dependencies and tooling;
- prefer platform and framework-native capabilities before third-party abstractions;
- pin direct dependency and core tool versions exactly;
- install the committed dependency graph with a frozen lockfile in trusted CI;
- treat build tooling and dependency installation as part of the software supply chain;
- keep security-sensitive changes small and reviewable;
- document limitations as explicitly as protections;
- avoid treating a passing check as proof of security.

## Dependency versions and lockfile

Direct dependencies and core tools are pinned to exact versions.

The committed pnpm lockfile is installed in GitHub Actions with:

```text
pnpm install --frozen-lockfile
```

This prevents CI from silently resolving a different dependency graph than the one committed for review.

Exact pins and a frozen lockfile improve reproducibility, but they do not establish that a dependency is safe.

## Minimum package release age

The workspace configures:

```yaml
minimumReleaseAge: 4320
minimumReleaseAgeStrict: true
minimumReleaseAgeIgnoreMissingTime: false
```

The 4320-minute value creates a 72-hour delay before newly published package versions are normally eligible for installation.

The delay is defense in depth. It gives the ecosystem additional time to discover compromised or problematic releases before they are adopted, but it does not prove that an older release is safe.

### Temporary prerelease exception

The workspace currently contains:

```yaml
minimumReleaseAgeExclude:
  - '@solidjs/vite-plugin@3.0.0-next.57'
```

This narrow, exact-version exception was explicitly approved to adopt the upstream Babel-optional native compiler fix in `3.0.0-next.57` before the normal 72-hour cooldown. It does not exempt other versions or packages.

It must remain temporary.

Removal condition:

- remove the exception once the release passes the 72-hour cooldown (9 November 2026 at 18:42:39 UTC), or when the repository moves to another reviewed plugin version;
- verify `pnpm install --frozen-lockfile` and trusted CI after removal;
- do not broaden the exception to a package-wide wildcard without separate review.

## Dependency-provided agent skills

The workspace explicitly denies package-provided agent skills for the current SolidJS packages:

```yaml
permissions:
  '@solidjs/web':
    skills: false
  solid-js:
    skills: false
```

Installing a package does not implicitly authorise package-provided agent instructions.

Any future permission change requires separate review.

## Dependency auditing

Local pre-push verification and GitHub Actions run:

```text
pnpm audit --audit-level=high
```

The gate fails when matching known high or critical advisories are reported by the configured audit source.

A clean audit means only that no matching known advisories were reported at that time. It does not prove that dependencies are free from unknown vulnerabilities or malicious behaviour.

The audit may require network access and is therefore distinct from deterministic repository verification.

## Native Git hooks

The repository uses native Git hooks instead of a third-party hook manager.

Tracked hooks provide:

- Conventional Commit subject validation;
- staged secret/private-key pattern detection;
- dependency auditing before push;
- canonical repository verification before push.

The hooks are local safeguards only.

They can be bypassed, are not automatically enabled by Git, and do not replace trusted CI.

### Secret-pattern detection limitation

The pre-commit check scans staged added lines for common credential assignments and private-key headers.

It is intentionally heuristic.

It can produce false positives and cannot reliably detect every secret format, encoded credential, multiline secret, credential already present in history, or secret introduced outside the patterns it recognises.

It does not print suspected secret values.

## Native Solid compiler and Babel

The Vite configuration explicitly selects:

```ts
solid({
  compiler: 'native',
})
```

The official plugin previously installed the Babel compiler packages even when `compiler: 'native'` was selected. Upstream [issue #531](https://github.com/solidjs/solid-vite-plugin/issues/531) was addressed by [PR #532](https://github.com/solidjs/solid-vite-plugin/pull/532), published in `@solidjs/vite-plugin@3.0.0-next.57`.

The plugin now declares `@babel/core` and `@solidjs/babel-plugin` as **optional peer dependencies**. The committed lockfile was regenerated from a clean dependency resolution using pinned pnpm 12.15.0, without overrides; neither Babel compiler package nor `@types/babel__core` is present in that lockfile.

Some independently required `@babel/*` utilities remain (including `@babel/code-frame`, `@babel/helper-validator-identifier`, and `@babel/runtime`). Do not equate the removal of Babel compiler dependencies with an absence of all Babel-named packages.

Canonical verification registers a Node.js module-resolution blocker and builds both:

- a focused native-compiler fixture;
- the actual reference application.

Those tested builds pass while recognised Babel-related imports and resolved paths are rejected. This is a regression guard for the tested paths, **not** proof that every Vite development mode, SSR path, custom plugin or future dependency can never use Babel.

No package-manager overrides are used to forcibly remove Babel packages.

## Local development network binding

The Vite development and preview servers explicitly bind to:

```text
127.0.0.1
```

This reduces accidental exposure to other machines on LAN or VPN interfaces.

Loopback binding is not authentication.

Other local processes, browser-originated requests, deliberate forwarding, tunnels, proxies, and deployment configuration remain separate concerns.

Production secrets or real customer data should not be assumed safe merely because a development server binds to loopback.

Container and production listener configuration must be reviewed separately.

## Trusted CI

GitHub Actions currently uses:

- SHA-pinned actions;
- a pinned Ubuntu runner;
- exact Node.js and pnpm versions;
- frozen-lockfile installation;
- high-severity dependency auditing;
- canonical repository verification;
- shell syntax validation;
- minimal repository permissions with read-only contents access.

These controls create a trusted remote verification boundary for the checks currently implemented.

They do not constitute a security certification.

## Verification scope

A successful `pnpm verify` currently demonstrates that the repository-owned checks passed, including:

- expected Node.js version;
- expected pnpm version;
- installed top-level dependency availability;
- Vite availability;
- TypeScript availability;
- native Solid compiler fixture build with recognised Babel imports blocked;
- reference-application strict type-check;
- reference-application component tests;
- reference-application production build with recognised Babel imports blocked.

Passing verification does not prove:

- application correctness outside tested paths;
- absence of vulnerabilities;
- secure deployment configuration;
- correct authentication or authorization;
- safe handling of future application data;
- absence of malicious behaviour in all dependencies.

## Controls not yet present

The starter does not currently claim to provide:

- comprehensive secret scanning;
- browser end-to-end security testing;
- SAST or DAST coverage;
- SBOM generation;
- artifact signing or provenance attestations;
- production deployment hardening;
- authentication or authorization controls;
- database security controls.

These capabilities should be introduced only when the repository gains requirements that justify them.

## Review principle

Security decisions in this repository are expected to evolve.

When a control, exception, or trust boundary changes:

1. keep the change focused;
2. document the reason;
3. record any temporary exception and its removal condition;
4. update verification where the new behaviour can be tested;
5. avoid converting a local safeguard into a broader security claim than the evidence supports.
