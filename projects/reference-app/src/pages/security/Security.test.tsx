import { cleanup, render } from '@solidjs/testing-library'
import { afterEach, describe, expect, it } from 'vitest'

import Security from './Security'

afterEach(() => {
  cleanup()
})

describe('Security', () => {
  it('describes existing safeguards without claiming security certification', () => {
    const result = render(() => <Security />)

    expect(
      result.getByRole('heading', { level: 2, name: 'Security' }),
    ).toBeDefined()
    expect(result.getByText(/exact-version dependencies/)).toBeDefined()
    expect(result.getByText(/local loopback address/)).toBeDefined()
    expect(result.getByText(/not make this reference/)).toBeDefined()
    expect(result.getByText(/report suspected vulnerabilities privately/)).toBeDefined()
    expect(
      result.getByRole('link', { name: 'security decisions and limitations' }).getAttribute('href'),
    ).toBe(
      'https://github.com/bigtechricchie/solidjs-monorepo-starter/blob/main/docs/security-decisions.md',
    )
  })
})
