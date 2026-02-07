"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/Dashboard";
import {
  Shield,
  Lock,
  Unlock,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Settings,
  RefreshCw,
  Plus,
  Trash2,
  Globe,
  Hexagon,
  Wallet,
  Mail,
  Calendar,
  ArrowRightLeft,
  Copy,
} from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: "web2" | "web3";
  enabled: boolean;
  limit?: string;
  mode?: "manual" | "autonomous";
  icon: typeof Shield;
}

interface SecretKey {
  id: string;
  name: string;
  type: string;
  lastUsed: Date;
  createdAt: Date;
}

const mockPermissions: Permission[] = [
  {
    id: "1",
    name: "Browser Automation",
    description: "Allow automated browser interactions",
    category: "web2",
    enabled: true,
    icon: Globe,
  },
  {
    id: "2",
    name: "Email Send",
    description: "Send emails on your behalf",
    category: "web2",
    enabled: true,
    icon: Mail,
  },
  {
    id: "3",
    name: "Calendar Access",
    description: "Read and modify calendar events",
    category: "web2",
    enabled: false,
    icon: Calendar,
  },
  {
    id: "4",
    name: "Wallet Transactions",
    description: "Execute blockchain transactions",
    category: "web3",
    enabled: true,
    limit: "0.1 ETH",
    mode: "manual",
    icon: Wallet,
  },
  {
    id: "5",
    name: "Swap Execution",
    description: "Perform token swaps on DEXs",
    category: "web3",
    enabled: true,
    limit: "500 USDC",
    mode: "autonomous",
    icon: ArrowRightLeft,
  },
  {
    id: "6",
    name: "Smart Contract Calls",
    description: "Interact with smart contracts",
    category: "web3",
    enabled: false,
    limit: "0.05 ETH",
    mode: "manual",
    icon: Hexagon,
  },
];

const mockSecretKeys: SecretKey[] = [
  {
    id: "1",
    name: "OpenAI API Key",
    type: "API Key",
    lastUsed: new Date(Date.now() - 1000 * 60 * 5),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  },
  {
    id: "2",
    name: "Gmail OAuth Token",
    type: "OAuth",
    lastUsed: new Date(Date.now() - 1000 * 60 * 30),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
  },
  {
    id: "3",
    name: "Etherscan API Key",
    type: "API Key",
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
];

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function VaultPage() {
  const [permissions, setPermissions] = useState(mockPermissions);
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [showSecrets, setShowSecrets] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<"all" | "web2" | "web3">("all");

  const togglePermission = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const toggleMode = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, mode: p.mode === "manual" ? "autonomous" : "manual" as const }
          : p
      )
    );
  };

  const filteredPermissions = permissions.filter(
    (p) => categoryFilter === "all" || p.category === categoryFilter
  );

  const stats = {
    totalPermissions: permissions.length,
    enabledPermissions: permissions.filter((p) => p.enabled).length,
    autonomousActions: permissions.filter((p) => p.mode === "autonomous" && p.enabled).length,
    secretKeys: mockSecretKeys.length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Vault & Security</h1>
            <p className="text-zinc-500 mt-1">Manage permissions, secrets, and agent access controls</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
              <RefreshCw className="w-4 h-4" />
              Sync
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-glow text-zinc-900 font-medium hover:bg-lime-400 transition-colors">
              <Plus className="w-4 h-4" />
              Add Secret
            </button>
          </div>
        </div>

        {/* Encryption Status */}
        <motion.div
          className={`p-4 rounded-xl border ${
            isEncrypted
              ? "bg-terminal-glow/5 border-terminal-glow/20"
              : "bg-red-500/5 border-red-500/20"
          }`}
          animate={{
            boxShadow: isEncrypted
              ? [
                  "0 0 10px rgba(57, 255, 20, 0.05)",
                  "0 0 20px rgba(57, 255, 20, 0.1)",
                  "0 0 10px rgba(57, 255, 20, 0.05)",
                ]
              : "none",
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isEncrypted ? "bg-terminal-glow/10" : "bg-red-500/10"
              }`}>
                {isEncrypted ? (
                  <Lock className="w-6 h-6 text-terminal-glow" />
                ) : (
                  <Unlock className="w-6 h-6 text-red-400" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {isEncrypted ? "Vault Encrypted" : "Vault Unencrypted"}
                </h3>
                <p className="text-sm text-zinc-500">
                  {isEncrypted
                    ? "All sensitive data is encrypted with AES-256"
                    : "Warning: Your data is not encrypted"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEncrypted(!isEncrypted)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isEncrypted
                  ? "bg-zinc-800 text-zinc-400 hover:text-white"
                  : "bg-terminal-glow text-zinc-900 hover:bg-lime-400"
              }`}
            >
              {isEncrypted ? "Decrypt" : "Encrypt"}
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Permissions", value: stats.totalPermissions, icon: Shield },
            { label: "Enabled", value: stats.enabledPermissions, icon: CheckCircle2 },
            { label: "Autonomous", value: stats.autonomousActions, icon: AlertTriangle },
            { label: "Secret Keys", value: stats.secretKeys, icon: Key },
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Permissions */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
            <div className="p-4 border-b border-zinc-800">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Permissions</h3>
                <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-800/50">
                  {(["all", "web2", "web3"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                        categoryFilter === cat
                          ? "bg-zinc-700 text-white"
                          : "text-zinc-500 hover:text-white"
                      }`}
                    >
                      {cat === "all" ? "All" : cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
              {filteredPermissions.map((permission, index) => {
                const Icon = permission.icon;
                const isWeb3 = permission.category === "web3";

                return (
                  <motion.div
                    key={permission.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-xl border transition-all ${
                      permission.enabled
                        ? "bg-zinc-800/30 border-terminal-glow/20"
                        : "bg-zinc-900/50 border-zinc-800"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isWeb3 ? "bg-purple-500/10" : "bg-blue-500/10"
                        }`}>
                          <Icon className={`w-5 h-5 ${isWeb3 ? "text-purple-400" : "text-blue-400"}`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{permission.name}</h4>
                          <p className="text-xs text-zinc-500 mt-0.5">{permission.description}</p>

                          {isWeb3 && permission.limit && permission.enabled && (
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs px-2 py-1 rounded-md bg-purple-500/10 text-purple-400">
                                Limit: {permission.limit}
                              </span>
                              <button
                                onClick={() => toggleMode(permission.id)}
                                className={`text-xs px-2 py-1 rounded-md transition-colors ${
                                  permission.mode === "autonomous"
                                    ? "bg-amber-500/10 text-amber-400"
                                    : "bg-zinc-700 text-zinc-400"
                                }`}
                              >
                                {permission.mode === "autonomous" ? "Autonomous" : "Manual"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => togglePermission(permission.id)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          permission.enabled ? "bg-terminal-glow" : "bg-zinc-700"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            permission.enabled ? "left-7" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Secret Keys */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
            <div className="p-4 border-b border-zinc-800">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Secret Keys</h3>
                <button
                  onClick={() => setShowSecrets(!showSecrets)}
                  className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  {showSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showSecrets ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {mockSecretKeys.map((secret, index) => (
                <motion.div
                  key={secret.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Key className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{secret.name}</h4>
                        <p className="text-xs text-zinc-500 mt-0.5">{secret.type}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-zinc-600">
                            Last used: {formatTimeAgo(secret.lastUsed)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {showSecrets && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-zinc-800"
                    >
                      <code className="text-xs text-terminal-glow font-mono bg-zinc-900 px-2 py-1 rounded">
                        ••••••••••••••••••••••••
                      </code>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              <button className="w-full p-4 rounded-xl border border-dashed border-zinc-700 text-zinc-500 hover:text-white hover:border-zinc-600 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Secret
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
