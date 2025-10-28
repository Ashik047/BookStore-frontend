import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
import ContextSearch from './context/ContextSearch.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='587819704941-f6mui1epj7n37s2bsr4c8j98dqqtdv25.apps.googleusercontent.com' >
        <ContextSearch>
          <App />
        </ContextSearch>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
