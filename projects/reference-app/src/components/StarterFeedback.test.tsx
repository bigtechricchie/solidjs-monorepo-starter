import { cleanup, fireEvent, render, waitFor } from '@solidjs/testing-library'
import { afterEach, describe, expect, it } from 'vitest'

import StarterFeedback from './StarterFeedback'

afterEach(() => {
  cleanup()
})

describe('StarterFeedback', () => {
  it('starts with no reaction selected', () => {
    const result = render(() => <StarterFeedback />)
    const likeButton = result.getByRole('button', { name: 'Like' })
    const dislikeButton = result.getByRole('button', { name: 'Dislike' })

    expect(
      result.getByRole('heading', { name: 'Do you like this starter?' }),
    ).toBeDefined()
    expect(likeButton.getAttribute('aria-pressed')).toBe('false')
    expect(dislikeButton.getAttribute('aria-pressed')).toBe('false')
    expect(result.getByRole('status').textContent).toBe(
      'Choose a reaction to try this interactive example.',
    )
    expect(result.getByText(/not saved or submitted/)).toBeDefined()
  })

  it('selects Like and clears it when clicked again', async () => {
    const result = render(() => <StarterFeedback />)
    const likeButton = result.getByRole('button', { name: 'Like' })
    const dislikeButton = result.getByRole('button', { name: 'Dislike' })

    fireEvent.click(likeButton)
    await waitFor(() => {
      expect(likeButton.getAttribute('aria-pressed')).toBe('true')
      expect(dislikeButton.getAttribute('aria-pressed')).toBe('false')
      expect(result.getByRole('status').textContent).toBe(
        'Thanks for your positive feedback!',
      )
    })

    fireEvent.click(likeButton)
    await waitFor(() => {
      expect(likeButton.getAttribute('aria-pressed')).toBe('false')
      expect(result.getByRole('status').textContent).toBe(
        'Choose a reaction to try this interactive example.',
      )
    })
  })

  it('selects Dislike, switches to Like, and clears the selection', async () => {
    const result = render(() => <StarterFeedback />)
    const likeButton = result.getByRole('button', { name: 'Like' })
    const dislikeButton = result.getByRole('button', { name: 'Dislike' })

    fireEvent.click(dislikeButton)
    await waitFor(() => {
      expect(dislikeButton.getAttribute('aria-pressed')).toBe('true')
      expect(likeButton.getAttribute('aria-pressed')).toBe('false')
      expect(result.getByRole('status').textContent).toBe(
        'Thanks for sharing your feedback.',
      )
    })

    fireEvent.click(likeButton)
    await waitFor(() => {
      expect(dislikeButton.getAttribute('aria-pressed')).toBe('false')
      expect(likeButton.getAttribute('aria-pressed')).toBe('true')
      expect(result.getByRole('status').textContent).toBe(
        'Thanks for your positive feedback!',
      )
    })

    fireEvent.click(likeButton)
    await waitFor(() => {
      expect(likeButton.getAttribute('aria-pressed')).toBe('false')
      expect(dislikeButton.getAttribute('aria-pressed')).toBe('false')
    })
  })
})
