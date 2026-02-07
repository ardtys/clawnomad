"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Cpu } from "lucide-react";
import Link from "next/link";

const typewriterTexts = [
  "Swap ETH when sentiment drops below 40%",
  "Sync my LinkedIn bio with Moltworld",
  "Draft newsletter from top discussions",
  "Bridge 0.1 ETH when gas under 20 gwei",
];

export function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const text = typewriterTexts[currentText];

    if (isTyping) {
      if (displayText.length < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setCurrentText((prev) => (prev + 1) % typewriterTexts.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[500px] md:h-[600px] bg-terminal-glow/[0.07] rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[400px] bg-web3/[0.05] rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-4 sm:mb-6"
        >
          <div className="h-px w-6 sm:w-8 bg-terminal-glow/50" />
          <span className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-terminal-glow uppercase font-medium">
            Autonomous Agent Protocol
          </span>
          <div className="h-px w-6 sm:w-8 bg-terminal-glow/50" />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.15] sm:leading-[1.1] tracking-tight">
            <span className="text-white">One command.</span>
            <br />
            <span className="text-white">Every platform.</span>
            <br />
            <span className="bg-gradient-to-r from-terminal-glow to-lime-400 bg-clip-text text-transparent">
              Zero friction.
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-4 sm:mb-6 leading-relaxed px-2"
        >
          Deploy AI agents that move seamlessly between Web2 services, blockchain networks,
          and Moltworld — all while you maintain complete control.
        </motion.p>

        {/* Powered by Open Claw */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center justify-center gap-2 mb-8 sm:mb-12"
        >
          <span className="text-sm sm:text-base text-zinc-500">Powered by</span>
          <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-terminal-glow to-lime-400 bg-clip-text text-transparent">
            Open Claw
          </span>
        </motion.div>

        {/* Interactive Terminal Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8 sm:mb-12"
        >
          <div className="rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-zinc-800 bg-zinc-900/50">
              <div className="flex gap-1 sm:gap-1.5">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-zinc-700" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-zinc-700" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-zinc-700" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-[10px] sm:text-xs text-zinc-500 font-mono hidden sm:inline">claw-nomad — bridge-command</span>
                <span className="text-[10px] text-zinc-500 font-mono sm:hidden">claw-nomad</span>
              </div>
            </div>
            {/* Terminal Body */}
            <div className="p-4 sm:p-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-terminal-glow mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-h-[24px] sm:min-h-[28px]">
                  <span className="font-mono text-sm sm:text-base text-white break-words">{displayText}</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 bg-terminal-glow ml-0.5 align-middle"
                  />
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center gap-2 text-[10px] sm:text-xs text-zinc-500">
                <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                <span className="truncate">Agent ready • 3 platforms • Encrypted</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 px-4"
        >
          <Link href="/dashboard" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto group flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-lg bg-terminal-glow text-zinc-900 font-semibold transition-all hover:bg-lime-400 hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]">
              Open Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
          <Link href="#how-it-works" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-lg border border-zinc-700 text-white font-medium hover:border-zinc-600 hover:bg-zinc-800/50 transition-all">
              See how it works
            </button>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 text-xs sm:text-sm text-zinc-500 px-4"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500" />
            <span>Local encryption</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500" />
            <span>Multi-chain</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500" />
            <span>Configurable</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
