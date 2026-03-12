import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    // Return 1x1 transparent pixel for GET (fallback)
    res.setHeader('Content-Type', 'image/gif')
    res.setHeader('Cache-Control', 'no-store, no-cache')
    return res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'))
  }

  try {
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      'unknown'

    // Vercel provides geo headers automatically
    const city = req.headers['x-vercel-ip-city'] as string || null
    const country = req.headers['x-vercel-ip-country'] as string || null
    const region = req.headers['x-vercel-ip-country-region'] as string || null
    const latitude = req.headers['x-vercel-ip-latitude'] as string || null
    const longitude = req.headers['x-vercel-ip-longitude'] as string || null

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}

    await supabase.from('visits').insert({
      ip,
      city: city ? decodeURIComponent(city) : null,
      region,
      country,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      path: body.path || '/',
      referrer: body.referrer || null,
      user_agent: req.headers['user-agent'] || null,
      screen_width: body.sw || null,
      screen_height: body.sh || null,
      language: body.lang || null,
    })

    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(204).end()
  } catch {
    return res.status(204).end()
  }
}
