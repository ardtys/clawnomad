"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/Dashboard";
import {
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Download,
  Calendar,
  Search,
  ChevronDown,
  ExternalLink,
  Mail,
  Wallet,
  MessageSquare,
  TrendingUp,
  Shield,
  RefreshCw,
} from "lucide-react";

type ActivityStatus = "success" | "pending" | "warning" | "failed";
type PlatformType = "web2" | "web3" | "moltworld";

interface ActivityItem {
  id: string;
  action: string;
  description: string;
  status: ActivityStatus;
  timestamp: Date;
  source: { platform: PlatformType; name: string };
  destination: { platform: PlatformType; name: string };
  txHash?: string;
  value?: string;
  category: string;
}

const statusConfig: Record<ActivityStatus, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
  success: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10", label: "Success" },
  pending: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", label: "Pending" },
  warning: { icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-500/10", label: "Warning" },
  failed: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10", label: "Failed" },
};

const platformColors: Record<PlatformType, string> = {
  web2: "text-blue-400",
  web3: "text-purple-400",
  moltworld: "text-green-400",
};

const platformIcons: Record<string, typeof Mail> = {
  Gmail: Mail,
  Wallet: Wallet,
  Moltbook: MessageSquare,
  Calendar: Calendar,
  Uniswap: TrendingUp,
  MetaMask: Wallet,
  Vault: Shield,
};

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    action: "Token Swap Executed",
    description: "Swapped 0.5 ETH for 1,247 USDC on Uniswap",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    source: { platform: "moltworld", name: "Moltbook" },
    destination: { platform: "web3", name: "Uniswap" },
    txHash: "0x1234567890abcdef1234567890abcdef12345678",
    value: "0.5 ETH",
    category: "Trading",
  },
  {
    id: "2",
    action: "Sentiment Analysis Complete",
    description: "Analyzed 847 posts for market sentiment",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    source: { platform: "moltworld", name: "Moltbook" },
    destination: { platform: "web3", name: "Vault" },
    category: "Research",
  },
  {
    id: "3",
    action: "Newsletter Draft Ready",
    description: "Weekly crypto insights compiled and awaiting review",
    status: "pending",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    source: { platform: "moltworld", name: "Moltbook" },
    destination: { platform: "web2", name: "Gmail" },
    category: "Communication",
  },
  {
    id: "4",
    action: "Bridge Transaction Blocked",
    description: "Daily spending limit exceeded - manual approval required",
    status: "warning",
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    source: { platform: "web3", name: "Wallet" },
    destination: { platform: "web3", name: "MetaMask" },
    txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    value: "0.1 ETH",
    category: "Trading",
  },
  {
    id: "5",
    action: "Calendar Sync Complete",
    description: "Synced 12 events with Moltworld schedule",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    source: { platform: "web2", name: "Calendar" },
    destination: { platform: "moltworld", name: "Moltbook" },
    category: "Sync",
  },
  {
    id: "6",
    action: "Price Alert Triggered",
    description: "ETH crossed $3,000 threshold",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    source: { platform: "web3", name: "Uniswap" },
    destination: { platform: "moltworld", name: "Moltbook" },
    category: "Alerts",
  },
  {
    id: "7",
    action: "Auto-compound Failed",
    description: "Insufficient gas for transaction",
    status: "failed",
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    source: { platform: "web3", name: "Vault" },
    destination: { platform: "web3", name: "Uniswap" },
    txHash: "0x9876543210fedcba9876543210fedcba98765432",
    category: "DeFi",
  },
  {
    id: "8",
    action: "Daily Report Generated",
    description: "Portfolio performance report for March 15",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    source: { platform: "moltworld", name: "Moltbook" },
    destination: { platform: "web2", name: "Gmail" },
    category: "Reports",
  },
];

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function ActivityPage() {
  const [filter, setFilter] = useState<"all" | ActivityStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = ["all", ...Array.from(new Set(mockActivities.map((a) => a.category)))];

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesStatus = filter === "all" || activity.status === filter;
    const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter;
    const matchesSearch = activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const stats = {
    total: mockActivities.length,
    success: mockActivities.filter((a) => a.status === "success").length,
    pending: mockActivities.filter((a) => a.status === "pending").length,
    failed: mockActivities.filter((a) => a.status === "failed").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Activity Log</h1>
            <p className="text-zinc-500 mt-1">Track all agent actions and transactions</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Actions", value: stats.total, color: "blue" },
            { label: "Successful", value: stats.success, color: "green" },
            { label: "Pending", value: stats.pending, color: "amber" },
            { label: "Failed", value: stats.failed, color: "red" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border border-${stat.color}-500/20 bg-${stat.color}-500/5`}
            >
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-zinc-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-terminal-glow/50"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-800/50">
            {(["all", "success", "pending", "warning", "failed"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  filter === status
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-terminal-glow/50"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>

        {/* Activity List */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
          <div className="divide-y divide-zinc-800">
            {filteredActivities.map((activity, index) => {
              const status = statusConfig[activity.status];
              const StatusIcon = status.icon;
              const SourceIcon = platformIcons[activity.source.name] || Activity;
              const DestIcon = platformIcons[activity.destination.name] || Activity;

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div className={`w-10 h-10 rounded-lg ${status.bg} flex items-center justify-center flex-shrink-0`}>
                      <StatusIcon className={`w-5 h-5 ${status.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-white">{activity.action}</h4>
                          <p className="text-sm text-zinc-500 mt-0.5">{activity.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs text-zinc-600">{formatTimeAgo(activity.timestamp)}</span>
                          <span className={`block text-xs mt-1 px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>

                      {/* Platform Flow */}
                      <div className="flex items-center gap-2 mt-3">
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-800/50 ${platformColors[activity.source.platform]}`}>
                          <SourceIcon className="w-3.5 h-3.5" />
                          <span className="text-xs">{activity.source.name}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-600" />
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-800/50 ${platformColors[activity.destination.platform]}`}>
                          <DestIcon className="w-3.5 h-3.5" />
                          <span className="text-xs">{activity.destination.name}</span>
                        </div>
                        {activity.value && (
                          <span className="text-xs text-zinc-400 ml-auto">{activity.value}</span>
                        )}
                        {activity.txHash && (
                          <a
                            href={`https://etherscan.io/tx/${activity.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-terminal-glow hover:underline ml-2"
                          >
                            View TX
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredActivities.length === 0 && (
            <div className="p-8 text-center">
              <Activity className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-500">No activities found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
