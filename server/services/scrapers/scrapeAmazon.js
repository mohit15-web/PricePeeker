// server/services/scrapers/scrapeAmazon.js
import puppeteer from "puppeteer";

export const scrapeAmazon = async (query, domain = "amazon.com") => {
  console.log("query", query);
  console.log("domain", domain);

  try {
    const url = `https://${domain}/s?k=${encodeURIComponent(query + " mobile phone")}&i=electronics-intl-ship&s=price-asc-rank`;

    const browser = await puppeteer.launch({
      headless: false,
      slowMo:50,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled"
      ],
    });

    const page = await browser.newPage();
    page.on("console", msg => console.log("PAGE LOG:", msg.text()));

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    await page.waitForSelector(".s-result-item", { timeout: 15000 });

    const results = await page.evaluate((domain) => {
        const logs = [];
        const items = [];
      
        const listings = document.querySelectorAll(".s-result-item[data-component-type='s-search-result']");
        logs.push(`Found ${listings.length} listings`);
      
        listings.forEach((item) => {
          try {
            const titleElement = item.querySelector("h2 span");
            const linkElement = item.querySelector("h2 a");
            const priceElement = item.querySelector(".a-price .a-offscreen");
      
            const title = titleElement?.textContent?.trim() || null;
            const relativeLink = linkElement?.getAttribute("href") || null;
            const link = relativeLink ? `https://www.${domain}${relativeLink}` : null;
            const price = priceElement?.textContent?.trim().replace(/[^0-9.]/g, "") || null;
      
            logs.push(`Title: ${title}`);
            logs.push(`Link: ${link}`);
            logs.push(`Price: ${price}`);
      
            if (title || link || price) {
              items.push({
                productName: title,
                link,
                price,
                currency: domain.includes(".in") ? "INR" : "USD",
                seller: "Amazon",
              });
            }
          } catch (err) {
            logs.push(`Error in item: ${err.message}`);
          }
        });
      
        return { items, logs };
      }, domain);      
      
    await browser.close();
    return results;
  } catch (error) {
    console.error("Amazon scraping failed:", error.message);
    return { items: [], logs: ["Amazon scraping failed: " + error.message] };
  }
};
