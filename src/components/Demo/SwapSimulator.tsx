"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownUp,
  Settings,
  Info,
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Fuel,
} from "lucide-react";

interface Token {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  icon: string;
}

const tokens: Token[] = [
  { symbol: "ETH", name: "Ethereum", balance: 0.85, price: 1855.42, icon: "⟠" },
  { symbol: "USDC", name: "USD Coin", balance: 1234.56, price: 1.0, icon: "💵" },
  { symbol: "WBTC", name: "Wrapped Bitcoin", balance: 0.025, price: 43250.0, icon: "₿" },
  { symbol: "CLAW", name: "Claw Token", balance: 50000, price: 0.0234, icon: "🦀" },
  { symbol: "DAI", name: "Dai Stablecoin", balance: 500, price: 1.0, icon: "◈" },
];

interface SwapState {
  status: "idle" | "quoting" | "confirming" | "swapping" | "success" | "error";
  message?: string;
}

export function SwapSimulator() {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [swapState, setSwapState] = useState<SwapState>({ status: "idle" });
  const [gasPrice, setGasPrice] = useState(15);

  // Simulate gas price fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setGasPrice((prev) => Math.max(8, Math.min(50, prev + (Math.random() - 0.5) * 4)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Calculate output amount
  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount))) {
      const inputValue = Number(fromAmount) * fromToken.price;
      const outputAmount = inputValue / toToken.price;
      const withSlippage = outputAmount * (1 - slippage / 100);
      setToAmount(withSlippage.toFixed(toToken.price < 1 ? 2 : 6));
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromToken, toToken, slippage]);

  const switchTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
  };

  const executeSwap = async () => {
    if (!fromAmount || Number(fromAmount) <= 0) return;

    setSwapState({ status: "quoting", message: "Finding best route..." });
    await new Promise((r) => setTimeout(r, 1000));

    setSwapState({ status: "confirming", message: "Preparing transaction..." });
    await new Promise((r) => setTimeout(r, 800));

    setSwapState({ status: "swapping", message: "Executing swap..." });
    await new Promise((r) => setTimeout(r, 1500));

    // 90% success rate
    if (Math.random() > 0.1) {
      setSwapState({ status: "success", message: "Swap completed successfully!" });
    } else {
      setSwapState({ status: "error", message: "Transaction reverted. Try again." });
    }

    setTimeout(() => setSwapState({ status: "idle" }), 3000);
  };

  const rate = fromToken.price / toToken.price;
  const priceImpact = Number(fromAmount) * fromToken.price > 1000 ? 0.3 : 0.1;
  const gasCostUsd = (gasPrice * 150000 * 0.000000001 * fromToken.price).toFixed(2);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowDownUp className="w-5 h-5 text-terminal-glow" />
            <h3 className="font-semibold text-white">Swap Simulator</h3>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-colors ${
              showSettings ? "bg-zinc-700 text-white" : "text-zinc-400 hover:bg-zinc-800"
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-zinc-500 mt-1">Simulated DEX swap interface</p>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-zinc-800"
          >
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400">Slippage Tolerance</span>
                <span className="text-xs text-terminal-glow font-medium">{slippage}%</span>
              </div>
              <div className="flex gap-2">
                {[0.1, 0.5, 1.0, 3.0].map((value) => (
                  <button
                    key={value}
                    onClick={() => setSlippage(value)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      slippage === value
                        ? "bg-terminal-glow text-zinc-900"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {value}%
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swap Interface */}
      <div className="p-4 space-y-2">
        {/* From Token */}
        <div className="rounded-xl bg-zinc-800/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500">From</span>
            <span className="text-xs text-zinc-500">
              Balance: {fromToken.balance.toFixed(4)} {fromToken.symbol}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-medium text-white placeholder-zinc-600 outline-none"
            />
            <div className="relative">
              <button
                onClick={() => setShowFromDropdown(!showFromDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition-colors"
              >
                <span className="text-lg">{fromToken.icon}</span>
                <span className="font-medium text-white">{fromToken.symbol}</span>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </button>
              <AnimatePresence>
                {showFromDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-zinc-800 border border-zinc-700 shadow-xl z-10"
                  >
                    {tokens
                      .filter((t) => t.symbol !== toToken.symbol)
                      .map((token) => (
                        <button
                          key={token.symbol}
                          onClick={() => {
                            setFromToken(token);
                            setShowFromDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-700 transition-colors first:rounded-t-xl last:rounded-b-xl"
                        >
                          <span className="text-lg">{token.icon}</span>
                          <div className="text-left">
                            <p className="text-sm font-medium text-white">{token.symbol}</p>
                            <p className="text-xs text-zinc-500">{token.name}</p>
                          </div>
                        </button>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {fromAmount && (
            <p className="text-xs text-zinc-500 mt-2">
              ≈ ${(Number(fromAmount) * fromToken.price).toFixed(2)}
            </p>
          )}
        </div>

        {/* Switch Button */}
        <div className="flex justify-center -my-1 relative z-10">
          <button
            onClick={switchTokens}
            className="p-2 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-terminal-glow hover:bg-zinc-700 transition-all"
          >
            <ArrowDownUp className="w-4 h-4 text-terminal-glow" />
          </button>
        </div>

        {/* To Token */}
        <div className="rounded-xl bg-zinc-800/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500">To (estimated)</span>
            <span className="text-xs text-zinc-500">
              Balance: {toToken.balance.toFixed(4)} {toToken.symbol}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={toAmount}
              readOnly
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-medium text-white placeholder-zinc-600 outline-none"
            />
            <div className="relative">
              <button
                onClick={() => setShowToDropdown(!showToDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition-colors"
              >
                <span className="text-lg">{toToken.icon}</span>
                <span className="font-medium text-white">{toToken.symbol}</span>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </button>
              <AnimatePresence>
                {showToDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-zinc-800 border border-zinc-700 shadow-xl z-10"
                  >
                    {tokens
                      .filter((t) => t.symbol !== fromToken.symbol)
                      .map((token) => (
                        <button
                          key={token.symbol}
                          onClick={() => {
                            setToToken(token);
                            setShowToDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-700 transition-colors first:rounded-t-xl last:rounded-b-xl"
                        >
                          <span className="text-lg">{token.icon}</span>
                          <div className="text-left">
                            <p className="text-sm font-medium text-white">{token.symbol}</p>
                            <p className="text-xs text-zinc-500">{token.name}</p>
                          </div>
                        </button>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {toAmount && (
            <p className="text-xs text-zinc-500 mt-2">
              ≈ ${(Number(toAmount) * toToken.price).toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* Swap Details */}
      {fromAmount && Number(fromAmount) > 0 && (
        <div className="px-4 pb-4">
          <div className="rounded-xl bg-zinc-800/30 p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500">Rate</span>
              <span className="text-white">
                1 {fromToken.symbol} = {rate.toFixed(toToken.price < 1 ? 2 : 6)} {toToken.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500">Price Impact</span>
              <span className={priceImpact > 1 ? "text-orange-400" : "text-green-400"}>
                {priceImpact.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-zinc-500">
                <Fuel className="w-3 h-3" />
                <span>Gas ({gasPrice.toFixed(0)} gwei)</span>
              </div>
              <span className="text-white">~${gasCostUsd}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500">Slippage</span>
              <span className="text-white">{slippage}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Swap Status */}
      <AnimatePresence>
        {swapState.status !== "idle" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-4"
          >
            <div
              className={`rounded-xl p-3 flex items-center gap-3 ${
                swapState.status === "success"
                  ? "bg-green-500/10 border border-green-500/30"
                  : swapState.status === "error"
                  ? "bg-red-500/10 border border-red-500/30"
                  : "bg-terminal-glow/10 border border-terminal-glow/30"
              }`}
            >
              {swapState.status === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : swapState.status === "error" ? (
                <AlertTriangle className="w-5 h-5 text-red-400" />
              ) : (
                <Loader2 className="w-5 h-5 text-terminal-glow animate-spin" />
              )}
              <span
                className={`text-sm ${
                  swapState.status === "success"
                    ? "text-green-400"
                    : swapState.status === "error"
                    ? "text-red-400"
                    : "text-terminal-glow"
                }`}
              >
                {swapState.message}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swap Button */}
      <div className="px-4 pb-4">
        <button
          onClick={executeSwap}
          disabled={!fromAmount || Number(fromAmount) <= 0 || swapState.status !== "idle"}
          className="w-full py-4 rounded-xl bg-terminal-glow text-zinc-900 font-semibold hover:bg-lime-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {swapState.status !== "idle" ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </span>
          ) : (
            "Swap"
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Info className="w-3.5 h-3.5" />
          <span>Simulated swap - no real transactions</span>
        </div>
      </div>
    </div>
  );
}
