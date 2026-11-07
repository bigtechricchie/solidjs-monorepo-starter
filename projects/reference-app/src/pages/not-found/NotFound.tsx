import { A } from '@solidjs/router'

function NotFound() {
  return (
    <section class="app__content">
      <h2 class="app__section-title">Page not found</h2>
      <p>The requested page could not be found.</p>
      <A href="/">Return to Home</A>
    </section>
  )
}

export default NotFound
