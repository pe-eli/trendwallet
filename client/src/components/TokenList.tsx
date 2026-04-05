import { TokenPrice } from "../types";
import { SkeletonLoader } from "./SkeletonLoader";

interface TokenListProps {
  prices: TokenPrice[] | undefined;
  isLoading: boolean;
  error: Error | null;
  onSelectToken: (coinId: string) => void;
  selectedToken: string | null;
}

export function TokenList({
  prices,
  isLoading,
  error,
  onSelectToken,
  selectedToken,
}: TokenListProps) {
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-base font-semibold tracking-tight mb-4">
          Market Prices
        </h2>
        <SkeletonLoader rows={6} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-base font-semibold tracking-tight mb-4">
          Market Prices
        </h2>
        <div className="flex items-center gap-2 rounded-xl bg-red-500/5 border border-red-500/10 p-4">
          <svg className="h-4 w-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-sm text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold tracking-tight">
          Market Prices
        </h2>
        <span className="text-xs text-dark-400">24h</span>
      </div>
      <div className="space-y-1">
        {prices?.map((token, i) => {
          const isSelected = selectedToken === token.id;
          const hasPrice = token.current_price != null;
          const safePrice = token.current_price ?? 0;
          const has24hChange = token.price_change_percentage_24h != null;
          const safe24hChange = token.price_change_percentage_24h ?? 0;
          const isPositive = safe24hChange >= 0;
          return (
            <button
              key={token.id}
              onClick={() => onSelectToken(token.id)}
              className={`stagger-item group w-full flex items-center justify-between rounded-xl p-3 transition-all duration-150 ${
                isSelected
                  ? "bg-accent-blue/10 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.3)]"
                  : "hover:bg-white/[0.03]"
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={token.image}
                    alt={token.symbol}
                    className="h-9 w-9 rounded-full ring-1 ring-white/5 transition-transform duration-200 group-hover:scale-110"
                  />
                  {isSelected && (
                    <div className="absolute -inset-0.5 rounded-full bg-accent-blue/20 animate-pulse-soft -z-10" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white tracking-tight group-hover:text-white/90">
                    {token.name}
                  </p>
                  <p className="text-xs text-dark-400 uppercase font-medium">
                    {token.symbol}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white tabular-nums">
                  {hasPrice ? `$${safePrice.toLocaleString()}` : "N/A"}
                </p>
                <div
                  className={`inline-flex items-center gap-0.5 text-xs font-medium tabular-nums ${
                    isPositive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  <svg
                    className={`h-3 w-3 ${isPositive ? "" : "rotate-180"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {has24hChange ? `${Math.abs(safe24hChange).toFixed(2)}%` : "N/A"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
