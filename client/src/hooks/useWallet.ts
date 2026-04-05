import { useState, useCallback, useEffect } from "react";
import { connectWallet } from "../services/wallet";
import { useStore } from "../store/useStore";

export function useWallet() {
  const { walletAddress, chainId, isConnected, setWallet, disconnect } =
    useStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const { address, chainId } = await connectWallet();
      setWallet(address, chainId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  }, [setWallet]);

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (accounts.length === 0) {
        disconnect();
      } else {
        connect();
      }
    };

    const handleChainChanged = () => {
      connect();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum?.removeListener("chainChanged", handleChainChanged);
    };
  }, [connect, disconnect]);

  return {
    walletAddress,
    chainId,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
  };
}
