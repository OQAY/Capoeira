import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Secret key protection — only you can access
  const key = req.query.key as string
  if (key !== process.env.TRACKER_SECRET) {
    return res.status(404).json({ error: 'Not found' })
  }

  const limit = parseInt(req.query.limit as string) || 100
  const offset = parseInt(req.query.offset as string) || 0

  const { data, count, error } = await supabase
    .from('visits')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  // Stats summary
  const { data: statsData } = await supabase
    .from('visits')
    .select('country, city')

  const countries: Record<string, number> = {}
  const cities: Record<string, number> = {}
  statsData?.forEach((v) => {
    if (v.country) countries[v.country] = (countries[v.country] || 0) + 1
    if (v.city) cities[v.city] = (cities[v.city] || 0) + 1
  })

  res.setHeader('Cache-Control', 'no-store')
  return res.status(200).json({
    total: count,
    showing: data?.length,
    offset,
    stats: {
      top_countries: Object.entries(countries).sort((a, b) => b[1] - a[1]).slice(0, 10),
      top_cities: Object.entries(cities).sort((a, b) => b[1] - a[1]).slice(0, 10),
    },
    visits: data,
  })
}
