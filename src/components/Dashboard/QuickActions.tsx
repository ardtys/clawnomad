"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ArrowRightLeft,
  Bell,
  FileText,
  Send,
  Calendar,
  TrendingUp,
  Plus,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

interface QuickAction {
  id: string;
  name: string;
  description: string;
  icon: typeof Zap;
  color: string;
  command: string;
  fields: { name: string; placeholder: string; type?: string }[];
}

const quickActions: QuickAction[] = [
  {
    id: "swap",
    name: "Quick Swap",
    description: "Swap tokens on DEX",
    icon: ArrowRightLeft,
    color: "purple",
    command: "Swap {amount} {fromToken} for {toToken} on Uniswap",
    fields: [
      { name: "amount", placeholder: "0.1", type: "number" },
      { name: "fromToken", placeholder: "ETH" },
      { name: "toToken", placeholder: "USDC" },
    ],
  },
  {
    id: "alert",
    name: "Price Alert",
    description: "Set price notification",
    icon: Bell,
    color: "amber",
    command: "Alert me when {token} crosses ${price}",
    fields: [
      { name: "token", placeholder: "ETH" },
      { name: "price", placeholder: "3000", type: "number" },
    ],
  },
  {
    id: "digest",
    name: "Market Digest",
    description: "Get market summary",
    icon: FileText,
    color: "blue",
    command: "Give me a summary of today's {topic} activity",
    fields: [{ name: "topic", placeholder: "Moltbook" }],
  },
  {
    id: "send",
    name: "Send Tokens",
    description: "Transfer to address",
    icon: Send,
    color: "green",
    command: "Send {amount} {token} to {address}",
    fields: [
      { name: "amount", placeholder: "0.1", type: "number" },
      { name: "token", placeholder: "ETH" },
      { name: "address", placeholder: "0x..." },
    ],
  },
  {
    id: "schedule",
    name: "Schedule Task",
    description: "Set recurring action",
    icon: Calendar,
    color: "cyan",
    command: "Every {time}, {action}",
    fields: [
      { name: "time", placeholder: "morning at 7am" },
      { name: "action", placeholder: "send me a market digest" },
    ],
  },
  {
    id: "analyze",
    name: "Sentiment Check",
    description: "Check market sentiment",
    icon: TrendingUp,
    color: "pink",
    command: "What's the current Moltbook sentiment for {token}?",
    fields: [{ name: "token", placeholder: "ETH" }],
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", hover: "hover:bg-purple-500/20" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", hover: "hover:bg-amber-500/20" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", hover: "hover:bg-blue-500/20" },
  green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20", hover: "hover:bg-green-500/20" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", hover: "hover:bg-cyan-500/20" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20", hover: "hover:bg-pink-500/20" },
};

interface QuickActionsProps {
  onActionSelect?: (command: string) => void;
}

export function QuickActions({ onActionSelect }: QuickActionsProps) {
  const { addCommand } = useDashboard();
  const [selectedAction, setSelectedAction] = useState<QuickAction | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  const handleActionClick = (action: QuickAction) => {
    setSelectedAction(action);
    setFieldValues({});
  };

  const handleFieldChange = (name: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!selectedAction) return;

    let command = selectedAction.command;
    selectedAction.fields.forEach((field) => {
      command = command.replace(`{${field.name}}`, fieldValues[field.name] || field.placeholder);
    });

    addCommand(command);
    if (onActionSelect) {
      onActionSelect(command);
    }

    setSelectedAction(null);
    setFieldValues({});
  };

  const handleClose = () => {
    setSelectedAction(null);
    setFieldValues({});
  };

  return (
    <>
      <div className="rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-terminal-glow" />
            <h3 className="font-semibold text-white text-sm sm:text-base">Quick Actions</h3>
          </div>
          <button className="hidden sm:flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors">
            <Plus className="w-3 h-3" />
            Add Custom
          </button>
        </div>

        <div className="p-2 sm:p-4 grid grid-cols-3 sm:grid-cols-3 gap-1.5 sm:gap-3">
          {quickActions.map((action) => {
            const colors = colorClasses[action.color];

            return (
              <motion.button
                key={action.id}
                onClick={() => handleActionClick(action)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-2.5 sm:p-4 rounded-lg sm:rounded-xl border ${colors.border} ${colors.bg} ${colors.hover} text-left transition-all`}
              >
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg ${colors.bg} flex items-center justify-center mb-1.5 sm:mb-3`}>
                  <action.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.text}`} />
                </div>
                <h4 className="font-medium text-white text-[10px] sm:text-sm mb-0.5 sm:mb-1 truncate">{action.name}</h4>
                <p className="text-[9px] sm:text-xs text-zinc-500 hidden sm:block">{action.description}</p>

                <ChevronRight className="absolute top-2.5 sm:top-4 right-2 sm:right-4 w-3 h-3 sm:w-4 sm:h-4 text-zinc-600 hidden sm:block" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${colorClasses[selectedAction.color].bg} flex items-center justify-center`}>
                    <selectedAction.icon className={`w-5 h-5 ${colorClasses[selectedAction.color].text}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{selectedAction.name}</h3>
                    <p className="text-xs text-zinc-500">{selectedAction.description}</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 space-y-4">
                {selectedAction.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5 capitalize">
                      {field.name}
                    </label>
                    <input
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      value={fieldValues[field.name] || ""}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-terminal-glow/50 transition-colors"
                    />
                  </div>
                ))}

                {/* Preview */}
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700">
                  <p className="text-xs text-zinc-500 mb-1">Command Preview:</p>
                  <p className="text-sm text-white font-mono">
                    {selectedAction.fields.reduce(
                      (cmd, field) =>
                        cmd.replace(
                          `{${field.name}}`,
                          fieldValues[field.name] || `[${field.placeholder}]`
                        ),
                      selectedAction.command
                    )}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 p-4 border-t border-zinc-800">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-terminal-glow text-zinc-900 font-medium hover:bg-lime-400 transition-colors"
                >
                  Execute
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
