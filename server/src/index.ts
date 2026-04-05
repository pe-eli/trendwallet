import "dotenv/config";
import express from "express";
import cors from "cors";
import pricesRoutes from "./routes/prices";
import aiInsightsRoutes from "./routes/aiInsights";
import { errorHandler } from "./utils/errorHandler";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/prices", pricesRoutes);
app.use("/api/ai-insights", aiInsightsRoutes);

// Backward-compatible routes for older frontend builds/env configs.
app.use("/prices", pricesRoutes);
app.use("/ai-insights", aiInsightsRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
