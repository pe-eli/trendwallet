import { Router } from "express";
import { getAIInsights } from "../controllers/aiController";

const router = Router();

router.post("/", getAIInsights);

export default router;
