"use client";

import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Workflow,
  Plus,
  Trash2,
  GripVertical,
  Play,
  Clock,
  Zap,
  Mail,
  Globe,
  TrendingUp,
  Shield,
  Calendar,
  ChevronDown,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

type ActionType = "swap" | "bridge" | "email" | "alert" | "sentiment" | "schedule";
type TriggerType = "price" | "time" | "gas" | "sentiment" | "manual";

interface WorkflowStep {
  id: string;
  type: ActionType;
  name: string;
  config: Record<string, string>;
  status: "pending" | "running" | "completed" | "error";
}

interface WorkflowTrigger {
  type: TriggerType;
  condition: string;
}

const actionTemplates: Record<ActionType, { name: string; icon: React.ReactNode; fields: string[] }> = {
  swap: {
    name: "Swap Tokens",
    icon: <Zap className="w-4 h-4" />,
    fields: ["From Token", "To Token", "Amount"],
  },
  bridge: {
    name: "Bridge Assets",
    icon: <Globe className="w-4 h-4" />,
    fields: ["From Chain", "To Chain", "Amount"],
  },
  email: {
    name: "Send Email",
    icon: <Mail className="w-4 h-4" />,
    fields: ["Recipients", "Subject", "Template"],
  },
  alert: {
    name: "Send Alert",
    icon: <AlertCircle className="w-4 h-4" />,
    fields: ["Channel", "Message"],
  },
  sentiment: {
    name: "Check Sentiment",
    icon: <TrendingUp className="w-4 h-4" />,
    fields: ["Topic", "Threshold"],
  },
  schedule: {
    name: "Schedule Task",
    icon: <Calendar className="w-4 h-4" />,
    fields: ["Task", "Time"],
  },
};

const triggerTemplates: Record<TriggerType, { name: string; icon: React.ReactNode; example: string }> = {
  price: { name: "Price Change", icon: <TrendingUp className="w-4 h-4" />, example: "When ETH > $2000" },
  time: { name: "Time-Based", icon: <Clock className="w-4 h-4" />, example: "Every Monday 9am" },
  gas: { name: "Gas Price", icon: <Zap className="w-4 h-4" />, example: "When gas < 20 gwei" },
  sentiment: { name: "Sentiment", icon: <TrendingUp className="w-4 h-4" />, example: "When bullish > 70%" },
  manual: { name: "Manual", icon: <Play className="w-4 h-4" />, example: "On demand" },
};

const actionColors: Record<ActionType, string> = {
  swap: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  bridge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  email: "bg-green-500/20 text-green-400 border-green-500/30",
  alert: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  sentiment: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  schedule: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

export function WorkflowBuilder() {
  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: "step-1",
      type: "sentiment",
      name: "Check Moltworld Sentiment",
      config: { Topic: "$CLAW", Threshold: "60%" },
      status: "pending",
    },
    {
      id: "step-2",
      type: "swap",
      name: "Swap ETH to USDC",
      config: { "From Token": "ETH", "To Token": "USDC", Amount: "0.1" },
      status: "pending",
    },
    {
      id: "step-3",
      type: "alert",
      name: "Notify on Telegram",
      config: { Channel: "Telegram", Message: "Swap completed!" },
      status: "pending",
    },
  ]);

  const [trigger, setTrigger] = useState<WorkflowTrigger>({
    type: "sentiment",
    condition: "When bullish sentiment < 50%",
  });

  const [isRunning, setIsRunning] = useState(false);
  const [showAddStep, setShowAddStep] = useState(false);
  const [showTriggerSelect, setShowTriggerSelect] = useState(false);

  const addStep = (type: ActionType) => {
    const template = actionTemplates[type];
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      type,
      name: template.name,
      config: template.fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
      status: "pending",
    };
    setSteps([...steps, newStep]);
    setShowAddStep(false);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter((s) => s.id !== id));
  };

  const runWorkflow = async () => {
    setIsRunning(true);

    for (let i = 0; i < steps.length; i++) {
      setSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: "running" } : s))
      );

      await new Promise((r) => setTimeout(r, 1500));

      const success = Math.random() > 0.1;
      setSteps((prev) =>
        prev.map((s, idx) =>
          idx === i ? { ...s, status: success ? "completed" : "error" } : s
        )
      );

      if (!success) break;
    }

    setIsRunning(false);
  };

  const resetWorkflow = () => {
    setSteps((prev) => prev.map((s) => ({ ...s, status: "pending" })));
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-terminal-glow" />
            <h3 className="font-semibold text-white">Workflow Builder</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetWorkflow}
              className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={runWorkflow}
              disabled={isRunning || steps.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-terminal-glow text-zinc-900 text-xs font-medium hover:bg-lime-400 disabled:opacity-50 transition-colors"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Running
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  Run Workflow
                </>
              )}
            </button>
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-1">Build automated multi-step agent workflows</p>
      </div>

      {/* Trigger */}
      <div className="px-4 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-terminal-glow" />
          <span className="text-xs font-medium text-zinc-400">TRIGGER</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowTriggerSelect(!showTriggerSelect)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-terminal-glow/10 text-terminal-glow">
                {triggerTemplates[trigger.type].icon}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">{triggerTemplates[trigger.type].name}</p>
                <p className="text-xs text-zinc-500">{trigger.condition}</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </button>

          <AnimatePresence>
            {showTriggerSelect && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl bg-zinc-800 border border-zinc-700 shadow-xl z-10"
              >
                {(Object.keys(triggerTemplates) as TriggerType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setTrigger({ type, condition: triggerTemplates[type].example });
                      setShowTriggerSelect(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-700 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-zinc-700 text-zinc-300">
                      {triggerTemplates[type].icon}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">{triggerTemplates[type].name}</p>
                      <p className="text-xs text-zinc-500">{triggerTemplates[type].example}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Steps */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-terminal-glow" />
          <span className="text-xs font-medium text-zinc-400">ACTIONS</span>
          <span className="text-xs text-zinc-600">({steps.length} steps)</span>
        </div>

        <div className="space-y-2">
          <Reorder.Group axis="y" values={steps} onReorder={setSteps}>
            {steps.map((step, index) => (
              <Reorder.Item key={step.id} value={step}>
                <motion.div
                  layout
                  className={`flex items-center gap-3 p-3 rounded-xl border ${actionColors[step.type]} ${
                    step.status === "running" ? "ring-2 ring-terminal-glow" : ""
                  }`}
                >
                  <GripVertical className="w-4 h-4 text-zinc-500 cursor-grab active:cursor-grabbing" />

                  <div className="p-2 rounded-lg bg-zinc-900/50">
                    {actionTemplates[step.type].icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500">Step {index + 1}</span>
                      {step.status === "completed" && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      )}
                      {step.status === "running" && (
                        <Loader2 className="w-3.5 h-3.5 text-terminal-glow animate-spin" />
                      )}
                      {step.status === "error" && (
                        <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-white truncate">{step.name}</p>
                    <p className="text-xs text-zinc-500 truncate">
                      {Object.entries(step.config)
                        .filter((entry) => entry[1])
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(" • ") || "Configure step..."}
                    </p>
                  </div>

                  <button
                    onClick={() => removeStep(step.id)}
                    className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          {/* Add Step Button */}
          <div className="relative">
            <button
              onClick={() => setShowAddStep(!showAddStep)}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-zinc-700 text-zinc-500 hover:text-white hover:border-zinc-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add Step</span>
            </button>

            <AnimatePresence>
              {showAddStep && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-xl bg-zinc-800 border border-zinc-700 shadow-xl z-10"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(actionTemplates) as ActionType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => addStep(type)}
                        className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${actionColors[type]} hover:opacity-80`}
                      >
                        {actionTemplates[type].icon}
                        <span className="text-sm font-medium">{actionTemplates[type].name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500">
            Workflow: {triggerTemplates[trigger.type].name} → {steps.length} actions
          </span>
          <span className="text-terminal-glow">Ready to run</span>
        </div>
      </div>
    </div>
  );
}
