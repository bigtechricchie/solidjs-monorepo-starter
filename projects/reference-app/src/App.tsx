import { createRouter, type RouteSectionProps } from '@solidjs/router'

import './App.css'
import About from './pages/about/About'
import Author from './pages/author/Author'
import Home from './pages/home/Home'
import NotFound from './pages/not-found/NotFound'
import Security from './pages/security/Security'

const Router = createRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/author', component: Author },
    { path: '/security', component: Security },
    { path: '*404', component: NotFound },
  ],
})

function AppShell(props: RouteSectionProps) {
  return (
    <div class="app">
      <header class="app__header">
        <div class="app__header-inner layout-container">
          <h1 class="app__title">SolidJS Monorepo Starter</h1>

          <nav aria-label="Reference application" class="app__navigation">
            <a class="app__navigation-link" href="/">
              Home
            </a>
            <a class="app__navigation-link" href="/about">
              About
            </a>
            <a class="app__navigation-link" href="/author">
              Author
            </a>
            <a class="app__navigation-link" href="/security">
              Security
            </a>
          </nav>
        </div>
      </header>

      <main class="app__main layout-container">{props.children}</main>
    </div>
  )
}

function App() {
  return <Router>{props => <AppShell {...props} />}</Router>
}

export default App
