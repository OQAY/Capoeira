import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useCountUp } from '../hooks/useScrollReveal'

function AnimatedNumber({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const { count, trigger } = useCountUp(end, 2200)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) trigger() },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [trigger])

  return (
    <span ref={ref} className="font-mono text-3xl md:text-5xl font-bold text-lime tabular-nums tracking-tight">
      {prefix}{count}{suffix}
    </span>
  )
}

const stats = [
  { end: 180, suffix: '+', label: 'Pesquisadores' },
  { end: 33, suffix: '', label: 'Instituições' },
  { end: 100, suffix: '+', label: 'Sítios de Estudo' },
  { end: 14, suffix: 'M', prefix: 'R$ ', label: 'Investimento' },
]

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100)
  }, [])

  return (
    <section id="inicio" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest-light to-brown-dark" />

      {/* Animated leaf shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-olive/10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-lime/8 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-golden/8 blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-28 md:pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-sm text-cream/80 font-medium">
              <span className="text-lime font-bold">C</span>entro{' '}
              <span className="text-lime font-bold">A</span>vançado em{' '}
              <span className="text-lime font-bold">P</span>esquisas{' '}
              Soci<span className="text-lime font-bold">o</span>ecológicas para a{' '}
              <span className="text-lime font-bold">R</span><span className="text-lime font-bold">e</span>cuperação{' '}
              Amb<span className="text-lime font-bold">i</span>ental{' '}
              da <span className="text-lime font-bold">A</span>mazônia
            </span>
          </div>

          {/* Title */}
          <h1
            className={`font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6 transition-all duration-700 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Transformar a cultura da{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-cream">destruição</span>
              <span className="absolute inset-0 bg-terra-light/80 -skew-x-2 rounded-md -mx-2 px-2" />
            </span>{' '}
            em cultura da{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-forest">restauração</span>
              <span className="absolute inset-0 bg-lime/90 -skew-x-2 rounded-md -mx-2 px-2" />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl text-cream/70 max-w-2xl mb-10 leading-relaxed transition-all duration-700 delay-400 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Ciência e dados abertos para apoiar a tomada de decisão sobre restauração
            de florestas degradadas na Amazônia. Articulando saberes tradicionais,
            pesquisa científica e políticas públicas.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 mb-10 md:mb-20 transition-all duration-700 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <a
              href="#explorador"
              className="group px-8 py-4 bg-lime text-forest font-bold rounded-full hover:bg-lime/90 transition-all duration-300 hover:shadow-xl hover:shadow-lime/20 flex items-center gap-2"
            >
              Explorar Dados
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#sobre"
              className="px-8 py-4 border-2 border-cream/30 text-cream font-semibold rounded-full hover:bg-cream/10 hover:border-cream/50 transition-all duration-300"
            >
              Conheça o Centro
            </a>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 delay-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <AnimatedNumber end={stat.end} suffix={stat.suffix} prefix={stat.prefix || ''} />
                <p className="text-cream/60 text-sm mt-1 font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-bounce">
        <span className="text-cream/40 text-xs tracking-widest uppercase">Explorar</span>
        <ChevronDown className="text-cream/40" size={20} />
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,100 L0,100 Z"
            fill="#FAF5EE"
          />
        </svg>
      </div>
    </section>
  )
}
