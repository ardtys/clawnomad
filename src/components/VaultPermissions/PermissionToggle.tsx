"use client";

import { motion } from "framer-motion";

interface PermissionToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  size?: "sm" | "md";
}

export function PermissionToggle({
  enabled,
  onChange,
  size = "md",
}: PermissionToggleProps) {
  const sizes = {
    sm: { track: "w-8 h-4", thumb: "w-3 h-3", translate: 16 },
    md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: 20 },
  };

  const s = sizes[size];

  return (
    <motion.button
      className={[
        s.track,
        "rounded-full relative transition-colors duration-200",
        enabled
          ? "bg-terminal-glow/30 border-terminal-glow/50"
          : "bg-terminal-border border-terminal-muted/30",
        "border",
      ].join(" ")}
      onClick={() => onChange(!enabled)}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={[
          s.thumb,
          "rounded-full absolute top-0.5 left-0.5",
          enabled ? "bg-terminal-glow shadow-glow" : "bg-terminal-muted",
        ].join(" ")}
        animate={{ x: enabled ? s.translate : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );
}
