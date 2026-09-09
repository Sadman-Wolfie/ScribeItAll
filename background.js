async function injectAndRun(tabId) {
  if (!tabId) return;

  try {
    // Inject the libraries and content script into the active tab
    await chrome.scripting.executeScript({
      target: { tabId },
      files: [
        "libs/readability.js",
        "libs/turndown.js",
        "libs/turndown-plugin-gfm.js",
        "themes/blood.js",
        "themes/verdant.js",
        "themes/cyber.js",
        "content.js"
      ]
    });
  } catch (error) {
    console.warn("ScribeItAll could not inject script into tab:", error);
  }
}

chrome.action.onClicked.addListener((tab) => {
  if (tab && tab.id) {
    injectAndRun(tab.id);
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "transmute_page") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id) {
      injectAndRun(tab.id);
    }
  }
});

// Listen for the complete ritual message to trigger the download
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    const dataUrl = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(request.markdown);
    
    chrome.downloads.download({
      url: dataUrl,
      filename: request.filename,
      saveAs: false
    }).catch((err) => {
      console.error("ScribeItAll: Download failed:", err);
    });
  }
});
