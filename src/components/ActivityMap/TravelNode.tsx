"use client";

import { motion } from "framer-motion";
import { PlatformType } from "@/types";
import {
  Globe,
  Hexagon,
  Mail,
  Linkedin,
  Calendar,
  Wallet,
  ArrowRightLeft,
  MessageSquare,
} from "lucide-react";

interface TravelNodeProps {
  platform: PlatformType;
  name: string;
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
}

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  gmail: Mail,
  linkedin: Linkedin,
  calendar: Calendar,
  metamask: Wallet,
  uniswap: ArrowRightLeft,
  base: Hexagon,
  solana: Hexagon,
  moltworld: MessageSquare,
  moltbook: MessageSquare,
};

const platformColors: Record<PlatformType, string> = {
  web2: "bg-web2",
  web3: "bg-web3",
  moltworld: "bg-moltworld",
};

const nodeShapes: Record<PlatformType, string> = {
  web2: "rounded-full",
  web3: "node-web3",
  moltworld: "rounded-lg",
};

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function TravelNode({
  platform,
  name,
  size = "md",
  isActive = false,
}: TravelNodeProps) {
  const IconComponent = platformIcons[name.toLowerCase()] || Globe;

  const baseClasses = [
    sizeClasses[size],
    platformColors[platform],
    nodeShapes[platform],
    "flex items-center justify-center",
    "transition-all duration-300",
  ].join(" ");

  const activeClasses = isActive ? "ring-2 ring-white/50 shadow-glow-lg" : "";

  return (
    <motion.div
      className={baseClasses + " " + activeClasses}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <IconComponent className={iconSizes[size] + " text-white"} />
    </motion.div>
  );
}
