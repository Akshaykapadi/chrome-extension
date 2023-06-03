function openTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.create({ url: tabs[0].url });
    });
  }
  
  // Execute the openTab function when the extension icon is clicked
  document.addEventListener("DOMContentLoaded", function () {
    console.log("coming over here...")
    // const link = document.getElementById("link");
    // link.addEventListener("click", openTab);
  });
  