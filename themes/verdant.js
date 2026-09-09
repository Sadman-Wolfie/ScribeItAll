(function() {
  window.ScribeThemes = window.ScribeThemes || {};

  // --- BOTANICAL VERDANT VINES GENERATOR ---
  function generateVerdantVines() {
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
      { x: 138, y: -415, rot: 40, type: '#vine-leaf-sleek', scale: 0.85, delay: 1.45 },
      { x: 158, y: -455, rot: 30, type: '#vine-leaf-sleek', scale: 0.75, delay: 1.65 },

      // Left lateral branch foliage
      { x: -45, y: -365, rot: -65, type: '#vine-leaf-sleek', scale: 1.05, delay: 1.15 },
      { x: -75, y: -415, rot: -75, type: '#vine-leaf-sleek', scale: 0.95, delay: 1.3 },
      { x: -82, y: -475, rot: -50, type: '#vine-leaf-sleek', scale: 0.85, delay: 1.5 },
      { x: -115, y: -535, rot: -40, type: '#vine-leaf-sleek', scale: 0.75, delay: 1.7 }
    ];

    const tendrilNodes = [
      { x: 16, y: -190, rot: 45, type: '#curly-tendril', scale: 1.1, delay: 0.7 },
      { x: -18, y: -260, rot: -55, type: '#curly-tendril-left', scale: 1.0, delay: 0.95 },
      { x: 92, y: -330, rot: 70, type: '#curly-tendril', scale: 0.95, delay: 1.2 },
      { x: 145, y: -430, rot: 50, type: '#curly-tendril', scale: 0.85, delay: 1.5 },
      { x: -70, y: -440, rot: -60, type: '#curly-tendril-left', scale: 0.9, delay: 1.35 },
      { x: -105, y: -510, rot: -45, type: '#curly-tendril-left', scale: 0.8, delay: 1.6 },
      { x: 26, y: -540, rot: 20, type: '#curly-tendril', scale: 0.75, delay: 1.8 }
    ];

    const flowerNodes = [
      { x: 28, y: -210, type: '#orchid-flower', scale: 1.2, delay: 1.1 },
      { x: 14, y: -245, type: '#single-flower', scale: 1.1, delay: 1.25 },
      { x: 88, y: -290, type: '#flower-cluster', scale: 1.0, delay: 1.4 },
      { x: 125, y: -375, type: '#orchid-cluster', scale: 0.95, delay: 1.55 },
      { x: 160, y: -455, type: '#dense-cluster', scale: 0.85, delay: 1.8 },
      { x: -65, y: -415, type: '#flower-cluster', scale: 0.95, delay: 1.5 },
      { x: -125, y: -570, type: '#orchid-flower', scale: 0.85, delay: 1.9 },
      { x: 26, y: -570, type: '#flower-bud', scale: 1.0, delay: 2.05 }
    ];

    const barkNodes = [
      { x: 17, y: -185 }, { x: 0, y: -275 }, { x: -50, y: -395 },
      { x: 90, y: -290 }, { x: 160, y: -380 }, { x: -75, y: -470 }
    ];

    let branchesHTML = '';

    for (let i = 0; i < 8; i++) {
      const rotation = i * 45;
      const isOdd = i % 2 === 1;

      let leavesHTML = '';
      foliageNodes.forEach(leaf => {
        const s = (leaf.scale * (isOdd ? 1.08 : 0.92)).toFixed(2);
        const d = (leaf.delay + (isOdd ? 0.08 : 0)).toFixed(2);
        const r = isOdd ? -leaf.rot : leaf.rot;
        const x = isOdd ? -leaf.x : leaf.x;
        leavesHTML += `
          <g transform="translate(${x}, ${leaf.y}) rotate(${r})">
            <g class="vine-leaf" style="animation-delay: ${d}s;">
              <use href="${leaf.type}" transform="scale(${s})" />
            </g>
          </g>`;
      });

      let tendrilsHTML = '';
      tendrilNodes.forEach(tNode => {
        const s = (tNode.scale * (isOdd ? 1.05 : 0.95)).toFixed(2);
        const d = (tNode.delay + (isOdd ? 0.05 : 0)).toFixed(2);
        const r = isOdd ? -tNode.rot : tNode.rot;
        const x = isOdd ? -tNode.x : tNode.x;
        tendrilsHTML += `
          <g transform="translate(${x}, ${tNode.y}) rotate(${r})">
            <g class="vine-tendril" style="animation-delay: ${d}s;">
              <use href="${tNode.type}" transform="scale(${s})" />
            </g>
          </g>`;
      });

      let nodesHTML = '';
      barkNodes.forEach(bn => {
        const x = isOdd ? -bn.x : bn.x;
        nodesHTML += `<use href="#vine-node" x="${x}" y="${bn.y}" class="vine-node" />`;
      });

      let flowersHTML = '';
      flowerNodes.forEach(fl => {
        const s = (fl.scale * (isOdd ? 1.05 : 0.95)).toFixed(2);
        const d = fl.delay.toFixed(2);
        const x = isOdd ? -fl.x : fl.x;
        flowersHTML += `
          <g transform="translate(${x}, ${fl.y})">
            <g class="flower" style="animation-delay: ${d}s;">
              <use href="${fl.type}" transform="scale(${s})" />
            </g>
          </g>`;
      });

      branchesHTML += `
        <g transform="rotate(${rotation})">
          <!-- Woody Main Stem -->
          <path d="M 0 -120 C 25 -165 38 -215 12 -270 C -18 -325 -30 -385 -6 -445 C 18 -500 12 -540 28 -575" 
                fill="none" stroke="url(#vine-grad-wood)" stroke-width="7" stroke-linecap="round" class="vine-base" />

          <!-- Supple Emerald Climber Runner (Intertwined & Braided) -->
          <path d="M 0 -120 C -20 -160 -15 -210 18 -260 C 35 -315 15 -370 -12 -430 C -25 -480 -10 -530 15 -570" 
                fill="none" stroke="url(#vine-grad-climber)" stroke-width="3.5" stroke-linecap="round" class="vine-climber" />

          <!-- Lateral Branch 1 (Right) -->
          <path d="M 17 -185 C 50 -205 75 -235 90 -290 C 105 -335 135 -370 160 -380 C 190 -395 240 -430 275 -455" 
                fill="none" stroke="url(#vine-grad-wood)" stroke-width="4.5" stroke-linecap="round" class="vine-branch" />
          <path d="M 90 -290 C 115 -315 140 -340 165 -355" 
                fill="none" stroke="url(#vine-grad-climber)" stroke-width="2.5" stroke-linecap="round" class="vine-sub" />

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

  window.ScribeThemes.verdant = {
    name: 'verdant',
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

            <!-- Detailed 3-Lobed Ivy Leaf with Petiole & Veins -->
            <g id="ivy-leaf">
              <path d="M 0,0 Q -2,6 -4,12" fill="none" stroke="#09280d" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M 0,0 C -8,-6 -18,-5 -22,-14 C -25,-22 -16,-28 -12,-30 C -8,-32 -5,-26 0,-44 C 5,-26 8,-32 12,-30 C 16,-28 25,-22 22,-14 C 18,-5 8,-6 0,0 Z" 
                    fill="url(#leaf-grad-main)" stroke="#07200a" stroke-width="1" stroke-linejoin="round"/>
              <path d="M 0,-2 L 0,-40 M 0,-10 C -5,-14 -12,-16 -17,-18 M 0,-10 C 5,-14 12,-16 17,-18 M 0,-20 C -4,-23 -9,-25 -11,-27 M 0,-20 C 4,-23 9,-25 11,-27 M 0,-30 L -4,-33 M 0,-30 L 4,-33" 
                    fill="none" stroke="#86efac" stroke-width="0.8" stroke-linecap="round" opacity="0.85"/>
            </g>

            <!-- Lanceolate Vine Leaf for Shoots -->
            <g id="vine-leaf-sleek">
              <path d="M 0,0 Q -1,5 -3,9" fill="none" stroke="#09280d" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M 0,0 C -9,-10 -12,-25 0,-36 C 12,-25 9,-10 0,0 Z" 
                    fill="url(#leaf-grad-accent)" stroke="#0b3810" stroke-width="0.8"/>
              <path d="M 0,-2 L 0,-32 M 0,-10 L -5,-16 M 0,-10 L 5,-16 M 0,-20 L -4,-24 M 0,-20 L 4,-24" 
                    fill="none" stroke="#bef264" stroke-width="0.6" stroke-linecap="round" opacity="0.8"/>
            </g>

            <!-- Curling Spiraling Grapevine Tendril (Right) -->
            <g id="curly-tendril">
              <path d="M 0,0 C 12,-10 22,-6 18,-20 C 14,-32 0,-28 -2,-18 C -4,-9 8,-8 6,-14 C 5,-17 1,-16 2,-13" 
                    fill="none" stroke="#4ade80" stroke-width="1.8" stroke-linecap="round"/>
            </g>

            <!-- Curling Spiraling Grapevine Tendril (Left) -->
            <g id="curly-tendril-left">
              <path d="M 0,0 C -12,-10 -22,-6 -18,-20 C -14,-32 0,-28 2,-18 C 4,-9 -8,-8 -6,-14 C -5,-17 -1,-16 -2,-13" 
                    fill="none" stroke="#4ade80" stroke-width="1.8" stroke-linecap="round"/>
            </g>

            <!-- Swelling Vine Node / Bark Joint -->
            <g id="vine-node">
              <circle cx="0" cy="0" r="3.2" fill="#09280d" stroke="#22c55e" stroke-width="0.8"/>
            </g>

            <!-- Flower Bud -->
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
      </svg>
    `,
    styles: `
      /* OVERRIDES FOR VERDANT THEME */
      .theme-verdant .ring-blood {
        border-radius: 50% !important; animation: rotateCcw 15s linear infinite !important;
        box-shadow: 0 0 15px currentColor, inset 0 0 10px currentColor !important;
      }

      /* VERDANT VINES ANIMATIONS */
      .verdant-vines-container { position: absolute; width: 100%; height: 100%; z-index: 5; pointer-events: none; }
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
        100% { opacity: 1; transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 10px rgba(255,255,255,0.8)); }
      }

      .big-core-flower { opacity: 0; animation: bloomBigCore 3.5s ease-in-out 0.3s forwards; transform-origin: 50px 50px; }
      @keyframes bloomBigCore {
        0% { opacity: 0; transform: scale(0) rotate(-90deg); }
        60% { opacity: 1; transform: scale(4.5) rotate(10deg); filter: drop-shadow(0 0 5px rgba(255,255,255,0.4)); }
        100% { opacity: 1; transform: scale(4) rotate(0deg); filter: drop-shadow(0 0 20px rgba(255,255,255,1)); }
      }
    `,
    playIntro(engine, now) {
      if (!engine.ctx || !engine.enabled) return;

      // 1. Harmonic Nature Drone (Pentatonic chord pad)
      [220, 277.18, 329.63, 440].forEach((freq) => {
        const osc = engine.ctx.createOscillator();
        const gain = engine.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.045, now + 0.9);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

        osc.connect(gain);
        gain.connect(engine.masterGain);
        osc.start(now);
        osc.stop(now + 4);
        engine.activeNodes.push(osc);
      });

      // 2. Cascading Crystal Chimes (Vines sprouting into bloom)
      const chimes = [659.25, 830.61, 987.77, 1174.66, 1318.51, 1661.22];
      chimes.forEach((f, i) => {
        const chimeOsc = engine.ctx.createOscillator();
        const chimeGain = engine.ctx.createGain();
        chimeOsc.type = 'sine';
        const startTime = now + 0.35 + (i * 0.45);

        chimeOsc.frequency.setValueAtTime(f, startTime);
        chimeGain.gain.setValueAtTime(0.07, startTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.75);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(engine.masterGain);
        chimeOsc.start(startTime);
        chimeOsc.stop(startTime + 0.8);
        engine.activeNodes.push(chimeOsc);
      });
    },
    playSeal(engine, now) {
      if (!engine.ctx || !engine.enabled) return;

      // Warm blooming major resolution chord
      [329.63, 415.30, 493.88, 659.25, 987.77].forEach((freq) => {
        const chord = engine.ctx.createOscillator();
        const gain = engine.ctx.createGain();
        chord.type = 'triangle';
        chord.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        chord.connect(gain);
        gain.connect(engine.masterGain);
        chord.start(now);
        chord.stop(now + 2.3);
        engine.activeNodes.push(chord);
      });
    },
    initParticle(p) {},
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

      // Bioluminescent floating pollen / fireflies
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(130, 255, 160, ${p.alpha})`;
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 10;
      ctx.fill();
    }
  };
})();

