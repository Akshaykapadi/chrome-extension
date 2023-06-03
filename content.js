

function searchForTermsInLinks() {
    const links = document.getElementsByTagName("a");
    const url = window.location.host;
    const allUrls = [];
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
   