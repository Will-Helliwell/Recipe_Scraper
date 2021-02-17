// import the module
const recipeScraper = require("recipe-scraper");
require("urls")

console.log(urls)

// enter a supported recipe url as a parameter - returns a promise
async function someAsyncFunc() {
//   ...
  let recipe = await recipeScraper("https://www.bbcgoodfood.com/recipes/carrot-parsnip-soup");
//   ...
}

// using Promise chaining
recipeScraper("https://www.bbcgoodfood.com/recipes/carrot-parsnip-soup").then(recipe => {
    console.log(recipe)
    // do something with recipe
  }).catch(error => {
    // do something with error
  });