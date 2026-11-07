import { A, Route, Router, type RouteSectionProps } from '@solidjs/router'

import './App.css'
import Home from './pages/home/Home'
import NotFound from './pages/not-found/NotFound'

function AppShell(props: RouteSectionProps) {
  return (
    <div class="app">
      <header class="app__header">
        <div class="app__header-inner layout-container">
          <h1 class="app__title">SolidJS Monorepo Starter</h1>

          <nav aria-label="Reference application" class="app__navigation">
            <A class="app__navigation-link" end href="/">
              Home
            </A>
          </nav>
        </div>
      </header>

      <main class="app__main layout-container">{props.children}</main>
    </div>
  )
}

function App() {
  return (
    <Router root={AppShell}>
      <Route path="/" component={Home} />
      <Route path="*" component={NotFound} />
    </Router>
  )
}

export default App
