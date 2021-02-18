let urlsArray = require("./urls")

let urli = [];

for (let i = 2; i < 418; i++) {
    urli.push(`https://www.bbcgoodfood.com/search/recipes/page/${i}/?sort=-date`)
}

console.log(urli)

const scraperObject = {

        url: `https://www.bbcgoodfood.com/search/recipes/page/45/?sort=-date`,
        // console.log(this.url),
        async scraper(browser){
            let page = await browser.newPage();
            console.log(`Navigating to ${this.url}...`);
            await page.goto(this.url);
            // Wait for the required DOM to be rendered
            await page.waitForSelector('#main-content');
            // Get the link to all the required books
            let urls = await page.$$eval('.standard-card-new__thumbnail', links => {
                links = links.map(el => el.querySelector('a').href)
                return links;
            });
            console.log(urls);
            urlsArray.push(urls);
            console.log(urlsArray);
        }
    }


// function pageTurner() {

//     urli.forEach(urlis => {


//         let url = urlis,
//         async scraper(browser){
//             let page = await browser.newPage();
//             console.log(`Navigating to ${this.url}...`);
//             await page.goto(url);
//             // Wait for the required DOM to be rendered
//             await page.waitForSelector('#main-content');
//             // Get the link to all the required books
//             let urls = await page.$$eval('.standard-card-new__thumbnail', links => {
//                 // let blobby = 2
//                 // Make sure the book to be scraped is in stock
//                 // console.log(blobby)
//                 // console.log(links)
//                 // console.log("inside block");
//                 // links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
//                 // Extract the links from the data
//                 links = links.map(el => el.querySelector('a').href)
//                 return links;
//             });
//             console.log(urls);
//             urlsArray.push(urls);
//             console.log(urlsArray);
//         }
//     }
// }

module.exports = scraperObject;
