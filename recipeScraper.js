// import the module
const recipeScraper = require("recipe-scraper");
const urls = require("./urls")

require("dotenv").config();
const Recipy = require("./recipy")

const mongoose = require("mongoose");

mongoose.connect(process.env.RECIPY_DEV, { useNewUrlParser: true })
    .then(() => console.log(`Dev Database connected successfully`))
    .catch((err) => console.log(err));

// console.log(urls)

// enter a supported recipe url as a parameter - returns a promise
// async function someAsyncFunc() {
// //   ...
//   let recipe = await recipeScraper("https://www.bbcgoodfood.com/recipes/carrot-parsnip-soup");
// //   ...
// }

// urls.forEach(url => {
//   recipeScraper(url).then(recipe => {
//     console.log(recipe)
//     // do something with recipe
//   }).catch(error => {
//     // do something with error
//   });
// })




// using Promise chaining
recipeScraper("https://www.bbcgoodfood.com/recipes/easy-pancakes").then(recipe => {
    console.log(JSON.stringify(recipe))
    Recipy.create(recipe)

    // do something with recipe
  }).catch(error => {
    // do something with error
  });