// Listen for clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {
  // Inject the libraries and our extraction script into the current tab
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: [
      "libs/Readability.js", 
      "libs/turndown.js", 
      "content.js"
    ]
  });
});

// Listen for the markdown payload from the content script and download it
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    // Convert markdown string to a data URI
    const dataUrl = "data:text/markdown;charset=utf-8," + encodeURIComponent(request.markdown);
    
    chrome.downloads.download({
      url: dataUrl,
      filename: request.filename,
      saveAs: true // Prompts the user where to save the file
    });
  }
});