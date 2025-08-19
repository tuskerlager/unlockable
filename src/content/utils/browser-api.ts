// src/utils/browser-api.ts - Unified browser API
type NotificationType = 'success' | 'error' | 'info';

export class BrowserAPI {
  public readonly isFirefox = typeof browser !== 'undefined';
  public readonly isChrome = typeof chrome !== 'undefined';

  private get api() {
    return this.isFirefox ? browser : chrome;
  }

  public async showNotification(message: string, type: NotificationType = 'success'): Promise<void> {
    const iconMap = { success: '✅', error: '❌', info: 'ℹ️' };

    try {
      await this.api.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon-48.png',
        title: `${iconMap[type]} Unlockable`,
        message
      });
    } catch (error) {
      console.log(`${iconMap[type]} ${message}`);
    }
  }

  public async executeScript(tabId: number, files: string[]): Promise<void> {
    if (this.isFirefox) {
      return browser.tabs.executeScript(tabId, { file: files[0] });
    } else {
      return chrome.scripting.executeScript({
        target: { tabId },
        files
      });
    }
  }

  public async getActiveTab(): Promise<any> {
    const tabs = await this.api.tabs.query({ active: true, currentWindow: true });
    return tabs[0];
  }

  public async clearSiteData(hostname: string, tabId?: number): Promise<void> {
    if (this.isFirefox) {
      await browser.browsingData.remove(
        { hostnames: [hostname] },
        { cache: true, cookies: true, localStorage: true }
      );
    } else {
      await chrome.browsingData.remove(
        { origins: [`https://${hostname}`, `http://${hostname}`] },
        { cacheStorage: true, cookies: true, localStorage: true }
      );
    }

    if (tabId) {
      await this.api.tabs.reload(tabId);
    }
  }

  public async createTab(url: string): Promise<void> {
    await this.api.tabs.create({ url });
  }

  public getExtensionURL(path: string): string {
    return this.api.runtime.getURL(path);
  }
}

export const browserAPI = new BrowserAPI();