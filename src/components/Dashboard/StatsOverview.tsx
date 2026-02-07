"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Globe,
  Wallet,
  Clock,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  subtitle?: string;
}

function StatCard({ title, value, change, changeType, icon: Icon, color, subtitle }: StatCardProps) {
  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" },
  };

  const colors = colorClasses[color] || colorClasses.green;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border ${colors.border} bg-zinc-900/50 hover:bg-zinc-900/80 transition-all`}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.text}`} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] sm:text-xs ${
          changeType === "positive" ? "text-green-400" :
          changeType === "negative" ? "text-red-400" : "text-zinc-500"
        }`}>
          {changeType === "positive" ? <TrendingUp className="w-3 h-3" /> :
           changeType === "negative" ? <TrendingDown className="w-3 h-3" /> : null}
          {change}
        </div>
      </div>
      <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 sm:mb-1">{value}</p>
      <p className="text-xs sm:text-sm text-zinc-500">{title}</p>
      {subtitle && <p className="text-[10px] sm:text-xs text-zinc-600 mt-0.5 sm:mt-1 hidden sm:block">{subtitle}</p>}
    </motion.div>
  );
}

interface StatsOverviewProps {
  stats?: {
    totalActions: number;
    successRate: number;
    activeWorkflows: number;
    totalValue: string;
    avgResponseTime: string;
    platformsConnected: number;
  };
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const defaultStats = {
    totalActions: 1247,
    successRate: 94.2,
    activeWorkflows: 12,
    totalValue: "2.45 ETH",
    avgResponseTime: "1.2s",
    platformsConnected: 8,
  };

  const data = stats || defaultStats;

  const statCards: StatCardProps[] = [
    {
      title: "Total Actions",
      value: data.totalActions.toLocaleString(),
      change: "+127 this week",
      changeType: "positive",
      icon: Activity,
      color: "green",
      subtitle: "Across all platforms",
    },
    {
      title: "Success Rate",
      value: `${data.successRate}%`,
      change: "+1.2%",
      changeType: "positive",
      icon: TrendingUp,
      color: "blue",
      subtitle: "Last 30 days",
    },
    {
      title: "Active Workflows",
      value: data.activeWorkflows.toString(),
      change: "+3 new",
      changeType: "positive",
      icon: Zap,
      color: "purple",
      subtitle: "Running automatically",
    },
    {
      title: "Portfolio Value",
      value: data.totalValue,
      change: "+0.12 ETH",
      changeType: "positive",
      icon: Wallet,
      color: "amber",
      subtitle: "Connected wallets",
    },
    {
      title: "Avg Response Time",
      value: data.avgResponseTime,
      change: "-0.3s",
      changeType: "positive",
      icon: Clock,
      color: "cyan",
      subtitle: "Command to action",
    },
    {
      title: "Platforms Connected",
      value: data.platformsConnected.toString(),
      change: "2 pending",
      changeType: "neutral",
      icon: Globe,
      color: "green",
      subtitle: "Web2, Web3, Moltworld",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
}
