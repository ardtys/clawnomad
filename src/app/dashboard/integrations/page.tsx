"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/Dashboard";
import {
  Layers,
  Plus,
  Check,
  X,
  Settings,
  Trash2,
  RefreshCw,
  Search,
  Globe,
  Hexagon,
  Sparkles,
  Mail,
  Calendar,
  MessageSquare,
  Wallet,
  TrendingUp,
  Database,
  Cloud,
  Zap,
} from "lucide-react";

type IntegrationStatus = "connected" | "disconnected" | "pending";
type IntegrationCategory = "web2" | "web3" | "moltworld";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: typeof Layers;
  category: IntegrationCategory;
  status: IntegrationStatus;
  lastSync?: Date;
  permissions: string[];
  color: string;
}

const mockIntegrations: Integration[] = [
  {
    id: "1",
    name: "Gmail",
    description: "Send and manage emails through your agent",
    icon: Mail,
    category: "web2",
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 5),
    permissions: ["Read emails", "Send emails", "Manage drafts"],
    color: "red",
  },
  {
    id: "2",
    name: "Google Calendar",
    description: "Schedule and manage calendar events",
    icon: Calendar,
    category: "web2",
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 30),
    permissions: ["Read events", "Create events", "Modify events"],
    color: "blue",
  },
  {
    id: "3",
    name: "MetaMask",
    description: "Connect your Ethereum wallet for transactions",
    icon: Wallet,
    category: "web3",
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 2),
    permissions: ["View balance", "Sign transactions", "Read addresses"],
    color: "orange",
  },
  {
    id: "4",
    name: "Uniswap",
    description: "Execute token swaps on Ethereum",
    icon: TrendingUp,
    category: "web3",
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 15),
    permissions: ["Execute swaps", "View liquidity", "Price quotes"],
    color: "pink",
  },
  {
    id: "5",
    name: "Moltbook",
    description: "Access Moltworld social and sentiment data",
    icon: MessageSquare,
    category: "moltworld",
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 1),
    permissions: ["Read posts", "Analyze sentiment", "Follow users"],
    color: "green",
  },
  {
    id: "6",
    name: "Aave",
    description: "Lending and borrowing protocol",
    icon: Database,
    category: "web3",
    status: "disconnected",
    permissions: ["Deposit", "Borrow", "Repay"],
    color: "purple",
  },
  {
    id: "7",
    name: "Notion",
    description: "Create and manage documents",
    icon: Cloud,
    category: "web2",
    status: "pending",
    permissions: ["Read pages", "Create pages", "Edit content"],
    color: "gray",
  },
  {
    id: "8",
    name: "Chainlink",
    description: "Oracle price feeds and automation",
    icon: Zap,
    category: "web3",
    status: "disconnected",
    permissions: ["Read price feeds", "Automation triggers"],
    color: "blue",
  },
];

const statusConfig = {
  connected: { label: "Connected", color: "text-green-400", bg: "bg-green-500/10", icon: Check },
  disconnected: { label: "Disconnected", color: "text-zinc-400", bg: "bg-zinc-500/10", icon: X },
  pending: { label: "Pending", color: "text-amber-400", bg: "bg-amber-500/10", icon: RefreshCw },
};

const categoryConfig = {
  web2: { label: "Web2", color: "text-blue-400", bg: "bg-blue-500/10", icon: Globe },
  web3: { label: "Web3", color: "text-purple-400", bg: "bg-purple-500/10", icon: Hexagon },
  moltworld: { label: "Moltworld", color: "text-green-400", bg: "bg-green-500/10", icon: Sparkles },
};

const colorClasses: Record<string, { bg: string; text: string }> = {
  red: { bg: "bg-red-500/10", text: "text-red-400" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-400" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-400" },
  green: { bg: "bg-green-500/10", text: "text-green-400" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400" },
  gray: { bg: "bg-zinc-500/10", text: "text-zinc-400" },
};

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function IntegrationsPage() {
  const [integrations] = useState(mockIntegrations);
  const [categoryFilter, setCategoryFilter] = useState<"all" | IntegrationCategory>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | IntegrationStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIntegrations = integrations.filter((int) => {
    const matchesCategory = categoryFilter === "all" || int.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || int.status === statusFilter;
    const matchesSearch = int.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      int.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const stats = {
    total: integrations.length,
    connected: integrations.filter((i) => i.status === "connected").length,
    web2: integrations.filter((i) => i.category === "web2").length,
    web3: integrations.filter((i) => i.category === "web3").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Integrations</h1>
            <p className="text-zinc-500 mt-1">Connect your agent to external platforms and services</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-glow text-zinc-900 font-medium hover:bg-lime-400 transition-colors">
            <Plus className="w-4 h-4" />
            Add Integration
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Integrations", value: stats.total, icon: Layers },
            { label: "Connected", value: stats.connected, icon: Check },
            { label: "Web2 Apps", value: stats.web2, icon: Globe },
            { label: "Web3 Protocols", value: stats.web3, icon: Hexagon },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-terminal-glow/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-terminal-glow" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-zinc-500">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-terminal-glow/50"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-800/50">
            {(["all", "web2", "web3", "moltworld"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-800/50">
            {(["all", "connected", "disconnected"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  statusFilter === status
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Integration Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredIntegrations.map((integration, index) => {
            const status = statusConfig[integration.status];
            const category = categoryConfig[integration.category];
            const colors = colorClasses[integration.color];
            const StatusIcon = status.icon;
            const Icon = integration.icon;

            return (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">{integration.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${category.bg} ${category.color}`}>
                            {category.label}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-500 mt-1">{integration.description}</p>
                      </div>

                      {/* Status */}
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${status.bg}`}>
                        <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
                        <span className={`text-xs ${status.color}`}>{status.label}</span>
                      </div>
                    </div>

                    {/* Permissions */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {integration.permissions.slice(0, 3).map((perm) => (
                        <span
                          key={perm}
                          className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-400"
                        >
                          {perm}
                        </span>
                      ))}
                      {integration.permissions.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-500">
                          +{integration.permissions.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800">
                      {integration.lastSync ? (
                        <span className="text-xs text-zinc-500">
                          Last sync: {formatTimeAgo(integration.lastSync)}
                        </span>
                      ) : (
                        <span className="text-xs text-zinc-600">Not connected</span>
                      )}

                      <div className="flex items-center gap-2">
                        {integration.status === "connected" ? (
                          <>
                            <button className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
                              <Settings className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button className="px-3 py-1.5 rounded-lg bg-terminal-glow/10 text-terminal-glow text-xs font-medium hover:bg-terminal-glow/20 transition-colors">
                            Connect
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredIntegrations.length === 0 && (
          <div className="p-8 text-center rounded-xl border border-zinc-800 bg-zinc-900/30">
            <Layers className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-500">No integrations found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
