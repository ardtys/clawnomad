"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Linkedin,
  Calendar,
  Wallet,
  ArrowRightLeft,
  MessageSquare,
  Eye,
  Lock,
  Gauge,
  ArrowRight,
} from "lucide-react";

const platforms = [
  {
    category: "Web2",
    color: "blue",
    description: "Traditional services you use every day",
    items: [
      { icon: Mail, name: "Gmail", desc: "Read, compose, send" },
      { icon: Linkedin, name: "LinkedIn", desc: "Profile & posts" },
      { icon: Calendar, name: "Calendar", desc: "Events & scheduling" },
    ],
  },
  {
    category: "Web3",
    color: "purple",
    description: "Blockchain networks and DeFi protocols",
    items: [
      { icon: Wallet, name: "Wallets", desc: "Multi-chain support" },
      { icon: ArrowRightLeft, name: "DEXs", desc: "Token swaps" },
      { icon: Gauge, name: "DeFi", desc: "Yield & lending" },
    ],
  },
  {
    category: "Moltworld",
    color: "green",
    description: "AI-native social coordination layer",
    items: [
      { icon: MessageSquare, name: "Moltbook", desc: "Sentiment & trends" },
      { icon: Eye, name: "Signals", desc: "Market intelligence" },
      { icon: Lock, name: "Reputation", desc: "Soulbound identity" },
    ],
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
    dot: "bg-blue-500",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/20",
    dot: "bg-purple-500",
  },
  green: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    border: "border-green-500/20",
    dot: "bg-green-500",
  },
};

export function Features() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" id="features">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Three worlds. One interface.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mb-3 sm:mb-4">
            Your agent doesn&apos;t just connect to platforms — it understands them.
            Context flows between services, enabling actions that would take you hours to coordinate manually.
          </p>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 text-sm text-terminal-glow hover:text-lime-400 transition-colors"
          >
            Explore all integrations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-20">
          {platforms.map((platform, index) => {
            const colors = colorClasses[platform.color];
            return (
              <motion.div
                key={platform.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className={"rounded-lg sm:rounded-xl border " + colors.border + " bg-zinc-900/50 p-4 sm:p-5 md:p-6 h-full hover:bg-zinc-900/80 transition-colors"}>
                  {/* Header */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className={"w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full " + colors.dot} />
                    <span className={"text-sm font-medium " + colors.text}>
                      {platform.category}
                    </span>
                  </div>

                  <p className="text-zinc-500 text-xs sm:text-sm mb-4 sm:mb-6">
                    {platform.description}
                  </p>

                  {/* Items */}
                  <div className="space-y-3 sm:space-y-4">
                    {platform.items.map((item) => (
                      <div key={item.name} className="flex items-center gap-2.5 sm:gap-3">
                        <div className={"w-9 h-9 sm:w-10 sm:h-10 rounded-lg " + colors.bg + " flex items-center justify-center flex-shrink-0"}>
                          <item.icon className={"w-4 h-4 sm:w-5 sm:h-5 " + colors.text} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium">{item.name}</p>
                          <p className="text-zinc-500 text-xs truncate">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Key Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 sm:p-6 md:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-terminal-glow/10 flex items-center justify-center mb-3 sm:mb-4">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-terminal-glow" />
              </div>
              <h3 className="text-white font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Local-first security</h3>
              <p className="text-zinc-500 text-xs sm:text-sm">
                Your agent&apos;s memory and credentials are encrypted on your device.
                We never see your private keys or API tokens.
              </p>
            </div>
            <div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-terminal-glow/10 flex items-center justify-center mb-3 sm:mb-4">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-terminal-glow" />
              </div>
              <h3 className="text-white font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Full transparency</h3>
              <p className="text-zinc-500 text-xs sm:text-sm">
                Every decision your agent makes is logged with reasoning.
                Audit the logic, not just the outcome.
              </p>
            </div>
            <div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-terminal-glow/10 flex items-center justify-center mb-3 sm:mb-4">
                <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-terminal-glow" />
              </div>
              <h3 className="text-white font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Granular limits</h3>
              <p className="text-zinc-500 text-xs sm:text-sm">
                Set spending caps, require confirmations for sensitive actions,
                or let your agent run fully autonomous within bounds.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
