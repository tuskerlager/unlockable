export {};
// Firefox-specific background (MV2)
declare const browser: any;
type OnClickData = any;
type Tab = { id?: number; url?: string };

// Listen for extension installation or update
browser.runtime.onInstalled.addListener((): void => {
  console.log("Unlockable installed!");

  // Create main context menu item
  browser.menus.create({
    id: "unlockableMains",
    title: "Unlockable",
    contexts: ["all"],
  });

  // Sub-menus
  browser.menus.create({ id: "unlockArticle", parentId: "unlockableMains", title: "🔓 Unlock Article", contexts: ["all"] });
  browser.menus.create({ id: "clearCache", parentId: "unlockableMains", title: "🧹 Clear Site Cache", contexts: ["all"] });
  browser.menus.create({ id: "separator", parentId: "unlockableMains", type: "separator", contexts: ["all"] });
  browser.menus.create({ id: "info", parentId: "unlockableMains", title: "ℹ️ About Unlockable", contexts: ["all"] });
});

async function executeContentScript(tabId: number): Promise<void> {
  try {
    await browser.tabs.executeScript(tabId, { file: "content.js" });
    console.log("Unlockable: script executed successfully");
  } catch (err) {
    console.error("Unlockable: Failed to execute content script:", err);
  }
}

browser.menus.onClicked.addListener(
  async (info: OnClickData, tab: Tab | undefined): Promise<void> => {
    if (!tab?.id) return;

    switch (info.menuItemId) {
      case "unlockArticle":
        console.log("Unlockable: Unlock Article clicked");
        await executeContentScript(tab.id);
        break;
      case "clearCache":
        console.log("Unlockable: Clear Cache clicked");
        await browser.browsingData.remove(
          { hostnames: tab.url ? [new URL(tab.url).hostname] : [] },
          { cache: true, cookies: true, localStorage: true }
        );
        if (tab.id) await browser.tabs.reload(tab.id);
        break;
      case "info":
        console.log("Unlockable: Info clicked");
        await browser.tabs.create({ url: browser.runtime.getURL("about.html") });
        break;
    }
  }
);

browser.browserAction.onClicked.addListener(async (tab: Tab): Promise<void> => {
  if (!tab.id) return;
  await executeContentScript(tab.id);
});

browser.runtime.onMessage.addListener((message: any): void => {
  console.log("Message received:", message);
});

