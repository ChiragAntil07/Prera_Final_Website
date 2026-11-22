import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.jsx'
import { HashRouter } from 'react-router-dom'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
 <HashRouter>
    <App />
  </HashRouter>
)
