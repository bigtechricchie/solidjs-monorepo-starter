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
  const [helpTooltipDismissed, setHelpTooltipDismissed] = createSignal(false)

  function handleHelpTooltipKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      setHelpTooltipDismissed(true)
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
      <div class="starter-feedback__heading">
        <h3 id="starter-feedback-title">Do you like this starter</h3>
        <span
          class="starter-feedback__help"
          data-dismissed={helpTooltipDismissed() ? 'true' : 'false'}
          onMouseEnter={() => setHelpTooltipDismissed(false)}
          onMouseLeave={() => setHelpTooltipDismissed(true)}
        >
          <button
            aria-describedby="starter-feedback-help-tooltip"
            aria-label="About this demonstration"
            class="starter-feedback__help-button"
            onBlur={() => setHelpTooltipDismissed(true)}
            onFocus={() => setHelpTooltipDismissed(false)}
            onKeyDown={handleHelpTooltipKeyDown}
            type="button"
          >
            ?
          </button>
          <span
            class="starter-feedback__tooltip"
            id="starter-feedback-help-tooltip"
            role="tooltip"
          >
            <span class="starter-feedback__tooltip-content">
              This tooltip demonstrates accessible supplementary help on hover
              and keyboard focus.
            </span>
          </span>
        </span>
      </div>
      <p id="starter-feedback-guidance">
        Click Like if you find this starter helpful, or Dislike if you think it
        needs improvement.
      </p>

      <div class="starter-feedback__actions">
        <button
          aria-describedby="starter-feedback-guidance"
          aria-pressed={props.reaction === 'like' ? 'true' : 'false'}
          class="starter-feedback__button starter-feedback__button--like"
          onClick={() => toggleReaction('like')}
          type="button"
        >
          Like
        </button>
        <button
          aria-describedby="starter-feedback-guidance"
          aria-pressed={props.reaction === 'dislike' ? 'true' : 'false'}
          class="starter-feedback__button starter-feedback__button--dislike"
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
