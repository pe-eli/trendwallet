import { create } from "zustand";
import { PortfolioToken } from "../types";

interface AppState {
  walletAddress: string | null;
  chainId: number | null;
  isConnected: boolean;
  portfolio: PortfolioToken[];
  totalValue: number;

  setWallet: (address: string, chainId: number) => void;
  disconnect: () => void;
  setPortfolio: (tokens: PortfolioToken[]) => void;
}

export const useStore = create<AppState>((set) => ({
  walletAddress: null,
  chainId: null,
  isConnected: false,
  portfolio: [],
  totalValue: 0,

  setWallet: (address, chainId) =>
    set({ walletAddress: address, chainId, isConnected: true }),

  disconnect: () =>
    set({
      walletAddress: null,
      chainId: null,
      isConnected: false,
      portfolio: [],
      totalValue: 0,
    }),

  setPortfolio: (tokens) =>
    set({
      portfolio: tokens,
      totalValue: tokens.reduce((sum, t) => sum + t.value, 0),
    }),
}));
