import { useQuery } from "@tanstack/react-query";
import { fetchPrices, fetchPriceHistory } from "../services/api";

export function usePrices() {
  return useQuery({
    queryKey: ["prices"],
    queryFn: fetchPrices,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}

export function usePriceHistory(coinId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["priceHistory", coinId],
    queryFn: () => fetchPriceHistory(coinId),
    enabled,
    staleTime: 5 * 60_000,
  });
}
