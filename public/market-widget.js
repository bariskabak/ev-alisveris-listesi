(() => {
  const markets = {
    'FİLE': 'https://www.file.com.tr/icerik/8/file-online-satis',
    'Migros': 'https://www.migros.com.tr/',
    'CarrefourSA': 'https://www.carrefoursa.com/',
    'ŞOK': 'https://www.sokmarket.com.tr/',
    'A101': 'https://www.a101.com.tr/market'
  }
  const fallback = [
    ['🥛','Tam yağlı süt 1 L',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🥛','Yarım yağlı süt 1 L',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🥚',"Yumurta 15'li",['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🥣','Yoğurt 1,5 kg',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🧀','Kaşar peyniri',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🧈','Tereyağı 250 g',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🍞','Ekmek',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🍚','Baldo pirinç 1 kg',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🍝','Makarna 500 g',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🫗','Ayçiçek yağı 1 L',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🫗','Zeytinyağı 1 L',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🥫','Salça',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['☕','Filtre kahve',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🍵','Çay 1 kg',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['💧','Su 1,5 L',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🍌','Muz kg',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🍅','Domates kg',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🥔','Patates kg',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🧅','Soğan kg',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🍋','Limon kg',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🧻','Tuvalet kağıdı',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🧻','Kağıt havlu',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🧴','Bulaşık deterjanı',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🧺','Çamaşır deterjanı',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🍼','Bebek bezi',['FİLE','Migros','CarrefourSA','ŞOK','A101']],
    ['🧻','Islak mendil',['FİLE','Migros','CarrefourSA','ŞOK','A101']]
  ]

  const style = document.createElement('style')
  style.textContent = `
    #market-fab{position:fixed;right:16px;bottom:calc(84px + env(safe-area-inset-bottom));z-index:25;background:#142e20;color:#fff;border:0;border-radius:16px;padding:12px 15px;display:none;align-items:center;gap:7px;font:800 12px -apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif;box-shadow:0 10px 28px rgba(0,0,0,.2)}
    #market-fab:active{transform:scale(.96)}
    #market-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:50;display:none;align-items:flex-end;justify-content:center}
    #market-sheet{width:min(100%,760px);max-height:94dvh;overflow:auto;background:#f6f6f2;border-radius:28px 28px 0 0;padding:10px 18px calc(22px + env(safe-area-inset-bottom));box-shadow:0 -20px 60px rgba(0,0,0,.25);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif;color:#142e20}
    .mw-grab{width:38px;height:4px;border-radius:99px;background:#d0cfc7;margin:2px auto 16px}.mw-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.mw-head h2{font-size:22px;letter-spacing:-.04em;margin:3px 0}.mw-head p{margin:0;color:#8d8c84;font-size:10px}.mw-close{width:36px;height:36px;border:0;border-radius:50%;background:#e9e9e2;font-size:20px}.mw-search{margin:14px 0 9px;background:#fff;border:1px solid #e5e5ea;border-radius:15px;height:50px;padding:0 14px;display:flex;align-items:center}.mw-search input{border:0;outline:0;background:transparent;width:100%;font-size:14px}.mw-market-row{display:flex;gap:6px;overflow:auto;padding-bottom:5px}.mw-market{border:1px solid #e1e1da;background:#fff;border-radius:999px;padding:8px 11px;font-size:10px;font-weight:850;white-space:nowrap}.mw-market.active{background:#142e20;color:#fff;border-color:#142e20}.mw-live{display:flex;gap:7px;margin:5px 0 9px}.mw-live button{border:0;border-radius:12px;padding:9px 11px;background:#007aff;color:#fff;font-size:10px;font-weight:850}.mw-live button:disabled{opacity:.55}.mw-note{font-size:9px;color:#96958d;margin:7px 2px 12px;line-height:1.45}.mw-grid{display:grid;gap:8px}.mw-card{background:#fff;border:1px solid #e5e5ea;border-radius:17px;padding:11px;display:flex;align-items:center;gap:10px}.mw-icon{font-size:25px;width:35px;text-align:center}.mw-info{flex:1;min-width:0}.mw-info b{display:block;font-size:12px}.mw-info small{display:block;color:#999890;font-size:9px;margin-top:3px}.mw-price{font-size:13px;font-weight:900;margin-top:4px}.mw-price.best{color:#0a8f43}.mw-add{border:0;background:#007aff;color:#fff;border-radius:11px;padding:9px 10px;font-size:10px;font-weight:850;white-space:nowrap}.mw-store{display:inline-block;border:1px solid #e7e7e0;background:#f7f7f2;border-radius:7px;padding:3px 5px;font-size:8px;color:#6e6d66;margin:3px 3px 0 0}.mw-open{display:inline-block;margin-top:5px;color:#007aff;font-size:8px;text-decoration:none}.mw-empty{text-align:center;padding:35px 10px;color:#92918a;font-size:11px}
  `
  document.head.appendChild(style)

  const fab = document.createElement('button')
  fab.id = 'market-fab'
  fab.innerHTML = '🛒 <span>Marketler</span>'
  document.body.appendChild(fab)

  const overlay = document.createElement('div')
  overlay.id = 'market-overlay'
  overlay.innerHTML = `<div id="market-sheet"><div class="mw-grab"></div><div class="mw-head"><div><div style="font-size:9px;letter-spacing:.14em;font-weight:850;color:#9a9a92">AİLE İÇİN</div><h2>Market ürünleri</h2><p>Ortak ürünü tek kartta bul, istersen canlı fiyatı dene.</p></div><button class="mw-close" aria-label="Kapat">×</button></div><div class="mw-search"><span style="margin-right:8px">🔎</span><input id="mw-input" placeholder="Süt, yumurta, deterjan…" /></div><div class="mw-market-row" id="mw-markets"></div><div class="mw-live"><button id="mw-live-btn">⚡ Canlı fiyatları ara</button></div><div class="mw-note" id="mw-note">Canlı arama resmi market sayfalarını sunucu üzerinden kontrol eder. Marketin site yapısı değişirse sonuç yerine resmi market bağlantısı gösterilir.</div><div class="mw-grid" id="mw-grid"></div></div>`
  document.body.appendChild(overlay)

  const input = overlay.querySelector('#mw-input')
  const grid = overlay.querySelector('#mw-grid')
  const marketRow = overlay.querySelector('#mw-markets')
  const liveBtn = overlay.querySelector('#mw-live-btn')
  const note = overlay.querySelector('#mw-note')
  let selected = 'Hepsi'
  let liveResults = []

  const iconFor = name => {
    const n = name.toLocaleLowerCase('tr-TR')
    if (n.includes('süt')) return '🥛'; if (n.includes('yumurta')) return '🥚'; if (n.includes('yoğurt')) return '🥣';
    if (n.includes('peynir')) return '🧀'; if (n.includes('pirinç')) return '🍚'; if (n.includes('makarna')) return '🍝';
    if (n.includes('su')) return '💧'; if (n.includes('kahve')) return '☕'; if (n.includes('çay')) return '🍵';
    if (n.includes('domates')) return '🍅'; if (n.includes('patates')) return '🥔'; if (n.includes('soğan')) return '🧅';
    if (n.includes('deterjan')) return '🧴'; if (n.includes('bez')) return '🍼'; return '🛒'
  }

  const addToList = name => {
    const target = document.querySelector('.quick-add-form input')
    if (!target) { alert('Liste ekranında hızlı ekleme alanı bulunamadı.'); return }
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
    setter.call(target, name)
    target.dispatchEvent(new Event('input', { bubbles:true }))
    target.closest('form')?.requestSubmit()
    overlay.style.display='none'
  }

  const renderMarkets = () => {
    marketRow.innerHTML = ['Hepsi', ...Object.keys(markets)].map(m => `<button class="mw-market ${selected===m?'active':''}" data-market="${m}">${m}</button>`).join('')
    marketRow.querySelectorAll('.mw-market').forEach(b => b.onclick = () => { selected=b.dataset.market; liveResults=[]; renderMarkets(); render() })
  }

  const render = () => {
    const q = input.value.trim().toLocaleLowerCase('tr-TR')
    if (liveResults.length) {
      const filtered = liveResults.filter(p => selected === 'Hepsi' || p.market === selected)
      const prices = filtered.map(p => p.price).filter(Number.isFinite)
      const best = prices.length ? Math.min(...prices) : null
      grid.innerHTML = filtered.length ? filtered.map((p,i) => `<div class="mw-card"><div class="mw-icon">${iconFor(p.name)}</div><div class="mw-info"><b>${p.name}</b><small>${p.market}</small>${Number.isFinite(p.price) ? `<div class="mw-price ${p.price===best?'best':''}">${p.price.toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2})} ₺ ${p.price===best?'· EN UCUZ':''}</div>` : ''}${p.url ? `<a class="mw-open" href="${p.url}" target="_blank" rel="noopener">Ürünü aç ↗</a>` : ''}</div><button class="mw-add" data-live-add="${i}">+ Listeye</button></div>`).join('') : '<div class="mw-empty">Canlı sonuç bulunamadı. Genel ürün adını deneyebilir veya resmi marketi açabilirsin.</div>'
      grid.querySelectorAll('[data-live-add]').forEach(b => b.onclick = () => addToList(filtered[Number(b.dataset.liveAdd)].name))
      return
    }
    const list = fallback.filter(p => (!q || p[1].toLocaleLowerCase('tr-TR').includes(q)) && (selected==='Hepsi' || p[2].includes(selected)))
    grid.innerHTML = list.length ? list.map((p,i) => `<div class="mw-card"><div class="mw-icon">${p[0]}</div><div class="mw-info"><b>${p[1]}</b><div>${p[2].map(m=>`<span class="mw-store">${m}</span>`).join('')}</div></div><button class="mw-add" data-add="${i}">+ Listeye</button></div>`).join('') : '<div class="mw-empty">Bu ürünü hızlı katalogda bulamadım. Canlı fiyat aramasını deneyebilirsin.</div>'
    grid.querySelectorAll('[data-add]').forEach(b => b.onclick = () => addToList(list[Number(b.dataset.add)][1]))
  }

  async function liveSearch() {
    const q = input.value.trim()
    if (q.length < 2) { note.textContent='Önce en az 2 karakterlik bir ürün adı yaz.'; return }
    liveBtn.disabled = true; liveBtn.textContent = '⏳ Marketler kontrol ediliyor…'; liveResults=[]
    try {
      const response = await fetch(`/api/market-search?q=${encodeURIComponent(q)}&market=${encodeURIComponent(selected)}`)
      const data = await response.json()
      liveResults = data.results || []
      note.textContent = liveResults.length ? `Canlı sonuç: ${liveResults.length} ürün · ${new Date(data.fetchedAt).toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'})}` : 'Canlı sonuç alınamadı; resmi market bağlantıları yine kullanılabilir.'
    } catch (_) {
      note.textContent = 'Canlı arama şu an yanıt vermedi. Hızlı katalog kullanılabilir.'
    } finally {
      liveBtn.disabled = false; liveBtn.textContent = '⚡ Canlı fiyatları ara'; render()
    }
  }

  input.addEventListener('input', () => { liveResults=[]; render() })
  liveBtn.onclick = liveSearch
  overlay.querySelector('.mw-close').onclick = () => overlay.style.display='none'
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.style.display='none' })
  fab.onclick = () => { overlay.style.display='flex'; input.focus(); renderMarkets(); render() }

  const syncVisibility = () => { fab.style.display = document.querySelector('.quick-add-form') ? 'flex' : 'none' }
  new MutationObserver(syncVisibility).observe(document.body, {childList:true,subtree:true})
  setTimeout(syncVisibility, 800)
})()
