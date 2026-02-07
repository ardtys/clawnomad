"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Activity,
  Settings,
  Shield,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Wallet,
  Zap,
  History,
  Layers,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Activity", href: "/dashboard/activity", icon: Activity },
  { name: "Workflows", href: "/dashboard/workflows", icon: Zap },
  { name: "Integrations", href: "/dashboard/integrations", icon: Layers },
  { name: "Vault", href: "/dashboard/vault", icon: Shield },
  { name: "History", href: "/dashboard/history", icon: History },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const quickStats = [
  { label: "Active Workflows", value: "12", trend: "+3" },
  { label: "Actions Today", value: "47", trend: "+12" },
  { label: "Success Rate", value: "94.2%", trend: "+1.2%" },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: "Swap executed successfully", time: "2 min ago", type: "success" },
    { id: 2, title: "Daily limit reached", time: "1 hour ago", type: "warning" },
    { id: 3, title: "New integration available", time: "3 hours ago", type: "info" },
  ]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setUserMenuOpen(false);
      setNotificationsOpen(false);
    };
    if (userMenuOpen || notificationsOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [userMenuOpen, notificationsOpen]);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[280px] sm:w-64 bg-zinc-900 border-r border-zinc-800 z-50 transform transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Close Button */}
          <div className="p-4 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Claw-Nomad"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <div>
                  <span className="font-bold text-white">Claw-Nomad</span>
                  <p className="text-xs text-zinc-500">Agent Dashboard</p>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-b border-zinc-800">
            <div className="grid grid-cols-1 gap-2">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/50"
                >
                  <span className="text-xs text-zinc-500">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{stat.value}</span>
                    <span className="text-xs text-terminal-glow">{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-terminal-glow/10 text-terminal-glow"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-terminal-glow"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Links */}
          <div className="p-4 border-t border-zinc-800 space-y-3">
            <Link
              href="/docs"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              Documentation
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Link>
            <div className="flex items-center justify-center gap-1.5 pt-2">
              <span className="text-xs text-zinc-600">Powered by</span>
              <span className="text-xs font-semibold bg-gradient-to-r from-terminal-glow to-lime-400 bg-clip-text text-transparent">
                Open Claw
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-800">
          <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 -ml-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search - Hidden on very small screens */}
            <div className="hidden sm:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search commands, workflows..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-500 font-mono">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Mobile Search Button */}
            <button className="sm:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Right side */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Wallet Status */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                <Wallet className="w-4 h-4 text-terminal-glow" />
                <span className="text-sm text-white">2.45 ETH</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationsOpen(!notificationsOpen);
                    setUserMenuOpen(false);
                  }}
                  className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-terminal-glow" />
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 sm:right-0 mt-2 w-[calc(100vw-24px)] sm:w-80 max-w-80 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden"
                      style={{ right: "0" }}
                    >
                      <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
                        <h3 className="font-semibold text-white">Notifications</h3>
                        <button
                          onClick={() => setNotificationsOpen(false)}
                          className="sm:hidden p-1 text-zinc-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="p-3 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800 last:border-0"
                          >
                            <p className="text-sm text-white">{notif.title}</p>
                            <p className="text-xs text-zinc-500 mt-1">{notif.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-2 border-t border-zinc-800">
                        <button className="w-full py-2 text-sm text-terminal-glow hover:bg-terminal-glow/10 rounded-lg transition-colors">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen(!userMenuOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-lg hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-terminal-glow to-green-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-zinc-900">OC</span>
                  </div>
                  <ChevronDown className="hidden sm:block w-4 h-4 text-zinc-400" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden"
                    >
                      <div className="p-3 border-b border-zinc-800">
                        <p className="font-semibold text-white">OpenClaw Alpha</p>
                        <p className="text-xs text-zinc-500">0x7a3b...f42e</p>
                      </div>
                      {/* Mobile Wallet Status */}
                      <div className="md:hidden p-3 border-b border-zinc-800">
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-terminal-glow" />
                          <span className="text-sm text-white">2.45 ETH</span>
                        </div>
                      </div>
                      <div className="p-1">
                        <Link
                          href="/dashboard/settings"
                          className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Profile Settings
                        </Link>
                        <Link
                          href="/dashboard/vault"
                          className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          Security
                        </Link>
                        <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                          <LogOut className="w-4 h-4" />
                          Disconnect
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-3 sm:p-4 md:p-6 lg:p-8 min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
