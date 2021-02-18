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
                            sendToDB();
                            // do something with recipe
                          }).catch(error => {
                            // do something with error
                          });
                    })        
                  })
            }
        }
    }


sendToDB = async (recipe) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAWAAAAAAAAAAAAAAAAAA")
    const location = "localhost:5000/api/todos";
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe)
    };
    try {
        const fetchResponse = await fetch(location, settings);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        return e;
    }  
    console.log("================================================================================")
}
module.exports = scraperObject;
