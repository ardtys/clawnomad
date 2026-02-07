"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wrench,
  Activity,
  Calculator,
  Globe,
  Terminal,
  Fuel,
  Workflow,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Landing/Navbar";
import { Footer } from "@/components/Landing/Footer";
import {
  LiveStatsCounter,
  SavingsCalculator,
  PlatformExplorer,
  CommandBuilder,
  GasPriceTracker,
  WorkflowTemplates,
} from "@/components/Interactive";

type ToolTab = "stats" | "calculator" | "explorer" | "builder" | "gas" | "templates";

const tools: { id: ToolTab; name: string; icon: React.ReactNode; description: string }[] = [
  {
    id: "stats",
    name: "Live Stats",
    icon: <Activity className="w-4 h-4" />,
    description: "Real-time network statistics",
  },
  {
    id: "calculator",
    name: "Savings Calculator",
    icon: <Calculator className="w-4 h-4" />,
    description: "Calculate your time & money savings",
  },
  {
    id: "explorer",
    name: "Platform Explorer",
    icon: <Globe className="w-4 h-4" />,
    description: "Browse all integrations",
  },
  {
    id: "builder",
    name: "Command Builder",
    icon: <Terminal className="w-4 h-4" />,
    description: "Build commands visually",
  },
  {
    id: "gas",
    name: "Gas Tracker",
    icon: <Fuel className="w-4 h-4" />,
    description: "Monitor gas prices",
  },
  {
    id: "templates",
    name: "Workflow Templates",
    icon: <Workflow className="w-4 h-4" />,
    description: "Ready-to-use workflows",
  },
];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<ToolTab>("stats");

  const renderActiveTool = () => {
    switch (activeTab) {
      case "stats":
        return <LiveStatsCounter />;
      case "calculator":
        return <SavingsCalculator />;
      case "explorer":
        return <PlatformExplorer />;
      case "builder":
        return <CommandBuilder />;
      case "gas":
        return <GasPriceTracker />;
      case "templates":
        return <WorkflowTemplates />;
      default:
        return <LiveStatsCounter />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <main className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-terminal-glow/10">
                  <Wrench className="w-6 h-6 text-terminal-glow" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Interactive Tools</h1>
                  <p className="text-zinc-500">
                    Explore Claw-Nomad capabilities with these interactive tools
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tool Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex flex-wrap gap-2 p-2 rounded-xl bg-zinc-900/50 border border-zinc-800">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tool.id
                      ? "bg-terminal-glow text-zinc-900"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  {tool.icon}
                  <span className="hidden sm:inline">{tool.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Active Tab Description */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              {tools.find((t) => t.id === activeTab)?.icon}
              <span>{tools.find((t) => t.id === activeTab)?.description}</span>
            </div>
          </motion.div>

          {/* Tool Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            {renderActiveTool()}
          </motion.div>

          {/* All Tools Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="text-xl font-semibold text-white text-center mb-8">
              All Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  onClick={() => setActiveTab(tool.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    activeTab === tool.id
                      ? "bg-terminal-glow/10 border-terminal-glow/30"
                      : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        activeTab === tool.id
                          ? "bg-terminal-glow/20 text-terminal-glow"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {tool.icon}
                    </div>
                    <span
                      className={`font-medium ${
                        activeTab === tool.id ? "text-terminal-glow" : "text-white"
                      }`}
                    >
                      {tool.name}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500">{tool.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 text-zinc-500 mb-4">
              <Sparkles className="w-4 h-4 text-terminal-glow" />
              <span>All tools work without a database</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/demo">
                <button className="px-6 py-3 rounded-xl border border-zinc-700 text-white font-medium hover:bg-zinc-800 transition-colors">
                  Try Interactive Demo
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="px-8 py-3 rounded-xl bg-terminal-glow text-zinc-900 font-semibold hover:bg-lime-400 transition-colors">
                  Open Dashboard
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
