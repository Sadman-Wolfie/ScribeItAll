if (typeof window.hasRun === 'undefined') {
  window.hasRun = true;

  const overlay = document.createElement('div');
  overlay.id = "dark-transmute-overlay";
  
  const style = document.createElement('style');
  style.textContent = `
    /* Pure black void with a faint crimson center */
    #dark-transmute-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #000000;
      background: radial-gradient(circle, rgba(15, 0, 0, 0.98) 0%, rgba(0, 0, 0, 1) 100%);
      z-index: 9999999;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      opacity: 0;
      transition: opacity 0.8s ease-out;
      pointer-events: auto;
    }

    #dark-transmute-overlay.active {
      opacity: 1;
    }

    /* Massive, looming container */
    .dark-circle-container {
      position: relative;
      width: 600px;
      height: 600px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dark-ring {
      position: absolute;
      border-radius: 50%;
      box-shadow: 0 0 15px currentColor, inset 0 0 10px currentColor;
    }

    /* Ring 1: The Outer Void Boundary */
    .ring-void {
      width: 100%;
      height: 100%;
      color: rgba(40, 0, 0, 0.6);
      border: 1px solid currentColor;
      animation: rotateCw 40s linear infinite;
    }

    /* Ring 2: Outer Runes */
    .ring-runes-outer {
      position: absolute;
      width: 85%;
      height: 85%;
      animation: rotateCcw 30s linear infinite;
    }

    /* Ring 3: Jagged Thorns (Scarlet Dashes) */
    .ring-thorns {
      width: 70%;
      height: 70%;
      color: rgba(139, 0, 0, 0.5); 
      border: 2px dashed currentColor;
      animation: rotateCw 20s linear infinite;
    }

    /* Ring 4: Morphing Blood Liquid (Deep Crimson) */
    .ring-blood {
      width: 55%;
      height: 55%;
      color: rgba(80, 0, 0, 0.9);
      border: 4px solid currentColor;
      background: radial-gradient(circle, transparent 40%, rgba(30, 0, 0, 0.6) 70%, transparent 90%);
      animation: morphBlood 8s ease-in-out infinite, rotateCcw 15s linear infinite;
    }

    /* Ring 5: Inner Runes */
    .ring-runes-inner {
      position: absolute;
      width: 40%;
      height: 40%;
      animation: rotateCw 12s linear infinite;
    }

    /* Ring 6: Core Bind */
    .ring-core-bind {
      width: 25%;
      height: 25%;
      color: rgba(160, 0, 0, 0.4);
      border: 1px double currentColor;
      animation: rotateCcw 8s linear infinite;
    }

    .ring-runes-outer svg, .ring-runes-inner svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .ring-runes-outer text {
      font-family: monospace;
      font-size: 14px;
      fill: rgba(90, 0, 0, 0.7);
      letter-spacing: 8px;
    }

    .ring-runes-inner text {
      font-family: monospace;
      font-size: 10px;
      fill: rgba(139, 0, 0, 0.8);
      letter-spacing: 6px;
    }

    /* Core Sinister Sigil */
    .dark-core {
      position: absolute;
      width: 18%;
      height: 18%;
      color: rgba(150, 0, 0, 0.8);
      animation: corePulse 3s ease-in-out infinite alternate;
    }
    
    .dark-core svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 0 10px rgba(139, 0, 0, 0.5));
    }

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

    /* Sinister Breathing Text */
    .dark-status-text {
      margin-top: 60px;
      color: #5a0000;
      font-family: 'Courier New', Courier, monospace;
      font-size: 16px;
      letter-spacing: 12px;
      text-transform: uppercase;
      text-shadow: 0 0 10px rgba(90, 0, 0, 0.5);
      animation: breatheText 2s infinite alternate;
    }

    @keyframes breatheText {
      0% { opacity: 0.4; filter: blur(1px); }
      100% { opacity: 1; filter: blur(0px); }
    }

    /* Pitch Black Swallow effect upon completion */
    #dark-transmute-overlay.complete::after {
        content: '';
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: #000000;
        z-index: 10000000;
        animation: darknessSwallow 0.8s ease-in forwards;
    }

    @keyframes darknessSwallow {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Overlapping Pentacles Core Geometry
  const coreSigilSvg = `
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
    <!-- Outer Binding Circle -->
    <circle cx="50" cy="50" r="48" stroke-width="1" stroke-opacity="0.4" />
    
    <!-- Upright Pentagram -->
    <path d="M50 5 L63 40 L95 40 L70 60 L80 95 L50 75 L20 95 L30 60 L5 40 L37 40 Z" />
    
    <!-- Inverted Pentagram (Slightly more opaque to create depth) -->
    <path d="M50 95 L37 60 L5 60 L30 40 L20 5 L50 25 L80 5 L70 40 L95 60 L63 60 Z" stroke-width="1.2" stroke-opacity="0.7" />
    
    <!-- Inner Octagram for added geometric complexity -->
    <path d="M50 20 L71 29 L80 50 L71 71 L50 80 L29 71 L20 50 L29 29 Z" stroke-width="0.5" stroke-opacity="0.3" />
    
    <!-- Inner Core Focus Circle -->
    <circle cx="50" cy="50" r="20" stroke-width="0.5" stroke-opacity="0.5" />
  </svg>`;

  // Outer Runes
  const outerRunesSvg = `
  <svg viewBox="0 0 200 200">
    <path id="rune-path-outer" d="M 100, 100 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0" fill="none" />
    <text><textPath href="#rune-path-outer" startOffset="0%">
      ᛭ᚣᛡᛄᛥᛤᛣᛢᛡᛠᛟᛞᛝᛜᛛᛚᛙᛘᛗᛖᛕᛔᛓᛒᛑᛐᛏᛌᛋᛆᛅᛁᚿᚾᚽᚼᚴᚱᚬᚦᚢᚠ᛭
    </textPath></text>
  </svg>`;

  // Inner Runes (Reversed path direction)
  const innerRunesSvg = `
  <svg viewBox="0 0 200 200">
    <path id="rune-path-inner" d="M 100, 100 m -85, 0 a 85,85 0 1,0 170,0 a 85,85 0 1,0 -170,0" fill="none" />
    <text><textPath href="#rune-path-inner" startOffset="0%">
      ᚢᚠ᛭ᚣᛡᛄᛥᛤᛣᛢᛡᛠᛟᛞᛝᛜᛛᛚᛙ
    </textPath></text>
  </svg>`;

  overlay.innerHTML = `
    <div class="dark-circle-container">
      <div class="dark-ring ring-void"></div>
      <div class="ring-runes-outer">${outerRunesSvg}</div>
      <div class="dark-ring ring-thorns"></div>
      <div class="dark-ring ring-blood"></div>
      <div class="ring-runes-inner">${innerRunesSvg}</div>
      <div class="dark-ring ring-core-bind"></div>
      <div class="dark-core">${coreSigilSvg}</div>
    </div>
    <div class="dark-status-text">Extracting Essence...</div>
  `;
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);

  setTimeout(() => {
    try {
      const documentClone = document.cloneNode(true);
      const article = new Readability(documentClone).parse();

      if (article) {
        const turndownService = new TurndownService({
          headingStyle: 'atx',
          codeBlockStyle: 'fenced'
        });
        
        const date = new Date().toLocaleDateString();
        let markdown = `> 🩸 **THE BLOOD PACT ARCHIVE**\n`;
        markdown += `> *Siphoned on:* ${date}\n`;
        markdown += `> *Vessel Source:* [${window.location.hostname}](${window.location.href})\n`;
        markdown += `> *Classification:* Forbidden Text\n`;
        markdown += `---\n\n`;
        
        markdown += `# ${article.title}\n\n`;
        markdown += turndownService.turndown(article.content);

        const safeTitle = article.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const filename = `grimoire_${safeTitle || 'unknown'}.md`;

        const statusText = overlay.querySelector('.dark-status-text');
        statusText.innerText = "PACT SEALED";
        statusText.style.color = "#8b0000"; 
        statusText.style.textShadow = "0 0 20px #ff0000";

        overlay.classList.add('complete');

        // Wait for the darkness swallow animation to finish before downloading
        setTimeout(() => {
            chrome.runtime.sendMessage({
              action: "download",
              markdown: markdown,
              filename: filename
            });
        }, 800); 

      } else {
        alert("No life force detected on this page.");
        overlay.remove();
        window.hasRun = undefined;
        return; 
      }

      setTimeout(() => {
        overlay.classList.remove('active', 'complete');
        setTimeout(() => {
          overlay.remove();
          window.hasRun = undefined; 
        }, 800); 
      }, 1800); 

    } catch (error) {
      console.error("Ritual Interrupted:", error);
      const statusText = overlay.querySelector('.dark-status-text');
      statusText.innerText = "RITUAL FAILED (CHECK CONSOLE)";
      statusText.style.color = "#8b0000";
      
      setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => {
          overlay.remove();
          window.hasRun = undefined;
        }, 500);
      }, 3000);
    }

  }, 2000); 
}