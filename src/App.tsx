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
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-lime text-forest shadow-lg shadow-lime/30 flex items-center justify-center transition-all duration-300 hover:bg-lime/90 hover:scale-110 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{ animation: visible ? 'gentle-bounce 2s ease-in-out infinite' : 'none' }}
      aria-label="Voltar ao topo"
    >
      <ChevronUp size={24} strokeWidth={3} />
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
