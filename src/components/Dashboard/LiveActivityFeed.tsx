"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Trash2,
  Terminal,
  Zap,
  Wallet,
  Bell,
  Settings,
} from "lucide-react";
import { useDashboard, Activity } from "@/context/DashboardContext";

const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  success: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10" },
  info: { icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10" },
  warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10" },
  error: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
};

const typeIcons: Record<string, typeof Terminal> = {
  command: Terminal,
  workflow: Zap,
  transaction: Wallet,
  alert: Bell,
  system: Settings,
};

function formatTimeAgo(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((new Date().getTime() - dateObj.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

interface ActivityItemProps {
  activity: Activity;
  isNew?: boolean;
}

function ActivityItem({ activity, isNew }: ActivityItemProps) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[activity.status] || statusConfig.info;
  const StatusIcon = status.icon;
  const TypeIcon = typeIcons[activity.type] || Terminal;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all ${
        isNew ? "ring-1 ring-terminal-glow/50" : ""
      }`}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        {/* Status Icon */}
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${status.bg} flex items-center justify-center flex-shrink-0`}>
          <StatusIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${status.color}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="font-medium text-white text-sm sm:text-base truncate">{activity.title}</h4>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5 truncate">{activity.description}</p>
            </div>
            <span className="text-[10px] sm:text-xs text-zinc-600 whitespace-nowrap">
              {formatTimeAgo(activity.timestamp)}
            </span>
          </div>

          {/* Type Badge */}
          <div className="flex items-center gap-2 mt-2 sm:mt-3">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-800/50 text-zinc-400">
              <TypeIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="text-[10px] sm:text-xs capitalize">{activity.type}</span>
            </div>
            {activity.metadata && Object.keys(activity.metadata).length > 0 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-[10px] sm:text-xs text-zinc-500 hover:text-white transition-colors"
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
                Details
              </button>
            )}
          </div>

          {/* Expandable Details */}
          <AnimatePresence>
            {expanded && activity.metadata && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-zinc-800"
              >
                <div className="space-y-1">
                  {Object.entries(activity.metadata).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500 capitalize">{key}</span>
                      {key.includes("hash") || key.includes("tx") ? (
                        <a
                          href={`https://etherscan.io/tx/${value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-terminal-glow hover:underline"
                        >
                          {value.slice(0, 8)}...{value.slice(-6)}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-zinc-300">{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function LiveActivityFeed() {
  const { activities, clearActivities } = useDashboard();
  const [filter, setFilter] = useState<"all" | "success" | "warning" | "error" | "info">("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [, setTick] = useState(0);

  // Update timestamps periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const filteredActivities = filter === "all"
    ? activities
    : activities.filter((a) => a.status === filter);

  return (
    <div className="rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 sm:gap-3">
          <h3 className="font-semibold text-white text-sm sm:text-base">Live Activity</h3>
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-terminal-glow"
            />
            <span className="text-[10px] sm:text-xs text-zinc-500">{activities.length} events</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Filter - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-zinc-800/50">
            {(["all", "success", "info", "warning", "error"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  filter === status
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="sm:hidden px-2 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-white"
          >
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>

          {/* Clear */}
          {activities.length > 0 && (
            <button
              onClick={clearActivities}
              className="p-1.5 sm:p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Refresh */}
          <button
            onClick={handleRefresh}
            className="p-1.5 sm:p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800/50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Activity List */}
      <div className="p-2 sm:p-4 space-y-2 sm:space-y-3 max-h-[400px] sm:max-h-[500px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filteredActivities.map((activity, index) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              isNew={index === 0}
            />
          ))}
        </AnimatePresence>

        {filteredActivities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-zinc-500 text-sm">No activities yet</p>
            <p className="text-zinc-600 text-xs mt-1">Activities will appear here when you execute commands</p>
          </div>
        )}
      </div>
    </div>
  );
}
