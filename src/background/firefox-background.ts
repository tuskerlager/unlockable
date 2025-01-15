declare const browser: any;

// Listen for extension installation or update
browser.runtime.onInstalled.addListener(() => {
    console.log("Unlockable installed!");
  
    // Create main context menu item
    browser.contextMenus.create({
      id: "unlockableMains",
      title: "Unlockable",
      contexts: ["all"]
    });
  
    // Create sub-menu items
    browser.contextMenus.create({
      id: "unlockArticle",
      parentId: "unlockableMains",
      title: "🔓 Unlock Article",
      contexts: ["all"]
    });
  
    // browser.contextMenus.create({
    //   id: "removeAds",
    //   parentId: "unlockableMains",
    //   title: "🚫 Remove Ads",
    //   contexts: ["all"]
    // });
  
    browser.contextMenus.create({
      id: "clearCache",
      parentId: "unlockableMains",
      title: "🧹 Clear Site Cache",
      contexts: ["all"]
    });
  
    // Add separator
    browser.contextMenus.create({
      id: "separator",
      parentId: "unlockableMains",
      type: "separator",
      contexts: ["all"]
    });
  
    // Add info item
    browser.contextMenus.create({
      id: "info",
      parentId: "unlockableMains",
      title: "ℹ️ About Unlockable",
      contexts: ["all"]
    });
  });
  
  // Function to run ./content.js
  function executeContentScript(tabId: number): void {
    browser.tabs.executeScript(tabId, {
      file: './content.js'
    }).then(() => {
      console.log("Unlockable: script executed successfully");
    }).catch((err: Error) => {
      console.error("Unlockable: Failed to execute content script:", err);
    });
  }
  
  // Handle context menu clicks
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (!tab?.id) return; // No tab found, exit
  
    switch (info.menuItemId) {
      case "unlockArticle":
        console.log("Unlockable: Unlock Article clicked");
        executeContentScript(tab.id);
        break;
  
      // case "removeAds":
      //   console.log("Unlockable: Remove Ads clicked");
      //   alert("Removing advertisements...");
      //   break;
  
      case "clearCache":
        console.log("Unlockable: Clear Cache clicked");
        if (tab.url) {
          browser.browsingData.remove({
            origins: [tab.url]
          }, {
            cache: true,
            cookies: true,
            localStorage: true
          }).then(() => {
            browser.tabs.reload(tab.id);
          }).catch((err: Error) => {
            console.error("Unlockable: Failed to clear cache:", err);
          });
        }
        break;
  
      case "info":
        console.log("Unlockable: Info clicked");
        browser.tabs.create({
          url: browser.runtime.getURL("./about.html")
        });
        break;
    }
  });
  
  // Listen for extension icon click
  browser.browserAction.onClicked.addListener((tab) => {
    console.log("Extension icon clicked");
    alert("Unlockable activated!");
    // executeContentScript(tab.id); // TODO: See if I want this...
  });
  
  // Listen for messages (just logging)
  browser.runtime.onMessage.addListener((message, sender) => {
    console.log("Message received:", message);
  });
  