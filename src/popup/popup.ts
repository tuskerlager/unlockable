import { configManager, type SiteConfig } from "../config/config";
import type { Tab } from "../content/types";
import "./popup.css";

declare const __BUILD_DATE__: string;

document.addEventListener("DOMContentLoaded", () => {
  const setVersion = () => {
    try {
      const version = (typeof chrome !== 'undefined' ? chrome.runtime.getManifest().version :
                      (typeof browser !== 'undefined' ? browser.runtime.getManifest().version : undefined));
      const el = document.getElementById("popup-version");
      if (el && version) { el.textContent = `v${version}`; }
    } catch {}
  };
  setVersion();

  // Optionally attach build date somewhere in popup if needed in future
  // Add click handlers for all three action buttons

  // --- 🔓 Unlocking Premium Articles
  const unlockArticleButton: HTMLElement | null =
    document.getElementById("unlock-article");
  unlockArticleButton?.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: Tab[]) => {
      const tabId: number | undefined = tabs[0]?.id;
      if (tabId !== undefined) {
        chrome.scripting
          .executeScript({
            target: { tabId },
            files: ["./content.js"],
          })
          .then(() => {
            console.log("Unlockable: ✅");
          })
          .catch((err: Error) => {
            console.error("Unlockable: ❌:", err);
          });
      }
    });
  });

  // --- 🧹 Clearing Cache
  const clearCacheButton = document.getElementById("clear-cache");
  clearCacheButton?.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: Tab[]) => {
      const tab = tabs[0];
      if (!tab?.id || !tab.url) return;
      const origin = new URL(tab.url).origin;
      chrome.browsingData.remove({ origins: [origin] }, {
        cacheStorage: true,
        cookies: true,
        localStorage: true,
      }, () => {
        chrome.tabs.reload(tab.id!);
      });
    });
  });

  // --- 🚫 Removing Ads (Commented out for now)
  // const removeAdsButton = document.getElementById("action2");
  // removeAdsButton?.addEventListener("click", () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, () => {
  //     console.log("Remove Ads clicked");
  //     alert("Removing advertisements...");
  //   });
  // });

  // --- 🛠 Check Status (Commented out for now)
  // const checkStatusButton = document.getElementById("check-status");
  // checkStatusButton?.addEventListener("click", () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, () => {
  //     console.log("Unlockable: Check Status clicked");
  //     alert("Status: All systems operational");
  //   });
  // });
});
