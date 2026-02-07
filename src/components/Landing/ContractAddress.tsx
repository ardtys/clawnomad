"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export function ContractAddress() {
  return (
    <section className="py-6 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-terminal-glow/30 bg-gradient-to-r from-terminal-glow/5 via-zinc-900/80 to-terminal-glow/5 backdrop-blur-sm"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-terminal-glow/10 via-transparent to-terminal-glow/10 opacity-50" />

          <div className="relative p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Coming Soon Content */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  >
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-terminal-glow" />
                  </motion.div>
                  <span className="text-xs sm:text-sm font-medium text-terminal-glow uppercase tracking-wider">
                    Contract Address
                  </span>
                </div>
              </div>

              {/* Coming Soon Badge */}
              <div className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-zinc-900/80 border border-zinc-700">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-base sm:text-lg font-semibold bg-gradient-to-r from-terminal-glow to-lime-400 bg-clip-text text-transparent"
                >
                  Coming Soon
                </motion.span>
              </div>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="h-0.5 bg-gradient-to-r from-transparent via-terminal-glow/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
