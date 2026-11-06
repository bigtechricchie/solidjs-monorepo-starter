import { createSignal } from 'solid-js'
import { cleanup, fireEvent, render, waitFor } from '@solidjs/testing-library'
import { afterEach, describe, expect, it } from 'vitest'

import StarterFeedback, { type Reaction } from './StarterFeedback'

afterEach(() => {
  cleanup()
})

function renderFeedback() {
  const [reaction, setReaction] = createSignal<Reaction | null>(null)
  const count = () => reaction() === 'like' ? 1 : reaction() === 'dislike' ? -1 : 0

  return render(() => (
    <StarterFeedback
      count={count()}
      onReactionChange={setReaction}
      reaction={reaction()}
    />
  ))
}

describe('StarterFeedback', () => {
  it('receives an initial score of zero from the parent', () => {
    const result = renderFeedback()

    expect(
      result.getByRole('heading', { name: 'Do you like this starter?' }),
    ).toBeDefined()
    expect(result.getByRole('status').textContent).toBe(
      'Choose a reaction to try this interactive example.',
    )
    expect(result.getByRole('status', { name: 'Feedback score' }).textContent).toBe('0')
    expect(result.getByRole('button', { name: 'Like' }).getAttribute('aria-pressed')).toBe('false')
    expect(result.getByRole('button', { name: 'Dislike' }).getAttribute('aria-pressed')).toBe('false')
    expect(result.getByText(/not saved or submitted/)).toBeDefined()
  })

  it('notifies the parent when Like is selected or cleared', async () => {
    const result = renderFeedback()
    const like = result.getByRole('button', { name: 'Like' })
    const score = result.getByRole('status', { name: 'Feedback score' })

    fireEvent.click(like)
    await waitFor(() => {
      expect(score.textContent).toBe('1')
      expect(like.getAttribute('aria-pressed')).toBe('true')
      expect(result.getByRole('status', { name: '' }).textContent).toBe(
        'Thanks for your positive feedback!',
      )
    })

    fireEvent.click(like)
    await waitFor(() => {
      expect(score.textContent).toBe('0')
      expect(like.getAttribute('aria-pressed')).toBe('false')
    })
  })

  it('switches between Dislike and Like while retaining one selection', async () => {
    const result = renderFeedback()
    const like = result.getByRole('button', { name: 'Like' })
    const dislike = result.getByRole('button', { name: 'Dislike' })
    const score = result.getByRole('status', { name: 'Feedback score' })

    fireEvent.click(dislike)
    await waitFor(() => {
      expect(score.textContent).toBe('-1')
      expect(dislike.getAttribute('aria-pressed')).toBe('true')
    })

    fireEvent.click(like)
    await waitFor(() => {
      expect(score.textContent).toBe('1')
      expect(like.getAttribute('aria-pressed')).toBe('true')
      expect(dislike.getAttribute('aria-pressed')).toBe('false')
    })
  })
})
