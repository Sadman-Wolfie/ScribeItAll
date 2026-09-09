(function() {
  window.ScribeThemes = window.ScribeThemes || {};

  window.ScribeThemes.cyber = {
    name: 'cyber',
    bgGradient: 'radial-gradient(circle, rgba(12, 0, 24, 0.98) 0%, rgba(2, 6, 14, 1) 100%)',
    voidColor: 'rgba(0, 255, 255, 0.15)',
    thornsColor: 'rgba(255, 0, 255, 0.55)',
    bloodColor: 'rgba(0, 210, 255, 0.6)',
    coreColor: 'rgba(0, 255, 255, 0.95)',
    textColor: '#00ffff',
    textGlow: 'rgba(0, 255, 255, 0.85)',
    completeGlow: '#ff00ff',
    headerPrefix: '> ⚡ **THE NEURAL DATALOG**',
    stages: [
      'INITIALIZING NEURAL UPLINK...',
      'DECRYPTING DOM DATASTREAM...',
      'COMPILING DATA MATRIX...',
      'DATA.EXTRACTION_SECURED'
    ],
    outerRunes: '01000101 01011000 01010100 01010010 01000001 01000011 01010100 01001001 01001111 01001110 00100000 01001001 01001110 01001001 01010100',
    innerRunes: '0xFF 0xA2 0xB4 0xC1 0x00 0x11 0x10 0x01',
    extraHTML: `
      <div class="cyber-circuit-container">
        <svg viewBox="-400 -400 800 800" width="100%" height="100%" style="overflow: visible; position: absolute; z-index: -1;">
          <g style="animation: rotateCw 30s linear infinite; transform-origin: 0px 0px;">
             <polygon points="0,-350 303.1,175 -303.1,175" fill="rgba(255,0,255,0.03)" stroke="#ff00ff" stroke-width="4" class="cyber-neon-mag" />
          </g>
          <g style="animation: rotateCcw 40s linear infinite; transform-origin: 0px 0px;">
             <polygon points="0,350 -303.1,-175 303.1,-175" fill="rgba(0,255,255,0.03)" stroke="#00ffff" stroke-width="4" class="cyber-neon-cyan" />
          </g>
          <g style="animation: rotateCw 50s linear infinite; transform-origin: 0px 0px;">
             <polygon points="-400,0 200,346.4 200,-346.4" fill="none" stroke="#ffff00" stroke-width="2" stroke-dasharray="15 10" class="cyber-neon-yel" />
          </g>
        </svg>
        
        <svg viewBox="-300 -300 600 600" width="100%" height="100%" style="overflow: visible; position: absolute;">
          <defs>
            <g id="circuit-system">
               <path d="M 0 -120 L 0 -180 L 30 -210 L 30 -350" fill="none" stroke="#00ffff" stroke-width="3" class="cyber-trace" />
               <rect x="25" y="-360" width="10" height="10" fill="#00ffff" class="cyber-node" />
               <path d="M 0 -150 L -40 -190 L -40 -260 L -70 -290 L -70 -420" fill="none" stroke="#ff00ff" stroke-width="2" class="cyber-trace-alt" />
               <circle cx="-70" cy="-420" r="5" fill="#ff00ff" class="cyber-node-alt" />
               <path d="M 15 -195 L 45 -195 L 60 -210" fill="none" stroke="#ffff00" stroke-width="1.5" class="cyber-trace-micro" />
               <rect x="58" y="-212" width="4" height="4" fill="#ffff00" class="cyber-node-micro" />
            </g>
          </defs>
          <use href="#circuit-system" transform="rotate(0)" />
          <use href="#circuit-system" transform="rotate(60)" />
          <use href="#circuit-system" transform="rotate(120)" />
          <use href="#circuit-system" transform="rotate(180)" />
          <use href="#circuit-system" transform="rotate(240)" />
          <use href="#circuit-system" transform="rotate(300)" />
        </svg>
      </div>
    `,
    coreSvg: `
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
         <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" stroke="#00ffff" stroke-width="1" stroke-dasharray="10 5" class="cyber-spin-fast"/>
         <polygon points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" stroke="#ff00ff" stroke-width="2" fill="rgba(255,0,255,0.1)"/>
         <line x1="50" y1="0" x2="50" y2="100" stroke="#00ffff" stroke-width="0.5" stroke-dasharray="2 2" />
         <line x1="0" y1="50" x2="100" y2="50" stroke="#00ffff" stroke-width="0.5" stroke-dasharray="2 2" />
         <circle cx="50" cy="50" r="12" stroke="#00ffff" stroke-width="1.5" />
         <circle cx="50" cy="50" r="4" fill="#ff00ff" class="cyber-pulse-core" />
      </svg>
    `,
    styles: `
      /* OVERRIDES FOR CYBER THEME */
      .theme-cyber .ring-blood {
        border-radius: 50% !important; border: 4px dashed #00ffff !important;
        animation: rotateCw 20s linear infinite !important; background: rgba(0, 15, 30, 0.8) !important;
        box-shadow: 0 0 10px #00ffff, inset 0 0 10px #00ffff !important;
      }
      .theme-cyber .ring-thorns { 
        border: 2px solid #ff00ff !important; animation: rotateCcw 10s linear infinite !important; 
        box-shadow: 0 0 15px #ff00ff, inset 0 0 15px #ff00ff !important; 
      }
      .theme-cyber .ring-void { 
        border: 3px double #ffff00 !important; animation: rotateCw 60s linear infinite !important; 
      }

      /* CYBER GEOMETRY & CIRCUIT ANIMATIONS */
      .cyber-circuit-container { position: absolute; width: 100%; height: 100%; z-index: 5; pointer-events: none; }
      .cyber-neon-mag { animation: pulseNeonMag 2s infinite alternate; }
      .cyber-neon-cyan { animation: pulseNeonCyan 2.5s infinite alternate; }
      .cyber-neon-yel { animation: pulseNeonYel 3s infinite alternate; }
      
      @keyframes pulseNeonMag { 0% { filter: drop-shadow(0 0 5px #ff00ff); opacity: 0.6; } 100% { filter: drop-shadow(0 0 25px #ff00ff); opacity: 1; } }
      @keyframes pulseNeonCyan { 0% { filter: drop-shadow(0 0 5px #00ffff); opacity: 0.5; } 100% { filter: drop-shadow(0 0 30px #00ffff); opacity: 1; } }
      @keyframes pulseNeonYel { 0% { filter: drop-shadow(0 0 2px #ffff00); opacity: 0.3; } 100% { filter: drop-shadow(0 0 15px #ffff00); opacity: 0.8; } }

      .cyber-trace { stroke-dasharray: 500; stroke-dashoffset: 500; animation: drawCircuit 1s ease-out forwards; }
      .cyber-trace-alt { stroke-dasharray: 500; stroke-dashoffset: 500; animation: drawCircuit 1s ease-out 0.3s forwards; }
      .cyber-trace-micro { stroke-dasharray: 100; stroke-dashoffset: 100; animation: drawCircuit 0.5s ease-out 0.6s forwards; }
      
      .cyber-node { opacity: 0; animation: flashNode 0.1s forwards 0.9s; }
      .cyber-node-alt { opacity: 0; animation: flashNode 0.1s forwards 1.2s; }
      .cyber-node-micro { opacity: 0; animation: flashNode 0.1s forwards 1.0s; }
      
      .cyber-spin-fast { transform-origin: 50px 50px; animation: rotateCw 4s linear infinite; }
      .cyber-pulse-core { animation: digitalPulse 0.5s steps(2, end) infinite; }

      @keyframes drawCircuit { to { stroke-dashoffset: 0; } }
      @keyframes flashNode { 0% { opacity: 0; } 100% { opacity: 1; filter: drop-shadow(0 0 8px currentColor); } }
      @keyframes digitalPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

      .theme-cyber ~ .dark-status-text {
        text-shadow: -2px 0px 0px #ff00ff, 2px 0px 0px #00ffff, 0 0 10px #00ffff !important;
        animation: cyberBreathe 1s infinite alternate !important;
      }
      @keyframes cyberBreathe {
        0% { opacity: 0.75; }
        100% { opacity: 1; filter: brightness(1.5); }
      }
    `,
    playIntro(engine, now) {
      if (!engine.ctx || !engine.enabled) return;

      // 1. Pitch-rising Sci-Fi Boot Sweep
      const sweep = engine.ctx.createOscillator();
      const sweepGain = engine.ctx.createGain();
      sweep.type = 'sawtooth';
      sweep.frequency.setValueAtTime(110, now);
      sweep.frequency.exponentialRampToValueAtTime(920, now + 2);

      sweepGain.gain.setValueAtTime(0.001, now);
      sweepGain.linearRampToValueAtTime ? sweepGain.gain.linearRampToValueAtTime(0.07, now + 0.5) : sweepGain.gain.setValueAtTime(0.07, now + 0.5);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

      sweep.connect(sweepGain);
      sweepGain.connect(engine.masterGain);
      sweep.start(now);
      sweep.stop(now + 4);
      engine.activeNodes.push(sweep);

      // 2. Modulated Square-Wave Telemetry Chirps
      for (let i = 0; i < 12; i++) {
        const bitOsc = engine.ctx.createOscillator();
        const bitGain = engine.ctx.createGain();
        bitOsc.type = 'square';
        const bitFreq = 750 + Math.random() * 1100;
        const bitTime = now + 0.25 + (i * 0.24);

        bitOsc.frequency.setValueAtTime(bitFreq, bitTime);
        bitGain.gain.setValueAtTime(0.035, bitTime);
        bitGain.gain.exponentialRampToValueAtTime(0.0001, bitTime + 0.07);

        bitOsc.connect(bitGain);
        bitGain.connect(engine.masterGain);
        bitOsc.start(bitTime);
        bitOsc.stop(bitTime + 0.08);
        engine.activeNodes.push(bitOsc);
      }
    },
    playSeal(engine, now) {
      if (!engine.ctx || !engine.enabled) return;

      // Laser confirm discharge burst
      const confirm = engine.ctx.createOscillator();
      const cGain = engine.ctx.createGain();
      confirm.type = 'sawtooth';
      confirm.frequency.setValueAtTime(1500, now);
      confirm.frequency.exponentialRampToValueAtTime(260, now + 0.32);

      cGain.gain.setValueAtTime(0.22, now);
      cGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      confirm.connect(cGain);
      cGain.connect(engine.masterGain);
      confirm.start(now);
      confirm.stop(now + 0.5);
      engine.activeNodes.push(confirm);

      // Digital sub-impact
      const thud = engine.ctx.createOscillator();
      const tGain = engine.ctx.createGain();
      thud.type = 'sine';
      thud.frequency.setValueAtTime(130, now);
      thud.frequency.exponentialRampToValueAtTime(40, now + 0.5);

      tGain.gain.setValueAtTime(0.32, now);
      tGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      thud.connect(tGain);
      tGain.connect(engine.masterGain);
      thud.start(now);
      thud.stop(now + 0.65);
      engine.activeNodes.push(thud);
    },
    initParticle(p) {
      p.char = Math.random() > 0.5 ? '1' : '0';
    },
    renderParticle(ctx, p) {
      p.y -= p.speedY;
      p.x += Math.sin(p.pulseOffset) * 0.6 + p.speedX;
      p.pulseOffset += 0.04;
      p.alpha -= p.decay;

      if (p.y < 20 || p.alpha <= 0) {
        p.y = 560 + Math.random() * 30;
        p.x = 100 + Math.random() * 400;
        p.alpha = Math.random() * 0.7 + 0.3;
      }

      ctx.font = '10px monospace';
      ctx.fillStyle = `rgba(0, 255, 255, ${p.alpha})`;
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 6;
      ctx.fillText(p.char, p.x, p.y);
    }
  };
})();

