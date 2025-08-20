declare const browser: any;
/** Configuration for specific websites */
export interface SiteConfig {
  hostname: string;
  title: string;
  enabled: boolean; // on/off
  actions: string[]; // for generics; workflow to unlock site
  ts: string; // typescript-source file, but irrelevant for compiled webpack
}

/** Browser specific settings */
// https://medium.com/@jonbiro/browser-engines-chromium-v8-blink-gecko-webkit-98d6b0490968
export interface BrowserConfig {
  type: "firefox" | "chromium" | "webkit" |"unknown"; // TODO: handle/double-check webkit option
  description: string;
}

/** Theme */
export interface ThemeConfig {
  value: "light" | "dark" | "system";
  options: string[];
}

/** Config for the extension itself */
export interface ExtensionConfig {
  version: string; // read from manifest/config.jsonc
  notifications: {
    enabled: boolean; // TODO: handle sending notifications to user & triggers
  };
  theme: ThemeConfig; // TODO: implement dark-mode/light-mode
  debugMode: {
    enabled: boolean; // TODO: implement debug mode
  };
  sites: {
    [key: string]: SiteConfig; // TODO: handle site-on/site-off setting and popup functionality
  };
  browsers: {
    [key: string]: BrowserConfig; // TODO: specify firefox/chromium/unknown (incl. webkit) differences
  };
}

// Our default configuration
const defaultConfig: ExtensionConfig = {
  version: (typeof chrome !== 'undefined' && chrome.runtime?.getManifest ? chrome.runtime.getManifest().version :
            typeof browser !== 'undefined' && browser.runtime?.getManifest ? browser.runtime.getManifest().version :
            "0.0.0"),
  notifications: {
    enabled: true,
  },
  theme: {
    value: "system",
    options: ["light", "dark", "system"], // if system, use OS theme
  },
  debugMode: {
    enabled: false,
  },
  sites: {
    nation: {
      hostname: "nation.africa",
      title: "Nation Africa",
      actions: [],
      ts: "src/content/website/nation.ts",
      enabled: true,
    },
    eastafrican: {
      hostname: "www.theeastafrican.co.ke",
      title: "The East African",
      actions: [],
      ts: "src/content/website/eastafrican.ts",
      enabled: true,
    },
    businessdaily: {
      hostname: "www.businessdailyafrica.com",
      title: "Business Daily Africa",
      actions: [],
      ts: "src/content/website/businessdaily.ts",
      enabled: true,
    },
    monitor: {
      hostname: "www.monitor.co.ug",
      title: "Daily Monitor",
      actions: [],
      ts: "src/content/website/monitor.ts",
      enabled: true,
    },
    thestandard: {
      hostname: "www.standardmedia.co.ke",
      title: "The Standard",
      actions: [],
      ts: "src/content/website/thestandard.ts",
      enabled: true,
    },
    mwananchi: {
      hostname: "www.mwananchi.co.tz",
      title: "Mwananchi",
      actions: [],
      ts: "src/content/website/mwananchi.ts",
      enabled: true,
    },
    newvision: {
      hostname: "www.newvision.co.ug",
      title: "New Vision",
      actions: [],
      ts: "src/content/website/newvision.ts",
      enabled: true,
    },
    thecitizen: {
      hostname: "www.thecitizen.co.tz",
      title: "The Citizen",
      actions: [],
      ts: "src/content/website/thecitizen.ts",
      enabled: true,
    },
    mwanaspoti: {
      hostname: "www.mwanaspoti.co.tz",
      title: "Mwanaspoti",
      actions: [],
      ts: "src/content/website/mwanaspoti.ts",
      enabled: true,
    },
  },
  browsers: {
    firefox: {
      type: "firefox",
      description: "Mozilla Firefox",
    },
    chrome: {
      type: "chromium",
      description: "Google Chrome",
    },
    edge: {
      type: "chromium",
      description: "Microsoft Edge",
    },
    opera: {
      type: "chromium",
      description: "Opera Browser",
    },
    unknown: {
      type: "unknown",
      description: "Unknown Browser Type",
    },
  },
};

// Configuration management class
export class ConfigManager {
  /** ConfigManager class is a Singleton class;
   * Static property declaration within this class to hold a single instance; 
   * Singleton pattern ensures only one instance of the class is created and
   * provides a single point of access to it for any other code.
  */
  private static instance: ConfigManager; // Singleton instance
  /** Extension configuration instance */
  private config: ExtensionConfig; // instance of extension configuration
  /** storageKey is a constant property of of this class that cant be changed once initialised (readonly) */
  private readonly storageKey = "extensionConfig";

  private constructor() { this.config = defaultConfig; } // singular instance of extension configuration; part of Singleton pattern

  /** Key component of Singleton pattern; 
   * ensures only one instance of the class is created and provides a single point
   *  of access to it for any other code */
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  /** Site configuration management */
  public getSite(hostname: string): SiteConfig | undefined {
    const normalize = (h: string) => h.replace(/^www\./, "").toLowerCase();
    const target = normalize(hostname);
    return Object.values(this.config.sites).find((s) => normalize(s.hostname) === target);
  }

  public async updateSite(
    hostname: string,
    updates: Partial<SiteConfig>
  ): Promise<void> {
    const siteKey = Object.entries(this.config.sites).find(
      ([_, site]) => site.hostname === hostname
    )?.[0];

    if (siteKey) {
      this.config.sites[siteKey] = {
        ...this.config.sites[siteKey],
        ...updates,
      };
      await this.saveConfig();
    }
  }

  // Unified settings management
  public async updateSettings(
    updates: Partial<ExtensionConfig>
  ): Promise<void> {
    this.config = {
      ...this.config,
      ...updates,
    };
    await this.saveConfig();
  }

  // Simplified storage operations
  public async loadConfig(): Promise<void> {
    return new Promise((resolve, reject) => {
      const storageAPI = typeof chrome !== 'undefined' ? chrome.storage : (typeof browser !== 'undefined' ? browser.storage : undefined);
      if (!storageAPI) { resolve(); return; }
      
      storageAPI.sync.get(this.storageKey, (data: { [x: string]: ExtensionConfig; }) => {
        if ((typeof chrome !== 'undefined' ? chrome.runtime : browser.runtime).lastError) {
          reject(new Error('Failed to load configuration'));
          return;
        }
        
        if (data[this.storageKey]) {
          this.config = { ...defaultConfig, ...data[this.storageKey] };
        }
        resolve();
      });
    });
  }

  public async saveConfig(): Promise<void> {
    return new Promise((resolve, reject) => {
      const storageAPI = typeof chrome !== 'undefined' ? chrome.storage : (typeof browser !== 'undefined' ? browser.storage : undefined);
      if (!storageAPI) { resolve(); return; }
      
      const { version: _ignoredVersion, ...configToPersist } = this.config as ExtensionConfig;
      storageAPI.sync.set({ [this.storageKey]: configToPersist }, () => {
        if ((typeof chrome !== 'undefined' ? chrome.runtime : browser.runtime).lastError) {
          reject(new Error('Failed to save configuration'));
          return;
        }
        resolve();
      });
    });
  }

  public getConfig(): ExtensionConfig {
    return this.config;
  }

  public async resetToDefaults(): Promise<void> {
    this.config = { ...defaultConfig };
    await this.saveConfig();
  }
}

// Export a singleton instance
export const configManager = ConfigManager.getInstance();
