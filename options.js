// Saves options to chrome.storage
function saveOptions() {
  const theme = document.getElementById('theme').value;
  chrome.storage.local.set({ chosenTheme: theme }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.style.opacity = 1;
    setTimeout(() => {
      status.style.opacity = 0;
    }, 2000);
  });
}

// Restores select box state using the preferences stored in chrome.storage
function restoreOptions() {
  chrome.storage.local.get(['chosenTheme'], (result) => {
    document.getElementById('theme').value = result.chosenTheme || 'blood';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);