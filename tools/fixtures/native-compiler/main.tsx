import { render } from '@solidjs/web'
import { createSignal } from 'solid-js'

function CompilerFixture() {
  const [count, setCount] = createSignal(0)

  return (
    <button type="button" onClick={() => setCount((current) => current + 1)}>
      Native compiler verified: {count()}
    </button>
  )
}

const container = document.getElementById('app')

if (container === null) {
  throw new Error('Native compiler fixture container not found')
}

render(() => <CompilerFixture />, container)
