import { useAIInsights } from "../hooks/useAIInsights";
import { useStore } from "../store/useStore";

export function AIInsights() {
  const { portfolio, totalValue, walletAddress, isConnected } = useStore();
  const { mutate, data, isPending, error } = useAIInsights();

  const handleGenerate = () => {
    if (!walletAddress) return;
    mutate({ tokens: portfolio, totalValue, walletAddress });
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold tracking-tight">AI Insights</h2>
        <span className="flex items-center gap-1.5 rounded-lg bg-accent-purple/10 px-2.5 py-1 text-[10px] font-semibold text-accent-purple uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-purple animate-pulse-soft" />
          DeepSeek
        </span>
      </div>

      {!isConnected ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="h-12 w-12 rounded-2xl bg-accent-purple/5 flex items-center justify-center mb-3">
            <svg
              className="h-6 w-6 text-accent-purple/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
              />
            </svg>
          </div>
          <p className="text-sm text-dark-400">
            Connect wallet for AI analysis
          </p>
        </div>
      ) : portfolio.length === 0 ? (
        <p className="text-sm text-dark-400 text-center py-6">
          No portfolio data for analysis.
        </p>
      ) : (
        <>
          <button
            onClick={handleGenerate}
            disabled={isPending}
            className="btn-glow group relative w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-5 py-3 text-sm font-semibold text-white shadow-glow-purple transition-all duration-200 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100 mb-4"
          >
            {isPending ? (
              <>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span>Analyzing Portfolio...</span>
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[20deg]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
                <span>Generate AI Insights</span>
              </>
            )}
          </button>

          {error && (
            <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-4 mb-4 animate-slide-in">
              <p className="text-sm text-red-400">
                {error instanceof Error ? error.message : "Analysis failed"}
              </p>
            </div>
          )}

          {data && (
            <div className="relative rounded-xl bg-white/[0.02] border border-white/[0.04] p-4 animate-slide-in overflow-hidden">
              {/* Subtle glow in the corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <p className="relative text-sm text-dark-200 leading-relaxed whitespace-pre-wrap">
                {data.insights}
              </p>
              <div className="relative flex items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.04]">
                <svg className="h-3 w-3 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[10px] text-dark-500">
                  {new Date(data.generatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
