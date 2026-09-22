"use client";

import React, { useState } from "react";
import { Lock, KeyRound, X, Check, AlertCircle } from "lucide-react";
import { getAdminPin, setAdminPin } from "./AdminPinLock";

interface ChangePinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export default function ChangePinModal({
  isOpen,
  onClose,
  onSuccess,
}: ChangePinModalProps) {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDigitFilter = (val: string) => val.replace(/\D/g, "").slice(0, 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const actualCurrentPin = getAdminPin();

    if (currentPin !== actualCurrentPin) {
      setError("The current PIN entered is incorrect.");
      return;
    }

    if (newPin.length !== 4) {
      setError("New PIN must be exactly 4 numeric digits.");
      return;
    }

    if (newPin !== confirmPin) {
      setError("New PIN and confirmation PIN do not match.");
      return;
    }

    if (newPin === actualCurrentPin) {
      setError("New PIN cannot be identical to the current PIN.");
      return;
    }

    // Save new PIN
    setAdminPin(newPin);
    onSuccess("Admin PIN changed successfully! Please remember your new PIN.");
    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");
    onClose();
  };

  const handleModalClose = () => {
    setError(null);
    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-white/10 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl shadow-black/90 space-y-6 relative">
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-[#E50914] shrink-0 shadow-lg shadow-red-950/40">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950/50 border border-red-800/40 text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">
              <span>Security Settings</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Change Profile Lock PIN
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Update the 4-digit code required to access the admin dashboard.
            </p>
          </div>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="bg-red-950/40 border border-red-500/40 text-red-300 text-xs px-3.5 py-2.5 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current PIN */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Current 4-Digit PIN
            </label>
            <div className="relative">
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={currentPin}
                onChange={(e) => setCurrentPin(handleDigitFilter(e.target.value))}
                placeholder="••••"
                required
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-center text-lg font-mono tracking-widest text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E50914] transition-all"
              />
              <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* New PIN */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              New 4-Digit PIN
            </label>
            <div className="relative">
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(handleDigitFilter(e.target.value))}
                placeholder="••••"
                required
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-center text-lg font-mono tracking-widest text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E50914] transition-all"
              />
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Confirm New PIN */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Confirm New 4-Digit PIN
            </label>
            <div className="relative">
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={confirmPin}
                onChange={(e) => setConfirmPin(handleDigitFilter(e.target.value))}
                placeholder="••••"
                required
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-center text-lg font-mono tracking-widest text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E50914] transition-all"
              />
              <Check className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleModalClose}
              className="text-xs font-semibold text-zinc-400 hover:text-white px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={currentPin.length !== 4 || newPin.length !== 4 || confirmPin.length !== 4}
              className="text-xs font-bold bg-[#E50914] hover:bg-[#ff1e27] disabled:opacity-40 disabled:hover:bg-[#E50914] text-white px-5 py-2.5 rounded-lg shadow-md shadow-red-600/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Update PIN</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
