import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css' // استيراد الستاين الأساسي للمكتبة

import './App.css'
import AppScrollSection from './components/AppScrollSection/AppScrollSection'
import Branches from './components/Branches/Branches'
import Hero from './components/Hero/Hero'
import Tunel from './components/Tunel/Tunel'
import VerticalProgress from './components/VerticalProgress/VerticalProgress'
import Footer from './Footer/Footer'

function App() {

useEffect(() => {
  // تهيئة السكرول الناعم على مستوى المتصفح بالكامل
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

  return (
  <>
    <section id="center" className="App"> {/* 👈 احذف scroll-container من هنا */}
      <VerticalProgress />
      <Hero />
      <Tunel />
      <Branches />
      <AppScrollSection />
      <Footer />
    </section>
  </>
)
}

export default App