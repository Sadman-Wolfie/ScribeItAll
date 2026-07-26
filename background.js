chrome.action.onClicked.addListener((tab) => {
  // Inject the libraries and the content script into the active tab
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: [
      "libs/readability.js",
      "libs/turndown.js",
      "libs/turndown-plugin-gfm.js", // The new table plugin goes exactly here
      "content.js"
    ]
  });
});

// Listen for the complete ritual message to trigger the download
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    const blob = new Blob([request.markdown], { type: "text/markdown" });
    const reader = new FileReader();
    
    reader.onload = function() {
      chrome.downloads.download({
        url: reader.result,
        filename: request.filename,
        saveAs: false 
      });
    };
    
    reader.readAsDataURL(blob);
  }
});