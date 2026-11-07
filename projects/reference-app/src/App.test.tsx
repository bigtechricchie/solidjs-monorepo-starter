import { cleanup, fireEvent, render, waitFor } from '@solidjs/testing-library'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import App from './App'

beforeEach(() => {
  window.history.replaceState(null, '', '/')
})

afterEach(() => {
  cleanup()
  window.history.replaceState(null, '', '/')
})

describe('App', () => {
  it('renders the reference application shell and starter feedback on Home', () => {
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
    expect(result.getByRole('link', { name: 'Home' })).toBeDefined()
    expect(result.getByRole('link', { name: 'About' })).toBeDefined()
    expect(result.getByRole('link', { name: 'Security' })).toBeDefined()

    expect(
      result.getByRole('heading', {
        name: 'Do you like this starter',
      }),
    ).toBeDefined()
    expect(result.getByRole('button', { name: 'Like' })).toBeDefined()
    expect(result.getByRole('button', { name: 'Dislike' })).toBeDefined()
    expect(
      result.queryByRole('button', { name: 'Increment count' }),
    ).toBeNull()
  })

  it('updates Home-owned reaction state through the feedback callback', async () => {
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

  it('renders About when the /about route is opened directly', () => {
    window.history.replaceState(null, '', '/about')

    const result = render(() => <App />)

    expect(
      result.getByRole('heading', { level: 2, name: 'About this starter' }),
    ).toBeDefined()
    expect(result.getByText(/SolidJS/)).toBeDefined()
    expect(result.getByRole('navigation', { name: 'Reference application' })).toBeDefined()
    expect(result.queryByRole('button', { name: 'Like' })).toBeNull()
  })

  it('navigates to About through the application navigation', async () => {
    const result = render(() => <App />)

    fireEvent.click(result.getByRole('link', { name: 'About' }))

    await waitFor(() => {
      expect(
        result.getByRole('heading', { level: 2, name: 'About this starter' }),
      ).toBeDefined()
      expect(window.location.pathname).toBe('/about')
    })
  })

  it('renders Security on a direct visit to /security', () => {
    window.history.replaceState(null, '', '/security')

    const result = render(() => <App />)

    expect(
      result.getByRole('heading', { level: 2, name: 'Security' }),
    ).toBeDefined()
    expect(result.getByText(/security-certified or production-hardened/)).toBeDefined()
    expect(result.queryByRole('button', { name: 'Like' })).toBeNull()
  })

  it('navigates to Security using the application navigation', async () => {
    const result = render(() => <App />)

    fireEvent.click(result.getByRole('link', { name: 'Security' }))

    await waitFor(() => {
      expect(
        result.getByRole('heading', { level: 2, name: 'Security' }),
      ).toBeDefined()
      expect(window.location.pathname).toBe('/security')
    })
  })

  it('shows Not Found for an unknown path and links back to Home', async () => {
    window.history.replaceState(null, '', '/missing')

    const result = render(() => <App />)

    expect(
      result.getByRole('heading', { level: 2, name: 'Page not found' }),
    ).toBeDefined()
    expect(
      result.queryByRole('heading', { name: 'Reference application' }),
    ).toBeNull()

    fireEvent.click(result.getByRole('link', { name: 'Return to Home' }))

    await waitFor(() => {
      expect(
        result.getByRole('heading', { level: 2, name: 'Reference application' }),
      ).toBeDefined()
    })
  })
})
