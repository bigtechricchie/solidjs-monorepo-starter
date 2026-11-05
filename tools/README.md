# Repository Tooling

The `tools/` directory contains repository-owned development, verification, and maintenance tooling.

Code in this directory supports the repository itself. It is not application runtime code and should not become a general-purpose library layer.

## Current structure

```text
tools/
├── hooks/
│   ├── commit-msg
│   ├── pre-commit
│   └── pre-push
└── scripts/
    ├── setup-hooks.sh
    └── verify.mjs
```

Additional tooling should be added only when it has a clear repository-level responsibility.

## Verification script

`tools/scripts/verify.mjs` implements the canonical repository verification gate exposed through:

```bash
pnpm verify
```

The script currently verifies:

- the expected Node.js version;
- the expected pnpm version;
- the installed top-level dependency graph;
- the configured Vite version;
- the configured TypeScript version.

The script supports pnpm launchers that may be represented differently across development environments.

For example, pnpm may be exposed as:

- a native Windows executable;
- a native Unix executable;
- a JavaScript entry point.

JavaScript launchers are executed through the current Node.js runtime. Native executables are invoked directly.

This avoids relying on shell-specific command resolution inside the verification script.

## Verification principles

Repository verification must remain explicit and predictable.

Verification tooling must not:

- silently install dependencies;
- rewrite the lockfile;
- modify repository configuration;
- change global package-manager configuration;
- enable telemetry;
- repair a failing development environment automatically;
- weaken a failed check in order to make verification pass.

A failed verification should identify a problem that must be understood and resolved deliberately.

## Git hook setup

Repository Git hooks are tracked under:

```text
tools/hooks/
```

They are not enabled automatically when the repository is cloned.

After cloning the repository, enable the tracked hooks with:

```bash
bash tools/scripts/setup-hooks.sh
```

The setup script configures this repository only:

```text
core.hooksPath=tools/hooks
```

It does not change the user's global or system Git configuration.

If the repository already has a different local `core.hooksPath`, the setup script stops and requires that configuration to be reviewed rather than replacing it silently.

Confirm the configured hooks path with:

```bash
git config --local --get core.hooksPath
```

Expected output:

```text
tools/hooks
```

The tracked hooks currently provide:

```text
commit-msg
→ enforces the repository's Conventional Commits subject format

pre-commit
→ checks staged additions for common credential and private-key patterns

pre-push
→ audits dependencies for known high or critical advisories
→ runs the canonical pnpm verify gate before a push leaves the local repository
```

The pre-commit safeguard scans only staged additions. It does not print suspected secret values.

The check is intentionally limited defense in depth. It may produce false positives, can be bypassed with Git hook controls, does not scan repository history, and does not replace trusted CI or dedicated secret-scanning capabilities.

The pre-push hook always runs:

```bash
pnpm audit --audit-level=high
```

before repository verification.

The audit is defense in depth. A successful audit means no matching known advisories were reported by the configured registry at that time. It does not prove that every dependency is safe or that unknown vulnerabilities do not exist.

Dependency auditing may require registry access and can therefore fail independently of deterministic repository verification.

Git hooks are a local development safeguard and can be bypassed. Trusted CI remains the authoritative remote verification boundary.

## Dependency installation

Dependency installation is intentionally separate from repository verification.

On a fresh checkout, install dependencies with:

```bash
pnpm install --frozen-lockfile
```

Then run:

```bash
pnpm verify
```

Using the frozen lockfile ensures that dependency installation follows the committed dependency graph rather than silently resolving a different graph.

## Continuous integration

GitHub Actions installs dependencies independently, audits them for known high or critical advisories, and then invokes the same canonical verification command:

```bash
pnpm verify
```

This keeps local and trusted CI verification aligned.

CI may perform additional trusted-environment checks where appropriate, but repository verification logic should not be duplicated unnecessarily inside workflow configuration.

## Tooling ownership

Files under `tools/` should satisfy at least one of these responsibilities:

- repository verification;
- development-environment checks;
- Git hook support;
- CI support;
- repository maintenance;
- controlled code-generation support where generation is explicitly justified.

Application-specific behavior belongs with the application that owns it.

Reusable application capabilities belong in the appropriate library boundary.

Backend runtime behavior belongs in the relevant service.

## Adding new tooling

Before introducing a new script or tool, establish:

1. the problem it solves;
2. why existing repository or platform capabilities are insufficient;
3. whether it introduces a new dependency;
4. whether it executes external processes;
5. whether it modifies files or configuration;
6. whether it performs network access;
7. whether it behaves consistently across supported platforms;
8. how its behavior will be verified.

Repository tooling should remain small, understandable, reviewable, and portable where practical.

## Security boundary

Repository tooling is trusted code.

Scripts in this directory may execute during local development, Git hooks, or CI and must therefore be reviewed with the same care as application code.

Particular attention should be given to:

- command execution;
- filesystem modification;
- environment variables;
- dependency installation;
- network access;
- secrets;
- generated files;
- platform-specific behavior.

The presence of a script in `tools/` does not make it trusted automatically. Trust comes from review, controlled dependencies, explicit behavior, and reproducible verification.
