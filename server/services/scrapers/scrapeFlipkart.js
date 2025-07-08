import puppeteer from "puppeteer";

export const scrapeFlipkart = async (query, domain = "flipkart.com") => {
  const url = `https://www.${domain}/search?q=${encodeURIComponent(query)}`;
  console.log("Scraping Flipkart:", url);

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 30,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 1366, height: 768 });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

  // Try to close login popup
  try {
    await page.waitForSelector("button._2KpZ6l._2doB4z", { timeout: 5000 });
    await page.click("button._2KpZ6l._2doB4z");
  } catch {
    console.log("Login popup not found, continuing...");
  }

  // Scrape inside page context
  const results = await page.evaluate(() => {
    const items = [];

    const productCardSelectors = [
      "div._1AtVbE", // classic layout
      "div._13oc-S", // variation 1
      "div.DOjaWF.YJG4Cf", // newer layout
    ];

    const cards = [];
    productCardSelectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => cards.push(el));
    });

    cards.forEach((card) => {
      const title =
        card.querySelector("div._4rR01T")?.innerText?.trim() || // classic
        card.querySelector("div.KzDlHZ")?.innerText?.trim(); // new layout

      const price =
        card.querySelector("div._30jeq3._1_WHN1")?.innerText?.trim() || // classic
        card.querySelector("div.Nx9bqj._4b5DiR")?.innerText?.trim(); // new layout

      const anchor = card.querySelector("a");
      const rawHref = anchor?.getAttribute("href");
      const fullLink = rawHref
        ? rawHref.startsWith("http")
          ? rawHref
          : `https://www.flipkart.com${rawHref}`
        : null;

      // Only add complete items
      if (title || price || (fullLink && fullLink.includes("/p/"))) {
        items.push({
          productName: title,
          price: price.replace(/[^0-9]/g, ""),
          link: fullLink,
          currency: "INR",
          seller: "Flipkart",
        });
      }
    });

    return {
      items,
      logs: [`✅ Extracted ${items.length} items from Flipkart.`],
    };
  });

  await browser.close();
  return results;
};
