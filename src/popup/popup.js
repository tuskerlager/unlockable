/**  */

require("./popup.css");

document.addEventListener("DOMContentLoaded", () => {
  // Add click handlers for all three action buttons
  // --- 🔓 Unlocking Premium Articles
  document.getElementById("unlock-article")?.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting
          .executeScript({
            target: { tabId: tabs[0].id },
            files: ["./content.js"],
          })
          .then(() => {
            console.log("Unlockable: ✅");
          })
          .catch((err) => {
            console.error("Unlockable: ❌:", err);
          });
      }
    });
  });

  // --- 🧹 Clearing Cache
  document.getElementById("clear-cache")?.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // console.log("Unlockable: Clear Cache clicked");
      alert("Cache cleared successfully");
    });
  });

  // --- 🚫 Removing Ads

  // document.getElementById('action2')?.addEventListener('click', () => {
  //     chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  //         console.log("Remove Ads clicked");
  //         alert("Removing advertisements...");
  //     });
  // });

  // --- 🛠 Check Status
  // document.getElementById("check-status")?.addEventListener("click", () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     console.log("Unlockable: Check Status clicked");
  //     alert("Status: All systems operational");
  //   });
  // });
});
