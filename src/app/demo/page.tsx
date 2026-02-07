"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Terminal,
  Activity,
  Shield,
  MessageSquare,
  ArrowDownUp,
  Workflow,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Landing/Navbar";
import { Footer } from "@/components/Landing/Footer";
import {
  CommandSimulator,
  LiveActivityFeed,
  PermissionPlayground,
  ChatWithAgent,
  SwapSimulator,
  WorkflowBuilder,
} from "@/components/Demo";

type DemoTab = "command" | "activity" | "permissions" | "chat" | "swap" | "workflow";

const tabs: { id: DemoTab; name: string; icon: React.ReactNode; description: string }[] = [
  {
    id: "command",
    name: "Command Simulator",
    icon: <Terminal className="w-4 h-4" />,
    description: "Parse natural language commands",
  },
  {
    id: "activity",
    name: "Live Activity",
    icon: <Activity className="w-4 h-4" />,
    description: "Real-time agent activity feed",
  },
  {
    id: "permissions",
    name: "Permissions",
    icon: <Shield className="w-4 h-4" />,
    description: "Configure agent permissions",
  },
  {
    id: "chat",
    name: "Chat",
    icon: <MessageSquare className="w-4 h-4" />,
    description: "Converse with your agent",
  },
  {
    id: "swap",
    name: "Swap",
    icon: <ArrowDownUp className="w-4 h-4" />,
    description: "Simulated token swap interface",
  },
  {
    id: "workflow",
    name: "Workflows",
    icon: <Workflow className="w-4 h-4" />,
    description: "Build automated workflows",
  },
];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<DemoTab>("command");

  const renderActiveDemo = () => {
    switch (activeTab) {
      case "command":
        return <CommandSimulator />;
      case "activity":
        return <LiveActivityFeed />;
      case "permissions":
        return <PermissionPlayground />;
      case "chat":
        return <ChatWithAgent />;
      case "swap":
        return <SwapSimulator />;
      case "workflow":
        return <WorkflowBuilder />;
      default:
        return <CommandSimulator />;
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
                  <Sparkles className="w-6 h-6 text-terminal-glow" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Interactive Demo</h1>
                  <p className="text-zinc-500">
                    Explore Claw-Nomad features with these interactive simulations
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex flex-wrap gap-2 p-2 rounded-xl bg-zinc-900/50 border border-zinc-800">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-terminal-glow text-zinc-900"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.name}</span>
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
              {tabs.find((t) => t.id === activeTab)?.icon}
              <span>{tabs.find((t) => t.id === activeTab)?.description}</span>
            </div>
          </motion.div>

          {/* Demo Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            {renderActiveDemo()}
          </motion.div>

          {/* Features Grid - Show All */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="text-xl font-semibold text-white text-center mb-8">
              All Demo Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-terminal-glow/10 border-terminal-glow/30"
                      : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        activeTab === tab.id
                          ? "bg-terminal-glow/20 text-terminal-glow"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {tab.icon}
                    </div>
                    <span
                      className={`font-medium ${
                        activeTab === tab.id ? "text-terminal-glow" : "text-white"
                      }`}
                    >
                      {tab.name}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500">{tab.description}</p>
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
            <p className="text-zinc-500 mb-4">
              Ready to deploy your own autonomous agent?
            </p>
            <Link href="/dashboard">
              <button className="px-8 py-3 rounded-xl bg-terminal-glow text-zinc-900 font-semibold hover:bg-lime-400 transition-colors">
                Open Dashboard
              </button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
