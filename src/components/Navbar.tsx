import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { CapoeiraIcon, CapoeiraWordmark } from './CapoeiraLogo'

// Ease-in-out cubic: devagar → rápido → devagar
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function smoothScrollTo(targetId: string, duration = 1000) {
  const el = document.querySelector(targetId)
  if (!el) return
  const start = window.scrollY
  const end = el.getBoundingClientRect().top + start - 70 // offset para navbar
  const distance = end - start
  let startTime: number | null = null

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)
    window.scrollTo(0, start + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

const navLinks = [
  { href: '#inicio', label: 'Início' },
  { href: '#explorador', label: 'Explorador' },
  { href: '#indicadores', label: 'Indicadores' },
  { href: '#dados', label: 'Dados' },
  { href: '#sobre', label: 'Sobre' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    smoothScrollTo(href, 1000)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      setMobileOpen(false)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-forest backdrop-blur-md shadow-lg py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} className="flex items-center gap-2 group">
          <CapoeiraIcon size={60} color="#F5E6D0" className="transition-transform duration-300 group-hover:scale-110" />
          <CapoeiraWordmark color="#F5E6D0" className="text-xl" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-2 text-sm font-medium text-cream/80 hover:text-golden transition-colors duration-200 rounded-lg hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#explorador"
            onClick={(e) => handleNavClick(e, '#explorador')}
            className="ml-4 px-5 py-2.5 bg-lime/90 text-forest font-semibold text-sm rounded-full hover:bg-lime transition-all duration-200 hover:shadow-lg hover:shadow-lime/20"
          >
            Explorar Dados
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-cream p-2"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-forest/98 backdrop-blur-md border-t border-white/10 mt-2 overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
          mobileOpen
            ? 'max-h-[400px] opacity-100 scale-y-100'
            : 'max-h-0 opacity-0 scale-y-95 pointer-events-none'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`px-4 py-3 text-cream/80 hover:text-golden hover:bg-white/5 rounded-lg transition-all duration-300 ${
                mobileOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4'
              }`}
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      {/* Wave bottom edge — extends below nav */}
      <div className={`absolute left-0 right-0 top-full pointer-events-none transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
        <svg viewBox="0 0 1440 20" preserveAspectRatio="none" className="w-full h-3 block -translate-y-[1px]">
          <path
            d="M0,0 L1440,0 L1440,8 C1200,20 960,4 720,14 C480,24 240,6 0,12 Z"
            fill="#1B4332"
          />
        </svg>
      </div>
    </nav>
    {/* Backdrop — fecha menu ao clicar fora */}
    {mobileOpen && (
      <div
        className="fixed inset-0 z-40 md:hidden"
        onClick={() => setMobileOpen(false)}
      />
    )}
  </>
  )
}
