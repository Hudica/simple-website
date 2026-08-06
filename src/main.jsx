import React from 'react'
import ReactDOM from 'react-dom/client'
// Base tokens and resets load first so component styles can override them.
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
