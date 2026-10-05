const fs = require('fs');
let css = fs.readFileSync('src/style.css', 'utf-8');

// Replace root variables
css = css.replace(/:root{[^}]+}/, \`:root{--bg:#f6f8f5;--surface:#fff;--surface2:#f8f8fa;--ink:#142e20;--muted:#8e8e93;--line:#e9ece5;--accent:#054b32;--accent-light:#e2f0e9;--green:#34c759;--shadow:0 10px 40px rgba(5,75,50,.07);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text","Helvetica Neue",Arial,sans-serif;color:var(--ink);background:var(--bg);font-synthesis:none;text-rendering:optimizeLegibility}\`);

// Add new layout styles
const newStyles = \`
.main-header {
  background: var(--accent);
  color: white;
  padding: calc(24px + env(safe-area-inset-top)) 24px 34px;
  border-bottom-left-radius: 36px;
  border-bottom-right-radius: 36px;
  margin-bottom: 24px;
  box-shadow: 0 10px 30px rgba(5,75,50,0.15);
  margin-left: -14px;
  margin-right: -14px;
  position: relative;
  overflow: hidden;
}
.main-header::after {
  content: ""; position: absolute;
  width: 300px; height: 300px; border-radius: 50%;
  background: rgba(255,255,255,0.03);
  right: -50px; top: -100px;
}
.header-top {
  display: flex; justify-content: space-between; align-items: center;
  position: relative; z-index: 2; margin-bottom: 24px;
}
.location {
  display: flex; flex-direction: column; gap: 4px;
}
.location .eyebrow {
  color: rgba(255,255,255,0.7); font-size: 10px; font-weight: 700; letter-spacing: 0.05em;
}
.location strong {
  display: flex; align-items: center; gap: 6px; font-size: 16px; font-weight: 850;
}
.cart-btn {
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(255,255,255,0.15);
  display: grid; place-items: center; color: white;
  position: relative; backdrop-filter: blur(10px);
}
.badge {
  position: absolute; top: 0; right: 0;
  background: #ff3b30; color: white;
  font-size: 9px; font-weight: 850;
  min-width: 18px; height: 18px; border-radius: 9px;
  display: grid; place-items: center; padding: 0 4px;
}
.main-header .searchbar {
  background: rgba(255,255,255,1);
  color: #142e20; border: none; box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}
.main-header .searchbar input { font-size: 14px; color: #142e20; }
.main-header .searchbar input::placeholder { color: #a5a49c; }

.categories-scroll {
  display: flex; gap: 14px; overflow-x: auto; padding: 4px 4px 18px;
  margin: 0 -14px 10px; padding-left: 14px; padding-right: 14px;
  scrollbar-width: none; -webkit-overflow-scrolling: touch;
}
.categories-scroll::-webkit-scrollbar { display: none; }
.cat-btn {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  flex: none; font-size: 11px; font-weight: 700; color: #8e8e93;
}
.cat-icon {
  width: 60px; height: 60px; border-radius: 50%;
  background: #fff; box-shadow: var(--shadow);
  display: grid; place-items: center; color: var(--accent);
  transition: 0.2s; border: 2px solid transparent;
}
.cat-btn.active .cat-icon {
  border-color: var(--accent); background: var(--accent-light);
}
.cat-btn.active span { color: var(--ink); font-weight: 850; }

.hero-compact {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--surface); padding: 16px 20px; border-radius: 20px;
  box-shadow: var(--shadow); margin-bottom: 20px;
}
.hero-compact h2 { font-size: 18px; margin: 0 0 4px; letter-spacing: -0.03em; }
.hero-compact p { font-size: 12px; color: var(--muted); margin: 0; }
.progress-circle { position: relative; width: 44px; height: 44px; display: grid; place-items: center; }
.progress-circle svg { width: 44px; height: 44px; transform: rotate(-90deg); position: absolute; inset: 0; }
.progress-circle circle { fill: none; stroke: var(--line); stroke-width: 4; }
.progress-circle .progress-value { stroke: var(--accent); stroke-dasharray: 87.9; stroke-linecap: round; }
.progress-circle b { font-size: 11px; font-weight: 850; }

.grid-list {
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px;
}
.item {
  flex-direction: column; align-items: stretch; justify-content: space-between;
  padding: 14px; border-radius: 20px; min-height: 140px; text-align: center;
  background: var(--surface); border: none; box-shadow: var(--shadow); gap: 8px;
}
.item-body {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  flex: 1; justify-content: center;
}
.item-icon { font-size: 32px; background: rgba(5,75,50,0.03); width: 64px; height: 64px; border-radius: 32px; display: grid; place-items: center; margin: 0 auto; }
.item-info { width: 100%; }
.item-info strong { font-size: 14px; display: block; margin-bottom: 4px; }
.item .check {
  align-self: center; width: 40px; height: 40px; border: 2px solid var(--accent);
  background: transparent; border-radius: 20px; color: var(--accent); margin-top: auto;
}
.item.bought { background: var(--accent-light); opacity: 0.8; }
.item.bought .check { background: var(--accent); color: white; }
.item .delete {
  position: absolute; top: 10px; right: 10px; opacity: 0;
}
.item:hover .delete { opacity: 1; }

.bottom-nav {
  height: 70px; border-radius: 35px; width: min(calc(100% - 32px), 400px);
  bottom: calc(20px + env(safe-area-inset-bottom));
  background: var(--surface); box-shadow: 0 10px 40px rgba(5,75,50,0.15);
  border: none;
}
.bottom-nav > button { color: #b0b0b5; }
.bottom-nav > button.active { color: var(--accent); }
.bottom-nav .nav-add { background: var(--accent); box-shadow: 0 8px 20px rgba(5,75,50,0.3); }

.quick-add-wrap { border: none; box-shadow: var(--shadow); padding: 8px 8px 8px 18px; border-radius: 24px; margin-bottom: 20px; }
.quick-add-wrap button { background: var(--accent); width: 44px; height: 44px; border-radius: 18px; }
.fab { display: none; }
\`;
fs.appendFileSync('src/style.css', newStyles);
console.log('styles updated');
