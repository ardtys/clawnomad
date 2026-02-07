"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Zap, Users, TrendingUp, Globe, Shield } from "lucide-react";

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
  increment: number;
  interval: number;
}

const initialStats: StatItem[] = [
  {
    id: "actions",
    label: "Actions Executed",
    value: 1847293,
    suffix: "+",
    icon: <Zap className="w-5 h-5" />,
    color: "text-terminal-glow",
    increment: 7,
    interval: 100,
  },
  {
    id: "eth",
    label: "ETH Bridged",
    value: 4521,
    suffix: " ETH",
    icon: <Globe className="w-5 h-5" />,
    color: "text-purple-400",
    increment: 0.1,
    interval: 2000,
  },
  {
    id: "agents",
    label: "Active Agents",
    value: 2847,
    suffix: "",
    icon: <Users className="w-5 h-5" />,
    color: "text-blue-400",
    increment: 1,
    interval: 5000,
  },
  {
    id: "uptime",
    label: "Uptime",
    value: 99.98,
    suffix: "%",
    icon: <Shield className="w-5 h-5" />,
    color: "text-green-400",
    increment: 0,
    interval: 0,
  },
  {
    id: "platforms",
    label: "Platforms",
    value: 15,
    suffix: "+",
    icon: <Activity className="w-5 h-5" />,
    color: "text-orange-400",
    increment: 0,
    interval: 0,
  },
  {
    id: "saved",
    label: "Hours Saved",
    value: 89432,
    suffix: "h",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-cyan-400",
    increment: 2,
    interval: 1000,
  },
];

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toFixed(num % 1 === 0 ? 0 : 2);
}

export function LiveStatsCounter() {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    initialStats.forEach((stat, index) => {
      if (stat.increment > 0 && stat.interval > 0) {
        const interval = setInterval(() => {
          setStats((prev) =>
            prev.map((s, i) =>
              i === index
                ? { ...s, value: s.value + s.increment * (0.5 + Math.random()) }
                : s
            )
          );
        }, stat.interval);
        intervals.push(interval);
      }
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Activity className="w-5 h-5 text-terminal-glow" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <h3 className="font-semibold text-white">Live Network Stats</h3>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 ml-auto">
            LIVE
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors"
          >
            <div className={`${stat.color} mb-2`}>{stat.icon}</div>
            <div className="flex items-baseline gap-1">
              <motion.span
                key={stat.value}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className={`text-2xl font-bold ${stat.color}`}
              >
                {formatNumber(stat.value)}
              </motion.span>
              <span className="text-sm text-zinc-500">{stat.suffix}</span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>Updated in real-time</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            All systems operational
          </span>
        </div>
      </div>
    </div>
  );
}
