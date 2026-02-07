"use client";

import { motion } from "framer-motion";
import { PlatformType } from "@/types";
import {
  Mail,
  Linkedin,
  Calendar,
  Wallet,
  ArrowRightLeft,
  Hexagon,
  MessageSquare,
  Globe,
  X,
} from "lucide-react";

interface ActionTagProps {
  platform: string;
  type: PlatformType;
  onRemove?: () => void;
  isSelected?: boolean;
  onClick?: () => void;
}

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  gmail: Mail,
  calendar: Calendar,
  metamask: Wallet,
  uniswap: ArrowRightLeft,
  "base-network": Hexagon,
  solana: Hexagon,
  moltbook: MessageSquare,
  moltworld: MessageSquare,
};

const typeColors: Record<PlatformType, { bg: string; border: string; text: string }> = {
  web2: {
    bg: "bg-web2/10",
    border: "border-web2/30",
    text: "text-web2",
  },
  web3: {
    bg: "bg-web3/10",
    border: "border-web3/30",
    text: "text-web3",
  },
  moltworld: {
    bg: "bg-moltworld/10",
    border: "border-moltworld/30",
    text: "text-moltworld",
  },
};

export function ActionTag({
  platform,
  type,
  onRemove,
  isSelected = false,
  onClick,
}: ActionTagProps) {
  const IconComponent = platformIcons[platform.toLowerCase()] || Globe;
  const colors = typeColors[type];

  return (
    <motion.button
      className={[
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
        "text-sm font-medium border transition-all",
        colors.bg,
        colors.border,
        colors.text,
        isSelected ? "ring-2 ring-offset-2 ring-offset-terminal-dark ring-current" : "",
        onClick ? "cursor-pointer hover:opacity-80" : "",
      ].join(" ")}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <IconComponent className="w-3.5 h-3.5" />
      <span>@{platform}</span>
      {onRemove && (
        <motion.span
          className="ml-1 hover:bg-white/10 rounded-full p-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          whileHover={{ scale: 1.2 }}
        >
          <X className="w-3 h-3" />
        </motion.span>
      )}
    </motion.button>
  );
}
