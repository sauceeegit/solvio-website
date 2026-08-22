import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Reveal the app once React has rendered. index.html hides #root (html.lang-boot)
// for visitors whose saved language is Thai, so they never see the English
// react-snap snapshot flip to Thai mid-scroll.
function revealApp() {
  document.documentElement.classList.remove('lang-boot')
}

function dismissSplash() {
  const splash = document.getElementById('solvio-splash')

  if (!splash || splash.dataset.dismissed === 'true') return

  splash.dataset.dismissed = 'true'
  splash.classList.add('solvio-splash--dismissed')
  window.setTimeout(() => splash.remove(), 520)
}

function RootApp() {
  useEffect(() => {
    revealApp()
    const frame = window.requestAnimationFrame(dismissSplash)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <App />
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)
