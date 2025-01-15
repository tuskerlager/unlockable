// Listen for extension installation or update
chrome.runtime.onInstalled.addListener((): void => {
  console.log("Unlockable installed!");

  // Create main context menu item
  chrome.contextMenus.create({
    id: "unlockableMains",
    title: "Unlockable",
    contexts: ["all"],
  });

  // Create sub-menu items
  chrome.contextMenus.create({
    id: "unlockArticle",
    parentId: "unlockableMains",
    title: "🔓 Unlock Article",
    contexts: ["all"],
  });

  // chrome.contextMenus.create({
  //   id: "removeAds",
  //   parentId: "unlockableMains",
  //   title: "🚫 Remove Ads",
  //   contexts: ["all"]
  // });

  chrome.contextMenus.create({
    id: "clearCache",
    parentId: "unlockableMains",
    title: "🧹 Clear Site Cache",
    contexts: ["all"],
  });

  // Add separator
  chrome.contextMenus.create({
    id: "separator",
    parentId: "unlockableMains",
    type: "separator",
    contexts: ["all"],
  });

  // Add info item
  chrome.contextMenus.create({
    id: "info",
    parentId: "unlockableMains",
    title: "ℹ️ About Unlockable",
    contexts: ["all"],
  });
});

// Function to run ./content.js
function executeContentScript(tabId: number): void {
  chrome.scripting
    .executeScript({
      target: { tabId: tabId },
      files: ["./content.ts"],
    })
    .then((): void => { console.log("Unlockable: script executed successfully"); })
    .catch((err: Error): void => { console.error("Unlockable: Failed to execute content script:", err); });
}
// Handle context menu clicks
type OnClickData = chrome.contextMenus.OnClickData;
type Tab = chrome.tabs.Tab;
chrome.contextMenus.onClicked.addListener(
  (info: OnClickData, tab: Tab | undefined): void => {
    if (!tab?.id) return; // No tab found, exit

    switch (info.menuItemId) {
      case "unlockArticle":
        console.log("Unlockable: Unlock Article clicked");
        // alert("Attempting to unlock article...");
        executeContentScript(tab.id);
        break;

      // case "removeAds":
      //   console.log("Unlockable: Remove Ads clicked");
      //   alert("Removing advertisements...");
      //   break;

      case "clearCache":
        console.log("Unlockable: Clear Cache clicked");
        chrome.browsingData.remove(
          {
            origins: tab.url ? [tab.url] : [],
          },
          {
            cacheStorage: true,
            cookies: true,
            localStorage: true,
          },
          () => {
            if (tab.id) {
              chrome.tabs.reload(tab.id);
            }
          }
        );
        break;

      case "info":
        console.log("Unlockable: Info clicked");
        chrome.tabs.create({
          url: chrome.runtime.getURL("./about.html"),
        });
        break;
    }
  }
);

// Listen for extension icon click
chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked");
  alert("Unlockable activated!");
  // executeContentScript(tab.id); // TODO: See if I want this...
});

// Listen for messages (just logging)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);
});
