// config.ts

// Define our core configuration types
export interface SiteConfig {
  hostname: string;
  title: string;
  enabled: boolean;
  actions: string[];
  ts: string;
}

export interface BrowserConfig {
  type: "firefox" | "chromium" | "unknown";
  description: string;
}

export interface ThemeConfig {
  value: "light" | "dark" | "system";
  options: string[];
}

export interface ExtensionConfig {
  version: string;
  notifications: {
    enabled: boolean;
  };
  theme: ThemeConfig;
  debugMode: {
    enabled: boolean;
  };
  sites: {
    [key: string]: SiteConfig;
  };
  browsers: {
    [key: string]: BrowserConfig;
  };
}

// Our default configuration
const defaultConfig: ExtensionConfig = {
  version: "0.0.2",
  notifications: {
    enabled: true,
  },
  theme: {
    value: "system",
    options: ["light", "dark", "system"],
  },
  debugMode: {
    enabled: false,
  },
  sites: {
    nation: {
      hostname: "nation.africa",
      title: "Nation Africa",
      enabled: true,
      actions: [],
      ts: "src/content/website/nation.ts",
    },
    eastafrican: {
      hostname: "www.theeastafrican.co.ke",
      title: "The East African",
      enabled: true,
      actions: [],
      ts: "src/content/website/eastafrican.ts",
    },
    // ... other sites following the same pattern
  },
  browsers: {
    firefox: {
      type: "firefox",
      description: "Mozilla Firefox Browser",
    },
    chrome: {
      type: "chromium",
      description: "Google Chrome Browser",
    },
    edge: {
      type: "chromium",
      description: "Microsoft Edge Browser",
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
  private static instance: ConfigManager;
  private config: ExtensionConfig;

  private constructor() {
    this.config = defaultConfig;
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  // Load saved configuration from storage
  public async loadConfig(): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.get("extensionConfig", (data) => {
        if (data.extensionConfig) {
          this.config = { ...this.config, ...data.extensionConfig };
        }
        resolve();
      });
    });
  }

  // Save current configuration to storage
  public async saveConfig(): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ extensionConfig: this.config }, resolve);
    });
  }

  // Check if a site is enabled
  public isSiteEnabled(hostname: string): boolean {
    const site = Object.values(this.config.sites).find(
      (s) => s.hostname === hostname
    );
    return site?.enabled ?? false;
  }

  // Toggle site status
  public async toggleSite(hostname: string, enabled: boolean): Promise<void> {
    const siteKey = Object.entries(this.config.sites).find(
      ([_, site]) => site.hostname === hostname
    )?.[0];
    if (siteKey && this.config.sites[siteKey]) {
      this.config.sites[siteKey].enabled = enabled;
      await this.saveConfig();
    }
  }

  // Get current theme
  public getTheme(): string {
    return this.config.theme.value;
  }

  // Check if notifications are enabled
  public areNotificationsEnabled(): boolean {
    return this.config.notifications.enabled;
  }

  // Check if debug mode is enabled
  public isDebugEnabled(): boolean {
    return this.config.debugMode.enabled;
  }

  // Get browser type
  public getBrowserType(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("firefox")) return "firefox";
    if (userAgent.includes("edge")) return "edge";
    if (userAgent.includes("chrome")) return "chrome";
    if (userAgent.includes("opera")) return "opera";
    return "unknown";
  }
}

// Export a singleton instance
export const configManager = ConfigManager.getInstance();
