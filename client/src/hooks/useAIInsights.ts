import { useMutation } from "@tanstack/react-query";
import { fetchAIInsights } from "../services/api";
import { PortfolioToken } from "../types";

export function useAIInsights() {
  return useMutation({
    mutationFn: ({
      tokens,
      totalValue,
      walletAddress,
    }: {
      tokens: PortfolioToken[];
      totalValue: number;
      walletAddress: string;
    }) => fetchAIInsights(tokens, totalValue, walletAddress),
  });
}
