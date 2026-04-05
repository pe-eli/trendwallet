export interface TokenPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap: number;
  sparkline_in_7d?: { price: number[] };
}

export interface PortfolioToken {
  symbol: string;
  balance: number;
  price: number;
  change24h: number;
  value: number;
}

export interface PriceHistoryPoint {
  timestamp: number;
  price: number;
}

export interface AIInsightsResponse {
  insights: string;
  generatedAt: string;
}

export interface WalletState {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
}
