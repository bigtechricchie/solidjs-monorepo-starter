import { createSignal } from 'solid-js'

import './StarterFeedback.css'

export type Reaction = 'like' | 'dislike'

const DEFAULT_FEEDBACK_MESSAGE =
  'Choose a reaction to try this interactive example.'

const FEEDBACK_MESSAGES: Record<Reaction, string> = {
  dislike: 'Thanks for sharing your feedback.',
  like: 'Thanks for your positive feedback!',
}

interface StarterFeedbackProps {
  onReactionChange: (reaction: Reaction | null) => void
  reaction: Reaction | null
}

function StarterFeedback(props: StarterFeedbackProps) {
  const [dismissedTooltip, setDismissedTooltip] = createSignal<Reaction | null>(
    null,
  )

  function handleTooltipKeyDown(event: KeyboardEvent, reaction: Reaction) {
    if (event.key === 'Escape') {
      setDismissedTooltip(reaction)
    }
  }

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
      <h3 id="starter-feedback-title">Do you like this starter?</h3>
      <p>Try this interactive example powered by SolidJS signals.</p>

      <div class="starter-feedback__actions">
        <span
          class="starter-feedback__action"
          data-dismissed={dismissedTooltip() === 'like' ? 'true' : 'false'}
          onMouseEnter={() => setDismissedTooltip(null)}
          onMouseLeave={() => setDismissedTooltip('like')}
        >
          <button
            aria-describedby="starter-feedback-like-tooltip"
            aria-pressed={props.reaction === 'like' ? 'true' : 'false'}
            class="starter-feedback__button starter-feedback__button--like"
            onBlur={() => setDismissedTooltip(null)}
            onClick={() => toggleReaction('like')}
            onKeyDown={(event) => handleTooltipKeyDown(event, 'like')}
            type="button"
          >
            Like
          </button>
          <span
            class="starter-feedback__tooltip"
            id="starter-feedback-like-tooltip"
            role="tooltip"
          >
            <span class="starter-feedback__tooltip-content">
              Mark this starter as helpful
            </span>
          </span>
        </span>

        <span
          class="starter-feedback__action"
          data-dismissed={dismissedTooltip() === 'dislike' ? 'true' : 'false'}
          onMouseEnter={() => setDismissedTooltip(null)}
          onMouseLeave={() => setDismissedTooltip('dislike')}
        >
          <button
            aria-describedby="starter-feedback-dislike-tooltip"
            aria-pressed={props.reaction === 'dislike' ? 'true' : 'false'}
            class="starter-feedback__button starter-feedback__button--dislike"
            onBlur={() => setDismissedTooltip(null)}
            onClick={() => toggleReaction('dislike')}
            onKeyDown={(event) => handleTooltipKeyDown(event, 'dislike')}
            type="button"
          >
            Dislike
          </button>
          <span
            class="starter-feedback__tooltip"
            id="starter-feedback-dislike-tooltip"
            role="tooltip"
          >
            <span class="starter-feedback__tooltip-content">
              Mark this starter as needing improvement
            </span>
          </span>
        </span>
      </div>

      <p aria-live="polite" class="starter-feedback__status" role="status">
        {feedbackMessage()}
      </p>
      <p>Selections are local to this page and are not saved or submitted.</p>
    </section>
  )
}

export default StarterFeedback
