import { useWallet } from "../hooks/useWallet";
import { shortenAddress, getChainName } from "../services/wallet";

export function WalletConnect() {
  const {
    walletAddress,
    chainId,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
  } = useWallet();

  if (isConnected && walletAddress) {
    return (
      <div className="flex items-center gap-2 animate-fade-in">
        {/* Network badge */}
        <div className="flex items-center gap-2 rounded-xl glass-card px-3.5 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-medium text-dark-300">
            {chainId ? getChainName(chainId) : "Unknown"}
          </span>
        </div>

        {/* Address */}
        <div className="flex items-center gap-2 rounded-xl glass-card px-3.5 py-2">
          <div className="h-5 w-5 rounded-md bg-gradient-to-br from-accent-blue to-accent-purple" />
          <span className="text-sm font-mono font-medium text-white tracking-tight">
            {shortenAddress(walletAddress)}
          </span>
        </div>

        {/* Disconnect */}
        <button
          onClick={disconnect}
          className="group rounded-xl glass-card px-3.5 py-2 text-xs font-medium text-dark-400 hover:text-red-400 hover:border-red-500/20 transition-all duration-150"
        >
          <svg
            className="h-4 w-4 transition-transform duration-150 group-hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={connect}
        disabled={isConnecting}
        className="btn-glow group relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
      >
        {isConnecting ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <span>Connect Wallet</span>
          </>
        )}
      </button>
      {error && (
        <span className="text-xs text-red-400 animate-fade-in">{error}</span>
      )}
    </div>
  );
}
