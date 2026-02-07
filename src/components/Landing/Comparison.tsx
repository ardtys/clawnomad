"use client";

import { motion } from "framer-motion";
import { Check, X, Minus, Crown, Zap } from "lucide-react";

interface ComparisonFeature {
  name: string;
  description: string;
  clawNomad: boolean | "partial";
  competitor1: boolean | "partial";
  competitor2: boolean | "partial";
  competitor3: boolean | "partial";
  highlight?: boolean;
}

const competitors = [
  { name: "Claw-Nomad", highlight: true },
  { name: "AutoGPT", highlight: false },
  { name: "AgentGPT", highlight: false },
  { name: "Others", highlight: false },
];

const features: ComparisonFeature[] = [
  {
    name: "Web2 Integration",
    description: "Gmail, Calendar, Browser automation",
    clawNomad: true,
    competitor1: "partial",
    competitor2: false,
    competitor3: "partial",
  },
  {
    name: "Web3 / DeFi Support",
    description: "Native blockchain transactions & swaps",
    clawNomad: true,
    competitor1: false,
    competitor2: false,
    competitor3: "partial",
    highlight: true,
  },
  {
    name: "Moltworld Integration",
    description: "Sentiment analysis & social features",
    clawNomad: true,
    competitor1: false,
    competitor2: false,
    competitor3: false,
    highlight: true,
  },
  {
    name: "Multi-Chain Support",
    description: "ETH, Base, Arbitrum, Polygon",
    clawNomad: true,
    competitor1: false,
    competitor2: false,
    competitor3: "partial",
    highlight: true,
  },
  {
    name: "Granular Permissions",
    description: "Per-action limits & approvals",
    clawNomad: true,
    competitor1: false,
    competitor2: false,
    competitor3: "partial",
  },
  {
    name: "Spending Limits",
    description: "Set max transaction amounts",
    clawNomad: true,
    competitor1: false,
    competitor2: false,
    competitor3: false,
    highlight: true,
  },
  {
    name: "Natural Language",
    description: "Plain English commands",
    clawNomad: true,
    competitor1: true,
    competitor2: true,
    competitor3: true,
  },
  {
    name: "Real-time Monitoring",
    description: "Live activity dashboard",
    clawNomad: true,
    competitor1: "partial",
    competitor2: "partial",
    competitor3: "partial",
  },
  {
    name: "Workflow Automation",
    description: "Custom automated workflows",
    clawNomad: true,
    competitor1: true,
    competitor2: "partial",
    competitor3: "partial",
  },
  {
    name: "Open Source",
    description: "Transparent & auditable code",
    clawNomad: true,
    competitor1: true,
    competitor2: true,
    competitor3: "partial",
  },
  {
    name: "No Coding Required",
    description: "User-friendly interface",
    clawNomad: true,
    competitor1: false,
    competitor2: true,
    competitor3: "partial",
  },
  {
    name: "Enterprise Ready",
    description: "Scalable & secure for business",
    clawNomad: true,
    competitor1: false,
    competitor2: false,
    competitor3: "partial",
  },
];

function FeatureStatus({ status }: { status: boolean | "partial" }) {
  if (status === true) {
    return (
      <div className="flex items-center justify-center">
        <div className="p-1 rounded-full bg-green-500/20">
          <Check className="w-4 h-4 text-green-400" />
        </div>
      </div>
    );
  }
  if (status === "partial") {
    return (
      <div className="flex items-center justify-center">
        <div className="p-1 rounded-full bg-yellow-500/20">
          <Minus className="w-4 h-4 text-yellow-400" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <div className="p-1 rounded-full bg-zinc-700/50">
        <X className="w-4 h-4 text-zinc-500" />
      </div>
    </div>
  );
}

export function Comparison() {
  const clawNomadScore = features.filter((f) => f.clawNomad === true).length;
  const totalFeatures = features.length;

  return (
    <section className="py-24 px-4 relative overflow-hidden" id="comparison">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-terminal-glow/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-px w-8 bg-terminal-glow/50" />
            <span className="text-xs tracking-[0.2em] text-terminal-glow uppercase font-medium">
              Comparison
            </span>
            <div className="h-px w-8 bg-terminal-glow/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            See How We{" "}
            <span className="bg-gradient-to-r from-terminal-glow to-lime-400 bg-clip-text text-transparent">
              Stack Up
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Don&apos;t just take our word for it. Compare features and see why
            Claw-Nomad is the most complete autonomous agent solution.
          </motion.p>

          {/* Score Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-full bg-terminal-glow/10 border border-terminal-glow/30"
          >
            <Crown className="w-5 h-5 text-terminal-glow" />
            <span className="text-white font-semibold">
              Claw-Nomad: {clawNomadScore}/{totalFeatures} Features
            </span>
            <Zap className="w-5 h-5 text-terminal-glow" />
          </motion.div>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className="col-span-1" />
              {competitors.map((comp, index) => (
                <motion.div
                  key={comp.name}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`text-center p-4 rounded-xl ${
                    comp.highlight
                      ? "bg-terminal-glow/10 border-2 border-terminal-glow/50"
                      : "bg-zinc-900/50 border border-zinc-800"
                  }`}
                >
                  {comp.highlight && (
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Crown className="w-4 h-4 text-terminal-glow" />
                      <span className="text-xs text-terminal-glow font-medium">BEST</span>
                    </div>
                  )}
                  <span className={`font-semibold ${comp.highlight ? "text-terminal-glow" : "text-zinc-400"}`}>
                    {comp.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Table Body */}
            <div className="space-y-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`grid grid-cols-5 gap-4 p-4 rounded-xl ${
                    feature.highlight
                      ? "bg-terminal-glow/5 border border-terminal-glow/20"
                      : "bg-zinc-900/30 border border-zinc-800/50"
                  }`}
                >
                  {/* Feature Name */}
                  <div className="col-span-1">
                    <div className="font-medium text-white text-sm">{feature.name}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{feature.description}</div>
                  </div>

                  {/* Claw-Nomad */}
                  <div className="flex items-center justify-center">
                    <FeatureStatus status={feature.clawNomad} />
                  </div>

                  {/* AutoGPT */}
                  <div className="flex items-center justify-center">
                    <FeatureStatus status={feature.competitor1} />
                  </div>

                  {/* AgentGPT */}
                  <div className="flex items-center justify-center">
                    <FeatureStatus status={feature.competitor2} />
                  </div>

                  {/* Others */}
                  <div className="flex items-center justify-center">
                    <FeatureStatus status={feature.competitor3} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-green-500/20">
              <Check className="w-3 h-3 text-green-400" />
            </div>
            <span className="text-zinc-400">Full Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-yellow-500/20">
              <Minus className="w-3 h-3 text-yellow-400" />
            </div>
            <span className="text-zinc-400">Partial Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-zinc-700/50">
              <X className="w-3 h-3 text-zinc-500" />
            </div>
            <span className="text-zinc-400">Not Supported</span>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-terminal-glow/10 to-lime-500/10 border border-terminal-glow/20">
            <div className="text-left">
              <h4 className="text-xl font-bold text-white mb-1">
                Ready to experience the difference?
              </h4>
              <p className="text-zinc-400 text-sm">
                Join thousands of users who switched to Claw-Nomad
              </p>
            </div>
            <a
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-terminal-glow text-zinc-900 font-semibold hover:bg-lime-400 transition-colors whitespace-nowrap"
            >
              Try Free Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
