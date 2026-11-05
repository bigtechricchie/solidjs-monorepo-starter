import { render } from '@solidjs/web'

import App from './App'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('Root element was not found')
}

render(() => <App />, rootElement)
