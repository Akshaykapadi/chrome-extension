chrome.runtime.onInstalled.addListener(function() {
    console.log("sing ai extension installed....")
  });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log("coming on this function checking status")
    if (changeInfo.status === "complete") {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["jquery.min.js", "content.js"]
      });
    }
  });


  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "makeAjaxCall") {
      const apiUrl = "https://6adb-14-143-59-170.ngrok-free.app/analyze"; // Replace with your API endpoint
      const requestBody = JSON.stringify({ urls: request.urls }); // Modify the body structure according to your API requirements
  
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("AJAX error");
          }
        })
        .then((data) => {
          console.log("AJAX success", data);
          console.log("sender.tab.id", sender.tab.id);

          // Send the API response back to the content script
        //   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        //     chrome.tabs.sendMessage(tabs[0].id, { action: "apiResponse", data: data });
        //   });
            chrome.tabs.sendMessage(sender.tab.id, { action: "apiResponse", data: data });

        })
        .catch((error) => {
          console.log("AJAX error", error);
        });
    }
  });
  
  