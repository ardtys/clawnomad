"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Clock,
  DollarSign,
  TrendingUp,
  Zap,
  ArrowRight,
} from "lucide-react";

interface TaskType {
  id: string;
  name: string;
  manualTime: number; // minutes per task
  automatedTime: number; // seconds per task
}

const taskTypes: TaskType[] = [
  { id: "swap", name: "Token Swaps", manualTime: 5, automatedTime: 3 },
  { id: "bridge", name: "Bridge Transactions", manualTime: 10, automatedTime: 5 },
  { id: "email", name: "Email Campaigns", manualTime: 30, automatedTime: 10 },
  { id: "social", name: "Social Updates", manualTime: 15, automatedTime: 5 },
  { id: "monitoring", name: "Price Monitoring", manualTime: 60, automatedTime: 0 },
  { id: "reports", name: "Weekly Reports", manualTime: 45, automatedTime: 15 },
];

export function SavingsCalculator() {
  const [tasksPerWeek, setTasksPerWeek] = useState(50);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [selectedTasks, setSelectedTasks] = useState<string[]>(["swap", "bridge", "monitoring"]);

  const calculations = useMemo(() => {
    const selected = taskTypes.filter((t) => selectedTasks.includes(t.id));

    // Calculate average times
    const avgManualTime = selected.reduce((acc, t) => acc + t.manualTime, 0) / (selected.length || 1);
    const avgAutomatedTime = selected.reduce((acc, t) => acc + t.automatedTime, 0) / (selected.length || 1);

    // Weekly calculations
    const manualMinutesPerWeek = tasksPerWeek * avgManualTime;
    const automatedMinutesPerWeek = tasksPerWeek * (avgAutomatedTime / 60);

    const timeSavedPerWeek = manualMinutesPerWeek - automatedMinutesPerWeek;
    const timeSavedPerMonth = timeSavedPerWeek * 4;
    const timeSavedPerYear = timeSavedPerWeek * 52;

    const moneySavedPerMonth = (timeSavedPerMonth / 60) * hourlyRate;
    const moneySavedPerYear = (timeSavedPerYear / 60) * hourlyRate;

    const efficiencyGain = manualMinutesPerWeek > 0
      ? ((timeSavedPerWeek / manualMinutesPerWeek) * 100).toFixed(0)
      : 0;

    return {
      timeSavedPerWeek,
      timeSavedPerMonth,
      timeSavedPerYear,
      moneySavedPerMonth,
      moneySavedPerYear,
      efficiencyGain,
    };
  }, [tasksPerWeek, hourlyRate, selectedTasks]);

  const toggleTask = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((t) => t !== taskId)
        : [...prev, taskId]
    );
  };

  const formatTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = Math.round(minutes % 60);
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${Math.round(minutes)}m`;
  };

  const formatMoney = (amount: number) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${Math.round(amount)}`;
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-terminal-glow" />
          <h3 className="font-semibold text-white">Savings Calculator</h3>
        </div>
        <p className="text-xs text-zinc-500 mt-1">Calculate how much time and money you can save</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Task Selection */}
        <div>
          <label className="text-sm text-zinc-400 mb-2 block">Select tasks to automate</label>
          <div className="flex flex-wrap gap-2">
            {taskTypes.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedTasks.includes(task.id)
                    ? "bg-terminal-glow text-zinc-900"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {task.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Tasks per week */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-zinc-400">Tasks per week</label>
              <span className="text-sm text-terminal-glow font-medium">{tasksPerWeek}</span>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              value={tasksPerWeek}
              onChange={(e) => setTasksPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-terminal-glow"
            />
            <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
              <span>10</span>
              <span>500</span>
            </div>
          </div>

          {/* Hourly rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-zinc-400">Your hourly rate</label>
              <span className="text-sm text-terminal-glow font-medium">${hourlyRate}/hr</span>
            </div>
            <input
              type="range"
              min={15}
              max={200}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-terminal-glow"
            />
            <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
              <span>$15</span>
              <span>$200</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <motion.div
          key={`${tasksPerWeek}-${hourlyRate}-${selectedTasks.join()}`}
          initial={{ opacity: 0.5, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700">
            <Clock className="w-4 h-4 text-blue-400 mb-1" />
            <p className="text-lg font-bold text-white">{formatTime(calculations.timeSavedPerWeek)}</p>
            <p className="text-[10px] text-zinc-500">Saved / Week</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700">
            <Clock className="w-4 h-4 text-purple-400 mb-1" />
            <p className="text-lg font-bold text-white">{formatTime(calculations.timeSavedPerMonth)}</p>
            <p className="text-[10px] text-zinc-500">Saved / Month</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700">
            <DollarSign className="w-4 h-4 text-green-400 mb-1" />
            <p className="text-lg font-bold text-terminal-glow">{formatMoney(calculations.moneySavedPerMonth)}</p>
            <p className="text-[10px] text-zinc-500">Saved / Month</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700">
            <TrendingUp className="w-4 h-4 text-orange-400 mb-1" />
            <p className="text-lg font-bold text-white">{calculations.efficiencyGain}%</p>
            <p className="text-[10px] text-zinc-500">Efficiency Gain</p>
          </div>
        </motion.div>

        {/* Annual Summary */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-terminal-glow/10 to-lime-500/5 border border-terminal-glow/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Annual Savings</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-terminal-glow">
                  {formatMoney(calculations.moneySavedPerYear)}
                </span>
                <span className="text-sm text-zinc-500">
                  / {formatTime(calculations.timeSavedPerYear)}
                </span>
              </div>
            </div>
            <Zap className="w-8 h-8 text-terminal-glow opacity-50" />
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/80">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-terminal-glow text-zinc-900 font-semibold hover:bg-lime-400 transition-colors text-sm">
          Start Saving Time
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
