// Load sites and render options
function loadSites() {
  // Define an interface for our site structure
  interface Site {
    hostname: string;
    enabled: boolean;
  }

  interface Sites {
    [key: string]: Site;
  }

  // Our sites configuration with proper typing
  const sites: Sites = {
    nation: { hostname: "nation.africa", enabled: true },
    eastafrican: { hostname: "www.theeastafrican.co.ke", enabled: true },
    businessdaily: { hostname: "www.businessdailyafrica.com", enabled: true },
    citizen: { hostname: "www.thecitizen.co.tz", enabled: true },
    monitor: { hostname: "www.monitor.co.ug", enabled: true },
    mwananchi: { hostname: "www.mwananchi.co.tz", enabled: true },
    mwanaspoti: { hostname: "www.mwanaspoti.co.tz", enabled: true },
    newvision: { hostname: "www.newvision.co.ug", enabled: true },
  };

  const siteList = document.getElementById("site-list");
  if (!siteList) return;

  siteList.innerHTML = "";

  // Create site items with proper typing
  Object.entries(sites).forEach(([key, site]) => {
    const siteItem = document.createElement("div");
    siteItem.className = "site-item";
    siteItem.innerHTML = `
      <label>
        <input type="checkbox" id="${key}" ${site.enabled ? "checked" : ""} />
        ${site.hostname}
      </label>
    `;
    siteList.appendChild(siteItem);
  });
}

// Save changes with proper type checking
function saveChanges() {
  // Use type assertion with querySelectorAll
  const siteCheckboxes = document.querySelectorAll<HTMLInputElement>(
    "#site-list input[type='checkbox']"
  );

  const siteSettings: Record<string, boolean> = {};

  siteCheckboxes.forEach((checkbox) => {
    siteSettings[checkbox.id] = checkbox.checked;
  });

  chrome.storage.sync.set({ siteSettings }, () => {
    const status = document.getElementById("status");
    if (status) {
      status.style.display = "block";
      setTimeout(() => {
        status.style.display = "none";
      }, 2000);
    }
  });
}

// Load saved settings with proper type checking
function loadSavedSettings() {
  chrome.storage.sync.get("siteSettings", (data) => {
    const siteSettings = data.siteSettings || {};
    Object.entries(siteSettings).forEach(([key, enabled]) => {
      const checkbox = document.getElementById(key) as HTMLInputElement | null;
      if (checkbox) {
        checkbox.checked = enabled as boolean;
      }
    });
  });
}

// Initialize with proper event handling
document.addEventListener("DOMContentLoaded", () => {
  loadSites();
  loadSavedSettings();

  const saveButton = document.getElementById("save-button");
  if (saveButton) {
    saveButton.addEventListener("click", saveChanges);
  }
});
