import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppErrorBoundary from '@/app/providers/AppErrorBoundary'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
