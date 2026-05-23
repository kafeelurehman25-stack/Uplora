/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowUpRight, ShieldCheck, Star } from "lucide-react";
import { motion } from "motion/react";
import { ProductOffering } from "../types";

interface ProductOfferingRowProps {
  offering: ProductOffering;
  onRedirect: () => void;
  key?: string | number;
}

export default function ProductOfferingRow({ offering, onRedirect }: ProductOfferingRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.005, backgroundColor: "rgba(255,255,255,0.03)" }}
      transition={{ duration: 0.3 }}
      onClick={onRedirect}
      className="w-full text-left p-5 border border-white/5 hover:border-white/15 bg-obsidian-950/40 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Rating/Tagging Icon badge */}
        <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-white/5 group-hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
          <Star className="w-4 h-4 text-white/40 group-hover:text-white fill-white/5 group-hover:fill-white/10" />
        </div>

        <div>
          {/* Top category and status */}
          <div className="flex items-center space-x-2.5 mb-1.5">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/60 font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
              {offering.category}
            </span>
            {offering.tag && (
              <span className="font-mono text-[9px] uppercase tracking-widest text-white font-semibold bg-white/10 px-2 py-0.5 rounded-full">
                {offering.tag}
              </span>
            )}
          </div>

          {/* Product name */}
          <h4 className="font-display font-light text-white group-hover:text-white/90 transition-colors text-sm md:text-base tracking-wide">
            {offering.title}
          </h4>

          {/* Short specs */}
          <p className="font-sans text-xs text-white/40 font-light mt-1 max-w-xl">
            {offering.description}
          </p>
        </div>
      </div>

      {/* Pricing / CTA trigger Column */}
      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none border-white/5 pt-3 md:pt-0">
        <div className="text-left md:text-right">
          <span className="block font-mono text-[9px] text-white/30 uppercase tracking-wider font-bold">
            PROVISION STATE
          </span>
          <span className="font-mono text-xs font-semibold text-white/70 flex items-center gap-1 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-white/50 animate-pulse" /> {offering.price || "Instant Access"}
          </span>
        </div>

        <button 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/15 border border-white/10 group-hover:border-white/30 transition-all cursor-pointer"
          id={`view-btn-${offering.id}`}
        >
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </motion.div>
  );
}
