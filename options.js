// Saves options to chrome.storage
async function saveOptions() {
  const theme = document.getElementById('theme').value;
  const speed = document.getElementById('speed').value;
  const sound = document.getElementById('sound').checked;

  await chrome.storage.local.set({
    chosenTheme: theme,
    ritualSpeed: speed,
    soundEnabled: sound
  });

  // Update status to let user know options were saved.
  const status = document.getElementById('status');
  status.style.opacity = '1';
  setTimeout(() => {
    status.style.opacity = '0';
  }, 2200);
}

// Restores form state using the preferences stored in chrome.storage
async function restoreOptions() {
  const result = await chrome.storage.local.get({
    chosenTheme: 'blood',
    ritualSpeed: 'grand',
    soundEnabled: true
  });

  document.getElementById('theme').value = result.chosenTheme;
  document.getElementById('speed').value = result.ritualSpeed;
  document.getElementById('sound').checked = result.soundEnabled;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
