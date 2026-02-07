"use client";

import { motion } from "framer-motion";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

interface DataPoint {
  date: string;
  reputation: number;
  tasks: number;
}

interface ReputationChartProps {
  data: DataPoint[];
}

interface TooltipPayloadItem {
  value: number;
  dataKey: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-terminal-glow/30">
        <p className="text-xs text-terminal-muted mb-1">{label}</p>
        <p className="text-sm font-medium text-terminal-glow">
          Reputation: {payload[0].value}
        </p>
        {payload[1] && (
          <p className="text-xs text-terminal-muted">
            Tasks: {payload[1].value}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export function ReputationChart({ data }: ReputationChartProps) {
  const latestRep = data[data.length - 1]?.reputation || 0;
  const previousRep = data[data.length - 2]?.reputation || 0;
  const change = latestRep - previousRep;
  const percentChange = previousRep > 0 ? ((change / previousRep) * 100).toFixed(1) : "0";

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-terminal-glow/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-terminal-glow" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Reputation Growth
            </h2>
            <p className="text-xs text-terminal-muted">
              Performance over time
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-terminal-border/50">
          <Calendar className="w-4 h-4 text-terminal-muted" />
          <span className="text-xs text-terminal-muted">Last 7 days</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-6">
        <div>
          <p className="text-3xl font-bold text-white">{latestRep}</p>
          <p className="text-xs text-terminal-muted">Current Score</p>
        </div>
        <div className={[
          "flex items-center gap-1 px-2 py-1 rounded-md text-sm",
          change >= 0 ? "bg-success/10 text-success" : "bg-intercepted/10 text-intercepted"
        ].join(" ")}>
          <TrendingUp className={[
            "w-4 h-4",
            change < 0 ? "rotate-180" : ""
          ].join(" ")} />
          <span>{change >= 0 ? "+" : ""}{percentChange}%</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#39ff14" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#39ff14" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 10 }}
              domain={["dataMin - 10", "dataMax + 10"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="reputation"
              stroke="#39ff14"
              strokeWidth={2}
              fill="url(#colorRep)"
              dot={{
                fill: "#39ff14",
                strokeWidth: 0,
                r: 3,
              }}
              activeDot={{
                fill: "#39ff14",
                strokeWidth: 2,
                stroke: "#fff",
                r: 5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
