import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MapExplorer from './components/MapExplorer'
import Dashboard from './components/Dashboard'
import DataCatalog from './components/DataCatalog'
import About from './components/About'

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => {
        const start = window.scrollY
        const duration = 1200
        const startTime = performance.now()
        const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        const animate = (now: number) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          window.scrollTo(0, start * (1 - easeInOutCubic(progress)))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }}
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1 transition-all duration-300 hover:scale-110 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      style={{ animation: visible ? 'gentle-bounce 3s ease-in-out infinite' : 'none' }}
      aria-label="Voltar ao topo"
    >
      <ChevronUp size={20} strokeWidth={3} className="text-forest" />
      <div className="w-14 h-14 rounded-full bg-lime shadow-lg shadow-lime/30 flex items-center justify-center hover:bg-lime/90">
        <img src="/capoeira-logo.png" alt="Topo" className="w-15 h-15 object-contain" />
      </div>
    </button>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <MapExplorer />
      <Dashboard />
      <DataCatalog />
      <About />
      <ScrollToTop />
    </div>
  )
}
