"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, ArrowLeft, ShieldAlert } from "lucide-react";

interface AdminPinLockProps {
  onUnlock: () => void;
  avatarUrl?: string;
  profileName?: string;
}

const PIN_STORAGE_KEY = "azmain_portfolio_admin_pin";
export const DEFAULT_PIN = "8080";

export function getAdminPin(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
  }
  return DEFAULT_PIN;
}

export function setAdminPin(newPin: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(PIN_STORAGE_KEY, newPin);
  }
}

export default function AdminPinLock({
  onUnlock,
  avatarUrl = "/images/azmain-adil-2.jpeg",
  profileName = "Azmain Adil",
}: AdminPinLockProps) {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const verifyPin = (digits: string[]) => {
    const entered = digits.join("");
    const storedPin = getAdminPin();

    if (entered === storedPin) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("azmain_admin_session_auth", "true");
        window.dispatchEvent(new Event("session-auth-change"));
      }
      onUnlock();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      // Clear inputs and refocus first
      setPin(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    // Allow only numeric input
    const cleanVal = value.replace(/\D/g, "");
    if (!cleanVal) {
      const nextPin = [...pin];
      nextPin[index] = "";
      setPin(nextPin);
      return;
    }

    const digit = cleanVal.slice(-1);
    const nextPin = [...pin];
    nextPin[index] = digit;
    setPin(nextPin);
    setError(false);

    // Auto-advance
    if (index < 3) {
      inputRefs.current[index + 1]?.focus();
    } else {
      // Check full 4 digits
      verifyPin(nextPin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "Enter" && pin.every((d) => d !== "")) {
      verifyPin(pin);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length === 4) {
      const digits = pasted.split("");
      setPin(digits);
      verifyPin(digits);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-between selection:bg-[#E50914] selection:text-white">
      {/* Top Navbar */}
      <header className="p-6 sm:px-12 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-sm bg-[#E50914] flex items-center justify-center font-black text-white text-lg tracking-tighter shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            A
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white uppercase group-hover:text-red-500 transition-colors">
            {profileName}
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Portfolio</span>
        </Link>
      </header>

      {/* Center Netflix PIN Lock Container */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center space-y-7">
          {/* Avatar with Netflix Lock Badge */}
          <div className="relative inline-block mx-auto">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl relative mx-auto bg-zinc-900">
              <Image
                src={avatarUrl}
                alt={profileName}
                fill
                sizes="112px"
                className="object-cover object-[center_16%]"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Lock Badge */}
            <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-[#E50914] border-2 border-[#0a0a0a] flex items-center justify-center shadow-lg shadow-red-950/60">
              <Lock className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Copywriting */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-[11px] font-bold text-red-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
              <span>Profile Lock is On</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enter your PIN to access this profile.
            </h1>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
              Administrator privileges required to view and edit portfolio data.
            </p>
          </div>

          {/* PIN Input Digits */}
          <div className={`space-y-4 ${isShaking ? "animate-shake" : ""}`}>
            <div className="flex items-center justify-center gap-3 sm:gap-4" onPaste={handlePaste}>
              {pin.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  aria-label={`Digit ${idx + 1}`}
                  className={`w-14 h-16 sm:w-16 sm:h-20 text-center text-3xl font-mono font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                    error
                      ? "border-2 border-red-500 bg-red-950/20 text-red-200"
                      : digit
                      ? "border-2 border-white/40 bg-zinc-900 text-white"
                      : "border-2 border-zinc-800 bg-zinc-950 text-white focus:border-[#E50914] focus:bg-zinc-900"
                  }`}
                />
              ))}
            </div>

            {error && (
              <p className="text-xs text-red-400 font-semibold flex items-center justify-center gap-1.5 animate-in fade-in">
                <ShieldAlert className="w-4 h-4" />
                <span>Incorrect PIN. Please try again.</span>
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => verifyPin(pin)}
              disabled={pin.some((d) => d === "")}
              className="w-full sm:w-auto min-w-[160px] bg-[#E50914] hover:bg-[#ff1e27] disabled:opacity-40 disabled:hover:bg-[#E50914] text-white font-bold py-3 px-6 rounded-md text-sm shadow-lg shadow-red-600/30 transition-all cursor-pointer"
            >
              Unlock Profile
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto text-xs text-zinc-400 hover:text-white py-3 px-5 border border-white/10 rounded-md hover:bg-white/5 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
