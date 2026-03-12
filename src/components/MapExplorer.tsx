import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { MapPin, Trees, Droplets, Sprout, TreePine, X, Leaf, BarChart3 } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { studySites, ecosystemTypes, type StudySite } from '../data/mockData'
import 'leaflet/dist/leaflet.css'

const typeIcons: Record<string, React.ReactNode> = {
  secundaria: <Trees size={16} />,
  degradada: <TreePine size={16} />,
  saf: <Sprout size={16} />,
  aquatico: <Droplets size={16} />,
}

const typeColors: Record<string, string> = {
  secundaria: '#80B918',
  degradada: '#8B4513',
  saf: '#588157',
  aquatico: '#2D6A4F',
}

// Fit map bounds when filters change
function FitBounds({ sites }: { sites: StudySite[] }) {
  const map = useMap()
  useMemo(() => {
    if (sites.length > 0) {
      const lats = sites.map(s => s.lat)
      const lngs = sites.map(s => s.lng)
      map.fitBounds(
        [[Math.min(...lats) - 1, Math.min(...lngs) - 1], [Math.max(...lats) + 1, Math.max(...lngs) + 1]],
        { padding: [30, 30], maxZoom: 7 }
      )
    }
  }, [sites, map])
  return null
}

export default function MapExplorer() {
  const { ref, isVisible } = useScrollReveal()
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [selectedSite, setSelectedSite] = useState<StudySite | null>(null)

  const filteredSites = activeFilters.length === 0
    ? studySites
    : studySites.filter(s => activeFilters.includes(s.type))

  const toggleFilter = (key: string) => {
    setActiveFilters(prev =>
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
    )
    setSelectedSite(null)
  }

  // Amazon Legal center
  const center: [number, number] = [-5.5, -55]

  return (
    <section id="explorador" className="py-20 md:py-28 bg-cream-light leaf-pattern">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 fade-in-section ${isVisible ? 'visible' : ''}`}>
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-forest/10 text-forest text-sm font-semibold rounded-full mb-4">
            Explorador de Sítios
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forest mb-4">
            Mapa da Amazônia Legal
          </h2>
          <p className="text-lg text-brown/70 max-w-2xl mx-auto">
            Explore os sítios de estudo distribuídos em 9 estados da Amazônia Legal.
            Filtre por tipo de ecossistema e clique nos pontos para detalhes.
          </p>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar Filters */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-forest mb-3">Tipo de Ecossistema</h3>
            {ecosystemTypes.map((eco) => (
              <button
                key={eco.key}
                onClick={() => toggleFilter(eco.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left ${
                  activeFilters.includes(eco.key)
                    ? 'border-forest bg-forest text-cream shadow-lg'
                    : activeFilters.length === 0
                    ? 'border-forest/20 bg-white text-forest hover:border-forest/40 hover:shadow-md'
                    : 'border-gray-200 bg-white/50 text-gray-400 hover:border-forest/20'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: eco.color }}
                />
                <span className="text-sm font-medium">{eco.label}</span>
                <span className="ml-auto text-xs font-mono opacity-70">
                  {studySites.filter(s => s.type === eco.key).length}
                </span>
              </button>
            ))}

            {activeFilters.length > 0 && (
              <button
                onClick={() => { setActiveFilters([]); setSelectedSite(null) }}
                className="text-sm text-terra-light hover:text-terra underline mt-2"
              >
                Limpar filtros
              </button>
            )}

            {/* Legend */}
            <div className="mt-8 p-4 bg-white rounded-xl border border-forest/10">
              <h4 className="text-xs font-bold text-forest/60 uppercase tracking-wider mb-3">Legenda</h4>
              <div className="space-y-2">
                {ecosystemTypes.map(eco => (
                  <div key={eco.key} className="flex items-center gap-2 text-xs text-brown/70">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: eco.color }} />
                    {eco.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Sites count */}
            <div className="p-4 bg-forest/5 rounded-xl text-center">
              <p className="font-mono text-2xl font-bold text-forest">{filteredSites.length}</p>
              <p className="text-xs text-brown/60 mt-1">sítios de estudo</p>
            </div>
          </div>

          {/* Map + Detail Panel */}
          <div className="relative">
            {/* Leaflet Map */}
            <div className="rounded-2xl border border-forest/10 shadow-xl overflow-hidden" style={{ height: '550px' }}>
              <MapContainer
                center={center}
                zoom={4}
                minZoom={4}
                maxZoom={12}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <FitBounds sites={filteredSites} />

                {filteredSites.map(site => (
                  <CircleMarker
                    key={site.id}
                    center={[site.lat, site.lng]}
                    radius={selectedSite?.id === site.id ? 10 : 7}
                    pathOptions={{
                      fillColor: typeColors[site.type],
                      color: '#fff',
                      weight: 2.5,
                      opacity: 1,
                      fillOpacity: 0.9,
                    }}
                    eventHandlers={{
                      click: () => setSelectedSite(site),
                    }}
                  >
                    <Popup>
                      <div style={{ fontFamily: 'Source Sans 3, sans-serif', minWidth: '180px' }}>
                        <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: typeColors[site.type], marginBottom: '4px' }}>
                          {site.typeLabel}
                        </p>
                        <p style={{ fontSize: '15px', fontWeight: 700, color: '#1B4332', marginBottom: '2px' }}>
                          {site.name}
                        </p>
                        <p style={{ fontSize: '12px', color: '#666' }}>
                          {site.city}, {site.state}
                        </p>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>

            {/* Selected site detail card */}
            {selectedSite && (
              <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-xl shadow-2xl border border-forest/10 overflow-hidden z-[1000] animate-count">
                <div className="p-1.5">
                  <div className="rounded-lg p-4" style={{ backgroundColor: typeColors[selectedSite.type] + '15' }}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span style={{ color: typeColors[selectedSite.type] }}>{typeIcons[selectedSite.type]}</span>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: typeColors[selectedSite.type] }}>
                          {selectedSite.typeLabel}
                        </span>
                      </div>
                      <button onClick={() => setSelectedSite(null)} className="text-brown/40 hover:text-brown">
                        <X size={16} />
                      </button>
                    </div>
                    <h4 className="font-display text-lg font-bold text-forest mt-2">{selectedSite.name}</h4>
                    <p className="text-sm text-brown/60">{selectedSite.city}, {selectedSite.state}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4 pt-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-olive" />
                    <div>
                      <p className="text-xs text-brown/50">Área</p>
                      <p className="text-sm font-bold text-forest">{selectedSite.area.toLocaleString()} ha</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf size={14} className="text-olive" />
                    <div>
                      <p className="text-xs text-brown/50">Carbono</p>
                      <p className="text-sm font-bold text-forest">{selectedSite.carbon} tC/ha</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trees size={14} className="text-olive" />
                    <div>
                      <p className="text-xs text-brown/50">Biodiversidade</p>
                      <p className="text-sm font-bold text-forest">{selectedSite.biodiversity.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 size={14} className="text-olive" />
                    <div>
                      <p className="text-xs text-brown/50">Regeneração</p>
                      <p className="text-sm font-bold text-forest">{selectedSite.regeneration}%</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4 flex items-center justify-between text-xs text-brown/50">
                  <span>{selectedSite.institution}</span>
                  <span>Desde {selectedSite.since}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
