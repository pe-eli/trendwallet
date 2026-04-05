import axios from "axios";
import { TokenPrice, PriceHistoryPoint } from "../types";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

const TOP_COINS = [
  "bitcoin",
  "ethereum",
  "binancecoin",
  "matic-network",
  "solana",
  "cardano",
  "ripple",
  "polkadot",
  "dogecoin",
  "avalanche-2",
  "chainlink",
];

interface RawTokenPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number | null;
  price_change_percentage_24h: number | null;
  image: string | null;
  market_cap: number | null;
  sparkline_in_7d?: { price: Array<number | null> } | null;
}

function toSafeNumber(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function normalizeTokenPrice(token: RawTokenPrice): TokenPrice {
  const sparkline = token.sparkline_in_7d?.price
    ?.filter((p): p is number => typeof p === "number" && Number.isFinite(p));

  return {
    id: token.id,
    symbol: token.symbol,
    name: token.name,
    current_price: toSafeNumber(token.current_price),
    price_change_percentage_24h: toSafeNumber(token.price_change_percentage_24h),
    image: token.image ?? "",
    market_cap: toSafeNumber(token.market_cap),
    sparkline_in_7d: sparkline ? { price: sparkline } : undefined,
  };
}

export async function getTopPrices(): Promise<TokenPrice[]> {
  const { data } = await axios.get<RawTokenPrice[]>(
    `${COINGECKO_BASE}/coins/markets`,
    {
      params: {
        vs_currency: "usd",
        ids: TOP_COINS.join(","),
        order: "market_cap_desc",
        per_page: 20,
        page: 1,
        sparkline: true,
        price_change_percentage: "24h",
      },
    }
  );

  return data
    .filter((token) => token.id && token.symbol && token.name)
    .map(normalizeTokenPrice);
}

export async function getPriceHistory(
  coinId: string,
  days: number = 7
): Promise<PriceHistoryPoint[]> {
  const { data } = await axios.get(
    `${COINGECKO_BASE}/coins/${coinId}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days,
      },
    }
  );

  return data.prices.map(([timestamp, price]: [number, number]) => ({
    timestamp,
    price,
  }));
}
