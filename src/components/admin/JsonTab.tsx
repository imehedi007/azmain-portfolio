"use client";

import React, { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { Copy, Check, Download, AlertTriangle, RefreshCw, RotateCcw } from "lucide-react";

interface JsonTabProps {
  data: PortfolioData;
  onApply: (data: PortfolioData) => void;
  onExport: () => void;
}

export default function JsonTab({ data, onApply, onExport }: JsonTabProps) {
  const [jsonText, setJsonText] = useState(() => JSON.stringify(data, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleTextChange = (text: string) => {
    setJsonText(text);
    setApplied(false);
    try {
      JSON.parse(text);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON syntax");
    }
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText) as PortfolioData;
      if (!parsed.profile || !parsed.experience) {
        setError("Invalid schema: portfolio must include 'profile' and 'experience' sections.");
        return;
      }
      onApply(parsed);
      setError(null);
      setApplied(true);
      setTimeout(() => setApplied(false), 2500);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON syntax");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON syntax");
    }
  };

  const handleSyncFromCurrent = () => {
    setJsonText(JSON.stringify(data, null, 2));
    setError(null);
  };

  return (
    <div className="space-y-4 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#141414] p-4 rounded-xl border border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white">Direct JSON Editor & Validator</h3>
          <p className="text-xs text-zinc-400">
            Directly edit, validate, copy, or export the structured portfolio configuration.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSyncFromCurrent}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reload with latest state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reload</span>
          </button>

          <button
            onClick={handlePrettify}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Format</span>
          </button>

          <button
            onClick={handleCopy}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy JSON"}</span>
          </button>

          <button
            onClick={onExport}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-red-500" />
            <span>Download .json</span>
          </button>

          <button
            onClick={handleApply}
            disabled={!!error}
            className="text-xs bg-[#E50914] hover:bg-[#ff1e27] disabled:opacity-40 text-white font-bold px-4 py-1.5 rounded-md flex items-center gap-1.5 transition-all shadow-md shadow-red-600/30 cursor-pointer"
          >
            {applied ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{applied ? "Saved & Applied!" : "Apply JSON Changes"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-lg text-xs text-red-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
          <span>JSON Syntax Error: {error}</span>
        </div>
      )}

      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d]">
        <textarea
          rows={24}
          value={jsonText}
          onChange={(e) => handleTextChange(e.target.value)}
          spellCheck={false}
          className="w-full bg-[#0d0d0d] text-zinc-200 font-mono text-xs p-4 focus:outline-none resize-y leading-relaxed"
        />
      </div>
    </div>
  );
}
