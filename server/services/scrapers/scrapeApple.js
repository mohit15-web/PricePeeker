import puppeteer from "puppeteer";

export const scrapeApple = async (query, domain = "www.apple.com") => {
  try {
    const searchUrl = `https://${domain}`;

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    await page.goto(searchUrl, { waitUntil: "networkidle2", timeout: 60000 });

    const searchSelector = 'input[name="as-search-input"]';
    await page.waitForSelector(searchSelector);

    // Type query and press Enter
    await page.type(searchSelector, query);
    await page.keyboard.press("Enter");

    // Wait for results to load
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // Extract data
    const results = await page.evaluate(() => {
      const items = [];
      const cards = document.querySelectorAll(".rf-serp-producttile");

      cards.forEach(card => {
        const title = card.querySelector(".rf-serp-producttile-title")?.innerText;
        const price = card.querySelector(".rf-serp-producttile-price")?.innerText;
        const link = card.querySelector("a")?.href;

        if (title && price && link) {
          items.push({
            productName: title.trim(),
            price: price.replace(/[^\d.]/g, ""),
            link: link.startsWith("http") ? link : `https://www.apple.com${link}`,
            currency: "INR",
            seller: "Apple"
          });
        }
      });

      return items;
    });

    await browser.close();
    return { items: results, logs: [`Found ${results.length} Apple products`] };
  } catch (error) {
    console.error("Apple scraping failed:", error);
    return { items: [], logs: ["Apple scraping failed"] };
  }
};
