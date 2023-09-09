import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './pages/landing/index.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
)
