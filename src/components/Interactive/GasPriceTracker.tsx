"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Fuel,
  TrendingUp,
  TrendingDown,
  Minus,
  Bell,
  BellOff,
  Clock,
  Zap,
  AlertCircle,
} from "lucide-react";

interface GasData {
  slow: number;
  standard: number;
  fast: number;
  instant: number;
  timestamp: Date;
}

interface GasHistory {
  time: string;
  value: number;
}

const generateGasPrice = (base: number, variance: number) => {
  return Math.max(5, base + (Math.random() - 0.5) * variance);
};

const getGasRecommendation = (gas: number): { text: string; color: string; icon: React.ReactNode } => {
  if (gas < 15) {
    return {
      text: "Excellent time to transact!",
      color: "text-green-400",
      icon: <TrendingDown className="w-4 h-4" />,
    };
  } else if (gas < 30) {
    return {
      text: "Good conditions for transactions",
      color: "text-terminal-glow",
      icon: <Minus className="w-4 h-4" />,
    };
  } else if (gas < 50) {
    return {
      text: "Moderate gas - consider waiting",
      color: "text-yellow-400",
      icon: <TrendingUp className="w-4 h-4" />,
    };
  } else {
    return {
      text: "High gas - wait if not urgent",
      color: "text-red-400",
      icon: <AlertCircle className="w-4 h-4" />,
    };
  }
};

export function GasPriceTracker() {
  const [gasData, setGasData] = useState<GasData>({
    slow: 12,
    standard: 15,
    fast: 20,
    instant: 25,
    timestamp: new Date(),
  });
  const [history, setHistory] = useState<GasHistory[]>([]);
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState(20);
  const [trend, setTrend] = useState<"up" | "down" | "stable">("stable");

  // Initialize history
  useEffect(() => {
    const initialHistory: GasHistory[] = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 5 * 60 * 1000);
      initialHistory.push({
        time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        value: generateGasPrice(18, 10),
      });
    }
    setHistory(initialHistory);
  }, []);

  // Update gas prices periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setGasData((prev) => {
        const newStandard = generateGasPrice(prev.standard, 5);
        const newData = {
          slow: generateGasPrice(newStandard * 0.8, 2),
          standard: newStandard,
          fast: generateGasPrice(newStandard * 1.3, 3),
          instant: generateGasPrice(newStandard * 1.6, 4),
          timestamp: new Date(),
        };

        // Determine trend
        if (newStandard > prev.standard + 2) {
          setTrend("up");
        } else if (newStandard < prev.standard - 2) {
          setTrend("down");
        } else {
          setTrend("stable");
        }

        return newData;
      });

      // Update history
      setHistory((prev) => {
        const newHistory = [...prev.slice(1)];
        newHistory.push({
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          value: gasData.standard,
        });
        return newHistory;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [gasData.standard]);

  const recommendation = getGasRecommendation(gasData.standard);
  const maxHistory = Math.max(...history.map((h) => h.value), 1);

  const gasTiers = [
    { label: "Slow", value: gasData.slow, time: "~10 min", color: "bg-blue-500" },
    { label: "Standard", value: gasData.standard, time: "~3 min", color: "bg-terminal-glow" },
    { label: "Fast", value: gasData.fast, time: "~1 min", color: "bg-orange-500" },
    { label: "Instant", value: gasData.instant, time: "~15 sec", color: "bg-red-500" },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fuel className="w-5 h-5 text-terminal-glow" />
            <h3 className="font-semibold text-white">Gas Price Tracker</h3>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-green-500/20 text-green-400 border border-green-500/30">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              LIVE
            </span>
          </div>
          <button
            onClick={() => setAlertEnabled(!alertEnabled)}
            className={`p-2 rounded-lg transition-colors ${
              alertEnabled ? "bg-terminal-glow/20 text-terminal-glow" : "text-zinc-500 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {alertEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Gas Display */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <motion.span
                key={gasData.standard}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl font-bold text-white"
              >
                {gasData.standard.toFixed(0)}
              </motion.span>
              <span className="text-lg text-zinc-500">gwei</span>
              {trend === "up" && <TrendingUp className="w-5 h-5 text-red-400" />}
              {trend === "down" && <TrendingDown className="w-5 h-5 text-green-400" />}
              {trend === "stable" && <Minus className="w-5 h-5 text-zinc-500" />}
            </div>
            <div className={`flex items-center gap-1 mt-1 text-sm ${recommendation.color}`}>
              {recommendation.icon}
              {recommendation.text}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500">Last updated</p>
            <p className="text-sm text-white">
              {gasData.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </p>
          </div>
        </div>

        {/* Gas Tiers */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {gasTiers.map((tier) => (
            <div key={tier.label} className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-center">
              <div className={`w-2 h-2 rounded-full ${tier.color} mx-auto mb-1`} />
              <p className="text-lg font-bold text-white">{tier.value.toFixed(0)}</p>
              <p className="text-[10px] text-zinc-500">{tier.label}</p>
              <p className="text-[10px] text-zinc-600 flex items-center justify-center gap-0.5">
                <Clock className="w-2.5 h-2.5" />
                {tier.time}
              </p>
            </div>
          ))}
        </div>

        {/* Mini Chart */}
        <div className="mb-4">
          <p className="text-xs text-zinc-500 mb-2">Last hour</p>
          <div className="flex items-end gap-1 h-16">
            {history.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${(h.value / maxHistory) * 100}%` }}
                className="flex-1 bg-terminal-glow/30 rounded-t hover:bg-terminal-glow/50 transition-colors relative group"
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {h.value.toFixed(0)} gwei
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Alert Settings */}
        {alertEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-3 rounded-xl bg-terminal-glow/10 border border-terminal-glow/30"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-300">Alert when gas below</span>
              <span className="text-sm font-bold text-terminal-glow">{alertThreshold} gwei</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-terminal-glow"
            />
            <p className="text-[10px] text-zinc-500 mt-2 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              You&apos;ll be notified when gas drops below threshold
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>Ethereum Mainnet</span>
          <span>Updates every 5s</span>
        </div>
      </div>
    </div>
  );
}
