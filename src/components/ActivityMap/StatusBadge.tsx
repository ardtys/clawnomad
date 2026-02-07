"use client";

import { motion } from "framer-motion";
import { TravelStatus } from "@/types";
import { Check, Clock, AlertTriangle } from "lucide-react";

interface StatusBadgeProps {
  status: TravelStatus;
}

const statusConfig: Record<
  TravelStatus,
  {
    label: string;
    bgColor: string;
    textColor: string;
    icon: React.ComponentType<{ className?: string }>;
    glowColor: string;
  }
> = {
  success: {
    label: "Success",
    bgColor: "bg-success/20",
    textColor: "text-success",
    icon: Check,
    glowColor: "shadow-[0_0_10px_rgba(34,197,94,0.3)]",
  },
  pending: {
    label: "Pending",
    bgColor: "bg-pending/20",
    textColor: "text-pending",
    icon: Clock,
    glowColor: "shadow-[0_0_10px_rgba(245,158,11,0.3)]",
  },
  intercepted: {
    label: "Intercepted",
    bgColor: "bg-intercepted/20",
    textColor: "text-intercepted",
    icon: AlertTriangle,
    glowColor: "shadow-[0_0_10px_rgba(239,68,68,0.3)]",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <motion.div
      className={[
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
        "text-xs font-medium",
        config.bgColor,
        config.textColor,
        config.glowColor,
        "border border-current/20",
      ].join(" ")}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <span className="relative flex h-2 w-2">
        {status === "pending" && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
        )}
        <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
      </span>
      <IconComponent className="w-3 h-3" />
      <span>{config.label}</span>
    </motion.div>
  );
}
