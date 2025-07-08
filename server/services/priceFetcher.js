import { getSitesByCountry } from "../utils/countrySites.js";
import { scrapeAmazon } from "./scrapers/scrapeAmazon.js";
import { scrapeFlipkart } from "./scrapers/scrapeFlipkart.js";

const getPrices = async (country, query) => {
  const sites = getSitesByCountry(country);
  const allResults = [];
  const scraped = []; // moved outside the loop to collect all sources

  console.log("sites", sites);

  for (const site of sites) {
    console.log("scraping site:", site);

    try {
      if (site.includes("flipkart")) {
        console.log("scrapping flipkart");
        const { items } = await scrapeFlipkart(query, site);
        scraped.push(...items);
        console.log("scraped", scraped);
      } else if (site.includes("amazon")) {
        console.log("scrapping amazon");
        const { items } = await scrapeAmazon(query, site);
        scraped.push(...items); // append to scraped
        console.log("scraped", scraped);
      }
    } catch (err) {
      console.warn(`Error scraping ${site}:`, err.message);
    }
  }

  const normalize = (str) => str.toLowerCase().replace(/[^\w\s]/gi, "");

  for (const result of scraped) {
    const title = normalize(result.productName || "");
    const q = normalize(query);

    const isMatch = q.split(" ").every((word) => title.includes(word));

    if (isMatch) allResults.push(result);
  }

  return allResults.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
};

export default getPrices;
