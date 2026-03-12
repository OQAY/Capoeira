export interface StudySite {
  id: number
  name: string
  city: string
  state: string
  stateCode: string
  lat: number
  lng: number
  type: 'secundaria' | 'degradada' | 'saf' | 'aquatico'
  typeLabel: string
  area: number
  carbon: number
  biodiversity: number
  regeneration: number
  institution: string
  since: number
}

export const studySites: StudySite[] = [
  { id: 1, name: 'Sítio Paragominas', city: 'Paragominas', state: 'Pará', stateCode: 'PA', lat: -2.96, lng: -47.35, type: 'secundaria', typeLabel: 'Floresta Secundária', area: 1200, carbon: 145, biodiversity: 0.78, regeneration: 72, institution: 'Embrapa', since: 2016 },
  { id: 2, name: 'Sítio Santarém', city: 'Santarém', state: 'Pará', stateCode: 'PA', lat: -2.43, lng: -54.71, type: 'degradada', typeLabel: 'Floresta Primária Degradada', area: 3500, carbon: 89, biodiversity: 0.62, regeneration: 45, institution: 'UFPA', since: 2017 },
  { id: 3, name: 'Sítio Marabá', city: 'Marabá', state: 'Pará', stateCode: 'PA', lat: -5.37, lng: -49.12, type: 'saf', typeLabel: 'Sistema Agroflorestal', area: 450, carbon: 112, biodiversity: 0.71, regeneration: 68, institution: 'Embrapa', since: 2018 },
  { id: 4, name: 'Sítio Manaus', city: 'Manaus', state: 'Amazonas', stateCode: 'AM', lat: -3.12, lng: -60.02, type: 'degradada', typeLabel: 'Floresta Primária Degradada', area: 5200, carbon: 198, biodiversity: 0.85, regeneration: 38, institution: 'INPA', since: 2015 },
  { id: 5, name: 'Sítio Tefé', city: 'Tefé', state: 'Amazonas', stateCode: 'AM', lat: -3.35, lng: -64.71, type: 'aquatico', typeLabel: 'Sistema Aquático', area: 2800, carbon: 56, biodiversity: 0.91, regeneration: 52, institution: 'IDSM', since: 2019 },
  { id: 6, name: 'Sítio Alta Floresta', city: 'Alta Floresta', state: 'Mato Grosso', stateCode: 'MT', lat: -9.88, lng: -56.09, type: 'secundaria', typeLabel: 'Floresta Secundária', area: 980, carbon: 134, biodiversity: 0.69, regeneration: 65, institution: 'UNEMAT', since: 2017 },
  { id: 7, name: 'Sítio Sinop', city: 'Sinop', state: 'Mato Grosso', stateCode: 'MT', lat: -11.86, lng: -55.50, type: 'saf', typeLabel: 'Sistema Agroflorestal', area: 620, carbon: 98, biodiversity: 0.64, regeneration: 71, institution: 'UFMT', since: 2019 },
  { id: 8, name: 'Sítio Imperatriz', city: 'Imperatriz', state: 'Maranhão', stateCode: 'MA', lat: -5.52, lng: -47.47, type: 'secundaria', typeLabel: 'Floresta Secundária', area: 780, carbon: 121, biodiversity: 0.66, regeneration: 58, institution: 'UFMA', since: 2018 },
  { id: 9, name: 'Sítio Porto Velho', city: 'Porto Velho', state: 'Rondônia', stateCode: 'RO', lat: -8.76, lng: -63.90, type: 'degradada', typeLabel: 'Floresta Primária Degradada', area: 4100, carbon: 76, biodiversity: 0.57, regeneration: 41, institution: 'UNIR', since: 2020 },
  { id: 10, name: 'Sítio Rio Branco', city: 'Rio Branco', state: 'Acre', stateCode: 'AC', lat: -9.97, lng: -67.81, type: 'saf', typeLabel: 'Sistema Agroflorestal', area: 340, carbon: 108, biodiversity: 0.73, regeneration: 74, institution: 'UFAC', since: 2018 },
  { id: 11, name: 'Sítio Macapá', city: 'Macapá', state: 'Amapá', stateCode: 'AP', lat: 0.03, lng: -51.05, type: 'aquatico', typeLabel: 'Sistema Aquático', area: 1900, carbon: 67, biodiversity: 0.88, regeneration: 49, institution: 'UNIFAP', since: 2020 },
  { id: 12, name: 'Sítio Boa Vista', city: 'Boa Vista', state: 'Roraima', stateCode: 'RR', lat: 2.82, lng: -60.67, type: 'secundaria', typeLabel: 'Floresta Secundária', area: 1100, carbon: 139, biodiversity: 0.72, regeneration: 61, institution: 'UFRR', since: 2019 },
  { id: 13, name: 'Sítio Palmas', city: 'Palmas', state: 'Tocantins', stateCode: 'TO', lat: -10.17, lng: -48.33, type: 'degradada', typeLabel: 'Floresta Primária Degradada', area: 2200, carbon: 82, biodiversity: 0.59, regeneration: 44, institution: 'UFT', since: 2021 },
  { id: 14, name: 'Sítio Bragança', city: 'Bragança', state: 'Pará', stateCode: 'PA', lat: -1.06, lng: -46.77, type: 'aquatico', typeLabel: 'Sistema Aquático', area: 1500, carbon: 43, biodiversity: 0.82, regeneration: 55, institution: 'UFPA', since: 2017 },
  { id: 15, name: 'Sítio Capitão Poço', city: 'Capitão Poço', state: 'Pará', stateCode: 'PA', lat: -1.74, lng: -47.06, type: 'secundaria', typeLabel: 'Floresta Secundária', area: 680, carbon: 128, biodiversity: 0.70, regeneration: 63, institution: 'UFRA', since: 2020 },
  { id: 16, name: 'Sítio Canaã dos Carajás', city: 'Canaã dos Carajás', state: 'Pará', stateCode: 'PA', lat: -6.50, lng: -49.88, type: 'saf', typeLabel: 'Sistema Agroflorestal', area: 520, carbon: 95, biodiversity: 0.67, regeneration: 69, institution: 'UFRA', since: 2021 },
]

export const ecosystemTypes = [
  { key: 'secundaria', label: 'Floresta Secundária', color: '#80B918' },
  { key: 'degradada', label: 'Floresta Primária Degradada', color: '#8B4513' },
  { key: 'saf', label: 'Sistema Agroflorestal', color: '#588157' },
  { key: 'aquatico', label: 'Sistema Aquático', color: '#2D6A4F' },
] as const

export const coverageData = [
  { year: 2015, natural: 5, plantio: 7, saf: 6, meta: 10 },
  { year: 2016, natural: 7, plantio: 10, saf: 9, meta: 14 },
  { year: 2017, natural: 9, plantio: 13, saf: 11, meta: 18 },
  { year: 2018, natural: 11, plantio: 16, saf: 14, meta: 22 },
  { year: 2019, natural: 13, plantio: 18, saf: 16, meta: 26 },
  { year: 2020, natural: 14, plantio: 20, saf: 18, meta: 30 },
  { year: 2021, natural: 16, plantio: 23, saf: 21, meta: 34 },
  { year: 2022, natural: 18, plantio: 26, saf: 24, meta: 38 },
  { year: 2023, natural: 20, plantio: 29, saf: 27, meta: 42 },
  { year: 2024, natural: 22, plantio: 32, saf: 29, meta: 46 },
  { year: 2025, natural: 23, plantio: 34, saf: 31, meta: 50 },
  { year: 2026, natural: 25, plantio: 37, saf: 34, meta: 54 },
]

export const carbonByRegion = [
  { region: 'Pará', carbon: 145, fill: '#1B4332' },
  { region: 'Amazonas', carbon: 198, fill: '#2D6A4F' },
  { region: 'Mato Grosso', carbon: 116, fill: '#588157' },
  { region: 'Maranhão', carbon: 121, fill: '#80B918' },
  { region: 'Rondônia', carbon: 76, fill: '#A0522D' },
]

export const siteDistribution = [
  { name: 'Floresta Secundária', value: 5, fill: '#80B918' },
  { name: 'Fl. Primária Degradada', value: 4, fill: '#8B4513' },
  { name: 'Sistema Agroflorestal', value: 4, fill: '#588157' },
  { name: 'Sistema Aquático', value: 3, fill: '#2D6A4F' },
]

export interface Dataset {
  id: number
  name: string
  institution: string
  type: string
  region: string
  year: number
  status: 'publicado' | 'revisao' | 'processando'
  methodology: string
  variables: string
  format: string
  doi: string
}

export const datasets: Dataset[] = [
  { id: 1, name: 'Inventário Florestal — Paragominas', institution: 'Embrapa', type: 'Inventário', region: 'Pará', year: 2024, status: 'publicado', methodology: 'Parcelas permanentes de 1ha com censo de árvores DAP ≥ 10cm', variables: 'DAP, altura, espécie, coordenadas, biomassa estimada', format: 'CSV, Shapefile', doi: '10.5281/zenodo.example001' },
  { id: 2, name: 'Monitoramento de Carbono — Amazônia Central', institution: 'INPA', type: 'Carbono', region: 'Amazonas', year: 2024, status: 'publicado', methodology: 'Medições dendrométricas semestrais com equações alométricas regionais', variables: 'Biomassa acima do solo, carbono do solo, serrapilheira', format: 'CSV, NetCDF', doi: '10.5281/zenodo.example002' },
  { id: 3, name: 'Biodiversidade de Aves — Florestas Secundárias', institution: 'UFPA', type: 'Biodiversidade', region: 'Pará', year: 2023, status: 'publicado', methodology: 'Ponto de escuta com raio fixo de 50m, 3 repetições por estação', variables: 'Espécie, abundância, guilda funcional, habitat', format: 'CSV, Darwin Core', doi: '10.5281/zenodo.example003' },
  { id: 4, name: 'Socioeconomia de SAFs — Nordeste Paraense', institution: 'UFRA', type: 'Socioeconômico', region: 'Pará', year: 2025, status: 'revisao', methodology: 'Questionários semiestruturados com 120 famílias agricultoras', variables: 'Renda, produção, segurança alimentar, mão de obra', format: 'CSV, XLSX', doi: 'pendente' },
  { id: 5, name: 'Qualidade da Água — Estuários Amazônicos', institution: 'UNIFAP', type: 'Ambiental', region: 'Amapá', year: 2024, status: 'publicado', methodology: 'Coletas mensais em 15 pontos fixos com sonda multiparâmetro', variables: 'pH, OD, turbidez, temperatura, condutividade, nutrientes', format: 'CSV', doi: '10.5281/zenodo.example005' },
  { id: 6, name: 'Regeneração Natural — Alta Floresta', institution: 'UNEMAT', type: 'Inventário', region: 'Mato Grosso', year: 2025, status: 'processando', methodology: 'Parcelas de 20x20m em cronosequência de 5-30 anos', variables: 'Riqueza, densidade, área basal, composição florística', format: 'CSV, Shapefile', doi: 'pendente' },
  { id: 7, name: 'Sensoriamento Remoto — Degradação Florestal', institution: 'INPE', type: 'Sensoriamento', region: 'Multi-regional', year: 2024, status: 'publicado', methodology: 'Classificação supervisionada com imagens Sentinel-2 e Landsat-8', variables: 'NDVI, EVI, classes de uso, grau de degradação', format: 'GeoTIFF, Shapefile', doi: '10.5281/zenodo.example007' },
  { id: 8, name: 'Saberes Tradicionais — Comunidades Ribeirinhas', institution: 'IDSM', type: 'Etnobotânico', region: 'Amazonas', year: 2023, status: 'publicado', methodology: 'Entrevistas etnobotânicas e caminhadas guiadas com 45 informantes-chave', variables: 'Espécie, uso tradicional, parte utilizada, manejo', format: 'CSV, PDF', doi: '10.5281/zenodo.example008' },
]

export const partnerInstitutions = [
  'Embrapa Amazônia Oriental',
  'UFPA — Universidade Federal do Pará',
  'UFRA — Universidade Federal Rural da Amazônia',
  'INPA — Instituto Nacional de Pesquisas da Amazônia',
  'UNEMAT — Universidade do Estado de Mato Grosso',
  'INPE — Instituto Nacional de Pesquisas Espaciais',
  'UFMT — Universidade Federal de Mato Grosso',
  'UFMA — Universidade Federal do Maranhão',
  'UFAC — Universidade Federal do Acre',
  'UNIFAP — Universidade Federal do Amapá',
  'UFRR — Universidade Federal de Roraima',
  'UFT — Universidade Federal do Tocantins',
  'UNIR — Universidade Federal de Rondônia',
  'IDSM — Instituto de Desenvolvimento Sustentável Mamirauá',
  'IPAM — Instituto de Pesquisa Ambiental da Amazônia',
  'IMAZON — Instituto do Homem e Meio Ambiente da Amazônia',
]
