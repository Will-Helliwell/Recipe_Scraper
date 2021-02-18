let urlsArray = require("./urls")
const recipeScraper = require("recipe-scraper");
require("dotenv").config();
const Recipy = require("./recipy")

const mongoose = require("mongoose");

mongoose.connect(process.env.RECIPY_DEV, { useNewUrlParser: true })
    .then(() => console.log(`Dev Database connected successfully`))
    .catch((err) => console.log(err));

let urli = [];

for (let i = 2; i < 418; i++) {
    urli.push(`https://www.bbcgoodfood.com/search/recipes/page/${i}/?sort=-date`)
}

console.log(urli.length -1)

const scraperObject = {

        urls: urli,
        async scraper(browser){
            for (let j = 0; j < 416; j++) {
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
            };
            // console.log(urlsArray);
            sendToDB();
            
        }
    }

function sendToDB(){
        console.log(urlsArray);
        urlsArray.forEach(array => {
            array.forEach(url => {
                recipeScraper(url).then(recipe => {
                    console.log(JSON.stringify(recipe))
                    console.log("-------------------------------------------------------")
                    Recipy.create(JSON.stringify(recipe));
                    // do something with recipe
                  }).catch(error => {
                    // do something with error
                  });
            })        
          })
    Recipy.create(recipe)
}

module.exports = scraperObject;

