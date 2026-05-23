/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export default function FeatureCard({ number, title, description, icon: Icon, features }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="gold-glow-border relative flex flex-col justify-between p-6 bg-obsidian-950/70 backdrop-blur-md rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Dynamic corner aesthetic highlights */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none border-t border-r border-white/5 group-hover:border-white/30 transition-colors duration-300 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none border-b border-l border-white/5 group-hover:border-white/30 transition-colors duration-300 rounded-bl-2xl" />

      {/* Radiant point light on hover */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-48 h-24 bg-white/[0.02] group-hover:bg-white/[0.08] rounded-full blur-2xl pointer-events-none transition-all duration-500" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
              <Icon className="w-5 h-5 text-white/70 group-hover:text-white" />
            </div>
            <span className="font-mono text-[10px] tracking-wider text-white/40 group-hover:text-white/60 transition-colors">
              UPLORA SERVICE
            </span>
          </div>
          <span className="font-mono text-xs text-white/20 font-bold tracking-widest">
            {number}
          </span>
        </div>

        <h3 className="font-display font-light text-lg md:text-xl text-white tracking-wide mb-3 group-hover:text-white/95 transition-colors">
          {title}
        </h3>

        <p className="font-sans text-xs md:text-sm text-white/40 font-light leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="border-t border-white/5 pt-4">
        <ul className="space-y-2.5">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-white/60 transition-colors" />
              <span className="font-display text-[11px] md:text-xs text-white/30 group-hover:text-white/60 transition-colors font-medium">
                {feat}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
