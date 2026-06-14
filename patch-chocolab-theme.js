// ============================================================
//  patch-chocolab-theme.js
//  ChocoLab — Dark/Light Mode MEGA REFACTOR PATCH
//  Run: node patch-chocolab-theme.js [path/to/app.js]
//
//  PATCH RULE: Tidak menggunakan template literal / String.raw
//  untuk string target/replacement. Semua pakai concatenation (+).
// ============================================================

'use strict';

const fs   = require('fs');
const path = require('path');

// ── 1. Resolve target file ───────────────────────────────────
const TARGET = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, 'app.js');

if (!fs.existsSync(TARGET)) {
  console.error('[PATCH ERROR] File tidak ditemukan: ' + TARGET);
  process.exit(1);
}

// ── 2. Backup otomatis ───────────────────────────────────────
const BAK = TARGET + '.bak';
fs.copyFileSync(TARGET, BAK);
console.log('[PATCH] Backup dibuat: ' + BAK);

// ── 3. Baca source ───────────────────────────────────────────
let src = fs.readFileSync(TARGET, 'utf8');
let patchCount = 0;

// ── Helper: replace-one dengan validasi ─────────────────────
function applyPatch(label, oldStr, newStr) {
  if (src.indexOf(oldStr) === -1) {
    console.warn('[PATCH WARN] Target tidak ditemukan — patch dilewati: ' + label);
    return;
  }
  src = src.replace(oldStr, newStr);
  patchCount++;
  console.log('[PATCH OK ] ' + label);
}

// ════════════════════════════════════════════════════════════
//  PATCH A — CSS Custom Properties: Light Mode (Bakery Morning)
//  Mengganti palet flat blue/white lama dengan warm buttery tones
// ════════════════════════════════════════════════════════════
applyPatch(
  'CSS vars — Light mode palette',

  ':root,[data-theme="light"]{\n'
  + '  --cl-bg:           #ffffff;\n'
  + '  --cl-bg-scroller:  #ffffff;\n'
  + '  --cl-bg-header:    #1a1aaa;\n'
  + '  --cl-bg-band-top:  linear-gradient(180deg,#2020cc 0%,#3535ee 100%);\n'
  + '  --cl-bg-band-bot:  linear-gradient(0deg,#2020cc 0%,#3535ee 100%);\n'
  + '  --cl-bg-footer:    #1a1aaa;\n'
  + '  --cl-bg-gap:       #3333ff;\n'
  + '  --cl-text:         #1a1a1a;\n'
  + '  --cl-text-muted:   rgba(30,30,60,0.6);\n'
  + '  --cl-accent:       #3333ff;\n'
  + '  --cl-accent-warm:  #FFD700;\n'
  + '  --cl-card-bg:      rgba(255,255,255,0.97);\n'
  + '  --cl-card-border:  rgba(51,51,255,0.30);\n'
  + '  --cl-card-shadow:  0 2px 0 rgba(255,255,255,0.98) inset,4px 4px 0 rgba(51,51,255,0.14),0 18px 56px rgba(0,0,180,0.12);\n'
  + '  --cl-grid-line:    rgba(50,50,255,.09);\n'
  + '  --cl-grid-bg:      #f8f8ff;\n'
  + '  --cl-intro-bg:     linear-gradient(180deg,#4A90D9 0%,#78C8F0 12%,#A8DCF8 26%,#C8EEFF 40%,#DCF5E8 56%,#C5E8A0 70%,#92CC52 82%,#5E9F2A 92%,#3D7A18 100%);\n'
  + '  --cl-sun-opacity:  1;\n'
  + '  --cl-moon-opacity: 0;\n'
  + '  --cl-island-bg:    rgba(240,240,255,0.72);\n'
  + '  --cl-island-border:rgba(255,255,255,0.4);\n'
  + '  --cl-island-label: #3333ff;\n'
  + '  --cl-corner-color: #3333ff;\n'
  + '  --cl-shop-bg:      #3333ff;\n'
  + '  --cl-about-bg:     #f8f8ff;\n'
  + '  --cl-cr-card-bg:   #1a1a8a;\n'
  + '}',

  ':root,[data-theme="light"]{\n'
  + '  /* ── Warm Buttery Morning Bakery ── */\n'
  + '  --cl-bg:           #FDFBF7;\n'
  + '  --cl-bg-scroller:  #FDFBF7;\n'
  + '  --cl-bg-header:    #3D1F08;\n'
  + '  --cl-bg-band-top:  linear-gradient(180deg,#5C2E0A 0%,#7A3D10 100%);\n'
  + '  --cl-bg-band-bot:  linear-gradient(0deg,#5C2E0A 0%,#7A3D10 100%);\n'
  + '  --cl-bg-footer:    #3D1F08;\n'
  + '  --cl-bg-gap:       #C17A2A;\n'
  + '  --cl-text:         #2C1403;\n'
  + '  --cl-text-muted:   rgba(62,32,8,0.60);\n'
  + '  --cl-accent:       #C17A2A;\n'
  + '  --cl-accent-warm:  #F0A500;\n'
  + '  --cl-card-bg:      rgba(253,248,235,0.97);\n'
  + '  --cl-card-border:  rgba(193,122,42,0.30);\n'
  + '  --cl-card-shadow:  0 2px 0 rgba(255,245,220,0.98) inset,4px 4px 0 rgba(193,122,42,0.14),0 18px 56px rgba(120,60,0,0.12);\n'
  + '  --cl-grid-line:    rgba(193,122,42,.09);\n'
  + '  --cl-grid-bg:      #FDF5E6;\n'
  + '  --cl-intro-bg:     linear-gradient(180deg,#4A90D9 0%,#78C8F0 12%,#A8DCF8 26%,#C8EEFF 40%,#DCF5E8 56%,#C5E8A0 70%,#92CC52 82%,#5E9F2A 92%,#3D7A18 100%);\n'
  + '  --cl-sun-opacity:  1;\n'
  + '  --cl-moon-opacity: 0;\n'
  + '  --cl-island-bg:    rgba(253,245,220,0.82);\n'
  + '  --cl-island-border:rgba(240,165,0,0.45);\n'
  + '  --cl-island-label: #7A3D10;\n'
  + '  --cl-corner-color: #C17A2A;\n'
  + '  --cl-shop-bg:      #7A3D10;\n'
  + '  --cl-about-bg:     #FDF5E6;\n'
  + '  --cl-cr-card-bg:   #3D1F08;\n'
  + '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH B — CSS Custom Properties: Dark Mode (Café at Midnight)
//  Mengganti palet blue-dark lama dengan espresso/mahogany tones
// ════════════════════════════════════════════════════════════
applyPatch(
  'CSS vars — Dark mode palette (Café at Midnight)',

  '[data-theme="dark"]{\n'
  + '  --cl-bg:           #0d0d1a;\n'
  + '  --cl-bg-scroller:  #0d0d1a;\n'
  + '  --cl-bg-header:    #080818;\n'
  + '  --cl-bg-band-top:  linear-gradient(180deg,#0a0a22 0%,#111130 100%);\n'
  + '  --cl-bg-band-bot:  linear-gradient(0deg,#0a0a22 0%,#111130 100%);\n'
  + '  --cl-bg-footer:    #080818;\n'
  + '  --cl-bg-gap:       #111130;\n'
  + '  --cl-text:         #e8e8ff;\n'
  + '  --cl-text-muted:   rgba(200,200,240,0.6);\n'
  + '  --cl-accent:       #7777ff;\n'
  + '  --cl-accent-warm:  #FFB300;\n'
  + '  --cl-card-bg:      rgba(20,20,48,0.92);\n'
  + '  --cl-card-border:  rgba(120,120,255,0.22);\n'
  + '  --cl-card-shadow:  0 2px 0 rgba(80,80,140,0.18) inset,4px 4px 0 rgba(80,80,255,0.12),0 18px 56px rgba(0,0,40,0.55);\n'
  + '  --cl-grid-line:    rgba(100,100,255,.07);\n'
  + '  --cl-grid-bg:      #0f0f28;\n'
  + '  --cl-intro-bg:     linear-gradient(180deg,#0d1a2e 0%,#0a1520 18%,#0a0f1a 38%,#08080f 55%,#0d0d1a 72%,#111120 85%,#0a0a18 100%);\n'
  + '  --cl-sun-opacity:  0;\n'
  + '  --cl-moon-opacity: 1;\n'
  + '  --cl-island-bg:    rgba(12,12,30,0.82);\n'
  + '  --cl-island-border:rgba(255,255,255,0.10);\n'
  + '  --cl-island-label: #aaaaff;\n'
  + '  --cl-corner-color: #7777ff;\n'
  + '  --cl-shop-bg:      #0a0a2a;\n'
  + '  --cl-about-bg:     #0f0f28;\n'
  + '  --cl-cr-card-bg:   #060614;\n'
  + '}',

  '[data-theme="dark"]{\n'
  + '  /* ── Luxurious Café at Midnight ── */\n'
  + '  --cl-bg:           #120C0A;\n'
  + '  --cl-bg-scroller:  #120C0A;\n'
  + '  --cl-bg-header:    #0A0705;\n'
  + '  --cl-bg-band-top:  linear-gradient(180deg,#0A0705 0%,#1C1412 100%);\n'
  + '  --cl-bg-band-bot:  linear-gradient(0deg,#0A0705 0%,#1C1412 100%);\n'
  + '  --cl-bg-footer:    #0A0705;\n'
  + '  --cl-bg-gap:       #2A1A08;\n'
  + '  --cl-text:         #F0D9B5;\n'
  + '  --cl-text-muted:   rgba(220,185,130,0.58);\n'
  + '  --cl-accent:       #E8930A;\n'
  + '  --cl-accent-warm:  #FFB300;\n'
  + '  --cl-card-bg:      rgba(28,20,18,0.94);\n'
  + '  --cl-card-border:  rgba(160,90,20,0.28);\n'
  + '  --cl-card-shadow:  0 2px 0 rgba(80,50,20,0.22) inset,4px 4px 0 rgba(140,80,10,0.14),0 18px 56px rgba(0,0,0,0.65);\n'
  + '  --cl-grid-line:    rgba(160,90,20,.08);\n'
  + '  --cl-grid-bg:      #180F0A;\n'
  + '  --cl-intro-bg:     linear-gradient(180deg,#050D18 0%,#08121E 18%,#0A0A12 38%,#080806 55%,#120C0A 72%,#1C1412 85%,#0A0705 100%);\n'
  + '  --cl-sun-opacity:  0;\n'
  + '  --cl-moon-opacity: 1;\n'
  + '  --cl-island-bg:    rgba(18,12,10,0.88);\n'
  + '  --cl-island-border:rgba(232,147,10,0.22);\n'
  + '  --cl-island-label: #E8930A;\n'
  + '  --cl-corner-color: #8B5C1A;\n'
  + '  --cl-shop-bg:      #180F0A;\n'
  + '  --cl-about-bg:     #1C1412;\n'
  + '  --cl-cr-card-bg:   #0A0705;\n'
  + '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH C — Dark mode CSS overrides: ganti warna blue/purple
//  ke espresso/amber agar komponen blend dengan palet baru
// ════════════════════════════════════════════════════════════
applyPatch(
  'CSS dark-mode component overrides (blue→espresso/amber)',

  '/* Dark mode text overrides for dark sections */\n'
  + '[data-theme="dark"] .intro-brand-title,\n'
  + '[data-theme="dark"] .intro-portfolio,\n'
  + '[data-theme="dark"] .intro-ifgide,\n'
  + '[data-theme="dark"] .intro-copy p{\n'
  + '  text-shadow:0 4px 32px rgba(100,100,255,0.45),0 2px 0 rgba(80,80,200,0.3),0 0 60px rgba(120,120,255,0.25);\n'
  + '}\n'
  + '[data-theme="dark"] .sun-beams{ opacity:0; }\n'
  + '[data-theme="dark"] .sun-flare{ opacity:0; }\n'
  + '[data-theme="dark"] .cloud{ opacity:0.18; }\n'
  + '[data-theme="dark"] .sun{ opacity:0; pointer-events:none; }\n'
  + '[data-theme="dark"] .intro-gold-dust{ background:rgba(150,150,255,0.7); box-shadow:0 0 4px 2px rgba(120,120,255,0.35); }\n'
  + '[data-theme="dark"] .ground{ background:linear-gradient(180deg,#1a2a0a 0%,#0d1a08 100%); }\n'
  + '[data-theme="dark"] .stall-body{ background:#0a0a28; border-color:#7777ff; }\n'
  + '[data-theme="dark"] .stall-body span{ color:#aaaaff; }\n'
  + '[data-theme="dark"] .stall-sign{ background:#0a0a2a; color:#aaaaff; }\n'
  + '[data-theme="dark"] .stall-awning{ background:repeating-linear-gradient(90deg,#0e0e3a 0px,#12124a 8px,#181860 16px,#1a1a70 24px,#181860 32px); }\n'
  + '[data-theme="dark"] .about-title{ color:#aaaaff; }\n'
  + '[data-theme="dark"] .about-cta{ background:rgba(30,30,80,0.8); border-color:#5555cc; color:#ccccff; }\n'
  + '[data-theme="dark"] .pi-badge{ background:#7777ff; }\n'
  + '[data-theme="dark"] .pi-blob,.dk-blob{ background:radial-gradient(circle at 40% 40%,rgba(80,80,180,0.22),transparent 70%); }\n'
  + '[data-theme="dark"] #shop-entrance .shop-floor-grid{ background-color:#0f0f28; }\n'
  + '[data-theme="dark"] .shop-wall-l,[data-theme="dark"] .shop-wall-r{ background:#0a0a22; }\n'
  + '[data-theme="dark"] .shop-ceiling{ background:#080818; }\n'
  + '[data-theme="dark"] .shop-hero-title{ color:#ccccff; }\n'
  + '[data-theme="dark"] .shop-btm p{ color:rgba(200,200,240,0.7); }\n'
  + '[data-theme="dark"] .dk-sub,.dk-ttl{ color:#ccccff; }\n'
  + '[data-theme="dark"] .dk-hcard{ background:#0a0a2a; border-color:#333388; }\n'
  + '[data-theme="dark"] .cart-hdr{ background:#0a0a28; border-color:#333388; }\n'
  + '[data-theme="dark"] #cart-panel{ background:#0d0d22; border-color:#333388; }\n'
  + '[data-theme="dark"] .cart-hdr-title{ color:#ccccff; }\n'
  + '[data-theme="dark"] #cart-close-btn{ color:#aaaaff; }\n'
  + '[data-theme="dark"] .cart-total-lbl,.cart-total-val{ color:#ccccff; }\n'
  + '[data-theme="dark"] .cart-item-name,.cart-item-price{ color:#e0e0ff; }\n'
  + '[data-theme="dark"] #cart-btn{ background:#0d0d22; border-color:#7777ff; }\n'
  + '[data-theme="dark"] .mrq-t{ color:rgba(170,170,255,0.35); }',

  '/* ── Dark mode component overrides — Café at Midnight palette ── */\n'
  + '[data-theme="dark"] .intro-brand-title,\n'
  + '[data-theme="dark"] .intro-portfolio,\n'
  + '[data-theme="dark"] .intro-ifgide,\n'
  + '[data-theme="dark"] .intro-copy p{\n'
  + '  text-shadow:0 4px 32px rgba(232,147,10,0.55),0 2px 0 rgba(180,100,5,0.35),0 0 60px rgba(200,120,10,0.28);\n'
  + '}\n'
  + '[data-theme="dark"] .sun-beams{ opacity:0; }\n'
  + '[data-theme="dark"] .sun-flare{ opacity:0; }\n'
  + '[data-theme="dark"] .cloud{ opacity:0.10; filter:sepia(0.4) brightness(0.6); }\n'
  + '[data-theme="dark"] .sun{ opacity:0; pointer-events:none; }\n'
  + '[data-theme="dark"] .intro-gold-dust{ background:rgba(232,147,10,0.75); box-shadow:0 0 5px 3px rgba(200,120,5,0.40); }\n'
  + '[data-theme="dark"] .ground{ background:linear-gradient(180deg,#1A0F06 0%,#0A0704 100%); }\n'
  + '[data-theme="dark"] .stall-body{ background:#1C1008; border-color:#8B5C1A; }\n'
  + '[data-theme="dark"] .stall-body span{ color:#E8930A; }\n'
  + '[data-theme="dark"] .stall-sign{ background:#120C06; color:#C87A18; }\n'
  + '[data-theme="dark"] .stall-awning{ background:repeating-linear-gradient(90deg,#1C0F05 0px,#2A1608 8px,#3D1F0A 16px,#4A2610 24px,#3D1F0A 32px); }\n'
  + '[data-theme="dark"] .about-title{ color:#E8930A; }\n'
  + '[data-theme="dark"] .about-cta{ background:rgba(42,22,5,0.85); border-color:#8B5C1A; color:#F0D9B5; }\n'
  + '[data-theme="dark"] .pi-badge{ background:#C17A2A; box-shadow:0 0 12px rgba(232,147,10,0.45); }\n'
  + '[data-theme="dark"] .pi-blob{ background:radial-gradient(circle at 40% 40%,rgba(140,70,10,0.22),transparent 70%); }\n'
  + '[data-theme="dark"] .dk-blob{ background:radial-gradient(circle at 40% 40%,rgba(140,70,10,0.22),transparent 70%); }\n'
  + '[data-theme="dark"] #shop-entrance .shop-floor-grid{ background-color:#180F0A; }\n'
  + '[data-theme="dark"] .shop-wall-l,[data-theme="dark"] .shop-wall-r{ background:#120C08; }\n'
  + '[data-theme="dark"] .shop-ceiling{ background:#0A0705; }\n'
  + '[data-theme="dark"] .shop-hero-title{ color:#F0D9B5; }\n'
  + '[data-theme="dark"] .shop-btm p{ color:rgba(220,185,130,0.72); }\n'
  + '[data-theme="dark"] .dk-sub,[data-theme="dark"] .dk-ttl{ color:#E8930A; }\n'
  + '[data-theme="dark"] .dk-hcard{ background:#1C1008; border-color:#5C3010; }\n'
  + '[data-theme="dark"] .cart-hdr{ background:#1C1008; border-color:#5C3010; }\n'
  + '[data-theme="dark"] #cart-panel{ background:#180F0A; border-color:#5C3010; }\n'
  + '[data-theme="dark"] .cart-hdr-title{ color:#F0D9B5; }\n'
  + '[data-theme="dark"] #cart-close-btn{ color:#E8930A; }\n'
  + '[data-theme="dark"] .cart-total-lbl{ color:#F0D9B5; }\n'
  + '[data-theme="dark"] .cart-total-val{ color:#F0D9B5; }\n'
  + '[data-theme="dark"] .cart-item-name,[data-theme="dark"] .cart-item-price{ color:#EDD5A0; }\n'
  + '[data-theme="dark"] #cart-btn{ background:#1C1008; border-color:#8B5C1A; }\n'
  + '[data-theme="dark"] .mrq-t{ color:rgba(200,130,30,0.30); }\n'
  + '[data-theme="dark"] .cm{ border-color:#8B5C1A; }\n'
  + '[data-theme="dark"] .spk svg{ fill:#E8930A; }\n'
  + '[data-theme="dark"] .pi-dname,[data-theme="dark"] .dk-name{ color:#F0D9B5; }\n'
  + '[data-theme="dark"] .pi-dtxt,[data-theme="dark"] .dk-desc-txt{ color:rgba(220,185,130,0.82); }\n'
  + '[data-theme="dark"] .pi-num,[data-theme="dark"] .dk-num{ color:rgba(200,150,60,0.55); }\n'
  + '[data-theme="dark"] .about-text,[data-theme="dark"] .about-label{ color:rgba(220,185,130,0.88); }\n'
  + '[data-theme="dark"] .cr-title{ color:#E8930A; }\n'
  + '[data-theme="dark"] .cr-of,[data-theme="dark"] .cr-slabel,[data-theme="dark"] .cr-sval{ color:rgba(200,155,70,0.80); }\n'
  + '[data-theme="dark"] .dk-tagline,[data-theme="dark"] .dk-cta-copy{ color:rgba(220,185,130,0.70); }\n'
  + '[data-theme="dark"] .dk-hgrid{ border-color:rgba(140,80,20,0.15); }\n'
  + '[data-theme="dark"] .shop-tag-line span:last-child{ color:rgba(220,185,130,0.75); }\n'
  + '[data-theme="dark"] .tag-bar{ background:#8B5C1A; }\n'
  + '\n'
  + '/* ── NIGHT EASTER EGG: Neon Sign "ChocoLab After Hours" ── */\n'
  + '#chocolab-neon{\n'
  + '  display:none;\n'
  + '  position:fixed;\n'
  + '  bottom:72px;\n'
  + '  right:16px;\n'
  + '  z-index:8800;\n'
  + '  pointer-events:none;\n'
  + '  font-family:"GCKroven",sans-serif;\n'
  + '  font-size:clamp(10px,2.2vw,13px);\n'
  + '  letter-spacing:1.5px;\n'
  + '  writing-mode:vertical-rl;\n'
  + '  text-orientation:mixed;\n'
  + '  color:#FF8C00;\n'
  + '  animation:neonFlicker 3.6s ease-in-out infinite;\n'
  + '}\n'
  + '#chocolab-neon .neon-line{\n'
  + '  display:block;\n'
  + '  text-shadow:\n'
  + '    0 0 4px  #FF8C00,\n'
  + '    0 0 10px #FF6600,\n'
  + '    0 0 22px #E85500,\n'
  + '    0 0 42px #C84000,\n'
  + '    0 0 66px rgba(200,80,0,0.45);\n'
  + '}\n'
  + '#chocolab-neon .neon-divider{\n'
  + '  display:block;\n'
  + '  width:1px;\n'
  + '  height:18px;\n'
  + '  background:linear-gradient(180deg,transparent,rgba(255,140,0,0.5),transparent);\n'
  + '  margin:4px auto;\n'
  + '}\n'
  + '@keyframes neonFlicker{\n'
  + '  0%,18%,20%,54%,56%,100%{\n'
  + '    opacity:1;\n'
  + '    text-shadow:\n'
  + '      0 0 4px  #FF8C00,\n'
  + '      0 0 10px #FF6600,\n'
  + '      0 0 22px #E85500,\n'
  + '      0 0 42px #C84000,\n'
  + '      0 0 66px rgba(200,80,0,0.45);\n'
  + '  }\n'
  + '  19%,55%{\n'
  + '    opacity:0.45;\n'
  + '    text-shadow:\n'
  + '      0 0 2px #FF6600,\n'
  + '      0 0 5px #C84000;\n'
  + '  }\n'
  + '  35%,37%{\n'
  + '    opacity:0.88;\n'
  + '    text-shadow:\n'
  + '      0 0 6px  #FF8C00,\n'
  + '      0 0 14px #FF6600,\n'
  + '      0 0 28px #E85500;\n'
  + '  }\n'
  + '  36%{\n'
  + '    opacity:0.20;\n'
  + '  }\n'
  + '}\n'
  + '[data-theme="dark"] #chocolab-neon{ display:block; }'
);

// ════════════════════════════════════════════════════════════
//  PATCH D — Ultra-Premium Glassmorphism Dynamic Island
//  Mengganti island CSS dengan spec penuh: dual border, backdrop,
//  elastic bounce hover, organic morph on click
// ════════════════════════════════════════════════════════════
applyPatch(
  'Dynamic Island — Ultra-Premium Glassmorphism CSS',

  '/* ── DYNAMIC ISLAND TOGGLE BUTTON ── */\n'
  + '#choco-island{\n'
  + '  position:fixed;\n'
  + '  top:10px;\n'
  + '  left:50%;\n'
  + '  transform:translateX(-50%) scaleX(1);\n'
  + '  z-index:9999;\n'
  + '  cursor:pointer;\n'
  + '  user-select:none;\n'
  + '  -webkit-tap-highlight-color:transparent;\n'
  + '  outline:none;\n'
  + '  /* Glassmorphism */\n'
  + '  background:var(--cl-island-bg);\n'
  + '  backdrop-filter:blur(20px) saturate(180%) brightness(1.05);\n'
  + '  -webkit-backdrop-filter:blur(20px) saturate(180%) brightness(1.05);\n'
  + '  border:1.5px solid var(--cl-island-border);\n'
  + '  box-shadow:\n'
  + '    0 10px 30px rgba(0,0,0,0.15),\n'
  + '    inset 0 1px 1px rgba(255,255,255,0.2),\n'
  + '    0 0 0 1px rgba(0,0,0,0.05);\n'
  + '  /* Pill shape */\n'
  + '  border-radius:50px;\n'
  + '  padding:6px 18px 6px 10px;\n'
  + '  /* Animation base */\n'
  + '  transition:\n'
  + '    transform 0.55s cubic-bezier(0.34,1.56,0.64,1),\n'
  + '    background 0.6s ease,\n'
  + '    border-color 0.5s ease,\n'
  + '    box-shadow 0.5s ease,\n'
  + '    padding 0.4s cubic-bezier(0.34,1.56,0.64,1);\n'
  + '  will-change:transform;\n'
  + '}\n'
  + '#choco-island:hover{\n'
  + '  transform:translateX(-50%) scaleX(1.07) scaleY(1.1);\n'
  + '  box-shadow:\n'
  + '    0 16px 42px rgba(0,0,0,0.22),\n'
  + '    inset 0 1px 2px rgba(255,255,255,0.28),\n'
  + '    0 0 0 2px rgba(100,100,255,0.12);\n'
  + '}\n'
  + '#choco-island:active{\n'
  + '  transform:translateX(-50%) scaleX(0.96) scaleY(0.93);\n'
  + '  transition:transform 0.18s cubic-bezier(0.34,1.56,0.64,1);\n'
  + '}\n'
  + '#choco-island.island-toggling{\n'
  + '  transform:translateX(-50%) scaleX(1.15) scaleY(0.88);\n'
  + '}',

  '/* ── DYNAMIC ISLAND — Ultra-Premium Apple Glass ── */\n'
  + '#choco-island{\n'
  + '  position:fixed;\n'
  + '  top:10px;\n'
  + '  left:50%;\n'
  + '  transform:translateX(-50%) scaleX(1);\n'
  + '  z-index:9999;\n'
  + '  cursor:pointer;\n'
  + '  user-select:none;\n'
  + '  -webkit-tap-highlight-color:transparent;\n'
  + '  outline:none;\n'
  + '  /* Heavy structural backdrop — Apple glass spec */\n'
  + '  background:var(--cl-island-bg);\n'
  + '  backdrop-filter:blur(25px) saturate(200%) brightness(1.02);\n'
  + '  -webkit-backdrop-filter:blur(25px) saturate(200%) brightness(1.02);\n'
  + '  /* Dual-layered concentric borders */\n'
  + '  border:1px solid rgba(255,255,255,0.18);\n'
  + '  outline:1px solid var(--cl-island-border);\n'
  + '  outline-offset:1px;\n'
  + '  box-shadow:\n'
  + '    inset 0 1.5px 2px rgba(255,255,255,0.25),\n'
  + '    0 12px 40px rgba(0,0,0,0.30),\n'
  + '    0 4px 16px rgba(0,0,0,0.18),\n'
  + '    0 0 0 1px rgba(0,0,0,0.06);\n'
  + '  /* Pill shape */\n'
  + '  border-radius:50px;\n'
  + '  padding:6px 18px 6px 10px;\n'
  + '  /* Fluid organic bounce */\n'
  + '  transition:\n'
  + '    transform    0.62s cubic-bezier(0.68,-0.6,0.32,1.6),\n'
  + '    background   0.6s ease,\n'
  + '    border-color 0.5s ease,\n'
  + '    box-shadow   0.5s ease,\n'
  + '    padding      0.45s cubic-bezier(0.68,-0.6,0.32,1.6);\n'
  + '  will-change:transform;\n'
  + '}\n'
  + '#choco-island:hover{\n'
  + '  transform:translateX(-50%) scaleX(1.10) scaleY(1.12);\n'
  + '  box-shadow:\n'
  + '    inset 0 1.5px 2px rgba(255,255,255,0.32),\n'
  + '    0 18px 52px rgba(0,0,0,0.35),\n'
  + '    0 6px 20px rgba(0,0,0,0.22),\n'
  + '    0 0 0 2px rgba(232,147,10,0.18);\n'
  + '}\n'
  + '#choco-island:active{\n'
  + '  transform:translateX(-50%) scaleX(0.94) scaleY(0.91);\n'
  + '  transition:transform 0.16s cubic-bezier(0.68,-0.6,0.32,1.6);\n'
  + '}\n'
  + '#choco-island.island-toggling{\n'
  + '  transform:translateX(-50%) scaleX(1.18) scaleY(0.85);\n'
  + '  transition:transform 0.22s cubic-bezier(0.68,-0.6,0.32,1.6);\n'
  + '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH E — Ripple overlay: warna disesuaikan ke palet baru
// ════════════════════════════════════════════════════════════
applyPatch(
  'Ripple overlay colors — espresso/cream',

  '      ripple.style.background = nextTheme === "dark"\n'
  + '        ? "rgba(8,8,30,0.9)"\n'
  + '        : "rgba(240,240,255,0.9)";',

  '      ripple.style.background = nextTheme === "dark"\n'
  + '        ? "rgba(10,5,3,0.92)"\n'
  + '        : "rgba(253,245,220,0.92)";'
);

// ════════════════════════════════════════════════════════════
//  PATCH F — ThemeEngine._applyTheme: tambahkan easter egg
//  neon sign visibility + body class untuk dark-specific styles
// ════════════════════════════════════════════════════════════
applyPatch(
  'ThemeEngine._applyTheme — inject neon sign easter egg toggle',

  '    _applyTheme(theme) {\n'
  + '      document.documentElement.setAttribute("data-theme", theme);\n'
  + '      localStorage.setItem(this.STORAGE_KEY, theme);\n'
  + '      this._updateIsland(theme);\n'
  + '    },',

  '    _applyTheme(theme) {\n'
  + '      document.documentElement.setAttribute("data-theme", theme);\n'
  + '      localStorage.setItem(this.STORAGE_KEY, theme);\n'
  + '      this._updateIsland(theme);\n'
  + '      this._toggleEasterEgg(theme);\n'
  + '    },\n'
  + '\n'
  + '    _toggleEasterEgg(theme) {\n'
  + '      var neon = document.getElementById("chocolab-neon");\n'
  + '      if (!neon) {\n'
  + '        neon = document.createElement("div");\n'
  + '        neon.id = "chocolab-neon";\n'
  + '        neon.setAttribute("aria-hidden", "true");\n'
  + '        neon.innerHTML = \'<span class="neon-line">ChocoLab</span>\'\n'
  + '          + \'<span class="neon-divider"></span>\'\n'
  + '          + \'<span class="neon-line">After Hours</span>\';\n'
  + '        document.body.appendChild(neon);\n'
  + '      }\n'
  + '      if (theme === "dark") {\n'
  + '        neon.style.display = "block";\n'
  + '        neon.style.opacity = "0";\n'
  + '        neon.style.transition = "opacity 1.4s ease";\n'
  + '        requestAnimationFrame(function() {\n'
  + '          requestAnimationFrame(function() {\n'
  + '            neon.style.opacity = "1";\n'
  + '          });\n'
  + '        });\n'
  + '      } else {\n'
  + '        neon.style.transition = "opacity 0.6s ease";\n'
  + '        neon.style.opacity = "0";\n'
  + '        setTimeout(function() { neon.style.display = "none"; }, 650);\n'
  + '      }\n'
  + '    },'
);

// ════════════════════════════════════════════════════════════
//  PATCH G — Anti-FOUC inline script: update untuk palet baru
//  Harus jalan sebelum DOM parse, sudah ada di app.js tapi
//  kita pastikan format-nya benar (tidak ada perubahan logic,
//  cukup pastikan posisinya terjaga — ini verifikasi saja)
// ════════════════════════════════════════════════════════════
//  File sudah punya blocking script:
//  <script>(function(){var s=localStorage.getItem("choco-theme");...})();</script>
//  Tidak perlu patch — sudah ada dan sudah correct.

// ════════════════════════════════════════════════════════════
//  PATCH H — Island label color: update text warna amber di dark
// ════════════════════════════════════════════════════════════
applyPatch(
  'Island label color transition update',

  '    _updateIsland(theme) {\n'
  + '      var label = document.querySelector(".island-label");\n'
  + '      if (!label) return;\n'
  + '      label.textContent = theme === "dark" ? "Dark" : "Light";\n'
  + '      var island = document.getElementById("choco-island");\n'
  + '      if (island) {\n'
  + '        island.setAttribute("aria-label",\n'
  + '          theme === "dark" ? "Switch to light mode" : "Switch to dark mode");\n'
  + '      }\n'
  + '    }',

  '    _updateIsland(theme) {\n'
  + '      var label = document.querySelector(".island-label");\n'
  + '      if (!label) return;\n'
  + '      label.textContent = theme === "dark" ? "Dark" : "Light";\n'
  + '      label.style.color = theme === "dark" ? "#E8930A" : "";\n'
  + '      var island = document.getElementById("choco-island");\n'
  + '      if (island) {\n'
  + '        island.setAttribute("aria-label",\n'
  + '          theme === "dark" ? "Switch to light mode" : "Switch to dark mode");\n'
  + '      }\n'
  + '    }'
);

// ════════════════════════════════════════════════════════════
//  PATCH I — Sun morph: ganti warna spoke & sun icon di island
//  agar cocok dengan palet baru (golden honey, bukan pure yellow)
// ════════════════════════════════════════════════════════════
applyPatch(
  'Island icon — sun color update (golden-honey)',

  '<circle cx="16" cy="16" r="7" fill="#FFE566" stroke="#FFCC00" stroke-width="1.5"/>',
  '<circle cx="16" cy="16" r="7" fill="#FFD766" stroke="#F0A500" stroke-width="1.5"/>'
);

// ════════════════════════════════════════════════════════════
//  PATCH J — Body/scroller bg tweak: pastikan light mode render
//  dengan warna cream (override hardcoded #fff dan #1a1a8a lama)
// ════════════════════════════════════════════════════════════
applyPatch(
  'Body bg + scroller bg hardcoded value → CSS var fallback',

  '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}\n'
  + 'html,body{height:100%;overflow:hidden;background:#1a1a8a;}',

  '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}\n'
  + 'html,body{height:100%;overflow:hidden;background:#3D1F08;}'
);

applyPatch(
  'Scroller hardcoded bg white → cream',

  '#scroller{\n'
  + '  flex:1;\n'
  + '  overflow-y:auto;\n'
  + '  overflow-x:hidden;\n'
  + '  margin:0;\n'
  + '  scrollbar-width:none;\n'
  + '  -webkit-overflow-scrolling:touch;\n'
  + '  background:#fff;\n'
  + '  position:relative;\n'
  + '  scroll-behavior:auto;\n'
  + '}',

  '#scroller{\n'
  + '  flex:1;\n'
  + '  overflow-y:auto;\n'
  + '  overflow-x:hidden;\n'
  + '  margin:0;\n'
  + '  scrollbar-width:none;\n'
  + '  -webkit-overflow-scrolling:touch;\n'
  + '  background:var(--cl-bg-scroller,#FDFBF7);\n'
  + '  position:relative;\n'
  + '  scroll-behavior:auto;\n'
  + '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH K — sgap hardcoded blue → CSS var
// ════════════════════════════════════════════════════════════
applyPatch(
  'sgap hardcoded #3333ff → var(--cl-bg-gap)',

  '.sgap{height:10px;background:#3333ff;}',
  '.sgap{height:10px;background:var(--cl-bg-gap,#C17A2A);}'
);

// ════════════════════════════════════════════════════════════
//  PATCH L — Header/footer hardcoded colors → CSS var
// ════════════════════════════════════════════════════════════
applyPatch(
  'sh-hdr hardcoded #1a1aaa → var(--cl-bg-header)',

  '.sh-hdr{\n'
  + '  background:#1a1aaa;\n'
  + '  text-align:center;',

  '.sh-hdr{\n'
  + '  background:var(--cl-bg-header,#3D1F08);\n'
  + '  text-align:center;'
);

applyPatch(
  'sh-band.top hardcoded gradient → var(--cl-bg-band-top)',

  '.sh-band.top{background:linear-gradient(180deg,#2020cc 0%,#3535ee 100%);}',
  '.sh-band.top{background:var(--cl-bg-band-top,linear-gradient(180deg,#5C2E0A 0%,#7A3D10 100%));}'
);

applyPatch(
  'sh-band.bot hardcoded gradient → var(--cl-bg-band-bot)',

  '.sh-band.bot{background:linear-gradient(0deg,#2020cc 0%,#3535ee 100%);}',
  '.sh-band.bot{background:var(--cl-bg-band-bot,linear-gradient(0deg,#5C2E0A 0%,#7A3D10 100%));}'
);

applyPatch(
  'sh-ftr hardcoded #1a1aaa → var(--cl-bg-footer)',

  '.sh-ftr{background:#1a1aaa;padding:14px 20px 18px;flex-shrink:0;}',
  '.sh-ftr{background:var(--cl-bg-footer,#3D1F08);padding:14px 20px 18px;flex-shrink:0;}'
);

// ════════════════════════════════════════════════════════════
//  PATCH M — glass-card hardcoded border color → CSS var
// ════════════════════════════════════════════════════════════
applyPatch(
  'glass-card hardcoded border rgba(51,51,255) → var(--cl-card-border)',

  '.glass-card{\n'
  + '  position:relative;\n'
  + '  background:rgba(255,255,255,0.97);\n'
  + '  backdrop-filter:blur(28px) saturate(2.0) brightness(1.08);\n'
  + '  -webkit-backdrop-filter:blur(28px) saturate(2.0) brightness(1.08);\n'
  + '  border:2px solid rgba(51,51,255,0.30);',

  '.glass-card{\n'
  + '  position:relative;\n'
  + '  background:var(--cl-card-bg,rgba(253,248,235,0.97));\n'
  + '  backdrop-filter:blur(28px) saturate(2.0) brightness(1.08);\n'
  + '  -webkit-backdrop-filter:blur(28px) saturate(2.0) brightness(1.08);\n'
  + '  border:2px solid var(--cl-card-border,rgba(193,122,42,0.30));'
);

// ════════════════════════════════════════════════════════════
//  PATCH N — grid-bg hardcoded → CSS vars
// ════════════════════════════════════════════════════════════
applyPatch(
  'grid-bg hardcoded bg → var(--cl-grid-bg)',

  '.grid-bg{\n'
  + '  background-color:#f8f8ff;\n'
  + '  background-image:\n'
  + '    linear-gradient(rgba(50,50,255,.09) 1px,transparent 1px),\n'
  + '    linear-gradient(90deg,rgba(50,50,255,.09) 1px,transparent 1px);\n'
  + '  background-size:22px 22px;\n'
  + '}',

  '.grid-bg{\n'
  + '  background-color:var(--cl-grid-bg,#FDF5E6);\n'
  + '  background-image:\n'
  + '    linear-gradient(var(--cl-grid-line,rgba(193,122,42,.09)) 1px,transparent 1px),\n'
  + '    linear-gradient(90deg,var(--cl-grid-line,rgba(193,122,42,.09)) 1px,transparent 1px);\n'
  + '  background-size:22px 22px;\n'
  + '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH O — Corner marks & sparkle: hardcoded #3333ff → var
// ════════════════════════════════════════════════════════════
applyPatch(
  'Corner marks hardcoded #3333ff → var(--cl-corner-color)',

  '.cm{position:absolute;width:22px;height:22px;border-color:#3333ff;border-style:solid;z-index:4;}',
  '.cm{position:absolute;width:22px;height:22px;border-color:var(--cl-corner-color,#C17A2A);border-style:solid;z-index:4;}'
);

applyPatch(
  'Sparkle svg fill hardcoded #3333ff → var(--cl-accent)',

  '.spk svg{fill:#3333ff;}',
  '.spk svg{fill:var(--cl-accent,#C17A2A);}'
);

// ════════════════════════════════════════════════════════════
//  SUMMARY
// ════════════════════════════════════════════════════════════
console.log('');
console.log('  +------------------------------------------+');
console.log('  |  ChocoLab Theme Patch — SELESAI          |');
console.log('  |  Total patch diterapkan : ' + patchCount + '/' + 18 + '            |');
console.log('  |  File dimodifikasi      : ' + TARGET + '  ');
console.log('  |  Backup tersedia di     : ' + BAK + '  ');
console.log('  +------------------------------------------+');
console.log('');

if (patchCount < 10) {
  console.warn('[PATCH WARN] Kurang dari 10 patch berhasil. Periksa versi app.js Anda.');
  console.warn('             Restore dari backup: cp "' + BAK + '" "' + TARGET + '"');
} else {
  // Tulis file hasil
  fs.writeFileSync(TARGET, src, 'utf8');
  console.log('[PATCH] app.js berhasil diperbarui. Restart server: node app.js');
}
