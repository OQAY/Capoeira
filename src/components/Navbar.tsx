import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-forest/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <svg viewBox="0 0 40 40" className="w-9 h-9 transition-transform duration-300 group-hover:scale-110">
            <circle cx="20" cy="20" r="18" fill="#80B918" opacity="0.2"/>
            <path d="M20 8C16 12 12 18 14 24C16 30 20 28 20 28C20 28 24 30 26 24C28 18 24 12 20 8Z" fill="#80B918"/>
            <path d="M20 8L18 5C18 5 22 4 24 7L20 8Z" fill="#588157"/>
          </svg>
          <span className="font-display text-xl font-bold text-cream tracking-wide">
            CAPOEIRA
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-cream/80 hover:text-golden transition-colors duration-200 rounded-lg hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#explorador"
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
      {mobileOpen && (
        <div className="md:hidden bg-forest/98 backdrop-blur-md border-t border-white/10 mt-2">
          <div className="px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-cream/80 hover:text-golden hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
