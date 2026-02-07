"use client";

import { motion } from "framer-motion";
import { TravelEvent } from "@/types";
import { TravelEventCard } from "./TravelEventCard";
import { Map, Filter, RefreshCw } from "lucide-react";

interface ActivityMapProps {
  events: TravelEvent[];
  title?: string;
}

export function ActivityMap({
  events,
  title = "The Nomad's Journey",
}: ActivityMapProps) {
  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-terminal-glow/10 flex items-center justify-center">
            <Map className="w-5 h-5 text-terminal-glow" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="text-xs text-terminal-muted">
              {events.length} travel events recorded
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            className="p-2 rounded-lg bg-terminal-border/50 hover:bg-terminal-border transition-colors text-terminal-muted hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-4 h-4" />
          </motion.button>
          <motion.button
            className="p-2 rounded-lg bg-terminal-border/50 hover:bg-terminal-border transition-colors text-terminal-muted hover:text-white"
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Platform Legend */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-terminal-border">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-web2" />
          <span className="text-xs text-terminal-muted">Web2</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 node-web3 bg-web3" />
          <span className="text-xs text-terminal-muted">Web3</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-moltworld" />
          <span className="text-xs text-terminal-muted">Moltworld</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-8 space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-terminal-glow/50 via-terminal-glow/20 to-transparent" />

        {events.map((event, index) => (
          <TravelEventCard key={event.id} event={event} index={index} />
        ))}

        {events.length === 0 && (
          <motion.div
            className="text-center py-12 text-terminal-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Map className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No travel events recorded yet</p>
            <p className="text-xs mt-1">Your agent&apos;s journey will appear here</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
