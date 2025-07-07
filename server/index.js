// server/index.js
import express from "express";
import dotenv from "dotenv";
import fetchPrices from "./routes/fetchPrices.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/fetch-prices", fetchPrices);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));