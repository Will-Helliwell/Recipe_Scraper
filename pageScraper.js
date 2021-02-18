let urlsArray = require("./urls")
const recipeScraper = require("recipe-scraper");
const { default: axios } = require("axios");

let urli = [];

for (let i = 2; i < 418; i++) {
    urli.push(`https://www.bbcgoodfood.com/search/recipes/page/${i}/?sort=-date`)
}

console.log(urli)

const scraperObject = {

        urls: urli,
        async scraper(browser){
            for (let j = 0; j < 1; j++) {
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
                urlsArray.push(urls);
                console.log(urlsArray);
                urlsArray.forEach(array => {
                    array.forEach(url => {
                        recipeScraper(url).then(recipe => {
                            console.log(JSON.stringify(recipe))
                            console.log("-------------------------------------------------------")
                            sendToDB(recipe);
                            // do something with recipe
                          }).catch(error => {
                            // do something with error
                          });
                    })        
                  })
            }
        }
    }


function sendToDB(recipe){
    console.log("AAAAAAAAAAAAAAAAAAAAAAAWAAAAAAAAAAAAAAAAAA")
    axios({
        method: 'post',
        url: 'localhost:5000/api/todos',
        data: JSON.stringify(recipe)
      });
    console.log("================================================================================")
}
module.exports = scraperObject;

// module.exports = urlsArray;