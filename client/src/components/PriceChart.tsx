import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { usePriceHistory } from "../hooks/usePrices";
import { SkeletonLoader } from "./SkeletonLoader";

interface PriceChartProps {
  coinId: string | null;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-xl px-3 py-2 shadow-card">
      <p className="text-[10px] text-dark-400 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-white tabular-nums">
        $
        {payload[0].value.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  );
}

export function PriceChart({ coinId }: PriceChartProps) {
  const { data, isLoading, error } = usePriceHistory(coinId || "", !!coinId);

  if (!coinId) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-base font-semibold tracking-tight mb-4">
          Price Chart
        </h2>
        <div className="flex flex-col items-center justify-center py-12 text-center">
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
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
          </div>
          <p className="text-sm text-dark-400">
            Select a token to view chart
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-base font-semibold tracking-tight mb-4 capitalize">
          {coinId}
        </h2>
        <SkeletonLoader rows={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-base font-semibold tracking-tight mb-4">
          Price Chart
        </h2>
        <div className="flex items-center gap-2 rounded-xl bg-red-500/5 border border-red-500/10 p-4">
          <p className="text-sm text-red-400">Failed to load chart.</p>
        </div>
      </div>
    );
  }

  const chartData = data?.map((p) => ({
    date: new Date(p.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    price: p.price,
  }));

  const prices = chartData?.map((d) => d.price) || [];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const isPositive = prices.length > 1 && prices[prices.length - 1] >= prices[0];
  const trendColor = isPositive ? "#10b981" : "#ef4444";

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold tracking-tight capitalize">
            {coinId}
          </h2>
          <p className="text-xs text-dark-400 mt-0.5">7-day price history</p>
        </div>
        <div
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
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
          {prices.length > 1
            ? (
                ((prices[prices.length - 1] - prices[0]) / prices[0]) *
                100
              ).toFixed(2)
            : "0.00"}
          %
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={trendColor}
                stopOpacity={0.15}
              />
              <stop
                offset="100%"
                stopColor={trendColor}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="rgba(255,255,255,0.15)"
            tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="rgba(255,255,255,0.15)"
            tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }}
            domain={[minPrice * 0.998, maxPrice * 1.002]}
            tickFormatter={(v: number) =>
              `$${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toFixed(2)}`
            }
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke={trendColor}
            strokeWidth={2}
            fill="url(#priceGradient)"
            dot={false}
            activeDot={{
              r: 4,
              fill: trendColor,
              stroke: "#0b0c10",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
