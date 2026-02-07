"use client";

import { motion } from "framer-motion";
import { PlatformType } from "@/types";
import { ActionTag } from "./ActionTag";

interface BridgeLoadingProps {
  sourcePlatform: { name: string; type: PlatformType };
  destinationPlatform: { name: string; type: PlatformType };
}

export function BridgeLoading({
  sourcePlatform,
  destinationPlatform,
}: BridgeLoadingProps) {
  return (
    <motion.div
      className="flex items-center justify-center gap-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ActionTag platform={sourcePlatform.name} type={sourcePlatform.type} />

      {/* Bridge Animation */}
      <div className="relative w-32 h-8 flex items-center justify-center">
        {/* Base line */}
        <div className="absolute w-full h-0.5 bg-terminal-border rounded-full" />

        {/* Animated particles */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-terminal-glow"
            initial={{ x: -60, opacity: 0 }}
            animate={{
              x: 60,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              boxShadow: "0 0 10px rgba(57, 255, 20, 0.8)",
            }}
          />
        ))}

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 10px rgba(57, 255, 20, 0.2)",
              "0 0 20px rgba(57, 255, 20, 0.4)",
              "0 0 10px rgba(57, 255, 20, 0.2)",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Bridge label */}
        <motion.span
          className="absolute -bottom-5 text-xs text-terminal-glow font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Bridging...
        </motion.span>
      </div>

      <ActionTag
        platform={destinationPlatform.name}
        type={destinationPlatform.type}
      />
    </motion.div>
  );
}
