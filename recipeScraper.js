// import the module
const recipeScraper = require("recipe-scraper");

// enter a supported recipe url as a parameter - returns a promise
async function someAsyncFunc() {
//   ...
  let recipe = await recipeScraper("https://www.bbcgoodfood.com/recipes/coconut-pastries-gujiya");
//   ...
}

// using Promise chaining
recipeScraper("https://www.bbcgoodfood.com/recipes/coconut-pastries-gujiya").then(recipe => {
    console.log(recipe)
    // do something with recipe
  }).catch(error => {
    // do something with error
  });