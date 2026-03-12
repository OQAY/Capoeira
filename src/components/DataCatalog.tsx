import { useState } from 'react'
import { Search, ChevronDown, ChevronUp, Database, FileSpreadsheet, ExternalLink } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { datasets, type Dataset } from '../data/mockData'

const statusConfig = {
  publicado: { label: 'Publicado', bg: 'bg-lime/15', text: 'text-lime', dot: 'bg-lime' },
  revisao: { label: 'Em Revisão', bg: 'bg-golden/15', text: 'text-golden', dot: 'bg-golden' },
  processando: { label: 'Processando', bg: 'bg-terra-light/15', text: 'text-terra-light', dot: 'bg-terra-light' },
}

function DatasetRow({ dataset }: { dataset: Dataset }) {
  const [expanded, setExpanded] = useState(false)
  const status = statusConfig[dataset.status]

  return (
    <div className="border-b border-forest/5 last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 hover:bg-forest/3 transition-colors flex items-center gap-4"
      >
        <Database size={16} className="text-olive shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-forest text-sm truncate">{dataset.name}</p>
          <p className="text-xs text-brown/50 mt-0.5">{dataset.institution} — {dataset.region}</p>
        </div>
        <span className="hidden md:block text-xs text-brown/40 font-mono">{dataset.year}</span>
        <span className="hidden sm:block text-xs text-brown/40">{dataset.type}</span>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${status.bg} ${status.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
        {expanded ? <ChevronUp size={16} className="text-brown/30" /> : <ChevronDown size={16} className="text-brown/30" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 ml-9 animate-count">
          <div className="bg-cream/50 rounded-xl p-5 grid md:grid-cols-2 gap-4 border border-forest/5">
            <div>
              <h4 className="text-xs font-bold text-forest/50 uppercase tracking-wider mb-2">Metodologia</h4>
              <p className="text-sm text-brown/70 leading-relaxed">{dataset.methodology}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-forest/50 uppercase tracking-wider mb-2">Variáveis</h4>
              <p className="text-sm text-brown/70 leading-relaxed">{dataset.variables}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-forest/50 uppercase tracking-wider mb-2">Formato</h4>
              <div className="flex gap-2">
                {dataset.format.split(', ').map(f => (
                  <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 bg-forest/5 text-forest text-xs font-mono rounded-md">
                    <FileSpreadsheet size={12} />
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-forest/50 uppercase tracking-wider mb-2">DOI</h4>
              {dataset.doi.startsWith('10.') ? (
                <span className="inline-flex items-center gap-1 text-sm text-olive hover:text-forest font-mono cursor-pointer">
                  <ExternalLink size={12} />
                  {dataset.doi}
                </span>
              ) : (
                <span className="text-sm text-brown/40 italic">{dataset.doi}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DataCatalog() {
  const { ref, isVisible } = useScrollReveal()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const types = [...new Set(datasets.map(d => d.type))]

  const filtered = datasets.filter(d => {
    const matchSearch = search === '' ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.institution.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === '' || d.type === typeFilter
    return matchSearch && matchType
  })

  return (
    <section id="dados" className="py-20 md:py-28 bg-cream-light relative overflow-hidden">
      {/* Pattern background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'url(/capoeira-pattern.png)',
          backgroundSize: '120px',
          backgroundRepeat: 'repeat',
          filter: 'brightness(0) sepia(1) hue-rotate(70deg) saturate(3)',
        }}
      />
      <div ref={ref} className={`max-w-7xl mx-auto px-6 fade-in-section relative z-10 ${isVisible ? 'visible' : ''}`}>
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-forest/10 text-forest text-sm font-semibold rounded-full mb-4">
            Catálogo de Dados
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forest mb-4">
            Bases de Dados Abertas
          </h2>
          <p className="text-lg text-brown/70 max-w-2xl mx-auto">
            Acesse dados padronizados de pesquisa sobre restauração florestal.
            Cada base possui metadados completos e metodologia documentada.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/30" />
            <input
              type="text"
              placeholder="Buscar por nome, instituição ou região..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border-2 border-forest/10 rounded-xl text-sm text-forest placeholder:text-brown/30 focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/20 transition-all"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 bg-white border-2 border-forest/10 rounded-xl text-sm text-forest focus:outline-none focus:border-olive cursor-pointer"
          >
            <option value="">Todos os tipos</option>
            {types.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 px-1 gap-2">
          <p className="text-sm text-brown/50">
            <span className="font-bold text-forest">{filtered.length}</span> base{filtered.length !== 1 ? 's' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
          </p>
          <div className="flex flex-wrap gap-2">
            {['publicado', 'revisao', 'processando'].map(s => {
              const cfg = statusConfig[s as keyof typeof statusConfig]
              const count = filtered.filter(d => d.status === s).length
              return (
                <span key={s} className={`text-xs px-2 py-1 rounded-full ${cfg.bg} ${cfg.text} font-medium`}>
                  {count} {cfg.label.toLowerCase()}
                </span>
              )
            })}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-forest/10 shadow-lg overflow-hidden">
          {/* Header row */}
          <div className="px-5 py-3 bg-forest/3 border-b border-forest/5 flex items-center gap-4 text-xs font-bold text-forest/50 uppercase tracking-wider">
            <span className="w-4" />
            <span className="flex-1">Dataset</span>
            <span className="hidden md:block w-12">Ano</span>
            <span className="hidden sm:block w-24">Tipo</span>
            <span className="w-24 text-center">Status</span>
            <span className="w-4" />
          </div>

          {filtered.length > 0 ? (
            filtered.map(d => <DatasetRow key={d.id} dataset={d} />)
          ) : (
            <div className="px-5 py-16 text-center">
              <Database size={40} className="mx-auto text-brown/20 mb-4" />
              <p className="text-brown/40 font-medium">Nenhum dataset encontrado</p>
              <p className="text-brown/30 text-sm mt-1">Tente ajustar os filtros de busca</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
