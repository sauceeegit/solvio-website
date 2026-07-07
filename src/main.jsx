import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

function dismissSplash() {
  const splash = document.getElementById('solvio-splash')

  if (!splash || splash.dataset.dismissed === 'true') return

  splash.dataset.dismissed = 'true'
  splash.classList.add('solvio-splash--dismissed')
  window.setTimeout(() => splash.remove(), 520)
}

function RootApp() {
  useEffect(() => {
    const frame = window.requestAnimationFrame(dismissSplash)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)
