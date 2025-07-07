import puppeteer from "puppeteer";

export const scrapeFlipkart = async (query, domain = "flipkart.com") => {
  try {
    const url = `https://www.${domain}/search?q=${encodeURIComponent(query)}`;

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

    // Set User-Agent to avoid bot blocking
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    // Close login popup if it exists
    try {
      await page.waitForSelector("button._2KpZ6l._2doB4z", { timeout: 5000 });
      await page.click("button._2KpZ6l._2doB4z");
    } catch {}

    // Wait for product listings
    await page.waitForSelector("div._1AtVbE", { timeout: 15000 });

    const results = await page.evaluate(() => {
      const items = [];
      const listings = document.querySelectorAll("div._1AtVbE");

      listings.forEach((listing) => {
        try {
          const title = listing.querySelector("div._4rR01T")?.innerText ||
                        listing.querySelector("a.s1Q9rs")?.innerText;
          const link =
            listing.querySelector("a._1fQZEK")?.href ||
            listing.querySelector("a.s1Q9rs")?.href;
          const price = listing.querySelector("div._30jeq3")?.innerText;

          if (title && link && price) {
            items.push({
              productName: title.trim(),
              link: link.startsWith("http") ? link : `https://www.flipkart.com${link}`,
              price: price.replace(/[^0-9.]/g, ""),
              currency: "INR",
              seller: "Flipkart",
            });
          }
        } catch (err) {
          // Ignore individual item parsing failures
        }
      });

      return { items };
    });

    await browser.close();
    return results;
  } catch (error) {
    console.error(`Error scraping ${domain}:`, error);
    return { items: [] };
  }
};
