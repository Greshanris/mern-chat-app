import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrapping app component with BrowserRouter component provided by react-router-dom for routing */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </StrictMode>,
)
