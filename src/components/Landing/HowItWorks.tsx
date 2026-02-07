"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Cpu, Activity, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Terminal,
    title: "Describe your intent",
    description:
      "Write what you want in plain language. The agent parses your command and identifies which platforms and actions are needed.",
    example: "When ETH drops 5%, sell 10% and notify me on Moltbook",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Agent plans execution",
    description:
      "Your agent breaks down the task into steps, checks permissions, and creates an execution plan you can review before it runs.",
    example: "Monitor price → Check limit → Execute swap → Post update",
  },
  {
    number: "03",
    icon: Activity,
    title: "Cross-platform action",
    description:
      "The agent moves between platforms as needed — reading from one, writing to another, bridging context seamlessly.",
    example: "Uniswap ↔ Price Oracle ↔ Moltbook",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Verify and log",
    description:
      "Every action is recorded with full reasoning. Review outcomes, audit decisions, and refine your agent's behavior over time.",
    example: "Sold 0.1 ETH at $2,340 • Gas: 0.002 • Posted to Moltbook",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-zinc-950/50" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From intent to execution
          </h2>
          <p className="text-zinc-400 text-lg mb-4">
            No APIs to configure. No scripts to write. Just describe what you want,
            and your agent figures out how to make it happen.
          </p>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-sm text-terminal-glow hover:text-lime-400 transition-colors"
          >
            See detailed breakdown
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex gap-6 items-start p-6 rounded-xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all">
                {/* Number */}
                <div className="hidden sm:flex flex-col items-center">
                  <span className="text-xs font-mono text-zinc-600 mb-2">{step.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:bg-terminal-glow/10 transition-colors">
                    <step.icon className="w-6 h-6 text-zinc-400 group-hover:text-terminal-glow transition-colors" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px h-6 bg-zinc-800 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 sm:hidden">
                    <span className="text-xs font-mono text-zinc-600">{step.number}</span>
                    <step.icon className="w-5 h-5 text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
                  <p className="text-zinc-400 text-sm mb-4">{step.description}</p>

                  {/* Example */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <span className="text-xs text-zinc-500">Example:</span>
                    <code className="text-xs text-terminal-glow font-mono">{step.example}</code>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
