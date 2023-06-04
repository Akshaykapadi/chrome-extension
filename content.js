
let apiResponse = null; 
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
        
     if(count > 0){
        break;
     }
      const link = links[i];
      const linkText = link.innerText.toLowerCase();
      const href= link.getAttribute('href');
      if (
        linkText.includes("terms") ||
        linkText.includes("conditions") ||
        linkText.includes("agreement") || linkText.includes("privacy")
      ) {
        link.style.backgroundColor = "yellow";
        const pageUrl = `https://${url}${href}`;
        allUrls.push(pageUrl);


        link.style.position = "relative";
        
        var loader = document.createElement('img');
        loader.src = "https://ik.ourlittlejoys.com/MumbaiHacks/Spinner-1s-200px_bsG7KgAUv.gif?updatedAt=1685795166573";
        loader.className = "signwiseloader"+count;
        loader.style.width = "30px";

        var iIcon = document.createElement('img');
        iIcon.src = "https://ik.ourlittlejoys.com/MumbaiHacks/info_21Mpq2lKS.png";
        iIcon.className = "signwiseinfoIcon"+count;
        iIcon.style.width = "10px";
        iIcon.style.display = "none";

        link.parentNode.insertBefore(loader, link.nextSibling);
        link.parentNode.insertBefore(iIcon, link.nextSibling);
        
        var newDiv = document.createElement('div');
        newDiv.style.position = "absolute";
        newDiv.style.left = "250px";
        newDiv.style.width = "300px";
        newDiv.style.bottom = "0";
        newDiv.style.background = "#000";
        newDiv.style.color = "#fff";
        newDiv.style.padding = "5px";
        newDiv.style.display = "none";
        newDiv.className = "signwisedata"+count ;
        newDiv.id = "signwisedata"+count;
        // newDiv.textContent = 'Make sure all items in the list are related to each other.Use the same font and margin width in each bulleted point.Keep bullet points short, preferably no more than three lines long.Begin all items with the same part of speech (active verbs work well) and make sure they are in parallel form.';
        link.appendChild(newDiv);

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

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "apiResponse") {
        apiResponse = request.data.data; 
        let count=0;
        for (const d of apiResponse) {
            if(count > 0){
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

                    // Create an unordered list for the data points
                    const listElement = document.createElement("ul");

                    for (const dataItem of riskItem.data) {
                        const listItem = document.createElement("li");
                        listItem.textContent = dataItem;
                        listElement.appendChild(listItem);
                    }
                    cl.appendChild(titleElement);
                    cl.appendChild(listElement);
                    cl.style.display = "block";
                }
            }
           
            count++;
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