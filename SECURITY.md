# Security Policy

## Supported versions

The SolidJS Monorepo Starter is under active development. Security fixes are considered for the current maintained code on the default branch (`main`).

Older commits, unmerged branches, copied starter applications and downstream forks are not independently maintained or guaranteed to receive security fixes. This repository does not currently publish a versioned security-support schedule.

## Reporting a vulnerability

**Please do not disclose suspected vulnerabilities, exploit details, credentials or other sensitive evidence through public GitHub issues, pull requests or discussions.**

Use [GitHub's private vulnerability reporting for this repository](https://github.com/bigtechricchie/solidjs-monorepo-starter/security/advisories/new) **if the feature is enabled**. GitHub requires the repository maintainer to enable private vulnerability reporting before that submission route is available. If the link does not offer a private reporting form, do not post the report publicly; check again after private reporting has been enabled.

Include enough information for the maintainer to assess and reproduce the problem, where it is safe to do so:

- a concise description of the issue and the affected component or file;
- the commit, version or environment where it was observed;
- minimal reproduction steps and the expected versus actual behaviour;
- the potential security impact and any conditions required to exploit it;
- any suggested mitigation.

Do not include production secrets, other people's private data, active credentials or unnecessary sensitive information in the report.

## Review and coordinated disclosure

The maintainer aims to acknowledge and assess reports, reproduce actionable findings, determine impact and scope, and prepare appropriate fixes or mitigations.

Response and remediation times depend on severity, reproducibility and maintainer availability. No fixed response-time guarantee or bug-bounty programme is offered.

Please allow an opportunity for investigation and remediation before publicly disclosing a confirmed issue. Coordinate any public disclosure with the maintainer through the private reporting channel when available. Confidential handling is intended, but no absolute confidentiality guarantee is made.

## Scope and limitations

This repository is a development starter and reference implementation, **not a security-certified or fully hardened production system**. A passing test suite, dependency audit or CI check does not establish that the code is free of vulnerabilities.

Security reports about the repository's own code, tooling, dependency installation, CI or documented development configuration are welcome. For a vulnerability that exists solely in a third-party dependency, please also report it to the relevant upstream maintainer through their appropriate private reporting channel.

## Related documentation

See [Security Decisions](docs/security-decisions.md) for the project's technical security controls, threat boundaries, dependencies and verification limitations.
