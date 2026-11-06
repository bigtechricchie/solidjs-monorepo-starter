import './StarterFeedback.css'

export type Reaction = 'like' | 'dislike'

const DEFAULT_FEEDBACK_MESSAGE =
  'Choose a reaction to try this interactive example.'

const FEEDBACK_MESSAGES: Record<Reaction, string> = {
  dislike: 'Thanks for sharing your feedback.',
  like: 'Thanks for your positive feedback!',
}

interface StarterFeedbackProps {
  count: number
  onReactionChange: (reaction: Reaction | null) => void
  reaction: Reaction | null
}

function StarterFeedback(props: StarterFeedbackProps) {
  function toggleReaction(nextReaction: Reaction) {
    props.onReactionChange(
      props.reaction === nextReaction ? null : nextReaction,
    )
  }

  const feedbackMessage = () => {
    const reaction = props.reaction

    return reaction === null
      ? DEFAULT_FEEDBACK_MESSAGE
      : FEEDBACK_MESSAGES[reaction]
  }

  return (
    <section aria-labelledby="starter-feedback-title" class="starter-feedback">
      <h2 id="starter-feedback-title">Do you like this starter?</h2>
      <p>Try this interactive example powered by SolidJS signals.</p>

      <div class="starter-feedback__actions">
        <button
          aria-pressed={props.reaction === 'like' ? 'true' : 'false'}
          class="starter-feedback__button"
          onClick={() => toggleReaction('like')}
          type="button"
        >
          Like
        </button>
        <button
          aria-pressed={props.reaction === 'dislike' ? 'true' : 'false'}
          class="starter-feedback__button"
          onClick={() => toggleReaction('dislike')}
          type="button"
        >
          Dislike
        </button>
      </div>

      <p>
        Feedback score: <output aria-label="Feedback score">{props.count}</output>
      </p>

      <p aria-live="polite" class="starter-feedback__status" role="status">
        {feedbackMessage()}
      </p>
      <p>Selections are local to this page and are not saved or submitted.</p>
    </section>
  )
}

export default StarterFeedback
