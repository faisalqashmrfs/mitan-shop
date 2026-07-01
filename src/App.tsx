import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom' // <-- استيراد الهوك للتنقل بين الروابط

import './App.css'
import AppScrollSection from './components/AppScrollSection/AppScrollSection'
import Branches from './components/Branches/Branches'
import Hero from './components/Hero/Hero'
import Tunel from './components/Tunel/Tunel'
import VerticalProgress from './components/VerticalProgress/VerticalProgress'
import Footer from './Footer/Footer'

function App() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // تهيئة السكرول الناعم (Lenis) كما هو
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // دالة التبديل عبر المسار (URL)
  const handleLanguageChange = () => {
    const nextLang = i18n.language === 'en' ? 'ar' : 'en';
    // نقوم بتغيير المسار في الرابط، والمكون الذكي سيتولى الباقي
    navigate(`/${nextLang}`);
  };

  return (
    <>
      {/* زر تغيير اللغة عائم */}
      <button 
      
  onClick={handleLanguageChange} 
  className="languageswitcher"
  style={{
    position: 'fixed',
    bottom: '35px',
    insetInlineEnd: '35px',
    zIndex: 1000,
    padding: '4px 8px',
    borderRadius: '30px',
    border: '2px solid #fff',
    background: 'rgba(0,0,0,0.7)',
    color: '#fff',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.5px'
  }}
>
  {i18n.language === 'en' ? 'AR' : 'EN'}
</button>

      <section id="center" className="App">
        <VerticalProgress />
        <section id="hero-section">
          <Hero />
        </section>
        <section id="tunel-section">
          <Tunel />
        </section>
        <section id="branches-section">
          <Branches />
        </section>
        <section id="appscroll-section">
          <AppScrollSection />
        </section>
        <section id="footer-section">
          <Footer />
        </section>
      </section>
    </>
  )
}

export default App