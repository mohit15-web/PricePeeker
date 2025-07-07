import { getSitesByCountry } from "../utils/countrySites.js";
import { scrapeAmazon } from "./scrapers/scrapeAmazon.js";
import { scrapeApple } from "./scrapers/scrapeApple.js"; // if you implement this
import { scrapeFlipkart } from "./scrapers/scrapeFlipkart.js"; // if you implement this
import { validateMatch } from "./aiMatcher.js";

const getPrices = async (country, query) => {
  const sites = getSitesByCountry(country);
  const allResults = [];
  const scraped = []; // moved outside the loop to collect all sources

  console.log("sites", sites);

  for (const site of sites) {
    console.log("scraping site:", site);

    try {
      if (site.includes("amazon")) {
        console.log("scrapping amazon");
        const { items } = await scrapeAmazon(query, site);
        scraped.push(...items); // append to scraped
        console.log("scraped", scraped)
      } else if (site.includes("apple.com")) {
        console.log("scrapping apple");
        const { items } = await scrapeApple(query, site);
        scraped.push(...items);
      } else if (site.includes("flipkart")) {
        console.log("scrapping flipkart");
        const { items } = await scrapeFlipkart(query, site);
        scraped.push(...items);
        console.log("scraped", scraped)
      }
    } catch (err) {
      console.warn(`Error scraping ${site}:`, err.message);
    }
  }

  for (const result of scraped) {
    const isValid = await validateMatch(result.productName, query);
    if (isValid === true) allResults.push(result);
    if (isValid === null) {
      console.warn("Skipping further Gemini checks due to rate limit.");
      break;
    }
  }

  return allResults.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
};

export default getPrices;
