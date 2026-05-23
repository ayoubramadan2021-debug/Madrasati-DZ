import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
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
