import { Request, Response, NextFunction } from "express";
import { generateInsights } from "../services/deepseek";
import { AIInsightsRequest } from "../types";

export async function getAIInsights(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { tokens, totalValue } = req.body as AIInsightsRequest;

    if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
      res.status(400).json({ error: "tokens array is required" });
      return;
    }

    const insights = await generateInsights(tokens, totalValue);

    res.json({
      insights,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
}
