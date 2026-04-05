import { useStore } from "../store/useStore";

interface PortfolioSummaryProps {
  isConnected: boolean;
}

export function PortfolioSummary({ isConnected }: PortfolioSummaryProps) {
  const { portfolio, totalValue } = useStore();

  if (!isConnected) {
    return (
      <div className="glass-card gradient-border rounded-2xl p-6">
        <h2 className="text-base font-semibold tracking-tight mb-3">
          Portfolio
        </h2>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="h-12 w-12 rounded-2xl bg-dark-800 flex items-center justify-center mb-3">
            <svg
              className="h-6 w-6 text-dark-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
              />
            </svg>
          </div>
          <p className="text-sm text-dark-400">
            Connect your wallet to view portfolio
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card gradient-border rounded-2xl p-6 animate-fade-in">
      <h2 className="text-base font-semibold tracking-tight mb-1">
        Portfolio Value
      </h2>
      <div className="flex items-baseline gap-2 mb-5">
        <p className="text-3xl font-bold tracking-tighter text-white">
          $
          {totalValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <span className="text-xs text-dark-400 font-medium">USD</span>
      </div>

      {portfolio.length === 0 ? (
        <p className="text-sm text-dark-400">No tokens detected.</p>
      ) : (
        <div className="space-y-1.5">
          {portfolio.map((token, i) => {
            const isPositive = token.change24h >= 0;
            const pct =
              totalValue > 0 ? (token.value / totalValue) * 100 : 0;
            return (
              <div
                key={token.symbol}
                className="stagger-item group relative flex items-center justify-between rounded-xl bg-white/[0.02] hover:bg-white/[0.04] p-3 transition-all duration-150"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Allocation bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 rounded-xl bg-accent-blue/[0.04]"
                  style={{ width: `${pct}%` }}
                />
                <div className="relative flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white/80 uppercase">
                      {token.symbol.slice(0, 3)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white uppercase tracking-tight">
                      {token.symbol}
                    </p>
                    <p className="text-xs text-dark-400">
                      {token.balance.toFixed(4)} tokens
                    </p>
                  </div>
                </div>
                <div className="relative text-right">
                  <p className="text-sm font-medium text-white tabular-nums">
                    ${token.value.toFixed(2)}
                  </p>
                  <p
                    className={`text-xs font-medium tabular-nums ${
                      isPositive ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {token.change24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
