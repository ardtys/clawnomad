"use client";

import { motion } from "framer-motion";
import { AgentProfile, PlatformType } from "@/types";
import { CryptoQR } from "./CryptoQR";
import {
  Shield,
  Star,
  Globe,
  TrendingUp,
  Lock,
} from "lucide-react";

interface NomadicPassportProps {
  agent: AgentProfile;
}

const platformLabels: Record<PlatformType, { label: string; color: string }> = {
  web2: { label: "Web2 Platform", color: "text-web2" },
  web3: { label: "Web3 Network", color: "text-web3" },
  moltworld: { label: "Moltworld", color: "text-moltworld" },
};

export function NomadicPassport({ agent }: NomadicPassportProps) {
  const platformInfo = platformLabels[agent.currentPlatform];

  return (
    <motion.header
      className="glass-card sticky top-0 z-50 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          {/* Crypto QR Identity */}
          <div className="flex-shrink-0">
            <CryptoQR seed={agent.id} size={80} />
          </div>

          {/* Agent Info */}
          <div className="flex-grow">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-xl font-bold text-white">{agent.name}</h1>
              {agent.encryptedMemory && (
                <motion.div
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-terminal-glow/10 text-terminal-glow text-xs"
                  whileHover={{ scale: 1.05 }}
                >
                  <Lock className="w-3 h-3" />
                  <span>Encrypted</span>
                </motion.div>
              )}
            </div>

            {/* Agent ID */}
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-terminal-muted" />
              <code className="text-xs text-terminal-muted font-mono">
                {agent.id}
              </code>
            </div>

            {/* Current Status */}
            <motion.div
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-terminal-border/50 w-fit"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-terminal-glow"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm text-terminal-muted">Status:</span>
              <span className="text-sm font-medium text-white">
                {agent.currentStatus}
              </span>
              <span className={["text-sm", platformInfo.color].join(" ")}>
                on {platformInfo.label}
              </span>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6">
            {/* Reputation Score */}
            <motion.div
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-xs text-terminal-muted">Reputation</p>
                <p className="text-xl font-bold text-yellow-500">
                  {agent.reputationScore}
                </p>
              </div>
            </motion.div>

            {/* Success Rate */}
            <motion.div
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-terminal-muted">Success Rate</p>
                <p className="text-xl font-bold text-success">
                  {agent.successRate}%
                </p>
              </div>
            </motion.div>

            {/* Total Travels */}
            <motion.div
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-web3/10 to-web3/5 border border-web3/20"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="w-10 h-10 rounded-lg bg-web3/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-web3" />
              </div>
              <div>
                <p className="text-xs text-terminal-muted">Total Travels</p>
                <p className="text-xl font-bold text-web3">
                  {agent.totalTravels}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-terminal-glow/40 to-transparent"
        initial={{ top: 0 }}
        animate={{ top: "100%" }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </motion.header>
  );
}
