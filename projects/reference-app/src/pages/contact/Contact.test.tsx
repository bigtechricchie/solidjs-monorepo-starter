import { cleanup, render } from '@solidjs/testing-library'
import { afterEach, describe, expect, it } from 'vitest'

import Contact from './Contact'

afterEach(() => {
  cleanup()
})

describe('Contact', () => {
  it('provides distinct project, professional, and private security links', () => {
    const result = render(() => <Contact />)

    expect(
      result.getByRole('heading', { level: 2, name: 'Contact' }),
    ).toBeDefined()
    expect(
      result.getByRole('link', { name: 'View project issues on GitHub' }).getAttribute('href'),
    ).toBe('https://github.com/bigtechricchie/solidjs-monorepo-starter/issues')
    expect(
      result.getByRole('link', { name: "View Edward's GitHub profile" }).getAttribute('href'),
    ).toBe('https://github.com/bigtechricchie')
    expect(
      result.getByRole('link', { name: 'Report a vulnerability privately' }).getAttribute('href'),
    ).toBe('https://github.com/bigtechricchie/solidjs-monorepo-starter/security/advisories/new')
    expect(result.getByText(/open to freelance and contract opportunities/)).toBeDefined()
    expect(result.getByText(/Do not post suspected vulnerabilities/)).toBeDefined()
  })
})
