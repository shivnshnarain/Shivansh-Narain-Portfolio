import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/HeroDashboards.css'
import './components/AIAssistant.css'
import './components/PaymentPage.css'
import './components/Gallery.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
