

function searchForTermsInLinks() {
    const links = document.getElementsByTagName("a");
    const url = window.location.host;
    const allUrls = [];
    let count = 0;
    for (let i = 0; i < links.length; i++) {
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

        link.parentNode.insertBefore(loader, link.nextSibling);

        var newDiv = document.createElement('div');
        newDiv.style.position = "absolute";
        newDiv.style.left = "150px";
        newDiv.style.width = "300px";
        newDiv.style.bottom = "0";
        newDiv.style.background = "#000";
        newDiv.style.color = "#fff";
        newDiv.style.padding = "5px";
        newDiv.style.display = "none";
        newDiv.className = "signwisedata"+count;
        // newDiv.textContent = 'Make sure all items in the list are related to each other.Use the same font and margin width in each bulleted point.Keep bullet points short, preferably no more than three lines long.Begin all items with the same part of speech (active verbs work well) and make sure they are in parallel form.'

        link.appendChild(newDiv);

        count++;
      }
    }
  }
  
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
   