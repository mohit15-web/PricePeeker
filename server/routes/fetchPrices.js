import express from "express";
import fetchPrices from "../controllers/fetchPrices.js";

const router = express.Router();

router.post("/", fetchPrices);

export default router;