import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createClient } from '@supabase/supabase-js'
import {
  Plus, Check, Trash2, ShoppingBasket, Users, Copy, ChevronRight, X,
  Search, House, LogOut, Minus, SlidersHorizontal, Sparkles, CircleCheck,
  PackagePlus, Utensils, Milk, Carrot, Beef, Wheat, SprayCan, Baby,
  Droplets, Home as HomeIcon, RotateCcw, Share2
} from 'lucide-react'
import './style.css'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

const vibrate = (pattern = 50) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(pattern) } catch(e) {}
  }
}

const presets = [
  // Meyve & Sebze
  ['🍎','Elma','Meyve & Sebze'], ['🍌','Muz','Meyve & Sebze'], ['🍊','Portakal','Meyve & Sebze'],
  ['🍓','Çilek','Meyve & Sebze'], ['🍅','Domates','Meyve & Sebze'], ['🥒','Salatalık','Meyve & Sebze'],
  ['🥬','Marul','Meyve & Sebze'], ['🥕','Havuç','Meyve & Sebze'], ['🥔','Patates','Meyve & Sebze'],
  ['🧅','Soğan','Meyve & Sebze'], ['🧄','Sarımsak','Meyve & Sebze'], ['🫑','Biber','Meyve & Sebze'],
  ['🍋','Limon','Meyve & Sebze'], ['🍉','Karpuz','Meyve & Sebze'], ['🥦','Brokoli','Meyve & Sebze'],

  // Ekmek & Fırın
  ['🍞','Ekmek','Ekmek & Fırın'], ['🥖','Baget ekmek','Ekmek & Fırın'], ['🥪','Tost ekmeği','Ekmek & Fırın'],
  ['🫓','Lavaş','Ekmek & Fırın'], ['🥐','Poğaça','Ekmek & Fırın'], ['🥯','Simit','Ekmek & Fırın'],

  // Süt & Kahvaltı
  ['🥚','Yumurta','Süt & Kahvaltı'], ['🥛','Süt','Süt & Kahvaltı'], ['🥤','Kefir','Süt & Kahvaltı'],
  ['🧀','Peynir','Süt & Kahvaltı'], ['🧈','Tereyağı','Süt & Kahvaltı'], ['🥣','Yoğurt','Süt & Kahvaltı'],
  ['🫒','Zeytin','Süt & Kahvaltı'], ['🍯','Bal','Süt & Kahvaltı'],

  // İçecek
  ['💧','Su','İçecek'], ['🫧','Maden suyu','İçecek'], ['🧃','Meyve suyu','İçecek'],
  ['🥤','Gazlı içecek','İçecek'], ['☕','Kahve','İçecek'], ['🍵','Çay','İçecek'],

  // Bebek
  ['👶','Bebek bezi','Bebek'], ['🧻','Islak mendil','Bebek'], ['🧴','Pişik kremi','Bebek'],
  ['🍼','Bebek maması','Bebek'], ['🍼','Biberon','Bebek'], ['🧴','Bebek şampuanı','Bebek'],

  // Et & Şarküteri
  ['🍗','Tavuk','Et & Şarküteri'], ['🥩','Kırmızı et','Et & Şarküteri'], ['🐟','Balık','Et & Şarküteri'],
  ['🥓','Sucuk','Et & Şarküteri'], ['🥪','Salam','Et & Şarküteri'],

  // Kiler
  ['🍚','Pirinç','Kiler'], ['🍝','Makarna','Kiler'], ['🫘','Bakliyat','Kiler'],
  ['🧂','Tuz','Kiler'], ['🍬','Şeker','Kiler'], ['🫗','Zeytinyağı','Kiler'],
  ['🥫','Konserve','Kiler'], ['🍅','Salça','Kiler'],

  // Atıştırmalık
  ['🍪','Bisküvi','Atıştırmalık'], ['🍫','Çikolata','Atıştırmalık'], ['🥨','Kraker','Atıştırmalık'],
  ['🍿','Patlamış mısır','Atıştırmalık'], ['🥜','Kuruyemiş','Atıştırmalık'],

  // Ev & Temizlik
  ['🧻','Tuvalet kağıdı','Ev & Temizlik'], ['🧻','Kağıt havlu','Ev & Temizlik'], ['🧴','Bulaşık deterjanı','Ev & Temizlik'],
  ['🧺','Çamaşır deterjanı','Ev & Temizlik'], ['🧽','Sünger','Ev & Temizlik'], ['🧹','Çöp poşeti','Ev & Temizlik'],
  ['🧼','Sabun','Ev & Temizlik'],

  // Kişisel Bakım
  ['🪥','Diş macunu','Kişisel Bakım'], ['🪥','Diş fırçası','Kişisel Bakım'], ['🧴','Şampuan','Kişisel Bakım'],
  ['🧴','Deodorant','Kişisel Bakım'], ['🧻','Peçete','Kişisel Bakım'],

  // Evcil Hayvan
  ['🐱','Kedi maması','Evcil Hayvan'], ['🐶','Köpek maması','Evcil Hayvan'], ['🧹','Kedi kumu','Evcil Hayvan']
]
const cats = ['Hepsi','Meyve & Sebze','Ekmek & Fırın','Süt & Kahvaltı','İçecek','Bebek','Et & Şarküteri','Kiler','Atıştırmalık','Ev & Temizlik','Kişisel Bakım','Evcil Hayvan','Diğer']

const catIcons = {
  'Hepsi': ShoppingBasket,
  'Meyve & Sebze': Carrot, 'Ekmek & Fırın': Wheat, 'Süt & Kahvaltı': Milk,
  İçecek: Droplets, Bebek: Baby, 'Et & Şarküteri': Beef, Kiler: Wheat,
  Atıştırmalık: Utensils, 'Ev & Temizlik': SprayCan, 'Kişisel Bakım': Droplets,
  'Evcil Hayvan': HomeIcon, Diğer: ShoppingBasket
}

const smartCategory = (name) => {
  const n = name.toLocaleLowerCase('tr-TR')
  const rules = [
    ['Meyve & Sebze',['elma','muz','portakal','mandalina','çilek','domates','salatalık','marul','havuç','patates','soğan','sarımsak','biber','limon','karpuz','brokoli','meyve','sebze']],
    ['Ekmek & Fırın',['ekmek','baget','tost ekmeği','lavaş','poğaça','simit','kruvasan','yufka']],
    ['Süt & Kahvaltı',['yumurta','süt','kefir','peynir','tereyağı','yoğurt','zeytin','bal','reçel']],
    ['İçecek',['su','maden suyu','soda','meyve suyu','kahve','çay','kola','içecek']],
    ['Bebek',['bez','bebek','mama','ıslak mendil','pişik','biberon']],
    ['Et & Şarküteri',['tavuk','et','kıyma','balık','sucuk','salam','sosis','pastırma']],
    ['Kiler',['pirinç','makarna','bakliyat','mercimek','nohut','fasulye','tuz','şeker','salça','konserve','yağ']],
    ['Atıştırmalık',['bisküvi','çikolata','kraker','cips','kuruyemiş','mısır']],
    ['Ev & Temizlik',['deterjan','çamaşır','bulaşık','sünger','çöp poşeti','tuvalet kağıdı','kağıt havlu','sabun','temizlik']],
    ['Kişisel Bakım',['diş macunu','diş fırçası','şampuan','deodorant','kolonya','tıraş']],
    ['Evcil Hayvan',['kedi','köpek','mama','kedi kumu']]
  ]
  for (const [category, words] of rules) if (words.some(w => n.includes(w))) return category
  return 'Diğer'
}

function App() {
  const [session, setSession] = useState(null)
  const [items, setItems] = useState([])
  const [house, setHouse] = useState(null)
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Hepsi')
  const [showBought, setShowBought] = useState(false)
  const [search, setSearch] = useState('')
  const [view, setView] = useState('list')
  const [newItem, setNewItem] = useState('')
  const [qty, setQty] = useState('1')
  const [cat, setCat] = useState('Diğer')
  const [icon, setIcon] = useState('🛒')
  const [addOpen, setAddOpen] = useState(false)
  const [name, setName] = useState(localStorage.getItem('ev_name') || '')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMode, setAuthMode] = useState('login')
  const [msg, setMsg] = useState('')
  const [code, setCode] = useState('')
  const [toast, setToast] = useState('')
  const [busy, setBusy] = useState(false)
  const channelRef = useRef(null)

  const notify = (text) => {
    setToast(text)
    window.clearTimeout(window.__toast)
    window.__toast = window.setTimeout(() => setToast(''), 2200)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, currentSession) => setSession(currentSession))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) loadHouse()
    else setLoading(false)
  }, [session])

  useEffect(() => {
    if (new URLSearchParams(location.search).get('add') === '1') setAddOpen(true)
  }, [])

  useEffect(() => () => {
    if (channelRef.current) supabase.removeChannel(channelRef.current)
  }, [])

  async function loadHouse() {
    setLoading(true)
    const { data: member } = await supabase.from('household_members').select('household_id,name').eq('user_id', session.user.id).limit(1).maybeSingle()
    if (!member) { setHouse(null); setLoading(false); return }
    const { data: h } = await supabase.from('households').select('*').eq('id', member.household_id).single()
    setHouse(h)
    const { data: ms } = await supabase.from('household_members').select('*').eq('household_id', member.household_id).order('created_at')
    setMembers(ms || [])
    await loadItems(member.household_id)
    subscribe(member.household_id)
    setLoading(false)
  }

  async function loadItems(hid) {
    const { data } = await supabase.from('shopping_items').select('*').eq('household_id', hid).order('is_bought').order('created_at', { ascending: false })
    if (data) setItems(data)
  }

  function subscribe(hid) {
    if (channelRef.current) supabase.removeChannel(channelRef.current)
    channelRef.current = supabase.channel(`shopping-${hid}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shopping_items', filter: `household_id=eq.${hid}` }, () => loadItems(hid))
      .subscribe()
  }

  async function addItem(preset, directName = null) {
    const productName = directName || preset?.[1] || newItem.trim()
    if (!productName || !house || busy) return
    vibrate(40)
    const finalCategory = preset?.[2] || (cat === 'Diğer' ? smartCategory(productName) : cat)
    const optimisticId = `temp-${Date.now()}-${Math.random()}`
    const optimistic = {
      id: optimisticId, household_id: house.id, name: productName,
      quantity: preset?.[3] || qty, icon: preset?.[0] || icon,
      category: finalCategory, added_by: session.user.id, is_bought: false,
      created_at: new Date().toISOString(), optimistic: true
    }
    // Ürün, Supabase cevabını beklemeden ekranda görünür.
    setItems(prev => [optimistic, ...prev])
    setNewItem(''); setQty('1');
    setBusy(true)
    const { data, error } = await supabase.from('shopping_items').insert({
      household_id: house.id, name: productName, quantity: preset?.[3] || qty,
      icon: preset?.[0] || icon, category: finalCategory, added_by: session.user.id
    }).select().single()
    setBusy(false)
    if (error) {
      setItems(prev => prev.filter(i => i.id !== optimisticId))
      notify(error.message)
      return
    }
    setItems(prev => [data, ...prev.filter(i => i.id !== optimisticId && i.id !== data.id)])
    notify(`${productName} listeye eklendi`)
  }

  async function toggle(item) {
    const nextBought = !item.is_bought
    vibrate(nextBought ? [30, 50, 30] : 30)
    // Dokununca anında görsel olarak sepet/alındı durumuna geç.
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_bought: nextBought, bought_at: nextBought ? new Date().toISOString() : null } : i))
    const { error } = await supabase.from('shopping_items').update({ is_bought: nextBought, bought_at: nextBought ? new Date().toISOString() : null }).eq('id', item.id)
    if (error) {
      setItems(prev => prev.map(i => i.id === item.id ? item : i))
      notify(error.message)
      return
    }
    notify(nextBought ? 'Sepete eklendi ✓' : 'Listeye geri alındı')
  }

  async function remove(item) {
    vibrate(50)
    setItems(prev => prev.filter(i => i.id !== item.id))
    const { error } = await supabase.from('shopping_items').delete().eq('id', item.id)
    if (error) {
      await loadItems(house.id)
      notify(error.message)
      return
    }
    notify('Ürün kaldırıldı')
  }

  async function clearBought() {
    const bought = items.filter(i => i.is_bought)
    if (!bought.length) return
    vibrate([50, 100, 50])
    setItems(prev => prev.filter(i => !i.is_bought))
    const { error } = await supabase.from('shopping_items').delete().eq('household_id', house.id).eq('is_bought', true)
    if (error) { await loadItems(house.id); notify(error.message); return }
    notify('Sepettekiler temizlendi')
  }

  async function auth() {
    setMsg('')
    if (!email || !password) return setMsg('E-posta ve şifre gerekli.')
    if (authMode === 'signup') {
      const r = await supabase.auth.signUp({ email, password })
      if (r.error) setMsg(r.error.message)
      else setMsg('Hesap oluşturuldu. E-postanı doğruladıysan giriş yapabilirsin.')
    } else {
      const r = await supabase.auth.signInWithPassword({ email, password })
      if (r.error) setMsg(r.error.message)
    }
  }

  async function createHome() {
    setMsg(''); setBusy(true); localStorage.setItem('ev_name', name)
    const r = await supabase.rpc('create_household', { p_name: 'Bizim Ev', p_member_name: name || 'Üye' })
    setBusy(false)
    if (r.error) setMsg(r.error.message)
    else { setCode(r.data?.[0]?.invite_code || ''); await loadHouse() }
  }

  async function joinHome() {
    setMsg(''); setBusy(true); localStorage.setItem('ev_name', name)
    const r = await supabase.rpc('join_household', { p_code: code.trim().toUpperCase(), p_name: name || 'Üye' })
    setBusy(false)
    if (r.error) setMsg(r.error.message)
    else await loadHouse()
  }

  const pending = items.filter(i => !i.is_bought)
  const bought = items.filter(i => i.is_bought)
  const progress = items.length ? Math.round((bought.length / items.length) * 100) : 0
  const visible = useMemo(() => items.filter(i =>
    (filter === 'Hepsi' || i.category === filter) &&
    (showBought || !i.is_bought) &&
    (!search.trim() || i.name.toLowerCase().includes(search.toLowerCase()))
  ), [items, filter, showBought, search])
  const grouped = useMemo(() => visible.reduce((acc, item) => {
    ;(acc[item.category || 'Diğer'] ??= []).push(item); return acc
  }, {}), [visible])

  if (!session) return <Auth email={email} setEmail={setEmail} password={password} setPassword={setPassword} mode={authMode} setMode={setAuthMode} onAuth={auth} msg={msg} />
  if (loading) return <div className="splash"><div className="splash-logo"><ShoppingBasket /></div><b>Ev Listesi</b><span>Hazırlanıyor…</span></div>
  if (!house) return <div className="center"><div className="setup"><div className="setup-icon"><ShoppingBasket /></div><div className="eyebrow">ORTAK ALIŞVERİŞ</div><h1>Ev Listesi</h1><p>Üç kişinin aynı listeyi anında görüp kullanabileceği sade alışveriş uygulaman.</p><input placeholder="Adın" value={name} onChange={e => setName(e.target.value)} /><button className="primary full" disabled={busy} onClick={createHome}>{busy ? 'Oluşturuluyor…' : 'Yeni ev oluştur'} {!busy && <ChevronRight size={18}/>}</button><div className="or"><span>veya</span></div><input placeholder="Ev kodu · A1B2C3" value={code} onChange={e => setCode(e.target.value.toUpperCase())} /><button className="soft full" disabled={busy || !code.trim()} onClick={joinHome}>Mevcut eve katıl</button>{msg && <p className="error">{msg}</p>}<button className="link" onClick={() => supabase.auth.signOut()}>Çıkış yap</button></div></div>

  return <div className="app-shell">
    <div className="app">
      {view === 'list' ? <>
        <header className="main-header">
          <div className="header-top">
            <div className="location" onClick={() => setView('home')}>
              <span className="eyebrow">ORTAK ALIŞVERİŞ</span>
              <strong><House size={14}/> {house.name || 'BİZİM EV'} <ChevronRight size={14}/></strong>
            </div>
            <button className="cart-btn" onClick={() => setShowBought(v => !v)}>
              <ShoppingBasket size={20} />
              {bought.length > 0 && <span className="badge">{bought.length}</span>}
            </button>
          </div>
          <div className="searchbar">
            <Search size={18}/>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Listede ürün ara..." />
            {search && <button onClick={() => setSearch('')}><X size={16}/></button>}
          </div>
        </header>

        <main className="content">
          <div className="categories-scroll">
            {cats.map(c => { 
              const Icon = catIcons[c] || ShoppingBasket; 
              return <button key={c} className={`cat-btn ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
                <div className="cat-icon">{c !== 'Hepsi' && <Icon size={22}/>}</div>
                <span>{c}</span>
              </button> 
            })}
          </div>

          <div className="hero-compact">
            <div><div className="hero-label">SEPETİMİZ</div><h2>{pending.length === 0 ? 'Her şey tamam!' : `${pending.length} ürün bekliyor`}</h2><p>{pending.length ? `${bought.length} ürün alındı · hepiniz görebilirsiniz.` : 'Bugünkü alışveriş tamamlandı.'}</p></div>
            <div className="progress-circle"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="14"/><circle className="progress-value" style={{strokeDashoffset:87.9 - (87.9 * progress / 100)}} cx="18" cy="18" r="14"/></svg><b>{progress}%</b></div>
          </div>

          <div className="quick-add-heading"><span>Hızlı ekle</span><small>Ne gerekiyorsa yaz</small></div><QuickAddInput onAdd={addItem} />

          <div className="section-head">
            <div><span className="section-kicker">BUGÜN</span><span className="section-title">Alışveriş listesi</span><span className="count">{visible.length}</span></div>
            {showBought && bought.length > 0 && <button className="text-action" onClick={() => setShowBought(false)}>Aktifleri göster</button>}
          </div>
          
          {visible.length === 0 ? <div className="empty"><div className="empty-icon"><PackagePlus size={28}/></div><h2>{search ? 'Bulamadım' : 'Liste boş'}</h2><p>{search ? 'Başka bir kelime dene.' : 'Yeni ürün ekleyerek başla.'}</p></div> : <div className="groups">{Object.entries(grouped).map(([category, list]) => <section className="group" key={category}><div className="group-title"><span>{(() => { const I = catIcons[category] || ShoppingBasket; return <I size={16}/> })()}</span>{category}<i>{list.length}</i></div><div className="grid-list">{list.map(item => <Item key={item.id} item={item} toggle={toggle} remove={remove}/>)}</div></section>)}</div>}
          
          {bought.length > 0 && <button className="clear-bought" onClick={clearBought}><RotateCcw size={15}/> Sepettekileri temizle <span>{bought.length}</span></button>}
        </main>
      </> : <div className="content"><header className="topbar" style={{padding:'20px'}}><div className="brand"><h1>Evimiz</h1></div></header><HomeView house={house} members={members} code={house.invite_code} onCopy={() => { navigator.clipboard?.writeText(house.invite_code); notify('Ev kodu kopyalandı') }} onLogout={() => supabase.auth.signOut()} /></div>}

      <nav className="bottom-nav">
        <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><House size={22}/><span>Liste</span></button>
        <button className="nav-add" onClick={() => setAddOpen(true)} aria-label="Ürün ekle"><Plus size={25}/><span>Ekle</span></button>
        <button className={view === 'home' ? 'active' : ''} onClick={() => setView('home')}><Users size={22}/><span>Evimiz</span></button>
      </nav>
      {addOpen && <AddSheet presets={presets} newItem={newItem} setNewItem={setNewItem} qty={qty} setQty={setQty} cat={cat} setCat={setCat} icon={icon} setIcon={setIcon} addItem={addItem} close={() => setAddOpen(false)} />}
      {toast && <div className="toast"><Check size={16}/>{toast}</div>}
    </div>
  </div>

}

function QuickAddInput({ onAdd }) {
  const [val, setVal] = useState('')
  const inputRef = useRef(null)
  const submit = (e) => {
    e.preventDefault()
    if (!val.trim()) return
    onAdd(null, val.trim())
    setVal('')
    setTimeout(() => inputRef.current?.focus(), 10)
  }
  return <form className="quick-add-form" onSubmit={submit}>
    <div className="quick-add-wrap">
      <input ref={inputRef} placeholder="Ne lazım? (örn. Süt, Ekmek)" value={val} onChange={e => setVal(e.target.value)} />
      <button type="submit" disabled={!val.trim()} aria-label="Ekle"><Plus size={18}/></button>
    </div>
  </form>
}

function Item({ item, toggle, remove }) {
  return <div className={`item ${item.is_bought ? 'bought' : ''} ${item.optimistic ? 'pending-sync' : ''}`}>
    <button className="delete" onClick={(e) => { e.stopPropagation(); remove(item); }} aria-label="Ürünü sil"><Trash2 size={15}/></button>
    <div className="item-body" onClick={() => toggle(item)} style={{ cursor: 'pointer' }}>
      <span className="item-icon">{item.icon || '🛒'}</span>
      <div className="item-info"><strong>{item.name}</strong><small>{item.quantity && item.quantity !== '1' ? `× ${item.quantity} · ` : ''}{item.category}</small></div>
    </div>
    <button className="check" onClick={() => toggle(item)} aria-label={item.is_bought ? 'Listeye geri al' : 'Sepete ekle'}>{item.is_bought ? <><Check size={17}/><span>Alındı</span></> : <><Plus size={17}/><span>Sepete ekle</span></>}</button>
  </div>
}

function AddSheet({ presets, newItem, setNewItem, qty, setQty, cat, setCat, icon, setIcon, addItem, close }) {
  const [tab, setTab] = useState('popular')
  const [quickCat, setQuickCat] = useState('Meyve & Sebze')
  const quickCategories = cats.filter(c => c !== 'Hepsi' && c !== 'Diğer')
  const filteredPresets = presets.filter(p => p[2] === quickCat)
  return <div className="overlay" onClick={close}><div className="sheet" onClick={e => e.stopPropagation()}><div className="grab"/><div className="sheet-head"><div><div className="eyebrow">HIZLI EKLE</div><h2>Listeye ne lazım?</h2><p>Grubu seç, ürüne bir kez dokun.</p></div><button className="round-close" onClick={close}><X size={19}/></button></div><div className="sheet-tabs"><button className={tab === 'popular' ? 'active' : ''} onClick={() => setTab('popular')}>Hızlı ekle</button><button className={tab === 'custom' ? 'active' : ''} onClick={() => setTab('custom')}>Kendim ekle</button></div>{tab === 'popular' ? <><div className="quick-cats">{quickCategories.map(c => <button key={c} className={quickCat === c ? 'active' : ''} onClick={() => setQuickCat(c)}>{c}</button>)}</div><div className="quick-grid">{filteredPresets.map((p, idx) => <button key={`${p[1]}-${idx}`} onClick={() => { addItem(p); close(); }}><span>{p[0]}</span><b>{p[1]}</b></button>)}</div></> : <div className="custom-form"><div className="emoji-row">{['🛒','🍞','🥚','🥛','🧀','🍎','👶','💧'].map(e => <button className={icon === e ? 'selected' : ''} key={e} onClick={() => setIcon(e)}>{e}</button>)}</div><input autoFocus className="big-input" placeholder="Örn. kahvaltılık zeytin" value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === 'Enter' && addItem()} /><div className="form-row"><div className="stepper"><button onClick={() => setQty(String(Math.max(1, (Number(qty) || 1) - 1)))}><Minus size={16}/></button><b>{qty}</b><button onClick={() => setQty(String((Number(qty) || 1) + 1))}><Plus size={16}/></button></div><select value={cat} onChange={e => setCat(e.target.value)}>{cats.slice(1).map(c => <option key={c}>{c}</option>)}</select></div><button className="primary full add-btn" onClick={() => { addItem(); close(); }}>Listeye ekle <Plus size={18}/></button></div>}</div></div>
}

function HomeView({ house, members, code, onCopy, onLogout }) {
  return <main className="home-view"><section className="home-hero"><div className="home-icon"><Users size={25}/></div><div><div className="eyebrow">EVİMİZ</div><h2>{house.name || 'Bizim Ev'}</h2><p>{members.length} kişi birlikte kullanıyor</p></div></section><div className="code-card"><div><span>DAVET KODU</span><strong>{code}</strong><small>Diğer kişilere göndererek aynı listeye bağla.</small></div><button onClick={onCopy}><Copy size={17}/> Kopyala</button></div><section className="member-card"><div className="section-title">Evde olanlar</div>{members.map((m, index) => <div className="member-row" key={m.user_id}><div className="member-avatar">{(m.name || 'Ü').slice(0, 1).toUpperCase()}</div><div><b>{m.name || 'Üye'}</b><small>{index === 0 ? 'Ev sahibi' : 'Üye'}</small></div><CircleCheck size={18}/></div>)}</section><button className="logout" onClick={onLogout}><LogOut size={17}/> Çıkış yap</button></main>
}

function Auth({ email, setEmail, password, setPassword, mode, setMode, onAuth, msg }) {
  return <div className="auth-screen"><div className="auth-card"><div className="auth-logo"><ShoppingBasket size={27}/></div><span className="eyebrow">EVİNİZİN LİSTESİ</span><h1>Alışverişi<br/><em>birlikte</em> yönetin.</h1><p>Telefonundan ekle, markette sepete at. Üçünüz aynı listeyi anında görün.</p><input type="email" placeholder="E-posta" value={email} onChange={e => setEmail(e.target.value)}/><input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)}/><button className="primary full auth-btn" onClick={onAuth}>{mode === 'login' ? 'Giriş yap' : 'Hesap oluştur'} <ChevronRight size={18}/></button>{msg && <div className="error">{msg}</div>}<button className="link" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>{mode === 'login' ? 'İlk kez kullanıyorum → hesap oluştur' : '← Giriş yap'}</button></div></div>
}

createRoot(document.getElementById('root')).render(<App />)
