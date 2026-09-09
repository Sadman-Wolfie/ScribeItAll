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

    // --- PROCEDURAL WEB AUDIO ENGINE (ZERO EXTERNAL ASSETS) ---
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

      playThemeIntro(theme) {
        if (!this.ctx || !this.enabled) return;
        const now = this.ctx.currentTime;

        if (theme === 'blood') {
          // 1. Occult Sub-bass Sawtooth Drone (55Hz with sweeping low-pass filter)
          const osc = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const gain = this.ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(55, now);
          osc.frequency.exponentialRampToValueAtTime(73.4, now + 3);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(140, now);
          filter.frequency.exponentialRampToValueAtTime(420, now + 1.8);
          filter.frequency.exponentialRampToValueAtTime(130, now + 3.8);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.18, now + 0.6);
          gain.gain.setValueAtTime(0.18, now + 2.5);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain);

          osc.start(now);
          osc.stop(now + 4);
          this.activeNodes.push(osc);

          // 2. Slow Ominous Heartbeat Pulses (thump... thump...)
          [0.2, 0.45, 1.4, 1.65, 2.6, 2.85].forEach((offset, idx) => {
            const beatOsc = this.ctx.createOscillator();
            const beatGain = this.ctx.createGain();
            beatOsc.type = 'sine';
            beatOsc.frequency.setValueAtTime(idx % 2 === 0 ? 82 : 65, now + offset);
            beatOsc.frequency.exponentialRampToValueAtTime(28, now + offset + 0.18);

            beatGain.gain.setValueAtTime(0.24, now + offset);
            beatGain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.2);

            beatOsc.connect(beatGain);
            beatGain.connect(this.masterGain);

            beatOsc.start(now + offset);
            beatOsc.stop(now + offset + 0.22);
            this.activeNodes.push(beatOsc);
          });

        } else if (theme === 'verdant') {
          // 1. Harmonic Nature Drone (Pentatonic chord pad)
          [220, 277.18, 329.63, 440].forEach((freq) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.045, now + 0.9);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 4);
            this.activeNodes.push(osc);
          });

          // 2. Cascading Crystal Chimes (Vines sprouting into bloom)
          const chimes = [659.25, 830.61, 987.77, 1174.66, 1318.51, 1661.22];
          chimes.forEach((f, i) => {
            const chimeOsc = this.ctx.createOscillator();
            const chimeGain = this.ctx.createGain();
            chimeOsc.type = 'sine';
            const startTime = now + 0.35 + (i * 0.45);

            chimeOsc.frequency.setValueAtTime(f, startTime);
            chimeGain.gain.setValueAtTime(0.07, startTime);
            chimeGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.75);

            chimeOsc.connect(chimeGain);
            chimeGain.connect(this.masterGain);
            chimeOsc.start(startTime);
            chimeOsc.stop(startTime + 0.8);
            this.activeNodes.push(chimeOsc);
          });

        } else if (theme === 'cyber') {
          // 1. Pitch-rising Sci-Fi Boot Sweep
          const sweep = this.ctx.createOscillator();
          const sweepGain = this.ctx.createGain();
          sweep.type = 'sawtooth';
          sweep.frequency.setValueAtTime(110, now);
          sweep.frequency.exponentialRampToValueAtTime(920, now + 2);

          sweepGain.gain.setValueAtTime(0.001, now);
          sweepGain.gain.linearRampToValueAtTime(0.07, now + 0.5);
          sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

          sweep.connect(sweepGain);
          sweepGain.connect(this.masterGain);
          sweep.start(now);
          sweep.stop(now + 4);
          this.activeNodes.push(sweep);

          // 2. Modulated Square-Wave Telemetry Chirps
          for (let i = 0; i < 12; i++) {
            const bitOsc = this.ctx.createOscillator();
            const bitGain = this.ctx.createGain();
            bitOsc.type = 'square';
            const bitFreq = 750 + Math.random() * 1100;
            const bitTime = now + 0.25 + (i * 0.24);

            bitOsc.frequency.setValueAtTime(bitFreq, bitTime);
            bitGain.gain.setValueAtTime(0.035, bitTime);
            bitGain.gain.exponentialRampToValueAtTime(0.0001, bitTime + 0.07);

            bitOsc.connect(bitGain);
            bitGain.connect(this.masterGain);
            bitOsc.start(bitTime);
            bitOsc.stop(bitTime + 0.08);
            this.activeNodes.push(bitOsc);
          }
        }
      }

      playThemeSeal(theme) {
        if (!this.ctx || !this.enabled) return;
        const now = this.ctx.currentTime;

        if (theme === 'blood') {
          // Heavy Occult Resonant Gong / Bell with metallic overtones
          [110, 164.81, 220, 329.63, 554.37].forEach((freq, idx) => {
            const bell = this.ctx.createOscillator();
            const bellGain = this.ctx.createGain();
            bell.type = idx === 0 ? 'triangle' : 'sine';
            bell.frequency.setValueAtTime(freq, now);

            bellGain.gain.setValueAtTime(idx === 0 ? 0.38 : 0.16, now);
            bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

            bell.connect(bellGain);
            bellGain.connect(this.masterGain);
            bell.start(now);
            bell.stop(now + 2.6);
            this.activeNodes.push(bell);
          });

        } else if (theme === 'verdant') {
          // Warm blooming major resolution chord
          [329.63, 415.30, 493.88, 659.25, 987.77].forEach((freq) => {
            const chord = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            chord.type = 'triangle';
            chord.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

            chord.connect(gain);
            gain.connect(this.masterGain);
            chord.start(now);
            chord.stop(now + 2.3);
            this.activeNodes.push(chord);
          });

        } else if (theme === 'cyber') {
          // High-energy sci-fi power discharge confirm burst
          const confirm = this.ctx.createOscillator();
          const cGain = this.ctx.createGain();
          confirm.type = 'sawtooth';
          confirm.frequency.setValueAtTime(1500, now);
          confirm.frequency.exponentialRampToValueAtTime(260, now + 0.32);

          cGain.gain.setValueAtTime(0.22, now);
          cGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

          confirm.connect(cGain);
          cGain.connect(this.masterGain);
          confirm.start(now);
          confirm.stop(now + 0.5);
          this.activeNodes.push(confirm);

          // Digital sub-impact
          const thud = this.ctx.createOscillator();
          const tGain = this.ctx.createGain();
          thud.type = 'sine';
          thud.frequency.setValueAtTime(130, now);
          thud.frequency.exponentialRampToValueAtTime(40, now + 0.5);

          tGain.gain.setValueAtTime(0.32, now);
          tGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

          thud.connect(tGain);
          tGain.connect(this.masterGain);
          thud.start(now);
          thud.stop(now + 0.65);
          this.activeNodes.push(thud);
        }
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

    // --- INSTANT MODE BYPASS ---
    if (ritualSpeed === 'instant') {
      try {
        const docClone = document.cloneNode(true);
        const article = new Readability(docClone).parse();
        if (article) {
          const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
          if (window.turndownPluginGfm) turndownService.use(window.turndownPluginGfm.gfm);

          const date = new Date().toLocaleDateString();
          let md = `> 🩸 **THE ARCHIVE**\n> *Siphoned on:* ${date}\n> *Vessel Source:* [${window.location.hostname}](${window.location.href})\n---\n\n`;
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
    soundEngine.playThemeIntro(themeName);

    // --- GENERATE SACRED ASTROLABE TICKS ---
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

    // --- VERDANT VINES GENERATOR ---
    // --- BOTANICAL VERDANT VINES GENERATOR ---
    function generateVerdantVines() {
      const spawnPoints = [
        {x: 0, y: -150}, {x: 10, y: -180}, {x: 25, y: -230}, {x: 0, y: -280},
        {x: -15, y: -310}, {x: -25, y: -340}, {x: -35, y: -370}, {x: -50, y: -400},
        {x: -30, y: -430}, {x: -15, y: -460}, {x: 5, y: -485}, {x: 20, y: -510}, 
        {x: 30, y: -530}, {x: 40, y: -550},
        {x: 20, y: -190}, {x: 40, y: -200}, {x: 60, y: -225}, {x: 80, y: -250},
        {x: 90, y: -290}, {x: 105, y: -315}, {x: 125, y: -335}, {x: 145, y: -360},
        {x: 160, y: -380}, {x: 180, y: -395}, {x: 200, y: -410}, {x: 225, y: -425},
        {x: 250, y: -445}, {x: 270, y: -460}, {x: 290, y: -470}
      const foliageNodes = [
        // Main stem foliage (alternating left/right)
        { x: 10, y: -145, rot: 35, type: '#ivy-leaf', scale: 1.25, delay: 0.45 },
        { x: -14, y: -175, rot: -45, type: '#ivy-leaf', scale: 1.2, delay: 0.6 },
        { x: 28, y: -210, rot: 50, type: '#ivy-leaf', scale: 1.15, delay: 0.75 },
        { x: 14, y: -245, rot: -30, type: '#ivy-leaf', scale: 1.1, delay: 0.9 },
        { x: -12, y: -285, rot: -42, type: '#ivy-leaf', scale: 1.05, delay: 1.05 },
        { x: 6, y: -385, rot: 35, type: '#ivy-leaf', scale: 0.95, delay: 1.25 },
        { x: -18, y: -420, rot: -35, type: '#ivy-leaf', scale: 0.9, delay: 1.4 },
        { x: 16, y: -465, rot: 30, type: '#vine-leaf-sleek', scale: 0.85, delay: 1.55 },
        { x: 22, y: -515, rot: 25, type: '#vine-leaf-sleek', scale: 0.75, delay: 1.7 },
        { x: 28, y: -560, rot: 15, type: '#vine-leaf-sleek', scale: 0.65, delay: 1.85 },

        // Right lateral branch foliage
        { x: 55, y: -245, rot: 65, type: '#vine-leaf-sleek', scale: 1.1, delay: 0.9 },
        { x: 85, y: -295, rot: 75, type: '#vine-leaf-sleek', scale: 1.0, delay: 1.1 },
        { x: 115, y: -355, rot: 55, type: '#vine-leaf-sleek', scale: 0.95, delay: 1.25 },
        { x: 150, y: -425, rot: 70, type: '#vine-leaf-sleek', scale: 0.85, delay: 1.45 },

        // Left lateral branch foliage
        { x: -25, y: -325, rot: -60, type: '#ivy-leaf', scale: 1.0, delay: 1.15 },
        { x: -50, y: -375, rot: -65, type: '#vine-leaf-sleek', scale: 1.0, delay: 1.3 },
        { x: -80, y: -445, rot: -55, type: '#vine-leaf-sleek', scale: 0.9, delay: 1.45 },
        { x: -70, y: -490, rot: -40, type: '#vine-leaf-sleek', scale: 0.8, delay: 1.6 },
        { x: -115, y: -535, rot: -60, type: '#vine-leaf-sleek', scale: 0.75, delay: 1.75 }
      ];

      const tendrilNodes = [
        { x: 24, y: -165, rot: 45, type: '#curly-tendril', scale: 0.95, delay: 0.8 },
        { x: -16, y: -225, rot: -40, type: '#curly-tendril-left', scale: 0.9, delay: 1.0 },
        { x: 75, y: -275, rot: 70, type: '#curly-tendril', scale: 0.85, delay: 1.2 },
        { x: -30, y: -350, rot: -65, type: '#curly-tendril-left', scale: 0.85, delay: 1.35 },
        { x: 145, y: -390, rot: 50, type: '#curly-tendril', scale: 0.8, delay: 1.5 },
        { x: 8, y: -450, rot: 35, type: '#curly-tendril', scale: 0.8, delay: 1.6 },
        { x: -60, y: -475, rot: -45, type: '#curly-tendril-left', scale: 0.75, delay: 1.75 }
      ];

      const jointNodes = [
        { x: 22, y: -215, delay: 0.7 },
        { x: 82, y: -325, delay: 1.0 },
        { x: -18, y: -340, delay: 1.1 },
        { x: -75, y: -470, delay: 1.4 }
      ];

      const flowerNodes = [
        { x: 22, y: -195, type: '#orchid-cluster', scale: 1.15, delay: 1.1 },
        { x: 82, y: -310, type: '#flower-cluster', scale: 1.0, delay: 1.3 },
        { x: -22, y: -330, type: '#orchid-flower', scale: 1.2, delay: 1.35 },
        { x: -6, y: -435, type: '#dense-cluster', scale: 1.1, delay: 1.55 },
        { x: 155, y: -445, type: '#flower-bud', scale: 1.0, delay: 1.6 },
        { x: -120, y: -560, type: '#flower-bud', scale: 1.0, delay: 1.8 }
      ];

      let branchesHTML = '';

      for (let i = 0; i < 8; i++) {
        let rotation = i * 45;
        const rotation = i * 45;
        const isOdd = i % 2 === 1;

        let leavesHTML = '';
        foliageNodes.forEach(leaf => {
          const s = (leaf.scale * (isOdd ? 0.95 : 1.05)).toFixed(2);
          const r = leaf.rot + (isOdd ? -5 : 4);
          const d = (leaf.delay + (isOdd ? 0.08 : 0)).toFixed(2);
          leavesHTML += `
            <g style="transform: translate(${leaf.x}px, ${leaf.y}px);">
              <g class="vine-leaf" style="animation-delay: ${d}s;">
                <use href="${leaf.type}" transform="rotate(${r}) scale(${s})"/>
              </g>
            </g>`;
        });

        let tendrilsHTML = '';
        tendrilNodes.forEach(t => {
          const s = t.scale.toFixed(2);
          const d = t.delay.toFixed(2);
          tendrilsHTML += `
            <g style="transform: translate(${t.x}px, ${t.y}px);">
              <g class="vine-tendril" style="animation-delay: ${d}s;">
                <use href="${t.type}" transform="rotate(${t.rot}) scale(${s})"/>
              </g>
            </g>`;
        });

        let nodesHTML = '';
        jointNodes.forEach(node => {
          nodesHTML += `
            <g style="transform: translate(${node.x}px, ${node.y}px);">
              <g class="vine-node" style="animation-delay: ${node.delay}s;">
                <use href="#vine-node"/>
              </g>
            </g>`;
        });

        let flowersHTML = '';
        let numFlowers = Math.floor(Math.random() * 9) + 12;
        let shuffledPoints = [...spawnPoints].sort(() => 0.5 - Math.random()).slice(0, numFlowers);
        
        shuffledPoints.forEach(pt => {
          let randType = Math.random();
          let type;
          if (randType > 0.75) type = '#dense-cluster';
          else if (randType > 0.50) type = '#flower-cluster';
          else if (randType > 0.30) type = '#orchid-cluster';
          else if (randType > 0.15) type = '#orchid-flower';
          else type = '#single-flower';
          
          let scale = (Math.random() * 1.4 + 0.8).toFixed(2); 
          let delay = (Math.random() * 1.5 + 1.0).toFixed(2); 
          flowersHTML += `<g style="transform: translate(${pt.x}px, ${pt.y}px);"><g class="flower" style="animation-delay: ${delay}s;"><use href="${type}" transform="scale(${scale})"/></g></g>`;
        flowerNodes.forEach(fl => {
          const s = (fl.scale * (isOdd ? 1.05 : 0.95)).toFixed(2);
          const d = fl.delay.toFixed(2);
          flowersHTML += `
            <g style="transform: translate(${fl.x}px, ${fl.y}px);">
              <g class="flower" style="animation-delay: ${d}s;">
                <use href="${fl.type}" transform="scale(${s})"/>
              </g>
            </g>`;
        });

        branchesHTML += `
          <g transform="rotate(${rotation})">
             <path d="M 0 -120 Q 50 -200 0 -280" fill="none" stroke="#154c19" stroke-width="8" class="vine-base" stroke-linecap="round"/>
             <path d="M 0 -120 Q 50 -200 0 -280 T -50 -400" fill="none" stroke="#2e8b57" stroke-width="4" class="vine-mid" stroke-linecap="round"/>
             <path d="M 0 -120 Q 50 -200 0 -280 T -50 -400 T 40 -550" fill="none" stroke="#66bb6a" stroke-width="1.5" class="vine-tip" stroke-linecap="round"/>
             <path d="M 17 -185 Q 80 -220 90 -290" fill="none" stroke="#154c19" stroke-width="5.5" class="vine-base" stroke-linecap="round"/>
             <path d="M 17 -185 Q 80 -220 90 -290 T 160 -380" fill="none" stroke="#2e8b57" stroke-width="3" class="vine-mid" stroke-linecap="round"/>
             <path d="M 17 -185 Q 80 -220 90 -290 T 160 -380 Q 220 -440 290 -470" fill="none" stroke="#81c784" stroke-width="1" class="vine-tip" stroke-linecap="round"/>
             ${flowersHTML}
            <!-- Woody Main Stem -->
            <path d="M 0 -120 C 25 -165 38 -215 12 -270 C -18 -325 -30 -385 -6 -445 C 18 -500 12 -540 28 -575" 
                  fill="none" stroke="url(#vine-grad-wood)" stroke-width="7" stroke-linecap="round" class="vine-base" />

            <!-- Intertwining Climbing Runner -->
            <path d="M -6 -120 C -26 -170 -14 -225 22 -270 C 48 -315 15 -390 -20 -445 C -40 -490 -10 -535 0 -565" 
                  fill="none" stroke="url(#vine-grad-climber)" stroke-width="3.5" stroke-linecap="round" class="vine-climber" />

            <!-- Lateral Branch 1 (Right) -->
            <path d="M 22 -215 C 65 -235 88 -280 82 -325 C 78 -370 125 -415 165 -455" 
                  fill="none" stroke="url(#vine-grad-wood)" stroke-width="4.5" stroke-linecap="round" class="vine-branch" />
            <path d="M 82 -325 C 112 -345 138 -380 158 -410" 
              fill="none" stroke="url(#vine-grad-climber)" stroke-width="2.4" stroke-linecap="round" class="vine-sub" />

            <!-- Lateral Branch 2 (Left) -->
            <path d="M -18 -340 C -60 -370 -85 -415 -75 -470 C -65 -510 -105 -545 -125 -575" 
                  fill="none" stroke="url(#vine-grad-wood)" stroke-width="4" stroke-linecap="round" class="vine-branch" />
            <path d="M -75 -470 C -98 -495 -122 -515 -145 -530" 
                  fill="none" stroke="url(#vine-grad-climber)" stroke-width="2.2" stroke-linecap="round" class="vine-sub" />

            <!-- Bark Joint Nodes -->
            ${nodesHTML}

            <!-- Spiraling Tendril Coils -->
            ${tendrilsHTML}

            <!-- Lush Leaf Foliage -->
            ${leavesHTML}

            <!-- Blooming Flowers & Buds -->
            ${flowersHTML}
          </g>
        `;
      }
      return branchesHTML;
    }

    // --- THEME DEFINITIONS ---
    const themes = {
      blood: {
        bgGradient: 'radial-gradient(circle, rgba(20, 0, 0, 0.98) 0%, rgba(5, 0, 0, 1) 100%)',
        voidColor: 'rgba(50, 0, 0, 0.7)',
        thornsColor: 'rgba(150, 0, 0, 0.6)',
        bloodColor: 'rgba(95, 0, 0, 0.95)',
        coreColor: 'rgba(180, 0, 0, 0.85)',
        textColor: '#800000',
        textGlow: 'rgba(120, 0, 0, 0.6)',
        completeGlow: '#ff1111',
        headerPrefix: '> 🩸 **THE BLOOD PACT ARCHIVE**',
        stages: [
          'AWAKENING THE SACRED VEIN...',
          'SIPHONING VESSEL ESSENCE...',
          'TRANSMUTING KNOWLEDGE...',
          'PACT SEALED'
        ],
        outerRunes: '᛭ᚣᛡᛄᛥᛤᛣᛢᛡᛠᛟᛞᛝᛜᛛᛚᛙᛘᛗᛖᛕᛔᛓᛒᛑᛐᛏᛌᛋᛆᛅᛁᚿᚾᚽᚼᚴᚱᚬᚦᚢᚠ᛭',
        innerRunes: 'ᚢᚠ᛭ᚣᛡᛄᛥᛤᛣᛢᛡᛠᛟᛞᛝᛜᛛᛚᛙ',
        extraHTML: '',
        coreSvg: `
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="50" cy="50" r="48" stroke-width="1" stroke-opacity="0.4" />
            <path d="M50 5 L63 40 L95 40 L70 60 L80 95 L50 75 L20 95 L30 60 L5 40 L37 40 Z" />
            <path d="M50 95 L37 60 L5 60 L30 40 L20 5 L50 25 L80 5 L70 40 L95 60 L63 60 Z" stroke-width="1.2" stroke-opacity="0.7" />
            <path d="M50 20 L71 29 L80 50 L71 71 L50 80 L29 71 L20 50 L29 29 Z" stroke-width="0.5" stroke-opacity="0.3" />
            <circle cx="50" cy="50" r="20" stroke-width="0.5" stroke-opacity="0.5" />
          </svg>`
      },
      verdant: {
        bgGradient: 'radial-gradient(circle, rgba(4, 20, 8, 0.98) 0%, rgba(0, 8, 2, 1) 100%)',
        voidColor: 'rgba(34, 139, 34, 0.35)',
        thornsColor: 'rgba(85, 107, 47, 0.65)',
        bloodColor: 'rgba(46, 139, 87, 0.85)',
        coreColor: 'rgba(60, 179, 113, 0.95)',
        textColor: '#2e8b57',
        textGlow: 'rgba(46, 139, 87, 0.6)',
        completeGlow: '#00ff7f',
        headerPrefix: '> 🌿 **THE VERDANT HERBARIUM**',
        stages: [
          'COMMUNING WITH THE CANOPY...',
          'WEAVING MEMORY VINES...',
          'DISTILLING HARVEST...',
          'HARVEST COMPLETE'
        ],
        outerRunes: '᛭ᚣᛡᛄᛥᛤᛣᛢᛡᛠᛟᛞᛝᛜᛛᛚᛙᛘᛗᛖᛕᛔᛓᛒᛑᛐᛏᛌᛋᛆᛅᛁᚿᚾᚽᚼᚴᚱᚬᚦᚢᚠ᛭',
        innerRunes: 'ᚢᚠ᛭ᚣᛡᛄᛥᛤᛣᛢᛡᛠᛟᛞᛝᛜᛛᛚᛙ',
        extraHTML: `
          <div class="verdant-vines-container">
            <svg viewBox="-300 -300 600 600" width="100%" height="100%" style="overflow: visible;">
              <defs>
                <!-- Gradients for realistic botanical depth -->
                <linearGradient id="leaf-grad-main" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stop-color="#0b3810"/>
                  <stop offset="45%" stop-color="#1b7a2d"/>
                  <stop offset="85%" stop-color="#38a14d"/>
                  <stop offset="100%" stop-color="#86efac"/>
                </linearGradient>
                <linearGradient id="leaf-grad-accent" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stop-color="#14532d"/>
                  <stop offset="55%" stop-color="#22c55e"/>
                  <stop offset="100%" stop-color="#bef264"/>
                </linearGradient>
                <linearGradient id="vine-grad-wood" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#09280d"/>
                  <stop offset="50%" stop-color="#165b20"/>
                  <stop offset="100%" stop-color="#0b3311"/>
                </linearGradient>
                <linearGradient id="vine-grad-climber" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#15803d"/>
                  <stop offset="50%" stop-color="#4ade80"/>
                  <stop offset="100%" stop-color="#166534"/>
                </linearGradient>

                <!-- 1. Detailed 3-Lobed Ivy Leaf with Petiole & Veins -->
                <g id="ivy-leaf">
                  <path d="M 0,0 Q -2,6 -4,12" fill="none" stroke="#09280d" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M 0,0 C -8,-6 -18,-5 -22,-14 C -25,-22 -16,-28 -12,-30 C -8,-32 -5,-26 0,-44 C 5,-26 8,-32 12,-30 C 16,-28 25,-22 22,-14 C 18,-5 8,-6 0,0 Z" 
                        fill="url(#leaf-grad-main)" stroke="#07200a" stroke-width="1" stroke-linejoin="round"/>
                  <path d="M 0,-2 L 0,-40 M 0,-10 C -5,-14 -12,-16 -17,-18 M 0,-10 C 5,-14 12,-16 17,-18 M 0,-20 C -4,-23 -9,-25 -11,-27 M 0,-20 C 4,-23 9,-25 11,-27 M 0,-30 L -4,-33 M 0,-30 L 4,-33" 
                        fill="none" stroke="#86efac" stroke-width="0.8" stroke-linecap="round" opacity="0.85"/>
                </g>

                <!-- 2. Lanceolate Vine Leaf for Shoots -->
                <g id="vine-leaf-sleek">
                  <path d="M 0,0 Q -1,5 -3,9" fill="none" stroke="#09280d" stroke-width="1.4" stroke-linecap="round"/>
                  <path d="M 0,0 C -9,-10 -12,-25 0,-36 C 12,-25 9,-10 0,0 Z" 
                        fill="url(#leaf-grad-accent)" stroke="#0b3810" stroke-width="0.8"/>
                  <path d="M 0,-2 L 0,-32 M 0,-10 L -5,-16 M 0,-10 L 5,-16 M 0,-20 L -4,-24 M 0,-20 L 4,-24" 
                        fill="none" stroke="#bef264" stroke-width="0.6" stroke-linecap="round" opacity="0.8"/>
                </g>

                <!-- 3. Curling Spiraling Grapevine Tendril (Right) -->
                <g id="curly-tendril">
                  <path d="M 0,0 C 12,-10 22,-6 18,-20 C 14,-32 0,-28 -2,-18 C -4,-9 8,-8 6,-14 C 5,-17 1,-16 2,-13" 
                        fill="none" stroke="#4ade80" stroke-width="1.8" stroke-linecap="round"/>
                </g>

                <!-- 4. Curling Spiraling Grapevine Tendril (Left) -->
                <g id="curly-tendril-left">
                  <path d="M 0,0 C -12,-10 -22,-6 -18,-20 C -14,-32 0,-28 2,-18 C 4,-9 -8,-8 -6,-14 C -5,-17 -1,-16 -2,-13" 
                        fill="none" stroke="#4ade80" stroke-width="1.8" stroke-linecap="round"/>
                </g>

                <!-- 5. Swelling Vine Node / Bark Joint -->
                <g id="vine-node">
                  <circle cx="0" cy="0" r="3.2" fill="#09280d" stroke="#22c55e" stroke-width="0.8"/>
                </g>

                <!-- 6. Flower Bud -->
                <g id="flower-bud">
                  <path d="M 0,0 Q -2,4 -3,8" fill="none" stroke="#09280d" stroke-width="1"/>
                  <ellipse cx="0" cy="-6" rx="3.5" ry="6" fill="#f472b6"/>
                  <path d="M -2,0 Q -5,-5 0,-10 Q 5,-5 2,0 Z" fill="#22c55e" opacity="0.85"/>
                </g>

                <g id="single-flower">
                   <circle cx="-5" cy="-5" r="4" fill="white"/><circle cx="5" cy="-5" r="4" fill="white"/>
                   <circle cx="-5" cy="5" r="4" fill="white"/><circle cx="5" cy="5" r="4" fill="white"/>
                   <circle cx="0" cy="0" r="3.5" fill="#FFEC82"/>
                </g>
                <g id="orchid-flower">
                   <ellipse cx="0" cy="-5" rx="2" ry="5.5" fill="#A26DBB" />
                   <ellipse cx="-4.5" cy="4" rx="2" ry="5" fill="#BE95CE" transform="rotate(40 -4.5 4)" />
                   <ellipse cx="4.5" cy="4" rx="2" ry="5" fill="#E48EF5" transform="rotate(-40 4.5 4)" />
                   <circle cx="-4" cy="-1" r="4" fill="#e6e6fa"/>
                   <circle cx="4" cy="-1" r="4" fill="#e6e6fa"/>
                   <path d="M -2.5 1.5 Q 0 6 2.5 1.5 Z" fill="#8a2be2"/>
                   <circle cx="0" cy="0.5" r="1.5" fill="#FDFF79"/>
                </g>
                <g id="flower-cluster">
                   <use href="#single-flower" transform="translate(0,0) scale(1.3)"/>
                   <use href="#single-flower" transform="translate(12,10) scale(0.9) rotate(25)"/>
                   <use href="#single-flower" transform="translate(-10,12) scale(0.95) rotate(-15)"/>
                   <use href="#single-flower" transform="translate(8,-12) scale(0.7) rotate(40)"/>
                </g>
                <g id="orchid-cluster">
                   <use href="#orchid-flower" transform="translate(0,0) scale(1.3)"/>
                   <use href="#orchid-flower" transform="translate(11,9) scale(0.9) rotate(35)"/>
                   <use href="#orchid-flower" transform="translate(-10,10) scale(0.95) rotate(-20)"/>
                   <use href="#single-flower" transform="translate(8,-12) scale(0.7) rotate(15)"/>
                </g>
                <g id="dense-cluster">
                   <use href="#orchid-flower" transform="translate(0,0) scale(1.6)"/>
                   <use href="#single-flower" transform="translate(16,12) scale(1.2) rotate(15)"/>
                   <use href="#orchid-flower" transform="translate(-15,15) scale(1.1) rotate(-25)"/>
                   <use href="#single-flower" transform="translate(12,-16) scale(1.0) rotate(45)"/>
                   <use href="#orchid-flower" transform="translate(-18,-8) scale(1.3) rotate(-55)"/>
                   <use href="#single-flower" transform="translate(5,22) scale(0.9) rotate(80)"/>
                </g>
              </defs>
              ${generateVerdantVines()}
            </svg>
          </div>
        `,
        coreSvg: `
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5" style="overflow: visible;">
            <circle cx="50" cy="50" r="48" stroke-dasharray="10 5" stroke-opacity="0.6" />
            <path d="M50 15 C 65 15, 65 45, 50 50 C 35 45, 35 15, 50 15 Z" stroke-width="1.5" fill="currentColor" fill-opacity="0.1"/>
            <path d="M50 85 C 65 85, 65 55, 50 50 C 35 55, 35 85, 50 85 Z" stroke-width="1.5" fill="currentColor" fill-opacity="0.1"/>
            <path d="M15 50 C 15 35, 45 35, 50 50 C 45 65, 15 65, 15 50 Z" stroke-width="1.5" fill="currentColor" fill-opacity="0.1"/>
            <path d="M85 50 C 85 35, 55 35, 50 50 C 55 65, 85 65, 85 50 Z" stroke-width="1.5" fill="currentColor" fill-opacity="0.1"/>
            
            <g class="big-core-flower">
              <path d="M50 15 Q 65 35 50 50 Q 35 35 50 15 Z" fill="white" stroke="rgba(46, 139, 87, 0.5)" stroke-width="1" transform="rotate(0 50 50)"/>
              <path d="M50 15 Q 65 35 50 50 Q 35 35 50 15 Z" fill="white" stroke="rgba(46, 139, 87, 0.5)" stroke-width="1" transform="rotate(45 50 50)"/>
              <path d="M50 15 Q 65 35 50 50 Q 35 35 50 15 Z" fill="white" stroke="rgba(46, 139, 87, 0.5)" stroke-width="1" transform="rotate(90 50 50)"/>
              <path d="M50 15 Q 65 35 50 50 Q 35 35 50 15 Z" fill="white" stroke="rgba(46, 139, 87, 0.5)" stroke-width="1" transform="rotate(135 50 50)"/>
              <path d="M50 15 Q 65 35 50 50 Q 35 35 50 15 Z" fill="white" stroke="rgba(46, 139, 87, 0.5)" stroke-width="1" transform="rotate(180 50 50)"/>
              <path d="M50 15 Q 65 35 50 50 Q 35 35 50 15 Z" fill="white" stroke="rgba(46, 139, 87, 0.5)" stroke-width="1" transform="rotate(225 50 50)"/>
              <path d="M50 15 Q 65 35 50 50 Q 35 35 50 15 Z" fill="white" stroke="rgba(46, 139, 87, 0.5)" stroke-width="1" transform="rotate(270 50 50)"/>
              <path d="M50 15 Q 65 35 50 50 Q 35 35 50 15 Z" fill="white" stroke="rgba(46, 139, 87, 0.5)" stroke-width="1" transform="rotate(315 50 50)"/>
              
              <path d="M50 22 Q 60 38 50 50 Q 40 38 50 22 Z" fill="#e6e6fa" stroke="#CAA0DD" stroke-width="1" transform="rotate(22.5 50 50)"/>
              <path d="M50 22 Q 60 38 50 50 Q 40 38 50 22 Z" fill="#e6e6fa" stroke="#CAA0DD" stroke-width="1" transform="rotate(67.5 50 50)"/>
              <path d="M50 22 Q 60 38 50 50 Q 40 38 50 22 Z" fill="#e6e6fa" stroke="#CAA0DD" stroke-width="1" transform="rotate(112.5 50 50)"/>
              <path d="M50 22 Q 60 38 50 50 Q 40 38 50 22 Z" fill="#e6e6fa" stroke="#CAA0DD" stroke-width="1" transform="rotate(157.5 50 50)"/>
              <path d="M50 22 Q 60 38 50 50 Q 40 38 50 22 Z" fill="#e6e6fa" stroke="#CAA0DD" stroke-width="1" transform="rotate(202.5 50 50)"/>
              <path d="M50 22 Q 60 38 50 50 Q 40 38 50 22 Z" fill="#e6e6fa" stroke="#CAA0DD" stroke-width="1" transform="rotate(247.5 50 50)"/>
              <path d="M50 22 Q 60 38 50 50 Q 40 38 50 22 Z" fill="#e6e6fa" stroke="#CAA0DD" stroke-width="1" transform="rotate(292.5 50 50)"/>
              <path d="M50 22 Q 60 38 50 50 Q 40 38 50 22 Z" fill="#e6e6fa" stroke="#CAA0DD" stroke-width="1" transform="rotate(337.5 50 50)"/>

              <circle cx="50" cy="50" r="11" fill="#F8E88F" stroke="none"/>
              <circle cx="50" cy="50" r="7" fill="#FFD677" stroke="none"/>
              <circle cx="50" cy="50" r="3" fill="#EEAD59" stroke="none"/>
            </g>
          </svg>`
      },
      cyber: {
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
          </svg>`
      }
    };

    const t = themes[themeName] || themes.blood;

    // --- SHADOW DOM HOST ISOLATION ---
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

    // --- COMPLETE STYLESHEET (ENCAPSULATED INSIDE SHADOW DOM) ---
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

      /* Top HUD controls */
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

      /* Circle Container */
      .dark-circle-container { 
        position: relative; width: 600px; height: 600px; 
        display: flex; justify-content: center; align-items: center; 
        transition: transform 0.1s ease;
      }

      /* Kinetic Tremor Shake on Completion */
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

      /* Particle Canvas */
      .particle-canvas {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        pointer-events: none; z-index: 10;
      }

      /* Sealing Shockwave */
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

      /* Runic and Geometry Rings */
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

      /* OVERRIDES FOR VERDANT THEME */
      .theme-verdant .ring-blood {
        border-radius: 50% !important; animation: rotateCcw 15s linear infinite !important;
        box-shadow: 0 0 15px currentColor, inset 0 0 10px currentColor !important;
      }

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

      /* VERDANT VINES ANIMATIONS */
      .verdant-vines-container { position: absolute; width: 100%; height: 100%; z-index: 5; pointer-events: none; }
      .vine-base { stroke-dasharray: 400; stroke-dashoffset: 400; animation: growVine 1.2s ease-in-out forwards; }
      .vine-mid { stroke-dasharray: 600; stroke-dashoffset: 600; animation: growVine 1.8s ease-in-out 0.4s forwards; }
      .vine-tip { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: growVine 2.5s ease-out 0.8s forwards; }
      .vine-base { stroke-dasharray: 700; stroke-dashoffset: 700; animation: growVine 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; filter: drop-shadow(0 2px 4px rgba(0,20,5,0.8)); }
      .vine-climber { stroke-dasharray: 700; stroke-dashoffset: 700; animation: growVine 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s forwards; filter: drop-shadow(0 0 5px rgba(74, 222, 128, 0.4)); }
      .vine-branch { stroke-dasharray: 550; stroke-dashoffset: 550; animation: growVine 1.6s cubic-bezier(0.4, 0, 0.2, 1) 0.35s forwards; }
      .vine-sub { stroke-dasharray: 450; stroke-dashoffset: 450; animation: growVine 1.9s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards; }
      @keyframes growVine { to { stroke-dashoffset: 0; } }
      
      /* Leaves Unfurling Animation */
      .vine-leaf {
        opacity: 0;
        animation: unfurlLeaf 1.0s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      }
      @keyframes unfurlLeaf {
        0% { transform: scale(0) rotate(-40deg); opacity: 0; }
        65% { transform: scale(1.15) rotate(4deg); opacity: 0.95; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; filter: drop-shadow(0 2px 5px rgba(0,25,5,0.7)); }
      }

      /* Tendrils Growth */
      .vine-tendril {
        opacity: 0;
        animation: growTendril 1.2s ease-out forwards;
      }
      @keyframes growTendril {
        0% { opacity: 0; transform: scale(0.15) rotate(-20deg); }
        50% { opacity: 0.8; }
        100% { opacity: 1; transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 5px #4ade80); }
      }

      /* Node joint pop */
      .vine-node {
        opacity: 0;
        animation: popNode 0.5s ease-out forwards;
      }
      @keyframes popNode {
        0% { opacity: 0; transform: scale(0); }
        100% { opacity: 1; transform: scale(1); }
      }

      .flower { opacity: 0; animation: bloomFlower 1.2s ease-out forwards; }
      @keyframes bloomFlower {
        0% { opacity: 0; transform: scale(0) rotate(-30deg); filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
        100% { opacity: 1; transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 8px rgba(255,255,255,0.7)); }
        100% { opacity: 1; transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 10px rgba(255,255,255,0.8)); }
      }

      .big-core-flower { opacity: 0; animation: bloomBigCore 3.5s ease-in-out 0.3s forwards; transform-origin: 50px 50px; }
      @keyframes bloomBigCore {
        0% { opacity: 0; transform: scale(0) rotate(-90deg); }
        60% { opacity: 1; transform: scale(4.5) rotate(10deg); filter: drop-shadow(0 0 5px rgba(255,255,255,0.4)); }
        100% { opacity: 1; transform: scale(4) rotate(0deg); filter: drop-shadow(0 0 20px rgba(255,255,255,1)); }
      }

      /* GENERAL RING ANIMATIONS */
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

      /* Progressive Chanting Text */
      .dark-status-text {
        margin-top: 55px; color: ${t.textColor}; font-family: 'Courier New', Courier, monospace;
        font-size: 16px; letter-spacing: 10px; text-transform: uppercase;
        text-shadow: 0 0 10px ${t.textGlow}; animation: breatheText 1.6s infinite alternate;
        transition: color 0.4s ease, text-shadow 0.4s ease;
      }
      
      .theme-cyber ~ .dark-status-text {
        text-shadow: -2px 0px 0px #ff00ff, 2px 0px 0px #00ffff, 0 0 10px #00ffff !important;
        animation: cyberBreathe 1s infinite alternate !important;
      }
      @keyframes cyberBreathe {
        0% { opacity: 0.75; }
        100% { opacity: 1; filter: brightness(1.5); }
      }
      @keyframes breatheText { 0% { opacity: 0.4; filter: blur(0.8px); } 100% { opacity: 1; filter: blur(0px); } }
      
      #dark-transmute-overlay.complete::after {
        content: ''; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #000000; z-index: 100; animation: darknessSwallow 0.8s ease-in forwards;
        pointer-events: none;
      }
      @keyframes darknessSwallow { 0% { opacity: 0; } 100% { opacity: 1; } }
    `;
    shadow.appendChild(style);

    // --- SVGS ---
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

    // --- BUILD DOM STRUCTURE ---
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
        ${t.extraHTML}
        <div class="ring-runes-outer">${outerRunesSvg}</div>
        <div class="dark-ring ring-thorns"></div>
        <div class="dark-ring ring-blood"></div>
        <div class="ring-runes-inner">${innerRunesSvg}</div>
        <div class="dark-ring ring-core-bind"></div>
        <div class="dark-core">${t.coreSvg}</div>
        <div class="sealing-shockwave"></div>
        <canvas class="particle-canvas" width="600" height="600"></canvas>
      </div>
      <div class="dark-status-text">${t.stages[0]}</div>
    `;

    shadow.appendChild(overlay);
    document.documentElement.appendChild(host);

    // --- PARTICLE ENGINE (CANVAS 2D) ---
    const canvas = overlay.querySelector('.particle-canvas');
    const ctx = canvas.getContext('2d');
    let particlesRunning = true;
    let animFrameId = null;

    const particles = [];
    const numParticles = 38;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * 600,
        y: Math.random() * 600,
        radius: Math.random() * 2.5 + 1,
        speedY: Math.random() * 1.4 + 0.6,
        speedX: (Math.random() - 0.5) * 0.8,
        alpha: Math.random() * 0.8 + 0.2,
        decay: Math.random() * 0.008 + 0.003,
        pulseOffset: Math.random() * Math.PI * 2,
        char: Math.random() > 0.5 ? '1' : '0'
      });
    }

    function renderParticles() {
      if (!particlesRunning) return;
      ctx.clearRect(0, 0, 600, 600);

      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += Math.sin(p.pulseOffset) * 0.6 + p.speedX;
        p.pulseOffset += 0.04;
        p.alpha -= p.decay;

        if (p.y < 20 || p.alpha <= 0) {
          p.y = 560 + Math.random() * 30;
          p.x = 100 + Math.random() * 400;
          p.alpha = Math.random() * 0.7 + 0.3;
        }

        ctx.save();
        if (themeName === 'blood') {
          // Crimson glowing embers
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, ${Math.floor(p.radius * 25)}, 0, ${p.alpha})`;
          ctx.shadowColor = '#ff2200';
          ctx.shadowBlur = 8;
          ctx.fill();
        } else if (themeName === 'verdant') {
          // Bioluminescent floating pollen / fireflies
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(130, 255, 160, ${p.alpha})`;
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 10;
          ctx.fill();
        } else if (themeName === 'cyber') {
          // Rising binary telemetry bits
          ctx.font = '10px monospace';
          ctx.fillStyle = `rgba(0, 255, 255, ${p.alpha})`;
          ctx.shadowColor = '#00ffff';
          ctx.shadowBlur = 6;
          ctx.fillText(p.char, p.x, p.y);
        }
        ctx.restore();
      });

      animFrameId = requestAnimationFrame(renderParticles);
    }
    renderParticles();

    // --- TEARDOWN / CLEANUP FUNCTION ---
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

    // --- HUD BUTTON LISTENERS ---
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

    // Fade in overlay
    setTimeout(() => { overlay.classList.add('active'); }, 10);

    // --- PARALLEL EXTRACTION PIPELINE ---
    const extractionPromise = (async () => {
      const docClone = document.cloneNode(true);
      return new Readability(docClone).parse();
    })();

    // --- PROGRESSIVE STAGE TIMING ---
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

    // --- COMPLETION & SEALING ---
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

          // Preserve code block programming language tags
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

          // Trigger visual & sensory climax
          statusEl.innerText = t.stages[3];
          statusEl.style.color = t.textColor;
          statusEl.style.textShadow = `0 0 20px ${t.completeGlow}`;

          overlay.classList.add('complete');
          circleContainer.classList.add('sealing-tremor');
          soundEngine.playThemeSeal(themeName);

          // Dispatch download message
          setTimeout(() => {
            if (!isTerminated) {
              chrome.runtime.sendMessage({
                action: "download",
                markdown: markdown,
                filename: filename
              });
            }
          }, 600);

          // Graceful fade out
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
