(function() {
  window.ScribeThemes = window.ScribeThemes || {};

  // --- VISCERAL BLOOD RITUAL & FLESHY VASCULAR GENERATOR ---
  function generateBloodRitual() {
    const cystNodes = [
      { x: 12, y: -130, scale: 1.25, delay: 0.35 },
      { x: -15, y: -195, scale: 1.15, delay: 0.55 },
      { x: 18, y: -260, scale: 1.35, delay: 0.8 },
      { x: -10, y: -340, scale: 1.1, delay: 1.05 },
      { x: 15, y: -430, scale: 1.2, delay: 1.3 },
      { x: 20, y: -515, scale: 0.95, delay: 1.6 },
      { x: 55, y: -220, scale: 0.95, delay: 0.7 },
      { x: 88, y: -285, scale: 1.05, delay: 0.95 },
      { x: -55, y: -270, scale: 0.9, delay: 0.85 },
      { x: -80, y: -360, scale: 1.0, delay: 1.15 }
    ];

    const ritualGlyphs = ['᛭', 'ᚦ', 'ᚱ', 'ᛋ', 'ᛟ', 'ᛗ', 'ᛞ', 'ᚠ'];
    let branchesHTML = '';

    for (let i = 0; i < 8; i++) {
      const rotation = i * 45;
      const isOdd = i % 2 === 1;
      const glyph = ritualGlyphs[i % ritualGlyphs.length];

      let cystsHTML = '';
      cystNodes.forEach(cyst => {
        const s = (cyst.scale * (isOdd ? 1.08 : 0.92)).toFixed(2);
        const d = cyst.delay.toFixed(2);
        const x = isOdd ? -cyst.x : cyst.x;
        cystsHTML += `
          <g transform="translate(${x}, ${cyst.y})">
            <g class="blood-cyst" style="animation-delay: ${d}s;">
              <circle cx="0" cy="0" r="${(4.8 * s).toFixed(1)}" fill="url(#blood-cyst-grad)" stroke="#1a0004" stroke-width="0.8" />
              <circle cx="${(-1.5 * s).toFixed(1)}" cy="${(-1.5 * s).toFixed(1)}" r="${(1.4 * s).toFixed(1)}" fill="rgba(255,180,180,0.7)" />
            </g>
          </g>`;
      });

      branchesHTML += `
        <g transform="rotate(${rotation})">
          <!-- 1. Deep Fleshy Arterial Trunk (Muscular Core) -->
          <path d="M 0 -85 C 22 -135 32 -185 8 -240 C -18 -295 -30 -355 -10 -420 C 12 -475 8 -520 24 -570" 
                fill="none" stroke="url(#artery-trunk-grad)" stroke-width="${isOdd ? '9' : '7.5'}" stroke-linecap="round" class="flesh-trunk" />

          <!-- 2. Glistening Inner Artery Lumen (Pulsating Oxygenated Blood) -->
          <path d="M 0 -85 C 22 -135 32 -185 8 -240 C -18 -295 -30 -355 -10 -420 C 12 -475 8 -520 24 -570" 
                fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" class="artery-lumen" />

          <!-- 3. Parasitic Intertwined Climbing Vein -->
          <path d="M 4 -85 C -22 -135 -18 -190 16 -245 C 32 -300 12 -360 -12 -420 C -28 -470 -14 -520 8 -565" 
                fill="none" stroke="url(#blood-vein-grad)" stroke-width="4.2" stroke-linecap="round" class="vein-runner" />

          <!-- 4. Lateral Branching Arteries & Capillary Webs -->
          <path d="M 12 -170 C 45 -195 72 -230 85 -285 C 95 -335 125 -375 145 -410" 
                fill="none" stroke="url(#artery-trunk-grad)" stroke-width="4.5" stroke-linecap="round" class="flesh-branch" />
          <path d="M 85 -285 C 105 -305 130 -325 155 -340" 
                fill="none" stroke="url(#blood-vein-grad)" stroke-width="2.2" stroke-linecap="round" class="capillary-web" />
          <path d="M 125 -375 C 145 -390 170 -400 190 -410" 
                fill="none" stroke="#ff0033" stroke-width="1.2" stroke-linecap="round" class="capillary-web" opacity="0.8" />

          <path d="M -12 -235 C -45 -260 -70 -298 -65 -350 C -60 -395 -90 -435 -110 -470" 
                fill="none" stroke="url(#artery-trunk-grad)" stroke-width="4.0" stroke-linecap="round" class="flesh-branch" />
          <path d="M -65 -350 C -88 -370 -110 -388 -130 -400" 
                fill="none" stroke="url(#blood-vein-grad)" stroke-width="2.0" stroke-linecap="round" class="capillary-web" />

          <!-- 5. Fine Curled Flesh Tendril Filaments -->
          <path d="M 24 -570 C 35 -585 45 -580 40 -595 C 34 -608 20 -602 18 -590 C 16 -580 28 -580 26 -586" 
                fill="none" stroke="#f43f5e" stroke-width="1.6" stroke-linecap="round" class="flesh-tendril" />
          <path d="M -110 -470 C -125 -485 -135 -480 -130 -495 C -124 -508 -110 -502 -108 -490" 
                fill="none" stroke="#f43f5e" stroke-width="1.4" stroke-linecap="round" class="flesh-tendril" />

          <!-- 6. Swollen Visceral Blood Nodes / Cysts -->
          ${cystsHTML}

          <!-- 7. Bleeding Occult Sigil at the Perimeter Tip -->
          <g transform="translate(${isOdd ? 28 : -14}, -585)" class="bleeding-glyph">
            <text text-anchor="middle" font-family="monospace" font-size="20" fill="#ff1744" 
                  filter="drop-shadow(0 0 8px #ff0033)">${glyph}</text>
            <path d="M 0 6 Q -1 12 0 18" fill="none" stroke="#b91c1c" stroke-width="1.5" stroke-linecap="round" />
          </g>
        </g>
      `;
    }

    return `
      <defs>
        <linearGradient id="artery-trunk-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#140003" />
          <stop offset="25%" stop-color="#4c0511" />
          <stop offset="60%" stop-color="#991b1b" />
          <stop offset="85%" stop-color="#dc2626" />
          <stop offset="100%" stop-color="#2a0208" />
        </linearGradient>

        <linearGradient id="blood-vein-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0d0004" />
          <stop offset="40%" stop-color="#58081f" />
          <stop offset="80%" stop-color="#be123c" />
          <stop offset="100%" stop-color="#fb7185" />
        </linearGradient>

        <radialGradient id="blood-cyst-grad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#ff4d6d" />
          <stop offset="45%" stop-color="#b91c1c" />
          <stop offset="80%" stop-color="#500713" />
          <stop offset="100%" stop-color="#190004" />
        </radialGradient>
      </defs>
      ${branchesHTML}
    `;
  }

  window.ScribeThemes.blood = {
    name: 'blood',
    bgGradient: 'radial-gradient(circle, rgba(20, 0, 0, 0.98) 0%, rgba(5, 0, 0, 1) 100%)',
    voidColor: 'rgba(50, 0, 0, 0.7)',
    thornsColor: 'rgba(150, 0, 0, 0.6)',
    bloodColor: 'rgba(95, 0, 0, 0.95)',
    coreColor: 'rgba(180, 0, 0, 0.85)',
    textColor: '#b91c1c',
    textGlow: 'rgba(220, 38, 38, 0.7)',
    completeGlow: '#ff0033',
    headerPrefix: '> 🩸 **THE BLOOD PACT ARCHIVE**',
    stages: [
      'AWAKENING THE SACRED VEIN...',
      'SIPHONING VESSEL ESSENCE...',
      'TRANSMUTING KNOWLEDGE...',
      'PACT SEALED'
    ],
    outerRunes: '᛭ᚣᛡᛄᛥᛤᛣᛢᛡᛠᛟᛞᛝᛜᛛᛚᛙᛘᛗᛖᛕᛔᛓᛒᛑᛐᛏᛌᛋᛆᛅᛁᚿᚾᚽᚼᚴᚱᚬᚦᚢᚠ᛭',
    innerRunes: 'ᚢᚠ᛭ᚣᛡᛄᛥᛤᛣᛢᛡᛠᛟᛞᛝᛜᛛᛚᛙ',
    extraHTML: `
      <div class="blood-vessels-container">
        <svg viewBox="-300 -300 600 600" width="100%" height="100%" style="overflow: visible;">
          ${generateBloodRitual()}
        </svg>
      </div>
    `,
    coreSvg: `
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5" style="overflow: visible;">
        <defs>
          <radialGradient id="iris-blood-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ff1744"/>
            <stop offset="40%" stop-color="#b91c1c"/>
            <stop offset="75%" stop-color="#4a040b"/>
            <stop offset="100%" stop-color="#0a0002"/>
          </radialGradient>
          <radialGradient id="flesh-core-radial" cx="50%" cy="50%" r="50%">
            <stop offset="20%" stop-color="#380208"/>
            <stop offset="70%" stop-color="#1a0004"/>
            <stop offset="100%" stop-color="#000000"/>
          </radialGradient>
        </defs>

        <!-- 1. Outer Sacrificial Bone Teeth / Ring of Claws -->
        <circle cx="50" cy="50" r="48" stroke="#881337" stroke-width="1.5" stroke-opacity="0.6" stroke-dasharray="4 2" />
        <polygon points="50,2 53,12 47,12" fill="#b91c1c" opacity="0.85"/>
        <polygon points="50,98 53,88 47,88" fill="#b91c1c" opacity="0.85"/>
        <polygon points="2,50 12,53 12,47" fill="#b91c1c" opacity="0.85"/>
        <polygon points="98,50 88,53 88,47" fill="#b91c1c" opacity="0.85"/>
        <polygon points="16,16 25,23 21,27" fill="#991b1b" opacity="0.75"/>
        <polygon points="84,16 75,23 79,27" fill="#991b1b" opacity="0.75"/>
        <polygon points="16,84 25,77 21,73" fill="#991b1b" opacity="0.75"/>
        <polygon points="84,84 75,77 79,73" fill="#991b1b" opacity="0.75"/>

        <!-- 2. Carved Inverted Occult Blood Pentagram -->
        <circle cx="50" cy="50" r="38" fill="url(#flesh-core-radial)" stroke="#dc2626" stroke-width="1.2" stroke-opacity="0.85"/>
        <path d="M 50,88 L 61,54 L 97,54 L 68,33 L 79,-1 L 50,20 L 21,-1 L 32,33 L 3,54 L 39,54 Z" 
              stroke="#ef4444" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="rgba(185, 28, 28, 0.12)" />
        <circle cx="50" cy="50" r="23" stroke="#991b1b" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.7"/>

        <!-- 3. Living Abyssal Void Eye / Fleshy Eyelid Contour -->
        <g class="living-abyssal-eye">
          <path d="M 18,50 Q 50,25 82,50 Q 50,75 18,50 Z" fill="#140003" stroke="#e11d48" stroke-width="1.8" />
          <circle cx="50" cy="50" r="14" fill="url(#iris-blood-grad)" stroke="#ff0033" stroke-width="0.8"/>
          <circle cx="50" cy="50" r="14" fill="none" stroke="#ff8099" stroke-width="0.5" stroke-dasharray="2 3" opacity="0.6"/>
          <ellipse cx="50" cy="50" rx="3.5" ry="12.5" fill="#000000" class="abyssal-pupil"/>
          <circle cx="46" cy="45" r="2.2" fill="#ffffff" opacity="0.9"/>
          <circle cx="53" cy="53" r="1.0" fill="#ffffff" opacity="0.6"/>
        </g>
      </svg>
    `,
    styles: `
      /* OVERRIDES FOR BLOOD THEME */
      .theme-blood .ring-blood {
        border: 4px solid #b91c1c !important;
        background: radial-gradient(circle, rgba(153, 27, 27, 0.35) 15%, rgba(35, 3, 9, 0.85) 60%, rgba(5, 0, 1, 0.95) 90%) !important;
        box-shadow: 0 0 25px #dc2626, inset 0 0 15px #7f1d1d !important;
        animation: morphBlood 6s ease-in-out infinite, rotateCcw 18s linear infinite, bloodPeristalsis 1.6s ease-in-out infinite !important;
      }
      @keyframes bloodPeristalsis {
        0%, 100% { box-shadow: 0 0 15px #dc2626, inset 0 0 10px #7f1d1d; }
        35% { box-shadow: 0 0 35px #ff0033, inset 0 0 25px #b91c1c; transform: scale(1.03); }
        50% { box-shadow: 0 0 22px #dc2626, inset 0 0 16px #991b1b; transform: scale(1.01); }
        70% { box-shadow: 0 0 32px #ff1744, inset 0 0 22px #b91c1c; transform: scale(1.025); }
      }

      /* BLOOD RITUAL & FLESHY VASCULAR ANIMATIONS */
      .blood-vessels-container { position: absolute; width: 100%; height: 100%; z-index: 5; pointer-events: none; }
      .flesh-trunk { 
        stroke-dasharray: 800; stroke-dashoffset: 800; 
        animation: pumpArtery 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; 
        filter: drop-shadow(0 2px 5px rgba(20, 0, 5, 0.95)); 
      }
      .artery-lumen { 
        stroke-dasharray: 800; stroke-dashoffset: 800; 
        animation: pumpArtery 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards, bloodPulseLumen 1.6s ease-in-out infinite alternate; 
      }
      .vein-runner { 
        stroke-dasharray: 750; stroke-dashoffset: 750; 
        animation: pumpArtery 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s forwards; 
        filter: drop-shadow(0 0 5px rgba(220, 38, 38, 0.6)); 
      }
      .flesh-branch { 
        stroke-dasharray: 550; stroke-dashoffset: 550; 
        animation: pumpArtery 1.6s cubic-bezier(0.4, 0, 0.2, 1) 0.35s forwards; 
      }
      .capillary-web { 
        stroke-dasharray: 400; stroke-dashoffset: 400; 
        animation: pumpArtery 1.9s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards; 
      }
      .flesh-tendril { 
        opacity: 0; 
        animation: growFleshTendril 1.2s ease-out 0.8s forwards; 
      }

      @keyframes pumpArtery { to { stroke-dashoffset: 0; } }
      @keyframes bloodPulseLumen { 
        0% { opacity: 0.4; filter: drop-shadow(0 0 2px #ef4444); } 
        100% { opacity: 1; filter: drop-shadow(0 0 10px #ff0033); } 
      }
      @keyframes growFleshTendril { 
        0% { opacity: 0; transform: scale(0.2) rotate(-25deg); } 
        100% { opacity: 1; transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 6px #f43f5e); } 
      }

      /* Swollen Blood Cysts / Nodes */
      .blood-cyst { 
        opacity: 0; 
        animation: popCyst 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, cystHeartbeat 1.6s ease-in-out infinite alternate; 
        transform-origin: 0 0; 
      }
      @keyframes popCyst { 
        0% { opacity: 0; transform: scale(0); } 
        100% { opacity: 1; transform: scale(1); } 
      }
      @keyframes cystHeartbeat { 
        0% { transform: scale(0.85); filter: drop-shadow(0 0 2px #991b1b); } 
        40% { transform: scale(1.25); filter: drop-shadow(0 0 12px #ff0033); } 
        60% { transform: scale(1.05); } 
        100% { transform: scale(0.9); filter: drop-shadow(0 0 3px #991b1b); } 
      }

      /* Bleeding Occult Glyphs */
      .bleeding-glyph { 
        opacity: 0; 
        animation: bleedGlyph 1.2s ease-out 0.9s forwards, glyphGaze 2.5s infinite alternate; 
      }
      @keyframes bleedGlyph { 
        0% { opacity: 0; transform: scale(0.3); } 
        100% { opacity: 1; transform: scale(1); } 
      }
      @keyframes glyphGaze { 
        0% { filter: drop-shadow(0 0 4px #ff0033); } 
        100% { filter: drop-shadow(0 0 16px #ff0000) drop-shadow(0 0 5px #ffffff); } 
      }

      /* Living Abyssal Void Eye */
      .abyssal-pupil { 
        animation: eyeDilate 2.4s ease-in-out infinite alternate; 
        transform-origin: 50px 50px; 
      }
      @keyframes eyeDilate { 
        0% { transform: scaleX(0.25) scaleY(0.95); } 
        40% { transform: scaleX(0.85) scaleY(1.08); filter: drop-shadow(0 0 8px #ff0000); } 
        100% { transform: scaleX(0.35) scaleY(1.0); } 
      }
      .living-abyssal-eye { 
        animation: eyeTremor 4s ease-in-out infinite; 
        transform-origin: 50px 50px; 
      }
      @keyframes eyeTremor { 
        0%, 100% { transform: translate(0, 0); } 
        25% { transform: translate(-1px, 0.5px); } 
        50% { transform: translate(1px, -0.5px); } 
        75% { transform: translate(-0.5px, -1px); } 
      }
    `,
    playIntro(engine, now) {
      if (!engine.ctx || !engine.enabled) return;

      // 1. Occult Sub-bass Sawtooth Drone (55Hz / A1 fundamental)
      const osc = engine.ctx.createOscillator();
      const filter = engine.ctx.createBiquadFilter();
      const gain = engine.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.exponentialRampToValueAtTime(65.4, now + 3);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(130, now);
      filter.frequency.exponentialRampToValueAtTime(380, now + 1.8);
      filter.frequency.exponentialRampToValueAtTime(120, now + 3.8);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.16, now + 0.6);
      gain.gain.setValueAtTime(0.16, now + 2.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(engine.masterGain);

      osc.start(now);
      osc.stop(now + 4);
      engine.activeNodes.push(osc);

      // 2. Procedural Gregorian / Throat Monk Chanting (Formant Synthesis)
      engine.createChantFormantVoice(65.4, now + 0.2, 1.7, {
        f1: 460, targetF1: 650, f2: 850, targetF2: 1200, f3: 2400, f4: 3100
      }, 0.24);

      engine.createChantFormantVoice(77.78, now + 0.35, 1.55, {
        f1: 420, targetF1: 580, f2: 800, targetF2: 1050, f3: 2350, f4: 3150
      }, 0.14);

      engine.createChantFormantVoice(55.0, now + 1.9, 1.9, {
        f1: 360, targetF1: 520, f2: 720, targetF2: 950, f3: 2300, f4: 3100
      }, 0.26);

      engine.createChantFormantVoice(82.4, now + 2.05, 1.75, {
        f1: 340, targetF1: 480, f2: 700, targetF2: 880, f3: 2250, f4: 3150
      }, 0.15);

      // 3. Demonic Whispered Incantations (Eerie sibilance)
      engine.createWhisperIncantation(now + 0.6, 3.2);

      // 4. Heavy Anatomical Heartbeat Pulses (thump... thump...)
      [0.2, 0.45, 1.85, 2.1, 3.15, 3.4].forEach((offset, idx) => {
        const beatOsc = engine.ctx.createOscillator();
        const beatGain = engine.ctx.createGain();
        beatOsc.type = 'sine';
        const fStart = idx % 2 === 0 ? 86 : 68;
        beatOsc.frequency.setValueAtTime(fStart, now + offset);
        beatOsc.frequency.exponentialRampToValueAtTime(26, now + offset + 0.18);

        beatGain.gain.setValueAtTime(0.32, now + offset);
        beatGain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.2);

        beatOsc.connect(beatGain);
        beatGain.connect(engine.masterGain);

        beatOsc.start(now + offset);
        beatOsc.stop(now + offset + 0.22);
        engine.activeNodes.push(beatOsc);
      });
    },
    playSeal(engine, now) {
      if (!engine.ctx || !engine.enabled) return;

      // 1. Heavy Occult Resonant Gong / Bell with metallic overtones
      [110, 164.81, 220, 329.63, 554.37].forEach((freq, idx) => {
        const bell = engine.ctx.createOscillator();
        const bellGain = engine.ctx.createGain();
        bell.type = idx === 0 ? 'triangle' : 'sine';
        bell.frequency.setValueAtTime(freq, now);

        bellGain.gain.setValueAtTime(idx === 0 ? 0.42 : 0.18, now);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        bell.connect(bellGain);
        bellGain.connect(engine.masterGain);
        bell.start(now);
        bell.stop(now + 2.9);
        engine.activeNodes.push(bell);
      });

      // 2. Heavy Sub-bass Seismic Impact (Sacrificial seal locked)
      const sealSub = engine.ctx.createOscillator();
      const sealSubGain = engine.ctx.createGain();
      sealSub.type = 'sine';
      sealSub.frequency.setValueAtTime(75, now);
      sealSub.frequency.exponentialRampToValueAtTime(28, now + 0.6);

      sealSubGain.gain.setValueAtTime(0.38, now);
      sealSubGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      sealSub.connect(sealSubGain);
      sealSubGain.connect(engine.masterGain);
      sealSub.start(now);
      sealSub.stop(now + 1.0);
      engine.activeNodes.push(sealSub);

      // 3. Low vocal resolution hum fading into the void
      engine.createChantFormantVoice(55.0, now + 0.05, 2.2, {
        f1: 320, targetF1: 280, f2: 680, targetF2: 600, f3: 2200, f4: 3000
      }, 0.22);
    },
    initParticle(p) {
      p.isDrip = Math.random() > 0.45;
      p.angle = Math.random() * Math.PI * 2;
      p.dist = Math.random() * 250 + 45;
      p.orbitSpeed = (Math.random() * 0.016 + 0.008) * (Math.random() > 0.5 ? 1 : -1);
    },
    renderParticle(ctx, p) {
      if (p.isDrip) {
        p.speedY += 0.035;
        p.y += p.speedY;
        p.x += Math.sin(p.pulseOffset) * 0.35;
        p.pulseOffset += 0.05;
        p.alpha -= p.decay * 0.75;

        if (p.y > 585 || p.alpha <= 0) {
          p.y = 25 + Math.random() * 60;
          p.x = 80 + Math.random() * 440;
          p.speedY = Math.random() * 1.0 + 0.6;
          p.alpha = Math.random() * 0.8 + 0.2;
        }

        const r = p.radius * 1.35;
        const dropLen = Math.min(p.speedY * 5.0 + r, 24);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - dropLen);
        ctx.bezierCurveTo(p.x - r, p.y - dropLen * 0.3, p.x - r, p.y + r, p.x, p.y + r);
        ctx.bezierCurveTo(p.x + r, p.y + r, p.x + r, p.y - dropLen * 0.3, p.x, p.y - dropLen);
        ctx.closePath();
        ctx.fillStyle = `rgba(${175 + Math.floor(p.radius * 25)}, 8, 20, ${p.alpha})`;
        ctx.shadowColor = '#ff0033';
        ctx.shadowBlur = 8;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x - r * 0.3, p.y + r * 0.2, r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 210, 220, ${p.alpha * 0.7})`;
        ctx.fill();

      } else {
        p.angle += p.orbitSpeed;
        p.dist -= 0.4;
        p.x = 300 + Math.cos(p.angle) * p.dist;
        p.y = 300 + Math.sin(p.angle) * p.dist;
        p.alpha -= p.decay * 0.85;

        if (p.dist < 32 || p.alpha <= 0) {
          p.dist = 265 + Math.random() * 40;
          p.angle = Math.random() * Math.PI * 2;
          p.alpha = Math.random() * 0.8 + 0.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 1.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${190 + Math.floor(p.radius * 20)}, 10, 24, ${p.alpha})`;
        ctx.shadowColor = '#ff1133';
        ctx.shadowBlur = 8;
        ctx.fill();
      }
    }
  };
})();

