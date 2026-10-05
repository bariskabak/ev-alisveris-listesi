# Ev Alışveriş Listesi — Final PWA

Mobile-first ortak alışveriş listesi. React + Vite + Supabase + lucide-react + PWA.

## Final güncelleme
- iOS uygulama hissi ve safe-area desteği
- Mobil / tablet / desktop responsive düzen
- Daha temiz kart, bottom tab bar ve bottom sheet UI
- Lucide ikonlarıyla native-app hissi
- Hızlı ürün eklemede optimistic UI: ürün Supabase cevabını beklemeden listede görünür
- Ürün işaretlenince anında "sepete eklendi" görünümü
- Hata olursa optimistic işlem geri alınır
- Arama, kategori filtreleri, sepet filtresi
- PWA shortcut: `/?add=1`

## Vercel
Framework: Vite
Build: `npm run build`
Output: `dist`

Environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Supabase SQL mevcut `supabase.sql` dosyasındadır. Çalışan veritabanına yeniden uygulama gerekmez; yalnızca veritabanı şeması değiştirilecekse SQL'i ayrıca çalıştırın.
