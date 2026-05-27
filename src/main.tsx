import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './theme.css'
import { LanguageProvider } from './i18n/LanguageContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)
// إخفاء شاشة البداية بعد تحميل التطبيق
setTimeout(() => {
  const sp = document.getElementById("splash");
  if (sp) {
    sp.classList.add("hide");
    setTimeout(() => sp.remove(), 500);
  }
}, 600);
