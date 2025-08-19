import { configManager, ExtensionConfig } from "../config/config";

class OptionsManager {
  public async initializeUI() {
    await configManager.loadConfig();
    const config = configManager.getConfig();
    
    this.renderSiteList(config);
    this.renderSettings(config);
    this.setupEventListeners();

    this.renderBrowserInfo();
  }

  private renderSiteList(config: ExtensionConfig) {
    const siteList = document.getElementById("site-list");
    if (!siteList) return;

    siteList.innerHTML = Object.entries(config.sites)
      .map(([key, site]) => `
        <div class="site-item">
          <label>
            <input type="checkbox" 
                   data-site="${site.hostname}" 
                   ${site.enabled ? "checked" : ""} />
            ${site.title} (${site.hostname})
          </label>
        </div>
      `).join('');
  }

  private renderSettings(config: ExtensionConfig) {
    const elements = {
      notifications: document.getElementById("notifications-enabled") as HTMLInputElement,
      debugMode: document.getElementById("debug-mode") as HTMLInputElement,
      theme: document.getElementById("theme-select") as HTMLSelectElement
    };

    if (elements.notifications) {
      elements.notifications.checked = config.notifications.enabled;
    }
    if (elements.debugMode) {
      elements.debugMode.checked = config.debugMode.enabled;
    }
    if (elements.theme) {
      elements.theme.value = config.theme.value;
    }
  }

  private setupEventListeners() {
    document.getElementById("save-button")?.addEventListener("click", async () => {
      const updates = this.gatherFormData();
      await configManager.updateSettings(updates);
      this.showSaveStatus();
    });

    document.getElementById("reset-button")?.addEventListener("click", async () => {
      await configManager.resetToDefaults();
      await this.initializeUI();
    });

    // Delegate site toggles
    document.getElementById("site-list")?.addEventListener("change", async (e) => {
      const checkbox = e.target as HTMLInputElement;
      const hostname = checkbox.dataset.site;
      if (hostname) {
        await configManager.updateSite(hostname, { enabled: checkbox.checked });
      }
    });
  }

  private gatherFormData() {
    return {
      notifications: {
        enabled: (document.getElementById("notifications-enabled") as HTMLInputElement)?.checked
      },
      debugMode: {
        enabled: (document.getElementById("debug-mode") as HTMLInputElement)?.checked
      },
      theme: {
        value: (document.getElementById("theme-select") as HTMLSelectElement)?.value as "light" | "dark" | "system",
        options: ["light", "dark", "system"]
      }
    };
  }

  private showSaveStatus() {
    const status = document.getElementById("status");
    if (status) {
      status.style.display = "block";
      setTimeout(() => status.style.display = "none", 2000);
    }
  }

  private renderBrowserInfo() {
    const browserType = document.getElementById("browser-type");
    const versionEl = document.getElementById("extension-version");
    if (browserType) {
      const ua = navigator.userAgent.toLowerCase();
      let name = "Unknown";
      if (ua.includes('firefox')) name = 'Firefox';
      else if (ua.includes('edg/')) name = 'Edge';
      else if (ua.includes('chrome') && !ua.includes('edg/')) name = 'Chrome';
      else if (ua.includes('safari') && !ua.includes('chrome')) name = 'Safari';
      else if (ua.includes('opr/') || ua.includes('opera')) name = 'Opera';
      browserType.textContent = name;
    }
    if (versionEl) {
      const runtime = (typeof chrome !== 'undefined' ? chrome.runtime : (window as any).browser.runtime);
      versionEl.textContent = runtime.getManifest().version;
    }
  }
}

// Initialize options page
document.addEventListener("DOMContentLoaded", () => {
  new OptionsManager().initializeUI();
});