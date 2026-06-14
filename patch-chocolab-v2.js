// ============================================================
//  ChocoLab — patch-chocolab-v2.js
//  GOLD EXTREME FULL LEVEL
//  Run: node patch-chocolab-v2.js
// ============================================================
'use strict';
const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'app.js');
let src = fs.readFileSync(FILE, 'utf8');

function patch(label, from, to) {
  if (!src.includes(from)) {
    console.warn('[SKIP] Not found: ' + label);
    return;
  }
  src = src.replace(from, to);
  console.log('[OK]  ' + label);
}

// ════════════════════════════════════════════════════════════
//  PATCH 1 — dk-hcard: fix blob terlalu tinggi (penyebab "D" tertutup)
//  Blob top diperkecil, padding htxt lebih proporsional
// ════════════════════════════════════════════════════════════
patch(
  'dk-blob-top — kurangi ukuran agar tidak nutup "Drink"',
  '.dk-blob-top{position:absolute;top:-52px;left:50%;transform:translateX(-50%);width:160px;height:160px;background:#3333ff;border-radius:50%;pointer-events:none;}',
  '.dk-blob-top{position:absolute;top:-38px;left:50%;transform:translateX(-50%);width:90px;height:90px;background:#3333ff;border-radius:50%;pointer-events:none;animation:blobBob 5s ease-in-out infinite;}'
);

patch(
  'dk-htxt padding — seimbang atas-bawah',
  '.dk-htxt{position:relative;z-index:2;padding:42px 22px 26px;text-align:center;}',
  '.dk-htxt{position:relative;z-index:2;padding:56px 22px 30px;text-align:center;}'
);

patch(
  'dk-hcard min-height — lebih proporsional',
  '  min-height:52vw;\n' +
  '  display:flex;\n' +
  '  flex-direction:column;\n' +
  '  justify-content:center;\n' +
  '  background:#f8f8ff;  /* bright header card */\n' +
  '}',
  '  min-height:clamp(160px,38vw,260px);\n' +
  '  display:flex;\n' +
  '  flex-direction:column;\n' +
  '  justify-content:center;\n' +
  '  background:#f8f8ff;\n' +
  '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 2 — dk-item: layout CENTER simetris (nomor + title centered)
//  Sebelumnya align-items:center tapi title-row justify-content:space-between
//  menyebabkan nomor & tombol tidak simetris
// ════════════════════════════════════════════════════════════
patch(
  'dk-item — force full-width column, no center clip',
  '  display:flex;\n' +
  '  flex-direction:column;\n' +
  '  align-items:center;\n' +
  '  min-height:clamp(380px,110vw,560px);\n' +
  '  background:#ffffff;\n' +
  '}',
  '  display:flex;\n' +
  '  flex-direction:column;\n' +
  '  align-items:stretch;\n' +
  '  min-height:clamp(420px,115vw,600px);\n' +
  '  background:#ffffff;\n' +
  '}'
);

patch(
  'dk-num — center symmetrical with pi-num',
  '.dk-num{\n' +
  '  font-family:\'ZTNature\',sans-serif;\n' +
  '  font-weight:600;\n' +
  '  font-size:clamp(9px,2.3vw,11px);\n' +
  '  color:#3333ff;\n' +
  '  text-align:center;\n' +
  '  padding:14px 0 0;\n' +
  '  position:relative;\n' +
  '  z-index:2;\n' +
  '  letter-spacing:2px;\n' +
  '}',
  '.dk-num{\n' +
  '  font-family:\'ZTNature\',sans-serif;\n' +
  '  font-weight:900;\n' +
  '  font-size:clamp(10px,2.5vw,13px);\n' +
  '  color:#3333ff;\n' +
  '  text-align:center;\n' +
  '  padding:18px 0 4px;\n' +
  '  position:relative;\n' +
  '  z-index:2;\n' +
  '  letter-spacing:3px;\n' +
  '  width:100%;\n' +
  '}'
);

patch(
  'dk-title-row — simetris center, pi-plus sejajar dk-name',
  '.dk-title-row{\n' +
  '  display:flex;\n' +
  '  justify-content:space-between;\n' +
  '  align-items:flex-start;\n' +
  '  padding:6px 16px 0;\n' +
  '  width:100%;\n' +
  '  position:relative;\n' +
  '  z-index:2;\n' +
  '}',
  '.dk-title-row{\n' +
  '  display:flex;\n' +
  '  justify-content:space-between;\n' +
  '  align-items:center;\n' +
  '  padding:8px 20px 4px;\n' +
  '  width:100%;\n' +
  '  position:relative;\n' +
  '  z-index:2;\n' +
  '}'
);

patch(
  'dk-name — bigger, bolder typography',
  '.dk-name{\n' +
  '  font-family:\'GCKroven\',sans-serif;\n' +
  '  font-size:clamp(22px,7vw,34px);\n' +
  '  color:#2222ee;\n' +
  '  line-height:1.05;\n' +
  '  flex:1;\n' +
  '  max-width:66%;\n' +
  '}',
  '.dk-name{\n' +
  '  font-family:\'GCKroven\',sans-serif;\n' +
  '  font-size:clamp(24px,7.5vw,38px);\n' +
  '  color:#2222ee;\n' +
  '  line-height:1.02;\n' +
  '  flex:1;\n' +
  '  max-width:68%;\n' +
  '  animation:textGlowPulse 4s ease-in-out infinite;\n' +
  '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 3 — drinkItem HTML: nomor di tengah, tombol sejajar nama
// ════════════════════════════════════════════════════════════
patch(
  'drinkItem HTML — centered num, symmetric title row',
  '  <!-- Baris nomor — identik dengan pi-num -->\n' +
  '  <p class="pi-num dk-num rv">' + '${num}</p>\n\n' +
  '  <!-- Baris judul + tombol + (identik pi-title) -->\n' +
  '  <div class="pi-title dk-title-row rv d1">\n' +
  '    <div class="dk-name breath-text">' + '${name}</div>\n' +
  '    <button class="pi-plus" data-name="' + '${name}" data-price="' + '${price}" aria-label="Add ' + '${name}">\n' +
  '      <svg viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/></svg>\n' +
  '    </button>\n' +
  '  </div>',
  '  <!-- Nomor seri — center simetris -->\n' +
  '  <p class="pi-num dk-num rv" style="width:100%;text-align:center;">' + '${num}</p>\n\n' +
  '  <!-- Title row: nama + tombol sejajar center -->\n' +
  '  <div class="pi-title dk-title-row rv d1">\n' +
  '    <div class="dk-name breath-text">' + '${name}</div>\n' +
  '    <button class="pi-plus dk-plus-btn" data-name="' + '${name}" data-price="' + '${price}" aria-label="Add ' + '${name}">\n' +
  '      <svg viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/></svg>\n' +
  '    </button>\n' +
  '  </div>'
);

// ════════════════════════════════════════════════════════════
//  PATCH 4 — dk-plus-btn (alias pi-plus in drink context)
//  Sinkronkan ukuran tombol + agar simetris dengan nama
// ════════════════════════════════════════════════════════════
patch(
  'dk-plus-btn — explicit size match neobrutalist style',
  '.dk-plus{display:flex;align-items:center;justify-content:center;margin:0 auto;width:auto;padding:0 18px;gap:6px;font-family:\'ZTNature\',sans-serif;font-weight:900;font-size:13px;color:#fff;border-radius:8px;}',
  '.dk-plus{display:flex;align-items:center;justify-content:center;margin:0 auto;width:auto;padding:0 18px;gap:6px;font-family:\'ZTNature\',sans-serif;font-weight:900;font-size:13px;color:#fff;border-radius:8px;}\n' +
  '.dk-plus-btn{\n' +
  '  width:clamp(44px,11vw,54px)!important;\n' +
  '  height:clamp(44px,11vw,54px)!important;\n' +
  '  background:#3333ff;\n' +
  '  border-radius:10px;\n' +
  '  border:none;\n' +
  '  cursor:pointer;\n' +
  '  display:flex;\n' +
  '  align-items:center;\n' +
  '  justify-content:center;\n' +
  '  flex-shrink:0;\n' +
  '  transition:transform .18s ease,background .18s ease,box-shadow .18s ease;\n' +
  '  position:relative;\n' +
  '  z-index:3;\n' +
  '  animation:btnGlowPulse 3.5s ease-in-out infinite;\n' +
  '}\n' +
  '.dk-plus-btn svg{fill:#fff;width:22px;height:22px;}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 5 — INTRO: tambah clouds (cloud-4 CSS, cloud-5 CSS, cloud-6)
//  + sun rays lebih dramatis + particle floating gold
// ════════════════════════════════════════════════════════════
patch(
  'cloud-3 CSS — tambah cloud-4, cloud-5, cloud-6 setelah',
  '.cloud-3{width:clamp(50px,13vw,80px);height:clamp(16px,4vw,26px);top:14%;left:20%;animation:cloudDrift3 35s linear infinite;}\n' +
  '.cloud-3::before{width:50%;height:145%;top:-60%;left:18%;}\n' +
  '.cloud-3::after{width:38%;height:115%;top:-48%;left:46%;}',
  '.cloud-3{width:clamp(50px,13vw,80px);height:clamp(16px,4vw,26px);top:14%;left:20%;animation:cloudDrift3 35s linear infinite;}\n' +
  '.cloud-3::before{width:50%;height:145%;top:-60%;left:18%;}\n' +
  '.cloud-3::after{width:38%;height:115%;top:-48%;left:46%;}\n' +
  '.cloud-4{width:clamp(110px,28vw,180px);height:clamp(32px,8vw,55px);top:32%;left:-15%;animation:cloudDrift1 30s linear infinite 8s;opacity:0.82;}\n' +
  '.cloud-4::before{width:58%;height:155%;top:-72%;left:12%;}\n' +
  '.cloud-4::after{width:42%;height:125%;top:-58%;left:44%;}\n' +
  '.cloud-5{width:clamp(80px,20vw,130px);height:clamp(24px,6vw,40px);top:45%;right:-12%;animation:cloudDrift2 38s linear infinite 4s;opacity:0.72;}\n' +
  '.cloud-5::before{width:52%;height:148%;top:-68%;left:16%;}\n' +
  '.cloud-5::after{width:38%;height:118%;top:-52%;left:46%;}\n' +
  '.cloud-6{width:clamp(60px,15vw,100px);height:clamp(18px,4.5vw,30px);top:58%;left:5%;animation:cloudDrift3 42s linear infinite 12s;opacity:0.62;}\n' +
  '.cloud-6::before{width:55%;height:150%;top:-65%;left:14%;}\n' +
  '.cloud-6::after{width:40%;height:120%;top:-50%;left:46%;}\n' +
  '/* Gold floating particles in intro */\n' +
  '.intro-gold-dust{\n' +
  '  position:absolute;\n' +
  '  border-radius:50%;\n' +
  '  background:rgba(255,215,0,0.72);\n' +
  '  pointer-events:none;\n' +
  '  z-index:4;\n' +
  '  left:var(--gx,50%);\n' +
  '  top:var(--gy,50%);\n' +
  '  width:var(--gs,5px);\n' +
  '  height:var(--gs,5px);\n' +
  '  animation:goldDustFloat var(--gd,6s) ease-in-out var(--ga,0s) infinite;\n' +
  '  box-shadow:0 0 4px 2px rgba(255,200,0,0.35);\n' +
  '}\n' +
  '@keyframes goldDustFloat{\n' +
  '  0%{transform:translateY(0) scale(1);opacity:0;}\n' +
  '  15%{opacity:0.9;}\n' +
  '  50%{transform:translateY(-38px) translateX(8px) scale(1.18);opacity:0.7;}\n' +
  '  85%{opacity:0.4;}\n' +
  '  100%{transform:translateY(-72px) translateX(-6px) scale(0.6);opacity:0;}\n' +
  '}\n' +
  '/* Sun inner shimmer ring */\n' +
  '.sun-shimmer-ring{\n' +
  '  position:absolute;\n' +
  '  border-radius:50%;\n' +
  '  border:2px solid rgba(255,240,100,0.5);\n' +
  '  animation:ringExpand 3s ease-out infinite;\n' +
  '  pointer-events:none;\n' +
  '  z-index:5;\n' +
  '  left:50%;\n' +
  '  transform:translateX(-50%);\n' +
  '}\n' +
  '.sun-shimmer-ring:nth-child(1){top:5.2%;width:clamp(80px,20vw,120px);height:clamp(80px,20vw,120px);animation-delay:0s;}\n' +
  '.sun-shimmer-ring:nth-child(2){top:4.5%;width:clamp(110px,28vw,165px);height:clamp(110px,28vw,165px);animation-delay:1s;}\n' +
  '.sun-shimmer-ring:nth-child(3){top:3.8%;width:clamp(140px,36vw,210px);height:clamp(140px,36vw,210px);animation-delay:2s;}\n' +
  '@keyframes ringExpand{\n' +
  '  0%{opacity:0.8;transform:translateX(-50%) scale(0.88);}\n' +
  '  60%{opacity:0.3;transform:translateX(-50%) scale(1.12);}\n' +
  '  100%{opacity:0;transform:translateX(-50%) scale(1.38);}\n' +
  '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 6 — INTRO HTML: tambah clouds, gold dust, sun shimmer rings
// ════════════════════════════════════════════════════════════
patch(
  'Intro HTML: tambah cloud-4,5,6, gold-dust, sun-rings',
  '    <!-- Extra cloud far background -->\n' +
  '    <div class="cloud cloud-4" aria-hidden="true"></div>\n' +
  '    <!-- Second flock of birds -->\n' +
  '    <div class="birds-2" aria-hidden="true">\n' +
  '      <div class="bird"></div>\n' +
  '      <div class="bird"></div>\n' +
  '    </div>\n' +
  '    <!-- Extra sun rays ring -->\n' +
  '    <div class="sun sun-ray-b" aria-hidden="true"></div>\n' +
  '    <!-- Extra flowers -->\n' +
  '    <!-- intro-scroll-hint REMOVED by patch -->\n' +
  '  </section>',
  '    <!-- Clouds layer 1 (existing) -->\n' +
  '    <div class="cloud cloud-4" aria-hidden="true"></div>\n' +
  '    <!-- Clouds layer 2 — low floating -->\n' +
  '    <div class="cloud cloud-5" aria-hidden="true"></div>\n' +
  '    <div class="cloud cloud-6" aria-hidden="true"></div>\n' +
  '    <!-- Sun shimmer rings -->\n' +
  '    <div class="sun-shimmer-ring" aria-hidden="true"></div>\n' +
  '    <div class="sun-shimmer-ring" aria-hidden="true"></div>\n' +
  '    <div class="sun-shimmer-ring" aria-hidden="true"></div>\n' +
  '    <!-- Gold floating dust particles -->\n' +
  '    <div class="intro-gold-dust" style="--gx:15%;--gy:62%;--gs:4px;--gd:5.2s;--ga:0s;" aria-hidden="true"></div>\n' +
  '    <div class="intro-gold-dust" style="--gx:28%;--gy:72%;--gs:6px;--gd:6.8s;--ga:0.8s;" aria-hidden="true"></div>\n' +
  '    <div class="intro-gold-dust" style="--gx:42%;--gy:55%;--gs:3px;--gd:4.5s;--ga:1.4s;" aria-hidden="true"></div>\n' +
  '    <div class="intro-gold-dust" style="--gx:60%;--gy:78%;--gs:5px;--gd:7.2s;--ga:2.1s;" aria-hidden="true"></div>\n' +
  '    <div class="intro-gold-dust" style="--gx:74%;--gy:60%;--gs:4px;--gd:5.8s;--ga:0.4s;" aria-hidden="true"></div>\n' +
  '    <div class="intro-gold-dust" style="--gx:85%;--gy:70%;--gs:7px;--gd:8s;--ga:3s;" aria-hidden="true"></div>\n' +
  '    <div class="intro-gold-dust" style="--gx:7%;--gy:48%;--gs:3px;--gd:4.9s;--ga:1.8s;" aria-hidden="true"></div>\n' +
  '    <div class="intro-gold-dust" style="--gx:52%;--gy:38%;--gs:5px;--gd:6.4s;--ga:2.6s;" aria-hidden="true"></div>\n' +
  '    <!-- Second flock of birds -->\n' +
  '    <div class="birds-2" aria-hidden="true">\n' +
  '      <div class="bird"></div>\n' +
  '      <div class="bird"></div>\n' +
  '    </div>\n' +
  '    <!-- Extra sun rays ring -->\n' +
  '    <div class="sun sun-ray-b" aria-hidden="true"></div>\n' +
  '  </section>'
);

// ════════════════════════════════════════════════════════════
//  PATCH 7 — TYPOGRAPHY UPGRADE: all headings, titles, nums
// ════════════════════════════════════════════════════════════

// pi-num — bigger, bolder, animated
patch(
  'pi-num — bigger letter-spacing + subtle float anim',
  '.pi-num{\n' +
  '  font-family:\'ZTNature\',sans-serif;\n' +
  '  font-weight:600;\n' +
  '  font-size:clamp(9px,2.3vw,11px);\n' +
  '  color:#3333ff;   /* stays blue — full contrast on white */\n' +
  '  text-align:center;\n' +
  '  padding:14px 0 0;\n' +
  '  position:relative;\n' +
  '  z-index:2;\n' +
  '  letter-spacing:2px;\n' +
  '}',
  '.pi-num{\n' +
  '  font-family:\'ZTNature\',sans-serif;\n' +
  '  font-weight:900;\n' +
  '  font-size:clamp(10px,2.5vw,13px);\n' +
  '  color:#3333ff;\n' +
  '  text-align:center;\n' +
  '  padding:18px 0 4px;\n' +
  '  position:relative;\n' +
  '  z-index:2;\n' +
  '  letter-spacing:3px;\n' +
  '  text-transform:uppercase;\n' +
  '  animation:numFloat 3.8s ease-in-out infinite;\n' +
  '}'
);

// pi-name — larger, tighter tracking
patch(
  'pi-name — larger, max-width wider',
  '.pi-name{\n' +
  '  font-family:\'GCKroven\',sans-serif;\n' +
  '  font-size:clamp(22px,7vw,34px);\n' +
  '  color:#2222ee;   /* strong blue on white — max legibility */\n' +
  '  line-height:1.05;\n' +
  '  flex:1;\n' +
  '  max-width:66%;\n' +
  '}',
  '.pi-name{\n' +
  '  font-family:\'GCKroven\',sans-serif;\n' +
  '  font-size:clamp(24px,7.5vw,38px);\n' +
  '  color:#2222ee;\n' +
  '  line-height:1.02;\n' +
  '  flex:1;\n' +
  '  max-width:70%;\n' +
  '  animation:textGlowPulse 4.5s ease-in-out infinite;\n' +
  '}'
);

// pi-dname — bolder
patch(
  'pi-dname — bolder, bigger',
  '.pi-dname{font-family:\'ZTNature\',sans-serif;font-weight:900;font-size:clamp(12px,3.2vw,15px);color:#2222ee;text-align:center;margin-bottom:5px;}',
  '.pi-dname{font-family:\'ZTNature\',sans-serif;font-weight:900;font-size:clamp(13px,3.5vw,17px);color:#2222ee;text-align:center;margin-bottom:6px;letter-spacing:0.5px;}'
);

// pi-dtxt — better line-height
patch(
  'pi-dtxt — better readability',
  '.pi-dtxt{font-family:\'ZTNature\',sans-serif;font-weight:600;font-size:clamp(9px,2.4vw,11px);color:#3344aa;text-align:center;line-height:1.62;}',
  '.pi-dtxt{font-family:\'ZTNature\',sans-serif;font-weight:600;font-size:clamp(9.5px,2.5vw,12px);color:#3344aa;text-align:center;line-height:1.72;}'
);

// about-title — bigger
patch(
  'about-title — bigger, more dramatic',
  '.about-title{font-family:\'GCKroven\',sans-serif;font-size:clamp(36px,12vw,54px);color:#3333ff;text-align:center;margin-bottom:20px;position:relative;z-index:2;}',
  '.about-title{font-family:\'GCKroven\',sans-serif;font-size:clamp(40px,13vw,62px);color:#3333ff;text-align:center;margin-bottom:24px;position:relative;z-index:2;letter-spacing:-1px;animation:textGlowPulse 5s ease-in-out infinite;}'
);

// shop-hero-title — larger
patch(
  'shop-hero-title — bigger impact',
  '.shop-hero-title{font-family:\'GCKroven\',sans-serif;font-size:clamp(34px,11vw,56px);color:#3333ff;line-height:1;letter-spacing:-1px;}',
  '.shop-hero-title{font-family:\'GCKroven\',sans-serif;font-size:clamp(38px,12vw,62px);color:#3333ff;line-height:0.96;letter-spacing:-2px;animation:textGlowPulse 6s ease-in-out 1s infinite;}'
);

// dk-ttl — taller, impactful
patch(
  'dk-ttl — dramatic title',
  '.dk-ttl{font-family:\'GCKroven\',sans-serif;font-size:clamp(40px,13vw,62px);color:#3333ff;line-height:1;letter-spacing:-1px;}',
  '.dk-ttl{font-family:\'GCKroven\',sans-serif;font-size:clamp(46px,14vw,70px);color:#3333ff;line-height:0.95;letter-spacing:-2px;animation:textGlowPulse 5s ease-in-out 0.5s infinite;}'
);

// intro brand title — bigger, golden shadow
patch(
  'intro-brand-title — gold shadow, bigger',
  '.intro-brand-title{font-family:\'GCKroven\',sans-serif;font-size:clamp(42px,14vw,72px);color:#fff;text-shadow:0 4px 24px rgba(0,0,100,0.35),0 2px 0 rgba(0,0,80,0.2);letter-spacing:-2px;line-height:1;animation:introBrandIn 1.2s cubic-bezier(.22,.68,0,1.2) both;}',
  '.intro-brand-title{font-family:\'GCKroven\',sans-serif;font-size:clamp(48px,15vw,82px);color:#fff;text-shadow:0 4px 32px rgba(255,200,0,0.45),0 2px 0 rgba(255,160,0,0.3),0 0 60px rgba(255,220,0,0.25);letter-spacing:-2px;line-height:0.98;animation:introBrandIn 1.2s cubic-bezier(.22,.68,0,1.2) both,introTitleGold 3s ease-in-out 1.5s infinite;}'
);

// intro-ifgide — bigger, gold shimmer
patch(
  'intro-ifgide — bigger, gold glow',
  '.intro-ifgide{font-family:\'Estrella\',sans-serif;font-size:clamp(22px,7vw,40px);color:#fff;text-shadow:0 2px 12px rgba(0,0,100,0.25);animation:introBrandIn 1.6s cubic-bezier(.22,.68,0,1.2) both;}',
  '.intro-ifgide{font-family:\'Estrella\',sans-serif;font-size:clamp(26px,8vw,46px);color:#fff;text-shadow:0 2px 16px rgba(255,200,0,0.38),0 1px 0 rgba(255,160,0,0.22);animation:introBrandIn 1.6s cubic-bezier(.22,.68,0,1.2) both;}'
);

// cr-title — gold glow
patch(
  'cr-title — gold glow',
  '.cr-title{position:relative;z-index:2;font-family:\'GCKroven\',sans-serif;font-size:clamp(36px,11vw,56px);color:#3333ff;line-height:1;letter-spacing:-1px;}',
  '.cr-title{position:relative;z-index:2;font-family:\'GCKroven\',sans-serif;font-size:clamp(40px,12vw,62px);color:#3333ff;line-height:0.97;letter-spacing:-1px;animation:textGlowPulse 5s ease-in-out 1s infinite;}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 8 — ANIMATION: gold keyframes + independent per-element
// ════════════════════════════════════════════════════════════
patch(
  'mrqR keyframe — tambah gold keyframes setelah ini',
  '@keyframes mrqL{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}\n' +
  '@keyframes mrqR{0%{transform:translateX(-50%);}100%{transform:translateX(0);}}',
  '@keyframes mrqL{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}\n' +
  '@keyframes mrqR{0%{transform:translateX(-50%);}100%{transform:translateX(0);}}\n' +
  '\n' +
  '/* ══ GOLD ANIMATION SET ══ */\n' +
  '@keyframes textGlowPulse{\n' +
  '  0%,100%{\n' +
  '    filter:drop-shadow(0 0 0px rgba(51,51,255,0));\n' +
  '  }\n' +
  '  50%{\n' +
  '    filter:drop-shadow(0 0 8px rgba(51,51,255,0.28)) drop-shadow(0 0 18px rgba(100,100,255,0.14));\n' +
  '  }\n' +
  '}\n' +
  '@keyframes introTitleGold{\n' +
  '  0%,100%{\n' +
  '    text-shadow:0 4px 32px rgba(255,200,0,0.45),0 2px 0 rgba(255,160,0,0.3),0 0 60px rgba(255,220,0,0.25);\n' +
  '  }\n' +
  '  50%{\n' +
  '    text-shadow:0 4px 48px rgba(255,220,0,0.7),0 2px 0 rgba(255,180,0,0.45),0 0 90px rgba(255,240,0,0.45),0 0 140px rgba(255,200,0,0.2);\n' +
  '  }\n' +
  '}\n' +
  '@keyframes blobBob{\n' +
  '  0%,100%{transform:translateX(-50%) translateY(0);}\n' +
  '  50%{transform:translateX(-50%) translateY(-10px);}\n' +
  '}\n' +
  '@keyframes btnGlowPulse{\n' +
  '  0%,100%{box-shadow:0 4px 14px rgba(51,51,255,0.38);}\n' +
  '  50%{box-shadow:0 4px 24px rgba(51,51,255,0.72),0 0 0 4px rgba(100,100,255,0.18);}\n' +
  '}\n' +
  '@keyframes numFloat{\n' +
  '  0%,100%{transform:translateY(0) scale(1);letter-spacing:3px;}\n' +
  '  50%{transform:translateY(-3px) scale(1.04);letter-spacing:4px;}\n' +
  '}\n' +
  '@keyframes taglinePulse{\n' +
  '  0%,100%{opacity:0.78;letter-spacing:0.5px;}\n' +
  '  50%{opacity:1;letter-spacing:1.5px;}\n' +
  '}\n' +
  '@keyframes badgeSpin{\n' +
  '  0%{transform:rotate(0deg) scale(1);}\n' +
  '  25%{transform:rotate(-8deg) scale(1.06);}\n' +
  '  75%{transform:rotate(8deg) scale(1.06);}\n' +
  '  100%{transform:rotate(0deg) scale(1);}\n' +
  '}\n' +
  '@keyframes descSlideIn{\n' +
  '  0%,100%{border-color:rgba(50,50,255,0.28);background:rgba(248,248,255,0.6);}\n' +
  '  50%{border-color:rgba(51,51,255,0.55);background:rgba(240,240,255,0.85);}\n' +
  '}\n' +
  '@keyframes scallop{\n' +
  '  0%{opacity:0.2;}\n' +
  '  50%{opacity:0.38;}\n' +
  '  100%{opacity:0.2;}\n' +
  '}\n' +
  '@keyframes hdrGlowPulse{\n' +
  '  0%,100%{background:#1a1aaa;}\n' +
  '  50%{background:#2020bb;}\n' +
  '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 9 — INDEPENDENT ANIMATION per element
// ════════════════════════════════════════════════════════════

// pi-badge — pulse spin
patch(
  'pi-badge — add badgeSpin anim',
  '.pi-badge{position:absolute;right:18px;top:14px;width:clamp(66px,17vw,84px);height:clamp(66px,17vw,84px);background:#3333ff;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:3;box-shadow:0 4px 14px rgba(0,0,160,.35);}',
  '.pi-badge{position:absolute;right:18px;top:14px;width:clamp(66px,17vw,84px);height:clamp(66px,17vw,84px);background:#3333ff;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:3;box-shadow:0 4px 14px rgba(0,0,160,.35);animation:badgeSpin 6s ease-in-out infinite;}'
);

// dk-tagline — gets independent taglinePulse
patch(
  'dk-tagline — independent taglinePulse',
  '.dk-tagline{\n' +
  '  font-family:\'GCKroven\',sans-serif;\n' +
  '  font-size:clamp(11px,3.2vw,15px);\n' +
  '  color:#3333ff;\n' +
  '  letter-spacing:0.5px;\n' +
  '  line-height:1.5;\n' +
  '  opacity:0.78;\n' +
  '}',
  '.dk-tagline{\n' +
  '  font-family:\'GCKroven\',sans-serif;\n' +
  '  font-size:clamp(12px,3.5vw,16px);\n' +
  '  color:#3333ff;\n' +
  '  letter-spacing:0.5px;\n' +
  '  line-height:1.5;\n' +
  '  opacity:0.78;\n' +
  '  animation:taglinePulse 4s ease-in-out infinite;\n' +
  '}'
);

// dk-scallop — animated pulse
patch(
  'dk-scallop — animated scallop',
  '.dk-scallop{position:absolute;bottom:0;left:0;right:0;height:50px;background:rgba(110,110,255,.2);clip-path:polygon(0% 100%,4% 0%,8% 100%,12% 0%,16% 100%,20% 0%,24% 100%,28% 0%,32% 100%,36% 0%,40% 100%,44% 0%,48% 100%,52% 0%,56% 100%,60% 0%,64% 100%,68% 0%,72% 100%,76% 0%,80% 100%,84% 0%,88% 100%,92% 0%,96% 100%,100% 0%,100% 100%);pointer-events:none;}',
  '.dk-scallop{position:absolute;bottom:0;left:0;right:0;height:56px;background:rgba(110,110,255,.2);clip-path:polygon(0% 100%,4% 0%,8% 100%,12% 0%,16% 100%,20% 0%,24% 100%,28% 0%,32% 100%,36% 0%,40% 100%,44% 0%,48% 100%,52% 0%,56% 100%,60% 0%,64% 100%,68% 0%,72% 100%,76% 0%,80% 100%,84% 0%,88% 100%,92% 0%,96% 100%,100% 0%,100% 100%);pointer-events:none;animation:scallop 4s ease-in-out infinite;}'
);

// pi-desc — breathe border anim
patch(
  'pi-desc — descSlideIn border anim',
  '.pi-desc{\n' +
  '  margin:12px 16px 20px;\n' +
  '  border:1.5px solid rgba(50,50,255,0.28);   /* softened */\n' +
  '  padding:12px 14px;\n' +
  '  position:relative;\n' +
  '  z-index:2;\n' +
  '  flex:1;\n' +
  '  display:flex;\n' +
  '  flex-direction:column;\n' +
  '  justify-content:flex-start;\n' +
  '  background:rgba(248,248,255,0.6);  /* faint tint, not opaque */\n' +
  '}',
  '.pi-desc{\n' +
  '  margin:12px 16px 20px;\n' +
  '  border:1.5px solid rgba(50,50,255,0.28);\n' +
  '  padding:12px 14px;\n' +
  '  position:relative;\n' +
  '  z-index:2;\n' +
  '  flex:1;\n' +
  '  display:flex;\n' +
  '  flex-direction:column;\n' +
  '  justify-content:flex-start;\n' +
  '  background:rgba(248,248,255,0.6);\n' +
  '  animation:descSlideIn 5s ease-in-out infinite;\n' +
  '}'
);

// header — hdrGlowPulse
patch(
  'sh-hdr — add hdrGlowPulse',
  '.sh-hdr{\n' +
  '  background:#1a1aaa;\n' +
  '  text-align:center;\n' +
  '  padding:13px 0 11px;\n' +
  '  flex-shrink:0;\n' +
  '  border-bottom:2px solid rgba(255,255,255,0.13);\n' +
  '  z-index:50;\n' +
  '  position:relative;\n' +
  '  /* cinematic: subtle shimmer on header */\n' +
  '  overflow:hidden;\n' +
  '}',
  '.sh-hdr{\n' +
  '  background:#1a1aaa;\n' +
  '  text-align:center;\n' +
  '  padding:13px 0 11px;\n' +
  '  flex-shrink:0;\n' +
  '  border-bottom:3px solid rgba(255,255,255,0.22);\n' +
  '  z-index:50;\n' +
  '  position:relative;\n' +
  '  overflow:hidden;\n' +
  '  animation:hdrGlowPulse 5s ease-in-out infinite;\n' +
  '  box-shadow:0 3px 0 rgba(0,0,80,0.18),0 6px 24px rgba(0,0,100,0.22);\n' +
  '}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 10 — STAGGER DELAYS: more granular d7–d10
// ════════════════════════════════════════════════════════════
patch(
  'stagger delays — extend to d10',
  '/* Stagger delays — 0.12s step, up to d6 */\n' +
  '.d1{transition-delay:0.12s;}\n' +
  '.d2{transition-delay:0.24s;}\n' +
  '.d3{transition-delay:0.36s;}\n' +
  '.d4{transition-delay:0.48s;}\n' +
  '.d5{transition-delay:0.60s;}\n' +
  '.d6{transition-delay:0.72s;}',
  '/* Stagger delays — 0.10s step, up to d10 */\n' +
  '.d1{transition-delay:0.10s;}\n' +
  '.d2{transition-delay:0.20s;}\n' +
  '.d3{transition-delay:0.32s;}\n' +
  '.d4{transition-delay:0.44s;}\n' +
  '.d5{transition-delay:0.56s;}\n' +
  '.d6{transition-delay:0.68s;}\n' +
  '.d7{transition-delay:0.80s;}\n' +
  '.d8{transition-delay:0.92s;}\n' +
  '.d9{transition-delay:1.04s;}\n' +
  '.d10{transition-delay:1.16s;}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 11 — INTRO COPY: wider, bigger, gold tinted
// ════════════════════════════════════════════════════════════
patch(
  'intro-copy — wider, bigger type',
  '.intro-copy{max-width:280px;margin:14px auto 0;text-align:center;animation:introCopyIn 2s cubic-bezier(.22,.68,0,1.2) both;}\n' +
  '.intro-copy p{font-family:\'ZTNature\',sans-serif;font-weight:600;font-size:clamp(10px,2.8vw,13px);color:rgba(255,255,255,0.82);line-height:1.65;}',
  '.intro-copy{max-width:340px;margin:16px auto 0;text-align:center;animation:introCopyIn 2s cubic-bezier(.22,.68,0,1.2) both;}\n' +
  '.intro-copy p{font-family:\'ZTNature\',sans-serif;font-weight:600;font-size:clamp(11px,3vw,14px);color:rgba(255,248,220,0.92);line-height:1.7;text-shadow:0 1px 8px rgba(0,0,60,0.28);}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 12 — SPKR star: faster on pastry cards
// ════════════════════════════════════════════════════════════
patch(
  'pi-spk — faster spin anim',
  '.pi-spk{position:absolute;right:26px;bottom:16px;z-index:3;pointer-events:none;}\n' +
  '.pi-spk .spk{animation-duration:6s;}',
  '.pi-spk{position:absolute;right:26px;bottom:16px;z-index:3;pointer-events:none;}\n' +
  '.pi-spk .spk{animation-duration:3.5s;}'
);

// ════════════════════════════════════════════════════════════
//  PATCH 13 — INTRO: cloudDrift4,5,6 keyframes
// ════════════════════════════════════════════════════════════
patch(
  'cloudDrift3 keyframe — add 4,5,6',
  '@keyframes cloudDrift3{0%{transform:translateX(0);}100%{transform:translateX(80vw);}}',
  '@keyframes cloudDrift3{0%{transform:translateX(0);}100%{transform:translateX(80vw);}}\n' +
  '@keyframes cloudDrift4{0%{transform:translateX(-30vw);}50%{transform:translateX(120vw);}50.001%{transform:translateX(-50vw);}100%{transform:translateX(-30vw);}}\n' +
  '@keyframes cloudDrift5{0%{transform:translateX(20vw);}100%{transform:translateX(-130vw);}}\n' +
  '@keyframes cloudDrift6{0%{transform:translateX(-10vw);}100%{transform:translateX(90vw);}}'
);

// Update cloud-4 through 6 to use new keyframes
patch(
  'cloud-4 anim — use cloudDrift4',
  '.cloud-4{width:clamp(110px,28vw,180px);height:clamp(32px,8vw,55px);top:32%;left:-15%;animation:cloudDrift1 30s linear infinite 8s;opacity:0.82;}',
  '.cloud-4{width:clamp(110px,28vw,180px);height:clamp(32px,8vw,55px);top:32%;left:-15%;animation:cloudDrift4 30s linear infinite 0s;opacity:0.82;}'
);

patch(
  'cloud-5 anim — use cloudDrift5',
  '.cloud-5{width:clamp(80px,20vw,130px);height:clamp(24px,6vw,40px);top:45%;right:-12%;animation:cloudDrift2 38s linear infinite 4s;opacity:0.72;}',
  '.cloud-5{width:clamp(80px,20vw,130px);height:clamp(24px,6vw,40px);top:45%;right:-12%;animation:cloudDrift5 38s linear infinite 2s;opacity:0.72;}'
);

patch(
  'cloud-6 anim — use cloudDrift6',
  '.cloud-6{width:clamp(60px,15vw,100px);height:clamp(18px,4.5vw,30px);top:58%;left:5%;animation:cloudDrift3 42s linear infinite 12s;opacity:0.62;}',
  '.cloud-6{width:clamp(60px,15vw,100px);height:clamp(18px,4.5vw,30px);top:58%;left:5%;animation:cloudDrift6 42s linear infinite 6s;opacity:0.62;}'
);

// ════════════════════════════════════════════════════════════
//  WRITE FILE
// ════════════════════════════════════════════════════════════
fs.writeFileSync(FILE, src, 'utf8');
console.log('\n  ✦ patch-chocolab-v2.js DONE — GOLD EXTREME FULL LEVEL ✦\n');
