chrome.runtime.onInstalled.addListener(function() {
    console.log("sing ai extension installed....")
  });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log("coming on this function checking status")
    if (changeInfo.status === "complete") {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"]
      });
    }
  });
