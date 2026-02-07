"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Terminal,
  Cpu,
  Activity,
  CheckCircle2,
  Shield,
  Eye,
  Lock,
  RefreshCw,
  AlertTriangle,
  Clock,
  Target,
  Layers,
} from "lucide-react";
import { Navbar } from "@/components/Landing/Navbar";
import { Footer } from "@/components/Landing/Footer";

const mainSteps = [
  {
    number: "01",
    icon: Terminal,
    title: "Describe Your Intent",
    subtitle: "Natural language command input",
    description:
      "Write what you want in plain language. No need to learn a specific syntax or programming language. Your agent understands context, conditions, and complex multi-step requests.",
    details: [
      {
        title: "Natural Language Processing",
        content: "Our NLP engine parses your intent, identifying actions, conditions, platforms, and parameters automatically.",
      },
      {
        title: "Context Awareness",
        content: "Reference previous commands, ongoing tasks, or market conditions. Your agent maintains conversation history.",
      },
      {
        title: "Ambiguity Resolution",
        content: "When your command could be interpreted multiple ways, your agent asks clarifying questions before proceeding.",
      },
    ],
    examples: [
      "Swap 0.5 ETH for USDC when the price hits $2,500",
      "Every Monday at 9am, send me a Moltbook sentiment summary",
      "If my portfolio drops 10% in a day, pause all automated trading",
      "Draft a LinkedIn post when I reach 1000 reputation on Moltworld",
    ],
  },
  {
    number: "02",
    icon: Cpu,
    title: "Agent Plans Execution",
    subtitle: "Transparent strategy formulation",
    description:
      "Your agent breaks down the task into discrete steps, identifies required permissions, and creates an execution plan. You can review and approve before anything happens.",
    details: [
      {
        title: "Task Decomposition",
        content: "Complex requests are broken into atomic actions that can be executed, monitored, and rolled back if needed.",
      },
      {
        title: "Permission Checking",
        content: "Before execution, your agent verifies it has all required permissions and operates within your defined limits.",
      },
      {
        title: "Risk Assessment",
        content: "Potentially risky actions are flagged with estimated impact, allowing you to make informed decisions.",
      },
    ],
    examples: [
      "Step 1: Connect to price oracle → Step 2: Monitor ETH/USDC → Step 3: Execute swap when condition met",
      "Estimated gas: 0.002 ETH • Slippage tolerance: 0.5% • Requires wallet approval",
    ],
  },
  {
    number: "03",
    icon: Activity,
    title: "Cross-Platform Action",
    subtitle: "Seamless multi-service coordination",
    description:
      "Your agent moves between platforms as needed — reading from one, writing to another, bridging context across services that were never designed to work together.",
    details: [
      {
        title: "Unified Authentication",
        content: "Connect once, act everywhere. Your agent manages credentials securely across all integrated platforms.",
      },
      {
        title: "Context Bridging",
        content: "Information from one platform informs actions on another. Sentiment from Moltbook can trigger trades on Uniswap.",
      },
      {
        title: "Parallel Execution",
        content: "Independent actions run simultaneously for faster completion. Dependent actions are sequenced automatically.",
      },
    ],
    examples: [
      "Moltbook sentiment → Decision engine → Uniswap swap → Gmail notification",
      "Calendar event → Block trading hours → Resume at event end",
    ],
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Verify and Log",
    subtitle: "Complete auditability",
    description:
      "Every action is recorded with full reasoning. Review outcomes, understand why decisions were made, and refine your agent's behavior based on actual results.",
    details: [
      {
        title: "Decision Logging",
        content: "Not just what happened, but why. Each decision includes the data considered and reasoning applied.",
      },
      {
        title: "Outcome Tracking",
        content: "Track the results of automated actions over time. See which strategies work and which need adjustment.",
      },
      {
        title: "Export & Compliance",
        content: "Export detailed logs for record-keeping, tax reporting, or compliance requirements.",
      },
    ],
    examples: [
      "Action: Sold 0.1 ETH • Price: $2,340 • Gas: 0.002 ETH • Reason: Sentiment dropped below threshold",
      "Weekly report: 12 actions executed, 11 successful, 1 cancelled (insufficient gas)",
    ],
  },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "Local Encryption",
    description: "All credentials and agent memory are encrypted on your device using AES-256. Your private keys never leave your machine.",
  },
  {
    icon: Shield,
    title: "Permission Boundaries",
    description: "Set strict limits on spending, actions per day, and which platforms your agent can access. Boundaries are enforced at the protocol level.",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Stop",
    description: "Instantly halt all agent activity with a single command. Pending transactions can be cancelled before confirmation.",
  },
  {
    icon: Eye,
    title: "Audit Trail",
    description: "Every action is logged immutably. Review the complete history of what your agent did and why.",
  },
];

const workflowTypes = [
  {
    icon: Clock,
    title: "Scheduled Tasks",
    description: "Actions that run at specific times",
    example: "Every morning at 7am, compile overnight Moltbook activity into a digest",
    color: "blue",
  },
  {
    icon: Target,
    title: "Conditional Triggers",
    description: "Actions that fire when conditions are met",
    example: "When ETH drops 5% in an hour, send me an alert and pause auto-trading",
    color: "purple",
  },
  {
    icon: Layers,
    title: "Multi-Step Workflows",
    description: "Complex sequences across platforms",
    example: "Check Moltbook sentiment → If bullish, swap USDC to ETH → Post update",
    color: "green",
  },
  {
    icon: RefreshCw,
    title: "Recurring Automations",
    description: "Continuous background monitoring",
    example: "Monitor my DeFi positions and auto-compound rewards weekly",
    color: "orange",
  },
];

const faqItems = [
  {
    question: "How does the agent access my accounts securely?",
    answer: "Your credentials are encrypted locally using your device's secure enclave when available. For Web3, you sign a message to grant limited permissions — your private keys are never shared. For Web2 services, we use OAuth where available, and API keys are stored encrypted on your device.",
  },
  {
    question: "Can I review actions before they execute?",
    answer: "Yes. You can configure your agent to require approval for any action type. High-value transactions, first-time actions, or anything you specify can be held for your review before execution.",
  },
  {
    question: "What happens if something goes wrong?",
    answer: "Your agent includes multiple safety mechanisms: spending limits prevent runaway costs, emergency stop halts all activity instantly, and transaction simulation helps catch errors before execution. For blockchain transactions, you can set gas limits and use flashbots to avoid failed transaction costs.",
  },
  {
    question: "How does the agent learn my preferences?",
    answer: "Your agent observes patterns in your approvals and rejections. Over time, it can suggest optimizations to your workflows. However, it never changes its behavior without your explicit approval — learning is suggestive, not autonomous.",
  },
  {
    question: "Is my data used to train AI models?",
    answer: "No. Your commands, credentials, and activity logs are never used for model training. Your data stays on your device and is only transmitted (encrypted) when executing actions on your behalf.",
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
};

export default function HowItWorksPage() {
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
              How Claw-Nomad Works
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
              From natural language intent to cross-platform execution — understand the complete
              journey of how your agent turns commands into actions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {mainSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-16 last:mb-0"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Left: Main Content */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm font-mono text-terminal-glow">{step.number}</span>
                    <div className="w-12 h-12 rounded-xl bg-terminal-glow/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-terminal-glow" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{step.title}</h2>
                  <p className="text-terminal-glow text-sm mb-4">{step.subtitle}</p>
                  <p className="text-zinc-400 leading-relaxed mb-6">{step.description}</p>

                  <div className="space-y-4">
                    {step.details.map((detail, i) => (
                      <div key={i} className="pl-4 border-l-2 border-zinc-800">
                        <h4 className="text-white font-medium mb-1">{detail.title}</h4>
                        <p className="text-sm text-zinc-500">{detail.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Examples */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Terminal className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-500">Examples</span>
                  </div>
                  <div className="space-y-3">
                    {step.examples.map((example, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50"
                      >
                        <code className="text-sm text-zinc-300 font-mono">{example}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {index < mainSteps.length - 1 && (
                <div className="flex justify-center my-8">
                  <div className="w-px h-16 bg-gradient-to-b from-terminal-glow/50 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow Types */}
      <section className="py-20 px-4 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Types of Workflows</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Different automation patterns for different needs. Mix and match to build
              sophisticated multi-platform workflows.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {workflowTypes.map((workflow, index) => {
              const colors = colorClasses[workflow.color];
              return (
                <motion.div
                  key={workflow.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-xl border ${colors.border} bg-zinc-900/50 p-6`}
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                    <workflow.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{workflow.title}</h3>
                  <p className="text-zinc-400 text-sm mb-4">{workflow.description}</p>
                  <div className={`rounded-lg ${colors.bg} p-3`}>
                    <code className={`text-sm ${colors.text} font-mono`}>{workflow.example}</code>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Built-In Security</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Your agent has power, but you have control. Multiple layers of security
              ensure your assets and data stay protected.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-terminal-glow/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-terminal-glow" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-zinc-400">
              Common questions about how Claw-Nomad operates.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <h3 className="text-lg font-medium text-white mb-3">{item.question}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to try it yourself?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              The best way to understand Claw-Nomad is to use it. Start with a simple
              automation and expand from there.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <button className="group flex items-center gap-2 px-6 py-3.5 rounded-lg bg-terminal-glow text-zinc-900 font-semibold transition-all hover:bg-lime-400">
                  Open Dashboard
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <Link href="/use-cases">
                <button className="px-6 py-3.5 rounded-lg border border-zinc-700 text-white font-medium hover:border-zinc-600 hover:bg-zinc-800/50 transition-all">
                  Explore Use Cases
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
