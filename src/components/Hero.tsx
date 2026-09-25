"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, RotateCw, FileDown, Github, Linkedin, Terminal, Mail } from "lucide-react";
import { portfolioData } from "@/lib/data";
import { DeveloperCard3D } from "./DeveloperCard3D";

export const Hero: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { hero, personal, contact } = portfolioData;

  const handleFlipCard = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-20 pb-12 lg:pt-24 lg:pb-16 flex flex-col justify-center overflow-x-clip bg-[#050816]"
    >
      {/* 1. Deep Midnight Base */}
      <div className="absolute inset-0 bg-[#050816] pointer-events-none -z-30" />

      {/* 2. Full-bleed Luminous Royal / Cosmic Blue Gradient across the WHOLE Hero Page (Exact Davin Aesthetic) */}
      <div className="hero-bg-cosmic absolute inset-0 bg-[radial-gradient(ellipse_110%_85%_at_50%_52%,rgba(28,52,128,0.85)_0%,rgba(16,30,80,0.7)_45%,rgba(7,14,40,0.95)_75%,#050816_100%)] pointer-events-none -z-20" />

      {/* 3. Lower-screen Glowing Atmosphere extending across bottom half */}
      <div className="hero-bg-glow-bottom absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] h-[65vh] bg-[radial-gradient(ellipse_85%_60%_at_50%_85%,rgba(24,50,135,0.7)_0%,rgba(14,28,85,0.4)_50%,transparent_80%)] blur-3xl pointer-events-none -z-20" />

      {/* 4. Left-side Tech Cyan / Indigo Ambient Light under Typography */}
      <div className="hero-bg-glow-left absolute top-1/4 left-0 w-[45rem] h-[40rem] bg-[radial-gradient(ellipse_75%_65%_at_25%_40%,rgba(20,56,155,0.52)_0%,rgba(0,180,255,0.14)_45%,transparent_75%)] blur-3xl pointer-events-none -z-20" />

      {/* 5. Subtle Tech Grid Mesh */}
      <div className="absolute inset-0 bg-grid-mesh opacity-30 pointer-events-none -z-10" />

      <div className="w-full min-h-screen flex flex-col justify-center relative z-10 px-4 sm:px-6 lg:px-12 py-12 lg:py-0 overflow-visible">
        {/* Main 2-Column Full-Width Grid: Left Typography (z-20) & Right 3D Card (z-10) */}
        <div className="relative flex flex-col lg:grid lg:grid-cols-2 min-h-screen items-center gap-6 lg:gap-8 overflow-visible w-full">
          {/* ================= LEFT COLUMN: Typography & CTAs (order-1 on mobile & desktop) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left pt-20 sm:pt-24 lg:pt-0 px-2 sm:px-4 lg:pl-10 xl:pl-16 order-1 lg:order-1 relative z-20 w-full pointer-events-auto"
          >
            <div className="w-full max-w-xl">
              {/* Technical Eyebrow / Welcome Tag */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0a1638]/85 border border-cyan-500/30 w-fit mb-5 shadow-[0_0_20px_rgba(0,180,255,0.25)] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
                  WELCOME TO MY PORTFOLIO
                </span>
              </div>

              {/* Main Headline with Radiant Gradient Text */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Hi, I'm{" "}
                <span className="gradient-text font-black">
                  Bi Nè
                </span>{" "}
                <span className="text-2xl sm:text-3xl font-bold text-slate-300 font-sans block mt-1.5">
                  (Nguyễn Hoàng Anh Khoa)
                </span>
              </h1>

              {/* Role in Electric Cyan */}
              <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-lg sm:text-xl font-bold font-mono text-[#00E5FF] drop-shadow-[0_0_20px_rgba(0,229,255,0.35)]">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span>Software Developer &amp; Systems Architect</span>
              </div>

              {/* Subtitle Bio - Unified Professional English */}
              <p className="mt-5 text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
                Software Engineering student at <strong className="text-cyan-300 font-semibold">HUTECH University</strong> focusing on high-performance backend systems across the <span className="text-cyan-400 font-semibold">.NET</span>, <span className="text-cyan-400 font-semibold">Spring Boot</span>, and <span className="text-cyan-400 font-semibold">Node.js</span> ecosystems. Experienced in architecting resilient REST APIs, robust database models (SQL &amp; Neo4j), and scalable distributed services.
              </p>

              {/* Primary Action CTAs: Download CV & Contact Me */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <a
                  href={contact.cvUrl}
                  download="NguyenHoangAnhKhoa_CV.pdf"
                  className="btn-gradient-primary px-6 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 active:scale-95 shadow-lg"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download CV</span>
                </a>

                <a
                  href="#contact"
                  className="btn-glass px-5 py-3 rounded-xl text-sm sm:text-base font-semibold flex items-center gap-2 active:scale-95 hover:border-cyan-400"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Contact Me</span>
                </a>
              </div>

              {/* Secondary Actions: Social Links, Flip Toggle & Location */}
              <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass px-3.5 py-2 rounded-lg font-medium text-xs sm:text-sm flex items-center gap-1.5 active:scale-95 text-slate-300 hover:text-white"
                  title="GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass px-3.5 py-2 rounded-lg font-medium text-xs sm:text-sm flex items-center gap-1.5 active:scale-95 text-slate-300 hover:text-white"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>

                <button
                  type="button"
                  onClick={handleFlipCard}
                  className="btn-glass px-3.5 py-2 rounded-lg font-mono text-xs flex items-center gap-1.5 active:scale-95 text-cyan-400/90 hover:text-cyan-300 border-cyan-500/20"
                  aria-label="Flip Developer ID Card"
                  title="Flip 3D Card"
                >
                  <RotateCw className="w-3 h-3 text-cyan-400" />
                  <span>Flip 3D Card</span>
                </button>

                <span className="text-slate-500 text-xs font-mono hidden sm:inline">•</span>
                <span className="text-slate-400 text-xs font-mono font-medium">Ho Chi Minh City, Vietnam</span>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: Medium 3D ID Card (order-2 on mobile & desktop) ================= */}
          <div className="flex justify-center items-center h-full min-h-[520px] sm:min-h-[580px] lg:min-h-screen w-full order-2 lg:order-2 overflow-visible relative z-10 pointer-events-none">
            <div className="relative z-0 flex h-[100vh] w-full items-center justify-center sm:h-[520px] md:h-[580px] lg:h-[640px] lg:w-[180vw] xl:h-[700px] lg:-ml-[360px] xl:-ml-[420px] overflow-visible pointer-events-auto">
              {/* Davin multi-color ambient aura behind card */}
              <div
                aria-hidden="true"
                className="hero-card-aura absolute inset-8 -z-10 rounded-[3rem] bg-[linear-gradient(135deg,rgba(108,99,255,0.35),rgba(0,229,255,0.25),rgba(255,77,157,0.18))] blur-3xl pointer-events-none"
              />
              <DeveloperCard3D
                isFlipped={isFlipped}
                onFlip={handleFlipCard}
              />
            </div>
          </div>
        </div>

        {/* Hero Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-10 lg:mt-14 pt-8 border-t border-cyan-500/20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 bg-gradient-to-r from-transparent via-[#0a1638]/70 to-transparent rounded-2xl p-4 backdrop-blur-md relative z-30"
        >
          {hero.metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center sm:items-start text-center sm:text-left px-4"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#6c63ff] to-[#00e5ff]">
                  {metric.value}
                </span>
              </div>
              <span className="mt-1 text-xs font-mono uppercase tracking-wider text-slate-300">
                {metric.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll Down Indicator - Placed naturally below metrics to prevent overlap on smaller heights */}
        <div className="mt-8 mb-2 flex justify-center relative z-30">
          <a
            href="#about"
            className="p-2.5 rounded-full border border-white/10 bg-[#0a1638]/70 backdrop-blur-sm text-slate-300 hover:text-white hover:border-cyan-400 transition-all active:scale-95 shadow-md"
            aria-label="Scroll down to About section"
          >
            <ArrowDown className="w-4 h-4 text-cyan-300 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
