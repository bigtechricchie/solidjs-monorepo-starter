function Security() {
  return (
    <section class="app__content">
      <h2 class="app__section-title">Security</h2>
      <p>
        This starter uses reviewed, exact-version dependencies and a committed
        pnpm lockfile to make dependency changes explicit.
      </p>
      <p>
        Repository verification checks the configured toolchain, type checks,
        tests, and builds the reference application. The development server
        binds to the local loopback address by default.
      </p>
      <p>
        These safeguards reduce risk, but they do not make this reference
        application a security-certified or production-hardened system.
      </p>
      <p>
        Please report suspected vulnerabilities privately using the process
        described in the repository's security policy. Do not include
        credentials or sensitive information in public reports.
      </p>
      <p>
        Read our{' '}
        <a href="https://github.com/bigtechricchie/solidjs-monorepo-starter/blob/main/docs/security-decisions.md">
          security decisions and limitations
        </a>
        .
      </p>
    </section>
  )
}

export default Security
