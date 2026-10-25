export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { action, email, accessToken, password } = req.body || {}
    const supabaseUrl = process.env.VITE_SUPABASE_URL
    const anonKey = process.env.VITE_SUPABASE_ANON_KEY

    if (!supabaseUrl || !anonKey) {
      return res.status(500).json({ error: 'Supabase ortam değişkenleri bulunamadı.' })
    }

    if (action === 'request') {
      if (!email?.trim()) return res.status(400).json({ error: 'E-posta adresini gir.' })
      const response = await fetch(`${supabaseUrl}/auth/v1/recover`, {
        method: 'POST',
        headers: { apikey: anonKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          redirect_to: `${new URL(req.url, `https://${req.headers.host}`).origin}/reset-password.html`
        })
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        return res.status(response.status).json({ error: data.msg || data.message || 'Şifre sıfırlama e-postası gönderilemedi.' })
      }
      return res.status(200).json({ ok: true })
    }

    if (action === 'update') {
      if (!accessToken) return res.status(400).json({ error: 'Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.' })
      if (!password || password.length < 6) return res.status(400).json({ error: 'Yeni şifre en az 6 karakter olmalı.' })

      const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
        method: 'PUT',
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        return res.status(response.status).json({ error: data.msg || data.message || 'Şifre güncellenemedi.' })
      }
      return res.status(200).json({ ok: true })
    }

    return res.status(400).json({ error: 'Geçersiz işlem.' })
  } catch (error) {
    return res.status(500).json({ error: 'Beklenmeyen bir hata oluştu.' })
  }
}
