import { cleanup, render } from '@solidjs/testing-library'
import { afterEach, describe, expect, it } from 'vitest'

import NotFound from './NotFound'

afterEach(() => {
  cleanup()
})

describe('NotFound', () => {
  it('explains an unknown page and offers a way home', () => {
    const result = render(() => <NotFound />)

    expect(
      result.getByRole('heading', { level: 2, name: 'Page not found' }),
    ).toBeDefined()
    expect(result.getByText('The requested page could not be found.')).toBeDefined()
    expect(
      result.getByRole('link', { name: 'Return to Home' }).getAttribute('href'),
    ).toBe('/')
  })
})
