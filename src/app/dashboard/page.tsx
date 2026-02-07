"use client";

import { motion } from "framer-motion";
import {
  DashboardLayout,
  StatsOverview,
  LiveActivityFeed,
  QuickActions,
  CommandInput,
} from "@/components/Dashboard";
import { ReputationChart } from "@/components/ReputationChart";
import { VaultPermissions } from "@/components/VaultPermissions";
import { useDashboard } from "@/context/DashboardContext";
import {
  ChevronRight,
  TrendingUp,
  Zap,
  Shield,
  Play,
  Pause,
} from "lucide-react";
import Link from "next/link";

const mockChartData = [
  { date: "Mon", reputation: 780, tasks: 12 },
  { date: "Tue", reputation: 795, tasks: 15 },
  { date: "Wed", reputation: 810, tasks: 18 },
  { date: "Thu", reputation: 805, tasks: 14 },
  { date: "Fri", reputation: 830, tasks: 22 },
  { date: "Sat", reputation: 840, tasks: 19 },
  { date: "Sun", reputation: 847, tasks: 16 },
];

const announcements = [
  {
    id: 1,
    title: "New Integration: Aerodrome on Base",
    description: "Swap tokens on Base network with optimized routes",
    type: "feature",
  },
  {
    id: 2,
    title: "Security Update Available",
    description: "New encryption protocol for agent memory",
    type: "security",
  },
];

export default function DashboardPage() {
  const {
    permissions,
    updatePermission,
    workflows,
    toggleWorkflowStatus,
    stats,
  } = useDashboard();

  const handlePermissionChange = (id: string, enabled: boolean) => {
    updatePermission(id, { enabled });
  };

  const handleModeChange = (id: string, mode: "manual" | "autonomous") => {
    updatePermission(id, { mode });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-zinc-500 text-sm sm:text-base mt-0.5 sm:mt-1">Monitor and control your autonomous agent</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-terminal-glow/10 border border-terminal-glow/20"
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-terminal-glow animate-pulse" />
              <span className="text-xs sm:text-sm text-terminal-glow font-medium">Agent Active</span>
            </motion.div>
          </div>
        </div>

        {/* Announcements */}
        {announcements.length > 0 && (
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
            {announcements.map((announcement) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex-shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border ${
                  announcement.type === "security"
                    ? "bg-amber-500/5 border-amber-500/20"
                    : "bg-blue-500/5 border-blue-500/20"
                }`}
              >
                {announcement.type === "security" ? (
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                ) : (
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-white truncate max-w-[180px] sm:max-w-none">{announcement.title}</p>
                  <p className="text-[10px] sm:text-xs text-zinc-500 truncate max-w-[180px] sm:max-w-none">{announcement.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Overview */}
        <StatsOverview
          stats={{
            totalActions: stats.totalActions,
            successRate: stats.successRate,
            activeWorkflows: stats.activeWorkflows,
            totalValue: "2.45 ETH",
            avgResponseTime: "1.2s",
            platformsConnected: 8,
          }}
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Command & Activity */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Command Input */}
            <CommandInput />

            {/* Quick Actions */}
            <QuickActions />

            {/* Live Activity Feed */}
            <LiveActivityFeed />
          </div>

          {/* Right Column - Stats & Permissions */}
          <div className="space-y-4 sm:space-y-6">
            {/* Reputation Chart */}
            <div className="rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-terminal-glow" />
                  <h3 className="font-semibold text-white text-sm sm:text-base">Reputation Score</h3>
                </div>
                <Link
                  href="/dashboard/history"
                  className="text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  View history
                </Link>
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl font-bold text-white">847</span>
                  <span className="text-xs sm:text-sm text-terminal-glow">+12 this week</span>
                </div>
                <ReputationChart data={mockChartData} />
              </div>
            </div>

            {/* Vault & Permissions */}
            <div className="rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-terminal-glow" />
                  <h3 className="font-semibold text-white text-sm sm:text-base">Permissions</h3>
                </div>
                <Link
                  href="/dashboard/vault"
                  className="text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  Manage all
                </Link>
              </div>
              <div className="p-3 sm:p-4">
                <VaultPermissions
                  permissions={permissions}
                  onPermissionChange={handlePermissionChange}
                  onModeChange={handleModeChange}
                  isEncrypted={true}
                  compact={true}
                />
              </div>
            </div>

            {/* Active Workflows */}
            <div className="rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-terminal-glow" />
                  <h3 className="font-semibold text-white text-sm sm:text-base">Active Workflows</h3>
                </div>
                <Link
                  href="/dashboard/workflows"
                  className="text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  View all
                </Link>
              </div>
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                {workflows.slice(0, 3).map((workflow) => (
                  <div
                    key={workflow.id}
                    className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-zinc-800/30 border border-zinc-800"
                  >
                    <div className="min-w-0 flex-1 mr-2">
                      <p className="text-xs sm:text-sm font-medium text-white truncate">{workflow.name}</p>
                      <p className="text-[10px] sm:text-xs text-zinc-500">
                        {workflow.status === "active" ? "Running" : workflow.status}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleWorkflowStatus(workflow.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        workflow.status === "active"
                          ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                          : "bg-zinc-700/50 text-zinc-400 hover:bg-zinc-700"
                      }`}
                    >
                      {workflow.status === "active" ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
