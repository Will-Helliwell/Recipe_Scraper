let recipePageUrls = require("./urls")
const recipeScraper = require("recipe-scraper");
require("dotenv").config();
const Recipy = require("./recipy")
const mongoose = require("mongoose");

mongoose.connect(process.env.WILL_RECIPY_TEST, { useNewUrlParser: true })
    .then(() => console.log(`WILL_RECIPY_TEST Database connected successfully`))
    .catch((err) => console.log(err));

// create an array of all search page URLs on bbcgoodfood
let searchPageUrls = [];
for (let i = 2; i < 418; i++) {
    searchPageUrls.push(`https://www.bbcgoodfood.com/search/recipes/page/${i}/?sort=-date`)
}
console.log("Number of search pages stored:", searchPageUrls.length -1)

const scraperObject = {

        urls: searchPageUrls,
        async scraper(browser){
            //for each search page URL, extract all links to recipes
            //and push to the array recipePageUrls (becomes an array of arrays)
            for (let j = 0; j < 5; j++) {
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
                console.log("found these recipes:", urls)
                recipePageUrls.push(urls);
            };
            console.log("final list of recipesURLs:", recipePageUrls);
            console.log("total recipes:", recipePageUrls.length)
            // for each array in the outer array
            recipePageUrls.forEach(array => {
              // for each recipeURL in each inner array
              array.forEach(url => {
                  // use the recipe-scraper package to extract the informaton from each
                  // and insert into the database
                  recipeScraper(url).then(recipe => {
                      console.log()
                      console.log(JSON.stringify(recipe))
                      console.log("-------------------------------------------------------")
                      sendToDB(recipe);
                    }).catch(error => {
                      console.log("Error inserting recipe into database")
                    });
            })
          })

        }
    }

function sendToDB(recipe){
        console.log("Sent to DB...");
        Recipy.create(recipe)
}

module.exports = scraperObject;
