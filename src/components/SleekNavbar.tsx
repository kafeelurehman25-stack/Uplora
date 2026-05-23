/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShoppingCart, Compass, ArrowUpRight } from "lucide-react";

interface SleekNavbarProps {
  activeSection: number;
  setActiveSection: (index: number) => void;
  sections: string[];
}

export default function SleekNavbar({ activeSection, setActiveSection, sections }: SleekNavbarProps) {
  const handleWhopRedirect = () => {
    window.open("https://whop.com/uplora", "_blank");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-xs select-none">
      {/* Brand Logo - tracking wide sans-serif display text */}
      <div 
        className="flex items-center space-x-3 cursor-pointer group"
        onClick={() => setActiveSection(0)}
        id="navbar-brand"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span className="font-display font-bold tracking-[0.3em] text-sm md:text-base text-white group-hover:text-white/80 transition-colors duration-300">
          UPLORA
        </span>
      </div>

      {/* Nav Indices - High-end numbered selector dots */}
      <nav className="hidden md:flex items-center space-x-10" id="navbar-nav-links">
        {sections.map((section, idx) => (
          <button
            key={section}
            onClick={() => setActiveSection(idx)}
            className="group relative flex flex-col items-start focus:outline-hidden"
          >
            <div className="flex items-center space-x-2">
              <span className={`font-mono text-[10px] transition-colors duration-300 ${
                activeSection === idx ? "text-white" : "text-gray-500 group-hover:text-gray-300"
              }`}>
                0{idx + 1}
              </span>
              <span className={`font-display tracking-widest text-xs font-medium uppercase transition-colors duration-300 ${
                activeSection === idx ? "text-white" : "text-white/40 group-hover:text-white"
              }`}>
                {section}
              </span>
            </div>
            
            {/* Active Border Slider animation */}
            <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-gradient-to-r from-white to-white/30 transition-all duration-300 ${
              activeSection === idx ? "w-full" : "w-0 group-hover:w-1/2"
            }`} />
          </button>
        ))}
      </nav>

      {/* Primary Store CTA Button */}
      <div className="flex items-center space-x-4" id="navbar-actions">
        <button
          onClick={handleWhopRedirect}
          className="relative group flex items-center space-x-2 px-4 py-2 border border-white/10 hover:border-white/35 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
          <span className="font-display tracking-wider text-[11px] font-semibold text-white/80 group-hover:text-white transition-colors">
            WHOP STORE
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </header>
  );
}
