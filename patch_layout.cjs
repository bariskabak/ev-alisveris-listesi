const fs = require('fs');
let code = fs.readFileSync('src/main.jsx', 'utf-8');

const newLayout = `  return <div className="app-shell">
    <div className="app">
      {view === 'list' ? <>
        <header className="main-header">
          <div className="header-top">
            <div className="location" onClick={() => setView('home')}>
              <span className="eyebrow">Geçerli Ev</span>
              <strong><House size={14}/> {house.name || 'BİZİM EV'} <ChevronRight size={14}/></strong>
            </div>
            <button className="cart-btn" onClick={() => setShowBought(v => !v)}>
              <ShoppingBasket size={20} />
              {bought.length > 0 && <span className="badge">{bought.length}</span>}
            </button>
          </div>
          <div className="searchbar">
            <Search size={18}/>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Ürün ara..." />
            {search && <button onClick={() => setSearch('')}><X size={16}/></button>}
          </div>
        </header>

        <main className="content">
          <div className="categories-scroll">
            {cats.map(c => { 
              const Icon = c === 'Hepsi' ? ShoppingBasket : catIcons[c]; 
              return <button key={c} className={\`cat-btn \${filter === c ? 'active' : ''}\`} onClick={() => setFilter(c)}>
                <div className="cat-icon">{c !== 'Hepsi' && <Icon size={22}/>}</div>
                <span>{c}</span>
              </button> 
            })}
          </div>

          <div className="hero-compact">
            <div><h2>{pending.length === 0 ? 'Her şey tamam!' : \`\${pending.length} ürün alınacak\`}</h2><p>{pending.length ? \`\${bought.length} ürün sepette.\` : 'Harika iş çıkardın.'}</p></div>
            <div className="progress-circle"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="14"/><circle className="progress-value" style={{strokeDashoffset:87.9 - (87.9 * progress / 100)}} cx="18" cy="18" r="14"/></svg><b>{progress}%</b></div>
          </div>

          <QuickAddInput onAdd={addItem} />

          <div className="section-head">
            <div><span className="section-title">Liste</span><span className="count">{visible.length}</span></div>
          </div>
          
          {visible.length === 0 ? <div className="empty"><div className="empty-icon"><PackagePlus size={28}/></div><h2>{search ? 'Bulamadım' : 'Liste boş'}</h2><p>{search ? 'Başka bir kelime dene.' : 'Yeni ürün ekleyerek başla.'}</p></div> : <div className="groups">{Object.entries(grouped).map(([category, list]) => <section className="group" key={category}><div className="group-title"><span>{(() => { const I = catIcons[category] || ShoppingBasket; return <I size={16}/> })()}</span>{category}<i>{list.length}</i></div><div className="grid-list">{list.map(item => <Item key={item.id} item={item} toggle={toggle} remove={remove}/>)}</div></section>)}</div>}
          
          {bought.length > 0 && <button className="clear-bought" onClick={clearBought}><RotateCcw size={15}/> Sepettekileri temizle <span>{bought.length}</span></button>}
        </main>
      </> : <div className="content"><header className="topbar" style={{padding:'20px'}}><div className="brand"><h1>Evimiz</h1></div></header><HomeView house={house} members={members} code={house.invite_code} onCopy={() => { navigator.clipboard?.writeText(house.invite_code); notify('Ev kodu kopyalandı') }} onLogout={() => supabase.auth.signOut()} /></div>}

      <nav className="bottom-nav">
        <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><House size={24}/></button>
        <button className="nav-add" onClick={() => setAddOpen(true)} aria-label="Ürün ekle"><Plus size={25}/></button>
        <button className={view === 'home' ? 'active' : ''} onClick={() => setView('home')}><Users size={24}/></button>
      </nav>
      {addOpen && <AddSheet presets={presets} newItem={newItem} setNewItem={setNewItem} qty={qty} setQty={setQty} cat={cat} setCat={setCat} icon={icon} setIcon={setIcon} addItem={addItem} close={() => setAddOpen(false)} />}
      {toast && <div className="toast"><Check size={16}/>{toast}</div>}
    </div>
  </div>`;

const startIdx = code.indexOf('  return <div className="app-shell">');
const endIdx = code.indexOf('}\n\nfunction QuickAddInput') - 1; // just before QuickAddInput
if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + newLayout + '\n' + code.substring(endIdx);
  fs.writeFileSync('src/main.jsx', code);
  console.log('patched');
} else {
  console.log('failed to find indices');
}
