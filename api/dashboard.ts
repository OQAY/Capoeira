import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const key = req.query.key as string
  if (key !== process.env.TRACKER_SECRET) {
    return res.status(404).send('Not found')
  }

  const { data: visits, count } = await supabase
    .from('visits')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(200)

  const allVisits = visits || []

  // Stats
  const ipVisits: Record<string, { count: number; city: string; lastSeen: string }> = {}
  const cities: Record<string, number> = {}
  const devices: { mobile: number; desktop: number; bot: number } = { mobile: 0, desktop: 0, bot: 0 }
  const byHour: Record<string, number> = {}
  const uniqueIPs = new Set<string>()

  allVisits.forEach((v) => {
    if (v.ip) {
      uniqueIPs.add(v.ip)
      if (!ipVisits[v.ip]) {
        ipVisits[v.ip] = { count: 0, city: v.city || '—', lastSeen: v.created_at }
      }
      ipVisits[v.ip].count++
    }
    if (v.city) cities[`${v.city}, ${v.region || v.country}`] = (cities[`${v.city}, ${v.region || v.country}`] || 0) + 1

    const ua = (v.user_agent || '').toLowerCase()
    if (ua.includes('bot') || ua.includes('screenshot') || ua.includes('crawler')) devices.bot++
    else if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) devices.mobile++
    else devices.desktop++

    const hour = new Date(v.created_at).toISOString().slice(0, 13) + ':00'
    byHour[hour] = (byHour[hour] || 0) + 1
  })

  const topIPs = Object.entries(ipVisits)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10)
  const topCities = Object.entries(cities).sort((a, b) => b[1] - a[1]).slice(0, 10)

  const flagEmoji = (code: string) => {
    return code.toUpperCase().replace(/./g, c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65))
  }

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'agora'
    if (mins < 60) return `${mins}m atrás`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h atrás`
    const days = Math.floor(hours / 24)
    return `${days}d atrás`
  }

  const deviceIcon = (ua: string) => {
    const u = ua.toLowerCase()
    if (u.includes('bot') || u.includes('screenshot')) return '🤖'
    if (u.includes('iphone') || u.includes('android') || u.includes('mobile')) return '📱'
    if (u.includes('macintosh') || u.includes('mac os')) return '💻'
    if (u.includes('windows')) return '🖥️'
    if (u.includes('linux')) return '🐧'
    return '🌐'
  }

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>🔒 Audit Log</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0a0a0a; color: #e5e5e5;
      min-height: 100vh; padding: 20px;
    }
    .header {
      text-align: center; padding: 30px 0 20px;
      border-bottom: 1px solid #222; margin-bottom: 24px;
    }
    .header h1 { font-size: 20px; color: #fff; letter-spacing: 2px; text-transform: uppercase; }
    .header p { color: #666; font-size: 12px; margin-top: 6px; }

    .stats-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px; margin-bottom: 24px;
    }
    .stat-card {
      background: #141414; border: 1px solid #222; border-radius: 12px;
      padding: 16px; text-align: center;
    }
    .stat-card .number { font-size: 28px; font-weight: 700; color: #fff; font-variant-numeric: tabular-nums; }
    .stat-card .label { font-size: 11px; color: #666; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }

    .panels { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
    @media (max-width: 640px) { .panels { grid-template-columns: 1fr; } }
    .panel {
      background: #141414; border: 1px solid #222; border-radius: 12px; padding: 16px;
    }
    .panel h3 { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
    .panel-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 6px 0; border-bottom: 1px solid #1a1a1a;
    }
    .panel-row:last-child { border-bottom: none; }
    .panel-row .name { font-size: 13px; }
    .panel-row .count {
      font-size: 12px; font-weight: 600; color: #80B918;
      background: rgba(128,185,24,0.1); padding: 2px 8px; border-radius: 20px;
    }

    .device-bar { display: flex; gap: 8px; margin-top: 8px; }
    .device-bar .segment {
      height: 6px; border-radius: 3px; transition: width 0.3s;
    }

    .table-wrap {
      background: #141414; border: 1px solid #222; border-radius: 12px;
      overflow: hidden;
    }
    .table-header {
      padding: 16px; border-bottom: 1px solid #222;
      display: flex; justify-content: space-between; align-items: center;
    }
    .table-header h3 { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th {
      text-align: left; padding: 10px 12px; font-size: 11px; color: #555;
      text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #222;
      position: sticky; top: 0; background: #141414;
    }
    td { padding: 10px 12px; border-bottom: 1px solid #1a1a1a; vertical-align: middle; }
    tr:hover td { background: #1a1a1a; }
    .ip { font-family: monospace; font-size: 12px; color: #888; }
    .location { display: flex; align-items: center; gap: 6px; }
    .flag { font-size: 16px; }
    .time { color: #555; font-size: 12px; white-space: nowrap; }
    .device-emoji { font-size: 16px; }
    .screen { color: #555; font-size: 11px; }
    .badge-bot {
      font-size: 10px; background: #333; color: #888; padding: 2px 6px;
      border-radius: 4px; margin-left: 4px;
    }
    .scroll-table { max-height: 500px; overflow-y: auto; }
    .live-dot {
      width: 8px; height: 8px; border-radius: 50%; background: #80B918;
      display: inline-block; margin-right: 6px;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    .refresh-btn {
      background: #222; color: #888; border: 1px solid #333; padding: 6px 14px;
      border-radius: 8px; font-size: 12px; cursor: pointer; transition: all 0.2s;
    }
    .refresh-btn:hover { background: #333; color: #fff; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔒 Audit Log — Capoeira</h1>
    <p>Tracker invisível • Atualizado em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
  </div>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="number">${count || 0}</div>
      <div class="label">Total Visitas</div>
    </div>
    <div class="stat-card">
      <div class="number">${uniqueIPs.size}</div>
      <div class="label">IPs Únicos</div>
    </div>
    <div class="stat-card">
      <div class="number">${devices.mobile}</div>
      <div class="label">📱 Mobile</div>
    </div>
    <div class="stat-card">
      <div class="number">${devices.desktop}</div>
      <div class="label">💻 Desktop</div>
    </div>
    <div class="stat-card">
      <div class="number">${devices.bot}</div>
      <div class="label">🤖 Bots</div>
    </div>
    <div class="stat-card">
      <div class="number">${topIPs.filter(([, info]) => info.count > 1).length}</div>
      <div class="label">🔁 Recorrentes</div>
    </div>
  </div>

  <div class="panels">
    <div class="panel">
      <h3>👤 Top Visitantes</h3>
      ${topIPs.map(([ip, info]) => `
        <div class="panel-row">
          <span class="name" style="font-size:12px"><code style="color:#80B918">${ip}</code> <span style="color:#555;font-size:11px">${info.city}</span></span>
          <span class="count">${info.count}x</span>
        </div>
      `).join('')}
    </div>
    <div class="panel">
      <h3>📍 Top Cidades</h3>
      ${topCities.map(([c, n]) => `
        <div class="panel-row">
          <span class="name">${c}</span>
          <span class="count">${n}</span>
        </div>
      `).join('')}
    </div>
  </div>

  <div class="table-wrap">
    <div class="table-header">
      <h3><span class="live-dot"></span> Últimas ${allVisits.length} visitas</h3>
      <button class="refresh-btn" onclick="location.reload()">↻ Atualizar</button>
    </div>
    <div class="scroll-table">
      <table>
        <thead>
          <tr>
            <th>Quando</th>
            <th>Data/Hora</th>
            <th>Device</th>
            <th>Localização</th>
            <th>IP</th>
            <th>Tela</th>
            <th>Página</th>
          </tr>
        </thead>
        <tbody>
          ${allVisits.map(v => {
            const ua = (v.user_agent || '').toLowerCase()
            const isBot = ua.includes('bot') || ua.includes('screenshot') || ua.includes('crawler')
            return `
            <tr${isBot ? ' style="opacity:0.4"' : ''}>
              <td class="time">${timeAgo(v.created_at)}</td>
              <td class="time">${new Date(v.created_at).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
              <td><span class="device-emoji">${deviceIcon(v.user_agent || '')}</span>${isBot ? '<span class="badge-bot">BOT</span>' : ''}</td>
              <td class="location">
                ${v.country ? `<span class="flag">${flagEmoji(v.country)}</span>` : ''}
                <span>${v.city || '—'}${v.region ? `, ${v.region}` : ''}</span>
              </td>
              <td class="ip">${v.ip || '—'}</td>
              <td class="screen">${v.screen_width && v.screen_height ? `${v.screen_width}×${v.screen_height}` : '—'}</td>
              <td>${v.path || '/'}</td>
            </tr>`
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <div style="text-align:center;padding:20px;color:#333;font-size:11px;">
    Dados armazenados no Supabase • Nenhum cookie utilizado • Invisível ao visitante
  </div>
</body>
</html>`

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')
  return res.status(200).send(html)
}
