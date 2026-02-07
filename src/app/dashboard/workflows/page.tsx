"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/Dashboard";
import { useDashboard } from "@/context/DashboardContext";
import {
  Zap,
  Plus,
  Play,
  Pause,
  Trash2,
  Edit3,
  Clock,
  Calendar,
  Search,
  X,
} from "lucide-react";

const statusConfig = {
  active: { label: "Active", color: "text-green-400", bg: "bg-green-500/10" },
  paused: { label: "Paused", color: "text-zinc-400", bg: "bg-zinc-500/10" },
  scheduled: { label: "Scheduled", color: "text-blue-400", bg: "bg-blue-500/10" },
};

export default function WorkflowsPage() {
  const { workflows, addWorkflow, updateWorkflow, deleteWorkflow, toggleWorkflowStatus } = useDashboard();
  const [filter, setFilter] = useState<"all" | "active" | "paused" | "scheduled">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    trigger: "",
    status: "active" as "active" | "paused" | "scheduled",
  });

  const filteredWorkflows = workflows.filter((wf) => {
    const matchesFilter = filter === "all" || wf.status === filter;
    const matchesSearch = wf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wf.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenModal = (workflowId?: string) => {
    if (workflowId) {
      const workflow = workflows.find((w) => w.id === workflowId);
      if (workflow) {
        setFormData({
          name: workflow.name,
          description: workflow.description,
          trigger: workflow.trigger,
          status: workflow.status,
        });
        setEditingWorkflow(workflowId);
      }
    } else {
      setFormData({ name: "", description: "", trigger: "", status: "active" });
      setEditingWorkflow(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWorkflow(null);
    setFormData({ name: "", description: "", trigger: "", status: "active" });
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    if (editingWorkflow) {
      updateWorkflow(editingWorkflow, formData);
    } else {
      addWorkflow({
        name: formData.name,
        description: formData.description,
        trigger: formData.trigger,
        status: formData.status,
        nextRun: formData.status === "active" ? "Monitoring..." : "Paused",
      });
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this workflow?")) {
      deleteWorkflow(id);
    }
  };

  const stats = {
    total: workflows.length,
    active: workflows.filter((wf) => wf.status === "active").length,
    paused: workflows.filter((wf) => wf.status === "paused").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Workflows</h1>
            <p className="text-zinc-500 text-sm sm:text-base mt-1">Automate your agent with scheduled and triggered actions</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-terminal-glow text-zinc-900 font-medium hover:bg-lime-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Workflow
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {[
            { label: "Total", value: stats.total, icon: Zap },
            { label: "Active", value: stats.active, icon: Play },
            { label: "Paused", value: stats.paused, icon: Pause },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 sm:p-4 rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/30"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-terminal-glow/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-terminal-glow" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-zinc-500">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-terminal-glow/50"
            />
          </div>
          <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-800/50 overflow-x-auto">
            {(["all", "active", "paused", "scheduled"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-2 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  filter === status
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Workflow List */}
        <div className="grid gap-3 sm:gap-4">
          {filteredWorkflows.map((workflow, index) => {
            const status = statusConfig[workflow.status];

            return (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-3 sm:p-5 rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-terminal-glow/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-terminal-glow" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 sm:gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <h3 className="font-semibold text-white text-sm sm:text-base truncate">{workflow.name}</h3>
                          <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-500 mt-1 line-clamp-2">{workflow.description}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleWorkflowStatus(workflow.id)}
                          className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                            workflow.status === "active"
                              ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                              : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                          }`}
                        >
                          {workflow.status === "active" ? (
                            <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          ) : (
                            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleOpenModal(workflow.id)}
                          className="p-1.5 sm:p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(workflow.id)}
                          className="p-1.5 sm:p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 sm:gap-6 mt-3 sm:mt-4 flex-wrap">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500" />
                        <span className="text-[10px] sm:text-xs text-zinc-400">{workflow.trigger}</span>
                      </div>
                      {workflow.nextRun && (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500" />
                          <span className="text-[10px] sm:text-xs text-zinc-400">{workflow.nextRun}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredWorkflows.length === 0 && (
          <div className="p-8 text-center rounded-xl border border-zinc-800 bg-zinc-900/30">
            <Zap className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-500">No workflows found</p>
            <button
              onClick={() => handleOpenModal()}
              className="mt-4 text-sm text-terminal-glow hover:underline"
            >
              Create your first workflow
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
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
                <h3 className="font-semibold text-white">
                  {editingWorkflow ? "Edit Workflow" : "New Workflow"}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Daily Market Digest"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-terminal-glow/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                    Description
                  </label>
                  <textarea
                    placeholder="What does this workflow do?"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-terminal-glow/50 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                    Trigger
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Daily at 7:00 AM, When ETH > $3000"
                    value={formData.trigger}
                    onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-terminal-glow/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                    Status
                  </label>
                  <div className="flex gap-2">
                    {(["active", "paused", "scheduled"] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setFormData({ ...formData, status })}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.status === status
                            ? statusConfig[status].bg + " " + statusConfig[status].color + " border border-current"
                            : "bg-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {statusConfig[status].label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 p-4 border-t border-zinc-800">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name.trim()}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-terminal-glow text-zinc-900 font-medium hover:bg-lime-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingWorkflow ? "Save Changes" : "Create Workflow"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
