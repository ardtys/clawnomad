"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface CryptoQRProps {
  seed: string;
  size?: number;
}

export function CryptoQR({ seed, size = 80 }: CryptoQRProps) {
  const pattern = useMemo(() => {
    const hash = seed.split("").reduce((acc, char) => {
      return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
    }, 0);

    const grid: boolean[][] = [];
    let value = Math.abs(hash);

    for (let i = 0; i < 7; i++) {
      grid[i] = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 || i === 6 || j === 0 || j === 6) {
          grid[i][j] = true;
        } else if ((i === 1 || i === 5) && (j === 1 || j === 5)) {
          grid[i][j] = true;
        } else if (i === 3 && j === 3) {
          grid[i][j] = true;
        } else {
          value = (value * 1103515245 + 12345) & 0x7fffffff;
          grid[i][j] = value % 3 === 0;
        }
      }
    }
    return grid;
  }, [seed]);

  const cellSize = size / 7;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={"0 0 " + size + " " + size}
        className="rounded-lg"
      >
        <defs>
          <linearGradient id="qrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#39ff14" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect
          width={size}
          height={size}
          fill="rgba(5, 5, 8, 0.8)"
          rx="8"
        />
        {pattern.map((row, i) =>
          row.map(
            (cell, j) =>
              cell && (
                <motion.rect
                  key={i + "-" + j}
                  x={j * cellSize + cellSize * 0.1}
                  y={i * cellSize + cellSize * 0.1}
                  width={cellSize * 0.8}
                  height={cellSize * 0.8}
                  fill="url(#qrGradient)"
                  rx="2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (i + j) * 0.02,
                    duration: 0.3,
                  }}
                  filter="url(#glow)"
                />
              )
          )
        )}
      </svg>
      <motion.div
        className="absolute inset-0 rounded-lg border border-terminal-glow/30"
        animate={{
          boxShadow: [
            "0 0 10px rgba(57, 255, 20, 0.2)",
            "0 0 20px rgba(57, 255, 20, 0.4)",
            "0 0 10px rgba(57, 255, 20, 0.2)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
