"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  Zap,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: Date;
  status?: "sending" | "sent" | "error";
  action?: {
    type: string;
    description: string;
    status: "pending" | "executed";
  };
}

const agentResponses: Record<string, { response: string; action?: Message["action"] }> = {
  swap: {
    response: "I'll prepare a swap for you. Based on current rates, you'll receive approximately 185.50 USDC for 0.1 ETH after fees.",
    action: { type: "SWAP", description: "0.1 ETH → USDC on Uniswap V3", status: "pending" },
  },
  price: {
    response: "Current prices:\n• ETH: $1,855.42 (+2.3%)\n• BTC: $43,250.00 (+1.8%)\n• CLAW: $0.0234 (+15.2%)\n\nI can set up price alerts if you'd like.",
    action: undefined,
  },
  balance: {
    response: "Here's your portfolio overview:\n• 0.85 ETH ($1,577.10)\n• 1,234 USDC\n• 50,000 CLAW ($1,170.00)\n\nTotal: ~$3,981.10",
    action: undefined,
  },
  bridge: {
    response: "I can bridge your assets to Base for you. Current gas on Ethereum is 15 gwei - good time to bridge! Shall I proceed with 0.2 ETH?",
    action: { type: "BRIDGE", description: "0.2 ETH → Base via LayerZero", status: "pending" },
  },
  newsletter: {
    response: "I'll draft a newsletter based on this week's top Moltworld discussions. I found 3 trending topics:\n1. Web3 adoption metrics\n2. AI agent governance\n3. Cross-chain liquidity\n\nShall I proceed with the draft?",
    action: { type: "EMAIL", description: "Draft weekly newsletter", status: "pending" },
  },
  help: {
    response: "Here's what I can help you with:\n\n**Web3**\n• Swap tokens\n• Bridge assets\n• Check balances\n• Set price alerts\n\n**Web2**\n• Draft emails\n• Schedule meetings\n• Create newsletters\n\n**Moltworld**\n• Analyze sentiment\n• Track discussions\n• Post updates\n\nJust tell me what you need!",
    action: undefined,
  },
  default: {
    response: "I understand you want me to help with that. Let me analyze the request and prepare an execution plan. Is there anything specific you'd like me to prioritize?",
    action: undefined,
  },
};

const suggestedPrompts = [
  "Swap 0.1 ETH to USDC",
  "What's the price of ETH?",
  "Check my balance",
  "Help me bridge to Base",
];

export function ChatWithAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "agent",
      content: "Hello! I'm your Claw-Nomad agent. I can help you with Web2, Web3, and Moltworld tasks. What would you like to do today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAgentResponse = (userMessage: string): { response: string; action?: Message["action"] } => {
    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.includes("swap") || lowerMsg.includes("exchange")) {
      return agentResponses.swap;
    } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("worth")) {
      return agentResponses.price;
    } else if (lowerMsg.includes("balance") || lowerMsg.includes("portfolio") || lowerMsg.includes("wallet")) {
      return agentResponses.balance;
    } else if (lowerMsg.includes("bridge") || lowerMsg.includes("transfer") && lowerMsg.includes("base")) {
      return agentResponses.bridge;
    } else if (lowerMsg.includes("newsletter") || lowerMsg.includes("email") || lowerMsg.includes("draft")) {
      return agentResponses.newsletter;
    } else if (lowerMsg.includes("help") || lowerMsg.includes("what can") || lowerMsg.includes("?")) {
      return agentResponses.help;
    }

    return agentResponses.default;
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate agent thinking
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const { response, action } = getAgentResponse(userMessage.content);

    const agentMessage: Message = {
      id: `agent-${Date.now()}`,
      role: "agent",
      content: response,
      timestamp: new Date(),
      action,
    };

    setMessages((prev) => [...prev, agentMessage]);
    setIsTyping(false);
  };

  const executeAction = (messageId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId && m.action
          ? { ...m, action: { ...m.action, status: "executed" as const } }
          : m
      )
    );
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden flex flex-col h-[500px]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/80 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-terminal-glow" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full" />
          </div>
          <h3 className="font-semibold text-white">Chat with Agent</h3>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-green-500/20 text-green-400 border border-green-500/30">
            Online
          </span>
        </div>
        <p className="text-xs text-zinc-500 mt-1">Natural language interface for your autonomous agent</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === "agent"
                    ? "bg-terminal-glow/20 text-terminal-glow"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {message.role === "agent" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Content */}
              <div
                className={`max-w-[80%] ${
                  message.role === "user" ? "text-right" : ""
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2.5 ${
                    message.role === "agent"
                      ? "bg-zinc-800 text-zinc-100 rounded-tl-sm"
                      : "bg-terminal-glow/20 text-white rounded-tr-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>

                {/* Action Card */}
                {message.action && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-2 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-terminal-glow" />
                        <span className="text-xs font-medium text-white">{message.action.type}</span>
                      </div>
                      {message.action.status === "pending" ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-yellow-500/20 text-yellow-400">
                          Pending
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-green-500/20 text-green-400">
                          Executed
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mb-2">{message.action.description}</p>
                    {message.action.status === "pending" && (
                      <button
                        onClick={() => executeAction(message.id)}
                        className="w-full py-1.5 rounded-lg bg-terminal-glow text-zinc-900 text-xs font-medium hover:bg-lime-400 transition-colors"
                      >
                        Execute Action
                      </button>
                    )}
                  </motion.div>
                )}

                <span className="text-[10px] text-zinc-600 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-terminal-glow/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-terminal-glow" />
              </div>
              <div className="bg-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-terminal-glow rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-terminal-glow rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-terminal-glow rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="px-4 py-2 border-t border-zinc-800/50 flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInput(prompt)}
              className="px-3 py-1.5 rounded-full text-xs bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors whitespace-nowrap flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/80 flex-shrink-0">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-terminal-glow transition-colors"
              disabled={isTyping}
            />
            <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="px-4 py-3 rounded-xl bg-terminal-glow text-zinc-900 font-semibold hover:bg-lime-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
