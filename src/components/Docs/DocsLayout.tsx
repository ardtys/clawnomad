"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  ChevronDown,
  Search,
  Book,
  Rocket,
  Layers,
  Shield,
  Code,
  HelpCircle,
  Menu,
  X,
  Home,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface DocItem {
  title: string;
  slug: string;
}

interface DocSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: DocItem[];
}

const docsSidebar: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Rocket,
    items: [
      { title: "Introduction", slug: "introduction" },
      { title: "Quick Start", slug: "quick-start" },
      { title: "Installation", slug: "installation" },
      { title: "Your First Agent", slug: "first-agent" },
    ],
  },
  {
    id: "core-concepts",
    title: "Core Concepts",
    icon: Book,
    items: [
      { title: "Agent Architecture", slug: "architecture" },
      { title: "Command Language", slug: "commands" },
      { title: "Execution Model", slug: "execution" },
      { title: "Context & Memory", slug: "context" },
      { title: "Triggers & Conditions", slug: "triggers" },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: Layers,
    items: [
      { title: "Overview", slug: "overview" },
      { title: "Web2 Platforms", slug: "web2" },
      { title: "Web3 & DeFi", slug: "web3" },
      { title: "Moltworld", slug: "moltworld" },
      { title: "Custom Integrations", slug: "custom" },
    ],
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    items: [
      { title: "Security Model", slug: "model" },
      { title: "Permissions", slug: "permissions" },
      { title: "Spending Limits", slug: "limits" },
      { title: "Encryption", slug: "encryption" },
      { title: "Audit Logs", slug: "audit" },
    ],
  },
  {
    id: "api-reference",
    title: "API Reference",
    icon: Code,
    items: [
      { title: "Authentication", slug: "auth" },
      { title: "Commands API", slug: "commands-api" },
      { title: "Webhooks", slug: "webhooks" },
      { title: "SDKs", slug: "sdks" },
      { title: "Rate Limits", slug: "rate-limits" },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: HelpCircle,
    items: [
      { title: "Common Issues", slug: "common-issues" },
      { title: "Error Codes", slug: "error-codes" },
      { title: "FAQ", slug: "faq" },
      { title: "Getting Help", slug: "help" },
    ],
  },
];

// Get all pages in order for prev/next navigation
function getAllPages(): { section: string; slug: string; title: string }[] {
  const pages: { section: string; slug: string; title: string }[] = [];
  docsSidebar.forEach((section) => {
    section.items.forEach((item) => {
      pages.push({
        section: section.id,
        slug: item.slug,
        title: item.title,
      });
    });
  });
  return pages;
}

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(
    docsSidebar.map((s) => s.id)
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isActive = (section: string, slug: string) => {
    return pathname === `/docs/${section}/${slug}`;
  };

  const isInSection = (sectionId: string) => {
    return pathname.startsWith(`/docs/${sectionId}`);
  };

  // Get prev/next pages
  const allPages = getAllPages();
  const currentIndex = allPages.findIndex(
    (p) => pathname === `/docs/${p.section}/${p.slug}`
  );
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage =
    currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  const SidebarContent = () => (
    <>
      {/* Search */}
      <div className="p-4 border-b border-zinc-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-500 font-mono">
            <span>⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {docsSidebar.map((section) => {
            const isExpanded = expandedSections.includes(section.id);
            const sectionActive = isInSection(section.id);

            return (
              <div key={section.id} className="mb-2">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sectionActive
                      ? "text-white bg-zinc-800/50"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <section.icon className="w-4 h-4" />
                    {section.title}
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-1 ml-4 pl-4 border-l border-zinc-800 space-y-1">
                    {section.items.map((item) => {
                      const active = isActive(section.id, item.slug);
                      return (
                        <Link
                          key={item.slug}
                          href={`/docs/${section.id}/${item.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                            active
                              ? "text-terminal-glow bg-terminal-glow/10"
                              : "text-zinc-500 hover:text-white hover:bg-zinc-800/30"
                          }`}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer Links */}
      <div className="p-4 border-t border-zinc-800">
        <div className="space-y-2">
          <a
            href="https://github.com/clawnomad-dev/clawnomad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-white hover:bg-zinc-800/30 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://discord.gg/clawnomad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-white hover:bg-zinc-800/30 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Discord Community
          </a>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 z-50">
        <div className="h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Claw-Nomad Logo"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="font-semibold text-white hidden sm:block">Claw-Nomad</span>
            </Link>

            <span className="text-zinc-600">/</span>

            <Link
              href="/docs"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Documentation
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:block">Home</span>
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-lg bg-terminal-glow text-zinc-900 text-sm font-medium hover:bg-lime-400 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-14 left-0 bottom-0 w-72 bg-zinc-950 border-r border-zinc-800 z-40 flex flex-col transform transition-transform duration-200 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="lg:pl-72 pt-14">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {children}

          {/* Prev/Next Navigation */}
          {(prevPage || nextPage) && (
            <div className="mt-16 pt-8 border-t border-zinc-800 flex items-center justify-between gap-4">
              {prevPage ? (
                <Link
                  href={`/docs/${prevPage.section}/${prevPage.slug}`}
                  className="group flex-1 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Previous
                  </div>
                  <div className="text-white font-medium">{prevPage.title}</div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextPage ? (
                <Link
                  href={`/docs/${nextPage.section}/${nextPage.slug}`}
                  className="group flex-1 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-2 text-sm text-zinc-500 mb-1">
                    Next
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="text-white font-medium">{nextPage.title}</div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-zinc-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
              <p>Was this page helpful?</p>
              <div className="flex items-center gap-4">
                <button className="px-3 py-1 rounded border border-zinc-700 hover:border-zinc-600 hover:text-white transition-colors">
                  Yes
                </button>
                <button className="px-3 py-1 rounded border border-zinc-700 hover:border-zinc-600 hover:text-white transition-colors">
                  No
                </button>
                <a
                  href="https://github.com/clawnomad-dev/clawnomad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  Edit this page
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export { docsSidebar };
