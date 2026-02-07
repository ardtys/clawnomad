"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Clock,
  Globe,
  Mail,
  Wallet,
  Settings,
  ToggleLeft,
  ToggleRight,
  Info,
} from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: "financial" | "social" | "data" | "system";
  icon: React.ReactNode;
  enabled: boolean;
  limit?: {
    type: "amount" | "count" | "time";
    value: number;
    unit: string;
  };
  requiresApproval: boolean;
}

const defaultPermissions: Permission[] = [
  {
    id: "swap",
    name: "Token Swaps",
    description: "Allow agent to swap tokens on DEXs",
    category: "financial",
    icon: <DollarSign className="w-4 h-4" />,
    enabled: true,
    limit: { type: "amount", value: 100, unit: "USD" },
    requiresApproval: false,
  },
  {
    id: "bridge",
    name: "Cross-Chain Bridge",
    description: "Bridge assets between networks",
    category: "financial",
    icon: <Globe className="w-4 h-4" />,
    enabled: true,
    limit: { type: "amount", value: 500, unit: "USD" },
    requiresApproval: true,
  },
  {
    id: "email",
    name: "Send Emails",
    description: "Compose and send emails on your behalf",
    category: "social",
    icon: <Mail className="w-4 h-4" />,
    enabled: true,
    limit: { type: "count", value: 10, unit: "per day" },
    requiresApproval: false,
  },
  {
    id: "wallet",
    name: "Wallet Access",
    description: "View wallet balances and history",
    category: "financial",
    icon: <Wallet className="w-4 h-4" />,
    enabled: true,
    requiresApproval: false,
  },
  {
    id: "schedule",
    name: "Task Scheduling",
    description: "Schedule automated tasks",
    category: "system",
    icon: <Clock className="w-4 h-4" />,
    enabled: true,
    limit: { type: "count", value: 50, unit: "tasks" },
    requiresApproval: false,
  },
  {
    id: "settings",
    name: "Modify Settings",
    description: "Change agent configuration",
    category: "system",
    icon: <Settings className="w-4 h-4" />,
    enabled: false,
    requiresApproval: true,
  },
];

const categoryColors = {
  financial: "text-green-400 bg-green-500/10 border-green-500/30",
  social: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  data: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  system: "text-orange-400 bg-orange-500/10 border-orange-500/30",
};

interface SimulatedRequest {
  id: string;
  permission: string;
  action: string;
  status: "pending" | "approved" | "denied";
  timestamp: Date;
}

export function PermissionPlayground() {
  const [permissions, setPermissions] = useState<Permission[]>(defaultPermissions);
  const [simulatedRequests, setSimulatedRequests] = useState<SimulatedRequest[]>([]);
  const [showSimulation, setShowSimulation] = useState(false);

  const togglePermission = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const toggleApproval = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, requiresApproval: !p.requiresApproval } : p))
    );
  };

  const updateLimit = (id: string, value: number) => {
    setPermissions((prev) =>
      prev.map((p) =>
        p.id === id && p.limit ? { ...p, limit: { ...p.limit, value } } : p
      )
    );
  };

  const simulateRequest = () => {
    const enabledPermissions = permissions.filter((p) => p.enabled);
    if (enabledPermissions.length === 0) return;

    const randomPerm = enabledPermissions[Math.floor(Math.random() * enabledPermissions.length)];
    const actions: Record<string, string[]> = {
      swap: ["Swap 0.1 ETH to USDC", "Swap 50 USDC to DAI", "Swap 0.05 ETH to WBTC"],
      bridge: ["Bridge 0.2 ETH to Base", "Bridge 100 USDC to Arbitrum"],
      email: ["Send newsletter to subscribers", "Reply to support ticket"],
      wallet: ["Check ETH balance", "View transaction history"],
      schedule: ["Schedule daily price check", "Set up weekly report"],
      settings: ["Update notification preferences", "Change default slippage"],
    };

    const permActions = actions[randomPerm.id] || ["Execute action"];
    const action = permActions[Math.floor(Math.random() * permActions.length)];

    const newRequest: SimulatedRequest = {
      id: `req-${Date.now()}`,
      permission: randomPerm.name,
      action,
      status: randomPerm.requiresApproval ? "pending" : "approved",
      timestamp: new Date(),
    };

    setSimulatedRequests((prev) => [newRequest, ...prev].slice(0, 5));
    setShowSimulation(true);
  };

  const handleRequestAction = (id: string, approved: boolean) => {
    setSimulatedRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: approved ? "approved" : "denied" } : r
      )
    );
  };

  const enabledCount = permissions.filter((p) => p.enabled).length;
  const approvalRequired = permissions.filter((p) => p.enabled && p.requiresApproval).length;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-terminal-glow" />
            <h3 className="font-semibold text-white">Permission Playground</h3>
          </div>
          <button
            onClick={simulateRequest}
            className="px-3 py-1.5 rounded-lg bg-terminal-glow/10 text-terminal-glow text-xs font-medium hover:bg-terminal-glow/20 transition-colors"
          >
            Simulate Request
          </button>
        </div>
        <p className="text-xs text-zinc-500 mt-1">Configure what your agent can and cannot do</p>
      </div>

      {/* Stats Bar */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <Unlock className="w-3.5 h-3.5 text-green-400" />
            <span className="text-zinc-400">
              <span className="text-white font-medium">{enabledCount}</span> enabled
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-zinc-400">
              <span className="text-white font-medium">{approvalRequired}</span> require approval
            </span>
          </div>
        </div>
      </div>

      {/* Permission List */}
      <div className="divide-y divide-zinc-800/50 max-h-[350px] overflow-y-auto">
        {permissions.map((permission) => (
          <div
            key={permission.id}
            className={`px-4 py-3 transition-colors ${
              permission.enabled ? "bg-transparent" : "bg-zinc-900/50"
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className={`p-2 rounded-lg border ${categoryColors[permission.category]} ${
                  !permission.enabled && "opacity-50"
                }`}
              >
                {permission.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-sm font-medium ${
                      permission.enabled ? "text-white" : "text-zinc-500"
                    }`}
                  >
                    {permission.name}
                  </span>
                  {permission.requiresApproval && permission.enabled && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      Approval
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500">{permission.description}</p>

                {/* Limit Slider */}
                {permission.limit && permission.enabled && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] text-zinc-600 uppercase">Limit:</span>
                    <input
                      type="range"
                      min={permission.limit.type === "amount" ? 10 : 1}
                      max={permission.limit.type === "amount" ? 1000 : 100}
                      value={permission.limit.value}
                      onChange={(e) => updateLimit(permission.id, Number(e.target.value))}
                      className="flex-1 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-terminal-glow"
                    />
                    <span className="text-xs text-terminal-glow font-medium min-w-[80px] text-right">
                      {permission.limit.value} {permission.limit.unit}
                    </span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {permission.enabled && (
                  <button
                    onClick={() => toggleApproval(permission.id)}
                    className={`p-1.5 rounded transition-colors ${
                      permission.requiresApproval
                        ? "text-orange-400 hover:bg-orange-500/10"
                        : "text-zinc-500 hover:bg-zinc-800"
                    }`}
                    title={permission.requiresApproval ? "Remove approval requirement" : "Require approval"}
                  >
                    {permission.requiresApproval ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <Unlock className="w-4 h-4" />
                    )}
                  </button>
                )}
                <button
                  onClick={() => togglePermission(permission.id)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {permission.enabled ? (
                    <ToggleRight className="w-8 h-8 text-terminal-glow" />
                  ) : (
                    <ToggleLeft className="w-8 h-8" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simulation Panel */}
      <AnimatePresence>
        {showSimulation && simulatedRequests.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-zinc-800"
          >
            <div className="px-4 py-3 bg-zinc-900/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-zinc-400">Simulated Requests</span>
                <button
                  onClick={() => setShowSimulation(false)}
                  className="text-xs text-zinc-500 hover:text-white"
                >
                  Hide
                </button>
              </div>
              <div className="space-y-2">
                {simulatedRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-2 rounded-lg bg-zinc-800/50"
                  >
                    {request.status === "approved" && (
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    )}
                    {request.status === "denied" && (
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    )}
                    {request.status === "pending" && (
                      <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white truncate">{request.action}</p>
                      <p className="text-[10px] text-zinc-500">{request.permission}</p>
                    </div>
                    {request.status === "pending" && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleRequestAction(request.id, true)}
                          className="px-2 py-1 rounded text-[10px] bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRequestAction(request.id, false)}
                          className="px-2 py-1 rounded text-[10px] bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        >
                          Deny
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Info className="w-3.5 h-3.5" />
          <span>All permissions are stored locally and encrypted</span>
        </div>
      </div>
    </div>
  );
}
