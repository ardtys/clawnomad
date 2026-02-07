"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "15+", label: "Platform integrations", sublabel: "Web2, Web3, Moltworld" },
  { value: "< 2s", label: "Average execution", sublabel: "Command to action" },
  { value: "100%", label: "Local encryption", sublabel: "Zero cloud storage" },
  { value: "24/7", label: "Always monitoring", sublabel: "Never miss a trigger" },
];

const quotes = [
  {
    text: "I used to spend 30 minutes every morning checking sentiment across platforms. Now my agent sends me a summary before I wake up.",
    author: "DeFi researcher",
    detail: "Saves 3+ hours weekly",
  },
  {
    text: "The transparency is what sold me. I can see exactly why my agent made each decision. No black box.",
    author: "Crypto fund manager",
    detail: "Managing $2M+ in assets",
  },
  {
    text: "Finally something that bridges the gap between my Web2 professional life and Web3 activities.",
    author: "Moltworld creator",
    detail: "12k+ reputation score",
  },
];

export function Stats() {
  return (
    <section className="py-24 px-4 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto">
        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">{metric.value}</p>
              <p className="text-white font-medium mb-1">{metric.label}</p>
              <p className="text-xs text-zinc-500">{metric.sublabel}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-2">What early users say</h3>
          <p className="text-zinc-400">From our private beta program</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6"
            >
              <p className="text-zinc-300 mb-6 leading-relaxed">&ldquo;{quote.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{quote.author}</p>
                  <p className="text-xs text-zinc-500">{quote.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
