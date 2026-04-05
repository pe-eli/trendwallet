import { BrowserProvider, formatEther } from "ethers";

interface NativeAssetConfig {
  symbol: string;
  priceSymbol: string;
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, handler: (...args: unknown[]) => void) => void;
      removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
      isMetaMask?: boolean;
    };
  }
}

export async function connectWallet(): Promise<{
  address: string;
  chainId: number;
}> {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const network = await provider.getNetwork();

  return {
    address,
    chainId: Number(network.chainId),
  };
}

export function getNativeAssetConfig(chainId: number): NativeAssetConfig {
  const chainMap: Record<number, NativeAssetConfig> = {
    1: { symbol: "ETH", priceSymbol: "eth" },
    5: { symbol: "ETH", priceSymbol: "eth" },
    10: { symbol: "ETH", priceSymbol: "eth" },
    56: { symbol: "BNB", priceSymbol: "bnb" },
    137: { symbol: "MATIC", priceSymbol: "matic" },
    42161: { symbol: "ETH", priceSymbol: "eth" },
    43114: { symbol: "AVAX", priceSymbol: "avax" },
    11155111: { symbol: "ETH", priceSymbol: "eth" },
  };

  return chainMap[chainId] ?? { symbol: "ETH", priceSymbol: "eth" };
}

export async function getNativeBalance(): Promise<number> {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const balance = await provider.getBalance(await signer.getAddress());

  return Number(formatEther(balance));
}

export function getChainName(chainId: number): string {
  const chains: Record<number, string> = {
    1: "Ethereum Mainnet",
    5: "Goerli Testnet",
    11155111: "Sepolia Testnet",
    137: "Polygon",
    56: "BSC",
    42161: "Arbitrum One",
    10: "Optimism",
    43114: "Avalanche",
  };
  return chains[chainId] || `Chain ${chainId}`;
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
