const SOURCES = {
  'Migros': q => `https://www.migros.com.tr/arama?q=${encodeURIComponent(q)}`,
  'CarrefourSA': q => `https://www.carrefoursa.com/search/?q=${encodeURIComponent(q)}`,
  'ŞOK': q => `https://www.sokmarket.com.tr/arama?q=${encodeURIComponent(q)}`,
  'A101': q => `https://www.a101.com.tr/arama/?search=${encodeURIComponent(q)}`,
  'FİLE': q => `https://www.file.com.tr/arama?search=${encodeURIComponent(q)}`
}

function clean(value = '') {
  return value.replace(/\\s+/g, ' ').replace(/[<>]/g, '').trim()
}

function parsePrice(value) {
  if (!value) return null
  const m = String(value).replace(/\\s/g, '').match(/(\\d{1,5}(?:[.,]\\d{1,2})?)\\s*(?:₺|TL)/i)
  if (!m) return null
  const n = Number(m[1].replace(/\\./g, '').replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

function extractProducts(html, market) {
  const out = []
  const seen = new Set()
  const push = (name, price, url) => {
    name = clean(name)
    if (!name || name.length < 3 || seen.has(name.toLocaleLowerCase('tr-TR'))) return
    seen.add(name.toLocaleLowerCase('tr-TR'))
    out.push({ market, name, price: parsePrice(price), url })
  }

  // JSON-LD is the least fragile way to read product cards from server-rendered pages.
  const scripts = html.match(/<script[^>]*type=["']application\\/ld\\+json["'][^>]*>[\\s\\S]*?<\\/script>/gi) || []
  for (const block of scripts) {
    const raw = block.replace(/^[\\s\\S]*?>/, '').replace(/<\\/script>$/i, '')
    try {
      const data = JSON.parse(raw)
      const nodes = Array.isArray(data) ? data : [data]
      for (const node of nodes) {
        const products = node?.itemListElement || node
        if (!Array.isArray(products)) continue
        for (const item of products) {
          const p = item?.item || item
          if (p?.name) push(p.name, p?.offers?.price || p?.offers?.lowPrice, p?.url)
        }
      }
    } catch (_) {}
  }

  // Fallback: product name + nearby TL/₺ text from HTML.
  if (out.length < 3) {
    const text = html.replace(/<script[\\s\\S]*?<\\/script>/gi, ' ').replace(/<style[\\s\\S]*?<\\/style>/gi, ' ')
    const chunks = text.split(/<[^>]+>/g).map(clean).filter(Boolean)
    for (let i = 0; i < chunks.length; i++) {
      if (!/(₺|TL)/i.test(chunks[i])) continue
      const price = parsePrice(chunks[i])
      if (price == null) continue
      const name = chunks.slice(Math.max(0, i - 3), i).reverse().find(x => x.length >= 5 && !/(₺|TL)/i.test(x))
      if (name) push(name, chunks[i], null)
      if (out.length >= 12) break
    }
  }
  return out.slice(0, 12)
}

export default async function handler(req, res) {
  const q = clean(req.query?.q || '')
  const selected = clean(req.query?.market || 'Hepsi')
  if (q.length < 2) return res.status(400).json({ error: 'En az 2 karakter yazın.' })

  const markets = selected === 'Hepsi' ? Object.keys(SOURCES) : [selected].filter(m => SOURCES[m])
  const results = []
  const errors = []

  await Promise.all(markets.map(async market => {
    try {
      const response = await fetch(SOURCES[market](q), {
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; EvListesi/1.0; +https://github.com/bariskabak/ev-alisveris-listesi)',
          'accept-language': 'tr-TR,tr;q=0.9,en;q=0.8'
        },
        signal: AbortSignal.timeout(7000)
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const html = await response.text()
      results.push(...extractProducts(html, market))
    } catch (error) {
      errors.push({ market, message: error.message })
    }
  }))

  results.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  return res.status(200).json({ q, selected, results, errors, fetchedAt: new Date().toISOString() })
}
