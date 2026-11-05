import { render } from '@solidjs/web'

import App from './App'
import './styles/tokens.css'
import './styles/reset.css'
import './styles/app.css'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('Root element was not found')
}

render(() => <App />, rootElement)
