"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlatformType } from "@/types";
import { ActionTag } from "./ActionTag";
import { BridgeLoading } from "./BridgeLoading";
import { Send, Compass, Sparkles } from "lucide-react";

interface SuggestedTag {
  name: string;
  type: PlatformType;
}

const suggestedTags: SuggestedTag[] = [
  { name: "linkedin", type: "web2" },
  { name: "gmail", type: "web2" },
  { name: "moltbook", type: "moltworld" },
  { name: "base-network", type: "web3" },
  { name: "uniswap", type: "web3" },
  { name: "calendar", type: "web2" },
  { name: "solana", type: "web3" },
  { name: "moltworld", type: "moltworld" },
];

interface BridgeCommandProps {
  onSubmit?: (command: string, tags: SuggestedTag[]) => void;
}

export function BridgeCommand({ onSubmit }: BridgeCommandProps) {
  const [input, setInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<SuggestedTag[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isBridging, setIsBridging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = suggestedTags.filter(
    (tag) =>
      !selectedTags.find((t) => t.name === tag.name) &&
      (input.includes("@") ? tag.name.toLowerCase().includes(
        input.split("@").pop()?.toLowerCase() || ""
      ) : true)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.includes("@")) {
      setShowSuggestions(true);
    }
  };

  const addTag = (tag: SuggestedTag) => {
    setSelectedTags([...selectedTags, tag]);
    setInput(input.replace(/@\w*$/, ""));
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeTag = (tagName: string) => {
    setSelectedTags(selectedTags.filter((t) => t.name !== tagName));
  };

  const handleSubmit = async () => {
    if (!input.trim() && selectedTags.length === 0) return;

    if (selectedTags.length >= 2) {
      setIsBridging(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsBridging(false);
    }

    onSubmit?.(input, selectedTags);
    setInput("");
    setSelectedTags([]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <motion.div
      className="glass-card p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-terminal-glow/10 flex items-center justify-center">
          <Compass className="w-5 h-5 text-terminal-glow" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Bridge Command</h2>
          <p className="text-xs text-terminal-muted">
            Direct your agent across platforms
          </p>
        </div>
      </div>

      {/* Bridge Loading Animation */}
      <AnimatePresence>
        {isBridging && selectedTags.length >= 2 && (
          <BridgeLoading
            sourcePlatform={selectedTags[0]}
            destinationPlatform={selectedTags[selectedTags.length - 1]}
          />
        )}
      </AnimatePresence>

      {/* Selected Tags */}
      <AnimatePresence>
        {selectedTags.length > 0 && !isBridging && (
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {selectedTags.map((tag) => (
              <ActionTag
                key={tag.name}
                platform={tag.name}
                type={tag.type}
                onRemove={() => removeTag(tag.name)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      {!isBridging && (
        <div className="relative">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-terminal-darker border border-terminal-border focus-within:border-terminal-glow/50 transition-colors">
            <Sparkles className="w-5 h-5 text-terminal-glow/50" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => input.includes("@") && setShowSuggestions(true)}
              placeholder="Where should your Claw travel today?"
              className="flex-grow bg-transparent outline-none text-white placeholder-terminal-muted/50 font-mono"
            />
            <motion.button
              onClick={handleSubmit}
              className="p-2 rounded-lg bg-terminal-glow/10 text-terminal-glow hover:bg-terminal-glow/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!input.trim() && selectedTags.length === 0}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-2 p-3 rounded-xl bg-terminal-darker border border-terminal-border shadow-glass z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-xs text-terminal-muted mb-2">
                  Suggested destinations:
                </p>
                <div className="flex flex-wrap gap-2">
                  {filteredSuggestions.map((tag) => (
                    <ActionTag
                      key={tag.name}
                      platform={tag.name}
                      type={tag.type}
                      onClick={() => addTag(tag)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Quick Actions */}
      {!isBridging && (
        <div className="mt-4 pt-4 border-t border-terminal-border">
          <p className="text-xs text-terminal-muted mb-2">Quick destinations:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.slice(0, 4).map((tag) => (
              <ActionTag
                key={tag.name}
                platform={tag.name}
                type={tag.type}
                onClick={() => addTag(tag)}
                isSelected={selectedTags.some((t) => t.name === tag.name)}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
