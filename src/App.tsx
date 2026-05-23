/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Tv, 
  Users, 
  Download, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  Mail,
  Zap,
  Globe
} from "lucide-react";

import UploraLogo from "./components/UploraLogo";
import SleekNavbar from "./components/SleekNavbar";
import FeatureCard from "./components/FeatureCard";
import ProductOfferingRow from "./components/ProductOfferingRow";
import SignupForm from "./components/SignupForm";
import { ProductOffering } from "./types";

const NAV_SECTIONS = ["INTRoduction", "Executive specs", "DIGITAL MASTERWORKS", "JOIN CIRCLE"];

const WHOP_OFFERINGS: ProductOffering[] = [
  {
    id: "digital-architect",
    title: "The Ultimate Digital Commerce Masterclass",
    category: "Video Course + Blueprint",
    description: "Learn how to conceptualize, design, launch, and monetize premium digital services on platforms like Whop. Includes direct blueprints.",
    price: "$49.50 One-Time",
    features: ["4.8 Hours Screen Capture", "Ready-To-Deploy Design Templates", "Lifetime Access"],
    tag: "POPULAR"
  },
  {
    id: "vip-membership",
    title: "Uplora VIP Core Advisory Access",
    category: "Whop Membership",
    description: "Instant lifetime direct access to our inner-circle developer forum, private GitHub assets, and premium visual components.",
    price: "$199.00 Lifetime",
    features: ["Private Discord Gateway", "Whitelist Privileges", "Beta UI Packages"],
    tag: "METRIC-GOLD"
  },
  {
    id: "saas-ui-kit",
    title: "High-Contrast Responsive Layout Engine",
    category: "UI Design Asset",
    description: "A complete set of luxury minimalist react components, Tailwind wireframes, and smooth transition layouts optimized for SaaS conversions.",
    price: "$24.00 Instant",
    features: ["50+ Compiled JSX Blocks", "Figma Design Assets included", "Commercial Unrestricted License"]
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [metricCount, setMetricCount] = useState<number>(14); // Real simulated admin metric
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const logoSize = isMobile ? 300 : isTablet ? 380 : 460;

  // Fetch admin metric on launch
  useEffect(() => {
    fetch("/api/admin/metrics")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setMetricCount(14 + data.count); // 14 default + server registrations!
        }
      })
      .catch(() => {});
  }, [activeSection]);

  // Safe Debounced Scroll Wheel listener
  useEffect(() => {
    let lastScroll = Date.now();
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScroll < 850) return; // 850ms transition debounce

      if (Math.abs(e.deltaY) > 35) {
        if (e.deltaY > 0) {
          // Scroll Down
          setActiveSection((prev) => Math.min(prev + 1, NAV_SECTIONS.length - 1));
        } else {
          // Scroll Up
          setActiveSection((prev) => Math.max(prev - 1, 0));
        }
        lastScroll = now;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // Safe touch swiping listener for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.touches[0].clientY;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 60) { // Touch sensitivity thresh
      if (diff > 0) {
        // Swipe Up -> scroll down
        setActiveSection((prev) => Math.min(prev + 1, NAV_SECTIONS.length - 1));
      } else {
        // Swipe Down -> scroll up
        setActiveSection((prev) => Math.max(prev - 1, 0));
      }
      setTouchStart(null);
    }
  };

  const currentWhopStoreRedirect = () => {
    window.open("https://whop.com/uplora", "_blank");
  };

  // 3D-feeling golden logo animation properties mapped per section index
  // Note: All positions are now calculated using GPU-cached hardware accelerated translations (vw, vh)
  // instead of layout properties (top, left) to ensure buttery smooth transitions at maximum framerates!
  const getLogoStyles = () => {
    switch (activeSection) {
      case 0:
        return {
          x: isMobile ? "70vw" : isTablet ? "70vw" : "70vw",
          y: isMobile ? "42vh" : isTablet ? "46vh" : "50vh",
          scale: isMobile ? 0.95 : isTablet ? 1.1 : 1.25,
          rotate: 0,
        };
      case 1:
        return {
          x: isMobile ? "28vw" : isTablet ? "25vw" : "25vw",
          y: isMobile ? "42vh" : isTablet ? "45vh" : "50vh",
          scale: isMobile ? 0.72 : isTablet ? 0.85 : 0.95,
          rotate: -15,
        };
      case 2:
        return {
          x: isMobile ? "72vw" : isTablet ? "75vw" : "75vw",
          y: isMobile ? "40vh" : isTablet ? "45vh" : "51vh",
          scale: isMobile ? 0.68 : isTablet ? 0.82 : 0.92,
          rotate: 15,
        };
      case 3:
      default:
        return {
          x: "50vw",
          y: isMobile ? "13vh" : isTablet ? "14vh" : "15vh",
          scale: isMobile ? 0.58 : isTablet ? 0.62 : 0.65,
          rotate: 0,
        };
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#050505] text-[#f2f2f2] font-sans overflow-hidden relative select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      id="uplora-container"
    >
      {/* Background static minimalist design accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.015] via-transparent to-transparent pointer-events-none" />
      
      {/* Dynamic ambient gold pulsing light ball */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] rounded-full filter blur-[140px] pointer-events-none animate-gold-pulse" />

      {/* Modern thin alignment grid */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-[0.03]">
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
        <div className="h-full" />
      </div>

      {/* Global Sleek Navbar */}
      <SleekNavbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        sections={NAV_SECTIONS} 
      />

      {/* CINEMATIC INTERPOLATING LOGO LAYER */}
      {/* This encapsulates our standard Uplora Logo and flies smoothly around the workspace */}
      <motion.div
        animate={getLogoStyles()}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1.2
        }}
        className="absolute left-0 top-0 z-10 pointer-events-none"
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <UploraLogo size={logoSize} animate={activeSection !== 3} />
        </div>
      </motion.div>

      {/* MAIN VIEWPORT PANEL SLIDER */}
      <div className="h-screen w-full relative">
        <AnimatePresence mode="wait">
          {activeSection === 0 && (
            <motion.section
              key="hero-slide"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 px-6 md:px-12 xl:px-24 flex items-center justify-start z-20"
              id="hero-slide"
            >
              <div className="max-w-2xl text-left">
                {/* Micro tech banner */}
                <div className="flex items-center space-x-2.5 mb-5 mt-12 md:mt-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="font-mono text-[10px] uppercase text-white/55 tracking-widest font-bold">
                    Now Live On Whop Network
                  </span>
                </div>

                <h1 className="font-display font-light text-3xl sm:text-5xl md:text-6xl tracking-[0.04em] text-white leading-[1.12] mb-6 uppercase">
                  The last <br />
                  <span className="gold-text-shime font-bold block">education <br />you'll ever need.</span>
                </h1>

                <p className="font-sans text-xs sm:text-sm md:text-base text-white/40 font-light leading-relaxed max-w-lg mb-8">
                  Uplora empowers architects, developers, and premium digital creators with high-fidelity UI kits, professional system blueprints, and video masterclasses curated for unmatched execution.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* Master CTA - clicking triggers logo transition straight to register form */}
                  <button
                    onClick={() => setActiveSection(3)}
                    className="group relative px-6 py-3.5 bg-white hover:bg-white/90 text-black font-display font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center space-x-2.5"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform stroke-[2]" />
                  </button>

                  <button
                    onClick={() => setActiveSection(1)}
                    className="px-6 py-3.5 border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 text-white font-display text-xs uppercase tracking-widest rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center"
                  >
                    Explore Methodologies
                  </button>
                </div>

                {/* Simulated Real User count footer metric */}
                <div className="mt-12 md:mt-20 flex items-center space-x-6 border-t border-white/5 pt-6 max-w-sm">
                  <div>
                    <span className="block font-mono text-xl md:text-2xl font-light text-white tracking-wide">
                      {metricCount}
                    </span>
                    <span className="font-display text-[9px] uppercase tracking-widest text-white/30">
                      LEAD REGISTRATIONS
                    </span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10" />
                  <div>
                    <span className="block font-mono text-xl md:text-2xl font-light text-white tracking-wide">
                      100%
                    </span>
                    <span className="font-display text-[9px] uppercase tracking-widest text-white/30">
                      WHOP STANDARDS APPROVED
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 1 && (
            <motion.section
              key="specs-slide"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 px-6 md:px-12 xl:px-24 flex items-center justify-end z-20"
              id="specs-slide"
            >
              <div className="w-full md:max-w-2xl text-left mt-12 md:mt-0">
                {/* Performance Header info */}
                <div className="mb-8">
                  <span className="font-mono text-[9px] uppercase text-white/60 font-bold tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    PERFORMANCE PARADIGM
                  </span>
                  <h2 className="font-display font-light text-2xl sm:text-3xl md:text-4xl tracking-[0.05em] text-white mt-5 uppercase">
                    Architected for Mastery
                  </h2>
                  <p className="font-sans text-xs md:text-sm text-white/40 font-light mt-2 leading-relaxed">
                    We offer three pillars of digital acceleration. Each module is integrated directly on our secure Whop distribution platform.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="executive-spec-grid">
                  <FeatureCard
                    number="01"
                    title="Design Systems"
                    description="High-fidelity Figma wireframes, coded React structures, and micro-motion configurations."
                    icon={Cpu}
                    features={["Tailwind Optimized", "React 19 Ready", "Satin Gradients"]}
                  />
                  <FeatureCard
                    number="02"
                    title="Masterclasses"
                    description="Expert led screen recordings detailing systems design, e-commerce, and high ticket strategy."
                    icon={Tv}
                    features={["High-Definition", "Downloadable Blueprints", "Lifetime Access"]}
                  />
                  <FeatureCard
                    number="03"
                    title="VIP Network"
                    description="Private whitelisted discord access, real-time beta testing, and community support forums."
                    icon={Users}
                    features={["Direct Collaboration", "Priority Support", "Whop Auth Integrated"]}
                  />
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 2 && (
            <motion.section
              key="offerings-slide"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 px-6 md:px-12 xl:px-24 flex items-center justify-start z-20"
              id="offerings-slide"
            >
              <div className="w-full md:max-w-[55%] text-left mt-16 md:mt-0">
                <div className="mb-6">
                  <span className="font-mono text-[9px] uppercase text-white/60 font-bold tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    DIGITAL PORTFOLIO
                  </span>
                  <h2 className="font-display font-light text-2xl sm:text-3xl md:text-4xl tracking-[0.05em] text-white mt-5 uppercase">
                    Whop Distribution Suite
                  </h2>
                  <p className="font-sans text-xs md:text-sm text-white/40 font-light mt-2 leading-relaxed">
                    Verify registration or request instantaneous whitelisted privileges to query our masterclasses and design assets directly inside the secure distribution hub.
                  </p>
                </div>

                {/* Highly Polished Golden Glow Gate Access Card */}
                <div className="gold-glow-border p-6 md:p-8 bg-[#050505]/70 backdrop-blur-2xl rounded-2xl relative overflow-hidden group space-y-6" id="whop-portal-suite">
                  {/* Outer edge highlight */}
                  <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none border-t border-r border-white/5 group-hover:border-white/20 transition-colors duration-300 rounded-tr-2xl" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="font-mono text-[9px] uppercase text-white/60 tracking-wider">
                        Whitelisted Store Status: Active
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-white/20">NODE_GATEWAY_V1</span>
                  </div>

                  <div>
                    <h3 className="font-display font-light text-lg md:text-xl text-white tracking-wide mb-3">
                      Access the Official Uplora Roster
                    </h3>
                    <p className="font-sans text-xs text-white/40 font-light leading-relaxed">
                      All premium digital systems, wireframe libraries, interactive masterclass videos, and expert methodologies are located, maintained, and delivered secure to your credentials through the Whop Network portal.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/5 pt-5 mt-4">
                    <div className="flex items-center space-x-3 text-white/30">
                      <ShieldCheck className="w-4 h-4 text-white/40 animate-pulse" />
                      <span className="font-sans text-[11px] font-light">Whop Secured Standards Protocol</span>
                    </div>

                    <button 
                      onClick={currentWhopStoreRedirect}
                      className="group flex items-center justify-center space-x-2 px-5 py-2.5 bg-white hover:bg-white/90 text-black font-display font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 cursor-pointer"
                    >
                      <span>Enter Gateway</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-[11px] text-white/30 border-t border-white/5 pt-4">
                  <span className="font-display uppercase tracking-widest">
                    Verified Checkout Hub
                  </span>
                  <button 
                    onClick={currentWhopStoreRedirect}
                    className="font-mono text-white/40 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                  >
                    View entire whop roster <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 3 && (
            <motion.section
              key="form-slide"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 px-6 flex flex-col items-center justify-center z-20 text-center"
              id="signup-slide"
            >
              {/* Center Signup card containing direct Whop redirect */}
              <div className="mt-32 md:mt-32 md:pt-16">
                <SignupForm />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER METRICS AND SLIDER CONTROLS */}
      <footer className="fixed bottom-0 left-0 w-full z-40 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between bg-gradient-to-t from-[#050505]/95 to-transparent pointer-events-none text-xs md:text-sm">
        {/* Support email contact details */}
        <div className="flex items-center space-x-3 pointer-events-auto" id="footer-support-box">
          <Mail className="w-3.5 h-3.5 text-white/50" />
          <span className="font-mono text-[9px] md:text-xs text-white/35">
            INQUIRIES: <a href="mailto:uplora.io@gmail.com" className="text-white/65 hover:text-white transition-colors duration-300">uplora.io@gmail.com</a>
          </span>
        </div>

        {/* Dynamic section indicator (numbers: 01 - 04) with Up/Down Buttons */}
        <div className="flex items-center space-x-4 pointer-events-auto" id="footer-controller-panels">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveSection((prev) => Math.max(prev - 1, 0))}
              disabled={activeSection === 0}
              className={`p-1.5 border rounded-lg transition-all cursor-pointer ${
                activeSection === 0
                  ? "border-white/5 text-white/20 pointer-events-none"
                  : "border-white/10 hover:border-white/30 hover:bg-white/5 text-white/40 hover:text-white"
              }`}
              title="Previous Slide"
              id="ctrl-up-btn"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveSection((prev) => Math.min(prev + 1, NAV_SECTIONS.length - 1))}
              disabled={activeSection === NAV_SECTIONS.length - 1}
              className={`p-1.5 border rounded-lg transition-all cursor-pointer ${
                activeSection === NAV_SECTIONS.length - 1
                  ? "border-white/5 text-white/20 pointer-events-none"
                  : "border-white/10 hover:border-white/30 hover:bg-white/5 text-white/40 hover:text-white"
              }`}
              title="Next Slide"
              id="ctrl-down-btn"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center space-x-1 font-mono text-xs text-white/40">
            <span className="text-white font-semibold">0{activeSection + 1}</span>
            <span>/</span>
            <span>0{NAV_SECTIONS.length}</span>
          </div>
        </div>
      </footer>

      {/* Floating dot indicators on the far right (alternate nav) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-4" id="sidebar-indicators">
        {NAV_SECTIONS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSection(idx)}
            className="group relative flex items-center justify-end focus:outline-hidden cursor-pointer"
            id={`indicator-dot-${idx}`}
          >
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all font-display text-[9px] tracking-widest text-white/60 font-bold uppercase whitespace-nowrap hidden md:block">
              {NAV_SECTIONS[idx]}
            </span>
            <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
              activeSection === idx 
                ? "bg-white scale-125 shadow-[0_0_12px_rgba(255,255,255,0.4)]" 
                : "bg-white/10 hover:bg-white/30"
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
}
