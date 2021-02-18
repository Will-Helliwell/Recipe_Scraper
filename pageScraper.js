let urlsArray = require("./urls")

let urli = [];

for (let i = 2; i < 418; i++) {
    urli.push(`https://www.bbcgoodfood.com/search/recipes/page/${i}/?sort=-date`)
}

console.log(urli)

const scraperObject = {

        urls: urli,
        // console.log(this.url),
        async scraper(browser){
            for (let j = 1; j < 418; j++) {
                let page = await browser.newPage();
                console.log(`Navigating to ${this.urls[j]}...`);
                await page.goto(this.urls[j]);
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
    }


module.exports = scraperObject;
