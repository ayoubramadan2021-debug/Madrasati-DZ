import os

main_path = "src/main.tsx"
if not os.path.exists(main_path):
    main_path = "src/index.tsx"

clean_code = """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' // أو أي ملف CSS رئيسي تستخدمه

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
"""

if os.path.exists(main_path):
    with open(main_path, "w", encoding="utf-8") as f:
        f.write(clean_code.strip())
    print("✅ تم تنظيف وإعادة بناء ملف الدخول الرئيسي بنجاح!")
else:
    print("❌ لم يتم العثور على الملف الرئيسي.")
