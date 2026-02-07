"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-terminal-glow/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start building your agent
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
              Connect your first platform in under 2 minutes. No credit card required.
              Full access to all features during beta.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/dashboard">
                <button className="group flex items-center gap-2 px-6 py-3.5 rounded-lg bg-terminal-glow text-zinc-900 font-semibold transition-all hover:bg-lime-400 hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]">
                  Open Dashboard
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <a
                href="https://docs.clawnomad.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-lg border border-zinc-700 text-white font-medium hover:border-zinc-600 hover:bg-zinc-800/50 transition-all"
              >
                Read the docs
              </a>
            </div>

            <p className="text-sm text-zinc-500">
              Questions? Join our{" "}
              <a href="#" className="text-zinc-400 hover:text-white underline">
                Discord community
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
