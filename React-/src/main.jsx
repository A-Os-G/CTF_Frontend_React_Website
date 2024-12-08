import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {Helmet} from 'react-helmet'

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
