/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";

interface UploraLogoProps {
  className?: string;
  size?: number | string;
  animate?: boolean;
}

export default function UploraLogo({ 
  className = "", 
  size = "100%", 
  animate = true 
}: UploraLogoProps) {
  return (
    <div 
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Soft ambient background glow tailored for the premium dark background */}
      <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl opacity-30 mix-blend-screen pointer-events-none" />

      <motion.svg
        viewBox="126 103 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_20px_50px_rgba(150,100,20,0.3)]"
        animate={animate ? {
          y: [0, -6, 0],
        } : undefined}
        transition={animate ? {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        } : undefined}
      >
        <defs>
          {/* Main Gold Gradient for the Left Pillar */}
          <linearGradient id="uplora-gold-pillar" x1="175" y1="120" x2="219" y2="270" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fae5a0" />
            <stop offset="25%" stopColor="#ecc065" />
            <stop offset="65%" stopColor="#b37119" />
            <stop offset="100%" stopColor="#5c2a01" />
          </linearGradient>

          {/* S-Bend / Bottom Sweep gradient going around the U curve */}
          <linearGradient id="uplora-gold-sweep" x1="175" y1="270" x2="337" y2="370" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5c2a01" />
            <stop offset="30%" stopColor="#b37119" />
            <stop offset="60%" stopColor="#dfa846" />
            <stop offset="85%" stopColor="#fae5a0" />
            <stop offset="100%" stopColor="#92520c" />
          </linearGradient>

          {/* Front Fold cylinder gradient to produce 3D metallic highlights */}
          <linearGradient id="uplora-fold-top" x1="248" y1="188" x2="337" y2="295" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fae5a0" />
            <stop offset="30%" stopColor="#dfa846" />
            <stop offset="70%" stopColor="#b37119" />
            <stop offset="100%" stopColor="#5c2a01" />
          </linearGradient>

          {/* Inside Pocket Shadow gradient for volumetric hollow loop look */}
          <linearGradient id="uplora-pocket-shadow" x1="248" y1="188" x2="248" y2="295" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0a0300" stopOpacity={0.95} />
            <stop offset="50%" stopColor="#250f02" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#3d1d03" stopOpacity={0.0} />
          </linearGradient>

          {/* Bright specular highlight for the top edge of the fold */}
          <linearGradient id="uplora-fold-rim" x1="248" y1="188" x2="337" y2="188" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.8} />
            <stop offset="35%" stopColor="#fae5a0" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#dfa846" stopOpacity={0.0} />
          </linearGradient>

          {/* Shimmer Highlight overlay across the entire shape for metallic look */}
          <linearGradient id="logo-shimmer" x1="175" y1="120" x2="337" y2="370" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.3} />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity={0.0} />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.4} />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity={0.0} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.2} />
          </linearGradient>
        </defs>

        {/* Dynamic backdrop bloom element within SVG */}
        <circle cx="256" cy="233" r="140" fill="#dfa846" opacity="0.04" className="blur-2xl" />

        <g id="uplora-image-logo" className="transition-all duration-300">
          
          {/* 1. LEFT PILLAR WITH CAPSULE ROUNDED TOP */}
          <path
            d="M 175, 142 
               C 175, 115 219, 115 219, 142 
               L 219, 270 
               L 175, 270 
               Z"
            fill="url(#uplora-gold-pillar)"
          />

          {/* 2. SYMMETRIC BOTTOM U-BEND AND BACK WALL OF THE U */}
          <path
            d="M 175, 270 
               A 81, 81 0 0 0 337, 270 
               L 337, 188 
               L 293, 188 
               L 293, 270 
               A 37, 37 0 0 1 219, 270 
               Z"
            fill="url(#uplora-gold-sweep)"
          />

          {/* 3. 3D DEEP HOLLOW LOOP SHADOW (Deepest layer of curl) */}
          <path
            d="M 248, 188 
               C 275, 188 293, 200 293, 220 
               C 293, 245 270, 245 248, 245 
               C 220, 245 220, 220 248, 188 
               Z"
            fill="url(#uplora-pocket-shadow)"
          />

          {/* 4. THE FRONT GOLDEN CURL FACE (3D ribbon roll) */}
          <path
            d="M 248, 188 
               L 337, 188 
               L 337, 245 
               C 337, 285 295, 295 248, 295 
               C 210, 295 210, 245 248, 245 
               C 274, 245 293, 235 293, 188 
               Z"
            fill="url(#uplora-fold-top)"
          />

          {/* 5. SPECULAR RIM GLOW on top horizontal fold boundary */}
          <path
            d="M 248, 188 L 337, 188"
            stroke="url(#uplora-fold-rim)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 6. METALLIC SHIMMER REFLECTION OVERLAY */}
          <path
            d="M 175, 142 
               C 175, 115 219, 115 219, 142 
               L 219, 270 
               A 81, 81 0 0 0 337, 270 
               L 337, 188 
               L 248, 188 
               C 210, 295 210, 245 248, 245
               Z"
            fill="url(#logo-shimmer)"
            style={{ mixBlendMode: "color-dodge" }}
            opacity="0.35"
          />
        </g>
      </motion.svg>
    </div>
  );
}
