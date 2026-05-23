/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User, Mail, ShieldAlert, ArrowRight, Loader, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SignupResponse } from "../types";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<SignupResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError("Please fill in your username.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: username.trim(), 
          email: email.trim() 
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setSuccessData(data);

      // Perform Whop store redirect after 2.5 seconds to let the gold success animation breathe!
      setTimeout(() => {
        try {
          window.open(data.redirectUrl || "https://whop.com/uplora", "_blank");
        } catch (e) {
          console.warn("Direct window open blocked or failed", e);
        }
      }, 3000);

    } catch (err: any) {
      setError(err.message || "Failed to establish validation telemetry. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto" id="signup-card-container">
      {/* Background ambient gold pool behind card */}
      <div className="absolute inset-0 bg-white/[0.01]/5 rounded-3xl blur-3xl -z-10" />

      <AnimatePresence mode="wait">
        {!successData ? (
          <motion.div
            key="signup-form"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="gold-glow-border p-8 bg-[#050505]/95 backdrop-blur-3xl rounded-2xl relative overflow-hidden"
          >
            <div className="text-center mb-8">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 font-bold bg-white/5 px-3 py-1 rounded-full border border-white/10">
                PROVISION GATEWAY
              </span>
              <h3 className="font-display font-light text-xl md:text-2xl text-white tracking-[0.1em] mt-5 uppercase">
                Ascend with Uplora
              </h3>
              <p className="font-sans text-xs text-white/40 font-light mt-2.5 leading-relaxed">
                Enter your credentials to unlock immediate whitelisted privileges and masterclass blueprints. Registries are delivered to <strong className="text-white/60 font-medium">uplora.io@gmail.com</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username field with absolute floating label matches the template */}
              <div className="relative">
                <label className="text-[9px] uppercase tracking-[0.15em] text-white/40 absolute top-[-6px] left-3 bg-[#050505] px-1.5 z-10 font-mono">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/20">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    placeholder="@future_user"
                    className="block w-full pl-10 pr-4 py-3 bg-transparent border border-white/10 rounded-lg text-xs md:text-sm text-white placeholder-white/10 focus:border-white/40 focus:outline-hidden transition-all duration-300"
                    id="signup-username-input"
                  />
                </div>
              </div>

              {/* Email field with absolute floating label matches the template */}
              <div className="relative">
                <label className="text-[9px] uppercase tracking-[0.15em] text-white/40 absolute top-[-6px] left-3 bg-[#050505] px-1.5 z-10 font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/20">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="your@email.com"
                    className="block w-full pl-10 pr-4 py-3 bg-transparent border border-white/10 rounded-lg text-xs md:text-sm text-white placeholder-white/10 focus:border-white/40 focus:outline-hidden transition-all duration-300"
                    id="signup-email-input"
                  />
                </div>
              </div>

              {/* Error feedback */}
              {error && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400 text-xs mt-1.5 animate-pulse" id="signup-error-box">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="font-sans leading-relaxed">{error}</span>
                </div>
              )}

              {/* Submit CTA button - pristine high contrast white background with black text */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group py-3.5 px-5 bg-white hover:bg-white/90 text-black font-display font-bold tracking-widest text-xs uppercase rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center space-x-3 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                id="signup-submit-button"
              >
                {loading ? (
                  <>
                    <Loader className="w-3.5 h-3.5 animate-spin text-black" />
                    <span>AUTHORIZING teleMETRICS...</span>
                  </>
                ) : (
                  <>
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-5 border-t border-white/5 text-center flex items-center justify-center space-x-2 text-[10px] text-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-ping" />
              <span className="font-display uppercase tracking-widest">
                AUTOMATED TO WHOP GATEWAY
              </span>
            </div>
          </motion.div>
        ) : (
          /* GLORIOUS SUCCESS / CONGRATULATIONS CELEBRATION FEEDBACK */
          <motion.div
            key="success-celebration"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="gold-glow-border p-10 bg-[#050505]/95 backdrop-blur-3xl rounded-2xl relative overflow-hidden text-center"
            id="signup-success-card"
          >
            {/* Pure CSS Dynamic Falling silver/white confetti */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-[-10px] left-1/4 w-1.5 h-3 bg-white rounded-full animate-bounce" style={{ animationDuration: "1s" }} />
              <div className="absolute top-[-10px] left-2/4 w-1 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDuration: "1.5s" }} />
              <div className="absolute top-[-10px] left-3/4 w-2 h-2.5 bg-white/70 rounded-full animate-bounce" style={{ animationDuration: "0.8s" }} />
              <div className="absolute top-[-10px] left-[15%] w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDuration: "2.2s" }} />
              <div className="absolute top-[-10px] left-[85%] w-1.5 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDuration: "1.8s" }} />
            </div>

            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>

            <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 font-semibold bg-white/5 px-3 py-1 rounded-full border border-white/10">
              SIGN UP RATIFIED
            </span>

            <h3 className="font-display font-light text-2xl text-white tracking-[0.05em] mt-5 uppercase">
              Access Approved.
            </h3>
            
            <p className="font-sans text-xs md:text-sm text-white/40 font-light mt-3 leading-relaxed max-w-xs mx-auto">
              Welcome, <strong className="text-white font-medium">{successData.username}</strong>! Your registration is complete. Forwarding coordinates directly to <strong className="text-white/60">uplora.io@gmail.com</strong>.
            </p>

            {/* Glowing countdown loader */}
            <div className="mt-8 flex flex-col items-center justify-center space-y-4">
              <div className="w-full bg-white/5 h-1 rounded-full max-w-xs overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.8, ease: "linear" }}
                  className="h-full bg-white/80 rounded-full"
                />
              </div>
              <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase mt-2">
                AUTOMATIC REDIRECTING IN PROCESS or click directly below:
              </span>
              <a
                href={successData.redirectUrl || "https://whop.com/uplora"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center space-x-2 px-6 py-2.5 bg-white hover:bg-white/90 text-black font-display font-bold text-[11px] uppercase tracking-widest rounded-lg transition-all duration-300 cursor-pointer pointer-events-auto"
              >
                <span>Continue to Whop Hub</span>
                <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
