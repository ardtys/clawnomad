"use client";

import Link from "next/link";
import {
  Rocket,
  Book,
  Layers,
  Shield,
  Code,
  HelpCircle,
  ArrowRight,
  Search,
  Star,
} from "lucide-react";
import { DocsLayout } from "@/components/Docs";

const sections = [
  {
    icon: Rocket,
    title: "Getting Started",
    description: "Set up your agent and run your first command",
    href: "/docs/getting-started/introduction",
    color: "green",
  },
  {
    icon: Book,
    title: "Core Concepts",
    description: "Understand how agents think and execute",
    href: "/docs/core-concepts/architecture",
    color: "blue",
  },
  {
    icon: Layers,
    title: "Integrations",
    description: "Connect Web2, Web3, and Moltworld services",
    href: "/docs/integrations/overview",
    color: "purple",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Permissions, limits, and encryption",
    href: "/docs/security/model",
    color: "amber",
  },
  {
    icon: Code,
    title: "API Reference",
    description: "Build custom integrations with our API",
    href: "/docs/api-reference/auth",
    color: "pink",
  },
  {
    icon: HelpCircle,
    title: "Troubleshooting",
    description: "Common issues and how to fix them",
    href: "/docs/troubleshooting/common-issues",
    color: "cyan",
  },
];

const quickLinks = [
  { title: "Quick Start Guide", href: "/docs/getting-started/quick-start" },
  { title: "Command Language", href: "/docs/core-concepts/commands" },
  { title: "Web3 Integration", href: "/docs/integrations/web3" },
  { title: "API Authentication", href: "/docs/api-reference/auth" },
];

const colorClasses: Record<string, string> = {
  green: "bg-green-500/10 text-green-400 group-hover:bg-green-500/20",
  blue: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20",
  purple: "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20",
  amber: "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20",
  pink: "bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20",
  cyan: "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20",
};

export default function DocsHomePage() {
  return (
    <DocsLayout>
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Claw-Nomad Documentation
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
          Learn how to deploy, configure, and master your autonomous agent.
          From quick start guides to advanced API integrations.
        </p>
      </div>

      {/* Search Highlight */}
      <div className="mb-12 p-6 rounded-2xl border border-zinc-800 bg-gradient-to-r from-terminal-glow/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-terminal-glow/10 flex items-center justify-center flex-shrink-0">
            <Search className="w-5 h-5 text-terminal-glow" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">
              Looking for something specific?
            </h2>
            <p className="text-zinc-500 text-sm mb-3">
              Use the search bar in the sidebar or press{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-xs font-mono">⌘K</kbd>{" "}
              to quickly find what you need.
            </p>
          </div>
        </div>
      </div>

      {/* Section Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="group p-5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${colorClasses[section.color]}`}>
                <section.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white group-hover:text-terminal-glow transition-colors">
                    {section.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-terminal-glow group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-sm text-zinc-500 mt-1">{section.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400" />
          Popular Pages
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center gap-2 px-4 py-3 rounded-lg border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 text-zinc-400 hover:text-white transition-all"
            >
              <ArrowRight className="w-4 h-4" />
              {link.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Help Banner */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-white mb-1">Need help?</h3>
            <p className="text-sm text-zinc-500">
              Join our Discord community for real-time support
            </p>
          </div>
          <a
            href="https://discord.gg/clawnomad"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[#5865F2] text-white text-sm font-medium hover:bg-[#4752C4] transition-colors"
          >
            Join Discord
          </a>
        </div>
      </div>
    </DocsLayout>
  );
}
