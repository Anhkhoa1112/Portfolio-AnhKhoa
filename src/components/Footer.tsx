"use client";

import React from "react";
import { portfolioData } from "@/lib/data";

export const Footer: React.FC = () => {
  const { personal, contact } = portfolioData;

  return (
    <footer className="border-t border-white/5 bg-[#05060a] py-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
          {/* LEFT: Identity */}
          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-bold text-white tracking-tight">{personal.name}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400 uppercase">{personal.role}</span>
          </div>

          {/* CENTER: Copyright */}
          <div className="text-slate-400">
            © 2026 {personal.name}. All rights reserved.
          </div>

          {/* RIGHT: Social links */}
          <div className="flex items-center gap-6 text-slate-400">
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-cyan-400 transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        {/* Very subtle decorative technical metadata info */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>ARCHITECTURE // NEXT.JS 16 • REACT 19 • TAILWIND CSS • FRAMER MOTION</span>
          </div>
          <div>
            <span>SYSTEM // LATENCY &lt; 20MS • PRODUCTION DEPLOYMENT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
