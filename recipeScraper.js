// import the module
const recipeScraper = require("recipe-scraper");
const urls = require("./urls")

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
    fetch('https://localhost:5000/api/todos', {
    method: 'POST', // or 'PUT'
    headers: {
    'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    // do something with recipe
  }).catch(error => {
    // do something with error
  });