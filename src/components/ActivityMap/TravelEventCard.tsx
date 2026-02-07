"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TravelEvent } from "@/types";
import { TravelNode } from "./TravelNode";
import { StatusBadge } from "./StatusBadge";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Zap,
  Hash,
  Fuel,
} from "lucide-react";

interface TravelEventCardProps {
  event: TravelEvent;
  index: number;
}

export function TravelEventCard({ event, index }: TravelEventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const truncateHash = (hash: string) => {
    if (hash.length <= 16) return hash;
    return hash.slice(0, 8) + "..." + hash.slice(-6);
  };

  const copyToClipboard = async () => {
    if (event.txHash) {
      await navigator.clipboard.writeText(event.txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      {/* Timeline connector */}
      {index > 0 && (
        <div className="absolute left-5 -top-4 w-0.5 h-4 bg-gradient-to-b from-transparent to-terminal-glow/30" />
      )}

      <motion.div
        className="glass-card-hover p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.01 }}
        layout
      >
        {/* Header Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <TravelNode
              platform={event.source.platform}
              name={event.source.name}
              size="sm"
            />
            <motion.div
              className="flex items-center gap-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-8 h-0.5 bg-gradient-to-r from-terminal-glow/50 to-transparent" />
              <ArrowRight className="w-4 h-4 text-terminal-glow" />
              <div className="w-8 h-0.5 bg-gradient-to-l from-terminal-glow/50 to-transparent" />
            </motion.div>
            <TravelNode
              platform={event.destination.platform}
              name={event.destination.name}
              size="sm"
            />
          </div>
          <StatusBadge status={event.status} />
        </div>

        {/* Action & Description */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-terminal-glow" />
            <span className="text-sm font-medium text-white">{event.action}</span>
          </div>
          <p className="text-sm text-terminal-muted pl-6">{event.description}</p>
        </div>

        {/* Footer Row */}
        <div className="flex items-center justify-between pt-2 border-t border-terminal-border">
          <span className="text-xs text-terminal-muted">
            {formatTimestamp(event.timestamp)}
          </span>
          <div className="flex items-center gap-3">
            {/* Cryptographic Hash for Web3 */}
            {event.txHash && (
              <motion.button
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-web3/10 hover:bg-web3/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard();
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Hash className="w-3 h-3 text-web3" />
                <span className="hash-display text-web3">
                  {truncateHash(event.txHash)}
                </span>
                {copied ? (
                  <Check className="w-3 h-3 text-success" />
                ) : (
                  <Copy className="w-3 h-3 text-web3/60" />
                )}
              </motion.button>
            )}
            {event.gasUsed && (
              <div className="flex items-center gap-1 text-xs text-terminal-muted">
                <Fuel className="w-3 h-3" />
                <span>{event.gasUsed}</span>
              </div>
            )}
            <motion.button
              className="text-terminal-muted hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Expanded Intelligence Logs */}
        <AnimatePresence>
          {isExpanded && event.intelligenceLogs && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-terminal-border"
            >
              <h4 className="text-xs font-medium text-terminal-glow mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terminal-glow animate-pulse" />
                Intelligence Logs
              </h4>
              <div className="space-y-2 font-mono text-xs">
                {event.intelligenceLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-2 text-terminal-muted"
                  >
                    <span className="text-terminal-glow">{">"}</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Timeline dot */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-terminal-dark border-2 border-terminal-glow/50 z-10" />
    </motion.div>
  );
}
