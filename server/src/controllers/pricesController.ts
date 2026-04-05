import { Request, Response, NextFunction } from "express";
import { getTopPrices, getPriceHistory } from "../services/coingecko";

export async function fetchPrices(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const prices = await getTopPrices();
    res.json(prices);
  } catch (err) {
    next(err);
  }
}

export async function fetchPriceHistory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const coinId = req.params.coinId as string;
    const days = parseInt(String(req.query.days ?? "7")) || 7;
    const history = await getPriceHistory(coinId, days);
    res.json(history);
  } catch (err) {
    next(err);
  }
}
