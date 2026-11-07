import { createSignal } from 'solid-js'

import StarterFeedback, {
  type Reaction,
} from '../../components/starter-feedback/StarterFeedback'

function Home() {
  const [reaction, setReaction] = createSignal<Reaction | null>(null)

  return (
    <section class="app__content">
      <h2 class="app__section-title">Reference application</h2>
      <StarterFeedback
        onReactionChange={setReaction}
        reaction={reaction()}
      />
    </section>
  )
}

export default Home
