let PAGE_URL = "";
async function searchForTermsInLinks() {
  // Create the modal container
  const modal = document.createElement("div");
  modal.id = "myModal";
  modal.className = "modal";
  modal.style.display = "none";

  // Create the modal content
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close";
  closeBtn.innerHTML = "&times;";

  // Append the close button to the modal content
  modalContent.appendChild(closeBtn);

  // Create the modal body
  const modalBody = document.createElement("div");
  modalBody.id = "modalContent";

  // Append the modal body to the modal content
  modalContent.appendChild(modalBody);

  // Append the modal content to the modal container
  modal.appendChild(modalContent);

  // Append the modal to the document body
  document.body.appendChild(modal);

  const links = document.getElementsByTagName("a");
  const url = window.location.host;
  const allUrls = [];
  let count = 0;
  for (let i = 0; i < links.length; i++) {
    if (count > 0) {
      break;
    }
    const link = links[i];
    const linkText = link.innerText.toLowerCase();
    const href = link.getAttribute("href");
    if (
      linkText.includes("terms") ||
      linkText.includes("conditions") ||
      linkText.includes("agreement") ||
      linkText.includes("privacy")
    ) {
      link.style.backgroundColor = "yellow";
      const pageUrl = `https://${url}${href}`;
      PAGE_URL = pageUrl;
      allUrls.push(pageUrl);

      link.style.position = "relative";

      var loader = document.createElement("img");
      loader.src =
        "https://ik.ourlittlejoys.com/MumbaiHacks/Spinner-1s-200px_bsG7KgAUv.gif?updatedAt=1685795166573";
      loader.className = "signwiseloader" + count;
      loader.style.width = "30px";

      var iIcon = document.createElement("img");
      iIcon.src = "https://ik.ourlittlejoys.com/MumbaiHacks/info_21Mpq2lKS.png";
      iIcon.className = "signwiseinfoIcon" + count;
      iIcon.style.width = "10px";
      iIcon.style.display = "none";

      link.parentNode.insertBefore(loader, link.nextSibling);
      link.parentNode.insertBefore(iIcon, link.nextSibling);

      var newDiv = document.createElement("div");
      newDiv.style.position = "absolute";
      newDiv.style.width = "300px";
      newDiv.style.bottom = "0";
      newDiv.style.background = "#000";
      newDiv.style.color = "#fff";
      newDiv.style.padding = "5px";
      newDiv.style.display = "none";
      newDiv.className = "signwisedata" + count;
      newDiv.id = "signwisedata" + count;
      newDiv.className = "signwisedata" + count;
      newDiv.style.borderRadius = "8px";
      newDiv.style.position = "fixed";
      newDiv.style.top = "20px";
      newDiv.style.right = "20px";
      newDiv.style.height = "300px";
      newDiv.style.border = "1px solid #fff";
      newDiv.style.paddingTop = "18px";
      newDiv.style.padding = "4px";
      newDiv.style.boxShadow = "0px 0px 21px -1px rgba(0,0,0, 1);";
      newDiv.style.display = "flex";
      newDiv.style.flexDirection = "column";
      newDiv.style.justifyContent = "flex-start";
      newDiv.style.alignItems = "flex-start";
      newDiv.style.overflowY = "scroll";
      newDiv.style.zIndex = 9000;
      newDiv.style.display = "none";
      const crossIcon = document.createElement("img");
      crossIcon.addEventListener("click", () => {
        document.querySelector(".signwisedata0").style.display = "none";
      });
      crossIcon.src =
        "https://ik.ourlittlejoys.com/MumbaiHacks/Group_1602_97QorvzVc.png?updatedAt=1685850707131";
      // crossIcon.innerText = "X";
      crossIcon.style.width = "25px";
      crossIcon.style.height = "25px";
      crossIcon.style.fontSize = "18px";
      crossIcon.style.position = "absolute";
      crossIcon.style.right = "25px";
      crossIcon.style.top = "15px";
      crossIcon.style.cursor = "pointer";
      crossIcon.style.zIndex = 1000;
      newDiv.appendChild(crossIcon);
      // newDiv.textContent = 'Make sure all items in the list are related to each other.Use the same font and margin width in each bulleted point.Keep bullet points short, preferably no more than three lines long.Begin all items with the same part of speech (active verbs work well) and make sure they are in parallel form.';
      document.body.appendChild(newDiv);
      newDiv.style.display = "none";

      // link.parentNode.insertBefore(newDiv, link.nextSibling);

      // var iIcon = document.createElement('img');
      // iIcon.src = "https://ik.ourlittlejoys.com/MumbaiHacks/info_21Mpq2lKS.png";
      // iIcon.className = "signwiseinfoIcon"+count;
      // iIcon.style.width = "10px";
      // iIcon.style.display = "none";
      // iIcon.setAttribute('data-signwisepopup', 'signwiseresult'+count);
      // iIcon.addEventListener('click', function() {
      //   // let allData = document.getElementsByClassName("signwisedata");
      //   // allData.style.display = "none";

      //   var elements = document.querySelectorAll('.signwisedata');

      // //   // Iterate over the elements and hide them
      // //   for (var i = 0; i < elements.length; i++) {
      // //     elements[i].style.display = 'none';
      // //   }

      //   const d = document.querySelector(".signwisedata" + count);
      //   d.style.display ="block";
      // });
      // link.parentNode.insertBefore(iIcon, link.nextSibling);

      count++;
    }
  }
  chrome.runtime.sendMessage({ action: "makeAjaxCall", urls: allUrls });
}

//   // Modal code
// const closeBtn = document.getElementsByClassName("close")[0];
// // Close the modal when the close button is clicked
// closeBtn.addEventListener("click", function () {
//     const modal = document.getElementById("myModal");
//     modal.style.display = "none";
// });

window.addEventListener("click", function (event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "apiResponse") {
    let flag = false;
    let apiResponse = request.data.data;
    let count = 0;
    for (const d of apiResponse) {
      if (count > 0) {
        break;
      }
      const loaderCl = document.querySelector(".signwiseloader" + count);
      const iconImgCl = document.querySelector(".signwiseinfoIcon" + count);

      loaderCl.style.display = "none";
      iconImgCl.style.display = "block";

      const cl = document.querySelector(".signwisedata" + count);

      for (const key in d) {
        if (d.hasOwnProperty(key)) {
          const riskItem = d[key];
          // Create a heading element for the title
          const titleElement = document.createElement("h3");
          titleElement.textContent = riskItem.title;
          titleElement.style.textAlign = "left";
          titleElement.style.fontSize = "20px";
          titleElement.style.marginLeft = "8px";

          // Create an unordered list for the data points
          const listElement = document.createElement("ul");
          listElement.style.listStyleType = "none";
          listElement.style.padding = "0";
          listElement.style.paddingLeft = "20px";

          for (const dataItem of riskItem.data) {
            const listItem = document.createElement("li");
            listItem.textContent = dataItem;
            listItem.style.textAlign = "left";
            listElement.appendChild(listItem);
          }

          if (riskItem.data.length) {
            cl.appendChild(titleElement);
            cl.appendChild(listElement);
            cl.style.display = "flex";
            cl.style.alignItems = "flex-start";
            cl.style.justifyContent = "flex-start";
            cl.style.flexDirection = "column";
            flag = true;
          }
        }
      }

      count++;
    }

    if (flag) {
      const cl = document.querySelector(".signwisedata" + count);
      const btn = document.createElement("button");
      btn.textContent = "View All Details";
      btn.style.border = "none";
      btn.style.padding = "8 20px";
      btn.style.width = "90%";
      btn.style.display = "flex";
      btn.style.justifyContent = "center";
      btn.style.alignItems = "center";
      btn.style.color = "8 20px";
      btn.style.width = "90%";
      btn.style.display = "flex";
      btn.style.justifyContent = "center";
      btn.style.alignItems = "center";
      btn.style.borderRadius = "6px";
      btn.style.height = "40px";
      btn.style.background = "white";
      btn.style.color = "black";
      btn.style.fontWeight = "600";
      btn.addEventListener("click", () => {
        if (PAGE_URL) window.open(PAGE_URL, "_blank");
      });
      if (PAGE_URL) cl.appendChild(btn);
    }
  }
});

// Execute the search when the page finishes loading
searchForTermsInLinks();

//   async function crawlWebsite(url) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto(url);

//     // Execute JavaScript code on the page
//     const data = await page.evaluate(() => {
//       // Example: Retrieve all the text content from the page
//       const elements = document.querySelectorAll('*');
//       const texts = [];
//       for (let element of elements) {
//         if (element.innerText.trim().length > 0) {
//           texts.push(element.innerText.trim());
//         }
//       }
//       return texts;
//     });

//     console.log(data);

//     await browser.close();
// }
