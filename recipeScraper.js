// import the module
const recipeScraper = require("recipe-scraper");

// enter a supported recipe url as a parameter - returns a promise
async function someAsyncFunc() {
//   ...
  let recipe = await recipeScraper("https://www.bbc.co.uk/food/recipes/creamy_chicken_ham_and_03877");
//   ...
}

// using Promise chaining
recipeScraper("https://www.bbc.co.uk/food/recipes/creamy_chicken_ham_and_03877").then(recipe => {
    console.log(recipe)
    // do something with recipe
  }).catch(error => {
    // do something with error
  });