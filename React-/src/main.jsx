import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Helmet>
        <title>Capture The Flag</title>
        <link rel="shortcut icon" href="./images/navbarImage_white.png" />
      </Helmet>
      <App />
    </BrowserRouter>
  </StrictMode>
)
