import { cleanup, render } from '@solidjs/testing-library'
import { afterEach, describe, expect, it } from 'vitest'

import About from './About'

afterEach(() => {
  cleanup()
})

describe('About', () => {
  it('describes the starter and its development principles', () => {
    const result = render(() => <About />)

    expect(
      result.getByRole('heading', { level: 2, name: 'About this starter' }),
    ).toBeDefined()
    expect(result.getByText(/maintainable SolidJS/)).toBeDefined()
    expect(result.getByText(/reproducible development workflows/)).toBeDefined()
  })
})
