"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Zap,
  Mail,
  Calendar,
  TrendingUp,
  Shield,
  Globe,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

type ActivityType = "swap" | "email" | "calendar" | "sentiment" | "security" | "bridge" | "alert";
type ActivityStatus = "success" | "pending" | "warning";

interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  detail: string;
  status: ActivityStatus;
  timestamp: Date;
  platform: "web2" | "web3" | "moltworld";
}

const activityTemplates: Omit<ActivityItem, "id" | "timestamp">[] = [
  { type: "swap", message: "Swapped 0.5 ETH → 925 USDC", detail: "Uniswap V3 • Gas: 12 gwei", status: "success", platform: "web3" },
  { type: "sentiment", message: "Moltworld sentiment: 72% bullish", detail: "Analyzed 1,234 posts", status: "success", platform: "moltworld" },
  { type: "email", message: "Newsletter draft saved", detail: "Weekly digest • 523 words", status: "success", platform: "web2" },
  { type: "security", message: "Permission request blocked", detail: "Exceeded spending limit", status: "warning", platform: "web3" },
  { type: "calendar", message: "Meeting scheduled", detail: "Team sync • Tomorrow 2pm", status: "success", platform: "web2" },
  { type: "bridge", message: "Bridged 0.25 ETH to Base", detail: "LayerZero • ~2 min", status: "pending", platform: "web3" },
  { type: "alert", message: "Price alert triggered", detail: "$CLAW +15% in 1 hour", status: "success", platform: "web3" },
  { type: "sentiment", message: "Sentiment shift detected", detail: "Bearish trend emerging", status: "warning", platform: "moltworld" },
  { type: "swap", message: "Swap queued", detail: "Waiting for gas < 15 gwei", status: "pending", platform: "web3" },
  { type: "email", message: "Email sent to subscribers", detail: "1,234 recipients", status: "success", platform: "web2" },
];

const typeIcons: Record<ActivityType, React.ReactNode> = {
  swap: <Zap className="w-4 h-4" />,
  email: <Mail className="w-4 h-4" />,
  calendar: <Calendar className="w-4 h-4" />,
  sentiment: <TrendingUp className="w-4 h-4" />,
  security: <Shield className="w-4 h-4" />,
  bridge: <Globe className="w-4 h-4" />,
  alert: <MessageSquare className="w-4 h-4" />,
};

const statusIcons: Record<ActivityStatus, React.ReactNode> = {
  success: <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />,
  pending: <Clock className="w-3.5 h-3.5 text-yellow-400" />,
  warning: <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />,
};

const platformColors: Record<string, string> = {
  web2: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  web3: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  moltworld: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Initialize with some activities
    const initialActivities: ActivityItem[] = activityTemplates.slice(0, 4).map((template, i) => ({
      ...template,
      id: `init-${i}`,
      timestamp: new Date(Date.now() - (i + 1) * 15000),
    }));
    setActivities(initialActivities);

    // Add new activities periodically
    const interval = setInterval(() => {
      if (!isPaused) {
        const randomTemplate = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
        const newActivity: ActivityItem = {
          ...randomTemplate,
          id: `activity-${Date.now()}`,
          timestamp: new Date(),
        };

        setActivities((prev) => [newActivity, ...prev].slice(0, 10));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Update timestamps
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities((prev) => [...prev]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Activity className="w-5 h-5 text-terminal-glow" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <h3 className="font-semibold text-white">Live Agent Activity</h3>
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              isPaused
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                : "bg-green-500/20 text-green-400 border border-green-500/30"
            }`}
          >
            {isPaused ? "Paused" : "Live"}
          </button>
        </div>
        <p className="text-xs text-zinc-500 mt-1">Real-time activity from your autonomous agent</p>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-zinc-800/50 max-h-[400px] overflow-y-auto">
        <AnimatePresence initial={false}>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-3 hover:bg-zinc-800/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`p-2 rounded-lg ${
                  activity.status === "success" ? "bg-terminal-glow/10 text-terminal-glow" :
                  activity.status === "pending" ? "bg-yellow-500/10 text-yellow-400" :
                  "bg-orange-500/10 text-orange-400"
                }`}>
                  {typeIcons[activity.type]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-white truncate">
                      {activity.message}
                    </span>
                    {statusIcons[activity.status]}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>{activity.detail}</span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-zinc-500">{formatTimeAgo(activity.timestamp)}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${platformColors[activity.platform]}`}>
                    {activity.platform}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Stats */}
      <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="text-zinc-500">
              <span className="text-green-400 font-medium">{activities.filter(a => a.status === "success").length}</span> success
            </span>
            <span className="text-zinc-500">
              <span className="text-yellow-400 font-medium">{activities.filter(a => a.status === "pending").length}</span> pending
            </span>
            <span className="text-zinc-500">
              <span className="text-orange-400 font-medium">{activities.filter(a => a.status === "warning").length}</span> alerts
            </span>
          </div>
          <span className="text-zinc-500">{activities.length} activities</span>
        </div>
      </div>
    </div>
  );
}
