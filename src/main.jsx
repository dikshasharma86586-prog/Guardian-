// EMERGENCY FIX: Unregister all active Service Workers causing fetch failures on mobile
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (let registration of registrations) {
      registration.unregister();
      console.log("Service Worker forcefully unregistered for hackathon demo.");
    }
  }).catch((err) => console.error("SW unregistration failed: ", err));
}

import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter><App /></BrowserRouter>,
)
