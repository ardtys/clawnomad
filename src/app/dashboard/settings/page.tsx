"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/Dashboard";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Wallet,
  Mail,
  Smartphone,
  Moon,
  Sun,
  Monitor,
  Check,
  ChevronRight,
  ExternalLink,
  Copy,
  LogOut,
  Trash2,
} from "lucide-react";

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: typeof Settings;
}

const sections: SettingSection[] = [
  { id: "profile", title: "Profile", description: "Manage your account details", icon: User },
  { id: "notifications", title: "Notifications", description: "Configure alert preferences", icon: Bell },
  { id: "security", title: "Security", description: "Password and 2FA settings", icon: Shield },
  { id: "appearance", title: "Appearance", description: "Customize your dashboard", icon: Palette },
  { id: "connections", title: "Connections", description: "Linked accounts and wallets", icon: Globe },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    transactions: true,
    workflows: true,
    alerts: true,
    marketing: false,
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
              <div className="space-y-4">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-terminal-glow to-green-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-zinc-900">OC</span>
                  </div>
                  <div>
                    <button className="px-4 py-2 rounded-lg bg-zinc-800 text-white text-sm hover:bg-zinc-700 transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-xs text-zinc-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Display Name</label>
                    <input
                      type="text"
                      defaultValue="OpenClaw Alpha"
                      className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-terminal-glow/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="alpha@openclaw.io"
                      className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-terminal-glow/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-zinc-400 mb-2">Bio</label>
                    <textarea
                      rows={3}
                      defaultValue="Autonomous agent enthusiast exploring the intersection of Web2, Web3, and AI."
                      className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-terminal-glow/50 resize-none"
                    />
                  </div>
                </div>

                <button className="px-4 py-2 rounded-lg bg-terminal-glow text-zinc-900 font-medium hover:bg-lime-400 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-4">Connected Wallet</h3>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-mono">0x7a3b...f42e</p>
                  <p className="text-xs text-zinc-500">MetaMask</p>
                </div>
                <button className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700 transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-700 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { key: "email", label: "Email Notifications", description: "Receive updates via email", icon: Mail },
                  { key: "push", label: "Push Notifications", description: "Browser push notifications", icon: Smartphone },
                  { key: "transactions", label: "Transaction Alerts", description: "Get notified for all transactions", icon: Wallet },
                  { key: "workflows", label: "Workflow Updates", description: "Status changes for your workflows", icon: Settings },
                  { key: "alerts", label: "Price Alerts", description: "Triggered price notifications", icon: Bell },
                  { key: "marketing", label: "Marketing Updates", description: "News and product updates", icon: Globe },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-700 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-xs text-zinc-500">{item.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications] ? "bg-terminal-glow" : "bg-zinc-700"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          notifications[item.key as keyof typeof notifications] ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
              <div className="space-y-4">
                {/* Password */}
                <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Password</p>
                      <p className="text-xs text-zinc-500">Last changed 30 days ago</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-zinc-700 text-white text-sm hover:bg-zinc-600 transition-colors">
                      Change Password
                    </button>
                  </div>
                </div>

                {/* 2FA */}
                <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        twoFactorEnabled ? "bg-green-500/10" : "bg-zinc-700"
                      }`}>
                        <Shield className={`w-5 h-5 ${twoFactorEnabled ? "text-green-400" : "text-zinc-400"}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                        <p className="text-xs text-zinc-500">
                          {twoFactorEnabled ? "Enabled - Using Authenticator App" : "Add an extra layer of security"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        twoFactorEnabled
                          ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          : "bg-terminal-glow text-zinc-900 hover:bg-lime-400"
                      }`}
                    >
                      {twoFactorEnabled ? "Disable" : "Enable"}
                    </button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-white">Active Sessions</p>
                      <p className="text-xs text-zinc-500">Manage your active sessions</p>
                    </div>
                    <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
                      Sign out all
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { device: "Chrome on macOS", location: "San Francisco, US", current: true },
                      { device: "Safari on iPhone", location: "San Francisco, US", current: false },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50">
                        <div className="flex items-center gap-3">
                          <Monitor className="w-5 h-5 text-zinc-500" />
                          <div>
                            <p className="text-sm text-white">{session.device}</p>
                            <p className="text-xs text-zinc-500">{session.location}</p>
                          </div>
                        </div>
                        {session.current ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">
                            Current
                          </span>
                        ) : (
                          <button className="text-xs text-zinc-500 hover:text-red-400 transition-colors">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "dark", label: "Dark", icon: Moon },
                  { value: "light", label: "Light", icon: Sun },
                  { value: "system", label: "System", icon: Monitor },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value as typeof theme)}
                    className={`p-4 rounded-xl border transition-all ${
                      theme === option.value
                        ? "border-terminal-glow bg-terminal-glow/10"
                        : "border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800"
                    }`}
                  >
                    <option.icon className={`w-6 h-6 mx-auto mb-2 ${
                      theme === option.value ? "text-terminal-glow" : "text-zinc-400"
                    }`} />
                    <p className={`text-sm font-medium ${
                      theme === option.value ? "text-terminal-glow" : "text-white"
                    }`}>
                      {option.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-4">Accent Color</h3>
              <div className="flex gap-3">
                {["#39FF14", "#00D1FF", "#FF6B6B", "#FFD93D", "#C084FC"].map((color) => (
                  <button
                    key={color}
                    className="w-10 h-10 rounded-full border-2 border-transparent hover:border-white transition-colors"
                    style={{ backgroundColor: color }}
                  >
                    {color === "#39FF14" && <Check className="w-5 h-5 mx-auto text-zinc-900" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "connections":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Connected Accounts</h3>
              <div className="space-y-4">
                {[
                  { name: "Google", email: "alpha@gmail.com", connected: true },
                  { name: "Twitter", email: "@openclaw_alpha", connected: true },
                  { name: "Discord", email: "Not connected", connected: false },
                  { name: "GitHub", email: "Not connected", connected: false },
                ].map((account) => (
                  <div
                    key={account.name}
                    className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-700 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{account.name}</p>
                        <p className="text-xs text-zinc-500">{account.email}</p>
                      </div>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        account.connected
                          ? "bg-zinc-700 text-white hover:bg-zinc-600"
                          : "bg-terminal-glow text-zinc-900 hover:bg-lime-400"
                      }`}
                    >
                      {account.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-zinc-500 mt-1">Manage your account and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeSection === section.id
                      ? "bg-terminal-glow/10 text-terminal-glow"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{section.title}</p>
                    <p className="text-xs text-zinc-500">{section.description}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${activeSection === section.id ? "text-terminal-glow" : "text-zinc-600"}`} />
                </button>
              ))}
            </nav>

            {/* Danger Zone */}
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                <Trash2 className="w-5 h-5" />
                <span className="text-sm font-medium">Delete Account</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6"
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
