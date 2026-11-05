import { cleanup, fireEvent, render } from '@solidjs/testing-library'
import { afterEach, describe, expect, it } from 'vitest'

import App from './App'

afterEach(() => {
  cleanup()
})

describe('App', () => {
  it('renders the reference application content', () => {
    const result = render(() => <App />)

    expect(
      result.getByRole('heading', {
        level: 1,
        name: 'SolidJS Monorepo Starter',
      }),
    ).toBeDefined()

    expect(result.getByText('Reference application.')).toBeDefined()
  })

  it('updates the count when the button is activated', () => {
    const result = render(() => <App />)
    const incrementButton = result.getByRole('button', {
      name: 'Increment count',
    })
    const count = result.getByRole('status')

    expect(count.textContent).toBe('0')

    fireEvent.click(incrementButton)
    expect(count.textContent).toBe('1')

    fireEvent.click(incrementButton)
    expect(count.textContent).toBe('2')
  })
})
