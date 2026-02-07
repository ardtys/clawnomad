"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Shield,
  MessageSquare,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const uspData = [
  {
    id: "bridge",
    icon: Layers,
    title: "The Only True Multi-Platform Bridge",
    subtitle: "Web2 + Web3 + Moltworld",
    description:
      "While others focus on single ecosystems, Claw-Nomad seamlessly connects traditional web services, blockchain networks, and the emerging Moltworld — all through one unified agent.",
    features: [
      "Gmail, Calendar, Browser automation",
      "Ethereum, Base, Arbitrum, Polygon",
      "Moltworld sentiment & social integration",
    ],
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/10",
  },
  {
    id: "permissions",
    icon: Shield,
    title: "Military-Grade Permission System",
    subtitle: "Your Keys, Your Control",
    description:
      "Set granular permissions with spending limits, time-based access, and approval workflows. Your agent only does what you allow — nothing more, nothing less.",
    features: [
      "Per-action spending limits",
      "Time-based permission windows",
      "Multi-signature approval for high-value actions",
    ],
    gradient: "from-terminal-glow to-lime-400",
    bgGlow: "bg-terminal-glow/10",
  },
  {
    id: "nlp",
    icon: MessageSquare,
    title: "Natural Language Commands",
    subtitle: "Speak Human, Execute Code",
    description:
      "No coding required. Just tell your agent what you want in plain English. Our advanced NLP understands context, intent, and executes complex multi-step operations.",
    features: [
      '"Swap ETH when gas is under 20 gwei"',
      '"Draft newsletter from top Moltworld discussions"',
      '"Alert me when sentiment drops below 40%"',
    ],
    gradient: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/10",
  },
];

function USPCard({
  usp,
  index,
}: {
  usp: (typeof uspData)[0];
  index: number;
}) {
  const Icon = usp.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-16`}
    >
      {/* Content */}
      <div className="flex-1 space-y-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${usp.bgGlow} border border-white/10`}>
          <Icon className={`w-4 h-4 bg-gradient-to-r ${usp.gradient} bg-clip-text text-transparent`} style={{ color: usp.gradient.includes("terminal") ? "#39ff14" : undefined }} />
          <span className={`text-xs font-medium bg-gradient-to-r ${usp.gradient} bg-clip-text text-transparent`}>
            {usp.subtitle}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
          {usp.title}
        </h3>

        <p className="text-zinc-400 text-lg leading-relaxed">
          {usp.description}
        </p>

        <ul className="space-y-3">
          {usp.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${usp.gradient}`} />
              <span className="text-zinc-300">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Visual */}
      <div className="flex-1 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`relative p-8 rounded-2xl border border-zinc-800 ${usp.bgGlow} backdrop-blur-sm`}
        >
          {/* Glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${usp.gradient} opacity-5 rounded-2xl`} />

          <div className="relative">
            <Icon className={`w-16 h-16 mb-6 bg-gradient-to-r ${usp.gradient} p-3 rounded-xl`} style={{ color: "white" }} />

            {/* Mini feature cards */}
            <div className="space-y-3">
              {usp.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800"
                >
                  <Zap className="w-4 h-4 text-terminal-glow flex-shrink-0" />
                  <span className="text-sm text-zinc-300 truncate">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function WhyClawNomad() {
  return (
    <section className="py-24 px-4 relative overflow-hidden" id="why-clawnomad">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-terminal-glow/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-px w-8 bg-terminal-glow/50" />
            <span className="text-xs tracking-[0.2em] text-terminal-glow uppercase font-medium">
              Why Choose Us
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
            What Makes Claw-Nomad{" "}
            <span className="bg-gradient-to-r from-terminal-glow to-lime-400 bg-clip-text text-transparent">
              Different
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Not just another AI agent. The only protocol that truly bridges every platform
            while keeping you in complete control.
          </motion.p>
        </div>

        {/* USP Cards */}
        <div className="space-y-24">
          {uspData.map((usp, index) => (
            <USPCard key={usp.id} usp={usp} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <Link href="/dashboard">
            <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-terminal-glow text-zinc-900 font-semibold hover:bg-lime-400 transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]">
              Experience the Difference
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
