if (typeof window.hasRun === 'undefined') {
  window.hasRun = true;

  chrome.storage.local.get({
    chosenTheme: 'blood',
    ritualSpeed: 'grand',
    soundEnabled: true
  }, (settings) => {
    const themeName = settings.chosenTheme || 'blood';
    const ritualSpeed = settings.ritualSpeed || 'grand';
    let soundEnabled = settings.soundEnabled !== false;

    const themes = window.ScribeThemes || {};
    const t = themes[themeName] || themes.blood;

    if (!t) {
      console.error("ScribeItAll: Theme not found:", themeName);
      window.hasRun = undefined;
      return;
    }

    class SoundRitualEngine {
      constructor(enabled) {
        this.enabled = enabled;
        this.ctx = null;
        this.masterGain = null;
        this.activeNodes = [];
      }

      init() {
        if (!this.enabled) return;
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (!AudioContextClass) return;
          this.ctx = new AudioContextClass();
          if (this.ctx.state === 'suspended') {
            this.ctx.resume();
          }
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);
        } catch (e) {
          console.warn("ScribeItAll Web Audio unavailable:", e);
        }
      }

      createChantFormantVoice(freq, startTime, duration, formantProfile, masterVol) {
        if (!this.ctx) return;
        try {
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          osc1.type = 'sawtooth';
          osc2.type = 'sawtooth';
          osc1.frequency.setValueAtTime(freq, startTime);
          osc2.frequency.setValueAtTime(freq * 1.007, startTime);

          const vib = this.ctx.createOscillator();
          const vibGain = this.ctx.createGain();
          vib.frequency.setValueAtTime(4.6, startTime);
          vibGain.gain.setValueAtTime(1.3, startTime);
          vib.connect(osc1.frequency);
          vib.connect(osc2.frequency);
          vib.start(startTime);
          vib.stop(startTime + duration);
          this.activeNodes.push(vib);

          const voiceBus = this.ctx.createGain();
          voiceBus.gain.setValueAtTime(0.5, startTime);
          osc1.connect(voiceBus);
          osc2.connect(voiceBus);

          const formants = [
            { freq: formantProfile.f1 || 420, q: 5.5, gain: 0.8 },
            { freq: formantProfile.f2 || 850, q: 6.5, gain: 0.6 },
            { freq: formantProfile.f3 || 2400, q: 7.5, gain: 0.35 },
            { freq: formantProfile.f4 || 3150, q: 8.0, gain: 0.45 }
          ];

          const chantGain = this.ctx.createGain();
          chantGain.gain.setValueAtTime(0.0001, startTime);
          const swellTime = duration * 0.32;
          chantGain.gain.linearRampToValueAtTime(masterVol, startTime + swellTime);
          chantGain.gain.setValueAtTime(masterVol, startTime + duration - swellTime);
          chantGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

          formants.forEach((fm) => {
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(fm.freq, startTime);
            filter.Q.setValueAtTime(fm.q, startTime);

            if (formantProfile.targetF1) {
              const target = fm.freq === formantProfile.f1 ? formantProfile.targetF1 :
                             fm.freq === formantProfile.f2 ? (formantProfile.targetF2 || fm.freq) : fm.freq;
              filter.frequency.exponentialRampToValueAtTime(target, startTime + duration * 0.75);
            }

            const fGain = this.ctx.createGain();
            fGain.gain.setValueAtTime(fm.gain, startTime);

            voiceBus.connect(filter);
            filter.connect(fGain);
            fGain.connect(chantGain);
          });

          chantGain.connect(this.masterGain);

          osc1.start(startTime);
          osc1.stop(startTime + duration);
          osc2.start(startTime);
          osc2.stop(startTime + duration);
          this.activeNodes.push(osc1, osc2);
        } catch (e) {
          console.warn("Chant voice error:", e);
        }
      }

      createWhisperIncantation(startTime, duration) {
        if (!this.ctx) return;
        try {
          const bufferSize = Math.floor(this.ctx.sampleRate * Math.min(duration, 3.5));
          const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
          }

          const whiteNoise = this.ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          const whisperFilter = this.ctx.createBiquadFilter();
          whisperFilter.type = 'bandpass';
          whisperFilter.frequency.setValueAtTime(2200, startTime);
          whisperFilter.frequency.exponentialRampToValueAtTime(1700, startTime + duration * 0.4);
          whisperFilter.frequency.exponentialRampToValueAtTime(2700, startTime + duration * 0.85);
          whisperFilter.Q.setValueAtTime(8.5, startTime);

          const whisperGain = this.ctx.createGain();
          whisperGain.gain.setValueAtTime(0.0001, startTime);
          whisperGain.gain.linearRampToValueAtTime(0.04, startTime + 0.6);
          whisperGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

          whiteNoise.connect(whisperFilter);
          whisperFilter.connect(whisperGain);
          whisperGain.connect(this.masterGain);

          whiteNoise.start(startTime);
          whiteNoise.stop(startTime + duration);
          this.activeNodes.push(whiteNoise);
        } catch (e) {}
      }

      playThemeIntro(activeTheme) {
        if (!this.ctx || !this.enabled || !activeTheme || !activeTheme.playIntro) return;
        activeTheme.playIntro(this, this.ctx.currentTime);
      }

      playThemeSeal(activeTheme) {
        if (!this.ctx || !this.enabled || !activeTheme || !activeTheme.playSeal) return;
        activeTheme.playSeal(this, this.ctx.currentTime);
      }

      stop() {
        if (this.ctx) {
          try {
            this.activeNodes.forEach(node => {
              try { node.stop(); } catch (e) {}
            });
            this.activeNodes = [];
            this.ctx.close();
          } catch (e) {}
          this.ctx = null;
        }
      }
    }

    if (ritualSpeed === 'instant') {
      try {
        const docClone = document.cloneNode(true);
        const article = new Readability(docClone).parse();
        if (article) {
          const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
          if (window.turndownPluginGfm) turndownService.use(window.turndownPluginGfm.gfm);

          const date = new Date().toLocaleDateString();
          let md = `${t.headerPrefix}\n> *Siphoned on:* ${date}\n> *Vessel Source:* [${window.location.hostname}](${window.location.href})\n---\n\n`;
          md += `# ${article.title}\n\n` + turndownService.turndown(article.content);

          const safeTitle = (article.title || 'untitled').replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 80).toLowerCase();
          chrome.runtime.sendMessage({ action: "download", markdown: md, filename: `grimoire_${safeTitle}.md` });
        }
      } catch (err) {
        console.error("Instant transmutation failed:", err);
      }
      window.hasRun = undefined;
      return;
    }

    const soundEngine = new SoundRitualEngine(soundEnabled);
    soundEngine.init();
    soundEngine.playThemeIntro(t);

    function generateAstrolabeTicks(radius, color) {
      let ticks = '';
      for (let i = 0; i < 36; i++) {
        const angle = i * 10;
        const isCardinal = angle % 90 === 0;
        const isMajor = angle % 30 === 0;
        const length = isCardinal ? 14 : (isMajor ? 9 : 5);
        const strokeWidth = isCardinal ? 2 : (isMajor ? 1.5 : 1);
        const opacity = isCardinal ? 0.9 : (isMajor ? 0.6 : 0.35);

        ticks += `<line x1="300" y1="${300 - radius}" x2="300" y2="${300 - radius + length}" 
                  stroke="${color}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" 
                  transform="rotate(${angle} 300 300)" />`;

        if (isCardinal) {
          ticks += `<polygon points="300,${300 - radius + 18} 296,${300 - radius + 25} 304,${300 - radius + 25}" 
                    fill="${color}" opacity="0.85" transform="rotate(${angle} 300 300)" />`;
        }
      }
      return ticks;
    }

    const host = document.createElement('div');
    host.id = "scribe-it-all-host";
    host.style.position = "fixed";
    host.style.top = "0";
    host.style.left = "0";
    host.style.width = "100vw";
    host.style.height = "100vh";
    host.style.zIndex = "2147483647";
    host.style.pointerEvents = "auto";
    host.style.all = "initial";

    const shadow = host.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      
      #dark-transmute-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: ${t.bgGradient};
        display: flex; justify-content: center; align-items: center; flex-direction: column;
        opacity: 0; transition: opacity 0.6s ease-out; user-select: none;
        overflow: hidden;
      }
      #dark-transmute-overlay.active { opacity: 1; }

      .hud-bar {
        position: absolute; top: 24px; left: 0; width: 100%;
        display: flex; justify-content: space-between; align-items: center;
        padding: 0 32px; z-index: 20;
      }
      .hud-btn {
        background: rgba(0, 0, 0, 0.45); border: 1px solid ${t.textColor};
        color: ${t.textColor}; padding: 6px 14px; border-radius: 4px;
        font-family: monospace; font-size: 12px; letter-spacing: 2px;
        cursor: pointer; transition: all 0.2s ease;
        text-shadow: 0 0 5px ${t.textGlow};
      }
      .hud-btn:hover {
        background: ${t.voidColor}; color: #ffffff;
        box-shadow: 0 0 10px ${t.completeGlow};
      }

      .dark-circle-container { 
        position: relative; width: 600px; height: 600px; 
        display: flex; justify-content: center; align-items: center; 
        transition: transform 0.1s ease;
      }

      .dark-circle-container.sealing-tremor {
        animation: tremorShake 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      }
      @keyframes tremorShake {
        0% { transform: translate(0, 0); }
        15% { transform: translate(-4px, 3px) rotate(-0.5deg); }
        30% { transform: translate(4px, -3px) rotate(0.5deg); }
        50% { transform: translate(-3px, -2px); }
        70% { transform: translate(3px, 2px); }
        85% { transform: translate(-1px, 1px); }
        100% { transform: translate(0, 0); }
      }

      .particle-canvas {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        pointer-events: none; z-index: 10;
      }

      .sealing-shockwave {
        position: absolute; width: 100px; height: 100px; border-radius: 50%;
        border: 3px solid ${t.completeGlow};
        box-shadow: 0 0 25px ${t.completeGlow}, inset 0 0 15px ${t.completeGlow};
        opacity: 0; pointer-events: none; z-index: 12;
      }
      #dark-transmute-overlay.complete .sealing-shockwave {
        animation: shockwaveExpand 0.75s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
      }
      @keyframes shockwaveExpand {
        0% { transform: scale(0.6); opacity: 1; }
        100% { transform: scale(6.5); opacity: 0; }
      }

      .dark-ring { position: absolute; border-radius: 50%; box-shadow: 0 0 15px currentColor, inset 0 0 10px currentColor; }
      .ring-astrolabe { position: absolute; width: 100%; height: 100%; animation: rotateCw 90s linear infinite; }

      .ring-void { width: 94%; height: 94%; color: ${t.voidColor}; border: 1px solid currentColor; animation: rotateCw 40s linear infinite; }
      .ring-runes-outer { position: absolute; width: 84%; height: 84%; animation: rotateCcw 30s linear infinite; }
      .ring-thorns { width: 70%; height: 70%; color: ${t.thornsColor}; border: 2px dashed currentColor; animation: rotateCw 20s linear infinite; }
      
      .ring-blood { 
        width: 55%; height: 55%; color: ${t.bloodColor}; border: 4px solid currentColor; 
        background: radial-gradient(circle, transparent 40%, ${t.voidColor} 70%, transparent 90%);
        animation: morphBlood 8s ease-in-out infinite, rotateCcw 15s linear infinite; 
      }

      .ring-runes-inner { position: absolute; width: 40%; height: 40%; animation: rotateCw 12s linear infinite; }
      .ring-core-bind { width: 25%; height: 25%; color: ${t.voidColor}; border: 1px double currentColor; animation: rotateCcw 8s linear infinite; }

      .ring-runes-outer svg, .ring-runes-inner svg, .dark-core svg, .ring-astrolabe svg { width: 100%; height: 100%; overflow: visible; }
      .ring-runes-outer text { font-family: monospace; font-size: 14px; fill: ${t.textColor}; letter-spacing: 8px; opacity: 0.7;}
      .ring-runes-inner text { font-family: monospace; font-size: 10px; fill: ${t.coreColor}; letter-spacing: 6px; opacity: 0.8;}

      .dark-core {
        position: absolute; width: 18%; height: 18%; color: ${t.coreColor};
        animation: corePulse 3s ease-in-out infinite alternate;
      }
      .dark-core svg { filter: drop-shadow(0 0 10px ${t.textGlow}); }

      @keyframes rotateCw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes rotateCcw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      @keyframes morphBlood {
        0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; box-shadow: 0 0 10px currentColor; }
        50% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; box-shadow: 0 0 25px currentColor; }
        100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; box-shadow: 0 0 10px currentColor; }
      }
      @keyframes corePulse {
        0% { opacity: 0.3; transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1.05); }
      }

      .dark-status-text {
        margin-top: 55px; color: ${t.textColor}; font-family: 'Courier New', Courier, monospace;
        font-size: 16px; letter-spacing: 10px; text-transform: uppercase;
        text-shadow: 0 0 10px ${t.textGlow}; animation: breatheText 1.6s infinite alternate;
        transition: color 0.4s ease, text-shadow 0.4s ease;
      }
      @keyframes breatheText { 0% { opacity: 0.4; filter: blur(0.8px); } 100% { opacity: 1; filter: blur(0px); } }
      
      #dark-transmute-overlay.complete::after {
        content: ''; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #000000; z-index: 100; animation: darknessSwallow 0.8s ease-in forwards;
        pointer-events: none;
      }
      @keyframes darknessSwallow { 0% { opacity: 0; } 100% { opacity: 1; } }

      ${t.styles || ''}
    `;
    shadow.appendChild(style);

    const outerRunesSvg = `
    <svg viewBox="0 0 200 200">
      <path id="rune-path-outer" d="M 100, 100 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0" fill="none" />
      <text><textPath href="#rune-path-outer" startOffset="0%">${t.outerRunes}</textPath></text>
    </svg>`;

    const innerRunesSvg = `
    <svg viewBox="0 0 200 200">
      <path id="rune-path-inner" d="M 100, 100 m -85, 0 a 85,85 0 1,0 170,0 a 85,85 0 1,0 -170,0" fill="none" />
      <text><textPath href="#rune-path-inner" startOffset="0%">${t.innerRunes}</textPath></text>
    </svg>`;

    const astrolabeSvg = `
    <svg viewBox="0 0 600 600">
      <circle cx="300" cy="300" r="290" fill="none" stroke="${t.coreColor}" stroke-width="0.8" stroke-opacity="0.3" stroke-dasharray="4 8" />
      <circle cx="300" cy="300" r="280" fill="none" stroke="${t.thornsColor}" stroke-width="0.5" stroke-opacity="0.25" />
      ${generateAstrolabeTicks(290, t.coreColor)}
    </svg>`;

    const overlay = document.createElement('div');
    overlay.id = "dark-transmute-overlay";

    overlay.innerHTML = `
      <div class="hud-bar">
        <button class="hud-btn btn-abort" title="Cancel transmutation">[ESC] ABORT</button>
        <button class="hud-btn btn-sound" title="Toggle audio">${soundEnabled ? '🔊 AUDIO ON' : '🔇 AUDIO OFF'}</button>
      </div>
      <div class="dark-circle-container theme-${themeName}">
        <div class="ring-astrolabe">${astrolabeSvg}</div>
        <div class="dark-ring ring-void"></div>
        ${t.extraHTML || ''}
        <div class="ring-runes-outer">${outerRunesSvg}</div>
        <div class="dark-ring ring-thorns"></div>
        <div class="dark-ring ring-blood"></div>
        <div class="ring-runes-inner">${innerRunesSvg}</div>
        <div class="dark-ring ring-core-bind"></div>
        <div class="dark-core">${t.coreSvg || ''}</div>
        <div class="sealing-shockwave"></div>
        <canvas class="particle-canvas" width="600" height="600"></canvas>
      </div>
      <div class="dark-status-text">${t.stages[0]}</div>
    `;

    shadow.appendChild(overlay);
    document.documentElement.appendChild(host);

    const canvas = overlay.querySelector('.particle-canvas');
    const ctx = canvas.getContext('2d');
    let particlesRunning = true;
    let animFrameId = null;

    const particles = [];
    const numParticles = 42;

    for (let i = 0; i < numParticles; i++) {
      const p = {
        x: Math.random() * 600,
        y: Math.random() * 600,
        radius: Math.random() * 2.5 + 1.2,
        speedY: Math.random() * 1.4 + 0.6,
        speedX: (Math.random() - 0.5) * 0.8,
        alpha: Math.random() * 0.8 + 0.2,
        decay: Math.random() * 0.008 + 0.003,
        pulseOffset: Math.random() * Math.PI * 2,
        char: Math.random() > 0.5 ? '1' : '0'
      };
      if (t.initParticle) t.initParticle(p);
      particles.push(p);
    }

    function renderParticles() {
      if (!particlesRunning) return;
      ctx.clearRect(0, 0, 600, 600);

      particles.forEach(p => {
        ctx.save();
        if (t.renderParticle) {
          t.renderParticle(ctx, p);
        } else {
          p.y -= p.speedY;
          if (p.y < 20) p.y = 580;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.fill();
        }
        ctx.restore();
      });

      animFrameId = requestAnimationFrame(renderParticles);
    }
    renderParticles();

    let isTerminated = false;
    function cleanupRitual() {
      if (isTerminated) return;
      isTerminated = true;
      particlesRunning = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      soundEngine.stop();
      window.removeEventListener('keydown', handleKeyDown);

      overlay.classList.remove('active', 'complete');
      setTimeout(() => {
        if (host && host.parentNode) {
          host.parentNode.removeChild(host);
        }
        window.hasRun = undefined;
      }, 500);
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        cleanupRitual();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    const soundBtn = overlay.querySelector('.btn-sound');
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundEngine.enabled = soundEnabled;
      soundBtn.innerText = soundEnabled ? '🔊 AUDIO ON' : '🔇 AUDIO OFF';
      chrome.storage.local.set({ soundEnabled });
    });

    const abortBtn = overlay.querySelector('.btn-abort');
    abortBtn.addEventListener('click', () => {
      cleanupRitual();
    });

    setTimeout(() => { overlay.classList.add('active'); }, 10);

    const extractionPromise = (async () => {
      const docClone = document.cloneNode(true);
      return new Readability(docClone).parse();
    })();

    const totalDuration = ritualSpeed === 'swift' ? 1500 : 3800;
    const stage2Time = ritualSpeed === 'swift' ? 500 : 1300;
    const stage3Time = ritualSpeed === 'swift' ? 1000 : 2500;

    const statusEl = overlay.querySelector('.dark-status-text');
    const circleContainer = overlay.querySelector('.dark-circle-container');

    setTimeout(() => {
      if (!isTerminated && statusEl) statusEl.innerText = t.stages[1];
    }, stage2Time);

    setTimeout(() => {
      if (!isTerminated && statusEl) statusEl.innerText = t.stages[2];
    }, stage3Time);

    setTimeout(async () => {
      if (isTerminated) return;

      try {
        const article = await extractionPromise;

        if (article) {
          const turndownService = new TurndownService({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced'
          });

          if (window.turndownPluginGfm) {
            turndownService.use(window.turndownPluginGfm.gfm);
          }

          turndownService.addRule('fencedCodeWithLang', {
            filter: function (node, options) {
              return (
                options.codeBlockStyle === 'fenced' &&
                node.nodeName === 'PRE' &&
                node.firstChild &&
                node.firstChild.nodeName === 'CODE'
              );
            },
            replacement: function (content, node, options) {
              const codeNode = node.firstChild;
              const className = codeNode.getAttribute('class') || node.getAttribute('class') || '';
              const match = className.match(/(?:lang|language)-([a-zA-Z0-9_-]+)/);
              const lang = match ? match[1] : '';
              const code = codeNode.textContent || '';
              return '\n\n' + options.fence + lang + '\n' + code.replace(/\n+$/, '') + '\n' + options.fence + '\n\n';
            }
          });

          const date = new Date().toLocaleDateString();
          let markdown = `${t.headerPrefix}\n`;
          markdown += `> *Siphoned on:* ${date}\n`;
          if (article.byline) markdown += `> *Author:* ${article.byline}\n`;
          markdown += `> *Vessel Source:* [${window.location.hostname}](${window.location.href})\n`;
          markdown += `---\n\n`;
          markdown += `# ${article.title}\n\n`;
          markdown += turndownService.turndown(article.content);

          const rawTitle = (article.title || 'untitled').trim();
          const safeTitle = rawTitle
            .replace(/[^a-zA-Z0-9_-]+/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '')
            .slice(0, 80)
            .toLowerCase();
          const filename = `grimoire_${safeTitle || 'unknown'}.md`;

          statusEl.innerText = t.stages[3];
          statusEl.style.color = t.textColor;
          statusEl.style.textShadow = `0 0 20px ${t.completeGlow}`;

          overlay.classList.add('complete');
          circleContainer.classList.add('sealing-tremor');
          soundEngine.playThemeSeal(t);

          setTimeout(() => {
            if (!isTerminated) {
              chrome.runtime.sendMessage({
                action: "download",
                markdown: markdown,
                filename: filename
              });
            }
          }, 600);

          setTimeout(() => {
            cleanupRitual();
          }, 1400);

        } else {
          statusEl.innerText = "RITUAL FAILED: NO ESSENCE DETECTED";
          setTimeout(() => { cleanupRitual(); }, 1800);
        }

      } catch (error) {
        console.error("Ritual Interrupted:", error);
        if (statusEl) statusEl.innerText = "RITUAL FAILED (CHECK CONSOLE)";
        setTimeout(() => { cleanupRitual(); }, 2200);
      }
    }, totalDuration);

  });
}
