// ============================================================
//  ChocoLab — patch-desktop.js
//  MODULE 4: Desktop Optimization
//  Usage: node patch-desktop.js
// ============================================================

'use strict';

const fs   = require('fs');
const path = require('path');

const TARGET = path.join(__dirname, 'app.js');

let src = fs.readFileSync(TARGET, 'utf8');

// ── ANCHOR: inject desktop media queries just before the closing
//    @media(prefers-reduced-motion) block (last block in the CSS const)
// ──────────────────────────────────────────────────────────────

const ANCHOR = '/* \u2500\u2500 REDUCED MOTION \u2500\u2500 */\n@media(prefers-reduced-motion:reduce){';

const DESKTOP_CSS =
  '\n' +
  '/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n' +
  '   MODULE 4 \u2014 DESKTOP OPTIMIZATION\n' +
  '   @media (min-width: 1024px)\n' +
  '   \u2022 Perspective lock: 1600px (prevents Z-distortion on wide)\n' +
  '   \u2022 Layout: centered column, max-width cap, sidebar gutter\n' +
  '   \u2022 Cards: side-by-side flex row for pastry/drink items\n' +
  '   \u2022 Font clamp upper bounds tightened for 1440p+ readability\n' +
  '   \u2022 Shop entrance 3D frame scales without barrel distortion\n' +
  '   \u2022 Cart widget repositioned for wide viewport\n' +
  '\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n' +
  '@media (min-width: 1024px) {\n' +
  '\n' +
  '  /* \u2500\u2500 GLOBAL SHELL: center everything, cap width \u2500\u2500 */\n' +
  '  body {\n' +
  '    align-items: center;\n' +
  '  }\n' +
  '  body > * {\n' +
  '    width: 100%;\n' +
  '    max-width: 860px;\n' +
  '  }\n' +
  '  .sh-hdr,\n' +
  '  .sh-band,\n' +
  '  .sh-ftr {\n' +
  '    max-width: 860px;\n' +
  '    width: 100%;\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 SCROLLER: fixed desktop width + shadow rail \u2500\u2500 */\n' +
  '  #scroller {\n' +
  '    max-width: 840px;\n' +
  '    width: calc(100% - 20px);\n' +
  '    box-shadow:\n' +
  '      -1px 0 0 rgba(50,50,255,0.08),\n' +
  '       1px 0 0 rgba(50,50,255,0.08);\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 TUNNEL PERSPECTIVE: lock to 1600px, prevent barrel on wide \u2500\u2500 */\n' +
  '  #pastry,\n' +
  '  #drinks {\n' +
  '    perspective: 1600px;\n' +
  '    perspective-origin: 50% 38%;\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 PASTRY ITEM: side-by-side layout on desktop \u2500\u2500 */\n' +
  '  .pi {\n' +
  '    display: grid;\n' +
  '    grid-template-columns: 1fr 1fr;\n' +
  '    grid-template-rows: auto auto 1fr;\n' +
  '    min-height: 420px;\n' +
  '    align-items: start;\n' +
  '  }\n' +
  '  .pi-num {\n' +
  '    grid-column: 1 / -1;\n' +
  '    font-size: clamp(10px, 1vw, 12px);\n' +
  '    padding: 18px 0 0;\n' +
  '  }\n' +
  '  .pi-title {\n' +
  '    grid-column: 1 / 2;\n' +
  '    padding: 8px 20px 0;\n' +
  '    align-items: flex-start;\n' +
  '  }\n' +
  '  .pi-name {\n' +
  '    font-size: clamp(26px, 3.2vw, 38px);\n' +
  '    max-width: 80%;\n' +
  '  }\n' +
  '  .pi-img-area {\n' +
  '    grid-column: 2 / 3;\n' +
  '    grid-row: 2 / 4;\n' +
  '    min-height: 320px;\n' +
  '    padding: 12px 20px 0;\n' +
  '  }\n' +
  '  .pi-imgw {\n' +
  '    max-width: 340px;\n' +
  '    width: 90%;\n' +
  '  }\n' +
  '  .pi-desc {\n' +
  '    grid-column: 1 / 2;\n' +
  '    grid-row: 3 / 4;\n' +
  '    margin: 12px 20px 24px;\n' +
  '    width: auto;\n' +
  '  }\n' +
  '  .pi-dname {\n' +
  '    font-size: clamp(13px, 1.4vw, 16px);\n' +
  '  }\n' +
  '  .pi-dtxt {\n' +
  '    font-size: clamp(10px, 1.1vw, 12px);\n' +
  '  }\n' +
  '  .pi-badge {\n' +
  '    width: clamp(70px, 8vw, 90px);\n' +
  '    height: clamp(70px, 8vw, 90px);\n' +
  '  }\n' +
  '  .pi-badge span {\n' +
  '    font-size: clamp(20px, 2.6vw, 30px);\n' +
  '  }\n' +
  '  .pi-plus {\n' +
  '    width: clamp(46px, 5vw, 58px);\n' +
  '    height: clamp(46px, 5vw, 58px);\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 DRINK ITEM: mirror pastry layout \u2500\u2500 */\n' +
  '  .dk-item {\n' +
  '    display: grid;\n' +
  '    grid-template-columns: 1fr 1fr;\n' +
  '    grid-template-rows: auto auto auto 1fr;\n' +
  '    min-height: 420px;\n' +
  '    align-items: start;\n' +
  '  }\n' +
  '  .dk-num {\n' +
  '    grid-column: 1 / -1;\n' +
  '    font-size: clamp(10px, 1vw, 12px);\n' +
  '  }\n' +
  '  .dk-title-row {\n' +
  '    grid-column: 1 / 2;\n' +
  '    padding: 8px 20px 0;\n' +
  '  }\n' +
  '  .dk-name {\n' +
  '    font-size: clamp(24px, 3vw, 36px);\n' +
  '    max-width: 80%;\n' +
  '  }\n' +
  '  .dk-img-area {\n' +
  '    grid-column: 2 / 3;\n' +
  '    grid-row: 2 / 5;\n' +
  '    min-height: 320px;\n' +
  '    padding: 12px 20px 0;\n' +
  '  }\n' +
  '  .dk-imgw {\n' +
  '    max-width: 340px;\n' +
  '    width: 90%;\n' +
  '  }\n' +
  '  .dk-food {\n' +
  '    max-height: 300px;\n' +
  '  }\n' +
  '  .dk-tagline-wrap {\n' +
  '    grid-column: 1 / 2;\n' +
  '    grid-row: 3 / 4;\n' +
  '    padding: 0 20px;\n' +
  '  }\n' +
  '  .dk-tagline {\n' +
  '    font-size: clamp(12px, 1.4vw, 16px);\n' +
  '  }\n' +
  '  .dk-desc-box {\n' +
  '    grid-column: 1 / 2;\n' +
  '    grid-row: 4 / 5;\n' +
  '    margin: 12px 20px 24px;\n' +
  '    width: auto;\n' +
  '  }\n' +
  '  .dk-desc-txt {\n' +
  '    font-size: clamp(10px, 1.1vw, 12px);\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 DRINK HEADER CARD \u2500\u2500 */\n' +
  '  .dk-hcard {\n' +
  '    min-height: 200px;\n' +
  '  }\n' +
  '  .dk-ttl {\n' +
  '    font-size: clamp(48px, 6vw, 72px);\n' +
  '  }\n' +
  '  .dk-sub {\n' +
  '    font-size: clamp(14px, 1.6vw, 18px);\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 SHOP ENTRANCE 3D: lock perspective + frame scale \u2500\u2500 */\n' +
  '  #shop-entrance {\n' +
  '    padding: 14px;\n' +
  '  }\n' +
  '  .shop-3d-wrap {\n' +
  '    perspective: 1600px;\n' +
  '    perspective-origin: 50% 40%;\n' +
  '  }\n' +
  '  .shop-3d-frame {\n' +
  '    transform: rotateX(4deg);\n' +
  '  }\n' +
  '  .shop-floor {\n' +
  '    min-height: 480px;\n' +
  '  }\n' +
  '  .shop-hero-title {\n' +
  '    font-size: clamp(44px, 5.5vw, 68px);\n' +
  '  }\n' +
  '  .shop-img-wrap img {\n' +
  '    width: 52%;\n' +
  '    max-width: 380px;\n' +
  '  }\n' +
  '  .shop-hours .day {\n' +
  '    font-size: clamp(10px, 1.2vw, 13px);\n' +
  '  }\n' +
  '  .shop-hours .time {\n' +
  '    font-size: clamp(17px, 2.2vw, 24px);\n' +
  '  }\n' +
  '  .shop-tag-line {\n' +
  '    font-size: clamp(10px, 1.1vw, 12px);\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 INTRO SECTION: cap brand title, fix copy width \u2500\u2500 */\n' +
  '  .intro-brand-title {\n' +
  '    font-size: clamp(52px, 7vw, 88px);\n' +
  '  }\n' +
  '  .intro-copy {\n' +
  '    max-width: 440px;\n' +
  '  }\n' +
  '  .intro-copy p {\n' +
  '    font-size: clamp(11px, 1.3vw, 14px);\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 ABOUT CARD: wider content column, larger type \u2500\u2500 */\n' +
  '  .about-card {\n' +
  '    padding: 40px 48px 48px;\n' +
  '    max-width: 100%;\n' +
  '  }\n' +
  '  .about-title {\n' +
  '    font-size: clamp(44px, 5.5vw, 68px);\n' +
  '  }\n' +
  '  .about-text {\n' +
  '    font-size: clamp(11px, 1.3vw, 14px);\n' +
  '    max-width: 640px;\n' +
  '    margin-left: auto;\n' +
  '    margin-right: auto;\n' +
  '  }\n' +
  '  .about-label {\n' +
  '    font-size: clamp(14px, 1.5vw, 16px);\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 CREDITS: wider layout, proportional title \u2500\u2500 */\n' +
  '  .cr-card {\n' +
  '    min-height: 380px;\n' +
  '    padding: 40px 48px 52px;\n' +
  '  }\n' +
  '  .cr-title {\n' +
  '    font-size: clamp(46px, 6vw, 72px);\n' +
  '  }\n' +
  '  .cr-ifgide {\n' +
  '    font-size: clamp(46px, 6vw, 72px);\n' +
  '  }\n' +
  '  .cr-of {\n' +
  '    font-size: clamp(11px, 1.3vw, 14px);\n' +
  '  }\n' +
  '  .cr-slabel {\n' +
  '    font-size: clamp(9px, 1vw, 11px);\n' +
  '  }\n' +
  '  .cr-sval {\n' +
  '    font-size: clamp(9px, 1.1vw, 12px);\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 HEADER / FOOTER: tighter proportions on wide \u2500\u2500 */\n' +
  '  .sh-hdr span {\n' +
  '    font-size: clamp(20px, 2.4vw, 28px);\n' +
  '  }\n' +
  '  .sh-ftr span {\n' +
  '    font-size: clamp(36px, 4.5vw, 58px);\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 CART WIDGET: pin to right edge of content column \u2500\u2500 */\n' +
  '  #cart-widget {\n' +
  '    right: clamp(12px, calc(50vw - 420px + 12px), calc(50vw - 420px + 12px));\n' +
  '    bottom: 100px;\n' +
  '  }\n' +
  '  #cart-panel {\n' +
  '    width: clamp(280px, 24vw, 360px);\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 GLASS CARD: tighter shadow on large screen \u2500\u2500 */\n' +
  '  .glass-card {\n' +
  '    box-shadow:\n' +
  '      0 2px 0 rgba(255,255,255,0.95) inset,\n' +
  '      0 16px 52px rgba(0,0,160,0.07),\n' +
  '      0 1.5px 0 rgba(50,50,255,0.07);\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 MARQUEE ROW HEIGHT: tighter on desktop \u2500\u2500 */\n' +
  '  .mrq-row {\n' +
  '    height: clamp(36px, 4.5vw, 50px);\n' +
  '  }\n' +
  '  .mrq-t {\n' +
  '    font-size: clamp(28px, 3.8vw, 48px);\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 TUNNEL ITEM: reduce Z-depth on wide (less extreme) \u2500\u2500 */\n' +
  '  .tunnel-item {\n' +
  '    transform: translate3d(-4px, 48px, -120px) scale(0.78) rotateX(3deg) rotateY(-2deg);\n' +
  '  }\n' +
  '\n' +
  '  /* \u2500\u2500 SECTION GAPS: proportional \u2500\u2500 */\n' +
  '  .sgap {\n' +
  '    height: 14px;\n' +
  '  }\n' +
  '\n' +
  '} /* end @media (min-width: 1024px) */\n' +
  '\n';

const REPLACEMENT = DESKTOP_CSS + ANCHOR;

if (!src.includes(ANCHOR)) {
  console.error('[PATCH FAILED] Anchor string not found in app.js.');
  console.error('Expected anchor: ' + ANCHOR);
  process.exit(1);
}

if (src.includes('@media (min-width: 1024px)')) {
  console.warn('[PATCH SKIPPED] Desktop media query already present in app.js. Remove it first to re-apply.');
  process.exit(0);
}

src = src.replace(ANCHOR, REPLACEMENT);

fs.writeFileSync(TARGET, src, 'utf8');

console.log('[PATCH OK] Module 4 desktop CSS injected into app.js');
