import { createSignal } from 'solid-js'
import { cleanup, fireEvent, render, waitFor } from '@solidjs/testing-library'
import { afterEach, describe, expect, it } from 'vitest'

import StarterFeedback, { type Reaction } from './StarterFeedback'

afterEach(() => {
  cleanup()
})

function renderFeedback() {
  const [reaction, setReaction] = createSignal<Reaction | null>(null)

  return render(() => (
    <StarterFeedback
      onReactionChange={setReaction}
      reaction={reaction()}
    />
  ))
}

describe('StarterFeedback', () => {
  it('renders the unselected state', () => {
    const result = renderFeedback()

    expect(
      result.getByRole('heading', { name: 'Do you like this starter?' }),
    ).toBeDefined()
    expect(result.getByRole('status', { name: '' }).textContent).toBe(
      'Choose a reaction to try this interactive example.',
    )
    expect(result.getByRole('button', { name: 'Like' }).getAttribute('aria-pressed')).toBe('false')
    expect(result.getByRole('button', { name: 'Dislike' }).getAttribute('aria-pressed')).toBe('false')
    expect(result.getByText(/not saved or submitted/)).toBeDefined()
  })

  it('connects descriptive tooltips to both reaction buttons', () => {
    const result = renderFeedback()
    const like = result.getByRole('button', { name: 'Like' })
    const dislike = result.getByRole('button', { name: 'Dislike' })
    const likeTooltip = result.getByText('Mark this starter as helpful')
    const dislikeTooltip = result.getByText(
      'Mark this starter as needing improvement',
    )

    expect(like.getAttribute('aria-describedby')).toBe(likeTooltip.id)
    expect(dislike.getAttribute('aria-describedby')).toBe(dislikeTooltip.id)
    expect(likeTooltip.getAttribute('role')).toBe('tooltip')
    expect(dislikeTooltip.getAttribute('role')).toBe('tooltip')
  })

  it('notifies the parent when Like is selected or cleared', async () => {
    const result = renderFeedback()
    const like = result.getByRole('button', { name: 'Like' })

    fireEvent.click(like)
    await waitFor(() => {
      expect(like.getAttribute('aria-pressed')).toBe('true')
      expect(result.getByRole('status', { name: '' }).textContent).toBe(
        'Thanks for your positive feedback!',
      )
    })

    fireEvent.click(like)
    await waitFor(() => {
      expect(like.getAttribute('aria-pressed')).toBe('false')
      expect(result.getByRole('status', { name: '' }).textContent).toBe(
        'Choose a reaction to try this interactive example.',
      )
    })
  })

  it('switches between Dislike and Like while retaining one selection', async () => {
    const result = renderFeedback()
    const like = result.getByRole('button', { name: 'Like' })
    const dislike = result.getByRole('button', { name: 'Dislike' })

    fireEvent.click(dislike)
    await waitFor(() => {
      expect(dislike.getAttribute('aria-pressed')).toBe('true')
      expect(like.getAttribute('aria-pressed')).toBe('false')
      expect(result.getByRole('status', { name: '' }).textContent).toBe(
        'Thanks for sharing your feedback.',
      )
    })

    fireEvent.click(like)
    await waitFor(() => {
      expect(like.getAttribute('aria-pressed')).toBe('true')
      expect(dislike.getAttribute('aria-pressed')).toBe('false')
      expect(result.getByRole('status', { name: '' }).textContent).toBe(
        'Thanks for your positive feedback!',
      )
    })
  })
})
