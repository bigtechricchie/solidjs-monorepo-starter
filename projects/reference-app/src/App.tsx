import { createSignal } from 'solid-js'

import StarterFeedback, {
  type Reaction,
} from './components/starter-feedback/StarterFeedback'

function App() {
  const [reaction, setReaction] = createSignal<Reaction | null>(null)

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
          <StarterFeedback
            onReactionChange={setReaction}
            reaction={reaction()}
          />
        </section>
      </main>
    </div>
  )
}

export default App
