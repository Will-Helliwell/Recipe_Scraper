# Recipe_Scraper

This is a custom-built recipe scraper that visits the recipe search index of [BBC Good Food](https://www.bbcgoodfood.com/) and iterates over each seach page to extract all 
the details (cook time, ingredients etc.) of every recipe on the site. These are then inserted into a database on MongoDB that is used by the [Recipy App](https://github.com/Will-Helliwell/Recipy) to populate its recipes.

All recipe rights belong to bbcoodfood.com. This project is solely for educational purposes.

### **Tech Summary**

| Technology    | Use                           |
| ------------- | ----------------------------- |
| Node          | Back-end JavaScript Framework |
| Express       | Web application framework     |
| Puppeteer     | Headless browser controller   |
| MongoDB       | Database                      |
| Mongoose      | ORM                           |

## **Contributors**

This repository is cloned from the original pair project, allowing me to make changes and insert into my own database.

Other contributors - AJ Montgomery.

## **Links to Repositories**

- [Recipy](https://github.com/Will-Helliwell/Recipy)
- [Orignal scraper pair project repository](https://github.com/AJSMonty/scraper)
