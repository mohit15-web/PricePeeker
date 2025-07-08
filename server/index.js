// server/index.js
import express from "express";
import fetchPrices from "./routes/fetchPrices.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/fetch-prices", fetchPrices);

app.listen(3000, () => console.log(`Server running on port 3000`));