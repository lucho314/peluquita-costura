import type { APIRoute } from 'astro'
import { getSupabase } from '../lib/supabase'

const staticPages = ['/', '/productos', '/contacto']
const today = new Date().toISOString().split('T')[0]

const sitemapMeta: Record<string, { changefreq: string; priority: string }> = {
  '/': { changefreq: 'weekly', priority: '1.0' },
  '/productos': { changefreq: 'daily', priority: '0.9' },
  '/contacto': { changefreq: 'monthly', priority: '0.6' }
}

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ?? new URL('https://peluquita-costura.luciano-zapata314.workers.dev')
  const { data: productos } = await getSupabase()
    .from('productos')
    .select('id')
    .gt('stock', 0)

  const urls = [
    ...staticPages,
    ...(productos ?? []).map((producto) => `/productos/${producto.id}`)
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((path) => {
    const loc = new URL(path, baseUrl).toString()
    const meta = sitemapMeta[path] ?? { changefreq: 'weekly', priority: '0.7' }

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`
  })
  .join('\n')}
</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  })
}
