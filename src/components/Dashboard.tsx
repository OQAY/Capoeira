import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LabelList,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { TrendingUp, Leaf, TreePine, BarChart3 } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { coverageData, carbonByRegion, siteDistribution } from '../data/mockData'

const kpis = [
  { icon: <Ruler />, label: 'Área Total Monitorada', value: '28.900', unit: 'hectares', color: 'forest', trend: '+12%' },
  { icon: <Leaf />, label: 'Estoque Médio de Carbono', value: '118', unit: 'tC/ha', color: 'olive', trend: '+8%' },
  { icon: <TreePine />, label: 'Índice de Biodiversidade', value: '0.72', unit: 'Shannon', color: 'lime', trend: '+5%' },
  { icon: <TrendingUp />, label: 'Taxa de Regeneração', value: '58', unit: '% médio', color: 'golden', trend: '+15%' },
]

function Ruler() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
      <path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/>
    </svg>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-forest/10 p-3">
      <p className="text-xs font-bold text-forest mb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-brown/60">{entry.name}:</span>
          <span className="font-bold text-forest">{entry.value}%</span>
        </div>
      ))}
    </div>
  )
}

const BarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-forest/10 p-3">
      <p className="text-xs font-bold text-forest mb-1">{label}</p>
      <p className="text-sm font-bold text-olive">{payload[0]?.value} tC/ha</p>
    </div>
  )
}

export default function Dashboard() {
  const { ref, isVisible } = useScrollReveal()
  const [period, setPeriod] = useState<'all' | 'recent'>('all')

  const chartData = period === 'recent' ? coverageData.slice(-5) : coverageData

  return (
    <section id="indicadores" className="py-20 md:py-28 bg-forest relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-olive/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-lime/5 blur-3xl" />

      <div ref={ref} className={`max-w-7xl mx-auto px-6 relative z-10 fade-in-section ${isVisible ? 'visible' : ''}`}>
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-lime/20 text-lime text-sm font-semibold rounded-full mb-4">
            Indicadores de Restauração
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            Dados em Tempo Real
          </h2>
          <p className="text-lg text-cream/60 max-w-2xl mx-auto">
            Métricas consolidadas dos sítios de estudo. Acompanhe a evolução da
            restauração florestal na Amazônia.
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 stagger-children visible">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-cream/40 group-hover:text-lime transition-colors">
                  {kpi.icon}
                </span>
                <span className="text-xs font-semibold text-lime bg-lime/10 px-2 py-0.5 rounded-full">
                  {kpi.trend}
                </span>
              </div>
              <p className="font-mono text-3xl font-bold text-cream tabular-nums tracking-tight">{kpi.value}</p>
              <p className="text-xs text-cream/40 mt-1">{kpi.unit}</p>
              <p className="text-xs text-cream/60 mt-2 font-medium">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Period filter */}
        <div className="flex justify-end mb-6 gap-2">
          <button
            onClick={() => setPeriod('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              period === 'all' ? 'bg-lime/20 text-lime' : 'text-cream/40 hover:text-cream/60'
            }`}
          >
            2015—2026
          </button>
          <button
            onClick={() => setPeriod('recent')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              period === 'recent' ? 'bg-lime/20 text-lime' : 'text-cream/40 hover:text-cream/60'
            }`}
          >
            Últimos 5 anos
          </button>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Area Chart */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-cream mb-1">
              Recuperação de Cobertura Vegetal
            </h3>
            <p className="text-sm text-cream/40 mb-4">% de cobertura por método de restauração</p>
            {/* Custom Legend */}
            <div className="flex flex-wrap gap-x-5 gap-y-1 mb-4">
              {[
                { label: 'Meta', color: '#fbbf24', dashed: true },
                { label: 'Plantio de Nativas', color: '#D4A574' },
                { label: 'Sistemas Agroflorestais', color: '#80B918' },
                { label: 'Regeneração Natural', color: '#34d399' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-1.5 text-[11px] text-cream/60">
                  <span
                    className="w-3 h-[3px] rounded-full"
                    style={{
                      backgroundColor: (item as any).dashed ? 'transparent' : item.color,
                      borderBottom: (item as any).dashed ? `2px dashed ${item.color}` : undefined,
                    }}
                  />
                  {item.label}
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="gradNatural" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradPlantio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4A574" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#D4A574" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradSaf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#80B918" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#80B918" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} domain={[0, 60]} />
                <Tooltip content={<CustomTooltip />} />
                {/* Meta line - dashed */}
                <Area
                  type="monotone"
                  dataKey="meta"
                  name="Meta"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  fill="none"
                  dot={false}
                  activeDot={{ r: 4, fill: '#fbbf24', stroke: '#fff', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="plantio"
                  name="Plantio de Nativas"
                  stroke="#D4A574"
                  strokeWidth={2.5}
                  fill="url(#gradPlantio)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#D4A574', stroke: '#fff', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="saf"
                  name="Sistemas Agroflorestais"
                  stroke="#80B918"
                  strokeWidth={2.5}
                  fill="url(#gradSaf)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#80B918', stroke: '#fff', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="natural"
                  name="Regeneração Natural"
                  stroke="#34d399"
                  strokeWidth={2.5}
                  fill="url(#gradNatural)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#34d399', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            {/* End values */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-3">
              {[
                { label: 'Meta', value: chartData[chartData.length - 1]?.meta, color: '#fbbf24' },
                { label: 'Plantio', value: chartData[chartData.length - 1]?.plantio, color: '#D4A574' },
                { label: 'SAF', value: chartData[chartData.length - 1]?.saf, color: '#80B918' },
                { label: 'Natural', value: chartData[chartData.length - 1]?.natural, color: '#34d399' },
              ].map(item => (
                <div key={item.label} className="text-center">
                  <p className="text-base font-bold font-mono" style={{ color: item.color }}>{item.value}%</p>
                  <p className="text-[10px] text-cream/40">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-cream mb-1">
              Estoque de Carbono por Região
            </h3>
            <p className="text-sm text-cream/40 mb-6">Toneladas de carbono por hectare (tC/ha)</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={carbonByRegion} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="region" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.15)]} />
                <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="carbon" radius={[6, 6, 0, 0]}>
                  {carbonByRegion.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                  <LabelList dataKey="carbon" position="top" fill="rgba(255,255,255,0.7)" fontSize={12} fontWeight={600} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-cream mb-1">
              Distribuição por Ecossistema
            </h3>
            <p className="text-sm text-cream/40 mb-6">Sítios de estudo por tipo de ecossistema</p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={siteDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700}>
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                  labelLine={false}
                >
                  {siteDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} sítios`, name as string]}
                  contentStyle={{
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    border: '1px solid rgba(27,67,50,0.1)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {siteDistribution.map(d => {
                const total = siteDistribution.reduce((sum, s) => sum + s.value, 0);
                const pct = ((d.value / total) * 100).toFixed(0);
                return (
                  <div key={d.name} className="flex items-center gap-2 text-xs text-cream/60">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.fill }} />
                    <span>{d.name} <span className="text-cream/80 font-semibold">{pct}%</span></span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insight card */}
          <div className="bg-gradient-to-br from-olive/20 to-lime/10 backdrop-blur-sm border border-lime/20 rounded-2xl p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="text-lime" size={20} />
              <span className="text-xs font-bold text-lime uppercase tracking-wider">Insight</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-cream mb-4">
              Plantio de espécies nativas lidera a recuperação de cobertura
            </h3>
            <p className="text-cream/60 leading-relaxed mb-6">
              Nos últimos 10 anos, o método de plantio de espécies nativas alcançou
              <strong className="text-lime"> 79% de cobertura vegetal</strong>, superando
              a regeneração natural (69%) e os sistemas agroflorestais (77%).
              Porém, os SAFs apresentam a melhor relação custo-benefício quando
              considerados os indicadores socioeconômicos.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-lime/10">
              <div className="text-center">
                <p className="font-mono text-4xl md:text-5xl font-bold text-golden tabular-nums tracking-tight leading-tight">79%</p>
                <p className="text-xs text-cream/50 mt-1">Plantio Nativo</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-4xl md:text-5xl font-bold text-lime tabular-nums tracking-tight leading-tight">77%</p>
                <p className="text-xs text-cream/50 mt-1">SAF</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-4xl md:text-5xl font-bold text-olive tabular-nums tracking-tight leading-tight">69%</p>
                <p className="text-xs text-cream/50 mt-1">Regeneração</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave to next section */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#FAF5EE" />
        </svg>
      </div>
    </section>
  )
}
