"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/Landing";
import {
  CheckCircle2,
  Circle,
  Clock,
  Rocket,
  Shield,
  Zap,
  Globe,
  Cpu,
  Lock,
  Users,
  TrendingUp,
  Layers,
  Bot,
  Sparkles,
  Target,
  Award,
} from "lucide-react";

type MilestoneStatus = "completed" | "in-progress" | "upcoming";

interface Milestone {
  title: string;
  description: string;
  status: MilestoneStatus;
  icon: React.ComponentType<{ className?: string }>;
}

interface Phase {
  id: string;
  quarter: string;
  title: string;
  subtitle: string;
  status: MilestoneStatus;
  milestones: Milestone[];
}

const roadmapData: Phase[] = [
  {
    id: "phase-1",
    quarter: "Q1 2025",
    title: "Foundation",
    subtitle: "Core Infrastructure & MVP Launch",
    status: "in-progress",
    milestones: [
      {
        title: "Core Agent Architecture",
        description: "Build foundational agent execution engine with secure sandboxing",
        status: "in-progress",
        icon: Cpu,
      },
      {
        title: "Dashboard MVP",
        description: "Launch initial dashboard with command interface and activity monitoring",
        status: "in-progress",
        icon: Layers,
      },
      {
        title: "Web2 Integrations",
        description: "Gmail, Calendar, and browser automation capabilities",
        status: "in-progress",
        icon: Globe,
      },
      {
        title: "Permission System v1",
        description: "Granular permission controls with spending limits",
        status: "in-progress",
        icon: Shield,
      },
    ],
  },
  {
    id: "phase-2",
    quarter: "Q2 2025",
    title: "Expansion",
    subtitle: "Web3 & Multi-Chain Support",
    status: "in-progress",
    milestones: [
      {
        title: "Ethereum Mainnet Integration",
        description: "Full support for ETH transactions, swaps, and DeFi protocols",
        status: "in-progress",
        icon: Zap,
      },
      {
        title: "Multi-Chain Support",
        description: "Expand to Base, Arbitrum, Optimism, and Polygon networks",
        status: "in-progress",
        icon: Layers,
      },
      {
        title: "DEX Aggregation",
        description: "Integrate with major DEX aggregators for optimal swap routing",
        status: "in-progress",
        icon: TrendingUp,
      },
      {
        title: "Wallet Connect v2",
        description: "Seamless wallet connection with hardware wallet support",
        status: "in-progress",
        icon: Lock,
      },
    ],
  },
  {
    id: "phase-3",
    quarter: "Q3 2025",
    title: "Intelligence",
    subtitle: "Advanced AI & Moltworld Integration",
    status: "upcoming",
    milestones: [
      {
        title: "Moltworld Integration",
        description: "Full integration with Moltworld ecosystem for sentiment analysis",
        status: "upcoming",
        icon: Globe,
      },
      {
        title: "Advanced NLP Commands",
        description: "Enhanced natural language processing for complex multi-step commands",
        status: "upcoming",
        icon: Bot,
      },
      {
        title: "Predictive Analytics",
        description: "AI-powered market predictions and opportunity alerts",
        status: "upcoming",
        icon: Sparkles,
      },
      {
        title: "Agent Memory System",
        description: "Persistent context and learning from past interactions",
        status: "upcoming",
        icon: Cpu,
      },
    ],
  },
  {
    id: "phase-4",
    quarter: "Q4 2025",
    title: "Ecosystem",
    subtitle: "Community & Enterprise Features",
    status: "upcoming",
    milestones: [
      {
        title: "Agent Marketplace",
        description: "Share and discover pre-built agent workflows from the community",
        status: "upcoming",
        icon: Users,
      },
      {
        title: "Enterprise API",
        description: "Dedicated API for enterprise integrations with SLA guarantees",
        status: "upcoming",
        icon: Target,
      },
      {
        title: "Multi-Agent Coordination",
        description: "Enable multiple agents to work together on complex tasks",
        status: "upcoming",
        icon: Bot,
      },
      {
        title: "Governance Token Launch",
        description: "Decentralized governance for protocol decisions",
        status: "upcoming",
        icon: Award,
      },
    ],
  },
  {
    id: "phase-5",
    quarter: "2026+",
    title: "Vision",
    subtitle: "The Future of Autonomous Agents",
    status: "upcoming",
    milestones: [
      {
        title: "Web4 Integration",
        description: "Pioneer the symbiotic web with AI-native infrastructure, intelligent agents, and seamless human-AI collaboration",
        status: "upcoming",
        icon: Sparkles,
      },
      {
        title: "Cross-Platform Agent Protocol",
        description: "Open protocol for agent interoperability across platforms",
        status: "upcoming",
        icon: Globe,
      },
      {
        title: "Decentralized Agent Network",
        description: "Fully decentralized infrastructure for agent execution",
        status: "upcoming",
        icon: Layers,
      },
      {
        title: "AI Agent SDK",
        description: "Developer toolkit for building custom agent capabilities",
        status: "upcoming",
        icon: Cpu,
      },
      {
        title: "Global Expansion",
        description: "Multi-language support and regional compliance",
        status: "upcoming",
        icon: Rocket,
      },
    ],
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    label: "Completed",
  },
  "in-progress": {
    icon: Clock,
    color: "text-terminal-glow",
    bg: "bg-terminal-glow/10",
    border: "border-terminal-glow/30",
    label: "In Progress",
  },
  upcoming: {
    icon: Circle,
    color: "text-zinc-500",
    bg: "bg-zinc-800/50",
    border: "border-zinc-700",
    label: "Upcoming",
  },
};

function MilestoneCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const config = statusConfig[milestone.status];
  const StatusIcon = config.icon;
  const MilestoneIcon = milestone.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`p-4 rounded-xl border ${config.border} ${config.bg} hover:scale-[1.02] transition-transform`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${config.bg}`}>
          <MilestoneIcon className={`w-5 h-5 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-white text-sm">{milestone.title}</h4>
            <StatusIcon className={`w-4 h-4 ${config.color} flex-shrink-0`} />
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">{milestone.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const config = statusConfig[phase.status];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-terminal-glow/50 via-zinc-700 to-zinc-800 transform md:-translate-x-1/2" />

      <div className={`flex flex-col md:flex-row items-start gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
        {/* Phase Info */}
        <div className={`w-full md:w-1/2 ${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3 ${config.bg} ${config.border} border`}
          >
            <span className={config.color}>{config.label}</span>
          </motion.div>
          <h3 className={`text-2xl md:text-3xl font-bold text-white mb-2`}>{phase.quarter}</h3>
          <h4 className={`text-lg font-semibold ${config.color} mb-1`}>{phase.title}</h4>
          <p className="text-zinc-500 text-sm">{phase.subtitle}</p>
        </div>

        {/* Timeline dot */}
        <div className="absolute left-0 md:left-1/2 top-0 transform md:-translate-x-1/2 -translate-y-0">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className={`w-4 h-4 rounded-full ${config.bg} border-2 ${config.border} ${
              phase.status === "in-progress" ? "animate-pulse" : ""
            }`}
          >
            <div className={`w-full h-full rounded-full ${phase.status === "completed" ? "bg-green-500" : phase.status === "in-progress" ? "bg-terminal-glow" : "bg-zinc-600"}`} />
          </motion.div>
        </div>

        {/* Milestones */}
        <div className="w-full md:w-1/2 pl-8 md:pl-0">
          <div className={`space-y-3 ${isEven ? "md:pl-12" : "md:pr-12"}`}>
            {phase.milestones.map((milestone, mIndex) => (
              <MilestoneCard key={milestone.title} milestone={milestone} index={mIndex} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function RoadmapPage() {
  const completedCount = roadmapData.reduce(
    (acc, phase) => acc + phase.milestones.filter((m) => m.status === "completed").length,
    0
  );
  const totalCount = roadmapData.reduce((acc, phase) => acc + phase.milestones.length, 0);
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-terminal-glow/[0.05] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-px w-8 bg-terminal-glow/50" />
            <span className="text-xs tracking-[0.2em] text-terminal-glow uppercase font-medium">
              Development Roadmap
            </span>
            <div className="h-px w-8 bg-terminal-glow/50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Building the Future of{" "}
            <span className="bg-gradient-to-r from-terminal-glow to-lime-400 bg-clip-text text-transparent">
              Autonomous Agents
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8"
          >
            Our journey to create the most powerful and secure autonomous agent platform.
            Track our progress and see what&apos;s coming next.
          </motion.p>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-md mx-auto"
          >
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-zinc-500">Overall Progress</span>
              <span className="text-terminal-glow font-medium">{progressPercent}%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-terminal-glow to-lime-400 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-600 mt-2">
              <span>{completedCount} completed</span>
              <span>{totalCount - completedCount} remaining</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-y border-zinc-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Phases", value: roadmapData.length, icon: Layers },
              { label: "Milestones", value: totalCount, icon: Target },
              { label: "Completed", value: completedCount, icon: CheckCircle2 },
              { label: "In Progress", value: roadmapData.filter((p) => p.status === "in-progress").length, icon: Clock },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-6 h-6 text-terminal-glow mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-24">
            {roadmapData.map((phase, index) => (
              <PhaseCard key={phase.id} phase={phase} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-transparent"
          >
            <Rocket className="w-12 h-12 text-terminal-glow mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want to Shape the Future?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
              Join our community and help us build the next generation of autonomous agents.
              Your feedback drives our roadmap.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/clawnomad-dev/clawnomad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-terminal-glow text-zinc-900 font-semibold hover:bg-lime-400 transition-colors"
              >
                Contribute on GitHub
              </a>
              <a
                href="https://x.com/ClawNomad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-700 text-white font-medium hover:bg-zinc-800 transition-colors"
              >
                Follow Updates
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
