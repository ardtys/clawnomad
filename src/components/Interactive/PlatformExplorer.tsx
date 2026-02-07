"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mail,
  Linkedin,
  Calendar,
  FileText,
  Wallet,
  ArrowLeftRight,
  Landmark,
  Globe,
  TrendingUp,
  MessageSquare,
  Award,
  Users,
  X,
  ExternalLink,
  CheckCircle2,
  Zap,
} from "lucide-react";

type Category = "all" | "web2" | "web3" | "moltworld";

interface Platform {
  id: string;
  name: string;
  category: Category;
  icon: React.ReactNode;
  description: string;
  features: string[];
  status: "live" | "beta" | "coming";
  actions: string[];
}

const platforms: Platform[] = [
  // Web2
  {
    id: "gmail",
    name: "Gmail",
    category: "web2",
    icon: <Mail className="w-5 h-5" />,
    description: "Automate email workflows, newsletters, and responses",
    features: ["Send emails", "Read inbox", "Create drafts", "Manage labels"],
    status: "live",
    actions: ["send_email", "read_inbox", "create_draft", "search"],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "web2",
    icon: <Linkedin className="w-5 h-5" />,
    description: "Sync profiles and automate professional networking",
    features: ["Update profile", "Post content", "Message connections", "Track engagement"],
    status: "live",
    actions: ["post", "update_bio", "message", "connect"],
  },
  {
    id: "calendar",
    name: "Google Calendar",
    category: "web2",
    icon: <Calendar className="w-5 h-5" />,
    description: "Smart scheduling and meeting automation",
    features: ["Create events", "Check availability", "Send invites", "Set reminders"],
    status: "live",
    actions: ["create_event", "find_slots", "invite", "remind"],
  },
  {
    id: "notion",
    name: "Notion",
    category: "web2",
    icon: <FileText className="w-5 h-5" />,
    description: "Organize knowledge and automate documentation",
    features: ["Create pages", "Update databases", "Query content", "Sync data"],
    status: "beta",
    actions: ["create_page", "update_db", "query", "sync"],
  },
  // Web3
  {
    id: "metamask",
    name: "MetaMask",
    category: "web3",
    icon: <Wallet className="w-5 h-5" />,
    description: "Secure wallet integration for transactions",
    features: ["Check balance", "Sign transactions", "Manage tokens", "View history"],
    status: "live",
    actions: ["get_balance", "sign_tx", "transfer", "approve"],
  },
  {
    id: "uniswap",
    name: "Uniswap",
    category: "web3",
    icon: <ArrowLeftRight className="w-5 h-5" />,
    description: "Decentralized token swaps with best rates",
    features: ["Swap tokens", "Add liquidity", "Remove liquidity", "Price quotes"],
    status: "live",
    actions: ["swap", "add_lp", "remove_lp", "quote"],
  },
  {
    id: "aave",
    name: "Aave",
    category: "web3",
    icon: <Landmark className="w-5 h-5" />,
    description: "DeFi lending and borrowing automation",
    features: ["Supply assets", "Borrow tokens", "Repay loans", "Monitor health"],
    status: "live",
    actions: ["supply", "borrow", "repay", "check_health"],
  },
  {
    id: "bridge",
    name: "LayerZero Bridge",
    category: "web3",
    icon: <Globe className="w-5 h-5" />,
    description: "Cross-chain asset bridging made simple",
    features: ["Bridge tokens", "Multi-chain", "Track status", "Gas optimization"],
    status: "live",
    actions: ["bridge", "check_status", "estimate_gas", "route"],
  },
  // Moltworld
  {
    id: "moltbook",
    name: "Moltbook",
    category: "moltworld",
    icon: <MessageSquare className="w-5 h-5" />,
    description: "Social platform for AI agents and users",
    features: ["Post updates", "Read feed", "Engage content", "Build reputation"],
    status: "live",
    actions: ["post", "read", "like", "comment"],
  },
  {
    id: "signals",
    name: "Moltworld Signals",
    category: "moltworld",
    icon: <TrendingUp className="w-5 h-5" />,
    description: "Real-time sentiment and market signals",
    features: ["Sentiment analysis", "Trend detection", "Alert triggers", "Data feeds"],
    status: "live",
    actions: ["get_sentiment", "detect_trend", "set_alert", "subscribe"],
  },
  {
    id: "reputation",
    name: "Reputation System",
    category: "moltworld",
    icon: <Award className="w-5 h-5" />,
    description: "Build and track your agent's reputation score",
    features: ["View score", "Track history", "Earn badges", "Verify actions"],
    status: "beta",
    actions: ["get_score", "view_history", "claim_badge", "verify"],
  },
  {
    id: "registry",
    name: "Agent Registry",
    category: "moltworld",
    icon: <Users className="w-5 h-5" />,
    description: "Discover and connect with other agents",
    features: ["Browse agents", "Connect", "Collaborate", "Share workflows"],
    status: "coming",
    actions: ["browse", "connect", "collaborate", "share"],
  },
];

const categoryColors = {
  all: "bg-zinc-700 text-white",
  web2: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  web3: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  moltworld: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const statusColors = {
  live: "bg-green-500/20 text-green-400",
  beta: "bg-yellow-500/20 text-yellow-400",
  coming: "bg-zinc-500/20 text-zinc-400",
};

export function PlatformExplorer() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  const filteredPlatforms = platforms.filter((platform) => {
    const matchesSearch = platform.name.toLowerCase().includes(search.toLowerCase()) ||
      platform.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || platform.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories: { id: Category; label: string; count: number }[] = [
    { id: "all", label: "All", count: platforms.length },
    { id: "web2", label: "Web2", count: platforms.filter((p) => p.category === "web2").length },
    { id: "web3", label: "Web3", count: platforms.filter((p) => p.category === "web3").length },
    { id: "moltworld", label: "Moltworld", count: platforms.filter((p) => p.category === "moltworld").length },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-terminal-glow" />
          <h3 className="font-semibold text-white">Platform Explorer</h3>
          <span className="text-xs text-zinc-500 ml-auto">{platforms.length} integrations</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="p-4 border-b border-zinc-800 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search platforms..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-terminal-glow transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                category === cat.id
                  ? categoryColors[cat.id]
                  : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white"
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Platform Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filteredPlatforms.map((platform) => (
            <motion.button
              key={platform.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSelectedPlatform(platform)}
              className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.02] ${
                categoryColors[platform.category]
              } hover:shadow-lg`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 rounded-lg bg-zinc-900/50">{platform.icon}</div>
                <span className={`px-2 py-0.5 rounded text-[10px] ${statusColors[platform.status]}`}>
                  {platform.status}
                </span>
              </div>
              <h4 className="font-medium text-white mb-1">{platform.name}</h4>
              <p className="text-xs text-zinc-400 line-clamp-2">{platform.description}</p>
            </motion.button>
          ))}
        </AnimatePresence>

        {filteredPlatforms.length === 0 && (
          <div className="col-span-2 text-center py-8 text-zinc-500">
            No platforms found matching your search
          </div>
        )}
      </div>

      {/* Platform Detail Modal */}
      <AnimatePresence>
        {selectedPlatform && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedPlatform(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 overflow-hidden"
            >
              {/* Modal Header */}
              <div className={`p-4 border-b border-zinc-800 ${categoryColors[selectedPlatform.category]}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-900/50">{selectedPlatform.icon}</div>
                    <div>
                      <h3 className="font-semibold text-white">{selectedPlatform.name}</h3>
                      <span className={`text-xs ${statusColors[selectedPlatform.status]}`}>
                        {selectedPlatform.status === "live" ? "Available" : selectedPlatform.status === "beta" ? "Beta Access" : "Coming Soon"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPlatform(null)}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 space-y-4">
                <p className="text-sm text-zinc-300">{selectedPlatform.description}</p>

                <div>
                  <h4 className="text-xs text-zinc-500 uppercase mb-2">Features</h4>
                  <div className="space-y-1">
                    {selectedPlatform.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-terminal-glow" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs text-zinc-500 uppercase mb-2">Available Actions</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedPlatform.actions.map((action, i) => (
                      <span key={i} className="px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-400 font-mono">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-zinc-800 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-terminal-glow text-zinc-900 font-medium text-sm hover:bg-lime-400 transition-colors">
                  <Zap className="w-4 h-4" />
                  Use Integration
                </button>
                <button className="px-4 py-2.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
