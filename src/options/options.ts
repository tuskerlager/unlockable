import { configManager, type ExtensionConfig } from "../config/config";

async function loadSettings() {
  await configManager.loadConfig();
  const config: ExtensionConfig = configManager.getConfig();

  // Load sites
  const siteList: HTMLElement | null = document.getElementById("site-list");
  if (siteList) {
    siteList.innerHTML = "";

    Object.entries(config.sites).forEach(([key, site]) => {
      const siteItem: HTMLDivElement = document.createElement("div");
      siteItem.className = "site-item";
      siteItem.innerHTML = `
        <label>
          <input type="checkbox" id="site-${key}" ${
        site.enabled ? "checked" : ""
      } />
          ${site.title} (${site.hostname})
        </label>
      `;
      siteList.appendChild(siteItem);
    });
  }

  // -- Load other settings
  const notificationsCheckbox = document.getElementById("notifications-enabled") as HTMLInputElement; // prettier-ignore
  const debugModeCheckbox = document.getElementById("debug-mode") as HTMLInputElement; // prettier-ignore
  const themeSelect = document.getElementById("theme-select") as HTMLSelectElement; // prettier-ignore

  if (notificationsCheckbox) { notificationsCheckbox.checked = config.notifications.enabled; } // prettier-ignore
  if (debugModeCheckbox) { debugModeCheckbox.checked = config.debugMode.enabled; } // prettier-ignore
  if (themeSelect) { themeSelect.value = config.theme.value; } // prettier-ignore
}

async function saveChanges() {
  const config = configManager.getConfig();

  // Save sites
  Object.keys(config.sites).forEach((key) => {
    const checkbox = document.getElementById(`site-${key}`) as HTMLInputElement;
    if (checkbox) {
      config.sites[key].enabled = checkbox.checked;
    }
  });

  // Save other settings
  const notificationsCheckbox = document.getElementById("notifications-enabled") as HTMLInputElement; // prettier-ignore
  const debugModeCheckbox = document.getElementById("debug-mode") as HTMLInputElement; // prettier-ignore
  const themeSelect = document.getElementById("theme-select") as HTMLSelectElement; // prettier-ignore

  if (notificationsCheckbox) { config.notifications.enabled = notificationsCheckbox.checked; } // prettier-ignore
  if (debugModeCheckbox) { config.debugMode.enabled = debugModeCheckbox.checked; } // prettier-ignore
  if (themeSelect) { config.theme.value = themeSelect.value as "light" | "dark" | "system"; } // prettier-ignore

  await configManager.saveConfig();

  // Show status
  const status = document.getElementById("status");
  if (status) {
    status.style.display = "block";
    setTimeout(() => {
      status.style.display = "none";
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadSettings();

  const saveButton = document.getElementById("save-button");
  if (saveButton) {
    saveButton.addEventListener("click", saveChanges);
  }
});
