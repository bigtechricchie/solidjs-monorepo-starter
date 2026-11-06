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

  it('updates the parent-owned score when the reaction changes', async () => {
    const result = render(() => <App />)
    const score = result.getByRole('status', { name: 'Feedback score' })
    const like = result.getByRole('button', { name: 'Like' })
    const dislike = result.getByRole('button', { name: 'Dislike' })

    expect(score.textContent).toBe('0')

    fireEvent.click(like)
    await waitFor(() => {
      expect(score.textContent).toBe('1')
    })

    fireEvent.click(dislike)
    await waitFor(() => {
      expect(score.textContent).toBe('-1')
    })

    fireEvent.click(dislike)
    await waitFor(() => {
      expect(score.textContent).toBe('0')
    })
  })
})
