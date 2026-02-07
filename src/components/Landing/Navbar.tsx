"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronRight, Github, Twitter, Send } from "lucide-react";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Tools", href: "/tools" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Use cases", href: "/use-cases" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Docs", href: "/docs" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-800/50 shadow-lg shadow-black/20"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo - Larger */}
            <Link href="/" className="flex items-center relative z-50">
              <Image
                src="/logo.png"
                alt="Claw-Nomad"
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 transition-transform hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terminal-glow transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Social & CTA - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://x.com/ClawNomad"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/clawnomad"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/clawnomad-dev/clawnomad"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-terminal-glow text-zinc-900 text-sm font-semibold hover:bg-lime-400 transition-colors shadow-lg shadow-terminal-glow/20"
                >
                  Demo
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="lg:hidden relative z-50 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/98 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative h-full flex flex-col pt-24 px-6 pb-8"
            >
              {/* Navigation Links */}
              <div className="flex-1 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-4 px-4 text-xl font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                      <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-terminal-glow group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social Links & CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-auto space-y-4"
              >
                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 pb-4 border-b border-zinc-800">
                  <a
                    href="https://x.com/ClawNomad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a
                    href="https://t.me/clawnomad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    aria-label="Telegram"
                  >
                    <Send className="w-6 h-6" />
                  </a>
                  <a
                    href="https://github.com/clawnomad-dev/clawnomad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                </div>

                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 w-full py-4 text-lg font-semibold bg-terminal-glow text-zinc-900 rounded-xl hover:bg-lime-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Launch Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-center text-xs text-zinc-600">
                  No sign-up required
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
