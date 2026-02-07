"use client";

import { useState } from "react";
import { Copy, Check, AlertCircle, Info, AlertTriangle, CheckCircle2 } from "lucide-react";

// Code Block with Copy
interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "bash", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden my-6">
      {filename && (
        <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-mono">{filename}</span>
          <span className="text-xs text-zinc-600">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-zinc-300">{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-zinc-400" />
          )}
        </button>
      </div>
    </div>
  );
}

// Callout Component
interface CalloutProps {
  type: "info" | "warning" | "error" | "success";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  const styles = {
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      icon: Info,
      iconColor: "text-blue-400",
    },
    warning: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      icon: AlertTriangle,
      iconColor: "text-amber-400",
    },
    error: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      icon: AlertCircle,
      iconColor: "text-red-400",
    },
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      icon: CheckCircle2,
      iconColor: "text-green-400",
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={`rounded-xl border ${style.border} ${style.bg} p-4 my-6`}>
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          {title && <p className="font-medium text-white mb-1">{title}</p>}
          <div className="text-sm text-zinc-400">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Step Component
interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-terminal-glow/20 flex items-center justify-center text-terminal-glow font-bold text-sm">
          {number}
        </div>
      </div>
      <div className="flex-1 pt-1">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <div className="text-zinc-400">{children}</div>
      </div>
    </div>
  );
}

// Table of Contents (for right sidebar)
interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <div className="hidden xl:block fixed right-8 top-32 w-56">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
        On this page
      </p>
      <nav className="space-y-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm text-zinc-500 hover:text-white transition-colors ${
              item.level === 2 ? "pl-0" : "pl-3"
            }`}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}

// API Endpoint Component
interface ApiEndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description: string;
}

export function ApiEndpoint({ method, path, description }: ApiEndpointProps) {
  const methodColors = {
    GET: "bg-green-500/20 text-green-400",
    POST: "bg-blue-500/20 text-blue-400",
    PUT: "bg-amber-500/20 text-amber-400",
    DELETE: "bg-red-500/20 text-red-400",
    PATCH: "bg-purple-500/20 text-purple-400",
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 my-4">
      <div className="flex items-center gap-3 mb-2">
        <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${methodColors[method]}`}>
          {method}
        </span>
        <code className="text-sm text-white font-mono">{path}</code>
      </div>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
  );
}

// Parameter Table
interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ParameterTableProps {
  parameters: Parameter[];
}

export function ParameterTable({ parameters }: ParameterTableProps) {
  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden my-6">
      <table className="w-full">
        <thead className="bg-zinc-900">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase">Type</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase">Required</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {parameters.map((param) => (
            <tr key={param.name}>
              <td className="px-4 py-3">
                <code className="text-sm text-terminal-glow font-mono">{param.name}</code>
              </td>
              <td className="px-4 py-3">
                <code className="text-sm text-zinc-400 font-mono">{param.type}</code>
              </td>
              <td className="px-4 py-3">
                {param.required ? (
                  <span className="text-xs text-amber-400">Required</span>
                ) : (
                  <span className="text-xs text-zinc-500">Optional</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-zinc-400">{param.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Main Doc Content Wrapper
interface DocContentProps {
  title: string;
  description?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function DocContent({ title, description, lastUpdated, children }: DocContentProps) {
  return (
    <article className="prose prose-invert max-w-none">
      {/* Header */}
      <header className="mb-8 pb-8 border-b border-zinc-800">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h1>
        {description && (
          <p className="text-lg text-zinc-400 leading-relaxed">{description}</p>
        )}
        {lastUpdated && (
          <p className="text-sm text-zinc-600 mt-4">Last updated: {lastUpdated}</p>
        )}
      </header>

      {/* Content */}
      <div className="docs-content">{children}</div>
    </article>
  );
}
