import axios from "axios";
import { TokenPrice, PriceHistoryPoint, AIInsightsResponse, PortfolioToken } from "../types";

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const apiBaseUrl = rawApiBaseUrl ? rawApiBaseUrl.replace(/\/+$/, "") : "/api";

const api = axios.create({
  baseURL: apiBaseUrl,
});

export async function fetchPrices(): Promise<TokenPrice[]> {
  const { data } = await api.get<TokenPrice[]>("/prices");
  return data;
}

export async function fetchPriceHistory(
  coinId: string,
  days: number = 7
): Promise<PriceHistoryPoint[]> {
  const { data } = await api.get<PriceHistoryPoint[]>(
    `/prices/history/${coinId}`,
    { params: { days } }
  );
  return data;
}

export async function fetchAIInsights(
  tokens: PortfolioToken[],
  totalValue: number,
  walletAddress: string
): Promise<AIInsightsResponse> {
  const { data } = await api.post<AIInsightsResponse>("/ai-insights", {
    tokens,
    totalValue,
    walletAddress,
  });
  return data;
}
