import { useState, useEffect } from "react";
import { WalletConnect } from "../components/WalletConnect";
import { TokenList } from "../components/TokenList";
import { PortfolioSummary } from "../components/PortfolioSummary";
import { PriceChart } from "../components/PriceChart";
import { AIInsights } from "../components/AIInsights";
import { usePrices } from "../hooks/usePrices";
import { useStore } from "../store/useStore";
import { TokenPrice } from "../types";
import { getNativeAssetConfig, getNativeBalance } from "../services/wallet";

function buildNativePortfolio(prices: TokenPrice[], chainId: number, balance: number) {
  const { symbol, priceSymbol } = getNativeAssetConfig(chainId);
  const assetPrice = prices.find((p) => p.symbol.toLowerCase() === priceSymbol);

  if (!assetPrice) {
    return [];
  }

  return [
    {
      symbol,
      balance,
      price: assetPrice.current_price,
      change24h: assetPrice.price_change_percentage_24h,
      value: balance * assetPrice.current_price,
    },
  ];
}

export function Dashboard() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const { data: prices, isLoading, error } = usePrices();
  const { isConnected, chainId, setPortfolio } = useStore();

  useEffect(() => {
    let isCancelled = false;

    async function loadPortfolio() {
      if (!isConnected || !prices || !chainId) {
        setPortfolio([]);
        return;
      }

      try {
        const nativeBalance = await getNativeBalance();
        if (isCancelled) return;

        const portfolio = buildNativePortfolio(prices, chainId, nativeBalance);
        setPortfolio(portfolio);
      } catch {
        if (!isCancelled) {
          setPortfolio([]);
        }
      }
    }

    loadPortfolio();

    return () => {
      isCancelled = true;
    };
  }, [isConnected, prices, chainId, setPortfolio]);

  return (
    <div className="min-h-screen bg-dark-950 bg-gradient-mesh">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent-blue/[0.03] rounded-full blur-[120px] animate-float" />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-purple/[0.03] rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/[0.04]">
        <div className="glass-card !rounded-none !border-x-0 !border-t-0">
          <div className="mx-auto max-w-7xl px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple shadow-glow" />
                <div className="absolute inset-0 h-8 w-8 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple blur-md opacity-40" />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-white">
                  Crypto AI
                </h1>
                <p className="text-[10px] text-dark-400 font-medium tracking-wider uppercase -mt-0.5">
                  Dashboard
                </p>
              </div>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-5">
            <PortfolioSummary isConnected={isConnected} />
            <AIInsights />
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-4">
            <TokenList
              prices={prices}
              isLoading={isLoading}
              error={error}
              onSelectToken={setSelectedToken}
              selectedToken={selectedToken}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4">
            <PriceChart coinId={selectedToken} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] py-6">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <p className="text-xs text-dark-500">
            Crypto AI Dashboard
          </p>
          <div className="flex items-center gap-4 text-xs text-dark-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              CoinGecko
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent-purple" />
              DeepSeek AI
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
