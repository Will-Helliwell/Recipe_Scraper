const scraperObject = {
    url: 'https://www.bbcgoodfood.com/search/recipes?sort=-date',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        // Wait for the required DOM to be rendered
        await page.waitForSelector('#main-content');
        // Get the link to all the required books
        let urls = await page.$$eval('.standard-card-new__thumbnail', links => {
            // let blobby = 2
            // Make sure the book to be scraped is in stock
            // console.log(blobby)
            // console.log(links)
            // console.log("inside block");
            // links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
            // Extract the links from the data
            links = links.map(el => el.querySelector('a').href)
            return links;
        });
        console.log(urls);

    }
}

module.exports = scraperObject;

"standard-card-new > standard-card-new__thumbnail > a"