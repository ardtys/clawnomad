"use client";

import { useState, useMemo } from "react";
import {
  Terminal,
  ChevronDown,
  Copy,
  Check,
  Zap,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

const actions: SelectOption[] = [
  { value: "swap", label: "Swap", icon: "🔄" },
  { value: "bridge", label: "Bridge", icon: "🌉" },
  { value: "send", label: "Send", icon: "📤" },
  { value: "alert", label: "Alert me", icon: "🔔" },
  { value: "schedule", label: "Schedule", icon: "📅" },
  { value: "check", label: "Check", icon: "🔍" },
];

const platforms: SelectOption[] = [
  { value: "uniswap", label: "Uniswap", icon: "🦄" },
  { value: "aave", label: "Aave", icon: "👻" },
  { value: "gmail", label: "Gmail", icon: "📧" },
  { value: "telegram", label: "Telegram", icon: "✈️" },
  { value: "calendar", label: "Calendar", icon: "📆" },
  { value: "moltworld", label: "Moltworld", icon: "🌐" },
];

const conditions: SelectOption[] = [
  { value: "none", label: "No condition", icon: "➖" },
  { value: "gas", label: "When gas <", icon: "⛽" },
  { value: "price", label: "When price", icon: "💰" },
  { value: "time", label: "At time", icon: "⏰" },
  { value: "sentiment", label: "When sentiment", icon: "📊" },
];

const conditionValues: Record<string, SelectOption[]> = {
  gas: [
    { value: "15", label: "15 gwei" },
    { value: "20", label: "20 gwei" },
    { value: "30", label: "30 gwei" },
    { value: "50", label: "50 gwei" },
  ],
  price: [
    { value: "drops_10", label: "drops 10%" },
    { value: "rises_10", label: "rises 10%" },
    { value: "below_2000", label: "ETH below $2000" },
    { value: "above_2000", label: "ETH above $2000" },
  ],
  time: [
    { value: "9am", label: "9:00 AM" },
    { value: "12pm", label: "12:00 PM" },
    { value: "6pm", label: "6:00 PM" },
    { value: "daily", label: "Daily" },
  ],
  sentiment: [
    { value: "bullish_70", label: "bullish > 70%" },
    { value: "bearish_60", label: "bearish > 60%" },
    { value: "neutral", label: "turns neutral" },
  ],
};

const actionDetails: Record<string, SelectOption[]> = {
  swap: [
    { value: "0.1_eth_usdc", label: "0.1 ETH → USDC" },
    { value: "0.5_eth_usdc", label: "0.5 ETH → USDC" },
    { value: "100_usdc_eth", label: "100 USDC → ETH" },
    { value: "all_eth_usdc", label: "All ETH → USDC" },
  ],
  bridge: [
    { value: "0.1_eth_base", label: "0.1 ETH to Base" },
    { value: "0.5_eth_arb", label: "0.5 ETH to Arbitrum" },
    { value: "100_usdc_opt", label: "100 USDC to Optimism" },
  ],
  send: [
    { value: "newsletter", label: "weekly newsletter" },
    { value: "report", label: "daily report" },
    { value: "alert_email", label: "alert notification" },
  ],
  alert: [
    { value: "price_change", label: "on price change" },
    { value: "tx_complete", label: "when tx completes" },
    { value: "new_post", label: "on new Moltworld post" },
  ],
  schedule: [
    { value: "meeting", label: "team meeting" },
    { value: "reminder", label: "reminder" },
    { value: "task", label: "recurring task" },
  ],
  check: [
    { value: "balance", label: "my balance" },
    { value: "sentiment", label: "Moltworld sentiment" },
    { value: "gas", label: "current gas price" },
  ],
};

export function CommandBuilder() {
  const [action, setAction] = useState<string>("swap");
  const [detail, setDetail] = useState<string>("0.1_eth_usdc");
  const [platform, setPlatform] = useState<string>("uniswap");
  const [condition, setCondition] = useState<string>("gas");
  const [conditionValue, setConditionValue] = useState<string>("20");
  const [copied, setCopied] = useState(false);

  const generatedCommand = useMemo(() => {
    const actionLabel = actions.find((a) => a.value === action)?.label || action;
    const detailLabel = actionDetails[action]?.find((d) => d.value === detail)?.label || detail;
    const platformLabel = platforms.find((p) => p.value === platform)?.label || platform;
    const conditionLabel = conditions.find((c) => c.value === condition)?.label || "";
    const condValueLabel = conditionValues[condition]?.find((v) => v.value === conditionValue)?.label || conditionValue;

    let command = `${actionLabel} ${detailLabel}`;

    if (["swap", "bridge"].includes(action)) {
      command += ` on ${platformLabel}`;
    } else if (action === "send") {
      command += ` via ${platformLabel}`;
    }

    if (condition !== "none") {
      command += ` ${conditionLabel} ${condValueLabel}`;
    }

    return command;
  }, [action, detail, platform, condition, conditionValue]);

  const copyCommand = () => {
    navigator.clipboard.writeText(generatedCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const randomize = () => {
    const randomAction = actions[Math.floor(Math.random() * actions.length)].value;
    setAction(randomAction);

    const details = actionDetails[randomAction];
    if (details) {
      setDetail(details[Math.floor(Math.random() * details.length)].value);
    }

    setPlatform(platforms[Math.floor(Math.random() * platforms.length)].value);

    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)].value;
    setCondition(randomCondition);

    if (randomCondition !== "none" && conditionValues[randomCondition]) {
      setConditionValue(
        conditionValues[randomCondition][Math.floor(Math.random() * conditionValues[randomCondition].length)].value
      );
    }
  };

  interface DropdownProps {
    label: string;
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
  }

  const Dropdown = ({ label, options, value, onChange }: DropdownProps) => (
    <div className="space-y-1">
      <label className="text-xs text-zinc-500">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none px-3 py-2.5 pr-8 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-terminal-glow transition-colors cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.icon} {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-terminal-glow" />
            <h3 className="font-semibold text-white">Command Builder</h3>
          </div>
          <button
            onClick={randomize}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            title="Randomize"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-zinc-500 mt-1">Build your command visually</p>
      </div>

      {/* Builder */}
      <div className="p-4 space-y-4">
        {/* Action & Detail Row */}
        <div className="grid grid-cols-2 gap-3">
          <Dropdown label="Action" options={actions} value={action} onChange={(v) => {
            setAction(v);
            const details = actionDetails[v];
            if (details && details.length > 0) {
              setDetail(details[0].value);
            }
          }} />
          <Dropdown
            label="Details"
            options={actionDetails[action] || []}
            value={detail}
            onChange={setDetail}
          />
        </div>

        {/* Platform */}
        <Dropdown label="Platform" options={platforms} value={platform} onChange={setPlatform} />

        {/* Condition Row */}
        <div className="grid grid-cols-2 gap-3">
          <Dropdown label="Condition" options={conditions} value={condition} onChange={(v) => {
            setCondition(v);
            if (v !== "none" && conditionValues[v] && conditionValues[v].length > 0) {
              setConditionValue(conditionValues[v][0].value);
            }
          }} />
          {condition !== "none" && conditionValues[condition] && (
            <Dropdown
              label="Value"
              options={conditionValues[condition]}
              value={conditionValue}
              onChange={setConditionValue}
            />
          )}
        </div>
      </div>

      {/* Generated Command */}
      <div className="px-4 pb-4">
        <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-terminal-glow" />
            <span className="text-xs text-zinc-500">Generated Command</span>
          </div>
          <div className="flex items-center gap-3">
            <code className="flex-1 text-sm text-terminal-glow font-mono">
              {generatedCommand}
            </code>
            <button
              onClick={copyCommand}
              className="p-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-zinc-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/80">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-terminal-glow text-zinc-900 font-semibold hover:bg-lime-400 transition-colors text-sm">
          Execute Command
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
