import { Router } from "express";
import { fetchPrices, fetchPriceHistory } from "../controllers/pricesController";

const router = Router();

router.get("/", fetchPrices);
router.get("/history/:coinId", fetchPriceHistory);

export default router;
