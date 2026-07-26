if (typeof window.hasRun === 'undefined') {
  window.hasRun = true;

  chrome.storage.local.get(['chosenTheme'], (result) => {
    const themeName = result.chosenTheme || 'blood';

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
      ];

      let branchesHTML = '';
      for (let i = 0; i < 8; i++) {
        let rotation = i * 45;
        let flowersHTML = '';
        
        let numFlowers = Math.floor(Math.random() * 9) + 12;
        let shuffledPoints = [...spawnPoints].sort(() => 0.5 - Math.random()).slice(0, numFlowers);
        
        shuffledPoints.forEach(pt => {
          let randType = Math.random();
          let type;
          
          if (randType > 0.75) {
              type = '#dense-cluster';
          } else if (randType > 0.50) {
              type = '#flower-cluster';
          } else if (randType > 0.30) {
              type = '#orchid-cluster';
          } else if (randType > 0.15) {
              type = '#orchid-flower';
          } else {
              type = '#single-flower';
          }
          
          let scale = (Math.random() * 1.4 + 0.8).toFixed(2); 
          let delay = (Math.random() * 1.5 + 1.0).toFixed(2); 
          
          flowersHTML += `<g style="transform: translate(${pt.x}px, ${pt.y}px);"><g class="flower" style="animation-delay: ${delay}s;"><use href="${type}" transform="scale(${scale})"/></g></g>`;
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
          </g>
        `;
      }
      return branchesHTML;
    }

    const themes = {
      blood: {
        bgGradient: 'radial-gradient(circle, rgba(15, 0, 0, 0.98) 0%, rgba(0, 0, 0, 1) 100%)',
        voidColor: 'rgba(40, 0, 0, 0.6)',
        thornsColor: 'rgba(139, 0, 0, 0.5)',
        bloodColor: 'rgba(80, 0, 0, 0.9)',
        coreColor: 'rgba(150, 0, 0, 0.8)',
        textColor: '#5a0000',
        textGlow: 'rgba(90, 0, 0, 0.5)',
        completeGlow: '#ff0000',
        statusExtract: 'Extracting Essence...',
        statusComplete: 'PACT SEALED',
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
        bgGradient: 'radial-gradient(circle, rgba(5, 15, 5, 0.98) 0%, rgba(0, 5, 0, 1) 100%)',
        voidColor: 'rgba(34, 139, 34, 0.3)',
        thornsColor: 'rgba(85, 107, 47, 0.6)',
        bloodColor: 'rgba(46, 139, 87, 0.8)',
        coreColor: 'rgba(60, 179, 113, 0.9)',
        textColor: '#2e8b57',
        textGlow: 'rgba(46, 139, 87, 0.5)',
        completeGlow: '#00ff7f',
        statusExtract: 'Cultivating Knowledge...',
        statusComplete: 'HARVEST COMPLETE',
        outerRunes: '᛭ᚣᛡᛄᛥᛤᛣᛢᛡᛠᛟᛞᛝᛜᛛᛚᛙᛘᛗᛖᛕᛔᛓᛒᛑᛐᛏᛌᛋᛆᛅᛁᚿᚾᚽᚼᚴᚱᚬᚦᚢᚠ᛭',
        innerRunes: 'ᚢᚠ᛭ᚣᛡᛄᛥᛤᛣᛢᛡᛠᛟᛞᛝᛜᛛᛚᛙ',
        extraHTML: `
          <div class="verdant-vines-container">
            <svg viewBox="-300 -300 600 600" width="100%" height="100%" style="overflow: visible;">
              <defs>
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
        bgGradient: 'radial-gradient(circle, rgba(10, 0, 20, 0.98) 0%, rgba(0, 5, 10, 1) 100%)',
        voidColor: 'rgba(0, 255, 255, 0.1)',
        thornsColor: 'rgba(255, 0, 255, 0.5)',
        bloodColor: 'rgba(0, 200, 255, 0.5)',
        coreColor: 'rgba(0, 255, 255, 0.9)',
        textColor: '#00ffff',
        textGlow: 'rgba(0, 255, 255, 0.8)',
        completeGlow: '#ff00ff',
        statusExtract: 'SYSTEM.UPLINK_ESTABLISHED...',
        statusComplete: 'DATA.EXTRACTION_SECURED',
        outerRunes: '01000101 01011000 01010100 01010010 01000001 01000011 01010100 01001001 01001111 01001110 00100000 01001001 01001110 01001001 01010100',
        innerRunes: '0xFF 0xA2 0xB4 0xC1 0x00 0x11 0x10 0x01',
        extraHTML: `
          <div class="cyber-circuit-container">
            <!-- MASSIVE NEON TRIANGLES (Scaled way outside the primary circle) -->
            <svg viewBox="-400 -400 800 800" width="100%" height="100%" style="overflow: visible; position: absolute; z-index: -1;">
              <g style="animation: rotateCw 30s linear infinite; transform-origin: 0px 0px;">
                 <!-- Upright Triangle (Magenta) -->
                 <polygon points="0,-350 303.1,175 -303.1,175" fill="rgba(255,0,255,0.03)" stroke="#ff00ff" stroke-width="4" class="cyber-neon-mag" />
              </g>
              <g style="animation: rotateCcw 40s linear infinite; transform-origin: 0px 0px;">
                 <!-- Inverted Triangle (Cyan) creating a hexagram overlap -->
                 <polygon points="0,350 -303.1,-175 303.1,-175" fill="rgba(0,255,255,0.03)" stroke="#00ffff" stroke-width="4" class="cyber-neon-cyan" />
              </g>
              <g style="animation: rotateCw 50s linear infinite; transform-origin: 0px 0px;">
                 <!-- Massive Outer Offset Triangle (Yellow Dashed) -->
                 <polygon points="-400,0 200,346.4 200,-346.4" fill="none" stroke="#ffff00" stroke-width="2" stroke-dasharray="15 10" class="cyber-neon-yel" />
              </g>
            </svg>
            
            <!-- Standard Circuit Spawns -->
            <svg viewBox="-300 -300 600 600" width="100%" height="100%" style="overflow: visible; position: absolute;">
              <defs>
                <g id="circuit-system">
                   <!-- Main dataline (Cyan) -->
                   <path d="M 0 -120 L 0 -180 L 30 -210 L 30 -350" fill="none" stroke="#00ffff" stroke-width="3" class="cyber-trace" />
                   <rect x="25" y="-360" width="10" height="10" fill="#00ffff" class="cyber-node" />
                   <!-- Branch dataline (Magenta) -->
                   <path d="M 0 -150 L -40 -190 L -40 -260 L -70 -290 L -70 -420" fill="none" stroke="#ff00ff" stroke-width="2" class="cyber-trace-alt" />
                   <circle cx="-70" cy="-420" r="5" fill="#ff00ff" class="cyber-node-alt" />
                   <!-- Micro trace (Yellow) -->
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

    const t = themes[themeName];

    const overlay = document.createElement('div');
    overlay.id = "dark-transmute-overlay";
    
    const style = document.createElement('style');
    style.textContent = `
      #dark-transmute-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #000000; background: ${t.bgGradient};
        z-index: 9999999; display: flex; justify-content: center; align-items: center; flex-direction: column;
        opacity: 0; transition: opacity 0.8s ease-out; pointer-events: auto;
      }
      #dark-transmute-overlay.active { opacity: 1; }

      .dark-circle-container { position: relative; width: 600px; height: 600px; display: flex; justify-content: center; align-items: center; }
      .dark-ring { position: absolute; border-radius: 50%; box-shadow: 0 0 15px currentColor, inset 0 0 10px currentColor; }

      .ring-void { width: 100%; height: 100%; color: ${t.voidColor}; border: 1px solid currentColor; animation: rotateCw 40s linear infinite; }
      .ring-runes-outer { position: absolute; width: 85%; height: 85%; animation: rotateCcw 30s linear infinite; }
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
      @keyframes growVine { to { stroke-dashoffset: 0; } }
      
      .flower { opacity: 0; animation: bloomFlower 1.2s ease-out forwards; }
      @keyframes bloomFlower {
        0% { opacity: 0; transform: scale(0) rotate(-30deg); filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
        100% { opacity: 1; transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 8px rgba(255,255,255,0.7)); }
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

      .ring-runes-outer svg, .ring-runes-inner svg, .dark-core svg { width: 100%; height: 100%; overflow: visible; }
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
        margin-top: 60px; color: ${t.textColor}; font-family: 'Courier New', Courier, monospace;
        font-size: 16px; letter-spacing: 12px; text-transform: uppercase;
        text-shadow: 0 0 10px ${t.textGlow}; animation: breatheText 2s infinite alternate;
      }
      
      /* Chromatic Aberration Glitch effect for the Cyber Theme text */
      .theme-cyber ~ .dark-status-text {
        text-shadow: -3px 0px 0px #ff00ff, 3px 0px 0px #00ffff, 0 0 10px #00ffff !important;
        animation: cyberBreathe 1s infinite alternate !important;
      }
      @keyframes cyberBreathe {
        0% { opacity: 0.8; }
        100% { opacity: 1; filter: brightness(1.5); }
      }

      @keyframes breatheText { 0% { opacity: 0.4; filter: blur(1px); } 100% { opacity: 1; filter: blur(0px); } }
      
      #dark-transmute-overlay.complete::after {
          content: ''; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: #000000; z-index: 10000000; animation: darknessSwallow 0.8s ease-in forwards;
      }
      @keyframes darknessSwallow { 0% { opacity: 0; } 100% { opacity: 1; } }
    `;
    document.head.appendChild(style);

    const outerRunesSvg = `
    <svg viewBox="0 0 200 200">
      <path id="rune-path-outer" d="M 100, 100 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0" fill="none" />
      <text><textPath href="#rune-path-outer" startOffset="0%">
        ${t.outerRunes}
      </textPath></text>
    </svg>`;

    const innerRunesSvg = `
    <svg viewBox="0 0 200 200">
      <path id="rune-path-inner" d="M 100, 100 m -85, 0 a 85,85 0 1,0 170,0 a 85,85 0 1,0 -170,0" fill="none" />
      <text><textPath href="#rune-path-inner" startOffset="0%">
        ${t.innerRunes}
      </textPath></text>
    </svg>`;

    overlay.innerHTML = `
      <div class="dark-circle-container theme-${themeName}">
        <div class="dark-ring ring-void"></div>
        ${t.extraHTML}
        <div class="ring-runes-outer">${outerRunesSvg}</div>
        <div class="dark-ring ring-thorns"></div>
        <div class="dark-ring ring-blood"></div>
        <div class="ring-runes-inner">${innerRunesSvg}</div>
        <div class="dark-ring ring-core-bind"></div>
        <div class="dark-core">${t.coreSvg}</div>
      </div>
      <div class="dark-status-text">${t.statusExtract}</div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => { overlay.classList.add('active'); }, 10);

    setTimeout(() => {
      try {
        const documentClone = document.cloneNode(true);
        const article = new Readability(documentClone).parse();

        if (article) {
          const turndownService = new TurndownService({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced'
          });
          
          const gfm = turndownPluginGfm.gfm;
          turndownService.use(gfm);
          
          const date = new Date().toLocaleDateString();
          let markdown = `> 🩸 **THE ARCHIVE**\n`;
          markdown += `> *Siphoned on:* ${date}\n`;
          markdown += `> *Vessel Source:* [${window.location.hostname}](${window.location.href})\n`;
          markdown += `---\n\n`;
          
          markdown += `# ${article.title}\n\n`;
          markdown += turndownService.turndown(article.content);

          const safeTitle = article.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
          const filename = `grimoire_${safeTitle || 'unknown'}.md`;

          const statusText = overlay.querySelector('.dark-status-text');
          statusText.innerText = t.statusComplete;
          statusText.style.color = t.textColor; 
          statusText.style.textShadow = `0 0 20px ${t.completeGlow}`;

          overlay.classList.add('complete');

          setTimeout(() => {
              chrome.runtime.sendMessage({ action: "download", markdown: markdown, filename: filename });
          }, 800); 

        } else {
          alert("No usable content detected on this page.");
          overlay.remove();
          window.hasRun = undefined;
          return; 
        }

        setTimeout(() => {
          overlay.classList.remove('active', 'complete');
          setTimeout(() => { overlay.remove(); window.hasRun = undefined; }, 800); 
        }, 1800); 

      } catch (error) {
        console.error("Ritual Interrupted:", error);
        const statusText = overlay.querySelector('.dark-status-text');
        statusText.innerText = "RITUAL FAILED (CHECK CONSOLE)";
        
        setTimeout(() => {
          overlay.classList.remove('active');
          setTimeout(() => { overlay.remove(); window.hasRun = undefined; }, 500);
        }, 3000);
      }
    }, 4000); 
  }); 
}