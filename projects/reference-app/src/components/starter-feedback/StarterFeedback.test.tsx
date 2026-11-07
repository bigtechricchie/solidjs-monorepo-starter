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
      result.getByRole('heading', { level: 3, name: 'Do you like this starter' }),
    ).toBeDefined()
    expect(result.getByRole('status', { name: '' }).textContent).toBe(
      'Choose a reaction to try this interactive example.',
    )
    expect(result.getByRole('button', { name: 'Like' }).getAttribute('aria-pressed')).toBe('false')
    expect(result.getByRole('button', { name: 'Dislike' }).getAttribute('aria-pressed')).toBe('false')
    expect(result.getByText(/not saved or submitted/)).toBeDefined()
  })

  it('shows guidance and associates it with both reactions', () => {
    const result = renderFeedback()
    const guidance = result.getByText(
      'Click Like if you find this starter helpful, or Dislike if you think it needs improvement.',
    )

    expect(guidance.id).toBe('starter-feedback-guidance')
    expect(
      result.getByRole('button', { name: 'Like' }).getAttribute('aria-describedby'),
    ).toBe(guidance.id)
    expect(
      result.getByRole('button', { name: 'Dislike' }).getAttribute('aria-describedby'),
    ).toBe(guidance.id)
    expect(result.container.querySelectorAll('[role="tooltip"]')).toHaveLength(1)
  })

  it('describes the help button with a demonstration tooltip', () => {
    const result = renderFeedback()
    const helpButton = result.getByRole('button', { name: 'About this demonstration' })
    const tooltip = result.getByRole('tooltip')

    expect(helpButton.textContent?.trim()).toBe('?')
    expect(helpButton.getAttribute('aria-describedby')).toBe(tooltip.id)
    expect(tooltip.textContent).toContain(
      'This tooltip demonstrates accessible supplementary help on hover and keyboard focus.',
    )
    expect(result.getByText(/Click Like if you find this starter helpful/)).toBeDefined()
  })

  it('dismisses the help tooltip on Escape and pointer exit', async () => {
    const result = renderFeedback()
    const helpButton = result.getByRole('button', { name: 'About this demonstration' })
    const wrapper = helpButton.parentElement

    if (wrapper === null) {
      throw new Error('Expected help tooltip wrapper')
    }

    fireEvent.mouseEnter(wrapper)
    await waitFor(() => {
      expect(wrapper.getAttribute('data-dismissed')).toBe('false')
    })

    fireEvent.keyDown(helpButton, { key: 'Escape' })
    await waitFor(() => {
      expect(wrapper.getAttribute('data-dismissed')).toBe('true')
    })

    fireEvent.mouseEnter(wrapper)
    await waitFor(() => {
      expect(wrapper.getAttribute('data-dismissed')).toBe('false')
    })

    fireEvent.mouseLeave(wrapper)
    await waitFor(() => {
      expect(wrapper.getAttribute('data-dismissed')).toBe('true')
    })
  })

  it('uses text-only buttons without inline SVGs', () => {
    const result = renderFeedback()
    const like = result.getByRole('button', { name: 'Like' })
    const dislike = result.getByRole('button', { name: 'Dislike' })

    expect(like.textContent?.trim()).toBe('Like')
    expect(dislike.textContent?.trim()).toBe('Dislike')
    expect(result.container.querySelector('svg')).toBeNull()
  })

  it('styles only the selected reaction using distinct modifier classes', async () => {
    const result = renderFeedback()
    const like = result.getByRole('button', { name: 'Like' })
    const dislike = result.getByRole('button', { name: 'Dislike' })

    expect(like.classList.contains('starter-feedback__button--like')).toBe(true)
    expect(dislike.classList.contains('starter-feedback__button--dislike')).toBe(true)
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
      expect(dislike.getAttribute('aria-pressed')).toBe('false')
    })
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
