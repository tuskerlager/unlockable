import "./popup.css";

document.addEventListener("DOMContentLoaded", () => {
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
    chrome.tabs.query({ active: true, currentWindow: true }, () => {
      alert("Cache cleared successfully");
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
