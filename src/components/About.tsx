import { useScrollReveal } from '../hooks/useScrollReveal'
import { Users, Globe, BookOpen, Mail, MapPin, Building2 } from 'lucide-react'
import { partnerInstitutions } from '../data/mockData'


const coordinators = [
  {
    name: 'Dra. Joice Nunes Ferreira',
    role: 'Coordenadora Geral',
    institution: 'Embrapa Amazônia Oriental',
    bio: 'Pesquisadora em ecologia e serviços ecossistêmicos. Cofundadora da Rede Amazônia Sustentável (RAS). Mais de 20 anos de experiência em restauração florestal.',
    initials: 'JF',
  },
  {
    name: 'Dr. Divino Vicente Silvério',
    role: 'Coordenador Adjunto',
    institution: 'UFRA — Universidade Federal Rural da Amazônia',
    bio: 'Especialista em ecologia do fogo e degradação florestal. Membro do Science Panel for the Amazon (SPA). Pesquisa em geoprocessamento e interação biosfera-atmosfera.',
    initials: 'DS',
  },
]

const pillars = [
  {
    icon: <BookOpen size={24} />,
    title: 'Ciência',
    description: 'Pesquisa de ponta em ecologia, biodiversidade e restauração com dados de mais de 100 sítios na Amazônia Legal.',
  },
  {
    icon: <Users size={24} />,
    title: 'Comunidades',
    description: 'Integração de saberes tradicionais e diálogo com comunidades ribeirinhas, indígenas e agricultores familiares.',
  },
  {
    icon: <Globe size={24} />,
    title: 'Políticas Públicas',
    description: 'Subsídio técnico-científico para políticas de restauração alinhadas ao Acordo de Paris e ao PRVN.',
  },
]

export default function About() {
  const { ref, isVisible } = useScrollReveal()
  const { ref: ref2, isVisible: isVisible2 } = useScrollReveal()

  return (
    <>
      <section id="sobre" className="py-20 md:py-28 bg-cream-light">
        <div ref={ref} className={`max-w-7xl mx-auto px-6 fade-in-section ${isVisible ? 'visible' : ''}`}>
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-forest/10 text-forest text-sm font-semibold rounded-full mb-4">
              Sobre o Centro
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest mb-4">
              Centro CAPOEIRA
            </h2>
            <p className="text-lg text-brown/70 max-w-3xl mx-auto leading-relaxed">
              Centro Avançado em Pesquisas Socioecológicas para a Recuperação Ambiental da Amazônia.
              Aprovado pelo CNPq na chamada Pró-Amazônia, com investimento de R$ 14 milhões.
            </p>
          </div>

          {/* Mission quote */}
          <div className="max-w-4xl mx-auto mb-20 relative">
            <div className="bg-gradient-to-br from-forest to-forest-light rounded-3xl p-10 md:p-14 relative overflow-hidden">
              <div className="absolute -top-4 left-4 text-lime/15 font-display text-[10rem] leading-none select-none pointer-events-none">"</div>
              <blockquote className="relative z-10 pt-8">
                <p className="font-display text-2xl md:text-3xl text-cream leading-relaxed italic">
                  Nos últimos 70 anos, a Amazônia foi intensamente destruída. Por que não podemos imaginar
                  que os próximos 70 anos, que é o tempo de uma vida, seja um período de resiliência e
                  <span className="text-lime font-bold"> regeneração?</span>
                </p>
                <footer className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-lime/20 flex items-center justify-center text-lime font-bold text-sm">
                    JF
                  </div>
                  <div>
                    <cite className="not-italic font-semibold text-cream">Dra. Joice Ferreira</cite>
                    <p className="text-cream/50 text-sm">Embrapa — Coordenadora do CAPOEIRA</p>
                  </div>
                </footer>
              </blockquote>
              {/* Decorative */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-olive/10 blur-2xl" />
            </div>
          </div>

          {/* Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-2xl p-8 border border-forest/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-forest/5 rounded-2xl flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream transition-all duration-300 mb-5">
                  {pillar.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-forest mb-3">{pillar.title}</h3>
                <p className="text-brown/60 leading-relaxed text-sm">{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* Coordinators */}
          <div className="mb-20">
            <h3 className="font-display text-2xl font-bold text-forest text-center mb-10">
              Coordenação
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {coordinators.map((person) => (
                <div
                  key={person.name}
                  className="bg-white rounded-2xl overflow-hidden border border-forest/5 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-forest to-olive h-2" />
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-forest to-olive flex items-center justify-center text-cream font-display font-bold text-xl">
                        {person.initials}
                      </div>
                      <div>
                        <h4 className="font-display text-lg font-bold text-forest">{person.name}</h4>
                        <p className="text-sm text-olive font-semibold">{person.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-brown/50 mb-3">
                      <Building2 size={12} />
                      {person.institution}
                    </div>
                    <p className="text-sm text-brown/60 leading-relaxed">{person.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partner institutions */}
          <div ref={ref2} className={`fade-in-section ${isVisible2 ? 'visible' : ''}`}>
            <h3 className="font-display text-2xl font-bold text-forest text-center mb-10">
              Instituições Parceiras
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
              {partnerInstitutions.map((inst) => (
                <div
                  key={inst}
                  className="bg-white px-4 py-3.5 rounded-xl border border-forest/5 text-sm text-brown/70 hover:text-forest hover:border-forest/20 hover:shadow-sm transition-all duration-200 text-center flex items-center justify-center min-h-[60px]"
                >
                  {inst}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest text-cream py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/capoeira-logo.png" alt="CAPOEIRA" className="w-10 h-10 object-contain" />
                <span className="font-display text-2xl font-bold tracking-wide">CAPOEIRA</span>
              </div>
              <p className="text-cream/50 text-sm leading-relaxed max-w-xs">
                Centro Avançado em Pesquisas Socioecológicas para a Recuperação Ambiental da Amazônia
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-bold mb-4 text-golden">Contato</h4>
              <div className="space-y-3 text-sm text-cream/60">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-cream/40" />
                  contato.centrocapoeira@gmail.com
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-cream/40" />
                  Belém, PA — Embrapa Amazônia Oriental
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-cream/40" />
                  Trabalho 100% remoto
                </div>
              </div>
            </div>

            {/* Funding */}
            <div>
              <h4 className="font-display font-bold mb-4 text-golden">Financiamento</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-cream/60">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xs font-bold text-cream/80">
                    CNPq
                  </div>
                  Conselho Nacional de Desenvolvimento Científico e Tecnológico
                </div>
                <div className="flex items-center gap-3 text-sm text-cream/60">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xs font-bold text-cream/80">
                    MCTI
                  </div>
                  Ministério da Ciência, Tecnologia e Inovação
                </div>
                <div className="flex items-center gap-3 text-sm text-cream/60">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xs font-bold text-cream/80">
                    FNDCT
                  </div>
                  Fundo Nacional de Desenvolvimento Científico e Tecnológico
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-cream/30">
              Protótipo demonstrativo — Plataforma de Dados para Restauração da Amazônia
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cream/20 bg-white/5 px-2 py-1 rounded">Embrapa</span>
                <span className="text-xs font-mono text-cream/20 bg-white/5 px-2 py-1 rounded">CNPq</span>
                <span className="text-xs font-mono text-cream/20 bg-white/5 px-2 py-1 rounded">MCTI</span>
                <span className="text-xs font-mono text-cream/20 bg-white/5 px-2 py-1 rounded">Gov.br</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
