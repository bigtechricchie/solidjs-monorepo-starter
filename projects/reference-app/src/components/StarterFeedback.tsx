import { createSignal } from 'solid-js'

type Reaction = 'like' | 'dislike'

function StarterFeedback() {
  const [reaction, setReaction] = createSignal<Reaction | null>(null)

  function toggleReaction(nextReaction: Reaction) {
    setReaction((currentReaction) =>
      currentReaction === nextReaction ? null : nextReaction,
    )
  }

  const feedbackMessage = () => {
    switch (reaction()) {
      case 'like':
        return 'Thanks for your positive feedback!'
      case 'dislike':
        return 'Thanks for sharing your feedback.'
      default:
        return 'Choose a reaction to try this interactive example.'
    }
  }

  return (
    <section aria-labelledby="starter-feedback-title" class="starter-feedback">
      <h2 id="starter-feedback-title">Do you like this starter?</h2>
      <p>Try this interactive example powered by SolidJS signals.</p>

      <div class="starter-feedback__actions">
        <button
          aria-pressed={reaction() === 'like'}
          class="starter-feedback__button"
          onClick={() => toggleReaction('like')}
          type="button"
        >
          Like
        </button>
        <button
          aria-pressed={reaction() === 'dislike'}
          class="starter-feedback__button"
          onClick={() => toggleReaction('dislike')}
          type="button"
        >
          Dislike
        </button>
      </div>

      <p aria-live="polite" class="starter-feedback__status" role="status">
        {feedbackMessage()}
      </p>
      <p>Selections are local to this page and are not saved or submitted.</p>
    </section>
  )
}

export default StarterFeedback
