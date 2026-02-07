"use client";

import { useParams } from "next/navigation";
import { DocsLayout, DocContent } from "@/components/Docs";
import { CodeBlock, Callout, Step, ApiEndpoint, ParameterTable } from "@/components/Docs/DocContent";
import Link from "next/link";

// Documentation content organized by section and slug
const docsContent: Record<string, Record<string, {
  title: string;
  description: string;
  lastUpdated: string;
  content: React.ReactNode;
}>> = {
  "getting-started": {
    introduction: {
      title: "Introduction to Claw-Nomad",
      description: "Learn what Claw-Nomad is and how it can automate your cross-platform workflows.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="what-is-claw-nomad" className="text-2xl font-bold text-white mt-8 mb-4">
            What is Claw-Nomad?
          </h2>
          <p className="text-zinc-400 mb-4 leading-relaxed">
            Claw-Nomad is an autonomous agent protocol that enables you to automate actions across
            Web2 services (Gmail, LinkedIn, Calendar), Web3 protocols (wallets, DEXs, DeFi), and
            Moltworld platforms — all through natural language commands.
          </p>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Instead of manually switching between apps, writing scripts, or setting up complex
            integrations, you simply describe what you want in plain English. Your agent handles
            the rest.
          </p>

          <Callout type="info" title="Example">
            <code className="text-terminal-glow">&quot;When ETH drops 5%, sell 10% of my position and notify me on Moltbook&quot;</code>
            <p className="mt-2">This single command monitors prices, executes trades, and posts updates — automatically.</p>
          </Callout>

          <h2 id="key-features" className="text-2xl font-bold text-white mt-8 mb-4">
            Key Features
          </h2>
          <ul className="space-y-3 text-zinc-400 mb-6">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-glow mt-2 flex-shrink-0" />
              <span><strong className="text-white">Natural Language Commands</strong> — No coding required. Describe your intent in plain English.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-glow mt-2 flex-shrink-0" />
              <span><strong className="text-white">Cross-Platform Execution</strong> — Actions flow seamlessly between Web2, Web3, and Moltworld.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-glow mt-2 flex-shrink-0" />
              <span><strong className="text-white">Local-First Security</strong> — Your credentials are encrypted on your device. We never see your keys.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-glow mt-2 flex-shrink-0" />
              <span><strong className="text-white">Full Transparency</strong> — Every decision is logged with reasoning. Audit anytime.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-glow mt-2 flex-shrink-0" />
              <span><strong className="text-white">Granular Controls</strong> — Set spending limits, require approvals, restrict platforms.</span>
            </li>
          </ul>

          <h2 id="how-it-works" className="text-2xl font-bold text-white mt-8 mb-4">
            How It Works
          </h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="w-10 h-10 rounded-full bg-terminal-glow/20 flex items-center justify-center text-terminal-glow font-bold mx-auto mb-2">1</div>
                <p className="text-sm text-white font-medium">You describe</p>
                <p className="text-xs text-zinc-500">Natural language command</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-terminal-glow/20 flex items-center justify-center text-terminal-glow font-bold mx-auto mb-2">2</div>
                <p className="text-sm text-white font-medium">Agent plans</p>
                <p className="text-xs text-zinc-500">Breaks down into steps</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-terminal-glow/20 flex items-center justify-center text-terminal-glow font-bold mx-auto mb-2">3</div>
                <p className="text-sm text-white font-medium">Agent executes</p>
                <p className="text-xs text-zinc-500">Across platforms</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-terminal-glow/20 flex items-center justify-center text-terminal-glow font-bold mx-auto mb-2">4</div>
                <p className="text-sm text-white font-medium">You verify</p>
                <p className="text-xs text-zinc-500">Full audit trail</p>
              </div>
            </div>
          </div>

          <h2 id="next-steps" className="text-2xl font-bold text-white mt-8 mb-4">
            Next Steps
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/docs/getting-started/quick-start" className="block p-4 rounded-xl border border-zinc-800 hover:border-terminal-glow/50 hover:bg-zinc-900/50 transition-all">
              <p className="font-medium text-white mb-1">Quick Start Guide →</p>
              <p className="text-sm text-zinc-500">Get running in 5 minutes</p>
            </Link>
            <Link href="/docs/core-concepts/architecture" className="block p-4 rounded-xl border border-zinc-800 hover:border-terminal-glow/50 hover:bg-zinc-900/50 transition-all">
              <p className="font-medium text-white mb-1">Architecture →</p>
              <p className="text-sm text-zinc-500">Understand how agents work</p>
            </Link>
          </div>
        </>
      ),
    },
    "quick-start": {
      title: "Quick Start Guide",
      description: "Get your first agent running in under 5 minutes.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <Callout type="info">
            This guide assumes you have a Claw-Nomad account. If not, <Link href="/dashboard" className="text-terminal-glow hover:underline">sign up here</Link> first.
          </Callout>

          <h2 id="step-1" className="text-2xl font-bold text-white mt-8 mb-4">
            Step 1: Access the Dashboard
          </h2>
          <p className="text-zinc-400 mb-4">
            Navigate to the Claw-Nomad dashboard and log in with your account credentials.
          </p>
          <CodeBlock
            code="https://app.clawnomad.com/dashboard"
            language="url"
          />

          <h2 id="step-2" className="text-2xl font-bold text-white mt-8 mb-4">
            Step 2: Create Your Agent
          </h2>
          <p className="text-zinc-400 mb-4">
            Click the &quot;Create Agent&quot; button and give your agent a name. This creates a new
            agent instance with its own memory and configuration.
          </p>
          <Step number={1} title="Name your agent">
            <p>Choose a descriptive name like &quot;Trading Assistant&quot; or &quot;Social Manager&quot;.
            You can create multiple agents for different purposes.</p>
          </Step>
          <Step number={2} title="Select initial mode">
            <p>Choose between <strong>Assisted</strong> (requires approval for actions) or
            <strong>Autonomous</strong> (acts within your limits). We recommend starting with Assisted.</p>
          </Step>

          <h2 id="step-3" className="text-2xl font-bold text-white mt-8 mb-4">
            Step 3: Connect Your First Platform
          </h2>
          <p className="text-zinc-400 mb-4">
            Go to Settings → Integrations and connect at least one platform. We recommend starting
            with a read-only integration like Gmail to test safely.
          </p>
          <CodeBlock
            code={`// Example: Connecting Gmail
1. Click "Connect Gmail"
2. Authorize with your Google account
3. Select permissions (read-only recommended initially)
4. Confirm connection`}
            language="text"
            filename="integration-steps.txt"
          />

          <Callout type="warning" title="Security Tip">
            Start with read-only permissions until you&apos;re comfortable with how your agent behaves.
            You can always expand permissions later.
          </Callout>

          <h2 id="step-4" className="text-2xl font-bold text-white mt-8 mb-4">
            Step 4: Set Basic Permissions
          </h2>
          <p className="text-zinc-400 mb-4">
            Navigate to the Vault section and configure your agent&apos;s boundaries:
          </p>
          <ul className="space-y-2 text-zinc-400 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-terminal-glow">•</span>
              <span><strong className="text-white">Daily spending limit:</strong> Set a maximum amount your agent can spend per day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terminal-glow">•</span>
              <span><strong className="text-white">Approval threshold:</strong> Actions above this value require your approval</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terminal-glow">•</span>
              <span><strong className="text-white">Platform restrictions:</strong> Limit which platforms can be accessed</span>
            </li>
          </ul>

          <h2 id="step-5" className="text-2xl font-bold text-white mt-8 mb-4">
            Step 5: Run Your First Command
          </h2>
          <p className="text-zinc-400 mb-4">
            Open the Bridge Command interface and try a simple read-only command:
          </p>
          <CodeBlock
            code={`"Show me a summary of my Gmail inbox from today"`}
            language="text"
          />
          <p className="text-zinc-400 mb-4">
            Your agent will parse the command, connect to Gmail, and return a summary.
            Check the Activity Map to see the execution steps.
          </p>

          <Callout type="success" title="Congratulations!">
            You&apos;ve just run your first Claw-Nomad command. Explore more complex commands
            in the <Link href="/docs/core-concepts/commands" className="text-terminal-glow hover:underline">Command Language</Link> documentation.
          </Callout>

          <h2 id="next-steps" className="text-2xl font-bold text-white mt-8 mb-4">
            What&apos;s Next?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/docs/getting-started/first-agent" className="block p-4 rounded-xl border border-zinc-800 hover:border-terminal-glow/50 hover:bg-zinc-900/50 transition-all">
              <p className="font-medium text-white mb-1">Your First Agent →</p>
              <p className="text-sm text-zinc-500">Deep dive into agent setup</p>
            </Link>
            <Link href="/docs/integrations/overview" className="block p-4 rounded-xl border border-zinc-800 hover:border-terminal-glow/50 hover:bg-zinc-900/50 transition-all">
              <p className="font-medium text-white mb-1">All Integrations →</p>
              <p className="text-sm text-zinc-500">Connect more platforms</p>
            </Link>
          </div>
        </>
      ),
    },
    installation: {
      title: "Installation",
      description: "Different ways to access and install Claw-Nomad.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Claw-Nomad is available as a web application, CLI tool, and SDK. Choose the method
            that best fits your workflow.
          </p>

          <h2 id="web-app" className="text-2xl font-bold text-white mt-8 mb-4">
            Web Application (Recommended)
          </h2>
          <p className="text-zinc-400 mb-4">
            The easiest way to get started. No installation required.
          </p>
          <CodeBlock
            code="https://app.clawnomad.com"
            language="url"
          />

          <h2 id="cli" className="text-2xl font-bold text-white mt-8 mb-4">
            Command Line Interface
          </h2>
          <p className="text-zinc-400 mb-4">
            For power users who prefer terminal-based workflows.
          </p>
          <CodeBlock
            code={`# Install via npm
npm install -g @claw-nomad/cli

# Or via yarn
yarn global add @claw-nomad/cli

# Verify installation
claw-nomad --version`}
            language="bash"
            filename="terminal"
          />

          <h3 id="cli-auth" className="text-xl font-semibold text-white mt-6 mb-3">
            Authentication
          </h3>
          <CodeBlock
            code={`# Login to your account
claw-nomad login

# This opens a browser for OAuth authentication
# Your token is stored securely in ~/.claw-nomad/config`}
            language="bash"
            filename="terminal"
          />

          <h3 id="cli-usage" className="text-xl font-semibold text-white mt-6 mb-3">
            Basic CLI Usage
          </h3>
          <CodeBlock
            code={`# Run a command
claw-nomad run "Check my ETH balance"

# List connected platforms
claw-nomad integrations list

# View recent activity
claw-nomad activity --limit 10

# Interactive mode
claw-nomad interactive`}
            language="bash"
            filename="terminal"
          />

          <h2 id="sdk" className="text-2xl font-bold text-white mt-8 mb-4">
            SDK Integration
          </h2>
          <p className="text-zinc-400 mb-4">
            Integrate Claw-Nomad into your own applications.
          </p>
          <CodeBlock
            code={`# Install the SDK
npm install @claw-nomad/sdk

# TypeScript/JavaScript usage
import { ClawNomad } from '@claw-nomad/sdk';

const agent = new ClawNomad({
  apiKey: process.env.CLAW_NOMAD_API_KEY,
});

// Run a command
const result = await agent.run("Check ETH price");
console.log(result);`}
            language="typescript"
            filename="example.ts"
          />

          <Callout type="info" title="API Keys">
            Generate API keys from Dashboard → Settings → API Keys.
            Never commit keys to version control.
          </Callout>

          <h2 id="system-requirements" className="text-2xl font-bold text-white mt-8 mb-4">
            System Requirements
          </h2>
          <ParameterTable
            parameters={[
              { name: "Node.js", type: "v18+", required: true, description: "Required for CLI and SDK" },
              { name: "Browser", type: "Modern", required: true, description: "Chrome, Firefox, Safari, Edge" },
              { name: "OS", type: "Any", required: false, description: "Windows, macOS, Linux" },
            ]}
          />
        </>
      ),
    },
    "first-agent": {
      title: "Your First Agent",
      description: "A comprehensive guide to setting up and configuring your first autonomous agent.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            This guide walks you through creating a fully configured agent, from initial setup
            through your first automated workflow.
          </p>

          <h2 id="planning" className="text-2xl font-bold text-white mt-8 mb-4">
            1. Planning Your Agent
          </h2>
          <p className="text-zinc-400 mb-4">
            Before creating your agent, consider these questions:
          </p>
          <ul className="space-y-2 text-zinc-400 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-terminal-glow">•</span>
              <span><strong className="text-white">What tasks will it handle?</strong> Trading, social management, research, notifications?</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terminal-glow">•</span>
              <span><strong className="text-white">Which platforms does it need?</strong> Start with the minimum required.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terminal-glow">•</span>
              <span><strong className="text-white">What are the boundaries?</strong> Spending limits, approval requirements?</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terminal-glow">•</span>
              <span><strong className="text-white">How autonomous should it be?</strong> Full auto vs. approval-based?</span>
            </li>
          </ul>

          <Callout type="info" title="Pro Tip">
            Start with a single, well-defined use case. You can always expand later.
            A focused agent is easier to trust and debug.
          </Callout>

          <h2 id="creation" className="text-2xl font-bold text-white mt-8 mb-4">
            2. Creating the Agent
          </h2>
          <Step number={1} title="Navigate to Dashboard">
            <p>Log in and click &quot;Create New Agent&quot; in the top right corner.</p>
          </Step>
          <Step number={2} title="Configure Basic Settings">
            <CodeBlock
              code={`Agent Name: "DeFi Assistant"
Description: "Monitors positions and executes trades based on market conditions"
Mode: Assisted (recommended for new agents)
Timezone: Auto-detect`}
              language="yaml"
              filename="agent-config"
            />
          </Step>
          <Step number={3} title="Select Integrations">
            <p>For a DeFi-focused agent, you might connect:</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Wallet (Ethereum mainnet)</li>
              <li>• Uniswap (for swaps)</li>
              <li>• Moltbook (for sentiment)</li>
            </ul>
          </Step>

          <h2 id="permissions" className="text-2xl font-bold text-white mt-8 mb-4">
            3. Configuring Permissions
          </h2>
          <p className="text-zinc-400 mb-4">
            Set up appropriate guardrails for your agent:
          </p>
          <CodeBlock
            code={`# Recommended starter permissions
{
  "spending": {
    "daily_limit": "0.1 ETH",
    "per_transaction_limit": "0.05 ETH",
    "require_approval_above": "0.02 ETH"
  },
  "platforms": {
    "wallet": {
      "read": true,
      "write": true,
      "max_gas": "0.01 ETH"
    },
    "uniswap": {
      "swap": true,
      "max_slippage": "1%"
    }
  },
  "schedule": {
    "active_hours": "00:00-23:59",
    "timezone": "UTC"
  }
}`}
            language="json"
            filename="permissions.json"
          />

          <h2 id="first-workflow" className="text-2xl font-bold text-white mt-8 mb-4">
            4. Creating Your First Workflow
          </h2>
          <p className="text-zinc-400 mb-4">
            Let&apos;s create a simple monitoring workflow:
          </p>
          <CodeBlock
            code={`"Every hour, check my wallet balance. If ETH balance drops below 0.5 ETH,
alert me on Moltbook."`}
            language="text"
          />
          <p className="text-zinc-400 mt-4 mb-4">
            Your agent will break this down into:
          </p>
          <ol className="space-y-2 text-zinc-400 mb-6 list-decimal list-inside">
            <li>Schedule a recurring check every hour</li>
            <li>Connect to wallet and read ETH balance</li>
            <li>Compare against threshold (0.5 ETH)</li>
            <li>If below threshold, post to Moltbook</li>
          </ol>

          <h2 id="testing" className="text-2xl font-bold text-white mt-8 mb-4">
            5. Testing Your Agent
          </h2>
          <Callout type="warning" title="Always Test First">
            Run commands manually before enabling automation. Check the Activity Map to
            verify each step executes as expected.
          </Callout>
          <p className="text-zinc-400 mb-4">
            Test your workflow by running it manually first:
          </p>
          <CodeBlock
            code={`"Check my wallet balance now"`}
            language="text"
          />
          <p className="text-zinc-400 mt-4">
            Review the execution in the Activity Map. Once satisfied, enable the scheduled version.
          </p>
        </>
      ),
    },
  },
  "core-concepts": {
    architecture: {
      title: "Agent Architecture",
      description: "Understand the internal structure and decision-making process of Claw-Nomad agents.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Claw-Nomad agents are built on a modular architecture that separates understanding,
            planning, and execution. This design ensures transparency, safety, and flexibility.
          </p>

          <h2 id="overview" className="text-2xl font-bold text-white mt-8 mb-4">
            Architecture Overview
          </h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 mb-6 font-mono text-sm">
            <pre className="text-zinc-400">
{`┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                        │
│  (Dashboard / CLI / API)                                │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  COMMAND PARSER                          │
│  Natural Language → Structured Intent                   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  PLANNING ENGINE                         │
│  Intent → Execution Steps → Permission Check            │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                 EXECUTION RUNTIME                        │
│  Steps → Platform Actions → Results                     │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│               PLATFORM CONNECTORS                        │
│  Gmail │ Wallet │ Uniswap │ Moltbook │ ...             │
└─────────────────────────────────────────────────────────┘`}
            </pre>
          </div>

          <h2 id="components" className="text-2xl font-bold text-white mt-8 mb-4">
            Core Components
          </h2>

          <h3 id="command-parser" className="text-xl font-semibold text-white mt-6 mb-3">
            Command Parser
          </h3>
          <p className="text-zinc-400 mb-4">
            The Command Parser transforms natural language into structured intent:
          </p>
          <CodeBlock
            code={`// Input: Natural language command
"Swap 0.1 ETH for USDC when gas is below 20 gwei"

// Output: Structured intent
{
  "action": "swap",
  "params": {
    "from": { "token": "ETH", "amount": "0.1" },
    "to": { "token": "USDC" }
  },
  "conditions": [
    { "type": "gas_price", "operator": "<", "value": "20 gwei" }
  ],
  "trigger": "conditional"
}`}
            language="json"
          />

          <h3 id="planning-engine" className="text-xl font-semibold text-white mt-6 mb-3">
            Planning Engine
          </h3>
          <p className="text-zinc-400 mb-4">
            The Planning Engine converts intent into executable steps while checking permissions:
          </p>
          <CodeBlock
            code={`// Execution plan for the swap
{
  "steps": [
    {
      "id": 1,
      "action": "monitor_gas",
      "platform": "ethereum",
      "params": { "threshold": "20 gwei" }
    },
    {
      "id": 2,
      "action": "get_quote",
      "platform": "uniswap",
      "params": { "from": "ETH", "to": "USDC", "amount": "0.1" },
      "depends_on": [1]
    },
    {
      "id": 3,
      "action": "execute_swap",
      "platform": "uniswap",
      "params": { "quote_id": "{{step_2.quote_id}}" },
      "depends_on": [2],
      "requires_approval": true
    }
  ],
  "permissions_required": ["wallet:write", "uniswap:swap"]
}`}
            language="json"
          />

          <h3 id="execution-runtime" className="text-xl font-semibold text-white mt-6 mb-3">
            Execution Runtime
          </h3>
          <p className="text-zinc-400 mb-4">
            The runtime executes steps in order, handling errors and logging everything:
          </p>
          <ul className="space-y-2 text-zinc-400 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-terminal-glow">•</span>
              <span><strong className="text-white">Dependency resolution</strong> — Steps execute in correct order</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terminal-glow">•</span>
              <span><strong className="text-white">Error handling</strong> — Automatic retry with backoff</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terminal-glow">•</span>
              <span><strong className="text-white">Approval gates</strong> — Pause for user confirmation when required</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terminal-glow">•</span>
              <span><strong className="text-white">Audit logging</strong> — Every action recorded with reasoning</span>
            </li>
          </ul>

          <h2 id="memory" className="text-2xl font-bold text-white mt-8 mb-4">
            Agent Memory
          </h2>
          <p className="text-zinc-400 mb-4">
            Each agent maintains encrypted memory that includes:
          </p>
          <ParameterTable
            parameters={[
              { name: "credentials", type: "encrypted", required: true, description: "Platform tokens and keys" },
              { name: "history", type: "log[]", required: true, description: "Past commands and results" },
              { name: "preferences", type: "object", required: false, description: "Learned user patterns" },
              { name: "context", type: "object", required: false, description: "Ongoing task state" },
            ]}
          />

          <Callout type="info" title="Privacy Note">
            Agent memory is encrypted with your personal key. Even Claw-Nomad servers cannot
            read your stored data.
          </Callout>
        </>
      ),
    },
    commands: {
      title: "Command Language",
      description: "Learn how to write effective commands for your agent.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Claw-Nomad understands natural language, but knowing the patterns helps you write
            more precise and powerful commands.
          </p>

          <h2 id="basic-commands" className="text-2xl font-bold text-white mt-8 mb-4">
            Basic Commands
          </h2>
          <p className="text-zinc-400 mb-4">Simple, immediate actions:</p>
          <CodeBlock
            code={`# Read operations
"What's my ETH balance?"
"Show me today's Gmail inbox"
"Get the current Moltbook sentiment for BTC"

# Write operations
"Send 0.1 ETH to 0x123..."
"Post 'Hello World' to Moltbook"
"Create a calendar event for tomorrow at 2pm"`}
            language="text"
          />

          <h2 id="conditional" className="text-2xl font-bold text-white mt-8 mb-4">
            Conditional Commands
          </h2>
          <p className="text-zinc-400 mb-4">Actions that depend on conditions:</p>
          <CodeBlock
            code={`# Price-based
"When ETH crosses $3000, alert me"
"If BTC drops 5% in an hour, sell 10%"

# Time-based
"Every Monday at 9am, send me a portfolio summary"
"In 2 hours, check if my transaction confirmed"

# State-based
"When my position health drops below 1.5, add collateral"
"If Moltbook sentiment turns bearish, pause trading"`}
            language="text"
          />

          <h2 id="multi-step" className="text-2xl font-bold text-white mt-8 mb-4">
            Multi-Step Commands
          </h2>
          <p className="text-zinc-400 mb-4">Complex workflows across platforms:</p>
          <CodeBlock
            code={`# Cross-platform workflow
"Check Moltbook sentiment. If bullish, swap 0.5 ETH for the
trending token, then post my trade to Moltbook"

# Conditional chain
"When gas drops below 20 gwei, bridge 1 ETH to Base, then
swap half for USDC on Aerodrome"

# Scheduled pipeline
"Every morning at 7am: compile overnight Moltbook discussions,
summarize key points, and email me the digest"`}
            language="text"
          />

          <h2 id="syntax-tips" className="text-2xl font-bold text-white mt-8 mb-4">
            Syntax Tips
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Be Specific with Amounts</h4>
              <p className="text-sm text-zinc-400 mb-2">Include units and precision:</p>
              <div className="flex gap-4 text-sm font-mono">
                <span className="text-red-400">✗ &quot;Send some ETH&quot;</span>
                <span className="text-green-400">✓ &quot;Send 0.1 ETH&quot;</span>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Use Clear Conditions</h4>
              <p className="text-sm text-zinc-400 mb-2">Specify thresholds explicitly:</p>
              <div className="flex gap-4 text-sm font-mono">
                <span className="text-red-400">✗ &quot;When price is low&quot;</span>
                <span className="text-green-400">✓ &quot;When price drops below $2000&quot;</span>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Specify Platforms When Ambiguous</h4>
              <p className="text-sm text-zinc-400 mb-2">Be explicit about which service to use:</p>
              <div className="flex gap-4 text-sm font-mono">
                <span className="text-red-400">✗ &quot;Post an update&quot;</span>
                <span className="text-green-400">✓ &quot;Post to Moltbook&quot;</span>
              </div>
            </div>
          </div>

          <h2 id="variables" className="text-2xl font-bold text-white mt-8 mb-4">
            Using Variables
          </h2>
          <p className="text-zinc-400 mb-4">
            Reference dynamic values in your commands:
          </p>
          <CodeBlock
            code={`# Built-in variables
"Alert me when ETH moves 5% from {{current_price}}"
"Send {{portfolio_value}} summary to my email"

# Cross-reference results
"Get Moltbook sentiment, then if {{sentiment}} > 70,
buy {{sentiment / 100}} ETH"`}
            language="text"
          />
        </>
      ),
    },
    execution: {
      title: "Execution Model",
      description: "How your agent executes commands safely and reliably.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Understanding the execution model helps you predict agent behavior and debug issues.
          </p>

          <h2 id="lifecycle" className="text-2xl font-bold text-white mt-8 mb-4">
            Execution Lifecycle
          </h2>
          <div className="space-y-4 mb-6">
            <Step number={1} title="Parse">
              <p>Natural language is converted to structured intent with identified actions,
              parameters, and conditions.</p>
            </Step>
            <Step number={2} title="Plan">
              <p>Intent is broken into atomic steps with dependencies, permission requirements,
              and risk assessment.</p>
            </Step>
            <Step number={3} title="Validate">
              <p>Permissions are checked, limits are verified, and the plan is validated
              before any execution.</p>
            </Step>
            <Step number={4} title="Execute">
              <p>Steps run in order, with results passed between dependent steps.
              Errors trigger retry or abort.</p>
            </Step>
            <Step number={5} title="Log">
              <p>Every action, decision, and result is recorded in the immutable audit log.</p>
            </Step>
          </div>

          <h2 id="error-handling" className="text-2xl font-bold text-white mt-8 mb-4">
            Error Handling
          </h2>
          <p className="text-zinc-400 mb-4">
            The agent handles errors gracefully:
          </p>
          <ParameterTable
            parameters={[
              { name: "Retry", type: "automatic", required: true, description: "Transient errors retry with exponential backoff" },
              { name: "Fallback", type: "optional", required: false, description: "Alternative actions when primary fails" },
              { name: "Abort", type: "automatic", required: true, description: "Unrecoverable errors stop execution safely" },
              { name: "Notify", type: "configurable", required: false, description: "Alert user on specified error types" },
            ]}
          />

          <Callout type="info" title="Transaction Safety">
            For blockchain transactions, the agent simulates before executing and monitors
            for confirmation. Failed transactions are reported immediately.
          </Callout>
        </>
      ),
    },
    context: {
      title: "Context & Memory",
      description: "How your agent maintains context across interactions.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Your agent maintains context to understand references, remember preferences,
            and provide continuity across sessions.
          </p>

          <h2 id="context-types" className="text-2xl font-bold text-white mt-8 mb-4">
            Types of Context
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Session Context</h4>
              <p className="text-sm text-zinc-500">Current conversation history, recent commands, temporary state.</p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Persistent Memory</h4>
              <p className="text-sm text-zinc-500">Learned preferences, historical patterns, saved configurations.</p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Platform State</h4>
              <p className="text-sm text-zinc-500">Current balances, positions, active subscriptions.</p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Task State</h4>
              <p className="text-sm text-zinc-500">Ongoing workflows, pending conditions, scheduled jobs.</p>
            </div>
          </div>

          <h2 id="referencing" className="text-2xl font-bold text-white mt-8 mb-4">
            Referencing Previous Context
          </h2>
          <CodeBlock
            code={`# Reference previous results
User: "Check my ETH balance"
Agent: "Your ETH balance is 2.5 ETH"
User: "Send half of that to 0x123..."
Agent: [Sends 1.25 ETH]

# Reference ongoing tasks
User: "How's that trade I set up yesterday?"
Agent: [Retrieves status of pending conditional order]`}
            language="text"
          />
        </>
      ),
    },
    triggers: {
      title: "Triggers & Conditions",
      description: "Set up automated responses to events and conditions.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Triggers enable your agent to act automatically when specific conditions are met.
          </p>

          <h2 id="trigger-types" className="text-2xl font-bold text-white mt-8 mb-4">
            Trigger Types
          </h2>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">Price Triggers</h3>
          <CodeBlock
            code={`"When ETH crosses $3000, alert me"
"If BTC drops 10% from current price, sell 50%"
"Alert when gas price falls below 15 gwei"`}
            language="text"
          />

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">Time Triggers</h3>
          <CodeBlock
            code={`"Every day at 9am, send portfolio summary"
"In 2 hours, check transaction status"
"Every Monday, rebalance to target allocation"`}
            language="text"
          />

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">Event Triggers</h3>
          <CodeBlock
            code={`"When I receive an email from boss@company.com, alert me"
"If Moltbook sentiment changes by 20 points, notify me"
"When my position health drops below 1.5, add collateral"`}
            language="text"
          />

          <h2 id="combining" className="text-2xl font-bold text-white mt-8 mb-4">
            Combining Conditions
          </h2>
          <CodeBlock
            code={`# AND conditions
"When ETH > $3000 AND gas < 20 gwei, bridge to L2"

# OR conditions
"Alert me when BTC drops 5% OR sentiment turns bearish"

# Complex chains
"When gas is low AND sentiment is bullish AND I have > 1 ETH,
swap 0.5 ETH for the top trending token"`}
            language="text"
          />

          <Callout type="warning" title="Trigger Limits">
            Each agent can have up to 50 active triggers. Triggers consuming excessive
            resources may be rate-limited.
          </Callout>
        </>
      ),
    },
  },
  integrations: {
    overview: {
      title: "Integrations Overview",
      description: "Connect your agent to platforms across Web2, Web3, and Moltworld.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Claw-Nomad connects to 15+ platforms across three ecosystems. Each integration
            provides deep functionality, not just surface-level access.
          </p>

          <h2 id="categories" className="text-2xl font-bold text-white mt-8 mb-4">
            Integration Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Link href="/docs/integrations/web2" className="block p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
              <div className="w-3 h-3 rounded-full bg-blue-500 mb-3" />
              <h3 className="font-medium text-white mb-1">Web2</h3>
              <p className="text-sm text-zinc-500">Gmail, LinkedIn, Calendar, Notion</p>
            </Link>
            <Link href="/docs/integrations/web3" className="block p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 transition-colors">
              <div className="w-3 h-3 rounded-full bg-purple-500 mb-3" />
              <h3 className="font-medium text-white mb-1">Web3</h3>
              <p className="text-sm text-zinc-500">Wallets, DEXs, DeFi, Bridges</p>
            </Link>
            <Link href="/docs/integrations/moltworld" className="block p-4 rounded-xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors">
              <div className="w-3 h-3 rounded-full bg-green-500 mb-3" />
              <h3 className="font-medium text-white mb-1">Moltworld</h3>
              <p className="text-sm text-zinc-500">Moltbook, Signals, Reputation</p>
            </Link>
          </div>

          <h2 id="connecting" className="text-2xl font-bold text-white mt-8 mb-4">
            Connecting Platforms
          </h2>
          <Step number={1} title="Navigate to Integrations">
            <p>Go to Dashboard → Settings → Integrations</p>
          </Step>
          <Step number={2} title="Select Platform">
            <p>Click the platform you want to connect</p>
          </Step>
          <Step number={3} title="Authorize Access">
            <p>Complete OAuth flow or provide API credentials</p>
          </Step>
          <Step number={4} title="Configure Permissions">
            <p>Set read/write access and any platform-specific limits</p>
          </Step>

          <Callout type="info" title="Credentials Security">
            All credentials are encrypted locally. OAuth tokens refresh automatically.
            API keys are never transmitted in plaintext.
          </Callout>
        </>
      ),
    },
    web2: {
      title: "Web2 Integrations",
      description: "Connect traditional web services like Gmail, LinkedIn, and Calendar.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="gmail" className="text-2xl font-bold text-white mt-8 mb-4">Gmail</h2>
          <p className="text-zinc-400 mb-4">Full email management capabilities:</p>
          <ul className="space-y-2 text-zinc-400 mb-6">
            <li>• Read and parse incoming emails</li>
            <li>• Compose and send emails</li>
            <li>• Filter by sender, subject, or content</li>
            <li>• Attach files from other integrations</li>
          </ul>
          <CodeBlock
            code={`# Example commands
"Show me unread emails from today"
"Send an email to team@company.com with subject 'Weekly Update'"
"Forward all emails from alerts@exchange.com to my Notion"`}
            language="text"
          />

          <h2 id="linkedin" className="text-2xl font-bold text-white mt-8 mb-4">LinkedIn</h2>
          <p className="text-zinc-400 mb-4">Professional network automation:</p>
          <ul className="space-y-2 text-zinc-400 mb-6">
            <li>• Update profile information</li>
            <li>• Post status updates</li>
            <li>• Monitor connection activity</li>
            <li>• Sync bio across platforms</li>
          </ul>

          <h2 id="calendar" className="text-2xl font-bold text-white mt-8 mb-4">Calendar</h2>
          <p className="text-zinc-400 mb-4">Time and event management:</p>
          <ul className="space-y-2 text-zinc-400 mb-6">
            <li>• Create and modify events</li>
            <li>• Check availability</li>
            <li>• Set reminders</li>
            <li>• Block time automatically</li>
          </ul>
        </>
      ),
    },
    web3: {
      title: "Web3 & DeFi Integrations",
      description: "Connect wallets, DEXs, and DeFi protocols.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="wallets" className="text-2xl font-bold text-white mt-8 mb-4">Multi-Chain Wallets</h2>
          <p className="text-zinc-400 mb-4">Supported networks:</p>
          <ul className="space-y-2 text-zinc-400 mb-6">
            <li>• Ethereum Mainnet</li>
            <li>• Base</li>
            <li>• Arbitrum</li>
            <li>• Optimism</li>
            <li>• Polygon</li>
          </ul>

          <Callout type="warning" title="Security">
            Your private keys never leave your device. Transactions are signed locally
            and only the signed transaction is broadcast.
          </Callout>

          <h2 id="dex" className="text-2xl font-bold text-white mt-8 mb-4">DEX Protocols</h2>
          <CodeBlock
            code={`# Supported DEXs
- Uniswap (v2, v3)
- SushiSwap
- Aerodrome (Base)
- Velodrome (Optimism)

# Example commands
"Swap 0.5 ETH for USDC on Uniswap"
"Find the best rate for 1000 USDC → ETH across DEXs"
"Set a limit order: buy ETH at $2000"`}
            language="text"
          />

          <h2 id="defi" className="text-2xl font-bold text-white mt-8 mb-4">DeFi Protocols</h2>
          <ul className="space-y-2 text-zinc-400 mb-6">
            <li>• Aave (lending/borrowing)</li>
            <li>• Compound (lending)</li>
            <li>• Curve (stablecoin swaps)</li>
            <li>• Lido (liquid staking)</li>
          </ul>
        </>
      ),
    },
    moltworld: {
      title: "Moltworld Integration",
      description: "Connect to the AI-native social coordination layer.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="moltbook" className="text-2xl font-bold text-white mt-8 mb-4">Moltbook</h2>
          <p className="text-zinc-400 mb-4">Social sentiment and discussions:</p>
          <CodeBlock
            code={`# Reading
"What's the current Moltbook sentiment for ETH?"
"Summarize today's top discussions"
"Find posts mentioning [topic]"

# Writing
"Post to Moltbook: Just completed my first Claw-Nomad workflow!"
"Share my trade outcome to Moltbook"`}
            language="text"
          />

          <h2 id="signals" className="text-2xl font-bold text-white mt-8 mb-4">Signal Network</h2>
          <p className="text-zinc-400 mb-4">Market intelligence feeds:</p>
          <ul className="space-y-2 text-zinc-400 mb-6">
            <li>• Subscribe to signal channels</li>
            <li>• Receive real-time alerts</li>
            <li>• Verify signal accuracy</li>
            <li>• Track historical performance</li>
          </ul>

          <h2 id="reputation" className="text-2xl font-bold text-white mt-8 mb-4">Reputation System</h2>
          <p className="text-zinc-400 mb-4">Soulbound identity and trust:</p>
          <CodeBlock
            code={`"What's my current Moltworld reputation score?"
"Show reputation history for the past month"
"Which features unlock at 1000 reputation?"`}
            language="text"
          />
        </>
      ),
    },
    custom: {
      title: "Custom Integrations",
      description: "Build your own platform integrations using the SDK.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Extend Claw-Nomad with custom integrations for platforms we don&apos;t support yet.
          </p>

          <h2 id="sdk" className="text-2xl font-bold text-white mt-8 mb-4">
            Using the Integration SDK
          </h2>
          <CodeBlock
            code={`import { Integration, Action } from '@claw-nomad/sdk';

class CustomPlatform extends Integration {
  name = 'my-platform';

  @Action('read_data')
  async readData(params: { query: string }) {
    // Your implementation
    const result = await this.api.get('/data', params);
    return result;
  }

  @Action('write_data')
  async writeData(params: { data: any }) {
    // Your implementation
    return await this.api.post('/data', params);
  }
}

// Register the integration
agent.registerIntegration(new CustomPlatform());`}
            language="typescript"
            filename="custom-integration.ts"
          />

          <Callout type="info">
            Custom integrations run in a sandboxed environment with the same permission
            controls as built-in integrations.
          </Callout>
        </>
      ),
    },
  },
  security: {
    model: {
      title: "Security Model",
      description: "How Claw-Nomad protects your assets and data.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Security is foundational to Claw-Nomad. We use a local-first architecture
            that keeps your sensitive data on your device.
          </p>

          <h2 id="principles" className="text-2xl font-bold text-white mt-8 mb-4">
            Core Security Principles
          </h2>
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Local-First</h4>
              <p className="text-sm text-zinc-400">
                Credentials, private keys, and agent memory are encrypted and stored locally.
                Our servers never see your sensitive data.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Zero-Knowledge</h4>
              <p className="text-sm text-zinc-400">
                Commands are processed in a way that we can execute actions without
                having access to the underlying credentials.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Defense in Depth</h4>
              <p className="text-sm text-zinc-400">
                Multiple layers of protection: encryption, permissions, limits, approvals,
                and audit logging.
              </p>
            </div>
          </div>

          <h2 id="encryption" className="text-2xl font-bold text-white mt-8 mb-4">
            Encryption
          </h2>
          <ParameterTable
            parameters={[
              { name: "Algorithm", type: "AES-256-GCM", required: true, description: "Industry-standard symmetric encryption" },
              { name: "Key Derivation", type: "PBKDF2", required: true, description: "Password-based key derivation" },
              { name: "Storage", type: "Local", required: true, description: "Encrypted data stays on your device" },
            ]}
          />
        </>
      ),
    },
    permissions: {
      title: "Permissions",
      description: "Configure what your agent can and cannot do.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="permission-types" className="text-2xl font-bold text-white mt-8 mb-4">
            Permission Types
          </h2>
          <CodeBlock
            code={`{
  "platforms": {
    "gmail": {
      "read": true,      // Can read emails
      "write": false,    // Cannot send emails
      "delete": false    // Cannot delete emails
    },
    "wallet": {
      "read": true,      // Can check balances
      "write": true,     // Can send transactions
      "max_value": "0.1 ETH"  // Per-transaction limit
    }
  }
}`}
            language="json"
            filename="permissions.json"
          />

          <h2 id="approval-workflows" className="text-2xl font-bold text-white mt-8 mb-4">
            Approval Workflows
          </h2>
          <p className="text-zinc-400 mb-4">
            Configure which actions require your explicit approval:
          </p>
          <ul className="space-y-2 text-zinc-400 mb-6">
            <li>• All transactions above a threshold</li>
            <li>• First-time actions on a platform</li>
            <li>• Actions outside normal hours</li>
            <li>• Specific action types (e.g., all swaps)</li>
          </ul>
        </>
      ),
    },
    limits: {
      title: "Spending Limits",
      description: "Set financial boundaries for your agent.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="limit-types" className="text-2xl font-bold text-white mt-8 mb-4">
            Limit Types
          </h2>
          <ParameterTable
            parameters={[
              { name: "daily_limit", type: "amount", required: true, description: "Maximum spend per 24 hours" },
              { name: "per_tx_limit", type: "amount", required: true, description: "Maximum per transaction" },
              { name: "approval_threshold", type: "amount", required: false, description: "Require approval above this" },
              { name: "gas_limit", type: "amount", required: false, description: "Maximum gas per transaction" },
            ]}
          />

          <CodeBlock
            code={`{
  "limits": {
    "daily_limit": "1 ETH",
    "per_transaction": "0.5 ETH",
    "require_approval_above": "0.1 ETH",
    "max_gas": "0.05 ETH",
    "max_slippage": "2%"
  }
}`}
            language="json"
            filename="limits.json"
          />
        </>
      ),
    },
    encryption: {
      title: "Encryption Details",
      description: "Technical details of how your data is encrypted.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="overview" className="text-2xl font-bold text-white mt-8 mb-4">
            Encryption Overview
          </h2>
          <p className="text-zinc-400 mb-6">
            All sensitive data is encrypted using AES-256-GCM before being stored locally.
          </p>

          <h2 id="what-encrypted" className="text-2xl font-bold text-white mt-8 mb-4">
            What&apos;s Encrypted
          </h2>
          <ul className="space-y-2 text-zinc-400 mb-6">
            <li>• OAuth tokens and API keys</li>
            <li>• Wallet private keys (if stored)</li>
            <li>• Agent memory and history</li>
            <li>• Configuration and preferences</li>
          </ul>

          <Callout type="info" title="Hardware Security">
            When available, we use your device&apos;s secure enclave (TPM, Secure Enclave)
            for key storage.
          </Callout>
        </>
      ),
    },
    audit: {
      title: "Audit Logs",
      description: "Track and review all agent activity.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="what-logged" className="text-2xl font-bold text-white mt-8 mb-4">
            What&apos;s Logged
          </h2>
          <ul className="space-y-2 text-zinc-400 mb-6">
            <li>• Every command received</li>
            <li>• Execution plan created</li>
            <li>• Each action taken</li>
            <li>• Decision reasoning</li>
            <li>• Results and errors</li>
          </ul>

          <h2 id="viewing" className="text-2xl font-bold text-white mt-8 mb-4">
            Viewing Logs
          </h2>
          <CodeBlock
            code={`# Via Dashboard
Dashboard → Activity → Logs

# Via CLI
claw-nomad logs --limit 100

# Via API
GET /api/v1/logs?limit=100`}
            language="text"
          />
        </>
      ),
    },
  },
  "api-reference": {
    auth: {
      title: "API Authentication",
      description: "Authenticate your API requests.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="api-keys" className="text-2xl font-bold text-white mt-8 mb-4">
            API Keys
          </h2>
          <p className="text-zinc-400 mb-4">
            Generate API keys from Dashboard → Settings → API Keys.
          </p>
          <CodeBlock
            code={`# Include in request header
Authorization: Bearer YOUR_API_KEY

# Example request
curl -X POST https://api.clawnomad.com/v1/commands \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"command": "Check ETH balance"}'`}
            language="bash"
            filename="terminal"
          />

          <Callout type="warning" title="Key Security">
            Never expose API keys in client-side code. Use environment variables
            and server-side requests.
          </Callout>
        </>
      ),
    },
    "commands-api": {
      title: "Commands API",
      description: "Execute commands programmatically.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <ApiEndpoint
            method="POST"
            path="/v1/commands"
            description="Execute a natural language command"
          />
          <CodeBlock
            code={`// Request
POST /v1/commands
{
  "command": "Check my ETH balance",
  "agent_id": "agent_123",  // optional
  "async": false            // wait for result
}

// Response
{
  "id": "cmd_abc123",
  "status": "completed",
  "result": {
    "balance": "2.5 ETH",
    "usd_value": "$6,250.00"
  },
  "execution_time_ms": 450
}`}
            language="json"
          />

          <ApiEndpoint
            method="GET"
            path="/v1/commands/:id"
            description="Get command status and result"
          />

          <ApiEndpoint
            method="GET"
            path="/v1/commands"
            description="List recent commands"
          />
        </>
      ),
    },
    webhooks: {
      title: "Webhooks",
      description: "Receive real-time notifications for events.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="setup" className="text-2xl font-bold text-white mt-8 mb-4">
            Setting Up Webhooks
          </h2>
          <CodeBlock
            code={`POST /v1/webhooks
{
  "url": "https://your-server.com/webhook",
  "events": ["command.completed", "trigger.fired", "error"],
  "secret": "whsec_..."  // for signature verification
}`}
            language="json"
          />

          <h2 id="events" className="text-2xl font-bold text-white mt-8 mb-4">
            Available Events
          </h2>
          <ParameterTable
            parameters={[
              { name: "command.completed", type: "event", required: false, description: "When a command finishes" },
              { name: "command.failed", type: "event", required: false, description: "When a command fails" },
              { name: "trigger.fired", type: "event", required: false, description: "When a trigger activates" },
              { name: "approval.required", type: "event", required: false, description: "When user approval needed" },
            ]}
          />
        </>
      ),
    },
    sdks: {
      title: "SDKs",
      description: "Official client libraries for popular languages.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="javascript" className="text-2xl font-bold text-white mt-8 mb-4">
            JavaScript / TypeScript
          </h2>
          <CodeBlock
            code={`npm install @claw-nomad/sdk

import { ClawNomad } from '@claw-nomad/sdk';

const agent = new ClawNomad({
  apiKey: process.env.CLAW_NOMAD_API_KEY,
});

const result = await agent.run("Check ETH balance");
console.log(result);`}
            language="typescript"
            filename="example.ts"
          />

          <h2 id="python" className="text-2xl font-bold text-white mt-8 mb-4">
            Python
          </h2>
          <CodeBlock
            code={`pip install claw-nomad

from claw_nomad import ClawNomad

agent = ClawNomad(api_key=os.environ["CLAW_NOMAD_API_KEY"])

result = agent.run("Check ETH balance")
print(result)`}
            language="python"
            filename="example.py"
          />
        </>
      ),
    },
    "rate-limits": {
      title: "Rate Limits",
      description: "API rate limits and best practices.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="limits" className="text-2xl font-bold text-white mt-8 mb-4">
            Default Limits
          </h2>
          <ParameterTable
            parameters={[
              { name: "Commands", type: "100/min", required: true, description: "Command execution requests" },
              { name: "Reads", type: "1000/min", required: true, description: "Status and log queries" },
              { name: "Webhooks", type: "10/sec", required: true, description: "Webhook deliveries" },
            ]}
          />

          <h2 id="headers" className="text-2xl font-bold text-white mt-8 mb-4">
            Rate Limit Headers
          </h2>
          <CodeBlock
            code={`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000`}
            language="text"
          />
        </>
      ),
    },
  },
  troubleshooting: {
    "common-issues": {
      title: "Common Issues",
      description: "Solutions to frequently encountered problems.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="connection" className="text-2xl font-bold text-white mt-8 mb-4">
            Connection Issues
          </h2>
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">OAuth Token Expired</h4>
              <p className="text-sm text-zinc-400 mb-2">
                <strong>Symptom:</strong> &quot;Authentication failed&quot; errors for Web2 platforms
              </p>
              <p className="text-sm text-zinc-400">
                <strong>Solution:</strong> Go to Settings → Integrations → Reconnect the platform
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Wallet Not Responding</h4>
              <p className="text-sm text-zinc-400 mb-2">
                <strong>Symptom:</strong> Transaction timeouts or &quot;wallet unavailable&quot;
              </p>
              <p className="text-sm text-zinc-400">
                <strong>Solution:</strong> Check your wallet extension is unlocked and on the correct network
              </p>
            </div>
          </div>

          <h2 id="execution" className="text-2xl font-bold text-white mt-8 mb-4">
            Execution Issues
          </h2>
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Command Not Understood</h4>
              <p className="text-sm text-zinc-400 mb-2">
                <strong>Symptom:</strong> Agent asks for clarification repeatedly
              </p>
              <p className="text-sm text-zinc-400">
                <strong>Solution:</strong> Be more specific with amounts, platforms, and conditions.
                See <Link href="/docs/core-concepts/commands" className="text-terminal-glow hover:underline">Command Language</Link>.
              </p>
            </div>
          </div>
        </>
      ),
    },
    "error-codes": {
      title: "Error Codes",
      description: "Reference for all error codes and their meanings.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="codes" className="text-2xl font-bold text-white mt-8 mb-4">
            Error Code Reference
          </h2>
          <ParameterTable
            parameters={[
              { name: "AUTH_001", type: "error", required: false, description: "Invalid or expired API key" },
              { name: "AUTH_002", type: "error", required: false, description: "Insufficient permissions" },
              { name: "EXEC_001", type: "error", required: false, description: "Command parsing failed" },
              { name: "EXEC_002", type: "error", required: false, description: "Platform unavailable" },
              { name: "EXEC_003", type: "error", required: false, description: "Rate limit exceeded" },
              { name: "LIMIT_001", type: "error", required: false, description: "Spending limit reached" },
              { name: "LIMIT_002", type: "error", required: false, description: "Approval required" },
            ]}
          />
        </>
      ),
    },
    faq: {
      title: "FAQ",
      description: "Frequently asked questions about Claw-Nomad.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Is my data safe?</h4>
              <p className="text-sm text-zinc-400">
                Yes. All sensitive data (credentials, keys, memory) is encrypted locally on your device.
                Our servers never see your private information.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">Can I use Claw-Nomad for trading?</h4>
              <p className="text-sm text-zinc-400">
                Yes, with appropriate limits set. We recommend starting with small amounts and
                enabling approval requirements until you trust your agent&apos;s behavior.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-medium text-white mb-2">What happens if my agent makes a mistake?</h4>
              <p className="text-sm text-zinc-400">
                Spending limits and approval requirements prevent costly errors. All actions are
                logged, and you can pause your agent instantly with the emergency stop.
              </p>
            </div>
          </div>
        </>
      ),
    },
    help: {
      title: "Getting Help",
      description: "How to get support when you need it.",
      lastUpdated: "January 15, 2025",
      content: (
        <>
          <h2 id="community" className="text-2xl font-bold text-white mt-8 mb-4">
            Community Support
          </h2>
          <p className="text-zinc-400 mb-4">
            Join our Discord community for real-time help from the team and other users.
          </p>
          <a
            href="https://discord.gg/clawnomad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2] text-white font-medium hover:bg-[#4752C4] transition-colors"
          >
            Join Discord
          </a>

          <h2 id="email" className="text-2xl font-bold text-white mt-8 mb-4">
            Email Support
          </h2>
          <p className="text-zinc-400 mb-4">
            For account issues or private matters, email us at{" "}
            <a href="mailto:support@clawnomad.com" className="text-terminal-glow hover:underline">
              support@clawnomad.com
            </a>
          </p>

          <h2 id="bugs" className="text-2xl font-bold text-white mt-8 mb-4">
            Bug Reports
          </h2>
          <p className="text-zinc-400 mb-4">
            Found a bug? Report it on our GitHub issues page with reproduction steps.
          </p>
        </>
      ),
    },
  },
};

export default function DocsPage() {
  const params = useParams();
  const slug = params.slug as string[];

  if (!slug || slug.length < 2) {
    // Redirect to docs home or show 404
    return (
      <DocsLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-zinc-400 mb-6">The documentation page you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/docs" className="text-terminal-glow hover:underline">
            Return to Documentation Home
          </Link>
        </div>
      </DocsLayout>
    );
  }

  const [section, page] = slug;
  const content = docsContent[section]?.[page];

  if (!content) {
    return (
      <DocsLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-zinc-400 mb-6">
            The page <code className="text-terminal-glow">/docs/{section}/{page}</code> doesn&apos;t exist.
          </p>
          <Link href="/docs" className="text-terminal-glow hover:underline">
            Return to Documentation Home
          </Link>
        </div>
      </DocsLayout>
    );
  }

  return (
    <DocsLayout>
      <DocContent
        title={content.title}
        description={content.description}
        lastUpdated={content.lastUpdated}
      >
        {content.content}
      </DocContent>
    </DocsLayout>
  );
}
