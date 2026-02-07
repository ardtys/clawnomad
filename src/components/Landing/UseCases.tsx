"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const useCases = [
  {
    tag: "Trading",
    title: "Sentiment-driven trading",
    description:
      "Connect Moltbook sentiment analysis to your trading strategy. When community mood shifts, your agent adjusts positions automatically within your risk parameters.",
    platforms: ["Moltbook", "Uniswap", "Base"],
    command: "If Moltbook bearish sentiment > 70%, reduce ETH exposure by 20%",
  },
  {
    tag: "Social",
    title: "Cross-platform presence",
    description:
      "Keep your professional identity consistent. Update your LinkedIn when you hit milestones on Moltworld, or sync your bio across all platforms with one command.",
    platforms: ["LinkedIn", "Moltworld", "Twitter"],
    command: "Mirror my Moltworld achievements to LinkedIn monthly",
  },
  {
    tag: "Research",
    title: "Automated market briefs",
    description:
      "Wake up to a personalized market summary. Your agent aggregates overnight discussions, price movements, and relevant news into a concise briefing.",
    platforms: ["Moltbook", "Gmail", "Calendar"],
    command: "Every morning at 7am, send me a digest of overnight Moltbook activity",
  },
  {
    tag: "DeFi",
    title: "Conditional transactions",
    description:
      "Set complex conditions for blockchain actions. Bridge assets when gas is cheap, rebalance when allocations drift, stake rewards automatically.",
    platforms: ["Ethereum", "Base", "Solana"],
    command: "Bridge to Base when L1 gas < 15 gwei and ETH > $2,500",
  },
];

export function UseCases() {
  return (
    <section className="py-24 px-4" id="use-cases">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Built for how you actually work
          </h2>
          <p className="text-zinc-400 text-lg mb-4">
            These aren&apos;t hypotheticals. Real users are running these workflows today,
            saving hours of manual coordination every week.
          </p>
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 text-sm text-terminal-glow hover:text-lime-400 transition-colors"
          >
            Explore all use cases
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 hover:border-zinc-700 transition-colors"
            >
              {/* Tag */}
              <span className="inline-block text-xs font-medium text-terminal-glow bg-terminal-glow/10 px-2 py-1 rounded mb-4">
                {useCase.tag}
              </span>

              {/* Content */}
              <h3 className="text-xl font-medium text-white mb-3">{useCase.title}</h3>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{useCase.description}</p>

              {/* Platforms */}
              <div className="flex items-center gap-2 mb-4">
                {useCase.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              {/* Command Preview */}
              <div className="rounded-lg bg-zinc-950 border border-zinc-800 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-terminal-glow" />
                  <span className="text-xs text-zinc-500">Sample command</span>
                </div>
                <code className="text-sm text-zinc-300 font-mono leading-relaxed">
                  {useCase.command}
                </code>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
