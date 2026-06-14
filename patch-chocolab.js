// ============================================================
//  ChocoLab — patch-chocolab.js
//  GOD EXTREME MAX LEVEL UPGRADE
//  Run: node patch-chocolab.js
// ============================================================
'use strict';
const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'app.js');
let src = fs.readFileSync(FILE, 'utf8');

// ─── HELPER ─────────────────────────────────────────────────
function patch(label, from, to) {
  if (!src.includes(from)) {
    console.warn('[SKIP] Not found: ' + label);
    return;
  }
  src = src.replace(from, to);
  console.log('[OK]  ' + label);
}

// ════════════════════════════════════════════════════════════
//  PATCH 1 — DESKTOP FULLSCREEN (remove centered max-width cap)
// ════════════════════════════════════════════════════════════
patch(
  'Desktop: remove body center + max-width cap',
  '  /* ── GLOBAL SHELL: center everything, cap width ── */\n' +
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
  '  }',
  '  /* ── GLOBAL SHELL: true fullscreen desktop ── */\n' +
  '  body {\n' +
  '    align-items: stretch;\n' +
  '  }\n' +
  '  body > * {\n' +
  '    width: 100%;\n' +
  '    max-width: 100%;\n' +
  '  }\n' +
  '  .sh-hdr,\n' +
  '  .sh-band,\n' +
  '  .sh-ftr {\n' +
  '    max-width: 100%;\n' +
  '    width: 100%;\n' +
  '  }'
);

patch(
  'Desktop: scroller fullscreen no max-width shadow',
  '  /* ── SCROLLER: fixed desktop width + shadow rail ── */\n' +
  '  #scroller {\n' +
  '    max-width: 840px;\n' +
  '    width: calc(100% - 20px);\n' +
  '    box-shadow:\n' +
  '      -1px 0 0 rgba(50,50,255,0.08),\n' +
  '       1px 0 0 rgba(50,50,255,0.08);\n' +
  '  }',
  '  /* ── SCROLLER: true fullscreen ── */\n' +
  '  #scroller {\n' +
  '    max-width: 100%;\n' +
  '    width: 100%;\n' +
  '    margin: 0;\n' +
  '    box-shadow: none;\n' +
  '  }'
);

patch(
  'Desktop: cart widget full right edge',
  '  #cart-widget {\n' +
  '    right: clamp(12px, calc(50vw - 420px + 12px), calc(50vw - 420px + 12px));\n' +
  '    bottom: 100px;\n' +
  '  }\n' +
  '  #cart-panel {\n' +
  '    width: clamp(280px, 24vw, 360px);\n' +
  '  }',
  '  #cart-widget {\n' +
  '    right: 28px;\n' +
  '    bottom: 100px;\n' +
  '  }\n' +
  '  #cart-panel {\n' +
  '    width: clamp(300px, 22vw, 400px);\n' +
  '  }'
);

// ════════════════════════════════════════════════════════════
//  PATCH 2 — DRINK CARDS: lebarkan (remove squeezed min-height + grid fix)
// ════════════════════════════════════════════════════════════
patch(
  'Drink card desktop grid — wider image col, no squeeze',
  '  /* ── DRINK ITEM: mirror pastry layout ── */\n' +
  '  .dk-item {\n' +
  '    display: grid;\n' +
  '    grid-template-columns: 1fr 1fr;\n' +
  '    grid-template-rows: auto auto auto 1fr;\n' +
  '    min-height: 420px;\n' +
  '    align-items: start;\n' +
  '  }',
  '  /* ── DRINK ITEM: wider, no squeeze ── */\n' +
  '  .dk-item {\n' +
  '    display: grid;\n' +
  '    grid-template-columns: 55fr 45fr;\n' +
  '    grid-template-rows: auto auto auto 1fr;\n' +
  '    min-height: 480px;\n' +
  '    align-items: start;\n' +
  '  }'
);

patch(
  'Drink card image area desktop — taller, wider',
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
  '  }',
  '  .dk-img-area {\n' +
  '    grid-column: 2 / 3;\n' +
  '    grid-row: 2 / 5;\n' +
  '    min-height: 380px;\n' +
  '    padding: 16px 28px 0;\n' +
  '  }\n' +
  '  .dk-imgw {\n' +
  '    max-width: 420px;\n' +
  '    width: 96%;\n' +
  '  }\n' +
  '  .dk-food {\n' +
  '    max-height: 360px;\n' +
  '  }'
);

// Fix mobile drink card min-height
patch(
  'Drink card mobile min-height — wider',
  '.dk-item{\n' +
  '  position:relative;\n' +
  '  overflow:hidden;\n' +
  '  border:1.5px solid rgba(50,50,255,.22);\n' +
  '  margin-bottom:2px;\n' +
  '  isolation:isolate;\n' +
  '  /* Sama dengan .pi: flexbox column, min-height */\n' +
  '  display:flex;\n' +
  '  flex-direction:column;\n' +
  '  align-items:center;\n' +
  '  min-height:clamp(380px,110vw,560px);\n' +
  '  background:#ffffff;\n' +
  '}',
  '.dk-item{\n' +
  '  position:relative;\n' +
  '  overflow:hidden;\n' +
  '  border:1.5px solid rgba(50,50,255,.22);\n' +
  '  margin-bottom:2px;\n' +
  '  isolation:isolate;\n' +
  '  display:flex;\n' +
  '  flex-direction:column;\n' +
  '  align-items:center;\n' +
  '  min-height:clamp(420px,120vw,640px);\n' +
  '  background:#ffffff;\n' +
  '}'
);

// Fix dk-imgw mobile width
patch(
  'Drink image wrapper mobile — wider',
  '.dk-imgw{\n' +
  '  position:relative;\n' +
  '  z-index:2;\n' +
  '  width:82%;\n' +
  '  max-width:310px;\n' +
  '}',
  '.dk-imgw{\n' +
  '  position:relative;\n' +
  '  z-index:2;\n' +
  '  width:92%;\n' +
  '  max-width:380px;\n' +
  '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 3 — DESKTOP PASTRY CARDS: full-width 2-col with bigger image
// ════════════════════════════════════════════════════════════
patch(
  'Pastry desktop grid — wider image col',
  '  /* ── PASTRY ITEM: side-by-side layout on desktop ── */\n' +
  '  .pi {\n' +
  '    display: grid;\n' +
  '    grid-template-columns: 1fr 1fr;\n' +
  '    grid-template-rows: auto auto 1fr;\n' +
  '    min-height: 420px;\n' +
  '    align-items: start;\n' +
  '  }',
  '  /* ── PASTRY ITEM: side-by-side layout on desktop ── */\n' +
  '  .pi {\n' +
  '    display: grid;\n' +
  '    grid-template-columns: 55fr 45fr;\n' +
  '    grid-template-rows: auto auto 1fr;\n' +
  '    min-height: 480px;\n' +
  '    align-items: start;\n' +
  '  }'
);

patch(
  'Pastry image area desktop — taller',
  '  .pi-img-area {\n' +
  '    grid-column: 2 / 3;\n' +
  '    grid-row: 2 / 4;\n' +
  '    min-height: 320px;\n' +
  '    padding: 12px 20px 0;\n' +
  '  }\n' +
  '  .pi-imgw {\n' +
  '    max-width: 340px;\n' +
  '    width: 90%;\n' +
  '  }',
  '  .pi-img-area {\n' +
  '    grid-column: 2 / 3;\n' +
  '    grid-row: 2 / 4;\n' +
  '    min-height: 380px;\n' +
  '    padding: 16px 28px 0;\n' +
  '  }\n' +
  '  .pi-imgw {\n' +
  '    max-width: 420px;\n' +
  '    width: 96%;\n' +
  '  }'
);

// ════════════════════════════════════════════════════════════
//  PATCH 4 — INTRO SECTION: SUN GOD RAYS + ANIMATED BIRDS EXTREME
// ════════════════════════════════════════════════════════════
patch(
  'Sun — god-level rays with light burst aura',
  '.sun{position:absolute;top:8%;left:50%;transform:translateX(-50%);width:clamp(60px,16vw,90px);height:clamp(60px,16vw,90px);background:radial-gradient(circle,#FFE066 40%,#FFB300 100%);border-radius:50%;box-shadow:0 0 40px 20px rgba(255,200,0,0.35),0 0 80px 40px rgba(255,180,0,0.18);animation:sunPulse 4s ease-in-out infinite;}',
  '.sun{position:absolute;top:6%;left:50%;transform:translateX(-50%);width:clamp(70px,18vw,110px);height:clamp(70px,18vw,110px);background:radial-gradient(circle at 48% 44%,#fff7a0 0%,#FFE566 35%,#FFCC00 65%,#FFB300 100%);border-radius:50%;box-shadow:0 0 0 8px rgba(255,245,120,0.22),0 0 50px 22px rgba(255,220,0,0.55),0 0 100px 50px rgba(255,185,0,0.32),0 0 180px 90px rgba(255,165,0,0.15),0 0 280px 140px rgba(255,140,0,0.07);animation:sunPulseGod 3.5s ease-in-out infinite;z-index:4;}'
);

patch(
  'Sun ray ring — double ring ultra glow',
  '.sun-ray{position:absolute;top:50%;left:50%;width:clamp(80px,22vw,120px);height:clamp(80px,22vw,120px);transform:translate(-50%,-50%);animation:sunRayRot 12s linear infinite;}',
  '.sun-ray{position:absolute;top:50%;left:50%;width:clamp(110px,30vw,170px);height:clamp(110px,30vw,170px);transform:translate(-50%,-50%);animation:sunRayRot 10s linear infinite;z-index:3;}'
);

patch(
  'Sun ray beams — triple wide gold beams',
  '.sun-ray::before,.sun-ray::after{content:\'\';position:absolute;top:50%;left:50%;width:100%;height:3px;background:rgba(255,210,0,0.35);border-radius:2px;}\n' +
  '.sun-ray::before{transform:translate(-50%,-50%) rotate(0deg);}\n' +
  '.sun-ray::after{transform:translate(-50%,-50%) rotate(60deg);}',
  '.sun-ray::before,.sun-ray::after{content:\'\';position:absolute;top:50%;left:50%;width:130%;height:4px;background:linear-gradient(90deg,transparent,rgba(255,235,0,0.7),transparent);border-radius:4px;filter:blur(1px);}\n' +
  '.sun-ray::before{transform:translate(-50%,-50%) rotate(0deg);}\n' +
  '.sun-ray::after{transform:translate(-50%,-50%) rotate(45deg);}'
);

// sunPulseGod keyframe
patch(
  'sunPulse keyframe — replace with god version',
  '@keyframes sunPulse{\n' +
  '  0%,100%{transform:translateX(-50%) scale(1);box-shadow:0 0 40px 20px rgba(255,200,0,.35),0 0 80px 40px rgba(255,180,0,.18);}\n' +
  '  40%{transform:translateX(-50%) scale(1.07);box-shadow:0 0 60px 30px rgba(255,218,0,.55),0 0 110px 60px rgba(255,195,0,.28),0 0 160px 80px rgba(255,180,0,.10);}\n' +
  '  70%{transform:translateX(-50%) scale(1.03);box-shadow:0 0 48px 24px rgba(255,205,0,.42),0 0 90px 48px rgba(255,185,0,.20);}\n' +
  '}',
  '@keyframes sunPulse{\n' +
  '  0%,100%{transform:translateX(-50%) scale(1);box-shadow:0 0 40px 20px rgba(255,200,0,.35),0 0 80px 40px rgba(255,180,0,.18);}\n' +
  '  40%{transform:translateX(-50%) scale(1.07);box-shadow:0 0 60px 30px rgba(255,218,0,.55),0 0 110px 60px rgba(255,195,0,.28),0 0 160px 80px rgba(255,180,0,.10);}\n' +
  '  70%{transform:translateX(-50%) scale(1.03);box-shadow:0 0 48px 24px rgba(255,205,0,.42),0 0 90px 48px rgba(255,185,0,.20);}\n' +
  '}\n' +
  '@keyframes sunPulseGod{\n' +
  '  0%,100%{transform:translateX(-50%) scale(1);box-shadow:0 0 0 8px rgba(255,245,120,0.18),0 0 55px 28px rgba(255,220,0,.6),0 0 110px 55px rgba(255,190,0,.35),0 0 200px 100px rgba(255,165,0,.16),0 0 320px 160px rgba(255,140,0,.07);}\n' +
  '  35%{transform:translateX(-50%) scale(1.10);box-shadow:0 0 0 14px rgba(255,248,140,0.28),0 0 80px 40px rgba(255,235,0,.75),0 0 160px 80px rgba(255,210,0,.45),0 0 280px 140px rgba(255,185,0,.22),0 0 420px 210px rgba(255,160,0,.09);}\n' +
  '  68%{transform:translateX(-50%) scale(1.04);box-shadow:0 0 0 10px rgba(255,245,120,0.22),0 0 64px 32px rgba(255,225,0,.65),0 0 130px 65px rgba(255,195,0,.38),0 0 240px 120px rgba(255,170,0,.18);}\n' +
  '}\n' +
  '@keyframes sunRayRotFast{0%{transform:translate(-50%,-50%) rotate(0deg);}100%{transform:translate(-50%,-50%) rotate(360deg);}}\n' +
  '@keyframes lightFlare{\n' +
  '  0%,100%{opacity:0;transform:translateX(-50%) scaleX(0.4);}\n' +
  '  50%{opacity:0.55;transform:translateX(-50%) scaleX(1);}\n' +
  '}\n' +
  '@keyframes birdFlapFast{0%{transform:scaleY(1) rotate(-8deg);}50%{transform:scaleY(-0.6) rotate(5deg);}100%{transform:scaleY(1) rotate(-8deg);}}\n' +
  '@keyframes birdSoar{\n' +
  '  0%{transform:translateX(-120vw) translateY(0px);}\n' +
  '  25%{transform:translateX(-80vw) translateY(-18px);}\n' +
  '  50%{transform:translateX(-40vw) translateY(8px);}\n' +
  '  75%{transform:translateX(0vw) translateY(-12px);}\n' +
  '  100%{transform:translateX(50vw) translateY(5px);}\n' +
  '}\n' +
  '@keyframes birdSoar2{\n' +
  '  0%{transform:translateX(140vw) translateY(0px);}\n' +
  '  30%{transform:translateX(90vw) translateY(-22px);}\n' +
  '  60%{transform:translateX(40vw) translateY(10px);}\n' +
  '  100%{transform:translateX(-60vw) translateY(-5px);}\n' +
  '}\n' +
  '@keyframes cloudLightPulse{\n' +
  '  0%,100%{filter:brightness(1) drop-shadow(0 0 0px rgba(255,255,220,0));}\n' +
  '  50%{filter:brightness(1.18) drop-shadow(0 0 18px rgba(255,255,180,0.55));}\n' +
  '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 5 — BIRDS: extreme animated soaring flocks
// ════════════════════════════════════════════════════════════
patch(
  'Birds CSS — extreme soaring animation',
  '.birds{position:absolute;top:20%;right:15%;opacity:0.55;animation:birdsFly 18s ease-in-out infinite alternate;}\n' +
  '.bird{display:inline-block;width:14px;height:5px;border-top:2px solid #555;border-radius:50% 50% 0 0;margin:0 3px;animation:birdFlap 0.6s ease-in-out infinite alternate;}\n' +
  '.bird:nth-child(2){animation-delay:0.15s;transform:scale(0.8);}\n' +
  '.bird:nth-child(3){animation-delay:0.3s;transform:scale(0.65);}',
  '.birds{position:absolute;top:22%;left:-15%;opacity:0.82;animation:birdSoar 22s cubic-bezier(0.4,0,0.6,1) 1.2s infinite;will-change:transform;z-index:6;display:flex;gap:6px;align-items:center;}\n' +
  '.bird{display:inline-block;width:clamp(14px,4vw,20px);height:clamp(5px,1.4vw,8px);border-top:2.5px solid #334;border-radius:50% 50% 0 0;animation:birdFlapFast 0.45s ease-in-out infinite;}\n' +
  '.bird:nth-child(2){animation-delay:0.12s;transform:scale(0.82) translateY(-4px);}\n' +
  '.bird:nth-child(3){animation-delay:0.25s;transform:scale(0.66) translateY(2px);}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 6 — BIRDS-2 CSS: second soaring flock
// ════════════════════════════════════════════════════════════
patch(
  'birdsFly keyframe — replace with soaring cross-screen',
  '@keyframes birdsFly{0%{transform:translateX(0) translateY(0);}100%{transform:translateX(-30px) translateY(-8px);}}',
  '@keyframes birdsFly{0%{transform:translateX(0) translateY(0);}100%{transform:translateX(-30px) translateY(-8px);}}\n' +
  '.birds-2{position:absolute;top:34%;right:-12%;opacity:0.7;animation:birdSoar2 28s cubic-bezier(0.4,0,0.6,1) 4s infinite;will-change:transform;z-index:6;display:flex;gap:5px;align-items:center;}\n' +
  '.birds-2 .bird{display:inline-block;width:clamp(11px,3vw,16px);height:clamp(4px,1.1vw,6px);border-top:2px solid #445;border-radius:50% 50% 0 0;animation:birdFlapFast 0.38s ease-in-out infinite;}\n' +
  '.birds-2 .bird:nth-child(1){animation-delay:0.08s;}\n' +
  '.birds-2 .bird:nth-child(2){animation-delay:0.22s;transform:scale(0.78) translateY(-3px);}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 7 — INTRO: sun light ray crepuscular beams (extra layer)
// ════════════════════════════════════════════════════════════
patch(
  'Cloud CSS — add light pulse + crepuscular beams after',
  '.cloud{position:absolute;background:rgba(255,255,255,0.92);border-radius:50px;pointer-events:none;}\n' +
  '.cloud::before,.cloud::after{content:\'\';position:absolute;background:rgba(255,255,255,0.92);border-radius:50%;}',
  '.cloud{position:absolute;background:rgba(255,255,255,0.92);border-radius:50px;pointer-events:none;animation:cloudLightPulse 6s ease-in-out infinite;}\n' +
  '.cloud::before,.cloud::after{content:\'\';position:absolute;background:rgba(255,255,255,0.92);border-radius:50%;}\n' +
  '.sun-flare{\n' +
  '  position:absolute;\n' +
  '  top:calc(6% + clamp(35px,9vw,55px));\n' +
  '  left:50%;\n' +
  '  width:clamp(200px,55vw,340px);\n' +
  '  height:clamp(120px,32vw,200px);\n' +
  '  background:radial-gradient(ellipse at 50% 0%,rgba(255,240,120,0.38) 0%,rgba(255,215,80,0.18) 35%,transparent 70%);\n' +
  '  transform:translateX(-50%);\n' +
  '  pointer-events:none;\n' +
  '  z-index:3;\n' +
  '  animation:lightFlare 4s ease-in-out infinite;\n' +
  '  border-radius:50%;\n' +
  '}\n' +
  '.sun-beams{\n' +
  '  position:absolute;\n' +
  '  top:6%;\n' +
  '  left:50%;\n' +
  '  width:clamp(280px,75vw,520px);\n' +
  '  height:clamp(280px,75vw,520px);\n' +
  '  transform:translate(-50%,-8%);\n' +
  '  pointer-events:none;\n' +
  '  z-index:2;\n' +
  '  background:\n' +
  '    conic-gradient(\n' +
  '      from 0deg at 50% 50%,\n' +
  '      transparent 0deg,rgba(255,235,100,0.09) 3deg,transparent 6deg,\n' +
  '      transparent 18deg,rgba(255,230,80,0.07) 21deg,transparent 24deg,\n' +
  '      transparent 40deg,rgba(255,240,120,0.08) 43deg,transparent 46deg,\n' +
  '      transparent 58deg,rgba(255,225,90,0.06) 61deg,transparent 64deg,\n' +
  '      transparent 80deg,rgba(255,235,100,0.09) 83deg,transparent 86deg,\n' +
  '      transparent 100deg,rgba(255,228,88,0.07) 103deg,transparent 106deg,\n' +
  '      transparent 120deg,rgba(255,240,120,0.08) 123deg,transparent 126deg,\n' +
  '      transparent 145deg,rgba(255,230,80,0.06) 148deg,transparent 151deg,\n' +
  '      transparent 160deg,rgba(255,235,100,0.09) 163deg,transparent 166deg,\n' +
  '      transparent 180deg,rgba(255,225,90,0.07) 183deg,transparent 186deg,\n' +
  '      transparent 200deg,rgba(255,240,120,0.08) 203deg,transparent 206deg,\n' +
  '      transparent 218deg,rgba(255,228,88,0.06) 221deg,transparent 224deg,\n' +
  '      transparent 240deg,rgba(255,235,100,0.09) 243deg,transparent 246deg,\n' +
  '      transparent 260deg,rgba(255,230,80,0.07) 263deg,transparent 266deg,\n' +
  '      transparent 280deg,rgba(255,240,120,0.08) 283deg,transparent 286deg,\n' +
  '      transparent 300deg,rgba(255,225,90,0.06) 303deg,transparent 306deg,\n' +
  '      transparent 318deg,rgba(255,235,100,0.09) 321deg,transparent 324deg,\n' +
  '      transparent 340deg,rgba(255,228,88,0.07) 343deg,transparent 346deg,\n' +
  '      transparent 360deg\n' +
  '    );\n' +
  '  border-radius:50%;\n' +
  '  animation:sunRayRot 28s linear infinite;\n' +
  '  mask:radial-gradient(circle at 50% 50%,transparent 12%,black 100%);\n' +
  '  -webkit-mask:radial-gradient(circle at 50% 50%,transparent 12%,black 100%);\n' +
  '  opacity:0.85;\n' +
  '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 8 — INTRO HTML: add sun-flare + sun-beams + more bird flocks
// ════════════════════════════════════════════════════════════
patch(
  'Intro HTML — inject sun-flare, sun-beams, extra bird flock',
  '    <!-- Cinematic letterbox bars -->\n' +
  '    <div class="intro-lbox top" aria-hidden="true"></div>\n' +
  '    <div class="intro-lbox bot" aria-hidden="true"></div>',
  '    <!-- God-level sun light effects -->\n' +
  '    <div class="sun-beams" aria-hidden="true"></div>\n' +
  '    <div class="sun-flare" aria-hidden="true"></div>\n' +
  '    <!-- Extra bird flock 3 -->\n' +
  '    <div class="birds-2" aria-hidden="true" style="top:42%;right:auto;left:-8%;animation-name:birdSoar;animation-duration:32s;animation-delay:8s;opacity:0.55;">\n' +
  '      <div class="bird"></div>\n' +
  '      <div class="bird"></div>\n' +
  '    </div>\n' +
  '    <!-- Cinematic letterbox bars -->\n' +
  '    <div class="intro-lbox top" aria-hidden="true"></div>\n' +
  '    <div class="intro-lbox bot" aria-hidden="true"></div>'
);

// ════════════════════════════════════════════════════════════
//  PATCH 9 — GLOBAL ANIMATION UPGRADE: extreme level
// ════════════════════════════════════════════════════════════

// Upgrade reveal animation — more cinematic stagger & spring
patch(
  'Reveal animation — extreme spring overshoot',
  '.rv{\n' +
  '  opacity:0;\n' +
  '  transform:translate3d(0,40px,0) scale(0.96);\n' +
  '  transition:\n' +
  '    opacity   0.80s cubic-bezier(0.16,1,0.30,1),\n' +
  '    transform 0.80s cubic-bezier(0.16,1,0.30,1);\n' +
  '  will-change:transform,opacity;\n' +
  '}\n' +
  '.rv.vis{\n' +
  '  opacity:1;\n' +
  '  transform:translate3d(0,0,0) scale(1);\n' +
  '}',
  '.rv{\n' +
  '  opacity:0;\n' +
  '  transform:translate3d(0,52px,0) scale(0.93) rotateX(4deg);\n' +
  '  transition:\n' +
  '    opacity   0.95s cubic-bezier(0.12,0.92,0.22,1.08),\n' +
  '    transform 0.95s cubic-bezier(0.12,0.92,0.22,1.08);\n' +
  '  will-change:transform,opacity;\n' +
  '}\n' +
  '.rv.vis{\n' +
  '  opacity:1;\n' +
  '  transform:translate3d(0,0,0) scale(1) rotateX(0deg);\n' +
  '}'
);

// Upgrade tunnel enter animation
patch(
  'Tunnel item — god-level Z-depth enter',
  '.tunnel-item{\n' +
  '  will-change:transform,opacity;\n' +
  '  /* Idle: tenggelam di kedalaman Z, miring sedikit ke kiri */\n' +
  '  transform:translate3d(-6px, 60px, -180px) scale(0.72) rotateX(4deg) rotateY(-3deg);\n' +
  '  opacity:0;\n' +
  '  /* Durasi enter sedikit lebih panjang — terasa berat & megah */\n' +
  '  transition:\n' +
  '    transform 0.92s cubic-bezier(0.14,0.78,0.24,1.04),\n' +
  '    opacity   0.78s cubic-bezier(0.14,0.78,0.24,1.04);\n' +
  '  transform-style:preserve-3d;\n' +
  '  /* Tidak pakai filter:blur — hemat GPU, cegah composite layer berlebih */\n' +
  '}',
  '.tunnel-item{\n' +
  '  will-change:transform,opacity;\n' +
  '  transform:translate3d(-10px, 80px, -260px) scale(0.64) rotateX(7deg) rotateY(-4deg);\n' +
  '  opacity:0;\n' +
  '  transition:\n' +
  '    transform 1.10s cubic-bezier(0.10,0.82,0.20,1.12),\n' +
  '    opacity   0.90s cubic-bezier(0.12,0.82,0.22,1.06);\n' +
  '  transform-style:preserve-3d;\n' +
  '}'
);

patch(
  'Tunnel exit — more dramatic void thrust',
  '.tunnel-item.t-exit{\n' +
  '  /* Exit: sinematik radikal — Z-thrust ke void + pitch dramatis */\n' +
  '  transform:translate3d(0,-80px,-600px) scale(0.42) rotateX(-22deg) rotateY(8deg) rotateZ(-2deg);\n' +
  '  opacity:0;\n' +
  '  filter:blur(0px);\n' +
  '  transition:\n' +
  '    transform 0.55s cubic-bezier(0.76,0,0.96,0.06),\n' +
  '    opacity   0.32s cubic-bezier(0.76,0,1.0,0.10);\n' +
  '}',
  '.tunnel-item.t-exit{\n' +
  '  transform:translate3d(0,-110px,-900px) scale(0.28) rotateX(-32deg) rotateY(12deg) rotateZ(-3deg);\n' +
  '  opacity:0;\n' +
  '  filter:blur(0px);\n' +
  '  transition:\n' +
  '    transform 0.48s cubic-bezier(0.80,0,0.98,0.04),\n' +
  '    opacity   0.26s cubic-bezier(0.80,0,1.0,0.08);\n' +
  '}'
);

// Upgrade foodFloat — more dramatic levitate
patch(
  'foodFloat keyframe — more dramatic levitation arc',
  '@keyframes foodFloat{\n' +
  '  /* 60 FPS optimized: hanya translate3d + scale\n' +
  '     rotateZ menyebabkan repaint di beberapa mobile GPU — dihapus */\n' +
  '  0%  { transform:translate3d(0,  0px,0) scale(1);     }\n' +
  '  30% { transform:translate3d(0, -8px,0) scale(1.016); }\n' +
  '  62% { transform:translate3d(0,-15px,0) scale(1.024); }\n' +
  '  100%{ transform:translate3d(0,  0px,0) scale(1);     }\n' +
  '}',
  '@keyframes foodFloat{\n' +
  '  0%  { transform:translate3d(0,  0px,0) scale(1);      }\n' +
  '  18% { transform:translate3d(2px,-10px,0) scale(1.022); }\n' +
  '  42% { transform:translate3d(-2px,-22px,0) scale(1.036); }\n' +
  '  70% { transform:translate3d(1px,-18px,0) scale(1.028); }\n' +
  '  100%{ transform:translate3d(0,  0px,0) scale(1);      }\n' +
  '}'
);

// Upgrade spinStar — faster, bigger pulse
patch(
  'spinStar keyframe — bigger dramatic pulse',
  '@keyframes spinStar{\n' +
  '  0%  { transform:rotate(0deg)   scale(1); }\n' +
  '  25% { transform:rotate(90deg)  scale(1.28); }\n' +
  '  50% { transform:rotate(180deg) scale(1.1); }\n' +
  '  75% { transform:rotate(270deg) scale(1.28); }\n' +
  '  100%{ transform:rotate(360deg) scale(1); }\n' +
  '}',
  '@keyframes spinStar{\n' +
  '  0%  { transform:rotate(0deg)   scale(1); }\n' +
  '  20% { transform:rotate(72deg)  scale(1.42); }\n' +
  '  40% { transform:rotate(144deg) scale(1.15); }\n' +
  '  60% { transform:rotate(216deg) scale(1.50); }\n' +
  '  80% { transform:rotate(288deg) scale(1.18); }\n' +
  '  100%{ transform:rotate(360deg) scale(1); }\n' +
  '}'
);

// Upgrade breathIdle — richer variable font breathing
patch(
  'breathIdle — wider oscillation',
  '@keyframes breathIdle{\n' +
  '  0%,100%{ font-variation-settings:\'wght\' 580,\'wdth\' 72; }\n' +
  '  35%    { font-variation-settings:\'wght\' 660,\'wdth\' 80; }\n' +
  '  65%    { font-variation-settings:\'wght\' 620,\'wdth\' 76; }\n' +
  '}',
  '@keyframes breathIdle{\n' +
  '  0%,100%{ font-variation-settings:\'wght\' 560,\'wdth\' 68; }\n' +
  '  28%    { font-variation-settings:\'wght\' 720,\'wdth\' 92; }\n' +
  '  56%    { font-variation-settings:\'wght\' 640,\'wdth\' 80; }\n' +
  '  80%    { font-variation-settings:\'wght\' 700,\'wdth\' 88; }\n' +
  '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 10 — NEOBRUTALISM: upgrade borders, shadows, header band
// ════════════════════════════════════════════════════════════
patch(
  'Header — thicker neobrutalist border bottom',
  '  border-bottom:2px solid rgba(255,255,255,0.13);',
  '  border-bottom:3px solid rgba(255,255,255,0.22);\n' +
  '  box-shadow:0 3px 0 rgba(0,0,80,0.18),0 6px 24px rgba(0,0,100,0.22);'
);

patch(
  'Corner marks — thicker neobrutalist lines',
  '.cm{position:absolute;width:18px;height:18px;border-color:#3333ff;border-style:solid;z-index:4;}',
  '.cm{position:absolute;width:22px;height:22px;border-color:#3333ff;border-style:solid;z-index:4;}'
);

patch(
  'Glass card — stronger neobrutalist border shadow',
  '.glass-card{\n' +
  '  position:relative;\n' +
  '  /* brighter, cleaner glass — no more murky blue tint */\n' +
  '  background:rgba(255,255,255,0.96);\n' +
  '  backdrop-filter:blur(22px) saturate(1.8) brightness(1.06);\n' +
  '  -webkit-backdrop-filter:blur(22px) saturate(1.8) brightness(1.06);\n' +
  '  border:1px solid rgba(80,80,255,0.18);\n' +
  '  box-shadow:\n' +
  '    0 2px 0 rgba(255,255,255,0.95) inset,\n' +
  '    0 12px 40px rgba(0,0,160,0.08),\n' +
  '    0 1.5px 0 rgba(50,50,255,0.08);\n' +
  '  overflow:hidden;\n' +
  '}',
  '.glass-card{\n' +
  '  position:relative;\n' +
  '  background:rgba(255,255,255,0.97);\n' +
  '  backdrop-filter:blur(28px) saturate(2.0) brightness(1.08);\n' +
  '  -webkit-backdrop-filter:blur(28px) saturate(2.0) brightness(1.08);\n' +
  '  border:2px solid rgba(51,51,255,0.30);\n' +
  '  box-shadow:\n' +
  '    0 2px 0 rgba(255,255,255,0.98) inset,\n' +
  '    4px 4px 0 rgba(51,51,255,0.14),\n' +
  '    0 18px 56px rgba(0,0,180,0.12),\n' +
  '    0 2px 0 rgba(50,50,255,0.12);\n' +
  '  overflow:hidden;\n' +
  '}'
);

// Upgrade pi card border to neobrutalist hard shadow
patch(
  'Pastry card — neobrutalist hard offset shadow',
  '.pi{\n' +
  '  position:relative;\n' +
  '  overflow:hidden;\n' +
  '  border:1.5px solid rgba(50,50,255,.22);  /* slightly softer */\n' +
  '  margin-bottom:2px;\n' +
  '  cursor:pointer;\n' +
  '  display:flex;\n' +
  '  flex-direction:column;\n' +
  '  min-height:clamp(380px,110vw,560px);\n' +
  '  background:#ffffff;  /* pure white base for cards */\n' +
  '}',
  '.pi{\n' +
  '  position:relative;\n' +
  '  overflow:hidden;\n' +
  '  border:2px solid rgba(51,51,255,0.32);\n' +
  '  margin-bottom:4px;\n' +
  '  cursor:pointer;\n' +
  '  display:flex;\n' +
  '  flex-direction:column;\n' +
  '  min-height:clamp(380px,110vw,560px);\n' +
  '  background:#ffffff;\n' +
  '  box-shadow:4px 4px 0 rgba(51,51,255,0.16),0 8px 32px rgba(0,0,160,0.10);\n' +
  '  transition:box-shadow 0.32s cubic-bezier(0.16,1,0.30,1),transform 0.32s cubic-bezier(0.16,1,0.30,1);\n' +
  '}\n' +
  '.pi:hover{\n' +
  '  box-shadow:6px 6px 0 rgba(51,51,255,0.28),0 14px 48px rgba(0,0,180,0.16);\n' +
  '  transform:translate(-2px,-2px);\n' +
  '}'
);

// Upgrade dk-item border
patch(
  'Drink card — neobrutalist border + hover',
  '.dk-item{\n' +
  '  position:relative;\n' +
  '  overflow:hidden;\n' +
  '  border:1.5px solid rgba(50,50,255,.22);\n' +
  '  margin-bottom:2px;\n' +
  '  isolation:isolate;\n' +
  '  display:flex;\n' +
  '  flex-direction:column;\n' +
  '  align-items:center;\n' +
  '  min-height:clamp(420px,120vw,640px);\n' +
  '  background:#ffffff;\n' +
  '}',
  '.dk-item{\n' +
  '  position:relative;\n' +
  '  overflow:hidden;\n' +
  '  border:2px solid rgba(51,51,255,0.32);\n' +
  '  margin-bottom:4px;\n' +
  '  isolation:isolate;\n' +
  '  display:flex;\n' +
  '  flex-direction:column;\n' +
  '  align-items:center;\n' +
  '  min-height:clamp(420px,120vw,640px);\n' +
  '  background:#ffffff;\n' +
  '  box-shadow:4px 4px 0 rgba(51,51,255,0.16),0 8px 32px rgba(0,0,160,0.10);\n' +
  '  transition:box-shadow 0.32s cubic-bezier(0.16,1,0.30,1),transform 0.32s cubic-bezier(0.16,1,0.30,1);\n' +
  '}\n' +
  '.dk-item:hover{\n' +
  '  box-shadow:6px 6px 0 rgba(51,51,255,0.28),0 14px 48px rgba(0,0,180,0.16);\n' +
  '  transform:translate(-2px,-2px);\n' +
  '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 11 — DESKTOP: pastry/drinks section full-width no padding-x cap
// ════════════════════════════════════════════════════════════
patch(
  'Desktop pastry tunnel perspective origin',
  '  /* ── TUNNEL PERSPECTIVE: lock to 1600px, prevent barrel on wide ── */\n' +
  '  #pastry,\n' +
  '  #drinks {\n' +
  '    perspective: 1600px;\n' +
  '    perspective-origin: 50% 38%;\n' +
  '  }',
  '  /* ── TUNNEL PERSPECTIVE: extra deep on desktop ── */\n' +
  '  #pastry,\n' +
  '  #drinks {\n' +
  '    perspective: 2200px;\n' +
  '    perspective-origin: 50% 35%;\n' +
  '    padding: 0 6px;\n' +
  '  }'
);

patch(
  'Desktop tunnel item — deeper Z on wide',
  '  /* ── TUNNEL ITEM: reduce Z-depth on wide (less extreme) ── */\n' +
  '  .tunnel-item {\n' +
  '    transform: translate3d(-4px, 48px, -120px) scale(0.78) rotateX(3deg) rotateY(-2deg);\n' +
  '  }',
  '  /* ── TUNNEL ITEM: deeper Z, more cinematic on wide ── */\n' +
  '  .tunnel-item {\n' +
  '    transform: translate3d(-8px, 72px, -200px) scale(0.70) rotateX(6deg) rotateY(-3deg);\n' +
  '  }'
);

// ════════════════════════════════════════════════════════════
//  PATCH 12 — SHOP ENTRANCE: desktop fullscreen proportions
// ════════════════════════════════════════════════════════════
patch(
  'Shop floor desktop min-height — taller fullscreen',
  '  .shop-floor {\n' +
  '    min-height: 480px;\n' +
  '  }',
  '  .shop-floor {\n' +
  '    min-height: clamp(480px, 52vh, 680px);\n' +
  '  }'
);

patch(
  'Shop image wrap desktop — larger hero food image',
  '  .shop-img-wrap img {\n' +
  '    width: 52%;\n' +
  '    max-width: 380px;\n' +
  '  }',
  '  .shop-img-wrap img {\n' +
  '    width: 56%;\n' +
  '    max-width: 460px;\n' +
  '  }'
);

// ════════════════════════════════════════════════════════════
//  PATCH 13 — SCROLLER mobile: remove side margin for fullscreen feel
// ════════════════════════════════════════════════════════════
patch(
  'Scroller margin 10px — fullscreen no gap',
  '  flex:1;\n' +
  '  overflow-y:auto;\n' +
  '  overflow-x:hidden;\n' +
  '  margin:0 10px;\n' +
  '  scrollbar-width:none;\n' +
  '  -webkit-overflow-scrolling:touch;\n' +
  '  background:#fff;\n' +
  '  position:relative;\n' +
  '  /* cinematic smooth scroll on supporting browsers */\n' +
  '  scroll-behavior:auto;\n' +
  '}',
  '  flex:1;\n' +
  '  overflow-y:auto;\n' +
  '  overflow-x:hidden;\n' +
  '  margin:0;\n' +
  '  scrollbar-width:none;\n' +
  '  -webkit-overflow-scrolling:touch;\n' +
  '  background:#fff;\n' +
  '  position:relative;\n' +
  '  scroll-behavior:auto;\n' +
  '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 14 — EXTRA KEYFRAMES: grain + header shimmer faster
// ════════════════════════════════════════════════════════════
patch(
  'Header shimmer speed — faster dramatic sweep',
  '  animation:headerShimmer 4s cubic-bezier(0.4,0,0.6,1) infinite;',
  '  animation:headerShimmer 2.8s cubic-bezier(0.4,0,0.6,1) infinite;'
);

// ════════════════════════════════════════════════════════════
//  PATCH 15 — PI-PLUS button: add glow pulse animation
// ════════════════════════════════════════════════════════════
patch(
  'Pi-plus button — add glow pulse on idle',
  '.pi-plus{width:clamp(44px,12vw,56px);height:clamp(44px,12vw,56px);background:#3333ff;border-radius:10px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .18s ease,background .18s ease,box-shadow .18s ease;position:relative;z-index:3;}',
  '.pi-plus{width:clamp(44px,12vw,56px);height:clamp(44px,12vw,56px);background:#3333ff;border-radius:10px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .18s ease,background .18s ease,box-shadow .18s ease;position:relative;z-index:3;animation:btnGlowPulse 3.5s ease-in-out infinite;}'
);

// Add btnGlowPulse keyframe right after spinStar
patch(
  'Add btnGlowPulse keyframe after spinStar',
  '@keyframes foodFloat{',
  '@keyframes btnGlowPulse{\n' +
  '  0%,100%{box-shadow:0 4px 14px rgba(51,51,255,0.38);}\n' +
  '  50%{box-shadow:0 4px 24px rgba(51,51,255,0.72),0 0 0 4px rgba(100,100,255,0.18);}\n' +
  '}\n' +
  '@keyframes foodFloat{'
);

// ════════════════════════════════════════════════════════════
//  PATCH 16 — ABOUT SECTION: desktop wider, more impactful
// ════════════════════════════════════════════════════════════
patch(
  'About card desktop — extra breathing room fullscreen',
  '  .about-card {\n' +
  '    padding: 40px 48px 48px;\n' +
  '    max-width: 100%;\n' +
  '  }',
  '  .about-card {\n' +
  '    padding: 56px 8% 64px;\n' +
  '    max-width: 100%;\n' +
  '  }'
);

// ════════════════════════════════════════════════════════════
//  PATCH 17 — SECTION GAPS: thicker blue bars desktop
// ════════════════════════════════════════════════════════════
patch(
  'sgap desktop — taller gap',
  '  /* ── SECTION GAPS: proportional ── */\n' +
  '  .sgap {\n' +
  '    height: 14px;\n' +
  '  }',
  '  /* ── SECTION GAPS: proportional, thicker ── */\n' +
  '  .sgap {\n' +
  '    height: 20px;\n' +
  '  }'
);

// ════════════════════════════════════════════════════════════
//  PATCH 18 — INTRO: sky gradient more vivid & warm sunrise
// ════════════════════════════════════════════════════════════
patch(
  'Intro background — richer sunrise sky gradient',
  '#intro{position:relative;min-height:100vh;overflow:hidden;background:linear-gradient(180deg,#87CEEB 0%,#B8E4F7 35%,#d4edff 55%,#e8f5e9 70%,#c8e6c9 80%,#8BC34A 88%,#558B2F 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;}',
  '#intro{position:relative;min-height:100vh;overflow:hidden;background:linear-gradient(180deg,#4A90D9 0%,#78C8F0 12%,#A8DCF8 26%,#C8EEFF 40%,#DCF5E8 56%,#C5E8A0 70%,#92CC52 82%,#5E9F2A 92%,#3D7A18 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;}'
);

// ════════════════════════════════════════════════════════════
//  WRITE OUTPUT
// ════════════════════════════════════════════════════════════
fs.writeFileSync(FILE, src, 'utf8');
console.log('\n  ✦ patch-chocolab.js selesai — app.js telah di-upgrade ke GOD EXTREME MAX ✦\n');
