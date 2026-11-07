import { cleanup, render } from '@solidjs/testing-library'
import { afterEach, describe, expect, it } from 'vitest'

import Author from './Author'

afterEach(() => {
  cleanup()
})

describe('Author', () => {
  it('identifies the maintainer and links to his GitHub profile', () => {
    const result = render(() => <Author />)

    expect(
      result.getByRole('heading', { level: 2, name: 'Author' }),
    ).toBeDefined()
    expect(result.getByText(/built and maintained by Edward Siwek/)).toBeDefined()
    expect(
      result.getByText(/available for freelance and contract software engineering/),
    ).toBeDefined()
    expect(
      result.getByRole('link', { name: 'Learn more about Edward on GitHub' }).getAttribute('href'),
    ).toBe('https://github.com/bigtechricchie')
  })
})
