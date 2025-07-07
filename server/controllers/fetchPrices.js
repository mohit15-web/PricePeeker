import getPrices from "../services/priceFetcher.js";

const fetchPrices = async (req, res) => {
  try {
    const { country, query } = req.body;
    if (!country || !query) {
      return res.status(400).json({ error: "Country and query are required." });
    }

    const results = await getPrices(country, query);
    console.log("results", results);
    res.json(results);
  } catch (error) {
    console.error("Error fetching prices:", error);
    res.status(500).json({ error: "Failed to fetch prices." });
  }
};
export default fetchPrices;
