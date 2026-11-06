import { cleanup, fireEvent, render, waitFor } from '@solidjs/testing-library'
import { afterEach, describe, expect, it } from 'vitest'

import App from './App'

afterEach(() => {
  cleanup()
})

describe('App', () => {
  it('renders the reference application shell and starter feedback', () => {
    const result = render(() => <App />)

    expect(
      result.getByRole('heading', {
        level: 1,
        name: 'SolidJS Monorepo Starter',
      }),
    ).toBeDefined()

    expect(
      result.getByRole('heading', {
        level: 2,
        name: 'Reference application',
      }),
    ).toBeDefined()

    expect(
      result.getByRole('navigation', {
        name: 'Reference application',
      }),
    ).toBeDefined()

    expect(result.getByRole('main')).toBeDefined()

    expect(
      result.getByRole('heading', {
        name: 'Do you like this starter?',
      }),
    ).toBeDefined()
    expect(result.getByRole('button', { name: 'Like' })).toBeDefined()
    expect(result.getByRole('button', { name: 'Dislike' })).toBeDefined()
    expect(
      result.queryByRole('button', { name: 'Increment count' }),
    ).toBeNull()
  })

  it('updates parent-owned reaction state through the feedback callback', async () => {
    const result = render(() => <App />)
    const like = result.getByRole('button', { name: 'Like' })
    const dislike = result.getByRole('button', { name: 'Dislike' })

    expect(like.getAttribute('aria-pressed')).toBe('false')
    expect(dislike.getAttribute('aria-pressed')).toBe('false')

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

    fireEvent.click(dislike)
    await waitFor(() => {
      expect(like.getAttribute('aria-pressed')).toBe('false')
      expect(dislike.getAttribute('aria-pressed')).toBe('false')
    })
  })
})
