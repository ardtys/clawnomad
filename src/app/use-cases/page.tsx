"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Users,
  FileText,
  Zap,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { Navbar } from "@/components/Landing/Navbar";
import { Footer } from "@/components/Landing/Footer";

const useCaseCategories = [
  {
    id: "trading",
    name: "Trading & DeFi",
    icon: TrendingUp,
    color: "purple",
    description: "Automate your trading strategies with sentiment analysis, conditional orders, and portfolio management",
    useCases: [
      {
        title: "Sentiment-Driven Trading",
        problem: "Market sentiment shifts faster than manual monitoring allows. By the time you notice a trend change, the opportunity has passed.",
        solution: "Connect Moltbook sentiment analysis directly to your trading strategy. Your agent monitors community mood 24/7 and adjusts positions within your predefined parameters.",
        workflow: [
          "Agent monitors Moltbook sentiment for specified tokens",
          "When bearish sentiment exceeds your threshold (e.g., 70%)",
          "Agent calculates optimal position reduction based on your rules",
          "Executes trade on Uniswap with your gas and slippage limits",
          "Sends confirmation to your preferred notification channel",
        ],
        commands: [
          "If Moltbook bearish sentiment for ETH > 70%, reduce exposure by 20%",
          "When bullish sentiment crosses 60%, DCA $100 into ETH daily",
          "Alert me when sentiment diverges from price action by > 30%",
        ],
        platforms: ["Moltbook", "Uniswap", "Wallet"],
        metrics: "Users report 15-30% improvement in trade timing",
      },
      {
        title: "Gas-Optimized Bridging",
        problem: "Bridging assets between chains at the wrong time means paying 3-5x more in gas fees. Manual monitoring is tedious.",
        solution: "Your agent monitors gas prices across chains and executes bridges only when costs fall below your threshold.",
        workflow: [
          "Agent monitors L1 and L2 gas prices continuously",
          "Identifies optimal bridging windows based on your criteria",
          "Queues your bridge transaction for execution",
          "Executes when all conditions are met (gas + price)",
          "Confirms completion and updates your portfolio view",
        ],
        commands: [
          "Bridge 1 ETH to Base when L1 gas < 15 gwei",
          "Move USDC to Arbitrum when bridge fees < $5",
          "Execute weekly rebalance when total gas cost < $20",
        ],
        platforms: ["Ethereum", "Base", "Arbitrum", "Optimism"],
        metrics: "Average 40% reduction in bridging costs",
      },
      {
        title: "DeFi Position Management",
        problem: "Managing positions across multiple DeFi protocols is time-consuming. Missing a rebalance or failing to compound can cost significant yield.",
        solution: "Automated monitoring of all your DeFi positions with intelligent actions based on your rules.",
        workflow: [
          "Agent tracks all your positions across protocols",
          "Monitors health factors, APYs, and reward accrual",
          "Triggers compounding when rewards exceed threshold",
          "Alerts on positions approaching liquidation",
          "Executes protective actions if configured",
        ],
        commands: [
          "Compound rewards on Aave when > $50 accumulated",
          "Alert me if any position health factor < 1.5",
          "Rebalance stablecoin allocation monthly to highest APY",
        ],
        platforms: ["Aave", "Compound", "Uniswap", "Curve"],
        metrics: "15-25% yield improvement through consistent compounding",
      },
    ],
  },
  {
    id: "social",
    name: "Social & Professional",
    icon: Users,
    color: "blue",
    description: "Maintain your presence across platforms and keep your professional identity consistent",
    useCases: [
      {
        title: "Cross-Platform Identity Sync",
        problem: "Your professional presence is fragmented across platforms. Updating each one manually is tedious, and they quickly fall out of sync.",
        solution: "Single source of truth for your professional identity. Update once, propagate everywhere.",
        workflow: [
          "Define your canonical profile in Claw-Nomad",
          "Agent monitors for changes to source profile",
          "Automatically updates connected platforms",
          "Respects platform-specific formatting and limits",
          "Logs all changes for your review",
        ],
        commands: [
          "Mirror my Moltworld bio to LinkedIn and Twitter",
          "When I update my title on LinkedIn, sync to all platforms",
          "Keep my profile photo consistent across all connected accounts",
        ],
        platforms: ["LinkedIn", "Moltworld", "Twitter"],
        metrics: "Save 2+ hours weekly on profile maintenance",
      },
      {
        title: "Achievement Broadcasting",
        problem: "You hit milestones across different platforms but manually cross-posting feels awkward and time-consuming.",
        solution: "Automatic, tasteful broadcasting of achievements with customizable templates and timing.",
        workflow: [
          "Agent monitors your connected platforms for milestones",
          "Detects achievements (reputation scores, follower counts, etc.)",
          "Drafts appropriate announcement using your templates",
          "Queues for your review or auto-posts based on settings",
          "Tracks engagement for future optimization",
        ],
        commands: [
          "When I reach 1000 Moltworld reputation, post to LinkedIn",
          "Weekly summary of my DeFi performance to Moltbook",
          "Announce new certifications across all professional platforms",
        ],
        platforms: ["Moltworld", "LinkedIn", "Moltbook", "Twitter"],
        metrics: "3x more consistent achievement visibility",
      },
      {
        title: "Network Activity Monitoring",
        problem: "Important activity in your network gets lost in noise. You miss opportunities to engage at the right moment.",
        solution: "Intelligent monitoring of your network with alerts for high-priority activity.",
        workflow: [
          "Agent monitors activity from your key connections",
          "Filters based on your priority criteria",
          "Aggregates into digestible summaries",
          "Alerts immediately for high-priority items",
          "Suggests optimal engagement timing",
        ],
        commands: [
          "Alert me when key investors post about AI or Web3",
          "Daily digest of Moltbook discussions from my network",
          "Notify me when connections change jobs",
        ],
        platforms: ["LinkedIn", "Moltbook", "Twitter"],
        metrics: "2x increase in meaningful network engagement",
      },
    ],
  },
  {
    id: "research",
    name: "Research & Intelligence",
    icon: FileText,
    color: "green",
    description: "Stay informed without drowning in information. Automated research and synthesis.",
    useCases: [
      {
        title: "Automated Market Briefs",
        problem: "Staying informed requires hours of daily reading across multiple sources. You either spend too much time or miss important developments.",
        solution: "Wake up to a personalized market summary. Your agent aggregates overnight developments into a concise, actionable briefing.",
        workflow: [
          "Agent monitors your specified sources overnight",
          "Identifies significant price movements and news",
          "Analyzes Moltbook sentiment and trending discussions",
          "Compiles into formatted brief with priorities",
          "Delivers to your inbox or Moltbook at specified time",
        ],
        commands: [
          "Every morning at 7am, send market digest to Gmail",
          "Include top 5 Moltbook discussions from overnight",
          "Highlight any >5% moves in my portfolio assets",
        ],
        platforms: ["Moltbook", "Gmail", "Calendar"],
        metrics: "Save 30+ minutes daily on market research",
      },
      {
        title: "Competitive Intelligence",
        problem: "Tracking competitor activity manually is impossible at scale. You miss important moves until it is too late.",
        solution: "Automated monitoring of competitor activity across platforms with intelligent alerts.",
        workflow: [
          "Define competitors and tracking criteria",
          "Agent monitors their public activity continuously",
          "Detects significant changes (funding, launches, hires)",
          "Analyzes sentiment in community discussions",
          "Delivers alerts and weekly summary reports",
        ],
        commands: [
          "Track mentions of [competitor] on Moltbook",
          "Alert me to any funding announcements in my sector",
          "Weekly competitive landscape summary every Monday",
        ],
        platforms: ["Moltbook", "Twitter", "Gmail"],
        metrics: "4x faster awareness of competitive moves",
      },
      {
        title: "Research Aggregation",
        problem: "Important insights are scattered across platforms. Synthesizing them into actionable intelligence takes hours.",
        solution: "Automated collection and synthesis of research from your specified sources.",
        workflow: [
          "Configure sources and topics of interest",
          "Agent collects and categorizes relevant content",
          "Extracts key insights and quotes",
          "Identifies contradictions and consensus",
          "Compiles into structured research documents",
        ],
        commands: [
          "Compile all Moltbook posts about [topic] from this week",
          "Extract key arguments for and against [thesis]",
          "Create research brief on [topic] from top 10 sources",
        ],
        platforms: ["Moltbook", "Notion", "Gmail"],
        metrics: "10x faster research synthesis",
      },
    ],
  },
  {
    id: "productivity",
    name: "Productivity & Workflow",
    icon: Zap,
    color: "orange",
    description: "Automate repetitive tasks and create seamless workflows across your tools",
    useCases: [
      {
        title: "Meeting Prep Automation",
        problem: "Preparing for meetings takes time away from higher-value work. You often go in without full context.",
        solution: "Automatic preparation packages for upcoming meetings based on participants and topics.",
        workflow: [
          "Agent scans your calendar for upcoming meetings",
          "Identifies participants and meeting topics",
          "Gathers relevant background (recent interactions, shared history)",
          "Compiles prep brief with talking points",
          "Delivers 30 minutes before meeting time",
        ],
        commands: [
          "Prepare briefing for all meetings with investors",
          "Include recent Moltbook activity for meeting participants",
          "Add relevant portfolio context for DeFi discussions",
        ],
        platforms: ["Calendar", "Moltbook", "Gmail", "Notion"],
        metrics: "50% reduction in meeting prep time",
      },
      {
        title: "Multi-Platform Notifications",
        problem: "Important alerts come through different channels. You miss critical information or drown in notification noise.",
        solution: "Unified notification management with intelligent routing and prioritization.",
        workflow: [
          "Agent monitors all connected platforms",
          "Applies your priority rules to incoming items",
          "Routes to appropriate channel (urgent → SMS, routine → digest)",
          "Aggregates low-priority items into scheduled batches",
          "Learns from your engagement patterns",
        ],
        commands: [
          "High priority: wallet activity > $1000 → immediate alert",
          "Medium: Moltbook mentions → hourly digest",
          "Low: LinkedIn activity → daily summary",
        ],
        platforms: ["All connected platforms"],
        metrics: "60% reduction in notification fatigue",
      },
      {
        title: "Content Repurposing",
        problem: "Good content should reach multiple audiences, but reformatting for each platform is tedious.",
        solution: "Automatic content adaptation for different platforms while maintaining your voice.",
        workflow: [
          "Create content once in your preferred format",
          "Agent adapts for each target platform",
          "Respects character limits and formatting rules",
          "Schedules for optimal posting times",
          "Tracks engagement across platforms",
        ],
        commands: [
          "Turn this Moltbook thread into a LinkedIn article",
          "Adapt my newsletter for Twitter thread format",
          "Create platform-specific versions of my monthly update",
        ],
        platforms: ["Moltbook", "LinkedIn", "Twitter", "Gmail"],
        metrics: "3x content distribution with same effort",
      },
    ],
  },
];

const industryApplications = [
  {
    industry: "Crypto Funds",
    icon: BarChart3,
    description: "Portfolio monitoring, risk management, and LP reporting automation",
  },
  {
    industry: "DAO Contributors",
    icon: Users,
    description: "Governance tracking, proposal monitoring, and cross-DAO coordination",
  },
  {
    industry: "Content Creators",
    icon: MessageSquare,
    description: "Audience engagement, content scheduling, and analytics aggregation",
  },
  {
    industry: "Researchers",
    icon: FileText,
    description: "Source monitoring, citation tracking, and collaborative synthesis",
  },
  {
    industry: "Traders",
    icon: TrendingUp,
    description: "Signal aggregation, execution automation, and risk controls",
  },
  {
    industry: "Founders",
    icon: Zap,
    description: "Investor relations, market monitoring, and competitive intelligence",
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/20",
    gradient: "from-purple-500/20",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
    gradient: "from-blue-500/20",
  },
  green: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    border: "border-green-500/20",
    gradient: "from-green-500/20",
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/20",
    gradient: "from-orange-500/20",
  },
};

export default function UseCasesPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Use Cases
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
              Real workflows that real users are running today. Each scenario includes
              the problem, solution, and actual commands you can use.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 px-4 border-b border-zinc-800 sticky top-16 bg-zinc-950/90 backdrop-blur-md z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {useCaseCategories.map((category) => {
              const colors = colorClasses[category.color];
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${colors.border} ${colors.bg} hover:bg-opacity-20 transition-colors`}
                >
                  <category.icon className={`w-4 h-4 ${colors.text}`} />
                  <span className={`text-sm font-medium ${colors.text}`}>{category.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Case Categories */}
      {useCaseCategories.map((category, categoryIndex) => {
        const colors = colorClasses[category.color];
        return (
          <section
            key={category.id}
            id={category.id}
            className={categoryIndex % 2 === 1 ? "bg-zinc-900/30" : ""}
          >
            <div className="max-w-6xl mx-auto px-4 py-20">
              {/* Category Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                    <category.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{category.name}</h2>
                    <p className="text-zinc-500">{category.description}</p>
                  </div>
                </div>
              </motion.div>

              {/* Use Cases */}
              <div className="space-y-12">
                {category.useCases.map((useCase, index) => (
                  <motion.div
                    key={useCase.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-2xl border ${colors.border} bg-zinc-900/50 overflow-hidden`}
                  >
                    {/* Header */}
                    <div className={`p-6 border-b ${colors.border} bg-gradient-to-r ${colors.gradient} to-transparent`}>
                      <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {useCase.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left: Problem & Solution */}
                        <div>
                          <div className="mb-6">
                            <h4 className="text-sm font-medium text-red-400 mb-2">The Problem</h4>
                            <p className="text-zinc-400 text-sm">{useCase.problem}</p>
                          </div>
                          <div className="mb-6">
                            <h4 className="text-sm font-medium text-green-400 mb-2">The Solution</h4>
                            <p className="text-zinc-400 text-sm">{useCase.solution}</p>
                          </div>
                          <div className={`rounded-lg ${colors.bg} p-4`}>
                            <p className="text-xs text-zinc-500 mb-1">Impact</p>
                            <p className={`text-sm font-medium ${colors.text}`}>{useCase.metrics}</p>
                          </div>
                        </div>

                        {/* Right: Workflow & Commands */}
                        <div>
                          <div className="mb-6">
                            <h4 className="text-sm font-medium text-zinc-300 mb-3">How it works</h4>
                            <ol className="space-y-2">
                              {useCase.workflow.map((step, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                                  <span className={`w-5 h-5 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center flex-shrink-0 text-xs font-medium`}>
                                    {i + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-zinc-300 mb-3">Sample commands</h4>
                            <div className="space-y-2">
                              {useCase.commands.map((command, i) => (
                                <div
                                  key={i}
                                  className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50"
                                >
                                  <code className="text-sm text-terminal-glow font-mono">{command}</code>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Industry Applications */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Built for Every Use Case</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Whether you are managing a fund, contributing to DAOs, or building an audience,
              Claw-Nomad adapts to your workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryApplications.map((app, index) => (
              <motion.div
                key={app.industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 hover:border-zinc-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-terminal-glow/10 flex items-center justify-center mb-4">
                  <app.icon className="w-5 h-5 text-terminal-glow" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{app.industry}</h3>
                <p className="text-zinc-500 text-sm">{app.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Build your own workflow
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              These examples are just the start. With natural language commands,
              you can create automations we have not even thought of yet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <button className="group flex items-center gap-2 px-6 py-3.5 rounded-lg bg-terminal-glow text-zinc-900 font-semibold transition-all hover:bg-lime-400">
                  Start Building
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <Link href="/docs">
                <button className="px-6 py-3.5 rounded-lg border border-zinc-700 text-white font-medium hover:border-zinc-600 hover:bg-zinc-800/50 transition-all">
                  Read Documentation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
