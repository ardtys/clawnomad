"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/Dashboard";
import { ReputationChart } from "@/components/ReputationChart";
import {
  History,
  TrendingUp,
  TrendingDown,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Wallet,
  ArrowRightLeft,
  Search,
  BarChart3,
} from "lucide-react";

interface HistoryItem {
  id: string;
  date: Date;
  type: "transaction" | "action" | "workflow";
  title: string;
  description: string;
  status: "success" | "failed" | "pending";
  value?: string;
  txHash?: string;
  reputationChange?: number;
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    date: new Date(Date.now() - 1000 * 60 * 30),
    type: "transaction",
    title: "Token Swap",
    description: "Swapped 0.5 ETH for 1,247 USDC on Uniswap",
    status: "success",
    value: "0.5 ETH",
    txHash: "0x1234...5678",
    reputationChange: 5,
  },
  {
    id: "2",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    type: "action",
    title: "Sentiment Analysis",
    description: "Analyzed 847 Moltbook posts for market sentiment",
    status: "success",
    reputationChange: 3,
  },
  {
    id: "3",
    date: new Date(Date.now() - 1000 * 60 * 60 * 4),
    type: "workflow",
    title: "Daily Market Digest",
    description: "Generated and sent daily market summary",
    status: "success",
    reputationChange: 2,
  },
  {
    id: "4",
    date: new Date(Date.now() - 1000 * 60 * 60 * 6),
    type: "transaction",
    title: "Bridge Transaction",
    description: "Attempted bridge to Base network",
    status: "failed",
    value: "0.1 ETH",
    reputationChange: -2,
  },
  {
    id: "5",
    date: new Date(Date.now() - 1000 * 60 * 60 * 12),
    type: "action",
    title: "Price Alert",
    description: "ETH crossed $3,000 threshold",
    status: "success",
    reputationChange: 1,
  },
  {
    id: "6",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    type: "workflow",
    title: "Auto-compound",
    description: "Automatically compounded staking rewards",
    status: "success",
    value: "0.02 ETH",
    reputationChange: 4,
  },
  {
    id: "7",
    date: new Date(Date.now() - 1000 * 60 * 60 * 36),
    type: "transaction",
    title: "Token Transfer",
    description: "Sent 100 USDC to 0xabcd...efgh",
    status: "success",
    value: "100 USDC",
    txHash: "0xabcd...efgh",
    reputationChange: 2,
  },
  {
    id: "8",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48),
    type: "action",
    title: "Calendar Sync",
    description: "Synced 8 events with Google Calendar",
    status: "success",
    reputationChange: 1,
  },
];

const chartData = [
  { date: "Mon", reputation: 780, tasks: 12 },
  { date: "Tue", reputation: 795, tasks: 15 },
  { date: "Wed", reputation: 810, tasks: 18 },
  { date: "Thu", reputation: 805, tasks: 14 },
  { date: "Fri", reputation: 830, tasks: 22 },
  { date: "Sat", reputation: 840, tasks: 19 },
  { date: "Sun", reputation: 847, tasks: 16 },
];

const monthlyStats = [
  { month: "Jan", actions: 245, success: 238 },
  { month: "Feb", actions: 312, success: 298 },
  { month: "Mar", actions: 287, success: 271 },
];

const statusConfig = {
  success: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10" },
  failed: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
  pending: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
};

const typeConfig = {
  transaction: { icon: Wallet, color: "text-purple-400", bg: "bg-purple-500/10" },
  action: { icon: ArrowRightLeft, color: "text-blue-400", bg: "bg-blue-500/10" },
  workflow: { icon: Clock, color: "text-cyan-400", bg: "bg-cyan-500/10" },
};

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  if (hours < 48) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export default function HistoryPage() {
  const [filter, setFilter] = useState<"all" | "transaction" | "action" | "workflow">("all");
  const [dateRange, setDateRange] = useState("7d");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = mockHistory.filter((item) => {
    const matchesFilter = filter === "all" || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    totalActions: mockHistory.length,
    successRate: ((mockHistory.filter((h) => h.status === "success").length / mockHistory.length) * 100).toFixed(1),
    reputationGained: mockHistory.reduce((acc, h) => acc + (h.reputationChange || 0), 0),
    currentReputation: 847,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">History & Analytics</h1>
            <p className="text-zinc-500 mt-1">Track your agent&apos;s performance and reputation over time</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-terminal-glow/50"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Current Reputation", value: stats.currentReputation, icon: TrendingUp, change: "+12 this week", positive: true },
            { label: "Total Actions", value: stats.totalActions, icon: History, change: "+8 today", positive: true },
            { label: "Success Rate", value: `${stats.successRate}%`, icon: CheckCircle2, change: "+2.1%", positive: true },
            { label: "Reputation Gained", value: `+${stats.reputationGained}`, icon: BarChart3, change: "This period", positive: true },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-terminal-glow/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-terminal-glow" />
                </div>
                <span className={`text-xs ${stat.positive ? "text-green-400" : "text-red-400"}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-zinc-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Reputation Chart */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Reputation Trend</h3>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="w-3 h-3 rounded-full bg-terminal-glow" />
                Reputation
              </div>
            </div>
            <ReputationChart data={chartData} />
          </div>

          {/* Monthly Performance */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Monthly Performance</h3>
            </div>
            <div className="space-y-4">
              {monthlyStats.map((month) => (
                <div key={month.month}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white">{month.month}</span>
                    <span className="text-zinc-500">{month.success}/{month.actions} successful</span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-terminal-glow"
                      style={{ width: `${(month.success / month.actions) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-terminal-glow/50"
            />
          </div>
          <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-800/50">
            {(["all", "transaction", "action", "workflow"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  filter === type
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* History List */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
          <div className="divide-y divide-zinc-800">
            {filteredHistory.map((item, index) => {
              const status = statusConfig[item.status];
              const type = typeConfig[item.type];
              const StatusIcon = status.icon;
              const TypeIcon = type.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Type Icon */}
                    <div className={`w-10 h-10 rounded-lg ${type.bg} flex items-center justify-center flex-shrink-0`}>
                      <TypeIcon className={`w-5 h-5 ${type.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white">{item.title}</h4>
                            <StatusIcon className={`w-4 h-4 ${status.color}`} />
                          </div>
                          <p className="text-sm text-zinc-500 mt-0.5">{item.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs text-zinc-600">{formatDate(item.date)}</span>
                          {item.reputationChange !== undefined && (
                            <div className={`flex items-center gap-1 mt-1 justify-end ${
                              item.reputationChange >= 0 ? "text-green-400" : "text-red-400"
                            }`}>
                              {item.reputationChange >= 0 ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              <span className="text-xs">
                                {item.reputationChange >= 0 ? "+" : ""}{item.reputationChange} rep
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-4 mt-2">
                        {item.value && (
                          <span className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-400">
                            {item.value}
                          </span>
                        )}
                        {item.txHash && (
                          <a
                            href={`https://etherscan.io/tx/${item.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-terminal-glow hover:underline"
                          >
                            {item.txHash}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredHistory.length === 0 && (
            <div className="p-8 text-center">
              <History className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-500">No history found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
