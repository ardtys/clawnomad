"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
export interface Command {
  id: string;
  text: string;
  timestamp: Date;
  status: "pending" | "running" | "completed" | "failed";
  result?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  status: "active" | "paused" | "scheduled";
  lastRun?: string;
  nextRun?: string;
  createdAt: Date;
}

export interface Activity {
  id: string;
  type: "command" | "workflow" | "transaction" | "alert" | "system";
  title: string;
  description: string;
  timestamp: Date;
  status: "success" | "warning" | "error" | "info";
  metadata?: Record<string, string>;
}

export interface Permission {
  id: string;
  category: "web2" | "web3" | "moltworld";
  name: string;
  description: string;
  enabled: boolean;
  limit?: string;
  mode?: "manual" | "autonomous";
}

export interface Settings {
  theme: "dark" | "light";
  notifications: boolean;
  autoConfirm: boolean;
  dailyLimit: string;
  defaultNetwork: string;
}

interface DashboardContextType {
  // Commands
  commands: Command[];
  addCommand: (text: string) => void;
  clearCommands: () => void;

  // Workflows
  workflows: Workflow[];
  addWorkflow: (workflow: Omit<Workflow, "id" | "createdAt">) => void;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
  toggleWorkflowStatus: (id: string) => void;

  // Activities
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;
  clearActivities: () => void;

  // Permissions
  permissions: Permission[];
  updatePermission: (id: string, updates: Partial<Permission>) => void;
  togglePermission: (id: string) => void;

  // Settings
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;

  // Stats
  stats: {
    totalActions: number;
    successRate: number;
    activeWorkflows: number;
  };
}

const defaultPermissions: Permission[] = [
  {
    id: "1",
    category: "web2",
    name: "Browser Automation",
    description: "Allow automated browser interactions",
    enabled: true,
  },
  {
    id: "2",
    category: "web2",
    name: "Email Send",
    description: "Send emails on your behalf",
    enabled: false,
  },
  {
    id: "3",
    category: "web3",
    name: "Wallet Transactions",
    description: "Execute blockchain transactions",
    enabled: true,
    limit: "0.1 ETH",
    mode: "manual",
  },
  {
    id: "4",
    category: "web3",
    name: "Swap Execution",
    description: "Perform token swaps on DEXs",
    enabled: true,
    limit: "500 USDC",
    mode: "autonomous",
  },
  {
    id: "5",
    category: "moltworld",
    name: "Sentiment Analysis",
    description: "Read Moltbook sentiment data",
    enabled: true,
  },
  {
    id: "6",
    category: "moltworld",
    name: "Post Updates",
    description: "Post updates to Moltworld",
    enabled: false,
    mode: "manual",
  },
];

const defaultWorkflows: Workflow[] = [
  {
    id: "1",
    name: "Daily Market Digest",
    description: "Send morning market summary at 7 AM",
    trigger: "Daily at 7:00 AM",
    status: "active",
    lastRun: "Today, 7:00 AM",
    nextRun: "Tomorrow, 7:00 AM",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Price Alert: ETH > $3000",
    description: "Alert when ETH crosses $3000",
    trigger: "Price condition",
    status: "active",
    nextRun: "Monitoring...",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Auto-compound Rewards",
    description: "Compound staking rewards weekly",
    trigger: "Every Sunday",
    status: "scheduled",
    lastRun: "Last Sunday",
    nextRun: "Next Sunday",
    createdAt: new Date(),
  },
];

const defaultSettings: Settings = {
  theme: "dark",
  notifications: true,
  autoConfirm: false,
  dailyLimit: "1 ETH",
  defaultNetwork: "ethereum",
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>(defaultWorkflows);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>(defaultPermissions);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedCommands = localStorage.getItem("dashboard_commands");
        const savedWorkflows = localStorage.getItem("dashboard_workflows");
        const savedActivities = localStorage.getItem("dashboard_activities");
        const savedPermissions = localStorage.getItem("dashboard_permissions");
        const savedSettings = localStorage.getItem("dashboard_settings");

        if (savedCommands) setCommands(JSON.parse(savedCommands));
        if (savedWorkflows) setWorkflows(JSON.parse(savedWorkflows));
        if (savedActivities) setActivities(JSON.parse(savedActivities));
        if (savedPermissions) setPermissions(JSON.parse(savedPermissions));
        if (savedSettings) setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
      setIsLoaded(true);
    };

    loadData();
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("dashboard_commands", JSON.stringify(commands));
  }, [commands, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("dashboard_workflows", JSON.stringify(workflows));
  }, [workflows, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("dashboard_activities", JSON.stringify(activities));
  }, [activities, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("dashboard_permissions", JSON.stringify(permissions));
  }, [permissions, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("dashboard_settings", JSON.stringify(settings));
  }, [settings, isLoaded]);

  // Command functions
  const addCommand = (text: string) => {
    const newCommand: Command = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      status: "running",
    };
    setCommands((prev) => [newCommand, ...prev]);

    // Add activity
    addActivity({
      type: "command",
      title: "Command Executed",
      description: text,
      status: "info",
    });

    // Simulate completion
    setTimeout(() => {
      setCommands((prev) =>
        prev.map((cmd) =>
          cmd.id === newCommand.id
            ? { ...cmd, status: "completed", result: "Command executed successfully" }
            : cmd
        )
      );
      addActivity({
        type: "command",
        title: "Command Completed",
        description: text,
        status: "success",
      });
    }, 2000);
  };

  const clearCommands = () => setCommands([]);

  // Workflow functions
  const addWorkflow = (workflow: Omit<Workflow, "id" | "createdAt">) => {
    const newWorkflow: Workflow = {
      ...workflow,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setWorkflows((prev) => [...prev, newWorkflow]);
    addActivity({
      type: "workflow",
      title: "Workflow Created",
      description: workflow.name,
      status: "success",
    });
  };

  const updateWorkflow = (id: string, updates: Partial<Workflow>) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updates } : w))
    );
  };

  const deleteWorkflow = (id: string) => {
    const workflow = workflows.find((w) => w.id === id);
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
    if (workflow) {
      addActivity({
        type: "workflow",
        title: "Workflow Deleted",
        description: workflow.name,
        status: "warning",
      });
    }
  };

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: w.status === "active" ? "paused" : "active" }
          : w
      )
    );
  };

  // Activity functions
  const addActivity = (activity: Omit<Activity, "id" | "timestamp">) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setActivities((prev) => [newActivity, ...prev].slice(0, 50)); // Keep last 50
  };

  const clearActivities = () => setActivities([]);

  // Permission functions
  const updatePermission = (id: string, updates: Partial<Permission>) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const togglePermission = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
    const permission = permissions.find((p) => p.id === id);
    if (permission) {
      addActivity({
        type: "system",
        title: `Permission ${permission.enabled ? "Disabled" : "Enabled"}`,
        description: permission.name,
        status: permission.enabled ? "warning" : "success",
      });
    }
  };

  // Settings functions
  const updateSettings = (updates: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    addActivity({
      type: "system",
      title: "Settings Updated",
      description: Object.keys(updates).join(", "),
      status: "info",
    });
  };

  // Calculate stats
  const stats = {
    totalActions: commands.length + activities.filter((a) => a.type === "command").length,
    successRate: activities.length > 0
      ? Math.round(
          (activities.filter((a) => a.status === "success").length / activities.length) * 100
        )
      : 100,
    activeWorkflows: workflows.filter((w) => w.status === "active").length,
  };

  return (
    <DashboardContext.Provider
      value={{
        commands,
        addCommand,
        clearCommands,
        workflows,
        addWorkflow,
        updateWorkflow,
        deleteWorkflow,
        toggleWorkflowStatus,
        activities,
        addActivity,
        clearActivities,
        permissions,
        updatePermission,
        togglePermission,
        settings,
        updateSettings,
        stats,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
