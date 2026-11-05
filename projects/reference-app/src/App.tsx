import { createSignal } from 'solid-js'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <main>
      <h1>SolidJS Monorepo Starter</h1>
      <p>Reference application.</p>
      <p>Count: <output>{count()}</output></p>
      <button type="button" onClick={() => setCount((previous) => previous + 1)}>
        Increment count
      </button>
    </main>
  )
}

export default App
