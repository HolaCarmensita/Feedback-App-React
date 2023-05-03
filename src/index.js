import React from 'react'
import './index.css'
import App from './app'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
const domNode = document.getElementById('root')
const root = createRoot(domNode)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
