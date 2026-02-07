"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Workflow,
  TrendingUp,
  Mail,
  Zap,
  Shield,
  Globe,
  Calendar,
  Copy,
  Check,
  ArrowRight,
  Users,
  Star,
  Clock,
} from "lucide-react";

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: "defi" | "social" | "productivity" | "trading";
  icon: React.ReactNode;
  steps: string[];
  command: string;
  uses: number;
  rating: number;
  time: string;
}

const templates: WorkflowTemplate[] = [
  {
    id: "sentiment-trader",
    name: "Sentiment Trader",
    description: "Automatically swap tokens based on Moltworld sentiment analysis",
    category: "trading",
    icon: <TrendingUp className="w-5 h-5" />,
    steps: [
      "Monitor Moltworld sentiment for $ETH",
      "When bullish sentiment > 70%, swap USDC to ETH",
      "When bearish sentiment > 60%, swap ETH to USDC",
      "Send notification on each trade",
    ],
    command: "Swap ETH based on Moltworld sentiment with alerts",
    uses: 2847,
    rating: 4.8,
    time: "24/7",
  },
  {
    id: "newsletter-automation",
    name: "Newsletter Automation",
    description: "Generate and send weekly newsletters from top discussions",
    category: "productivity",
    icon: <Mail className="w-5 h-5" />,
    steps: [
      "Collect top 10 Moltworld discussions weekly",
      "Generate newsletter summary with AI",
      "Format for email template",
      "Send to subscriber list every Monday 9am",
    ],
    command: "Send weekly newsletter from Moltworld top discussions every Monday",
    uses: 1523,
    rating: 4.9,
    time: "Weekly",
  },
  {
    id: "gas-optimizer",
    name: "Gas Optimizer",
    description: "Execute pending transactions when gas prices are optimal",
    category: "defi",
    icon: <Zap className="w-5 h-5" />,
    steps: [
      "Queue transaction with parameters",
      "Monitor gas prices in real-time",
      "Execute when gas < 20 gwei",
      "Retry with higher gas if pending > 1 hour",
    ],
    command: "Execute queued swaps when gas below 20 gwei",
    uses: 4521,
    rating: 4.7,
    time: "On condition",
  },
  {
    id: "multi-chain-bridge",
    name: "Multi-Chain Bridge",
    description: "Automatically bridge assets across chains for best rates",
    category: "defi",
    icon: <Globe className="w-5 h-5" />,
    steps: [
      "Check balances across all chains",
      "Find best bridging route",
      "Wait for optimal gas on source chain",
      "Execute bridge and verify on destination",
    ],
    command: "Bridge 0.5 ETH to Base when gas is low via best route",
    uses: 1892,
    rating: 4.6,
    time: "~5 min",
  },
  {
    id: "social-sync",
    name: "Social Sync",
    description: "Keep your profiles synchronized across Web2 and Moltworld",
    category: "social",
    icon: <Users className="w-5 h-5" />,
    steps: [
      "Monitor LinkedIn profile for changes",
      "Sync bio and updates to Moltbook",
      "Cross-post achievements to Twitter",
      "Update portfolio links everywhere",
    ],
    command: "Sync my LinkedIn bio with Moltbook and Twitter",
    uses: 967,
    rating: 4.5,
    time: "Real-time",
  },
  {
    id: "smart-scheduler",
    name: "Smart Scheduler",
    description: "AI-powered meeting scheduling based on availability",
    category: "productivity",
    icon: <Calendar className="w-5 h-5" />,
    steps: [
      "Parse meeting request from email",
      "Check calendar for free slots",
      "Find overlapping availability",
      "Send calendar invite automatically",
    ],
    command: "Schedule meeting when both calendars are free next week",
    uses: 2134,
    rating: 4.8,
    time: "Instant",
  },
  {
    id: "portfolio-guard",
    name: "Portfolio Guard",
    description: "Protect your portfolio with automatic risk management",
    category: "trading",
    icon: <Shield className="w-5 h-5" />,
    steps: [
      "Monitor portfolio value continuously",
      "Trigger stop-loss at -10% daily drop",
      "Rebalance when allocation drifts > 5%",
      "Send daily portfolio summary",
    ],
    command: "Protect portfolio with 10% stop-loss and daily rebalancing",
    uses: 1456,
    rating: 4.9,
    time: "24/7",
  },
  {
    id: "content-curator",
    name: "Content Curator",
    description: "Curate and summarize content from multiple sources",
    category: "productivity",
    icon: <Workflow className="w-5 h-5" />,
    steps: [
      "Aggregate posts from Moltworld",
      "Filter by relevance and engagement",
      "Generate AI summary",
      "Post curated list to your feed",
    ],
    command: "Curate top Moltworld posts about AI agents daily",
    uses: 823,
    rating: 4.4,
    time: "Daily",
  },
];

const categoryColors = {
  defi: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  social: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  productivity: "bg-green-500/20 text-green-400 border-green-500/30",
  trading: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const categoryLabels = {
  defi: "DeFi",
  social: "Social",
  productivity: "Productivity",
  trading: "Trading",
};

export function WorkflowTemplates() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ["all", "defi", "trading", "social", "productivity"];

  const filteredTemplates = templates.filter(
    (t) => selectedCategory === "all" || t.category === selectedCategory
  );

  const copyCommand = (id: string, command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-terminal-glow" />
          <h3 className="font-semibold text-white">Workflow Templates</h3>
          <span className="text-xs text-zinc-500 ml-auto">{templates.length} templates</span>
        </div>
        <p className="text-xs text-zinc-500 mt-1">Ready-to-use automation workflows</p>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-3 border-b border-zinc-800 flex gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-terminal-glow text-zinc-900"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {cat === "all" ? "All" : categoryLabels[cat as keyof typeof categoryLabels]}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="p-4 grid gap-3 max-h-[500px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-xl border border-zinc-700 bg-zinc-800/30 overflow-hidden hover:border-zinc-600 transition-colors"
            >
              {/* Template Header */}
              <div
                className="p-4 cursor-pointer"
                onClick={() => setExpandedId(expandedId === template.id ? null : template.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${categoryColors[template.category]}`}>
                    {template.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-white">{template.name}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] border ${categoryColors[template.category]}`}>
                        {categoryLabels[template.category]}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-2">{template.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-[10px] text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {template.uses.toLocaleString()} uses
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        {template.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {template.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedId === template.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-zinc-700"
                  >
                    <div className="p-4 space-y-3">
                      {/* Steps */}
                      <div>
                        <p className="text-xs text-zinc-500 mb-2">Workflow Steps</p>
                        <div className="space-y-1">
                          {template.steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <span className="w-5 h-5 rounded-full bg-zinc-700 text-zinc-400 text-xs flex items-center justify-center flex-shrink-0">
                                {i + 1}
                              </span>
                              <span className="text-zinc-300">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Command */}
                      <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-700">
                        <div className="flex items-center justify-between">
                          <code className="text-sm text-terminal-glow font-mono">{template.command}</code>
                          <button
                            onClick={() => copyCommand(template.id, template.command)}
                            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors"
                          >
                            {copiedId === template.id ? (
                              <Check className="w-3.5 h-3.5 text-green-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-zinc-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Use Template Button */}
                      <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-terminal-glow text-zinc-900 font-medium text-sm hover:bg-lime-400 transition-colors">
                        Use Template
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>Click template to expand</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-terminal-glow" />
            Community contributed
          </span>
        </div>
      </div>
    </div>
  );
}
