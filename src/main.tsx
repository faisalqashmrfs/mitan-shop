import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import LangRedirect from './components/LangRedirect/LangRedirect.tsx'
import './index.css'
import './i18n' // استيراد ملف الإعدادات

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* جميع مسارات الموقع ستكون داخل هذا النطاق لتبدأ باللغة دائماً */}
        <Route path="/:lng?" element={<LangRedirect />}>
          <Route index element={<App />} />
          {/* لو كان لديك صفحات أخرى مستقبلاً مثل About تضعها هنا كـ Route فرعي */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)