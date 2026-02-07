"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Send,
  Loader2,
  Sparkles,
  Clock,
  ArrowRight,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

interface Suggestion {
  id: string;
  text: string;
  category: string;
}

const suggestions: Suggestion[] = [
  { id: "1", text: "Swap 0.1 ETH for USDC when gas < 20 gwei", category: "Trading" },
  { id: "2", text: "Alert me when ETH crosses $3000", category: "Alerts" },
  { id: "3", text: "Summarize today's Moltbook sentiment", category: "Research" },
  { id: "4", text: "Every morning at 7am, send me a market digest", category: "Scheduled" },
  { id: "5", text: "Check my portfolio health", category: "Portfolio" },
  { id: "6", text: "Bridge 0.5 ETH to Base when gas is cheap", category: "Trading" },
];

interface CommandInputProps {
  onSubmit?: (command: string) => void;
  initialCommand?: string;
}

export function CommandInput({ onSubmit, initialCommand = "" }: CommandInputProps) {
  const { commands, addCommand } = useDashboard();
  const [command, setCommand] = useState(initialCommand);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Get recent commands from context
  const recentCommands = commands.slice(0, 5).map((c) => c.text);

  useEffect(() => {
    if (initialCommand) {
      setCommand(initialCommand);
      inputRef.current?.focus();
    }
  }, [initialCommand]);

  const handleSubmit = async () => {
    if (!command.trim() || isLoading) return;

    setIsLoading(true);

    // Add command to context
    addCommand(command.trim());

    if (onSubmit) {
      onSubmit(command);
    }

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setCommand("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const filteredSuggestions = command.length > 0
    ? suggestions.filter((s) =>
        s.text.toLowerCase().includes(command.toLowerCase())
      )
    : suggestions;

  // Get last command status
  const lastCommand = commands[0];

  return (
    <div className="rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-zinc-800 bg-zinc-900/50">
        <Terminal className="w-4 h-4 text-terminal-glow" />
        <span className="text-xs sm:text-sm font-medium text-white">Bridge Command</span>
        <div className="ml-auto flex items-center gap-2">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1.5"
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-terminal-glow" />
            <span className="text-[10px] sm:text-xs text-zinc-500 hidden sm:inline">Agent Ready</span>
          </motion.div>
        </div>
      </div>

      {/* Last Command Status */}
      {lastCommand && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={`px-3 sm:px-4 py-2 border-b border-zinc-800 flex items-center gap-2 ${
            lastCommand.status === "completed"
              ? "bg-green-500/5"
              : lastCommand.status === "failed"
              ? "bg-red-500/5"
              : "bg-blue-500/5"
          }`}
        >
          {lastCommand.status === "completed" ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : lastCommand.status === "failed" ? (
            <AlertCircle className="w-4 h-4 text-red-400" />
          ) : (
            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
          )}
          <span className="text-xs text-zinc-400 truncate flex-1">
            {lastCommand.text}
          </span>
          <span className={`text-xs ${
            lastCommand.status === "completed"
              ? "text-green-400"
              : lastCommand.status === "failed"
              ? "text-red-400"
              : "text-blue-400"
          }`}>
            {lastCommand.status}
          </span>
        </motion.div>
      )}

      {/* Input Area */}
      <div className="p-3 sm:p-4">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Tell your agent what to do..."
            rows={2}
            className="w-full p-3 sm:p-4 pr-12 rounded-lg sm:rounded-xl bg-zinc-800/50 border border-zinc-700 text-sm sm:text-base text-white placeholder-zinc-500 resize-none focus:outline-none focus:border-terminal-glow/50 transition-colors"
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!command.trim() || isLoading}
            className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 p-1.5 sm:p-2 rounded-lg bg-terminal-glow text-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-lime-400 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            ) : (
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          {/* Clear Button */}
          {command && (
            <button
              onClick={() => setCommand("")}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1 rounded text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Suggestions */}
        <AnimatePresence>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 sm:mt-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3 h-3 text-terminal-glow" />
                <span className="text-[10px] sm:text-xs text-zinc-500">Suggestions</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {filteredSuggestions.slice(0, 3).map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => {
                      setCommand(suggestion.text);
                      inputRef.current?.focus();
                    }}
                    className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-xs sm:text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                  >
                    <span className="text-[10px] sm:text-xs text-terminal-glow">{suggestion.category}</span>
                    <span className="truncate max-w-[120px] sm:max-w-[200px]">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Commands */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-zinc-800">
          <button
            onClick={() => setShowRecent(!showRecent)}
            className="flex items-center gap-2 text-[10px] sm:text-xs text-zinc-500 hover:text-white transition-colors"
          >
            <Clock className="w-3 h-3" />
            Recent commands ({recentCommands.length})
            <ArrowRight className={`w-3 h-3 transition-transform ${showRecent ? "rotate-90" : ""}`} />
          </button>

          <AnimatePresence>
            {showRecent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 space-y-1"
              >
                {recentCommands.length === 0 ? (
                  <p className="text-xs text-zinc-600 px-2 py-2">No recent commands</p>
                ) : (
                  recentCommands.map((cmd, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCommand(cmd);
                        inputRef.current?.focus();
                      }}
                      className="w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors truncate"
                    >
                      {cmd}
                    </button>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Status Bar */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 py-3 border-t border-zinc-800 bg-terminal-glow/5"
        >
          <div className="flex items-center gap-3">
            <Loader2 className="w-4 h-4 text-terminal-glow animate-spin" />
            <div className="flex-1">
              <p className="text-sm text-white">Processing command...</p>
              <p className="text-xs text-zinc-500">Analyzing intent and planning execution</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
