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
      <h2 id="starter-feedback-title">Do you like this starter?</h2>
      <p>Try this interactive example powered by SolidJS signals.</p>

      <div class="starter-feedback__actions">
        <span
          class="starter-feedback__action"
          data-dismissed={dismissedTooltip() === 'like' ? 'true' : 'false'}
          onMouseLeave={() => setDismissedTooltip(null)}
        >
          <button
            aria-describedby="starter-feedback-like-tooltip"
            aria-pressed={props.reaction === 'like' ? 'true' : 'false'}
            class="starter-feedback__button"
            onBlur={() => setDismissedTooltip(null)}
            onClick={() => toggleReaction('like')}
            onKeyDown={(event) => handleTooltipKeyDown(event, 'like')}
            type="button"
          >
            <svg
              aria-hidden="true"
              class="starter-feedback__icon"
              fill="none"
              focusable="false"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 3a3.13 3.13 0 0 1 3 2.88Z" />
            </svg>
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
          onMouseLeave={() => setDismissedTooltip(null)}
        >
          <button
            aria-describedby="starter-feedback-dislike-tooltip"
            aria-pressed={props.reaction === 'dislike' ? 'true' : 'false'}
            class="starter-feedback__button"
            onBlur={() => setDismissedTooltip(null)}
            onClick={() => toggleReaction('dislike')}
            onKeyDown={(event) => handleTooltipKeyDown(event, 'dislike')}
            type="button"
          >
            <svg
              aria-hidden="true"
              class="starter-feedback__icon starter-feedback__icon--dislike"
              fill="none"
              focusable="false"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 3a3.13 3.13 0 0 1 3 2.88Z" />
            </svg>
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
