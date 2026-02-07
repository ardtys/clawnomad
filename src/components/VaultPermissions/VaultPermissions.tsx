"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Permission } from "@/types";
import { PermissionCard } from "./PermissionCard";
import {
  Shield,
  Lock,
  Globe,
  Hexagon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface VaultPermissionsProps {
  permissions: Permission[];
  onPermissionChange: (id: string, enabled: boolean) => void;
  onModeChange: (id: string, mode: "manual" | "autonomous") => void;
  isEncrypted?: boolean;
  compact?: boolean;
}

export function VaultPermissions({
  permissions,
  onPermissionChange,
  onModeChange,
  isEncrypted = true,
  compact = false,
}: VaultPermissionsProps) {
  const [expandedSections, setExpandedSections] = useState({
    web2: true,
    web3: true,
  });

  const web2Permissions = permissions.filter((p) => p.category === "web2");
  const web3Permissions = permissions.filter((p) => p.category === "web3");

  const toggleSection = (section: "web2" | "web3") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <motion.aside
      className={compact ? "space-y-3" : "glass-card p-6 h-fit"}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Header - Hidden in compact mode */}
      {!compact && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-terminal-glow/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-terminal-glow" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Vault & Permissions
              </h2>
              <p className="text-xs text-terminal-muted">Manage agent access</p>
            </div>
          </div>
        </div>
      )}

      {/* Encryption Status */}
      <motion.div
        className={[
          "flex items-center gap-3 rounded-xl",
          compact ? "p-2" : "p-3 mb-6",
          isEncrypted
            ? "bg-terminal-glow/10 border border-terminal-glow/20"
            : "bg-intercepted/10 border border-intercepted/20",
        ].join(" ")}
        animate={{
          boxShadow: isEncrypted
            ? [
                "0 0 10px rgba(57, 255, 20, 0.1)",
                "0 0 20px rgba(57, 255, 20, 0.2)",
                "0 0 10px rgba(57, 255, 20, 0.1)",
              ]
            : "none",
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Lock
          className={[
            compact ? "w-4 h-4" : "w-5 h-5",
            isEncrypted ? "text-terminal-glow" : "text-intercepted",
          ].join(" ")}
        />
        <div>
          <p className={`${compact ? "text-xs" : "text-sm"} font-medium text-white`}>
            {isEncrypted ? "Memory Encrypted" : "Memory Exposed"}
          </p>
          {!compact && (
            <p className="text-xs text-terminal-muted">
              {isEncrypted
                ? "Local encryption active"
                : "Enable encryption for security"}
            </p>
          )}
        </div>
      </motion.div>

      {/* Web2 Section */}
      <div className={compact ? "mb-3" : "mb-6"}>
        <button
          className={`flex items-center justify-between w-full ${compact ? "mb-2" : "mb-3"}`}
          onClick={() => toggleSection("web2")}
        >
          <div className="flex items-center gap-2">
            <Globe className={`${compact ? "w-3 h-3" : "w-4 h-4"} text-web2`} />
            <span className={`${compact ? "text-xs" : "text-sm"} font-medium text-white`}>Web2 Access</span>
            <span className="text-xs text-terminal-muted">
              ({web2Permissions.filter((p) => p.enabled).length}/
              {web2Permissions.length})
            </span>
          </div>
          {expandedSections.web2 ? (
            <ChevronUp className={`${compact ? "w-3 h-3" : "w-4 h-4"} text-terminal-muted`} />
          ) : (
            <ChevronDown className={`${compact ? "w-3 h-3" : "w-4 h-4"} text-terminal-muted`} />
          )}
        </button>
        {expandedSections.web2 && (
          <motion.div
            className={compact ? "space-y-2" : "space-y-3"}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {web2Permissions.map((permission, index) => (
              <motion.div
                key={permission.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PermissionCard
                  permission={permission}
                  onToggle={onPermissionChange}
                  compact={compact}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Web3 Section */}
      <div>
        <button
          className={`flex items-center justify-between w-full ${compact ? "mb-2" : "mb-3"}`}
          onClick={() => toggleSection("web3")}
        >
          <div className="flex items-center gap-2">
            <Hexagon className={`${compact ? "w-3 h-3" : "w-4 h-4"} text-web3`} />
            <span className={`${compact ? "text-xs" : "text-sm"} font-medium text-white`}>Web3 Access</span>
            <span className="text-xs text-terminal-muted">
              ({web3Permissions.filter((p) => p.enabled).length}/
              {web3Permissions.length})
            </span>
          </div>
          {expandedSections.web3 ? (
            <ChevronUp className={`${compact ? "w-3 h-3" : "w-4 h-4"} text-terminal-muted`} />
          ) : (
            <ChevronDown className={`${compact ? "w-3 h-3" : "w-4 h-4"} text-terminal-muted`} />
          )}
        </button>
        {expandedSections.web3 && (
          <motion.div
            className={compact ? "space-y-2" : "space-y-3"}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {web3Permissions.map((permission, index) => (
              <motion.div
                key={permission.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PermissionCard
                  permission={permission}
                  onToggle={onPermissionChange}
                  onModeChange={onModeChange}
                  compact={compact}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}
