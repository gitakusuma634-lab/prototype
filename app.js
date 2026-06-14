// ============================================================
//  ChocoLab — app.js  ✦ UPGRADED
//  Node.js / Express monolith
//  Cinematic Animations · Bright Menu · Decorative Elements
//  Tunnel Scroll v2 · Variable Font Breathing v2
// ============================================================

const express = require("express");
const path    = require("path");
const fs      = require("fs");
const app     = express();
const PORT    = process.env.PORT || 3000;

app.use("/assets", express.static(path.join(__dirname, "assets")));

// ── Font Loader ──────────────────────────────────────────────
function fontBase64(file) {
  try { return fs.readFileSync(path.join(__dirname, "assets", file)).toString("base64"); }
  catch (e) { return null; }
}
function makeFontFace(family, weight, ext, b64, fallback) {
  const fmt  = ext === "ttf" ? "truetype" : "opentype";
  const mime = ext === "ttf" ? "font/ttf"  : "font/otf";
  if (b64) return `@font-face{font-family:'${family}';src:url('data:${mime};base64,${b64}') format('${fmt}');font-weight:${weight};font-style:normal;}`;
  return `@font-face{font-family:'${family}';src:url('/assets/${fallback}') format('${fmt}');font-weight:${weight};}`;
}

// ── Helper Partials ──────────────────────────────────────────
function rep(s, n) { return s.repeat(n); }
function cm() {
  return `<div class="cm tl"></div><div class="cm tr"></div><div class="cm bl"></div><div class="cm br"></div>`;
}
function spk(sz) {
  return `<span class="spk"><svg width="${sz}" height="${sz}" viewBox="0 0 24 24"><path d="M12 2L9.6 9.4H2l6.2 4.5-2.4 7.4L12 17l6.2 4.3-2.4-7.4L22 9.4h-7.6z"/></svg></span>`;
}
function marqueeRows(label) {
  const item  = `<span class="mrq-t">${label}&nbsp;&nbsp;</span>`;
  const inner = rep(item, 12);
  return Array.from({ length: 7 }, (_, i) =>
    `<div class="mrq-row"><div class="mrq-in${i % 2 === 1 ? " mrq-rev" : ""}">${inner}</div></div>`
  ).join("");
}

// ── SVG Noise Filter ─────────────────────────────────────────
const NOISE_SVG = `<svg style="position:absolute;width:0;height:0;pointer-events:none;" aria-hidden="true">
  <defs>
    <filter id="grain" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.72 0.75" numOctaves="4" seed="8" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
      <feComposite in="SourceGraphic" in2="grayNoise" operator="in" result="noisy"/>
      <feBlend in="SourceGraphic" in2="noisy" mode="overlay" result="blended"/>
      <feComposite in="blended" in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>
</svg>`;

// ── DATA LAYER ────────────────────────────────────────────────
const PASTRIES = [
  {
    num:   "00.01",
    name:  "The Cream Puff<br><span style='font-size:.72em;'>(Choux &agrave; la Cr&egrave;me)</span>",
    price: "&euro;.2",
    img:   "creampuff.png",
    dname: "Cream Puff",
    dtxt:  "Try our signature Cream Puff, or as the French call it, choux &agrave; la cr&egrave;me. Perfectly baked, light, and airy pastry shell finished with a delicate dusting of powdered sugar. The real magic lies inside: a generous amount of homemade, silky-smooth vanilla pastry cream. Rich, decadent, and perfectly balanced&mdash;the ultimate treat to pair with your morning coffee."
  },
  {
    num:   "00.02",
    name:  "Cinnamon Roll",
    price: "&euro;.2",
    img:   "cinnamonroll.png",
    dname: "Cinnamon Roll",
    dtxt:  "Our premium Cinnamon Roll features a super soft, fluffy, pillowy yeast dough layered with a rich, aromatic blend of premium Ceylon cinnamon and caramelized brown sugar, drizzled with a warm, glossy vanilla glaze that seeps perfectly into every single swirl."
  },
  {
    num:   "00.03",
    name:  "The Classic Croissant",
    price: "&euro;.3",
    img:   "croissant.png",
    dname: "Croissant",
    dtxt:  "Crafted with premium European butter, our Croissant features dozens of delicate, crispy laminated layers on the outside and a soft, airy, buttery center. It is the ultimate indulgent treat for your morning&mdash;golden, flaky, and irresistible."
  }
];

const DRINKS = [
  {
    label: "Sugar Tea",
    img:   "sugar-tea.png",
    name:  "Sugar Tea",
    desc:  "Craving a serious reset? Just one look at this frosted glass is enough to cool you down. Deep, rich brew, ice cubes piled high, a crisp layer of condensation. One sip through that straw and the sweet, icy chill instantly hits your throat, wiping out the heat and bringing you right back to life!",
    price: "&euro;.3"
  },
  {
    label: "Caffe Latte",
    img:   "caffe-latte.png",
    name:  "Caffe Latte",
    desc:  "A beautifully crafted Caffe Latte made with a double shot of rich espresso and velvety steamed milk, topped with delicate latte art. Every sip is smooth, warm, and perfectly balanced&mdash;the ideal companion for a quiet morning at ChocoLab.",
    price: "&euro;.4"
  }
];

// ── Coffee Bean SVG (decorative) ─────────────────────────────
function coffeeBeans(count) {
  const positions = [
    { x:8,  y:15, r:12,  d:0    },
    { x:88, y:22, r:-18, d:0.8  },
    { x:18, y:72, r:25,  d:1.6  },
    { x:82, y:65, r:-8,  d:2.4  },
    { x:50, y:88, r:15,  d:3.2  },
    { x:34, y:40, r:-22, d:0.4  },
    { x:72, y:48, r:30,  d:1.2  },
    { x:92, y:85, r:-14, d:2.0  },
  ].slice(0, count);

  return positions.map(({ x, y, r, d }) => `
    <div class="deco-bean" style="left:${x}%;top:${y}%;--rot:${r}deg;--delay:${d}s;">
      <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
        <ellipse cx="9" cy="5.5" rx="8.5" ry="5" fill="rgba(80,44,16,0.13)" rx="8.5" ry="5"/>
        <path d="M9 1.5 Q9 5.5 9 9.5" stroke="rgba(80,44,16,0.22)" stroke-width="1.2" stroke-linecap="round"/>
      </svg>
    </div>`).join("");
}

// ── Sugar Dust Particles ──────────────────────────────────────
function sugarDust(count) {
  return Array.from({ length: count }, (_, i) => {
    const x = 10 + Math.round((i / count) * 80);
    const d = (i * 0.37).toFixed(2);
    const s = 3 + (i % 3);
    return `<div class="deco-sugar" style="left:${x}%;--delay:${d}s;--size:${s}px;"></div>`;
  }).join("");
}

// ── Steam Bubbles ─────────────────────────────────────────────
function steamBubbles(count) {
  return Array.from({ length: count }, (_, i) => {
    const x = 15 + (i * 18) % 72;
    const d = (i * 0.55).toFixed(2);
    const s = 5 + (i % 4) * 2;
    return `<div class="deco-steam" style="left:${x}%;--delay:${d}s;--size:${s}px;"></div>`;
  }).join("");
}

// ── RENDERERS ────────────────────────────────────────────────
function pastryItem({ num, name, price, img, dname, dtxt }) {
  return `
<article class="pi tunnel-item glass-card" data-tunnel>
  ${cm()}
  <div class="glass-noise" aria-hidden="true"></div>
  <div class="deco-beans-wrap" aria-hidden="true">${coffeeBeans(6)}</div>
  <div class="deco-sugar-wrap" aria-hidden="true">${sugarDust(8)}</div>
  <p class="pi-num rv">${num}</p>
  <div class="pi-title rv d1">
    <div class="pi-name breath-text">${name}</div>
    <button class="pi-plus" data-name="${dname}" data-price="${price}" aria-label="Add ${dname}">
      <svg viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/></svg>
    </button>
  </div>
  <div class="pi-img-area rv d2">
    <div class="pi-blob"></div>
    <div class="pi-badge"><span>${price}</span></div>
    <div class="pi-imgw"><img src="/assets/${img}" alt="${dname}" loading="lazy" class="food-img"/></div>
    <div class="pi-spk">${spk(14)}</div>
  </div>
  <div class="pi-desc rv d3">
    <p class="pi-dname">${dname}</p>
    <p class="pi-dtxt">${dtxt}</p>
  </div>
</article>`;
}

function drinkItem({ label, img, name, desc, price }, idx) {
  // Nomor seri sama seperti pastryItem — "01.01", "01.02", dst
  const num = "01.0" + (idx + 1);
  return `
<article class="dk-item tunnel-item glass-card" data-tunnel>
  ${cm()}
  <div class="glass-noise" aria-hidden="true"></div>
  <div class="mrq-bg" aria-hidden="true">${marqueeRows(label)}</div>
  <div class="dk-steam-wrap" aria-hidden="true">${steamBubbles(6)}</div>

  <!-- Nomor seri — center simetris -->
  <p class="pi-num dk-num rv" style="width:100%;text-align:center;">${num}</p>

  <!-- Title row: nama + tombol sejajar center -->
  <div class="pi-title dk-title-row rv d1">
    <div class="dk-name breath-text">${name}</div>
    <button class="pi-plus dk-plus-btn" data-name="${name}" data-price="${price}" aria-label="Add ${name}">
      <svg viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/></svg>
    </button>
  </div>

  <!-- Area gambar + badge harga — identik pi-img-area -->
  <div class="pi-img-area dk-img-area rv d2">
    <div class="pi-blob dk-blob"></div>
    <div class="pi-badge"><span>${price}</span></div>
    <div class="pi-imgw dk-imgw">
      <img src="/assets/${img}" alt="${name}" loading="lazy" class="food-img dk-food"/>
    </div>
    <div class="pi-spk">${spk(14)}</div>
  </div>

  <!-- Copywriting persuasif — tagline puitis -->
  <div class="dk-tagline-wrap rv d3">
    <p class="dk-tagline">✦ &nbsp;Every sip, a ceremony. Every cup, a memory.&nbsp; ✦</p>
  </div>

  <!-- Deskripsi — identik pi-desc -->
  <div class="pi-desc dk-desc-box rv d4">
    <p class="pi-dname">${name}</p>
    <p class="pi-dtxt dk-desc-txt">${desc}</p>
    <p class="dk-cta-copy">&mdash; Order yours. Taste the difference. &mdash;</p>
  </div>
</article>`;
}

// ─────────────────────────────────────────────────────────────
function buildHTML() {

  const krovenB64    = fontBase64("GC-KROVEN-DEMO-BF68ad52ea8c3fb.ttf");
  const natureBlkB64 = fontBase64("ZTNature-Black.otf");
  const natureSbB64  = fontBase64("ZTNature-SemiBold.otf");
  const estrellaB64  = fontBase64("estrella-early.otf");

  const fontCSS = [
    makeFontFace("GCKroven", "normal", "ttf", krovenB64,    "GC-KROVEN-DEMO-BF68ad52ea8c3fb.ttf"),
    makeFontFace("ZTNature", "900",    "otf", natureBlkB64, "ZTNature-Black.otf"),
    makeFontFace("ZTNature", "600",    "otf", natureSbB64,  "ZTNature-SemiBold.otf"),
    makeFontFace("Estrella", "normal", "otf", estrellaB64,  "estrella-early.otf"),
    `#cart-btn > svg { display: none !important; }`,
    `#cart-btn {
      background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="9" cy="21" r="1"%3E%3C/circle%3E%3Ccircle cx="20" cy="21" r="1"%3E%3C/circle%3E%3Cpath d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"%3E%3C/path%3E%3C/svg%3E') !important;
      background-size: 22px !important;
      background-repeat: no-repeat !important;
      background-position: center !important;
    }`
  ].join("\n");

  // ════════════════════════════════════════════════════════════
  //  CSS — FULL UPGRADED
  // ════════════════════════════════════════════════════════════
  const CSS = fontCSS + `

/* ── RESET ── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html,body{height:100%;overflow:hidden;background:#1a1a8a;}

/* ── SHELL ── */
body{display:flex;flex-direction:column;height:100dvh;}
.sh-hdr{
  background:#1a1aaa;
  text-align:center;
  padding:13px 0 11px;
  flex-shrink:0;
  border-bottom:3px solid rgba(255,255,255,0.22);
  box-shadow:0 3px 0 rgba(0,0,80,0.18),0 6px 24px rgba(0,0,100,0.22);
  z-index:50;
  position:relative;
  /* cinematic: subtle shimmer on header */
  overflow:hidden;
}
.sh-hdr::after{
  content:'';
  position:absolute;
  inset:0;
  background:linear-gradient(105deg,transparent 38%,rgba(255,255,255,0.07) 50%,transparent 62%);
  animation:headerShimmer 2.8s cubic-bezier(0.4,0,0.6,1) infinite;
  pointer-events:none;
}
.sh-hdr span{
  font-family:'GCKroven',sans-serif;
  font-size:clamp(19px,5vw,25px);
  color:#fff;
  letter-spacing:1px;
  position:relative;
  z-index:1;
}
.sh-band{height:16px;flex-shrink:0;}
.sh-band.top{background:linear-gradient(180deg,#2020cc 0%,#3535ee 100%);}
.sh-band.bot{background:linear-gradient(0deg,#2020cc 0%,#3535ee 100%);}
.sh-ftr{background:#1a1aaa;padding:14px 20px 18px;flex-shrink:0;}
.sh-ftr span{font-family:'GCKroven',sans-serif;font-size:clamp(30px,9vw,50px);color:#fff;letter-spacing:-1px;line-height:1;}

/* ── SCROLLER ── */
#scroller{
  flex:1;
  overflow-y:auto;
  overflow-x:hidden;
  margin:0;
  scrollbar-width:none;
  -webkit-overflow-scrolling:touch;
  background:#fff;
  position:relative;
  scroll-behavior:auto;
}
#scroller::-webkit-scrollbar{display:none;}

/* ── GRID BG ── */
.grid-bg{
  background-color:#f8f8ff;
  background-image:
    linear-gradient(rgba(50,50,255,.09) 1px,transparent 1px),
    linear-gradient(90deg,rgba(50,50,255,.09) 1px,transparent 1px);
  background-size:22px 22px;
}

/* ── CORNER MARKS ── */
.cm{position:absolute;width:22px;height:22px;border-color:#3333ff;border-style:solid;z-index:4;}
.cm.tl{top:7px;left:7px;border-width:2px 0 0 2px;}
.cm.tr{top:7px;right:7px;border-width:2px 2px 0 0;}
.cm.bl{bottom:7px;left:7px;border-width:0 0 2px 2px;}
.cm.br{bottom:7px;right:7px;border-width:0 2px 2px 0;}

/* ── SPARKLE ── */
.spk{display:inline-block;animation:spinStar 4s linear infinite;}
.spk svg{fill:#3333ff;}
.pi-spk{position:absolute;right:26px;bottom:16px;z-index:3;pointer-events:none;}
.pi-spk .spk{animation-duration:3.5s;}

/* ── GAP ── */
.sgap{height:10px;background:#3333ff;}

/* ══════════════════════════════════════
   PATCH 3: Performance containment
   • contain:layout style → browser tahu perubahan
     elemen tidak bocor ke luar (isolasi layout)
   • Section2 onwards: isolate stacking context
══════════════════════════════════════ */
#shop-entrance,#about,#pastry,#drinks,#credits{
  contain:layout style;
  isolation:isolate;
}
/* Pastikan marquee rows tidak trigger reflow global */
.mrq-in,.mrq-in.mrq-rev{
  contain:strict;
  will-change:transform;
}

/* ══════════════════════════════════════
   GLASSMORPHIC MATERIAL + SVG GRAIN
   UPGRADED: brighter base, refined shadow
══════════════════════════════════════ */
.glass-card{
  position:relative;
  background:rgba(255,255,255,0.97);
  backdrop-filter:blur(28px) saturate(2.0) brightness(1.08);
  -webkit-backdrop-filter:blur(28px) saturate(2.0) brightness(1.08);
  border:2px solid rgba(51,51,255,0.30);
  box-shadow:
    0 2px 0 rgba(255,255,255,0.98) inset,
    4px 4px 0 rgba(51,51,255,0.14),
    0 18px 56px rgba(0,0,180,0.12),
    0 2px 0 rgba(50,50,255,0.12);
  overflow:hidden;
}
/* Grain overlay — same as before, opacity lowered slightly for brightness */
.glass-noise{
  position:absolute;
  inset:-20%;
  width:140%;
  height:140%;
  pointer-events:none;
  z-index:1;
  opacity:0.042;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:180px 180px;
  animation:grainShift 0.9s steps(2) infinite;
  mix-blend-mode:overlay;
}
@keyframes grainShift{
  0%  { transform:translate(0,0); }
  25% { transform:translate(-3px,2px); }
  50% { transform:translate(3px,-2px); }
  75% { transform:translate(-2px,-3px); }
  100%{ transform:translate(0,0); }
}

/* ══════════════════════════════════════
   TUNNEL SCROLL v3  [PATCH 1: Architectural Edition]
   — Nuansa arsitektural: presisi, megah, struktural
   — Enter: naik dari bawah seperti lift fondasi
   — Exit : terlipat ke atas seperti closing blueprint
   — 60 FPS guaranteed: HANYA transform + opacity
   — will-change diterapkan dengan tepat (tidak pada parent)
   — filter:blur DIHAPUS dari idle state (layout thrash risk)
══════════════════════════════════════ */
.tunnel-item{
  will-change:transform,opacity;
  transform:translate3d(-10px, 80px, -260px) scale(0.64) rotateX(7deg) rotateY(-4deg);
  opacity:0;
  transition:
    transform 1.10s cubic-bezier(0.10,0.82,0.20,1.12),
    opacity   0.90s cubic-bezier(0.12,0.82,0.22,1.06);
  transform-style:preserve-3d;
}
.tunnel-item.t-enter{
  transform:translate3d(0,0,0) scale(1) rotateX(0deg) rotateY(0deg);
  opacity:1;
}
.tunnel-item.t-exit{
  transform:translate3d(0,-110px,-900px) scale(0.28) rotateX(-32deg) rotateY(12deg) rotateZ(-3deg);
  opacity:0;
  filter:blur(0px);
  transition:
    transform 0.48s cubic-bezier(0.80,0,0.98,0.04),
    opacity   0.26s cubic-bezier(0.80,0,1.0,0.08);
}

/* Perspective wrapper — perspektif lebih dalam + origin rendah */
#pastry,#drinks{
  perspective:1600px;
  perspective-origin:50% 38%;
}

/* ══════════════════════════════════════
   VARIABLE FONT BREATHING v3  [PATCH 3: 60 FPS Sequencing]
   • breathIdle: 7s cycle — napas lebih panjang, tidak gelisah
   • breathActive: masuk tunnel → expand penuh (900/125) lalu
     oscillate dengan amplitudo besar → terasa hidup
   • Catatan: font-variation-settings tidak di-GPU, tapi
     tidak menyebabkan layout reflow → aman di 60 FPS
══════════════════════════════════════ */
.breath-text{
  font-variation-settings:'wght' 580,'wdth' 72;
  transition:
    font-variation-settings 1.3s cubic-bezier(0.22,0.68,0,1.14);
  animation:breathIdle 7s ease-in-out infinite;
}
@keyframes breathIdle{
  0%,100%{ font-variation-settings:'wght' 560,'wdth' 68; }
  28%    { font-variation-settings:'wght' 720,'wdth' 92; }
  56%    { font-variation-settings:'wght' 640,'wdth' 80; }
  80%    { font-variation-settings:'wght' 700,'wdth' 88; }
}

.tunnel-item.t-enter .breath-text{
  font-variation-settings:'wght' 900,'wdth' 125;
  animation:breathActive 4.2s ease-in-out infinite;
}
@keyframes breathActive{
  0%,100%{ font-variation-settings:'wght' 900,'wdth' 125; }
  28%    { font-variation-settings:'wght' 800,'wdth' 105; }
  56%    { font-variation-settings:'wght' 860,'wdth' 118; }
  84%    { font-variation-settings:'wght' 830,'wdth' 112; }
}

/* ══════════════════════════════════════
   SECTION 0 — INTRO
══════════════════════════════════════ */
#intro{position:relative;min-height:100vh;overflow:hidden;background:linear-gradient(180deg,#4A90D9 0%,#78C8F0 12%,#A8DCF8 26%,#C8EEFF 40%,#DCF5E8 56%,#C5E8A0 70%,#92CC52 82%,#5E9F2A 92%,#3D7A18 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;}
.sun{position:absolute;top:6%;left:50%;transform:translateX(-50%);width:clamp(70px,18vw,110px);height:clamp(70px,18vw,110px);background:radial-gradient(circle at 48% 44%,#fff7a0 0%,#FFE566 35%,#FFCC00 65%,#FFB300 100%);border-radius:50%;box-shadow:0 0 0 8px rgba(255,245,120,0.22),0 0 50px 22px rgba(255,220,0,0.55),0 0 100px 50px rgba(255,185,0,0.32),0 0 180px 90px rgba(255,165,0,0.15),0 0 280px 140px rgba(255,140,0,0.07);animation:sunPulseGod 3.5s ease-in-out infinite;z-index:4;}
.sun-ray{position:absolute;top:50%;left:50%;width:clamp(110px,30vw,170px);height:clamp(110px,30vw,170px);transform:translate(-50%,-50%);animation:sunRayRot 10s linear infinite;z-index:3;}
.sun-ray::before,.sun-ray::after{content:'';position:absolute;top:50%;left:50%;width:130%;height:4px;background:linear-gradient(90deg,transparent,rgba(255,235,0,0.7),transparent);border-radius:4px;filter:blur(1px);}
.sun-ray::before{transform:translate(-50%,-50%) rotate(0deg);}
.sun-ray::after{transform:translate(-50%,-50%) rotate(45deg);}
.cloud{position:absolute;background:rgba(255,255,255,0.92);border-radius:50px;pointer-events:none;animation:cloudLightPulse 6s ease-in-out infinite;}
.cloud::before,.cloud::after{content:'';position:absolute;background:rgba(255,255,255,0.92);border-radius:50%;}
.sun-flare{
  position:absolute;
  top:calc(6% + clamp(35px,9vw,55px));
  left:50%;
  width:clamp(200px,55vw,340px);
  height:clamp(120px,32vw,200px);
  background:radial-gradient(ellipse at 50% 0%,rgba(255,240,120,0.38) 0%,rgba(255,215,80,0.18) 35%,transparent 70%);
  transform:translateX(-50%);
  pointer-events:none;
  z-index:3;
  animation:lightFlare 4s ease-in-out infinite;
  border-radius:50%;
}
.sun-beams{
  position:absolute;
  top:6%;
  left:50%;
  width:clamp(280px,75vw,520px);
  height:clamp(280px,75vw,520px);
  transform:translate(-50%,-8%);
  pointer-events:none;
  z-index:2;
  background:
    conic-gradient(
      from 0deg at 50% 50%,
      transparent 0deg,rgba(255,235,100,0.09) 3deg,transparent 6deg,
      transparent 18deg,rgba(255,230,80,0.07) 21deg,transparent 24deg,
      transparent 40deg,rgba(255,240,120,0.08) 43deg,transparent 46deg,
      transparent 58deg,rgba(255,225,90,0.06) 61deg,transparent 64deg,
      transparent 80deg,rgba(255,235,100,0.09) 83deg,transparent 86deg,
      transparent 100deg,rgba(255,228,88,0.07) 103deg,transparent 106deg,
      transparent 120deg,rgba(255,240,120,0.08) 123deg,transparent 126deg,
      transparent 145deg,rgba(255,230,80,0.06) 148deg,transparent 151deg,
      transparent 160deg,rgba(255,235,100,0.09) 163deg,transparent 166deg,
      transparent 180deg,rgba(255,225,90,0.07) 183deg,transparent 186deg,
      transparent 200deg,rgba(255,240,120,0.08) 203deg,transparent 206deg,
      transparent 218deg,rgba(255,228,88,0.06) 221deg,transparent 224deg,
      transparent 240deg,rgba(255,235,100,0.09) 243deg,transparent 246deg,
      transparent 260deg,rgba(255,230,80,0.07) 263deg,transparent 266deg,
      transparent 280deg,rgba(255,240,120,0.08) 283deg,transparent 286deg,
      transparent 300deg,rgba(255,225,90,0.06) 303deg,transparent 306deg,
      transparent 318deg,rgba(255,235,100,0.09) 321deg,transparent 324deg,
      transparent 340deg,rgba(255,228,88,0.07) 343deg,transparent 346deg,
      transparent 360deg
    );
  border-radius:50%;
  animation:sunRayRot 28s linear infinite;
  mask:radial-gradient(circle at 50% 50%,transparent 12%,black 100%);
  -webkit-mask:radial-gradient(circle at 50% 50%,transparent 12%,black 100%);
  opacity:0.85;
}
.cloud-1{width:clamp(90px,22vw,140px);height:clamp(28px,7vw,45px);top:18%;left:-10%;animation:cloudDrift1 22s linear infinite;}
.cloud-1::before{width:60%;height:160%;top:-70%;left:15%;}
.cloud-1::after{width:45%;height:130%;top:-55%;left:45%;}
.cloud-2{width:clamp(70px,17vw,110px);height:clamp(22px,5.5vw,36px);top:25%;right:-8%;animation:cloudDrift2 28s linear infinite;}
.cloud-2::before{width:55%;height:150%;top:-65%;left:20%;}
.cloud-2::after{width:40%;height:120%;top:-50%;left:48%;}
.cloud-3{width:clamp(50px,13vw,80px);height:clamp(16px,4vw,26px);top:14%;left:20%;animation:cloudDrift3 35s linear infinite;}
.cloud-3::before{width:50%;height:145%;top:-60%;left:18%;}
.cloud-3::after{width:38%;height:115%;top:-48%;left:46%;}
.cloud-4{width:clamp(110px,28vw,180px);height:clamp(32px,8vw,55px);top:32%;left:-15%;animation:cloudDrift4 30s linear infinite 0s;opacity:0.82;}
.cloud-4::before{width:58%;height:155%;top:-72%;left:12%;}
.cloud-4::after{width:42%;height:125%;top:-58%;left:44%;}
.cloud-5{width:clamp(80px,20vw,130px);height:clamp(24px,6vw,40px);top:45%;right:-12%;animation:cloudDrift5 38s linear infinite 2s;opacity:0.72;}
.cloud-5::before{width:52%;height:148%;top:-68%;left:16%;}
.cloud-5::after{width:38%;height:118%;top:-52%;left:46%;}
.cloud-6{width:clamp(60px,15vw,100px);height:clamp(18px,4.5vw,30px);top:58%;left:5%;animation:cloudDrift6 42s linear infinite 6s;opacity:0.62;}
.cloud-6::before{width:55%;height:150%;top:-65%;left:14%;}
.cloud-6::after{width:40%;height:120%;top:-50%;left:46%;}
/* Gold floating particles in intro */
.intro-gold-dust{
  position:absolute;
  border-radius:50%;
  background:rgba(255,215,0,0.72);
  pointer-events:none;
  z-index:4;
  left:var(--gx,50%);
  top:var(--gy,50%);
  width:var(--gs,5px);
  height:var(--gs,5px);
  animation:goldDustFloat var(--gd,6s) ease-in-out var(--ga,0s) infinite;
  box-shadow:0 0 4px 2px rgba(255,200,0,0.35);
}
@keyframes goldDustFloat{
  0%{transform:translateY(0) scale(1);opacity:0;}
  15%{opacity:0.9;}
  50%{transform:translateY(-38px) translateX(8px) scale(1.18);opacity:0.7;}
  85%{opacity:0.4;}
  100%{transform:translateY(-72px) translateX(-6px) scale(0.6);opacity:0;}
}
/* Sun inner shimmer ring */
.sun-shimmer-ring{
  position:absolute;
  border-radius:50%;
  border:2px solid rgba(255,240,100,0.5);
  animation:ringExpand 3s ease-out infinite;
  pointer-events:none;
  z-index:5;
  left:50%;
  transform:translateX(-50%);
}
.sun-shimmer-ring:nth-child(1){top:5.2%;width:clamp(80px,20vw,120px);height:clamp(80px,20vw,120px);animation-delay:0s;}
.sun-shimmer-ring:nth-child(2){top:4.5%;width:clamp(110px,28vw,165px);height:clamp(110px,28vw,165px);animation-delay:1s;}
.sun-shimmer-ring:nth-child(3){top:3.8%;width:clamp(140px,36vw,210px);height:clamp(140px,36vw,210px);animation-delay:2s;}
@keyframes ringExpand{
  0%{opacity:0.8;transform:translateX(-50%) scale(0.88);}
  60%{opacity:0.3;transform:translateX(-50%) scale(1.12);}
  100%{opacity:0;transform:translateX(-50%) scale(1.38);}
}
.birds{position:absolute;top:22%;left:-15%;opacity:0.82;animation:birdSoar 22s cubic-bezier(0.4,0,0.6,1) 1.2s infinite;will-change:transform;z-index:6;display:flex;gap:6px;align-items:center;}
.bird{display:inline-block;width:clamp(14px,4vw,20px);height:clamp(5px,1.4vw,8px);border-top:2.5px solid #334;border-radius:50% 50% 0 0;animation:birdFlapFast 0.45s ease-in-out infinite;}
.bird:nth-child(2){animation-delay:0.12s;transform:scale(0.82) translateY(-4px);}
.bird:nth-child(3){animation-delay:0.25s;transform:scale(0.66) translateY(2px);}
.ground{position:absolute;bottom:0;left:0;right:0;height:22%;background:linear-gradient(180deg,#8BC34A 0%,#558B2F 100%);}
.ground-stripe{position:absolute;top:0;left:0;right:0;height:4px;background:rgba(255,255,255,0.15);}
.flower{position:absolute;bottom:16%;font-size:clamp(16px,4vw,24px);animation:flowerSway 3s ease-in-out infinite alternate;}
.flower:nth-child(2){animation-delay:0.8s;}.flower:nth-child(3){animation-delay:1.4s;}.flower:nth-child(4){animation-delay:0.4s;}
.intro-brand{position:relative;z-index:5;text-align:center;margin-top:clamp(-20px,0vh,20px);}
.intro-brand-title{font-family:'GCKroven',sans-serif;font-size:clamp(48px,15vw,82px);color:#fff;text-shadow:0 4px 32px rgba(255,200,0,0.45),0 2px 0 rgba(255,160,0,0.3),0 0 60px rgba(255,220,0,0.25);letter-spacing:-2px;line-height:0.98;animation:introBrandIn 1.2s cubic-bezier(.22,.68,0,1.2) both,introTitleGold 3s ease-in-out 1.5s infinite;}
.intro-portfolio{font-family:'ZTNature',sans-serif;font-weight:600;font-size:clamp(11px,3.2vw,15px);color:rgba(255,255,255,0.88);letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;animation:introBrandIn 1.4s cubic-bezier(.22,.68,0,1.2) both;}
.intro-ifgide{font-family:'Estrella',sans-serif;font-size:clamp(26px,8vw,46px);color:#fff;text-shadow:0 2px 16px rgba(255,200,0,0.38),0 1px 0 rgba(255,160,0,0.22);animation:introBrandIn 1.6s cubic-bezier(.22,.68,0,1.2) both;}
.intro-copy{max-width:340px;margin:16px auto 0;text-align:center;animation:introCopyIn 2s cubic-bezier(.22,.68,0,1.2) both;}
.intro-copy p{font-family:'ZTNature',sans-serif;font-weight:600;font-size:clamp(11px,3vw,14px);color:rgba(255,248,220,0.92);line-height:1.7;text-shadow:0 1px 8px rgba(0,0,60,0.28);}
.intro-scroll-hint{position:absolute;bottom:13%;left:50%;transform:translateX(-50%);z-index:5;display:flex;flex-direction:column;align-items:center;gap:6px;animation:hintBob 2s ease-in-out infinite;}
.intro-scroll-hint span{font-family:'ZTNature',sans-serif;font-weight:600;font-size:10px;color:rgba(255,255,255,0.75);letter-spacing:2px;text-transform:uppercase;}
.scroll-arrow{width:22px;height:22px;border-right:2px solid rgba(255,255,255,0.7);border-bottom:2px solid rgba(255,255,255,0.7);transform:rotate(45deg);}
.intro-stall{position:absolute;bottom:18%;left:50%;transform:translateX(-50%);z-index:4;width:clamp(200px,60vw,340px);pointer-events:none;}
.stall-sign{background:#3333ff;color:#fff;font-family:'GCKroven',sans-serif;font-size:clamp(11px,3vw,15px);text-align:center;padding:6px 14px;border-radius:6px 6px 0 0;letter-spacing:1px;box-shadow:0 -2px 8px rgba(0,0,120,0.15);}
.stall-awning{height:clamp(22px,6vw,34px);background:repeating-linear-gradient(90deg,#2a2aee 0px,#3333ff 8px,#4444ff 16px,#5555ff 24px,#4444ff 32px);position:relative;overflow:visible;border-bottom:none;}
.stall-awning::after{content:'';position:absolute;bottom:-8px;left:0;right:0;height:8px;background:radial-gradient(circle at 50% 0px,#4444ff 4px,transparent 5px);background-size:12px 8px;background-repeat:repeat-x;z-index:10;}
.stall-body{background:#e8e8ff;border:2px solid #3333ff;height:clamp(50px,14vw,80px);display:flex;align-items:center;justify-content:center;}
.stall-body span{font-family:'ZTNature',sans-serif;font-weight:600;font-size:clamp(9px,2.5vw,12px);color:#3333ff;letter-spacing:1px;opacity:0.7;}

/* ══════════════════════════════════════
   SECTION 1 — SHOP ENTRANCE
══════════════════════════════════════ */
#shop-entrance{position:relative;background:#3333ff;padding:10px;overflow:hidden;}
.shop-3d-wrap{perspective:900px;perspective-origin:50% 42%;}
.shop-3d-frame{transform-style:preserve-3d;transform:rotateX(6deg);transition:transform 0.7s cubic-bezier(0.22,0.68,0,1.2);}
.shop-floor{position:relative;overflow:hidden;min-height:88vw;}
.shop-floor-grid{position:absolute;inset:0;background-color:#f8f8ff;background-image:linear-gradient(rgba(50,50,255,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(50,50,255,.09) 1px,transparent 1px);background-size:22px 22px;}
.persp-lines{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:1;}
.persp-lines svg{width:100%;height:100%;opacity:0.18;}
.shop-wall-l{position:absolute;top:0;bottom:0;left:0;width:clamp(18px,5vw,32px);background:linear-gradient(90deg,rgba(0,0,80,0.25) 0%,transparent 100%);z-index:2;pointer-events:none;}
.shop-wall-r{position:absolute;top:0;bottom:0;right:0;width:clamp(18px,5vw,32px);background:linear-gradient(270deg,rgba(0,0,80,0.25) 0%,transparent 100%);z-index:2;pointer-events:none;}
.shop-ceiling{position:absolute;top:0;left:0;right:0;height:clamp(18px,5vw,30px);background:linear-gradient(180deg,rgba(0,0,80,0.2) 0%,transparent 100%);z-index:2;pointer-events:none;}
.shop-hero-cont{position:relative;z-index:3;padding:20px 18px 10px;}
.shop-hero-title{font-family:'GCKroven',sans-serif;font-size:clamp(38px,12vw,62px);color:#3333ff;line-height:0.96;letter-spacing:-2px;animation:textGlowPulse 6s ease-in-out 1s infinite;}
.shop-hours-row{display:flex;justify-content:flex-end;margin-top:4px;}
.shop-hours .day{font-family:'ZTNature',sans-serif;font-weight:600;font-size:clamp(9px,2.5vw,12px);color:#3333ff;display:block;}
.shop-hours .time{font-family:'GCKroven',sans-serif;font-size:clamp(15px,4.5vw,21px);color:#3333ff;font-weight:900;display:block;letter-spacing:1px;}
.shop-tag-line{display:flex;align-items:center;gap:8px;margin-top:10px;font-family:'ZTNature',sans-serif;font-weight:600;font-size:clamp(9px,2.5vw,11px);color:#3333ff;}
.tag-bar{flex:0 0 28px;height:1px;background:#3333ff;position:relative;}
.tag-bar::after{content:'';position:absolute;right:-3px;top:-2.5px;width:5px;height:5px;border-radius:50%;background:#3333ff;}
.shop-img-wrap{position:relative;z-index:3;display:flex;justify-content:center;padding:0 14px;margin-top:-6px;}
.shop-img-wrap img{width:68%;max-width:295px;object-fit:contain;filter:drop-shadow(0 18px 32px rgba(0,0,80,0.28)) drop-shadow(0 4px 8px rgba(0,0,80,0.18));animation:foodFloat 4s ease-in-out infinite;will-change:transform;}
.shop-btm{position:relative;z-index:3;padding:10px 18px 22px;text-align:right;}
.shop-btm p{font-family:'ZTNature',sans-serif;font-weight:600;font-size:clamp(9px,2.4vw,11px);color:#3333ff;line-height:1.5;}

/* ══════════════════════════════════════
   SECTION 2 — ABOUT
══════════════════════════════════════ */
#about{background:#3333ff;padding:0 10px;}
.about-card{position:relative;overflow:hidden;border:1.5px solid rgba(50,50,255,.28);padding:28px 20px 32px;}
.about-blob-r{position:absolute;bottom:-44px;right:-54px;width:200px;height:200px;background:rgba(100,100,255,.17);border-radius:50%;pointer-events:none;}
.about-blob-l{position:absolute;top:40%;left:-60px;width:130px;height:130px;background:rgba(80,80,255,.12);border-radius:50%;pointer-events:none;}
.about-title{font-family:'GCKroven',sans-serif;font-size:clamp(40px,13vw,62px);color:#3333ff;text-align:center;margin-bottom:24px;position:relative;z-index:2;letter-spacing:-1px;animation:textGlowPulse 5s ease-in-out infinite;}
.about-spk-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;position:relative;z-index:2;}
.about-label{font-family:'ZTNature',sans-serif;font-weight:900;font-size:clamp(13px,3.5vw,15px);color:#3333ff;margin-bottom:5px;position:relative;z-index:2;}
.about-text{font-family:'ZTNature',sans-serif;font-weight:600;font-size:clamp(9.5px,2.7vw,12px);color:#3333ff;line-height:1.65;margin-bottom:22px;position:relative;z-index:2;}
.about-cta{border:1.5px solid #3333ff;padding:16px;text-align:center;position:relative;z-index:2;overflow:hidden;}
.about-cta::before{content:'';position:absolute;inset:0;background:rgba(50,50,255,.03);}
.about-cta p{font-family:'ZTNature',sans-serif;font-weight:600;font-size:clamp(12px,3.4vw,15px);color:#3333ff;line-height:1.4;position:relative;z-index:1;}

/* ══════════════════════════════════════
   SECTION 3 — PASTRY MENU
   UPGRADED: bright background (#f5f5ff),
   no dark tint on cards, better contrast
══════════════════════════════════════ */
#pastry{
  background:#f0f0ff;   /* ← was #3333ff (dark blue), now bright */
  padding:0 10px;
}
/* Separator between pastry items — subtle blue strip */
#pastry .pi + .pi{margin-top:2px;}

.pi{
  position:relative;
  overflow:hidden;
  border:2px solid rgba(51,51,255,0.32);
  margin-bottom:4px;
  cursor:pointer;
  display:flex;
  flex-direction:column;
  min-height:clamp(380px,110vw,560px);
  background:#ffffff;
  box-shadow:4px 4px 0 rgba(51,51,255,0.16),0 8px 32px rgba(0,0,160,0.10);
  transition:box-shadow 0.32s cubic-bezier(0.16,1,0.30,1),transform 0.32s cubic-bezier(0.16,1,0.30,1);
}
.pi:hover{
  box-shadow:6px 6px 0 rgba(51,51,255,0.28),0 14px 48px rgba(0,0,180,0.16);
  transform:translate(-2px,-2px);
}
/* Subtle blue tint vignette on the card — keeps identity, not dark */
.pi::after{
  content:'';
  position:absolute;
  inset:0;
  background:radial-gradient(ellipse at 50% 0%,rgba(80,80,255,0.04) 0%,transparent 70%);
  pointer-events:none;
  z-index:0;
}
.pi-num{
  font-family:'ZTNature',sans-serif;
  font-weight:900;
  font-size:clamp(10px,2.5vw,13px);
  color:#3333ff;
  text-align:center;
  padding:18px 0 4px;
  position:relative;
  z-index:2;
  letter-spacing:3px;
  text-transform:uppercase;
  animation:numFloat 3.8s ease-in-out infinite;
}
.pi-title{display:flex;justify-content:space-between;align-items:flex-start;padding:6px 16px 0;position:relative;z-index:2;}
.pi-name{
  font-family:'GCKroven',sans-serif;
  font-size:clamp(24px,7.5vw,38px);
  color:#2222ee;
  line-height:1.02;
  flex:1;
  max-width:70%;
  animation:textGlowPulse 4.5s ease-in-out infinite;
}
.pi-plus{width:clamp(44px,12vw,56px);height:clamp(44px,12vw,56px);background:#3333ff;border-radius:10px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .18s ease,background .18s ease,box-shadow .18s ease;position:relative;z-index:3;animation:btnGlowPulse 3.5s ease-in-out infinite;}
.pi-plus:active{background:#1111cc;transform:scale(0.88);box-shadow:0 4px 14px rgba(0,0,180,.4);}
.pi-plus svg{fill:#fff;width:22px;height:22px;}
.pi-img-area{position:relative;padding:8px 16px 0;display:flex;justify-content:center;align-items:flex-end;min-height:52vw;}
.pi-blob{position:absolute;left:-32px;bottom:8px;width:120px;height:120px;background:rgba(80,80,255,.12);border-radius:50%;pointer-events:none;}
.pi-badge{position:absolute;right:18px;top:14px;width:clamp(66px,17vw,84px);height:clamp(66px,17vw,84px);background:#3333ff;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:3;box-shadow:0 4px 14px rgba(0,0,160,.35);animation:badgeSpin 6s ease-in-out infinite;}
.pi-badge span{font-family:'GCKroven',sans-serif;font-size:clamp(17px,5vw,27px);color:#fff;letter-spacing:-1px;}
.pi-imgw{position:relative;z-index:2;width:80%;max-width:310px;}
.food-img{
  width:100%;
  object-fit:contain;
  filter:
    drop-shadow(0 14px 28px rgba(0,0,100,.16))
    drop-shadow(0 4px 8px rgba(0,0,60,.10));  /* lighter shadow = brighter feel */
}
.pi-desc{
  margin:12px 16px 20px;
  border:1.5px solid rgba(50,50,255,0.28);
  padding:12px 14px;
  position:relative;
  z-index:2;
  flex:1;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  background:rgba(248,248,255,0.6);
  animation:descSlideIn 5s ease-in-out infinite;
}
.pi-dname{font-family:'ZTNature',sans-serif;font-weight:900;font-size:clamp(13px,3.5vw,17px);color:#2222ee;text-align:center;margin-bottom:6px;letter-spacing:0.5px;}
.pi-dtxt{font-family:'ZTNature',sans-serif;font-weight:600;font-size:clamp(9.5px,2.5vw,12px);color:#3344aa;text-align:center;line-height:1.72;}

/* ══════════════════════════════════════
   DECORATIVE: Coffee Beans (pastry section)
══════════════════════════════════════ */
.deco-beans-wrap{
  position:absolute;
  inset:0;
  pointer-events:none;
  z-index:1;
  overflow:hidden;
}
.deco-bean{
  position:absolute;
  transform:rotate(var(--rot, 0deg));
  animation:beanFloat 6s cubic-bezier(0.45,0.05,0.55,0.95) var(--delay, 0s) infinite;
  will-change:transform;
  opacity:0.7;
}
@keyframes beanFloat{
  0%,100%{ transform:rotate(var(--rot)) translateY(0) scale(1);    opacity:0.7; }
  30%    { transform:rotate(calc(var(--rot) + 6deg)) translateY(-7px) scale(1.06); opacity:0.9; }
  65%    { transform:rotate(calc(var(--rot) - 4deg)) translateY(-13px) scale(1.02); opacity:0.8; }
}

/* ══════════════════════════════════════
   DECORATIVE: Sugar Dust
══════════════════════════════════════ */
.deco-sugar-wrap{
  position:absolute;
  top:0;left:0;right:0;
  height:60%;
  pointer-events:none;
  z-index:1;
  overflow:hidden;
}
.deco-sugar{
  position:absolute;
  top:-8px;
  width:var(--size,4px);
  height:var(--size,4px);
  background:rgba(200,200,255,0.55);
  border-radius:50%;
  animation:sugarFall 5s cubic-bezier(0.22,0.68,0,1.15) var(--delay,0s) infinite;
}
@keyframes sugarFall{
  0%  { transform:translateY(-10px) scale(0.6); opacity:0; }
  20% { opacity:0.9; }
  80% { opacity:0.5; }
  100%{ transform:translateY(60px) translateX(8px) scale(1.1); opacity:0; }
}

/* ══════════════════════════════════════
   SECTION 4 — DRINKS
   UPGRADED: bright background, no dark overlay
══════════════════════════════════════ */
#drinks{
  background:#eeeeff;   /* ← was #3333ff (dark), now pale lavender */
  padding:0 10px;
}
.dk-hcard{
  position:relative;
  overflow:hidden;
  border:1.5px solid rgba(50,50,255,.28);
  margin-bottom:2px;
  min-height:clamp(160px,38vw,260px);
  display:flex;
  flex-direction:column;
  justify-content:center;
  background:#f8f8ff;
}
.dk-hgrid{position:absolute;inset:0;background-color:#f8f8ff;background-image:linear-gradient(rgba(50,50,255,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(50,50,255,.09) 1px,transparent 1px);background-size:22px 22px;}
.dk-blob-top{position:absolute;top:-38px;left:50%;transform:translateX(-50%);width:90px;height:90px;background:#3333ff;border-radius:50%;pointer-events:none;animation:blobBob 5s ease-in-out infinite;}
.dk-scallop{position:absolute;bottom:0;left:0;right:0;height:56px;background:rgba(110,110,255,.2);clip-path:polygon(0% 100%,4% 0%,8% 100%,12% 0%,16% 100%,20% 0%,24% 100%,28% 0%,32% 100%,36% 0%,40% 100%,44% 0%,48% 100%,52% 0%,56% 100%,60% 0%,64% 100%,68% 0%,72% 100%,76% 0%,80% 100%,84% 0%,88% 100%,92% 0%,96% 100%,100% 0%,100% 100%);pointer-events:none;animation:scallop 4s ease-in-out infinite;}
.dk-htxt{position:relative;z-index:2;padding:56px 22px 30px;text-align:center;}
.dk-sub{font-family:'ZTNature',sans-serif;font-weight:900;font-size:clamp(13px,3.8vw,17px);color:#3333ff;margin-bottom:2px;}
.dk-ttl{font-family:'GCKroven',sans-serif;font-size:clamp(46px,14vw,70px);color:#3333ff;line-height:0.95;letter-spacing:-2px;animation:textGlowPulse 5s ease-in-out 0.5s infinite;}
/* ══════════════════════════════════════
   dk-item — PATCH 2: Aligned ke pastryItem
   • Struktur kolom vertikal identik (num → title → img-area → desc)
   • Marquee tetap sebagai bg texture (z-index:0)
   • Corner marks (cm) visible di atas marquee
   • glass-card: white base, clean
══════════════════════════════════════ */
.dk-item{
  position:relative;
  overflow:hidden;
  border:2px solid rgba(51,51,255,0.32);
  margin-bottom:4px;
  isolation:isolate;
  display:flex;
  flex-direction:column;
  align-items:center;
  min-height:clamp(420px,120vw,640px);
  background:#ffffff;
  box-shadow:4px 4px 0 rgba(51,51,255,0.16),0 8px 32px rgba(0,0,160,0.10);
  transition:box-shadow 0.32s cubic-bezier(0.16,1,0.30,1),transform 0.32s cubic-bezier(0.16,1,0.30,1);
}
.dk-item:hover{
  box-shadow:6px 6px 0 rgba(51,51,255,0.28),0 14px 48px rgba(0,0,180,0.16);
  transform:translate(-2px,-2px);
}
/* corner marks harus di atas marquee */
.dk-item .cm{z-index:5;}

/* Marquee background — tetap sebagai texture watermark */
.mrq-bg{
  position:absolute;
  inset:0;
  display:flex;
  flex-direction:column;
  justify-content:center;
  overflow:hidden;
  pointer-events:none;
  z-index:0;
  will-change:transform;
  opacity:0.85;
}
.mrq-row{display:flex;align-items:center;overflow:hidden;height:clamp(34px,9.5vw,46px);}
.mrq-in{display:flex;white-space:nowrap;animation:mrqL 10s linear infinite;}
.mrq-in.mrq-rev{animation:mrqR 10s linear infinite;}
.mrq-t{font-family:'GCKroven',sans-serif;font-size:clamp(26px,8.5vw,42px);color:rgba(50,50,255,.08);flex-shrink:0;}

/* Nomor seri — identik pi-num */
.dk-num{
  font-family:'ZTNature',sans-serif;
  font-weight:900;
  font-size:clamp(10px,2.5vw,13px);
  color:#3333ff;
  text-align:center;
  padding:18px 0 4px;
  position:relative;
  z-index:2;
  letter-spacing:3px;
  width:100%;
}

/* Baris judul + tombol — identik pi-title */
.dk-title-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:8px 20px 4px;
  width:100%;
  position:relative;
  z-index:2;
}
.dk-name{
  font-family:'GCKroven',sans-serif;
  font-size:clamp(24px,7.5vw,38px);
  color:#2222ee;
  line-height:1.02;
  flex:1;
  max-width:68%;
  animation:textGlowPulse 4s ease-in-out infinite;
}

/* Area gambar — identik pi-img-area */
.dk-img-area{
  position:relative;
  padding:8px 16px 0;
  width:100%;
  display:flex;
  justify-content:center;
  align-items:flex-end;
  min-height:52vw;
}
.dk-blob{
  position:absolute;
  /* blob di kanan bawah untuk variasi vs pastry (kiri) */
  right:-32px; bottom:8px;
  width:120px; height:120px;
  background:rgba(80,200,255,.10);
  border-radius:50%;
  pointer-events:none;
}
.dk-imgw{
  position:relative;
  z-index:2;
  width:92%;
  max-width:380px;
}
.dk-food{
  width:100%!important;
  height:auto!important;
  max-height:240px;
  object-fit:contain;
  animation:foodFloat 4.5s ease-in-out infinite;
  will-change:transform;
  display:block;
  filter:drop-shadow(0 12px 28px rgba(50,50,255,0.18));
}

/* Desc box — identik pi-desc */
.dk-desc-box{
  margin:12px 16px 20px;
  width:calc(100% - 32px);
  border:1.5px solid rgba(50,50,255,0.28);
  padding:12px 14px;
  position:relative;
  z-index:2;
  flex:1;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  background:rgba(248,248,255,0.6);
}
.dk-desc-txt{
  font-family:'ZTNature',sans-serif;
  font-weight:600;
  font-size:clamp(9px,2.4vw,11px);
  color:#3344aa;
  text-align:center;
  line-height:1.62;
}
.dk-tagline-wrap{
  width:100%;
  padding:0 16px;
  text-align:center;
  position:relative;
  z-index:2;
}
.dk-tagline{
  font-family:'GCKroven',sans-serif;
  font-size:clamp(12px,3.5vw,16px);
  color:#3333ff;
  letter-spacing:0.5px;
  line-height:1.5;
  opacity:0.78;
  animation:taglinePulse 4s ease-in-out infinite;
}
.dk-cta-copy{
  font-family:'GCKroven',sans-serif;
  font-size:clamp(9px,2.5vw,12px);
  color:#3333ff;
  text-align:center;
  margin-top:8px;
  letter-spacing:0.5px;
  opacity:0.62;
  font-style:italic;
}

/* Legacy classes — tetap ada agar tidak error jika masih dipakai */
.dk-cont{display:none;}
.dk-imgc{display:none;}
.dk-desc{font-family:'ZTNature',sans-serif;font-weight:600;font-size:clamp(9px,2.4vw,11px);color:#3344aa;text-align:center;line-height:1.62;margin-bottom:12px;}
.dk-plus{display:flex;align-items:center;justify-content:center;margin:0 auto;width:auto;padding:0 18px;gap:6px;font-family:'ZTNature',sans-serif;font-weight:900;font-size:13px;color:#fff;border-radius:8px;}
.dk-plus-btn{
  width:clamp(44px,11vw,54px)!important;
  height:clamp(44px,11vw,54px)!important;
  background:#3333ff;
  border-radius:10px;
  border:none;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  transition:transform .18s ease,background .18s ease,box-shadow .18s ease;
  position:relative;
  z-index:3;
  animation:btnGlowPulse 3.5s ease-in-out infinite;
}
.dk-plus-btn svg{fill:#fff;width:22px;height:22px;}
.dk-plus span{color:#fff;}

/* ══════════════════════════════════════
   DECORATIVE: Steam Bubbles (drinks section)
══════════════════════════════════════ */
.dk-steam-wrap{
  position:absolute;
  bottom:56px;
  left:0;right:0;
  height:80px;
  pointer-events:none;
  z-index:1;
  overflow:visible;
}
.deco-steam{
  position:absolute;
  bottom:0;
  width:var(--size,6px);
  height:var(--size,6px);
  background:rgba(180,180,255,0.5);
  border-radius:50%;
  animation:steamRise 3.5s cubic-bezier(0.22,0.68,0,1.12) var(--delay,0s) infinite;
}
@keyframes steamRise{
  0%  { transform:translateY(0) scale(0.7); opacity:0; }
  18% { opacity:0.85; }
  60% { opacity:0.4; }
  100%{ transform:translateY(-80px) translateX(6px) scale(0.3); opacity:0; }
}

/* ── CREDITS ── */
#credits{background:#3333ff;padding:0 10px 10px;}
.cr-card{position:relative;overflow:hidden;border:1.5px solid rgba(255,255,255,.2);padding:28px 22px 36px;min-height:76vw;display:flex;flex-direction:column;justify-content:space-between;}
.cr-grid{position:absolute;inset:0;background-color:#e8e8ff;background-image:linear-gradient(rgba(50,50,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(50,50,255,.12) 1px,transparent 1px);background-size:22px 22px;}
.cr-glow{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 110%,rgba(80,80,255,.42) 0%,transparent 58%);pointer-events:none;}
.cr-title{position:relative;z-index:2;font-family:'GCKroven',sans-serif;font-size:clamp(40px,12vw,62px);color:#3333ff;line-height:0.97;letter-spacing:-1px;animation:textGlowPulse 5s ease-in-out 1s infinite;}
.cr-of{position:relative;z-index:2;font-family:'ZTNature',sans-serif;font-weight:600;font-size:clamp(10px,2.8vw,13px);color:#3333ff;margin-top:5px;}
.cr-ifgide{position:relative;z-index:2;font-family:'Estrella',sans-serif;font-size:clamp(36px,12vw,58px);color:#3333ff;line-height:1;margin-top:3px;}
.cr-exe{font-family:'ZTNature',sans-serif;font-weight:600;font-size:clamp(14px,4vw,20px);color:#3333ff;}
.cr-diamond{position:relative;z-index:2;display:flex;justify-content:center;margin:10px 0 4px;}
.cr-diamond svg{fill:#3333ff;animation:spinStar 8s linear infinite;}
.cr-socials{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:flex-end;padding-top:12px;border-top:1px solid rgba(50,50,255,.28);margin-top:8px;}
.cr-scol{text-align:center;}
.cr-slabel{font-family:'ZTNature',sans-serif;font-weight:600;font-size:clamp(8px,2.1vw,10px);color:#3333ff;display:block;margin-bottom:2px;opacity:.7;}
.cr-sval{font-family:'ZTNature',sans-serif;font-weight:900;font-size:clamp(8px,2.3vw,11px);color:#3333ff;display:block;}

/* ══════════════════════════════════════
   CART WIDGET — unchanged
══════════════════════════════════════ */
#cart-widget{position:fixed;bottom:clamp(80px,18vw,110px);right:12px;z-index:999;display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
#cart-btn{width:clamp(48px,12vw,58px);height:clamp(48px,12vw,58px);background:#3333ff;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(0,0,160,.45);transition:transform .2s ease,box-shadow .2s ease;position:relative;}
#cart-btn:active{transform:scale(0.92);}
#cart-btn svg{fill:#fff;width:22px;height:22px;}
#cart-count{position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;background:#ff3333;border-radius:9px;font-family:'ZTNature',sans-serif;font-weight:900;font-size:10px;color:#fff;display:none;align-items:center;justify-content:center;padding:0 4px;}
#cart-panel{background:#fff;border:2px solid #3333ff;border-radius:12px;width:clamp(240px,72vw,320px);max-height:62vh;overflow-y:auto;box-shadow:0 8px 32px rgba(0,0,160,.3);display:none;flex-direction:column;}
#cart-panel.open{display:flex;}
.cart-hdr{background:#3333ff;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;border-radius:10px 10px 0 0;}
.cart-hdr-title{font-family:'GCKroven',sans-serif;font-size:18px;color:#fff;letter-spacing:.5px;}
.cart-close{background:none;border:none;color:#fff;font-size:20px;cursor:pointer;line-height:1;padding:0 2px;}
.cart-body{flex:1;overflow-y:auto;padding:4px 0;}
.cart-empty{font-family:'ZTNature',sans-serif;font-weight:600;font-size:11px;color:#8888bb;text-align:center;padding:24px 16px 20px;letter-spacing:0.5px;line-height:1.7;}
.cart-empty-ico{display:block;font-size:26px;margin-bottom:8px;opacity:0.45;}
.cart-swipe-wrap{overflow:hidden;position:relative;border-bottom:1px solid rgba(50,50,255,.1);}
.cart-swipe-inner{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;width:100%;}
.cart-swipe-inner::-webkit-scrollbar{display:none;}
.cart-row{display:flex;align-items:center;justify-content:space-between;padding:9px 14px;min-width:100%;flex-shrink:0;scroll-snap-align:start;background:#fff;}
.cart-del-zone{min-width:72px;flex-shrink:0;scroll-snap-align:start;background:#e81c1c;display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;}
.cart-del-zone span{font-family:'ZTNature',sans-serif;font-weight:900;font-size:10px;color:#fff;letter-spacing:1px;text-transform:uppercase;writing-mode:vertical-rl;text-orientation:mixed;}
.cart-row-name{font-family:'ZTNature',sans-serif;font-weight:900;font-size:clamp(11px,3vw,13px);color:#3333ff;flex:1;}
.cart-row-qty{font-family:'ZTNature',sans-serif;font-weight:600;font-size:11px;color:#555;margin:0 8px;white-space:nowrap;}
.cart-row-price{font-family:'GCKroven',sans-serif;font-size:clamp(13px,3.5vw,16px);color:#3333ff;white-space:nowrap;}
.cart-ftr{padding:12px 14px;border-top:2px solid rgba(50,50,255,.18);flex-shrink:0;}
.cart-total-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
.cart-total-lbl{font-family:'ZTNature',sans-serif;font-weight:900;font-size:13px;color:#3333ff;}
.cart-total-val{font-family:'GCKroven',sans-serif;font-size:20px;color:#3333ff;}
.cart-order-btn{width:100%;background:#3333ff;color:#fff;border:none;border-radius:8px;padding:10px;font-family:'GCKroven',sans-serif;font-size:16px;cursor:pointer;transition:background .18s ease;}
.cart-order-btn:active{background:#1111cc;}
.cart-toast{position:fixed;bottom:clamp(140px,28vw,175px);right:12px;background:#3333ff;color:#fff;font-family:'ZTNature',sans-serif;font-weight:600;font-size:12px;padding:8px 14px;border-radius:8px;z-index:1000;opacity:0;transform:translateY(10px);transition:opacity .3s,transform .3s;pointer-events:none;white-space:nowrap;}
.cart-toast.show{opacity:1;transform:translateY(0);}

/* ── REVEAL ANIMATIONS [PATCH 3: Cinematic Stagger] ──
   Prinsip:
   • Hanya transform + opacity → GPU compositor path → 60 FPS
   • Easing out-expo: elemen "jatuh" dengan deceleration alami
   • Stagger d1–d5 diperlebar (0.12s step) → terasa bernapas
   • rv-left / rv-right: translateX lebih kecil (22px) → tidak "terlalu slide"
   • rv-scale: scale mulai dari 0.88 (tidak terlalu kecil)
*/
.rv{
  opacity:0;
  transform:translate3d(0,52px,0) scale(0.93) rotateX(4deg);
  transition:
    opacity   0.95s cubic-bezier(0.12,0.92,0.22,1.08),
    transform 0.95s cubic-bezier(0.12,0.92,0.22,1.08);
  will-change:transform,opacity;
}
.rv.vis{
  opacity:1;
  transform:translate3d(0,0,0) scale(1) rotateX(0deg);
}

/* Stagger delays — 0.10s step, up to d10 */
.d1{transition-delay:0.10s;}
.d2{transition-delay:0.20s;}
.d3{transition-delay:0.32s;}
.d4{transition-delay:0.44s;}
.d5{transition-delay:0.56s;}
.d6{transition-delay:0.68s;}
.d7{transition-delay:0.80s;}
.d8{transition-delay:0.92s;}
.d9{transition-delay:1.04s;}
.d10{transition-delay:1.16s;}

.rv-left{
  opacity:0;
  transform:translate3d(-22px,0,0);
  transition:
    opacity   0.72s cubic-bezier(0.16,1,0.30,1),
    transform 0.72s cubic-bezier(0.16,1,0.30,1);
  will-change:transform,opacity;
}
.rv-left.vis{opacity:1;transform:translate3d(0,0,0);}

.rv-right{
  opacity:0;
  transform:translate3d(22px,0,0);
  transition:
    opacity   0.72s cubic-bezier(0.16,1,0.30,1),
    transform 0.72s cubic-bezier(0.16,1,0.30,1);
  will-change:transform,opacity;
}
.rv-right.vis{opacity:1;transform:translate3d(0,0,0);}

.rv-scale{
  opacity:0;
  transform:scale(0.88) translate3d(0,10px,0);
  transition:
    opacity   0.82s cubic-bezier(0.16,1,0.30,1),
    transform 0.82s cubic-bezier(0.16,1,0.30,1);
  will-change:transform,opacity;
}
.rv-scale.vis{opacity:1;transform:scale(1) translate3d(0,0,0);}

/* ══════════════════════════════════════
   KEYFRAMES — FULL SET
══════════════════════════════════════ */
@keyframes headerShimmer{
  0%,100%{ transform:translateX(-100%); }
  50%    { transform:translateX(200%); }
}
@keyframes sunPulse{
  0%,100%{transform:translateX(-50%) scale(1);box-shadow:0 0 40px 20px rgba(255,200,0,.35),0 0 80px 40px rgba(255,180,0,.18);}
  40%{transform:translateX(-50%) scale(1.07);box-shadow:0 0 60px 30px rgba(255,218,0,.55),0 0 110px 60px rgba(255,195,0,.28),0 0 160px 80px rgba(255,180,0,.10);}
  70%{transform:translateX(-50%) scale(1.03);box-shadow:0 0 48px 24px rgba(255,205,0,.42),0 0 90px 48px rgba(255,185,0,.20);}
}
@keyframes sunPulseGod{
  0%,100%{transform:translateX(-50%) scale(1);box-shadow:0 0 0 8px rgba(255,245,120,0.18),0 0 55px 28px rgba(255,220,0,.6),0 0 110px 55px rgba(255,190,0,.35),0 0 200px 100px rgba(255,165,0,.16),0 0 320px 160px rgba(255,140,0,.07);}
  35%{transform:translateX(-50%) scale(1.10);box-shadow:0 0 0 14px rgba(255,248,140,0.28),0 0 80px 40px rgba(255,235,0,.75),0 0 160px 80px rgba(255,210,0,.45),0 0 280px 140px rgba(255,185,0,.22),0 0 420px 210px rgba(255,160,0,.09);}
  68%{transform:translateX(-50%) scale(1.04);box-shadow:0 0 0 10px rgba(255,245,120,0.22),0 0 64px 32px rgba(255,225,0,.65),0 0 130px 65px rgba(255,195,0,.38),0 0 240px 120px rgba(255,170,0,.18);}
}
@keyframes sunRayRotFast{0%{transform:translate(-50%,-50%) rotate(0deg);}100%{transform:translate(-50%,-50%) rotate(360deg);}}
@keyframes lightFlare{
  0%,100%{opacity:0;transform:translateX(-50%) scaleX(0.4);}
  50%{opacity:0.55;transform:translateX(-50%) scaleX(1);}
}
@keyframes birdFlapFast{0%{transform:scaleY(1) rotate(-8deg);}50%{transform:scaleY(-0.6) rotate(5deg);}100%{transform:scaleY(1) rotate(-8deg);}}
@keyframes birdSoar{
  0%{transform:translateX(-120vw) translateY(0px);}
  25%{transform:translateX(-80vw) translateY(-18px);}
  50%{transform:translateX(-40vw) translateY(8px);}
  75%{transform:translateX(0vw) translateY(-12px);}
  100%{transform:translateX(50vw) translateY(5px);}
}
@keyframes birdSoar2{
  0%{transform:translateX(140vw) translateY(0px);}
  30%{transform:translateX(90vw) translateY(-22px);}
  60%{transform:translateX(40vw) translateY(10px);}
  100%{transform:translateX(-60vw) translateY(-5px);}
}
@keyframes cloudLightPulse{
  0%,100%{filter:brightness(1) drop-shadow(0 0 0px rgba(255,255,220,0));}
  50%{filter:brightness(1.18) drop-shadow(0 0 18px rgba(255,255,180,0.55));}
}
@keyframes sunRayRot{0%{transform:translate(-50%,-50%) rotate(0deg);}100%{transform:translate(-50%,-50%) rotate(360deg);}}
@keyframes cloudDrift1{0%{transform:translateX(0);}50%{transform:translateX(110vw);}50.001%{transform:translateX(-40vw);}100%{transform:translateX(0);}}
@keyframes cloudDrift2{0%{transform:translateX(0);}100%{transform:translateX(-120vw);}}
@keyframes cloudDrift3{0%{transform:translateX(0);}100%{transform:translateX(80vw);}}
@keyframes cloudDrift4{0%{transform:translateX(-30vw);}50%{transform:translateX(120vw);}50.001%{transform:translateX(-50vw);}100%{transform:translateX(-30vw);}}
@keyframes cloudDrift5{0%{transform:translateX(20vw);}100%{transform:translateX(-130vw);}}
@keyframes cloudDrift6{0%{transform:translateX(-10vw);}100%{transform:translateX(90vw);}}
@keyframes birdsFly{0%{transform:translateX(0) translateY(0);}100%{transform:translateX(-30px) translateY(-8px);}}
.birds-2{position:absolute;top:34%;right:-12%;opacity:0.7;animation:birdSoar2 28s cubic-bezier(0.4,0,0.6,1) 4s infinite;will-change:transform;z-index:6;display:flex;gap:5px;align-items:center;}
.birds-2 .bird{display:inline-block;width:clamp(11px,3vw,16px);height:clamp(4px,1.1vw,6px);border-top:2px solid #445;border-radius:50% 50% 0 0;animation:birdFlapFast 0.38s ease-in-out infinite;}
.birds-2 .bird:nth-child(1){animation-delay:0.08s;}
.birds-2 .bird:nth-child(2){animation-delay:0.22s;transform:scale(0.78) translateY(-3px);}
@keyframes birdFlap{0%{transform:scaleY(1);}100%{transform:scaleY(-0.5);}}
@keyframes flowerSway{0%{transform:rotate(-6deg);}100%{transform:rotate(6deg);}}
@keyframes introBrandIn{0%{opacity:0;transform:translateY(36px) scale(0.88);}65%{opacity:1;transform:translateY(-4px) scale(1.015);}100%{opacity:1;transform:translateY(0) scale(1);}}
@keyframes introCopyIn{0%{opacity:0;transform:translateY(18px);}100%{opacity:1;transform:translateY(0);}}
@keyframes hintBob{0%,100%{transform:translateX(-50%) translateY(0);opacity:0.75;}35%{transform:translateX(-50%) translateY(9px);opacity:1;}65%{transform:translateX(-50%) translateY(5px);opacity:0.9;}}
@keyframes spinStar{
  0%  { transform:rotate(0deg)   scale(1); }
  20% { transform:rotate(72deg)  scale(1.42); }
  40% { transform:rotate(144deg) scale(1.15); }
  60% { transform:rotate(216deg) scale(1.50); }
  80% { transform:rotate(288deg) scale(1.18); }
  100%{ transform:rotate(360deg) scale(1); }
}
@keyframes btnGlowPulse{
  0%,100%{box-shadow:0 4px 14px rgba(51,51,255,0.38);}
  50%{box-shadow:0 4px 24px rgba(51,51,255,0.72),0 0 0 4px rgba(100,100,255,0.18);}
}
@keyframes foodFloat{
  0%  { transform:translate3d(0,  0px,0) scale(1);      }
  18% { transform:translate3d(2px,-10px,0) scale(1.022); }
  42% { transform:translate3d(-2px,-22px,0) scale(1.036); }
  70% { transform:translate3d(1px,-18px,0) scale(1.028); }
  100%{ transform:translate3d(0,  0px,0) scale(1);      }
}
@keyframes mrqL{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
@keyframes mrqR{0%{transform:translateX(-50%);}100%{transform:translateX(0);}}

/* ══ GOLD ANIMATION SET ══ */
@keyframes textGlowPulse{
  0%,100%{
    filter:drop-shadow(0 0 0px rgba(51,51,255,0));
  }
  50%{
    filter:drop-shadow(0 0 8px rgba(51,51,255,0.28)) drop-shadow(0 0 18px rgba(100,100,255,0.14));
  }
}
@keyframes introTitleGold{
  0%,100%{
    text-shadow:0 4px 32px rgba(255,200,0,0.45),0 2px 0 rgba(255,160,0,0.3),0 0 60px rgba(255,220,0,0.25);
  }
  50%{
    text-shadow:0 4px 48px rgba(255,220,0,0.7),0 2px 0 rgba(255,180,0,0.45),0 0 90px rgba(255,240,0,0.45),0 0 140px rgba(255,200,0,0.2);
  }
}
@keyframes blobBob{
  0%,100%{transform:translateX(-50%) translateY(0);}
  50%{transform:translateX(-50%) translateY(-10px);}
}
@keyframes btnGlowPulse{
  0%,100%{box-shadow:0 4px 14px rgba(51,51,255,0.38);}
  50%{box-shadow:0 4px 24px rgba(51,51,255,0.72),0 0 0 4px rgba(100,100,255,0.18);}
}
@keyframes numFloat{
  0%,100%{transform:translateY(0) scale(1);letter-spacing:3px;}
  50%{transform:translateY(-3px) scale(1.04);letter-spacing:4px;}
}
@keyframes taglinePulse{
  0%,100%{opacity:0.78;letter-spacing:0.5px;}
  50%{opacity:1;letter-spacing:1.5px;}
}
@keyframes badgeSpin{
  0%{transform:rotate(0deg) scale(1);}
  25%{transform:rotate(-8deg) scale(1.06);}
  75%{transform:rotate(8deg) scale(1.06);}
  100%{transform:rotate(0deg) scale(1);}
}
@keyframes descSlideIn{
  0%,100%{border-color:rgba(50,50,255,0.28);background:rgba(248,248,255,0.6);}
  50%{border-color:rgba(51,51,255,0.55);background:rgba(240,240,255,0.85);}
}
@keyframes scallop{
  0%{opacity:0.2;}
  50%{opacity:0.38;}
  100%{opacity:0.2;}
}
@keyframes hdrGlowPulse{
  0%,100%{background:#1a1aaa;}
  50%{background:#2020bb;}
}


/* ══════════════════════════════════════
   MODULE 4 — DESKTOP OPTIMIZATION
   @media (min-width: 1024px)
   • Perspective lock: 1600px (prevents Z-distortion on wide)
   • Layout: centered column, max-width cap, sidebar gutter
   • Cards: side-by-side flex row for pastry/drink items
   • Font clamp upper bounds tightened for 1440p+ readability
   • Shop entrance 3D frame scales without barrel distortion
   • Cart widget repositioned for wide viewport
══════════════════════════════════════ */
@media (min-width: 1024px) {

  /* ── GLOBAL SHELL: true fullscreen desktop ── */
  body {
    align-items: stretch;
  }
  body > * {
    width: 100%;
    max-width: 100%;
  }
  .sh-hdr,
  .sh-band,
  .sh-ftr {
    max-width: 100%;
    width: 100%;
  }

  /* ── SCROLLER: true fullscreen ── */
  #scroller {
    max-width: 100%;
    width: 100%;
    margin: 0;
    box-shadow: none;
  }

  /* ── TUNNEL PERSPECTIVE: extra deep on desktop ── */
  #pastry,
  #drinks {
    perspective: 2200px;
    perspective-origin: 50% 35%;
    padding: 0 6px;
  }

  /* ── PASTRY ITEM: side-by-side layout on desktop ── */
  .pi {
    display: grid;
    grid-template-columns: 55fr 45fr;
    grid-template-rows: auto auto 1fr;
    min-height: 480px;
    align-items: start;
  }
  .pi-num {
    grid-column: 1 / -1;
    font-size: clamp(10px, 1vw, 12px);
    padding: 18px 0 0;
  }
  .pi-title {
    grid-column: 1 / 2;
    padding: 8px 20px 0;
    align-items: flex-start;
  }
  .pi-name {
    font-size: clamp(26px, 3.2vw, 38px);
    max-width: 80%;
  }
  .pi-img-area {
    grid-column: 2 / 3;
    grid-row: 2 / 4;
    min-height: 380px;
    padding: 16px 28px 0;
  }
  .pi-imgw {
    max-width: 420px;
    width: 96%;
  }
  .pi-desc {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
    margin: 12px 20px 24px;
    width: auto;
  }
  .pi-dname {
    font-size: clamp(13px, 1.4vw, 16px);
  }
  .pi-dtxt {
    font-size: clamp(10px, 1.1vw, 12px);
  }
  .pi-badge {
    width: clamp(70px, 8vw, 90px);
    height: clamp(70px, 8vw, 90px);
  }
  .pi-badge span {
    font-size: clamp(20px, 2.6vw, 30px);
  }
  .pi-plus {
    width: clamp(46px, 5vw, 58px);
    height: clamp(46px, 5vw, 58px);
  }

  /* ── DRINK ITEM: wider, no squeeze ── */
  .dk-item {
    display: grid;
    grid-template-columns: 55fr 45fr;
    grid-template-rows: auto auto auto 1fr;
    min-height: 480px;
    align-items: start;
  }
  .dk-num {
    grid-column: 1 / -1;
    font-size: clamp(10px, 1vw, 12px);
  }
  .dk-title-row {
    grid-column: 1 / 2;
    padding: 8px 20px 0;
  }
  .dk-name {
    font-size: clamp(24px, 3vw, 36px);
    max-width: 80%;
  }
  .dk-img-area {
    grid-column: 2 / 3;
    grid-row: 2 / 5;
    min-height: 380px;
    padding: 16px 28px 0;
  }
  .dk-imgw {
    max-width: 420px;
    width: 96%;
  }
  .dk-food {
    max-height: 360px;
  }
  .dk-tagline-wrap {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
    padding: 0 20px;
  }
  .dk-tagline {
    font-size: clamp(12px, 1.4vw, 16px);
  }
  .dk-desc-box {
    grid-column: 1 / 2;
    grid-row: 4 / 5;
    margin: 12px 20px 24px;
    width: auto;
  }
  .dk-desc-txt {
    font-size: clamp(10px, 1.1vw, 12px);
  }

  /* ── DRINK HEADER CARD ── */
  .dk-hcard {
    min-height: 200px;
  }
  .dk-ttl {
    font-size: clamp(48px, 6vw, 72px);
  }
  .dk-sub {
    font-size: clamp(14px, 1.6vw, 18px);
  }

  /* ── SHOP ENTRANCE 3D: lock perspective + frame scale ── */
  #shop-entrance {
    padding: 14px;
  }
  .shop-3d-wrap {
    perspective: 1600px;
    perspective-origin: 50% 40%;
  }
  .shop-3d-frame {
    transform: rotateX(4deg);
  }
  .shop-floor {
    min-height: clamp(480px, 52vh, 680px);
  }
  .shop-hero-title {
    font-size: clamp(44px, 5.5vw, 68px);
  }
  .shop-img-wrap img {
    width: 56%;
    max-width: 460px;
  }
  .shop-hours .day {
    font-size: clamp(10px, 1.2vw, 13px);
  }
  .shop-hours .time {
    font-size: clamp(17px, 2.2vw, 24px);
  }
  .shop-tag-line {
    font-size: clamp(10px, 1.1vw, 12px);
  }

  /* ── INTRO SECTION: cap brand title, fix copy width ── */
  .intro-brand-title {
    font-size: clamp(52px, 7vw, 88px);
  }
  .intro-copy {
    max-width: 440px;
  }
  .intro-copy p {
    font-size: clamp(11px, 1.3vw, 14px);
  }

  /* ── ABOUT CARD: wider content column, larger type ── */
  .about-card {
    padding: 56px 8% 64px;
    max-width: 100%;
  }
  .about-title {
    font-size: clamp(44px, 5.5vw, 68px);
  }
  .about-text {
    font-size: clamp(11px, 1.3vw, 14px);
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }
  .about-label {
    font-size: clamp(14px, 1.5vw, 16px);
  }

  /* ── CREDITS: wider layout, proportional title ── */
  .cr-card {
    min-height: 380px;
    padding: 40px 48px 52px;
  }
  .cr-title {
    font-size: clamp(46px, 6vw, 72px);
  }
  .cr-ifgide {
    font-size: clamp(46px, 6vw, 72px);
  }
  .cr-of {
    font-size: clamp(11px, 1.3vw, 14px);
  }
  .cr-slabel {
    font-size: clamp(9px, 1vw, 11px);
  }
  .cr-sval {
    font-size: clamp(9px, 1.1vw, 12px);
  }

  /* ── HEADER / FOOTER: tighter proportions on wide ── */
  .sh-hdr span {
    font-size: clamp(20px, 2.4vw, 28px);
  }
  .sh-ftr span {
    font-size: clamp(36px, 4.5vw, 58px);
  }

  /* ── CART WIDGET: pin to right edge of content column ── */
  #cart-widget {
    right: 28px;
    bottom: 100px;
  }
  #cart-panel {
    width: clamp(300px, 22vw, 400px);
  }

  /* ── GLASS CARD: tighter shadow on large screen ── */
  .glass-card {
    box-shadow:
      0 2px 0 rgba(255,255,255,0.95) inset,
      0 16px 52px rgba(0,0,160,0.07),
      0 1.5px 0 rgba(50,50,255,0.07);
  }

  /* ── MARQUEE ROW HEIGHT: tighter on desktop ── */
  .mrq-row {
    height: clamp(36px, 4.5vw, 50px);
  }
  .mrq-t {
    font-size: clamp(28px, 3.8vw, 48px);
  }

  /* ── TUNNEL ITEM: deeper Z, more cinematic on wide ── */
  .tunnel-item {
    transform: translate3d(-8px, 72px, -200px) scale(0.70) rotateX(6deg) rotateY(-3deg);
  }

  /* ── SECTION GAPS: proportional, thicker ── */
  .sgap {
    height: 20px;
  }

} /* end @media (min-width: 1024px) */


/* ══════════════════════════════════════════════════════
   3D CARD EFFECT — Premium Aceternity-style
   Berlaku untuk semua <section data-card3d>
   dan juga .glass-card, article.pi, article.dk-item
══════════════════════════════════════════════════════ */

/* Layer wrapper yang menerima transform perspektif */
[data-card3d] {
  --c3d-rotX: 0deg;
  --c3d-rotY: 0deg;
  --c3d-glareX: 50%;
  --c3d-glareY: 50%;
  --c3d-glareOp: 0;
  --c3d-shadowX: 0px;
  --c3d-shadowY: 8px;
  --c3d-shadowBlur: 32px;
  --c3d-scale: 1;
  --c3d-lift: 0px;

  transform-style: preserve-3d;
  /* Perspektif diterapkan langsung di elemen agar child bisa pakai translateZ */
  perspective: 900px;
  will-change: transform, box-shadow;
  transition:
    transform          0.08s linear,
    box-shadow         0.08s linear;
  cursor: pointer;
  position: relative;
  overflow: hidden;  /* supaya glare tidak bocor */
}

/* State aktif saat mouse di atas */
[data-card3d].c3d-active {
  transform:
    scale3d(var(--c3d-scale), var(--c3d-scale), var(--c3d-scale))
    rotateX(var(--c3d-rotX))
    rotateY(var(--c3d-rotY))
    translateZ(var(--c3d-lift));
  box-shadow:
    var(--c3d-shadowX) var(--c3d-shadowY) var(--c3d-shadowBlur) 0px rgba(0,0,80,0.28),
    0 0 0 1.5px rgba(51,51,255,0.18),
    inset 0 1px 0 rgba(255,255,255,0.72);
}

/* Reset smooth saat mouse keluar */
[data-card3d].c3d-leaving {
  transition:
    transform 0.65s cubic-bezier(0.22, 0.68, 0, 1.2),
    box-shadow 0.65s cubic-bezier(0.22, 0.68, 0, 1.2);
  transform: scale3d(1,1,1) rotateX(0deg) rotateY(0deg) translateZ(0px);
  box-shadow:
    0 4px 24px rgba(0,0,80,0.10),
    0 0 0 1px rgba(51,51,255,0.06),
    inset 0 1px 0 rgba(255,255,255,0.55);
}

/* Glare highlight layer */
[data-card3d]::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  border-radius: inherit;
  background: radial-gradient(
    circle at var(--c3d-glareX) var(--c3d-glareY),
    rgba(255,255,255,0.28) 0%,
    rgba(255,255,255,0.10) 28%,
    transparent 65%
  );
  opacity: var(--c3d-glareOp);
  transition: opacity 0.08s linear;
  mix-blend-mode: screen;
}

/* Shadow tracking — elemen pseudo di bawah card */
[data-card3d]::before {
  content: '';
  position: absolute;
  inset: 6% 8%;
  bottom: -18px;
  z-index: -1;
  border-radius: inherit;
  background: transparent;
  box-shadow:
    var(--c3d-shadowX) calc(var(--c3d-shadowY) + 12px) calc(var(--c3d-shadowBlur) + 8px) -4px rgba(0,0,80,0.22);
  transition:
    box-shadow 0.08s linear;
  pointer-events: none;
}

/* Child-depth lift saat card aktif — konten terasa melayang */
[data-card3d].c3d-active .pi-img-area,
[data-card3d].c3d-active .dk-img-area,
[data-card3d].c3d-active .shop-3d-frame,
[data-card3d].c3d-active .about-card,
[data-card3d].c3d-active .cr-card {
  transform: translateZ(28px);
  transition: transform 0.08s linear;
}
[data-card3d].c3d-leaving .pi-img-area,
[data-card3d].c3d-leaving .dk-img-area,
[data-card3d].c3d-leaving .shop-3d-frame,
[data-card3d].c3d-leaving .about-card,
[data-card3d].c3d-leaving .cr-card {
  transform: translateZ(0px);
  transition: transform 0.65s cubic-bezier(0.22, 0.68, 0, 1.2);
}

/* Shimmer border tracing saat aktif */
[data-card3d].c3d-active .cm {
  border-color: rgba(80,80,255,0.85);
  transition: border-color 0.12s ease;
}

/* Reduced motion override */
@media (prefers-reduced-motion: reduce) {
  [data-card3d],
  [data-card3d].c3d-active,
  [data-card3d].c3d-leaving {
    transform: none !important;
    transition: none !important;
  }
  [data-card3d]::after {
    display: none !important;
  }
}

/* ── REDUCED MOTION ── */
@media(prefers-reduced-motion:reduce){
  *{animation:none!important;transition:none!important;}
  .rv,.rv-left,.rv-right,.rv-scale,.tunnel-item{opacity:1!important;transform:none!important;filter:none!important;}
  .breath-text{font-variation-settings:unset!important;}
  .deco-bean,.deco-sugar,.deco-steam{display:none!important;}
}
`;

  // ── PERSPECTIVE SVG ──────────────────────────────────────────
  const perspSVG = `<svg viewBox="0 0 400 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="200" y1="100" x2="0"   y2="300" stroke="#3333ff" stroke-width="1"/>
    <line x1="200" y1="100" x2="100" y2="300" stroke="#3333ff" stroke-width="1"/>
    <line x1="200" y1="100" x2="200" y2="300" stroke="#3333ff" stroke-width="1"/>
    <line x1="200" y1="100" x2="300" y2="300" stroke="#3333ff" stroke-width="1"/>
    <line x1="200" y1="100" x2="400" y2="300" stroke="#3333ff" stroke-width="1"/>
    <line x1="0" y1="180" x2="400" y2="180" stroke="#3333ff" stroke-width="0.8"/>
    <line x1="0" y1="220" x2="400" y2="220" stroke="#3333ff" stroke-width="0.8"/>
    <line x1="0" y1="260" x2="400" y2="260" stroke="#3333ff" stroke-width="0.8"/>
  </svg>`;

  // ════════════════════════════════════════════════════════════
  //  FRONTEND JS — Object Literal Pattern, fully upgraded
  // ════════════════════════════════════════════════════════════
  const JS = `
(function() {
  'use strict';

  // ── ChocoCart ─────────────────────────────────────────────────
  const ChocoCart = {
    state: [],
    dom:   {},

    init() {
      this.cacheDOM();
      this.bindEvents();
      this.render();
    },

    cacheDOM() {
      this.dom.panel    = document.getElementById('cart-panel');
      this.dom.body     = document.getElementById('cart-body');
      this.dom.total    = document.getElementById('cart-total');
      this.dom.count    = document.getElementById('cart-count');
      this.dom.toast    = document.getElementById('cart-toast');
      this.dom.btnOpen  = document.getElementById('cart-btn');
      this.dom.btnClose = document.getElementById('cart-close-btn');
      this.dom.btnOrder = document.getElementById('cart-order-btn');
    },

    bindEvents() {
      this.dom.btnOpen.addEventListener('click', () => {
        this.dom.panel.classList.toggle('open');
      });
      this.dom.btnClose.addEventListener('click', () => {
        this.dom.panel.classList.remove('open');
      });
      this.dom.btnOrder.addEventListener('click', () => {
        if (this.state.length === 0) { this.toast('Add items first!'); return; }
        this.state = [];
        this.render();
        this.dom.panel.classList.remove('open');
        this.toast('Order placed! Thank you \\u2746');
      });

      document.querySelectorAll('.pi-plus').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          this.add(btn.getAttribute('data-name'), btn.getAttribute('data-price'));
          btn.style.transform = 'scale(0.82)';
          btn.style.background = '#1111aa';
          setTimeout(() => { btn.style.transform = ''; btn.style.background = ''; }, 200);
        });
      });
    },

    parsePrice(str) {
      const m = str.match(/[\\d.]+/);
      return m ? parseFloat(m[0]) : 0;
    },

    toast(msg) {
      const t = this.dom.toast;
      t.textContent = msg;
      t.classList.add('show');
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
    },

    add(name, priceStr) {
      const price    = this.parsePrice(priceStr);
      const existing = this.state.find(i => i.name === name);
      if (existing) { existing.qty++; }
      else { this.state.push({ name, price, qty: 1 }); }
      this.render();
      this.toast(name + ' added!');
    },

    removeAt(idx) {
      if (this.state[idx].qty > 1) { this.state[idx].qty--; }
      else { this.state.splice(idx, 1); }
      this.render();
    },

    render() {
      const { body, count, total } = this.dom;

      if (this.state.length === 0) {
        body.innerHTML = \`
          <div class="cart-empty">
            <span class="cart-empty-ico">\\u2B21</span>
            LAB INACTIVE<br/>
            <span style="opacity:0.6;font-size:10px;">No specimens in the tray.<br/>Add an item to activate.</span>
          </div>\`;
        count.style.display = 'none';
        total.textContent   = '\\u20ac0.00';
        return;
      }

      let grandTotal = 0;
      let totalItems = 0;
      let html       = '';

      this.state.forEach((item, idx) => {
        const lineTotal = item.price * item.qty;
        grandTotal += lineTotal;
        totalItems += item.qty;
        html += \`
          <div class="cart-swipe-wrap">
            <div class="cart-swipe-inner" id="swipe-inner-\${idx}">
              <div class="cart-row">
                <span class="cart-row-name">\${item.name}</span>
                <span class="cart-row-qty">&times;\${item.qty}</span>
                <span class="cart-row-price">\\u20ac\${lineTotal.toFixed(2)}</span>
              </div>
              <div class="cart-del-zone" data-idx="\${idx}" role="button" aria-label="Remove \${item.name}" tabindex="0">
                <span>Delete</span>
              </div>
            </div>
          </div>\`;
      });

      body.innerHTML     = html;
      count.style.display = 'flex';
      count.textContent  = totalItems;
      total.textContent  = '\\u20ac' + grandTotal.toFixed(2);

      body.querySelectorAll('.cart-del-zone').forEach(zone => {
        const handler = () => {
          const idx  = parseInt(zone.getAttribute('data-idx'), 10);
          const wrap = zone.closest('.cart-swipe-wrap');
          if (wrap) {
            wrap.style.transition = 'opacity 0.28s ease, max-height 0.32s ease';
            wrap.style.opacity    = '0';
            wrap.style.maxHeight  = wrap.offsetHeight + 'px';
            setTimeout(() => { wrap.style.maxHeight = '0'; wrap.style.overflow = 'hidden'; }, 10);
            setTimeout(() => { this.removeAt(idx); }, 320);
          } else {
            this.removeAt(idx);
          }
        };
        zone.addEventListener('click', handler);
        zone.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handler(); });
      });
    }
  };

  // ── TunnelScroll v2 ───────────────────────────────────────────
  // Tighter margins, dual IntersectionObserver for precise
  // enter/exit tracking. Adds micro-rotateY via CSS class.
  const TunnelScroll = {
    scroller: null,
    items:    [],

    init(scroller) {
      this.scroller = scroller;
      this.items    = Array.from(document.querySelectorAll('[data-tunnel]'));
      if (!this.items.length) return;

      // Entry: elemen harus ≥10% visible — sedikit terlambat → terasa "berat masuk"
      // rootMargin bottom -8%: tidak trigger terlalu dini saat scroll cepat
      this.entryObs = new IntersectionObserver(
        entries => this.onEntry(entries),
        {
          root:       scroller,
          threshold:  0.10,
          rootMargin: '0px 0px -8% 0px'
        }
      );

      // Exit: fires saat ≤2% masih terlihat di atas (hampir keluar)
      // rootMargin top 8%: beri sedikit buffer sebelum exit state
      this.exitObs = new IntersectionObserver(
        entries => this.onExit(entries),
        {
          root:       scroller,
          threshold:  0.02,
          rootMargin: '8% 0px -88% 0px'
        }
      );

      this.items.forEach(el => {
        this.entryObs.observe(el);
        this.exitObs.observe(el);
      });
    },

    onEntry(entries) {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('t-exit');
          // rAF ensures CSS transition picks up the new class
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              e.target.classList.add('t-enter');
            });
          });
        }
      });
    },

    onExit(entries) {
      entries.forEach(e => {
        if (!e.isIntersecting && e.target.classList.contains('t-enter')) {
          e.target.classList.remove('t-enter');
          e.target.classList.add('t-exit');
        }
      });
    }
  };

  // ── RevealObserver ────────────────────────────────────────────
  const RevealObserver = {
    init(scroller) {
      const els = document.querySelectorAll('.rv,.rv-left,.rv-right,.rv-scale');
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            // Stagger via inline delay if one is set
            e.target.classList.add('vis');
            obs.unobserve(e.target);
          }
        });
      }, { root: scroller, threshold: 0.09, rootMargin: '0px 0px -12px 0px' });
      els.forEach(el => obs.observe(el));
    }
  };

  // ── ShopTilt (gyroscope) ──────────────────────────────────────
  const ShopTilt = {
    init() {
      const frame = document.querySelector('.shop-3d-frame');
      if (!frame) return;
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', e => {
          if (e.beta !== null) {
            const tilt = Math.max(-8, Math.min(8, (e.beta - 45) * 0.18));
            frame.style.transform = \`rotateX(\${6 + tilt}deg)\`;
          }
        }, { passive: true });
      }
    }
  };

  // ── ParallaxHero ──────────────────────────────────────────────
  const ParallaxHero = {
    init(scroller) {
      const heroImg = document.querySelector('.shop-img-wrap img');
      if (!heroImg) return;
      scroller.addEventListener('scroll', () => {
        const y = scroller.scrollTop * 0.09;
        heroImg.style.transform = \`translateY(\${y}px)\`;
      }, { passive: true });
    }
  };

  // ── IntroGate ─────────────────────────────────────────────────
  const IntroGate = {
    init() {
      const introEl = document.getElementById('intro');
      const shopEl  = document.getElementById('shop-entrance');
      const enter   = () => shopEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      introEl.addEventListener('click', enter);
      introEl.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') enter();
      });
    }
  };


  // ── Card3D — Premium 3D Tilt Controller ──────────────────────
  // Smooth pointer-tracking tilt + glare + shadow shift
  // Berlaku untuk semua [data-card3d] section
  const Card3D = {
    // Tuning parameters
    MAX_TILT:    14,    // derajat maks rotasi X/Y
    SCALE_UP:    1.028, // scale saat hover
    LIFT_PX:     '6px', // translateZ saat hover
    GLARE_OP:    0.55,  // max glare opacity
    SHADOW_MULT: 1.4,   // pengali shadow tracking
    RAF_ID:      null,
    TOUCH_SUPP:  false,

    init() {
      // Deteksi touch-only device — nonaktifkan tilt
      this.TOUCH_SUPP = window.matchMedia('(hover: none)').matches;
      if (this.TOUCH_SUPP) return;

      const cards = document.querySelectorAll('[data-card3d]');
      if (!cards.length) return;

      cards.forEach(card => this._bind(card));
      console.log('[Card3D] Initialized on', cards.length, 'card(s)');
    },

    _bind(card) {
      let bounds = null;
      let rafId  = null;

      const getCenter = (e) => {
        // Support mouse & touch
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { clientX, clientY };
      };

      const update = (e) => {
        if (!bounds) bounds = card.getBoundingClientRect();
        const { clientX, clientY } = getCenter(e);

        // Posisi relatif di dalam card, range -1 … +1
        const rx = ((clientY - bounds.top)  / bounds.height - 0.5) * 2;
        const ry = ((clientX - bounds.left) / bounds.width  - 0.5) * 2;

        // Rotasi — rx negatif agar tilt arah benar
        const rotX = -(rx * this.MAX_TILT).toFixed(3);
        const rotY =  (ry * this.MAX_TILT).toFixed(3);

        // Glare mengikuti pointer
        const glareX = (((clientX - bounds.left) / bounds.width)  * 100).toFixed(1) + '%';
        const glareY = (((clientY - bounds.top)  / bounds.height) * 100).toFixed(1) + '%';

        // Shadow offset mengikuti tilt
        const shadowX = (ry  * 10 * this.SHADOW_MULT).toFixed(1) + 'px';
        const shadowY = (-rx * 10 * this.SHADOW_MULT + 8).toFixed(1) + 'px';
        const shadowB = (28 + Math.abs(rx) * 10).toFixed(1) + 'px';

        // Glare intensitas naik di pojok
        const glareIntensity = (Math.sqrt(rx * rx + ry * ry) * 0.5 * this.GLARE_OP).toFixed(3);

        // Terapkan via CSS custom props — tidak trigger layout
        card.style.setProperty('--c3d-rotX',      rotX + 'deg');
        card.style.setProperty('--c3d-rotY',      rotY + 'deg');
        card.style.setProperty('--c3d-glareX',    glareX);
        card.style.setProperty('--c3d-glareY',    glareY);
        card.style.setProperty('--c3d-glareOp',   glareIntensity);
        card.style.setProperty('--c3d-shadowX',   shadowX);
        card.style.setProperty('--c3d-shadowY',   shadowY);
        card.style.setProperty('--c3d-shadowBlur',shadowB);
        card.style.setProperty('--c3d-scale',     this.SCALE_UP);
        card.style.setProperty('--c3d-lift',      this.LIFT_PX);
      };

      const onEnter = (e) => {
        bounds = card.getBoundingClientRect();
        card.classList.remove('c3d-leaving');
        card.classList.add('c3d-active');
        update(e);
      };

      const onMove = (e) => {
        if (!card.classList.contains('c3d-active')) return;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          update(e);
          rafId = null;
        });
      };

      const onLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        card.classList.remove('c3d-active');
        card.classList.add('c3d-leaving');

        // Reset custom props setelah transisi selesai
        card.style.setProperty('--c3d-rotX',      '0deg');
        card.style.setProperty('--c3d-rotY',      '0deg');
        card.style.setProperty('--c3d-glareOp',   '0');
        card.style.setProperty('--c3d-shadowX',   '0px');
        card.style.setProperty('--c3d-shadowY',   '8px');
        card.style.setProperty('--c3d-shadowBlur','32px');
        card.style.setProperty('--c3d-scale',     '1');
        card.style.setProperty('--c3d-lift',      '0px');

        // Hapus class leaving setelah transisi (0.65s)
        setTimeout(() => card.classList.remove('c3d-leaving'), 680);
        bounds = null;
      };

      card.addEventListener('mouseenter',  onEnter, { passive: true });
      card.addEventListener('mousemove',   onMove,  { passive: true });
      card.addEventListener('mouseleave',  onLeave, { passive: true });

      // Re-cache bounds saat window resize
      let resizeRaf = null;
      window.addEventListener('resize', () => {
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(() => {
          bounds = null;
          resizeRaf = null;
        });
      }, { passive: true });
    }
  };

  // ── Bootstrap ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const scroller = document.getElementById('scroller');
    ChocoCart.init();
    TunnelScroll.init(scroller);
    RevealObserver.init(scroller);
    ShopTilt.init();
    ParallaxHero.init(scroller);
    IntroGate.init();
    Card3D.init();
  });

})();
`;

  // ── HTML ASSEMBLY ────────────────────────────────────────────
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>ChocoLab</title>
  <style>${CSS}</style>
</head>
<body>

${NOISE_SVG}

<header class="sh-hdr"><span>ChocoLab</span></header>
<div class="sh-band top"></div>
<div id="scroller">

  <!-- ════════════════════════════════
       S0: INTRO
  ════════════════════════════════ -->
  <section data-card3d id="intro" role="region" aria-label="Intro" tabindex="0">
    <!-- God-level sun light effects -->
    <div class="sun-beams" aria-hidden="true"></div>
    <div class="sun-flare" aria-hidden="true"></div>
    <!-- Extra bird flock 3 -->
    <div class="birds-2" aria-hidden="true" style="top:42%;right:auto;left:-8%;animation-name:birdSoar;animation-duration:32s;animation-delay:8s;opacity:0.55;">
      <div class="bird"></div>
      <div class="bird"></div>
    </div>
    <!-- Cinematic letterbox bars -->
    <div class="intro-lbox top" aria-hidden="true"></div>
    <div class="intro-lbox bot" aria-hidden="true"></div>
    <!-- Vignette + scan lines -->
    <div class="intro-vignette" aria-hidden="true"></div>
    <div class="intro-scanlines" aria-hidden="true"></div>
    <!-- Crosshair (flashes once on load) -->
    <div class="intro-xhair" aria-hidden="true"></div>
    <!-- Sky/nature deco REMOVED by patch — replaced by CSS nebula layers -->
    <!-- Particle burst decorators for cinematic depth -->
    <div class="intro-particle" style="--px:12%;--py:28%;--pd:0.1s;--ps:4px;" aria-hidden="true"></div>
    <div class="intro-particle" style="--px:87%;--py:18%;--pd:0.4s;--ps:6px;" aria-hidden="true"></div>
    <div class="intro-particle" style="--px:55%;--py:72%;--pd:0.7s;--ps:3px;" aria-hidden="true"></div>
    <div class="intro-particle" style="--px:33%;--py:60%;--pd:1.1s;--ps:5px;" aria-hidden="true"></div>
    <div class="intro-particle" style="--px:74%;--py:85%;--pd:0.3s;--ps:4px;" aria-hidden="true"></div>
    <div class="intro-particle" style="--px:6%;--py:55%;--pd:0.9s;--ps:7px;"  aria-hidden="true"></div>
    <div class="intro-stall">
      <div class="stall-sign">ChocoLab &mdash; Est. 2024</div>
      <div class="stall-awning"></div>
      <div class="stall-body"><span>Baked Fresh Every Morning &#10022;</span></div>
    </div>
    <div class="intro-brand">
      <p class="intro-portfolio">Portfolio of</p>
      <div class="intro-ifgide">ifGide<span style="font-family:'ZTNature',sans-serif;font-weight:600;font-size:0.55em;">.exe</span></div>
      <div class="intro-brand-title">ChocoLab</div>
      <div class="intro-copy">
        <p>Some mornings deserve more than ordinary.<br/>
        Hand-shaped pastries, single-origin espresso &amp; old-world recipes&mdash;crafted daily with flour-dusted hands and uncompromising love.</p>
      </div>
    </div>
    <!-- Ground hill layer 2 (behind main ground) -->
    <div class="ground-hill2" aria-hidden="true"></div>
    <!-- Clouds layer 1 (existing) -->
    <div class="cloud cloud-4" aria-hidden="true"></div>
    <!-- Clouds layer 2 — low floating -->
    <div class="cloud cloud-5" aria-hidden="true"></div>
    <div class="cloud cloud-6" aria-hidden="true"></div>
    <!-- Sun shimmer rings -->
    <div class="sun-shimmer-ring" aria-hidden="true"></div>
    <div class="sun-shimmer-ring" aria-hidden="true"></div>
    <div class="sun-shimmer-ring" aria-hidden="true"></div>
    <!-- Gold floating dust particles -->
    <div class="intro-gold-dust" style="--gx:15%;--gy:62%;--gs:4px;--gd:5.2s;--ga:0s;" aria-hidden="true"></div>
    <div class="intro-gold-dust" style="--gx:28%;--gy:72%;--gs:6px;--gd:6.8s;--ga:0.8s;" aria-hidden="true"></div>
    <div class="intro-gold-dust" style="--gx:42%;--gy:55%;--gs:3px;--gd:4.5s;--ga:1.4s;" aria-hidden="true"></div>
    <div class="intro-gold-dust" style="--gx:60%;--gy:78%;--gs:5px;--gd:7.2s;--ga:2.1s;" aria-hidden="true"></div>
    <div class="intro-gold-dust" style="--gx:74%;--gy:60%;--gs:4px;--gd:5.8s;--ga:0.4s;" aria-hidden="true"></div>
    <div class="intro-gold-dust" style="--gx:85%;--gy:70%;--gs:7px;--gd:8s;--ga:3s;" aria-hidden="true"></div>
    <div class="intro-gold-dust" style="--gx:7%;--gy:48%;--gs:3px;--gd:4.9s;--ga:1.8s;" aria-hidden="true"></div>
    <div class="intro-gold-dust" style="--gx:52%;--gy:38%;--gs:5px;--gd:6.4s;--ga:2.6s;" aria-hidden="true"></div>
    <!-- Second flock of birds -->
    <div class="birds-2" aria-hidden="true">
      <div class="bird"></div>
      <div class="bird"></div>
    </div>
    <!-- Extra sun rays ring -->
    <div class="sun sun-ray-b" aria-hidden="true"></div>
  </section>

  <!-- ════════════════════════════════
       S1: SHOP ENTRANCE 3D POV
  ════════════════════════════════ -->
  <section data-card3d id="shop-entrance">
    <div class="shop-3d-wrap">
      <div class="shop-3d-frame">
        <div class="shop-floor grid-bg">
          <div class="shop-floor-grid"></div>
          <div class="persp-lines">${perspSVG}</div>
          <div class="shop-wall-l"></div>
          <div class="shop-wall-r"></div>
          <div class="shop-ceiling"></div>
          ${cm()}
          <div class="shop-hero-cont">
            <p class="rv" style="font-family:'ZTNature',sans-serif;font-weight:600;font-size:11px;color:#3333ff;letter-spacing:2px;margin-bottom:3px;">&#10022; CHOCOLAB</p>
            <div class="shop-hero-title rv d1">ChocoLab</div>
            <div class="shop-hours-row rv d2">
              <div class="shop-hours">
                <span class="day">Monday &mdash; Friday</span>
                <span class="time">07.00 &ndash; 17.00</span>
              </div>
            </div>
            <div class="shop-tag-line rv d3">
              <span class="tag-bar"></span>
              <span>Where every bite tells a story worth waking up for</span>
            </div>
          </div>
          <div class="shop-img-wrap rv d2">
            <img src="/assets/taiyaki.png" alt="Taiyaki" loading="eager"/>
          </div>
          <div class="shop-btm rv d3">
            <p>Your mornings deserve something extraordinary. Come in.</p>
            <p style="margin-top:5px;opacity:.72;font-size:clamp(8px,2.1vw,10px);">Every loaf, roll &amp; cup &mdash; made from scratch, served with intention.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="sgap"></div>

  <!-- ════════════════════════════════
       S2: ABOUT
  ════════════════════════════════ -->
  <section data-card3d id="about">
    <div class="about-card grid-bg">
      ${cm()}
      <div class="about-blob-r"></div>
      <div class="about-blob-l"></div>
      <div class="about-title rv">About Us</div>
      <div class="about-spk-row rv d1">${spk(12)}${spk(10)}${spk(12)}</div>
      <p class="about-label rv-left d2">Prologue :</p>
      <p class="about-text rv d2">It all started in a small home kitchen with a simple flour-dusted apron and a dream. At ChocoLab, we bake to bring people together. Inspired by the warmth of family traditions, every pastry and loaf we pull from our oven is made with the same love we'd serve at our own dinner table. Welcome to our family; we're so glad you're here.</p>
      <div class="about-spk-row rv d3">${spk(10)}${spk(12)}${spk(10)}</div>
      <p class="about-label rv-left d3">Philosophy :</p>
      <p class="about-text rv d4">No shortcuts. No preservatives. No compromise. We source our flour from local mills, our butter from grass-fed farms, and our chocolate from single-origin estates. Great baking is not a shortcut&mdash;it is a discipline. A daily commitment to doing something simple, exceptionally well. That is the ChocoLab standard, and it will never change.</p>
      <div class="about-cta rv-scale d5">
        ${cm()}
        <p>Let's explore our kitchen more deeply and have fun</p>
      </div>
    </div>
  </section>
  <div class="sgap"></div>

  <!-- ════════════════════════════════
       S3: PASTRY MENU
  ════════════════════════════════ -->
  <section data-card3d id="pastry">
    ${PASTRIES.map(pastryItem).join("\n")}
  </section>
  <div class="sgap"></div>

  <!-- ════════════════════════════════
       S4: DRINKS
  ════════════════════════════════ -->
  <section data-card3d id="drinks">
    <div class="dk-hcard rv">
      <div class="dk-hgrid"></div>
      <div class="dk-blob-top"></div>
      <div class="dk-scallop"></div>
      <div class="dk-htxt">
        <div class="dk-sub">Coffee &amp; Tea</div>
        <div class="dk-ttl">Drink</div>
      </div>
    </div>
    ${DRINKS.map((d, i) => drinkItem(d, i)).join("\n")}
  </section>
  <div class="sgap"></div>

  <!-- ════════════════════════════════
       S5: CREDITS
  ════════════════════════════════ -->
  <section data-card3d id="credits">
    <div class="cr-card">
      <div class="cr-grid"></div>
      <div class="cr-glow"></div>
      <div>
        <div class="cr-title rv">ChocoLab</div>
        <div class="cr-of rv d1">portfolio of</div>
        <div class="cr-ifgide rv d2">ifGide<span class="cr-exe">.exe</span></div>
      </div>
      <div class="cr-diamond rv d3">
        <svg width="52" height="52" viewBox="0 0 24 24"><path d="M12 2L2 12l10 10 10-10z"/></svg>
      </div>
      <div class="cr-socials rv d4">
        <div class="cr-scol">
          <span class="cr-slabel">instagram</span>
          <span class="cr-sval">st.joanfarc</span>
        </div>
        <div class="cr-scol">
          <span class="cr-slabel">gmail</span>
          <span class="cr-sval">gitasince09@gmail.com</span>
        </div>
        <div class="cr-scol">
          <span class="cr-slabel">whatsapp</span>
          <span class="cr-sval">soon</span>
        </div>
      </div>
    </div>
  </section>

</div>
<div class="sh-band bot"></div>
<footer class="sh-ftr"><span>ChocoLab</span></footer>

<!-- CART WIDGET -->
<div id="cart-widget">
  <div id="cart-panel" role="dialog" aria-label="Shopping Cart">
    <div class="cart-hdr">
      <span class="cart-hdr-title">Your Order</span>
      <button class="cart-close" id="cart-close-btn" aria-label="Close cart">&times;</button>
    </div>
    <div class="cart-body" id="cart-body"></div>
    <div class="cart-ftr">
      <div class="cart-total-row">
        <span class="cart-total-lbl">Total</span>
        <span class="cart-total-val" id="cart-total">&euro;0.00</span>
      </div>
      <button class="cart-order-btn" id="cart-order-btn">Confirm My Order &#10022;</button>
    </div>
  </div>
  <button id="cart-btn" aria-label="Open cart">
    <svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-9.8-3h11.4c.7 0 1.4-.4 1.7-1l3.6-6.5c.3-.5-.1-1.1-.7-1.1H5.2l-.9-2H2v2h1l3.6 8zm11.3 0H7.1l-2.4-5.5H19L16.5 15z"/></svg>
    <span id="cart-count"></span>
  </button>
</div>
<div class="cart-toast" id="cart-toast"></div>

<script>${JS}<\/script>
</body>
</html>`;
}

// ── SERVER ────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(buildHTML());
});

app.listen(PORT, () => {
  console.log("");
  console.log("  +------------------------------------+");
  console.log("  |   ChocoLab is live! ✦ UPGRADED     |");
  console.log(`  |   http://localhost:${PORT}             |`);
  console.log("  +------------------------------------+");
  console.log("");
});
