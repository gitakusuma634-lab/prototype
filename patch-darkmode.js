// ============================================================
//  ChocoLab — patch-darkmode.js
//  Dark/Light Mode Toggle — Dynamic Island + SVG Morphing
//  Run: node patch-darkmode.js [path/to/app.js]
//  Creates automatic backup: app.js.bak
// ============================================================

const fs   = require('fs');
const path = require('path');

const TARGET = process.argv[2] || path.join(__dirname, 'app.js');

if (!fs.existsSync(TARGET)) {
  console.error('ERROR: file not found -> ' + TARGET);
  process.exit(1);
}

// ── 1. BACKUP ─────────────────────────────────────────────────
const BAK = TARGET + '.bak';
fs.copyFileSync(TARGET, BAK);
console.log('[patch] backup saved -> ' + BAK);

let src = fs.readFileSync(TARGET, 'utf8');

// ═════════════════════════════════════════════════════════════
//  PATCH A — Inject FOUC-prevention + theme-init script right
//             after <body> opening tag (inside buildHTML return)
// ═════════════════════════════════════════════════════════════

const FOUC_SCRIPT = '<script>' +
  '(function(){' +
    'var s=localStorage.getItem("choco-theme");' +
    'if(!s){s=window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";}' +
    'document.documentElement.setAttribute("data-theme",s);' +
  '})();' +
'<\\/script>';

const BODY_OPEN_OLD = '<body>\n\n${NOISE_SVG}';
const BODY_OPEN_NEW = '<body>\n\n' + FOUC_SCRIPT + '\n\n${NOISE_SVG}';

if (src.indexOf(BODY_OPEN_OLD) === -1) {
  console.error('ERROR [A]: Could not find <body> anchor. Patch aborted.');
  process.exit(1);
}
src = src.replace(BODY_OPEN_OLD, BODY_OPEN_NEW);
console.log('[patch A] FOUC-prevention script injected.');

// ═════════════════════════════════════════════════════════════
//  PATCH B — Inject Dynamic Island HTML just before </body>
//             (before <!-- CART WIDGET --> block)
// ═════════════════════════════════════════════════════════════

const ISLAND_HTML =
'<!-- ══ DYNAMIC ISLAND DARK/LIGHT TOGGLE ══ -->\n' +
'<div id="choco-island" role="button" aria-label="Toggle dark mode" tabindex="0">\n' +
'  <div class="island-track">\n' +
'    <!-- Mini morph icon inside the island -->\n' +
'    <div class="island-icon" aria-hidden="true">\n' +
'      <svg class="icon-sun" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
'        <circle cx="16" cy="16" r="7" fill="#FFE566" stroke="#FFCC00" stroke-width="1.5"/>\n' +
'        <g class="sun-spokes" stroke="#FFD700" stroke-width="2" stroke-linecap="round">\n' +
'          <line x1="16" y1="2"  x2="16" y2="6"/>\n' +
'          <line x1="16" y1="26" x2="16" y2="30"/>\n' +
'          <line x1="2"  y1="16" x2="6"  y2="16"/>\n' +
'          <line x1="26" y1="16" x2="30" y2="16"/>\n' +
'          <line x1="5.5" y1="5.5"   x2="8.4" y2="8.4"/>\n' +
'          <line x1="23.6" y1="23.6" x2="26.5" y2="26.5"/>\n' +
'          <line x1="26.5" y1="5.5"  x2="23.6" y2="8.4"/>\n' +
'          <line x1="8.4"  y1="23.6" x2="5.5"  y2="26.5"/>\n' +
'        </g>\n' +
'      </svg>\n' +
'      <svg class="icon-moon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
'        <path class="moon-body" d="M22 16.5C22 21.747 17.747 26 12.5 26C9.42 26 6.69 24.56 4.93 22.31C6.1 22.76 7.37 23 8.7 23C14.5 23 19.2 18.3 19.2 12.5C19.2 10.3 18.54 8.26 17.4 6.56C20.16 8.32 22 11.22 22 14.5Z" fill="#C8D8F0" stroke="#A0B8E0" stroke-width="1.2"/>\n' +
'        <circle class="moon-crater" cx="9" cy="13" r="1.5" fill="rgba(160,184,220,0.5)"/>\n' +
'        <circle class="moon-crater" cx="14" cy="19" r="1" fill="rgba(160,184,220,0.4)"/>\n' +
'        <!-- Stars near moon -->\n' +
'        <circle class="moon-star" cx="25" cy="8"  r="1.2" fill="#fff" opacity="0.9"/>\n' +
'        <circle class="moon-star" cx="28" cy="14" r="0.8" fill="#fff" opacity="0.7"/>\n' +
'        <circle class="moon-star" cx="22" cy="5"  r="0.7" fill="#fff" opacity="0.8"/>\n' +
'      </svg>\n' +
'    </div>\n' +
'    <span class="island-label">Light</span>\n' +
'  </div>\n' +
'</div>\n\n' +
'<!-- ══ HERO SUN/MOON MORPH OVERLAY (inside #intro) ══ -->\n' +
'<!-- Injected via JS to sit inside #intro section -->\n\n';

const CART_ANCHOR = '<!-- CART WIDGET -->';
if (src.indexOf(CART_ANCHOR) === -1) {
  console.error('ERROR [B]: Could not find CART WIDGET anchor. Patch aborted.');
  process.exit(1);
}
src = src.replace(CART_ANCHOR, ISLAND_HTML + CART_ANCHOR);
console.log('[patch B] Dynamic Island HTML injected.');

// ═════════════════════════════════════════════════════════════
//  PATCH C — Inject Dark/Light CSS variables + Island styles
//             right after the existing CSS reset block
// ═════════════════════════════════════════════════════════════

const DARK_CSS =
'\n/* ══════════════════════════════════════\n' +
'   DARK / LIGHT MODE — CSS Custom Properties\n' +
'   ChocoLab Theme System v1.0\n' +
'══════════════════════════════════════ */\n' +
':root,[data-theme="light"]{\n' +
'  --cl-bg:           #ffffff;\n' +
'  --cl-bg-scroller:  #ffffff;\n' +
'  --cl-bg-header:    #1a1aaa;\n' +
'  --cl-bg-band-top:  linear-gradient(180deg,#2020cc 0%,#3535ee 100%);\n' +
'  --cl-bg-band-bot:  linear-gradient(0deg,#2020cc 0%,#3535ee 100%);\n' +
'  --cl-bg-footer:    #1a1aaa;\n' +
'  --cl-bg-gap:       #3333ff;\n' +
'  --cl-text:         #1a1a1a;\n' +
'  --cl-text-muted:   rgba(30,30,60,0.6);\n' +
'  --cl-accent:       #3333ff;\n' +
'  --cl-accent-warm:  #FFD700;\n' +
'  --cl-card-bg:      rgba(255,255,255,0.97);\n' +
'  --cl-card-border:  rgba(51,51,255,0.30);\n' +
'  --cl-card-shadow:  0 2px 0 rgba(255,255,255,0.98) inset,4px 4px 0 rgba(51,51,255,0.14),0 18px 56px rgba(0,0,180,0.12);\n' +
'  --cl-grid-line:    rgba(50,50,255,.09);\n' +
'  --cl-grid-bg:      #f8f8ff;\n' +
'  --cl-intro-bg:     linear-gradient(180deg,#4A90D9 0%,#78C8F0 12%,#A8DCF8 26%,#C8EEFF 40%,#DCF5E8 56%,#C5E8A0 70%,#92CC52 82%,#5E9F2A 92%,#3D7A18 100%);\n' +
'  --cl-sun-opacity:  1;\n' +
'  --cl-moon-opacity: 0;\n' +
'  --cl-island-bg:    rgba(240,240,255,0.72);\n' +
'  --cl-island-border:rgba(255,255,255,0.4);\n' +
'  --cl-island-label: #3333ff;\n' +
'  --cl-corner-color: #3333ff;\n' +
'  --cl-shop-bg:      #3333ff;\n' +
'  --cl-about-bg:     #f8f8ff;\n' +
'  --cl-cr-card-bg:   #1a1a8a;\n' +
'}\n' +
'[data-theme="dark"]{\n' +
'  --cl-bg:           #0d0d1a;\n' +
'  --cl-bg-scroller:  #0d0d1a;\n' +
'  --cl-bg-header:    #080818;\n' +
'  --cl-bg-band-top:  linear-gradient(180deg,#0a0a22 0%,#111130 100%);\n' +
'  --cl-bg-band-bot:  linear-gradient(0deg,#0a0a22 0%,#111130 100%);\n' +
'  --cl-bg-footer:    #080818;\n' +
'  --cl-bg-gap:       #111130;\n' +
'  --cl-text:         #e8e8ff;\n' +
'  --cl-text-muted:   rgba(200,200,240,0.6);\n' +
'  --cl-accent:       #7777ff;\n' +
'  --cl-accent-warm:  #FFB300;\n' +
'  --cl-card-bg:      rgba(20,20,48,0.92);\n' +
'  --cl-card-border:  rgba(120,120,255,0.22);\n' +
'  --cl-card-shadow:  0 2px 0 rgba(80,80,140,0.18) inset,4px 4px 0 rgba(80,80,255,0.12),0 18px 56px rgba(0,0,40,0.55);\n' +
'  --cl-grid-line:    rgba(100,100,255,.07);\n' +
'  --cl-grid-bg:      #0f0f28;\n' +
'  --cl-intro-bg:     linear-gradient(180deg,#0d1a2e 0%,#0a1520 18%,#0a0f1a 38%,#08080f 55%,#0d0d1a 72%,#111120 85%,#0a0a18 100%);\n' +
'  --cl-sun-opacity:  0;\n' +
'  --cl-moon-opacity: 1;\n' +
'  --cl-island-bg:    rgba(12,12,30,0.82);\n' +
'  --cl-island-border:rgba(255,255,255,0.10);\n' +
'  --cl-island-label: #aaaaff;\n' +
'  --cl-corner-color: #7777ff;\n' +
'  --cl-shop-bg:      #0a0a2a;\n' +
'  --cl-about-bg:     #0f0f28;\n' +
'  --cl-cr-card-bg:   #060614;\n' +
'}\n' +
'\n' +
'/* ── Global smooth theme transition ── */\n' +
'html{\n' +
'  transition:\n' +
'    background-color 0.8s cubic-bezier(0.25,1,0.5,1),\n' +
'    color 0.6s ease;\n' +
'}\n' +
'body,\n' +
'#scroller,\n' +
'.sh-hdr,\n' +
'.sh-ftr,\n' +
'.sh-band,\n' +
'.glass-card,\n' +
'.grid-bg,\n' +
'#intro,\n' +
'#shop-entrance,\n' +
'#about,\n' +
'.cr-card,\n' +
'.sgap{\n' +
'  transition:\n' +
'    background 0.8s cubic-bezier(0.25,1,0.5,1),\n' +
'    background-color 0.8s cubic-bezier(0.25,1,0.5,1),\n' +
'    border-color 0.6s ease,\n' +
'    box-shadow 0.6s ease,\n' +
'    color 0.6s ease;\n' +
'}\n' +
'\n' +
'/* Apply theme vars to shell elements */\n' +
'.sh-hdr{ background:var(--cl-bg-header); }\n' +
'.sh-ftr{ background:var(--cl-bg-footer); color:var(--cl-text); }\n' +
'.sh-band.top{ background:var(--cl-bg-band-top); }\n' +
'.sh-band.bot{ background:var(--cl-bg-band-bot); }\n' +
'.sgap{ background:var(--cl-bg-gap); }\n' +
'#scroller{ background:var(--cl-bg-scroller); }\n' +
'\n' +
'/* Cards */\n' +
'.glass-card{\n' +
'  background:var(--cl-card-bg);\n' +
'  border-color:var(--cl-card-border);\n' +
'  box-shadow:var(--cl-card-shadow);\n' +
'}\n' +
'\n' +
'/* Grid backgrounds */\n' +
'.grid-bg{\n' +
'  background-color:var(--cl-grid-bg);\n' +
'  background-image:\n' +
'    linear-gradient(var(--cl-grid-line) 1px,transparent 1px),\n' +
'    linear-gradient(90deg,var(--cl-grid-line) 1px,transparent 1px);\n' +
'}\n' +
'\n' +
'/* Corner marks */\n' +
'.cm{ border-color:var(--cl-corner-color); }\n' +
'\n' +
'/* Sparkle icon */\n' +
'.spk svg{ fill:var(--cl-accent); }\n' +
'\n' +
'/* Section text adaptations */\n' +
'.pi-dname,.pi-dtxt,.pi-num,.dk-name,.dk-desc-txt,.dk-tagline,\n' +
'.about-title,.about-text,.about-label,.shop-hero-title,\n' +
'.cr-title,.cr-of,.cr-slabel,.cr-sval,.dk-cta-copy{\n' +
'  color:var(--cl-text);\n' +
'  transition:color 0.6s ease;\n' +
'}\n' +
'\n' +
'/* Intro section sky morph */\n' +
'#intro{\n' +
'  background:var(--cl-intro-bg);\n' +
'}\n' +
'#shop-entrance{ background:var(--cl-shop-bg); }\n' +
'.about-card{ background-color:var(--cl-about-bg); }\n' +
'.cr-card{ background:var(--cl-cr-card-bg); }\n' +
'\n' +
'/* Dark mode text overrides for dark sections */\n' +
'[data-theme="dark"] .intro-brand-title,\n' +
'[data-theme="dark"] .intro-portfolio,\n' +
'[data-theme="dark"] .intro-ifgide,\n' +
'[data-theme="dark"] .intro-copy p{\n' +
'  text-shadow:0 4px 32px rgba(100,100,255,0.45),0 2px 0 rgba(80,80,200,0.3),0 0 60px rgba(120,120,255,0.25);\n' +
'}\n' +
'[data-theme="dark"] .sun-beams{ opacity:0; }\n' +
'[data-theme="dark"] .sun-flare{ opacity:0; }\n' +
'[data-theme="dark"] .cloud{ opacity:0.18; }\n' +
'[data-theme="dark"] .sun{ opacity:0; pointer-events:none; }\n' +
'[data-theme="dark"] .intro-gold-dust{ background:rgba(150,150,255,0.7); box-shadow:0 0 4px 2px rgba(120,120,255,0.35); }\n' +
'[data-theme="dark"] .ground{ background:linear-gradient(180deg,#1a2a0a 0%,#0d1a08 100%); }\n' +
'[data-theme="dark"] .stall-body{ background:#0a0a28; border-color:#7777ff; }\n' +
'[data-theme="dark"] .stall-body span{ color:#aaaaff; }\n' +
'[data-theme="dark"] .stall-sign{ background:#0a0a2a; color:#aaaaff; }\n' +
'[data-theme="dark"] .stall-awning{ background:repeating-linear-gradient(90deg,#0e0e3a 0px,#12124a 8px,#181860 16px,#1a1a70 24px,#181860 32px); }\n' +
'[data-theme="dark"] .about-title{ color:#aaaaff; }\n' +
'[data-theme="dark"] .about-cta{ background:rgba(30,30,80,0.8); border-color:#5555cc; color:#ccccff; }\n' +
'[data-theme="dark"] .pi-badge{ background:#7777ff; }\n' +
'[data-theme="dark"] .pi-blob,.dk-blob{ background:radial-gradient(circle at 40% 40%,rgba(80,80,180,0.22),transparent 70%); }\n' +
'[data-theme="dark"] #shop-entrance .shop-floor-grid{ background-color:#0f0f28; }\n' +
'[data-theme="dark"] .shop-wall-l,[data-theme="dark"] .shop-wall-r{ background:#0a0a22; }\n' +
'[data-theme="dark"] .shop-ceiling{ background:#080818; }\n' +
'[data-theme="dark"] .shop-hero-title{ color:#ccccff; }\n' +
'[data-theme="dark"] .shop-btm p{ color:rgba(200,200,240,0.7); }\n' +
'[data-theme="dark"] .dk-sub,.dk-ttl{ color:#ccccff; }\n' +
'[data-theme="dark"] .dk-hcard{ background:#0a0a2a; border-color:#333388; }\n' +
'[data-theme="dark"] .cart-hdr{ background:#0a0a28; border-color:#333388; }\n' +
'[data-theme="dark"] #cart-panel{ background:#0d0d22; border-color:#333388; }\n' +
'[data-theme="dark"] .cart-hdr-title{ color:#ccccff; }\n' +
'[data-theme="dark"] #cart-close-btn{ color:#aaaaff; }\n' +
'[data-theme="dark"] .cart-total-lbl,.cart-total-val{ color:#ccccff; }\n' +
'[data-theme="dark"] .cart-item-name,.cart-item-price{ color:#e0e0ff; }\n' +
'[data-theme="dark"] #cart-btn{ background:#0d0d22; border-color:#7777ff; }\n' +
'[data-theme="dark"] .mrq-t{ color:rgba(170,170,255,0.35); }\n' +
'\n' +
'/* ── Sun/Moon in #intro — theme-driven visibility ── */\n' +
'.intro-sun-wrap,\n' +
'.intro-moon-wrap{\n' +
'  position:absolute;\n' +
'  top:6%;\n' +
'  left:50%;\n' +
'  transform:translateX(-50%);\n' +
'  z-index:4;\n' +
'  pointer-events:none;\n' +
'  transition:\n' +
'    opacity 1.1s cubic-bezier(0.25,1,0.5,1),\n' +
'    transform 1.2s cubic-bezier(0.34,1.56,0.64,1),\n' +
'    filter 1.0s ease;\n' +
'  will-change:transform,opacity,filter;\n' +
'}\n' +
'.intro-sun-wrap{\n' +
'  opacity:var(--cl-sun-opacity);\n' +
'  transform:translateX(-50%) scale(1) rotate(0deg);\n' +
'}\n' +
'.intro-moon-wrap{\n' +
'  opacity:var(--cl-moon-opacity);\n' +
'  transform:translateX(-50%) scale(0.75) rotate(-35deg);\n' +
'  filter:drop-shadow(0 0 22px rgba(150,180,255,0.55)) drop-shadow(0 0 48px rgba(100,140,240,0.28));\n' +
'}\n' +
'[data-theme="dark"] .intro-sun-wrap{\n' +
'  opacity:0;\n' +
'  transform:translateX(-50%) scale(0.6) rotate(60deg);\n' +
'  filter:blur(2px);\n' +
'}\n' +
'[data-theme="dark"] .intro-moon-wrap{\n' +
'  opacity:1;\n' +
'  transform:translateX(-50%) scale(1) rotate(0deg);\n' +
'  filter:drop-shadow(0 0 22px rgba(150,180,255,0.75)) drop-shadow(0 0 60px rgba(100,140,240,0.45));\n' +
'}\n' +
'\n' +
'/* Hero Moon SVG — large version in #intro */\n' +
'.intro-moon-svg{\n' +
'  width:clamp(70px,18vw,110px);\n' +
'  height:clamp(70px,18vw,110px);\n' +
'}\n' +
'.moon-body-lg{\n' +
'  animation:moonGlow 4s ease-in-out infinite;\n' +
'}\n' +
'@keyframes moonGlow{\n' +
'  0%,100%{ filter:drop-shadow(0 0 8px rgba(150,180,255,0.6)); }\n' +
'  50%     { filter:drop-shadow(0 0 22px rgba(150,180,255,0.9)) drop-shadow(0 0 40px rgba(120,160,240,0.4)); }\n' +
'}\n' +
'.moon-star-twinkle{\n' +
'  animation:starTwinkle 2.8s ease-in-out infinite;\n' +
'}\n' +
'.moon-star-twinkle:nth-child(2){ animation-delay:0.9s; }\n' +
'.moon-star-twinkle:nth-child(3){ animation-delay:1.8s; }\n' +
'@keyframes starTwinkle{\n' +
'  0%,100%{ opacity:0.2; transform:scale(1); }\n' +
'  50%     { opacity:1;   transform:scale(1.35); }\n' +
'}\n' +
'\n' +
'/* ── DYNAMIC ISLAND TOGGLE BUTTON ── */\n' +
'#choco-island{\n' +
'  position:fixed;\n' +
'  top:10px;\n' +
'  left:50%;\n' +
'  transform:translateX(-50%) scaleX(1);\n' +
'  z-index:9999;\n' +
'  cursor:pointer;\n' +
'  user-select:none;\n' +
'  -webkit-tap-highlight-color:transparent;\n' +
'  outline:none;\n' +
'  /* Glassmorphism */\n' +
'  background:var(--cl-island-bg);\n' +
'  backdrop-filter:blur(20px) saturate(180%) brightness(1.05);\n' +
'  -webkit-backdrop-filter:blur(20px) saturate(180%) brightness(1.05);\n' +
'  border:1.5px solid var(--cl-island-border);\n' +
'  box-shadow:\n' +
'    0 10px 30px rgba(0,0,0,0.15),\n' +
'    inset 0 1px 1px rgba(255,255,255,0.2),\n' +
'    0 0 0 1px rgba(0,0,0,0.05);\n' +
'  /* Pill shape */\n' +
'  border-radius:50px;\n' +
'  padding:6px 18px 6px 10px;\n' +
'  /* Animation base */\n' +
'  transition:\n' +
'    transform 0.55s cubic-bezier(0.34,1.56,0.64,1),\n' +
'    background 0.6s ease,\n' +
'    border-color 0.5s ease,\n' +
'    box-shadow 0.5s ease,\n' +
'    padding 0.4s cubic-bezier(0.34,1.56,0.64,1);\n' +
'  will-change:transform;\n' +
'}\n' +
'#choco-island:hover{\n' +
'  transform:translateX(-50%) scaleX(1.07) scaleY(1.1);\n' +
'  box-shadow:\n' +
'    0 16px 42px rgba(0,0,0,0.22),\n' +
'    inset 0 1px 2px rgba(255,255,255,0.28),\n' +
'    0 0 0 2px rgba(100,100,255,0.12);\n' +
'}\n' +
'#choco-island:active{\n' +
'  transform:translateX(-50%) scaleX(0.96) scaleY(0.93);\n' +
'  transition:transform 0.18s cubic-bezier(0.34,1.56,0.64,1);\n' +
'}\n' +
'#choco-island.island-toggling{\n' +
'  transform:translateX(-50%) scaleX(1.15) scaleY(0.88);\n' +
'}\n' +
'\n' +
'.island-track{\n' +
'  display:flex;\n' +
'  align-items:center;\n' +
'  gap:8px;\n' +
'  height:28px;\n' +
'}\n' +
'.island-icon{\n' +
'  position:relative;\n' +
'  width:26px;\n' +
'  height:26px;\n' +
'  flex-shrink:0;\n' +
'}\n' +
'.island-icon svg{\n' +
'  position:absolute;\n' +
'  top:0;left:0;\n' +
'  width:100%;height:100%;\n' +
'  transition:\n' +
'    opacity 0.7s cubic-bezier(0.25,1,0.5,1),\n' +
'    transform 0.9s cubic-bezier(0.34,1.56,0.64,1);\n' +
'  will-change:transform,opacity;\n' +
'}\n' +
'.island-icon .icon-sun{\n' +
'  opacity:1;\n' +
'  transform:rotate(0deg) scale(1);\n' +
'}\n' +
'.island-icon .icon-moon{\n' +
'  opacity:0;\n' +
'  transform:rotate(60deg) scale(0.6);\n' +
'}\n' +
'[data-theme="dark"] .island-icon .icon-sun{\n' +
'  opacity:0;\n' +
'  transform:rotate(-60deg) scale(0.5);\n' +
'}\n' +
'[data-theme="dark"] .island-icon .icon-moon{\n' +
'  opacity:1;\n' +
'  transform:rotate(0deg) scale(1);\n' +
'}\n' +
'\n' +
'.island-label{\n' +
'  font-family:"ZTNature",sans-serif;\n' +
'  font-weight:600;\n' +
'  font-size:11px;\n' +
'  letter-spacing:1.5px;\n' +
'  text-transform:uppercase;\n' +
'  color:var(--cl-island-label);\n' +
'  transition:color 0.5s ease, opacity 0.5s ease;\n' +
'  white-space:nowrap;\n' +
'  line-height:1;\n' +
'}\n' +
'\n' +
'/* Sun spokes animation in island icon */\n' +
'.sun-spokes{\n' +
'  transform-origin:16px 16px;\n' +
'  animation:islandSunRot 8s linear infinite;\n' +
'}\n' +
'@keyframes islandSunRot{\n' +
'  from{ transform:rotate(0deg); }\n' +
'  to  { transform:rotate(360deg); }\n' +
'}\n' +
'\n' +
'/* Moon stars pulse in island */\n' +
'.icon-moon .moon-star{\n' +
'  animation:islandStarPulse 2.4s ease-in-out infinite;\n' +
'}\n' +
'.icon-moon .moon-star:nth-child(2){ animation-delay:0.8s; }\n' +
'.icon-moon .moon-star:nth-child(3){ animation-delay:1.6s; }\n' +
'@keyframes islandStarPulse{\n' +
'  0%,100%{ opacity:0.3; }\n' +
'  50%     { opacity:1; }\n' +
'}\n' +
'\n' +
'/* ── Ripple transition overlay ── */\n' +
'#theme-ripple{\n' +
'  position:fixed;\n' +
'  top:22px;left:50%;\n' +
'  width:0;height:0;\n' +
'  border-radius:50%;\n' +
'  pointer-events:none;\n' +
'  z-index:9990;\n' +
'  transform:translate(-50%,-50%);\n' +
'  transition:none;\n' +
'}\n' +
'#theme-ripple.ripple-expand{\n' +
'  animation:rippleOut 0.72s cubic-bezier(0.25,1,0.5,1) forwards;\n' +
'}\n' +
'@keyframes rippleOut{\n' +
'  0%  { width:0;    height:0;    opacity:0.22; }\n' +
'  60% { opacity:0.14; }\n' +
'  100%{ width:250vmax; height:250vmax; opacity:0; }\n' +
'}\n';

const CSS_RESET_ANCHOR = '/* ── RESET ── */\n*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}\nhtml,body{height:100%;overflow:hidden;background:#1a1a8a;}';
if (src.indexOf(CSS_RESET_ANCHOR) === -1) {
  console.error('ERROR [C]: Could not find CSS reset anchor. Patch aborted.');
  process.exit(1);
}
src = src.replace(CSS_RESET_ANCHOR, DARK_CSS + CSS_RESET_ANCHOR);
console.log('[patch C] Theme CSS variables + Island styles injected.');

// ═════════════════════════════════════════════════════════════
//  PATCH D — Inject Moon SVG into #intro HTML
//             Target: after the existing .sun element ref
// ═════════════════════════════════════════════════════════════

const MOON_HTML =
'    <!-- ══ INTRO HERO: Sun wrapper (moved into explicit div for theme morph) ══ -->\n' +
'    <div class="intro-sun-wrap" aria-hidden="true">\n' +
'      <div class="sun" style="position:relative;top:auto;left:auto;transform:none;"></div>\n' +
'      <div class="sun-ray" style="position:absolute;top:50%;left:50%;"></div>\n' +
'    </div>\n' +
'    <!-- ══ INTRO HERO: Moon (dark mode) ══ -->\n' +
'    <div class="intro-moon-wrap" aria-hidden="true">\n' +
'      <svg class="intro-moon-svg" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
'        <!-- Lunar glow halo -->\n' +
'        <circle cx="55" cy="55" r="50" fill="rgba(100,140,240,0.07)"/>\n' +
'        <circle cx="55" cy="55" r="40" fill="rgba(120,160,255,0.08)"/>\n' +
'        <!-- Crescent body -->\n' +
'        <path class="moon-body-lg" d="M78 57C78 72.46 65.46 85 50 85C40.08 85 31.4 79.88 26.5 72.16C30.1 73.36 33.96 74 38 74C54.57 74 68 60.57 68 44C68 38.88 66.64 34.08 64.32 29.96C72.32 34.68 78 45.26 78 55Z" fill="#C8D8F0" stroke="#A0B8E0" stroke-width="1.5"/>\n' +
'        <!-- Craters -->\n' +
'        <circle cx="40" cy="48" r="5" fill="rgba(150,176,218,0.45)"/>\n' +
'        <circle cx="55" cy="65" r="3.5" fill="rgba(150,176,218,0.38)"/>\n' +
'        <circle cx="46" cy="70" r="2.5" fill="rgba(150,176,218,0.3)"/>\n' +
'        <!-- Stars nearby -->\n' +
'        <circle class="moon-star-twinkle" cx="88" cy="25" r="3.5" fill="#ffffff" opacity="0.9"/>\n' +
'        <circle class="moon-star-twinkle" cx="96" cy="48" r="2.2" fill="#ffffff" opacity="0.7"/>\n' +
'        <circle class="moon-star-twinkle" cx="82" cy="14" r="2" fill="#ffffff" opacity="0.8"/>\n' +
'        <circle class="moon-star-twinkle" cx="100" cy="32" r="1.5" fill="#ffffff" opacity="0.6"/>\n' +
'        <!-- Soft inner glow -->\n' +
'        <path d="M78 57C78 72.46 65.46 85 50 85C40.08 85 31.4 79.88 26.5 72.16C30.1 73.36 33.96 74 38 74C54.57 74 68 60.57 68 44C68 38.88 66.64 34.08 64.32 29.96C72.32 34.68 78 45.26 78 55Z" fill="url(#moonGrad)" opacity="0.55"/>\n' +
'        <defs>\n' +
'          <radialGradient id="moonGrad" cx="55%" cy="38%" r="55%">\n' +
'            <stop offset="0%" stop-color="#e8f0ff" stop-opacity="0.6"/>\n' +
'            <stop offset="100%" stop-color="#8ab0e8" stop-opacity="0"/>\n' +
'          </radialGradient>\n' +
'        </defs>\n' +
'      </svg>\n' +
'    </div>\n';

const INTRO_BEAMS_OLD = '    <!-- God-level sun light effects -->\n    <div class="sun-beams" aria-hidden="true"></div>';
const INTRO_BEAMS_NEW = '    <!-- God-level sun light effects -->\n    <div class="sun-beams" aria-hidden="true"></div>\n' + MOON_HTML;

if (src.indexOf(INTRO_BEAMS_OLD) === -1) {
  console.error('ERROR [D]: Could not find intro sun-beams anchor. Patch aborted.');
  process.exit(1);
}
src = src.replace(INTRO_BEAMS_OLD, INTRO_BEAMS_NEW);
console.log('[patch D] Moon SVG hero element injected into #intro.');

// ═════════════════════════════════════════════════════════════
//  PATCH E — Inject ripple overlay div right after <body> open
// ═════════════════════════════════════════════════════════════

const RIPPLE_DIV = '<div id="theme-ripple" aria-hidden="true"></div>\n\n';
const NOISE_ANCHOR = '${NOISE_SVG}\n\n<header class="sh-hdr">';
if (src.indexOf(NOISE_ANCHOR) === -1) {
  console.error('ERROR [E]: Could not find NOISE_SVG anchor. Patch aborted.');
  process.exit(1);
}
src = src.replace(NOISE_ANCHOR, '${NOISE_SVG}\n\n' + RIPPLE_DIV + '<header class="sh-hdr">');
console.log('[patch E] Ripple overlay div injected.');

// ═════════════════════════════════════════════════════════════
//  PATCH F — Inject ThemeEngine JS module before Bootstrap
// ═════════════════════════════════════════════════════════════

const THEME_JS =
'\n  // ── ThemeEngine ───────────────────────────────────────────────\n' +
'  const ThemeEngine = {\n' +
'    STORAGE_KEY: "choco-theme",\n' +
'    _rippleTimer: null,\n' +
'\n' +
'    get current() {\n' +
'      return document.documentElement.getAttribute("data-theme") || "light";\n' +
'    },\n' +
'\n' +
'    init() {\n' +
'      // Restore saved or system preference\n' +
'      const saved = localStorage.getItem(this.STORAGE_KEY);\n' +
'      const sys   = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";\n' +
'      const theme = saved || sys;\n' +
'      document.documentElement.setAttribute("data-theme", theme);\n' +
'      this._updateIsland(theme);\n' +
'\n' +
'      const btn = document.getElementById("choco-island");\n' +
'      if (!btn) return;\n' +
'\n' +
'      btn.addEventListener("click", () => this.toggle());\n' +
'      btn.addEventListener("keydown", function(e) {\n' +
'        if (e.key === "Enter" || e.key === " ") {\n' +
'          e.preventDefault();\n' +
'          ThemeEngine.toggle();\n' +
'        }\n' +
'      });\n' +
'\n' +
'      // Listen for OS-level changes\n' +
'      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(e) {\n' +
'        if (!localStorage.getItem(ThemeEngine.STORAGE_KEY)) {\n' +
'          ThemeEngine._applyTheme(e.matches ? "dark" : "light");\n' +
'        }\n' +
'      });\n' +
'    },\n' +
'\n' +
'    toggle() {\n' +
'      const next = this.current === "dark" ? "light" : "dark";\n' +
'\n' +
'      // Elastic "squish" animation on island\n' +
'      var island = document.getElementById("choco-island");\n' +
'      if (island) {\n' +
'        island.classList.add("island-toggling");\n' +
'        clearTimeout(this._rippleTimer);\n' +
'        this._rippleTimer = setTimeout(function() {\n' +
'          island.classList.remove("island-toggling");\n' +
'        }, 380);\n' +
'      }\n' +
'\n' +
'      // Ripple effect\n' +
'      this._fireRipple(next);\n' +
'\n' +
'      // Apply after brief delay so ripple fires first visually\n' +
'      var self = this;\n' +
'      setTimeout(function() { self._applyTheme(next); }, 30);\n' +
'    },\n' +
'\n' +
'    _fireRipple(nextTheme) {\n' +
'      var ripple = document.getElementById("theme-ripple");\n' +
'      if (!ripple) return;\n' +
'      ripple.style.background = nextTheme === "dark"\n' +
'        ? "rgba(8,8,30,0.9)"\n' +
'        : "rgba(240,240,255,0.9)";\n' +
'      ripple.classList.remove("ripple-expand");\n' +
'      // Force reflow\n' +
'      void ripple.offsetWidth;\n' +
'      ripple.classList.add("ripple-expand");\n' +
'      setTimeout(function() { ripple.classList.remove("ripple-expand"); }, 750);\n' +
'    },\n' +
'\n' +
'    _applyTheme(theme) {\n' +
'      document.documentElement.setAttribute("data-theme", theme);\n' +
'      localStorage.setItem(this.STORAGE_KEY, theme);\n' +
'      this._updateIsland(theme);\n' +
'    },\n' +
'\n' +
'    _updateIsland(theme) {\n' +
'      var label = document.querySelector(".island-label");\n' +
'      if (!label) return;\n' +
'      label.textContent = theme === "dark" ? "Dark" : "Light";\n' +
'      var island = document.getElementById("choco-island");\n' +
'      if (island) {\n' +
'        island.setAttribute("aria-label",\n' +
'          theme === "dark" ? "Switch to light mode" : "Switch to dark mode");\n' +
'      }\n' +
'    }\n' +
'  };\n\n';

const BOOTSTRAP_ANCHOR = '  // ── Bootstrap ─────────────────────────────────────────────────\n  document.addEventListener(\'DOMContentLoaded\', () => {';
const BOOTSTRAP_NEW    =
  THEME_JS +
  '  // ── Bootstrap ─────────────────────────────────────────────────\n' +
  '  document.addEventListener(\'DOMContentLoaded\', () => {';

if (src.indexOf(BOOTSTRAP_ANCHOR) === -1) {
  console.error('ERROR [F]: Could not find Bootstrap anchor. Patch aborted.');
  process.exit(1);
}
src = src.replace(BOOTSTRAP_ANCHOR, BOOTSTRAP_NEW);
console.log('[patch F] ThemeEngine JS module injected.');

// ═════════════════════════════════════════════════════════════
//  PATCH G — Wire ThemeEngine.init() into DOMContentLoaded
// ═════════════════════════════════════════════════════════════

const DOM_INIT_OLD = '    ChocoCart.init();\n    TunnelScroll.init(scroller);';
const DOM_INIT_NEW = '    ThemeEngine.init();\n    ChocoCart.init();\n    TunnelScroll.init(scroller);';

if (src.indexOf(DOM_INIT_OLD) === -1) {
  console.error('ERROR [G]: Could not find ChocoCart.init() anchor. Patch aborted.');
  process.exit(1);
}
src = src.replace(DOM_INIT_OLD, DOM_INIT_NEW);
console.log('[patch G] ThemeEngine.init() wired into bootstrap.');

// ─────────────────────────────────────────────────────────────
//  WRITE
// ─────────────────────────────────────────────────────────────
fs.writeFileSync(TARGET, src, 'utf8');
console.log('\n[patch] ✅ All patches applied successfully -> ' + TARGET);
console.log('[patch] 💾 Backup available at             -> ' + BAK);
console.log('\n  Patches summary:');
console.log('  A — FOUC-prevention inline script in <head>');
console.log('  B — Dynamic Island HTML element');
console.log('  C — CSS custom properties (light/dark) + Island + Moon styles');
console.log('  D — Moon SVG hero morph element inside #intro');
console.log('  E — Ripple overlay <div>');
console.log('  F — ThemeEngine vanilla JS module');
console.log('  G — ThemeEngine.init() wired to DOMContentLoaded');
console.log('');
