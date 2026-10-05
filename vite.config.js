import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [react(), VitePWA({registerType:'autoUpdate', includeAssets:['apple-touch-icon.png'], manifest:{name:'Ev Alışveriş Listesi',short_name:'Ev Listesi',description:'Üç kişilik ortak ev alışveriş listesi',theme_color:'#f7f7f2',background_color:'#f7f7f2',display:'standalone',start_url:'/',scope:'/',icons:[{src:'/icons/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/icons/icon-512.png',sizes:'512x512',type:'image/png'}],shortcuts:[{name:'Alışveriş listesine ekle',short_name:'Ürün ekle',url:'/?add=1',icons:[{src:'/icons/icon-192.png',sizes:'192x192'}]}]}})]
})
