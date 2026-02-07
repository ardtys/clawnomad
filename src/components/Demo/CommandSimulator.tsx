"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Loader2,
  CheckCircle2,
  Zap,
  Clock,
  X,
  Play,
  Calendar,
} from "lucide-react";

interface ParsedCommand {
  action: string;
  details: string[];
  conditions: string[];
  estimation: string;
}

const sampleCommands = [
  "Swap 0.1 ETH to USDC when gas < 20 gwei",
  "Send weekly newsletter from top Moltworld discussions",
  "Alert me when $CLAW price drops 10%",
  "Schedule meeting when both calendars are free",
  "Bridge 0.5 ETH to Base when gas is low",
];

const parseCommand = (command: string): ParsedCommand => {
  const lowerCmd = command.toLowerCase();

  if (lowerCmd.includes("swap")) {
    return {
      action: "SWAP",
      details: [
        "Token: ETH → USDC",
        "Amount: 0.1 ETH",
        "DEX: Uniswap V3",
      ],
      conditions: ["Gas price < 20 gwei"],
      estimation: "~185.50 USDC (after fees)",
    };
  } else if (lowerCmd.includes("newsletter") || lowerCmd.includes("email")) {
    return {
      action: "EMAIL",
      details: [
        "Type: Newsletter Draft",
        "Source: Moltworld Top 10",
        "Recipients: Subscriber List",
      ],
      conditions: ["Weekly schedule"],
      estimation: "~500 words generated",
    };
  } else if (lowerCmd.includes("alert") || lowerCmd.includes("notify")) {
    return {
      action: "ALERT",
      details: [
        "Type: Price Alert",
        "Token: $CLAW",
        "Channel: Telegram + Email",
      ],
      conditions: ["Price drops 10%"],
      estimation: "Monitoring active",
    };
  } else if (lowerCmd.includes("meeting") || lowerCmd.includes("calendar")) {
    return {
      action: "CALENDAR",
      details: [
        "Type: Meeting Scheduler",
        "Duration: 30 minutes",
        "Platform: Google Meet",
      ],
      conditions: ["Both calendars free"],
      estimation: "3 slots available this week",
    };
  } else if (lowerCmd.includes("bridge")) {
    return {
      action: "BRIDGE",
      details: [
        "From: Ethereum Mainnet",
        "To: Base",
        "Amount: 0.5 ETH",
      ],
      conditions: ["Gas < 25 gwei"],
      estimation: "~0.498 ETH received",
    };
  }

  return {
    action: "CUSTOM",
    details: ["Analyzing command...", "Building execution plan"],
    conditions: ["Manual approval required"],
    estimation: "Awaiting configuration",
  };
};

export function CommandSimulator() {
  const [command, setCommand] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [parsedCommand, setParsedCommand] = useState<ParsedCommand | null>(null);

  const processCommand = () => {
    if (!command.trim()) return;

    setIsProcessing(true);
    setSteps([]);
    setCurrentStep(0);
    setParsedCommand(null);

    const processingSteps = [
      "Parsing natural language...",
      "Identifying action type...",
      "Extracting parameters...",
      "Validating conditions...",
      "Building execution plan...",
    ];

    processingSteps.forEach((step, index) => {
      setTimeout(() => {
        setSteps((prev) => [...prev, step]);
        setCurrentStep(index + 1);

        if (index === processingSteps.length - 1) {
          setTimeout(() => {
            setParsedCommand(parseCommand(command));
            setIsProcessing(false);
          }, 500);
        }
      }, (index + 1) * 600);
    });
  };

  const reset = () => {
    setCommand("");
    setSteps([]);
    setCurrentStep(0);
    setParsedCommand(null);
    setIsProcessing(false);
  };

  const actionIcons: Record<string, React.ReactNode> = {
    SWAP: <Zap className="w-5 h-5" />,
    EMAIL: <Terminal className="w-5 h-5" />,
    ALERT: <Clock className="w-5 h-5" />,
    CALENDAR: <Calendar className="w-5 h-5" />,
    BRIDGE: <Zap className="w-5 h-5" />,
    CUSTOM: <Terminal className="w-5 h-5" />,
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-terminal-glow" />
          <h3 className="font-semibold text-white">Command Simulator</h3>
        </div>
        <p className="text-xs text-zinc-500 mt-1">Type a natural language command to see how Claw-Nomad processes it</p>
      </div>

      {/* Input Area */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-terminal-glow font-mono">{">"}</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && processCommand()}
              placeholder="Try: Swap 0.1 ETH to USDC when gas < 20 gwei"
              className="w-full pl-8 pr-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 font-mono text-sm focus:outline-none focus:border-terminal-glow transition-colors"
              disabled={isProcessing}
            />
          </div>
          <button
            onClick={processCommand}
            disabled={isProcessing || !command.trim()}
            className="px-4 py-3 rounded-lg bg-terminal-glow text-zinc-900 font-semibold hover:bg-lime-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
          </button>
        </div>

        {/* Sample Commands */}
        <div className="flex flex-wrap gap-2 mt-3">
          {sampleCommands.slice(0, 3).map((sample, i) => (
            <button
              key={i}
              onClick={() => setCommand(sample)}
              className="px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors truncate max-w-[200px]"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Processing Steps */}
      <AnimatePresence>
        {(steps.length > 0 || parsedCommand) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-zinc-800"
          >
            <div className="p-4 space-y-2">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm"
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  ) : (
                    <Loader2 className="w-4 h-4 text-terminal-glow animate-spin flex-shrink-0" />
                  )}
                  <span className={index < currentStep ? "text-zinc-400" : "text-white"}>
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parsed Result */}
      <AnimatePresence>
        {parsedCommand && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-4"
          >
            <div className="rounded-xl border border-terminal-glow/30 bg-terminal-glow/5 p-4">
              {/* Action Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-terminal-glow/20 text-terminal-glow">
                    {actionIcons[parsedCommand.action]}
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500">Detected Action</span>
                    <h4 className="font-bold text-terminal-glow">{parsedCommand.action}</h4>
                  </div>
                </div>
                <button onClick={reset} className="p-1 text-zinc-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-xs text-zinc-500 block mb-1">Details</span>
                  {parsedCommand.details.map((detail, i) => (
                    <p key={i} className="text-sm text-zinc-300">{detail}</p>
                  ))}
                </div>
                <div>
                  <span className="text-xs text-zinc-500 block mb-1">Conditions</span>
                  {parsedCommand.conditions.map((cond, i) => (
                    <p key={i} className="text-sm text-zinc-300">{cond}</p>
                  ))}
                </div>
                <div>
                  <span className="text-xs text-zinc-500 block mb-1">Estimation</span>
                  <p className="text-sm text-terminal-glow font-medium">{parsedCommand.estimation}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-terminal-glow text-zinc-900 font-semibold hover:bg-lime-400 transition-colors text-sm">
                  Execute Now
                </button>
                <button className="flex-1 py-2 rounded-lg border border-zinc-700 text-white hover:bg-zinc-800 transition-colors text-sm">
                  Schedule
                </button>
                <button onClick={reset} className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
