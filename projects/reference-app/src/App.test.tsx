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
  it('renders a persistent, accessible application shell', () => {
    const result = render(() => <App />)

    expect(
      result.getByRole('heading', { level: 1, name: 'SolidJS Monorepo Starter' }),
    ).toBeDefined()
    expect(
      result.getByRole('navigation', { name: 'Reference application' }),
    ).toBeDefined()
    expect(result.getByRole('main')).toBeDefined()

    for (const name of ['Home', 'About', 'Author', 'Contact', 'Security']) {
      expect(result.getByRole('link', { name })).toBeDefined()
    }
  })

  it('navigates to a route without replacing the application shell', async () => {
    const result = render(() => <App />)
    const header = result.getByRole('banner')
    const navigation = result.getByRole('navigation', {
      name: 'Reference application',
    })
    const main = result.getByRole('main')

    fireEvent.click(result.getByRole('link', { name: 'Contact' }))

    await waitFor(() => {
      expect(window.location.pathname).toBe('/contact')
      expect(result.getByRole('heading', { level: 2, name: 'Contact' })).toBeDefined()
    })

    expect(result.getByRole('banner')).toBe(header)
    expect(result.getByRole('navigation', { name: 'Reference application' })).toBe(navigation)
    expect(result.getByRole('main')).toBe(main)
  })

  it('marks the active navigation link', async () => {
    const result = render(() => <App />)
    const homeLink = result.getByRole('link', { name: 'Home' })
    const aboutLink = result.getByRole('link', { name: 'About' })

    await waitFor(() => {
      expect(homeLink.getAttribute('aria-current')).toBe('page')
      expect(aboutLink.hasAttribute('aria-current')).toBe(false)
    })

    fireEvent.click(aboutLink)

    await waitFor(() => {
      expect(aboutLink.getAttribute('aria-current')).toBe('page')
      expect(homeLink.hasAttribute('aria-current')).toBe(false)
    })
  })

  it('handles browser back and forward navigation', async () => {
    const result = render(() => <App />)

    fireEvent.click(result.getByRole('link', { name: 'About' }))
    await waitFor(() => {
      expect(window.location.pathname).toBe('/about')
    })

    fireEvent.click(result.getByRole('link', { name: 'Security' }))
    await waitFor(() => {
      expect(window.location.pathname).toBe('/security')
    })

    window.history.back()

    await waitFor(() => {
      expect(window.location.pathname).toBe('/about')
      expect(result.getByRole('heading', { level: 2, name: 'About this starter' })).toBeDefined()
    })

    window.history.forward()

    await waitFor(() => {
      expect(window.location.pathname).toBe('/security')
      expect(result.getByRole('heading', { level: 2, name: 'Security' })).toBeDefined()
    })
  })

  it('resets Home feedback when leaving and returning', async () => {
    const result = render(() => <App />)

    fireEvent.click(result.getByRole('button', { name: 'Like' }))
    await waitFor(() => {
      expect(result.getByRole('button', { name: 'Like' }).getAttribute('aria-pressed')).toBe('true')
    })

    fireEvent.click(result.getByRole('link', { name: 'About' }))
    await waitFor(() => {
      expect(window.location.pathname).toBe('/about')
      expect(result.queryByRole('button', { name: 'Like' })).toBeNull()
    })

    fireEvent.click(result.getByRole('link', { name: 'Home' }))
    await waitFor(() => {
      expect(window.location.pathname).toBe('/')
      expect(result.getByRole('button', { name: 'Like' }).getAttribute('aria-pressed')).toBe('false')
    })
  })

  it('renders the fallback for an unknown nested URL', async () => {
    window.history.replaceState(null, '', '/unknown/page')
    const result = render(() => <App />)

    expect(
      result.getByRole('heading', { level: 2, name: 'Page not found' }),
    ).toBeDefined()

    fireEvent.click(result.getByRole('link', { name: 'Return to Home' }))

    await waitFor(() => {
      expect(window.location.pathname).toBe('/')
      expect(
        result.getByRole('heading', { level: 2, name: 'Reference application' }),
      ).toBeDefined()
    })
  })
})
