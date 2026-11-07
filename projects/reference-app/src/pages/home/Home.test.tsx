import { cleanup, fireEvent, render, waitFor } from '@solidjs/testing-library'
import { afterEach, describe, expect, it } from 'vitest'

import Home from './Home'

afterEach(() => {
  cleanup()
})

describe('Home', () => {
  it('renders the reference application and feedback controls', () => {
    const result = render(() => <Home />)

    expect(
      result.getByRole('heading', { level: 2, name: 'Reference application' }),
    ).toBeDefined()
    expect(
      result.getByRole('heading', { level: 3, name: 'Do you like this starter' }),
    ).toBeDefined()
    expect(result.getByRole('button', { name: 'Like' })).toBeDefined()
    expect(result.getByRole('button', { name: 'Dislike' })).toBeDefined()
  })

  it('owns and updates feedback selection', async () => {
    const result = render(() => <Home />)
    const like = result.getByRole('button', { name: 'Like' })
    const dislike = result.getByRole('button', { name: 'Dislike' })

    expect(like.getAttribute('aria-pressed')).toBe('false')

    fireEvent.click(like)
    await waitFor(() => {
      expect(like.getAttribute('aria-pressed')).toBe('true')
      expect(dislike.getAttribute('aria-pressed')).toBe('false')
    })

    fireEvent.click(dislike)
    await waitFor(() => {
      expect(like.getAttribute('aria-pressed')).toBe('false')
      expect(dislike.getAttribute('aria-pressed')).toBe('true')
    })
  })
})
