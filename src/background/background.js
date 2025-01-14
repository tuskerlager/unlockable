// Listen for extension installation or update
chrome.runtime.onInstalled.addListener(() => {
  console.log("Paywaller installed!");

  // Create main context menu item
  chrome.contextMenus.create({
    id: "paywallerMain",
    title: "Paywaller",
    contexts: ["all"]
  });

  // Create sub-menu items
  chrome.contextMenus.create({
    id: "unlockArticle",
    parentId: "paywallerMain",
    title: "🔓 Unlock Article",
    contexts: ["all"]
  });

  // chrome.contextMenus.create({
  //   id: "removeAds",
  //   parentId: "paywallerMain",
  //   title: "🚫 Remove Ads",
  //   contexts: ["all"]
  // });

  chrome.contextMenus.create({
    id: "clearCache",
    parentId: "paywallerMain",
    title: "🧹 Clear Site Cache",
    contexts: ["all"]
  });

  // Add separator
  chrome.contextMenus.create({
    id: "separator",
    parentId: "paywallerMain",
    type: "separator",
    contexts: ["all"]
  });

  // Add info item
  chrome.contextMenus.create({
    id: "info",
    parentId: "paywallerMain",
    title: "ℹ️ About Paywaller",
    contexts: ["all"]
  });
});

// Function to run ./content.js
function executeContentScript(tabId) {
  chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['./content.js']
  }).then(() => {
      console.log("📰 Paywaller: script executed successfully");
  }).catch((err) => {
      console.error("📰 Paywaller: Failed to execute content script:", err);
  });
}
// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab?.id) return; // No tab found, exit

  switch (info.menuItemId) {
    case "unlockArticle":
      console.log("📰 Paywaller: Unlock Article clicked");
      // alert("Attempting to unlock article...");
      executeContentScript(tab.id);
      break;

    // case "removeAds":
    //   console.log("📰 Paywaller: Remove Ads clicked");
    //   alert("Removing advertisements...");
    //   break;

    case "clearCache":
      console.log("📰 Paywaller: Clear Cache clicked");
      chrome.browsingData.remove({
        "origins": [tab.url]
      }, {
        "cacheStorage": true,
        "cookies": true,
        "localStorage": true
      }, () => {
        chrome.tabs.reload(tab.id);
      });
      break;

    case "info":
      console.log("📰 Paywaller: Info clicked");
      // alert("Paywaller v1.0.0\nCreated to help bypass article paywalls");
      // break;
      chrome.windows.create({
        url: chrome.runtime.getURL("./popup/about.html"),
        type: "popup",
        width: 400,
        height: 500
      });
      break;
  }
});

// Listen for extension icon click
chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked");
  alert("Paywaller activated!");
  // executeContentScript(tab.id); // TODO: See if I want this...
});

// Listen for messages (just logging)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);
});