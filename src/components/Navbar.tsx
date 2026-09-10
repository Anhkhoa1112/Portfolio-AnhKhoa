"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/data";
import { useColorScheme } from "@/src/context/ThemeContext";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navigation } = portfolioData;
  const { colorScheme, toggleColorScheme } = useColorScheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-4 px-4 sm:px-6 pointer-events-none">
      <nav
        className={`max-w-6xl mx-auto pointer-events-auto rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-[#050816]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)] py-2.5 px-5 sm:px-6"
            : "bg-[#050816]/60 backdrop-blur-md border border-white/8 py-2.5 px-5 sm:px-7"
        }`}
        aria-label="Main Navigation"
      >
        <div className="flex items-center justify-between">
          {/* LEFT: Brand Logo & Name (Click to toggle Cyan <-> Red theme) */}
          <button
            type="button"
            onClick={toggleColorScheme}
            className="flex items-center gap-2.5 group focus:outline-none cursor-pointer select-none text-left"
            title="Click to toggle Red / Cyan theme"
            aria-label="Toggle Color Theme"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95 shrink-0">
              <Image
                src={colorScheme === "red" ? "/logo-red.png" : "/logo.png"}
                alt="Logo"
                width={36}
                height={36}
                className={`w-full h-full object-contain filter transition-all duration-300 ${
                  colorScheme === "red"
                    ? "drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]"
                    : "drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                }`}
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-wider text-white group-hover:opacity-90 transition-colors uppercase font-mono leading-none">
                KHOA
                <span
                  className={`transition-colors duration-300 ${
                    colorScheme === "red" ? "text-red-500" : "text-cyan-400"
                  }`}
                >
                  .
                </span>
              </span>
              <span
                className={`text-[9px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                  colorScheme === "red" ? "text-red-400/80" : "text-cyan-400/80"
                }`}
              >
                {colorScheme === "red" ? "RED MODE" : "CYAN MODE"}
              </span>
            </div>
          </button>

          {/* CENTER: Desktop Navigation Links with Theme-Aware Hover Background */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-xs font-medium text-slate-200 transition-all duration-300 tracking-wide py-1.5 px-3.5 rounded-full border border-transparent ${
                  colorScheme === "red"
                    ? "hover:text-red-300 hover:bg-red-500/15 hover:border-red-500/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                    : "hover:text-cyan-300 hover:bg-cyan-500/15 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* RIGHT: Let's Talk CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="btn-gradient-primary flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs active:scale-95 shadow-sm"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Right Controls: Hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`p-2 rounded-full bg-white/5 border border-white/10 text-slate-200 hover:text-white focus:outline-none focus:ring-1 ${
                colorScheme === "red" ? "focus:ring-red-400" : "focus:ring-cyan-400"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto max-w-sm mx-auto mt-2 rounded-2xl bg-[#050816]/95 backdrop-blur-xl border border-white/10 p-5 shadow-2xl md:hidden"
          >
            {/* Header on mobile drawer top */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <button
                type="button"
                onClick={toggleColorScheme}
                className="flex items-center gap-2 cursor-pointer text-left"
                title="Toggle Theme"
              >
                <Image
                  src={colorScheme === "red" ? "/logo-red.png" : "/logo.png"}
                  alt="Logo"
                  width={26}
                  height={26}
                  className="w-6.5 h-6.5 object-contain"
                />
                <span className="text-sm font-black tracking-wider text-white font-mono uppercase">
                  KHOA
                  <span
                    className={colorScheme === "red" ? "text-red-500" : "text-cyan-400"}
                  >
                    .
                  </span>
                </span>
              </button>
              <span
                className={`text-[10px] font-mono uppercase tracking-wider ${
                  colorScheme === "red" ? "text-red-400" : "text-cyan-300"
                }`}
              >
                {colorScheme === "red" ? "Red Mode" : "Cyan Mode"}
              </span>
            </div>

            {/* Mobile Nav Links with Theme-Aware Hover Background */}
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium text-slate-200 py-2 px-3.5 rounded-xl border border-transparent transition-all ${
                    colorScheme === "red"
                      ? "hover:text-red-300 hover:bg-red-500/15 hover:border-red-500/30"
                      : "hover:text-cyan-300 hover:bg-cyan-500/15 hover:border-cyan-500/30"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Let's Talk CTA */}
            <div className="pt-4 mt-2 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gradient-primary w-full py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
