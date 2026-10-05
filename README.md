# Ev Alışveriş Listesi — PWA

Üç kişinin ortak kullanabileceği, mobil öncelikli alışveriş listesi. React + Vite + Supabase + PWA.

## 1. Supabase
1. Supabase'te yeni proje oluştur.
2. SQL Editor'a `supabase.sql` dosyasının tamamını yapıştırıp çalıştır.
3. Project Settings → API bölümünden Project URL ve anon/public key'i al.

## 2. Local / Vercel
`.env.example` dosyasını `.env` olarak kopyala:

```env
VITE_SUPABASE_URL=https://....supabase.co
VITE_SUPABASE_ANON_KEY=....
```

```bash
npm install
npm run dev
```

Vercel'e bağlarken aynı iki environment variable'ı ekle ve Build Command `npm run build`, Output Directory `dist` kullan.

## 3. Üç kişilik kullanım
- İlk kişi hesap oluşturur → "Yeni ev oluştur".
- Ekrandaki 6 haneli ev kodunu diğer iki kişiye gönderir.
- Diğer kişiler hesap oluşturup aynı kod ile "Mevcut eve katıl" der.
- Liste Supabase Realtime ile ortaklaşa güncellenir.

## 4. iPhone
Deploy edilen HTTPS adresini Safari'de aç → Paylaş → Ana Ekrana Ekle.

iPhone Kısayollar:
- Kısayollar → + → Eylem ekle → "URL'yi Aç"
- Uygulamanın adresini gir ve adı "Alışveriş Listesi" olsun.
- PWA manifestinde ayrıca "Ürün ekle" kısayolu tanımlıdır; destekleyen cihazlarda uygulama simgesine uzun basınca görünür.

## Not
Bu sürümde kullanıcı hesabı + ev kodu ile güvenli ortak liste modeli kullanılır. Supabase/Vercel hesaplarına erişim olmadan dışarıdaki hesaplarda gerçek deploy işlemi yapılamaz; proje deploy'a hazırdır.
