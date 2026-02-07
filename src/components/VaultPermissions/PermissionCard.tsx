"use client";

import { motion } from "framer-motion";
import { Permission } from "@/types";
import { PermissionToggle } from "./PermissionToggle";
import {
  Globe,
  Mail,
  Calendar,
  MousePointer,
  Wallet,
  ArrowRightLeft,
  Shield,
  AlertTriangle,
} from "lucide-react";

interface PermissionCardProps {
  permission: Permission;
  onToggle: (id: string, enabled: boolean) => void;
  onModeChange?: (id: string, mode: "manual" | "autonomous") => void;
  compact?: boolean;
}

const permissionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  browser: MousePointer,
  email: Mail,
  calendar: Calendar,
  wallet: Wallet,
  swap: ArrowRightLeft,
  default: Globe,
};

export function PermissionCard({
  permission,
  onToggle,
  onModeChange,
  compact = false,
}: PermissionCardProps) {
  const IconComponent =
    permissionIcons[permission.name.toLowerCase().split(" ")[0]] ||
    permissionIcons.default;

  const isWeb3 = permission.category === "web3";

  return (
    <motion.div
      className={[
        compact ? "p-2 rounded-lg" : "p-4 rounded-xl",
        "border transition-all",
        permission.enabled
          ? "bg-terminal-border/30 border-terminal-glow/20"
          : "bg-terminal-darker/50 border-terminal-border",
      ].join(" ")}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: compact ? 1.01 : 1.02 }}
    >
      <div className={`flex items-start justify-between ${compact ? "gap-2" : "gap-3"}`}>
        <div className={`flex items-start ${compact ? "gap-2" : "gap-3"}`}>
          <div
            className={[
              compact ? "w-7 h-7" : "w-10 h-10",
              "rounded-lg flex items-center justify-center",
              isWeb3 ? "bg-web3/10" : "bg-web2/10",
            ].join(" ")}
          >
            <IconComponent
              className={[
                compact ? "w-3.5 h-3.5" : "w-5 h-5",
                isWeb3 ? "text-web3" : "text-web2",
              ].join(" ")}
            />
          </div>
          <div className="flex-grow">
            <h4 className={`${compact ? "text-xs" : "text-sm"} font-medium text-white`}>{permission.name}</h4>
            {!compact && (
              <p className="text-xs text-terminal-muted mt-0.5">
                {permission.description}
              </p>
            )}

            {/* Spending Limit for Web3 */}
            {!compact && isWeb3 && permission.limit && permission.enabled && (
              <motion.div
                className="mt-2 flex items-center gap-2 px-2 py-1 rounded-md bg-web3/10 w-fit"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <Wallet className="w-3 h-3 text-web3" />
                <span className="text-xs text-web3 font-mono">
                  Daily: {permission.limit}
                </span>
              </motion.div>
            )}

            {/* Mode Toggle for Web3 */}
            {!compact && isWeb3 && permission.mode && permission.enabled && onModeChange && (
              <motion.div
                className="mt-3 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <button
                  className={[
                    "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors",
                    permission.mode === "manual"
                      ? "bg-pending/20 text-pending"
                      : "bg-terminal-border text-terminal-muted hover:text-white",
                  ].join(" ")}
                  onClick={() => onModeChange(permission.id, "manual")}
                >
                  <Shield className="w-3 h-3" />
                  Manual
                </button>
                <button
                  className={[
                    "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors",
                    permission.mode === "autonomous"
                      ? "bg-terminal-glow/20 text-terminal-glow"
                      : "bg-terminal-border text-terminal-muted hover:text-white",
                  ].join(" ")}
                  onClick={() => onModeChange(permission.id, "autonomous")}
                >
                  <AlertTriangle className="w-3 h-3" />
                  Autonomous
                </button>
              </motion.div>
            )}
          </div>
        </div>
        <PermissionToggle
          enabled={permission.enabled}
          onChange={(enabled) => onToggle(permission.id, enabled)}
        />
      </div>
    </motion.div>
  );
}
