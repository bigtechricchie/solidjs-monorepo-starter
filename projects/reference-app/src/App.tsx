import { createSignal } from 'solid-js'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <div class="app">
      <header class="app__header">
        <div class="app__header-inner">
          <h1 class="app__title">SolidJS Monorepo Starter</h1>

          <nav aria-label="Reference application" class="app__navigation">
            <a class="app__navigation-link" href="#reference-example">
              Example
            </a>
          </nav>
        </div>
      </header>

      <main class="app__main">
        <section class="app__content" id="reference-example">
          <h2 class="app__section-title">Reference application</h2>

          <p>
            Count: <output>{count()}</output>
          </p>

          <button
            class="app__button"
            type="button"
            onClick={() => setCount((previous) => previous + 1)}
          >
            Increment count
          </button>
        </section>
      </main>
    </div>
  )
}

export default App
