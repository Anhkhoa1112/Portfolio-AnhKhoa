"use client";

import React, { useState } from "react";
import { Mail, Github, Linkedin, ArrowUpRight, Copy, Check, FileDown } from "lucide-react";
import { portfolioData } from "@/lib/data";

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { contact, personal } = portfolioData;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative border-t border-white/5">
      {/* Radiant Cyan & Violet Glow in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-[radial-gradient(circle,rgba(108,99,255,0.22)_0%,rgba(0,229,255,0.15)_40%,transparent_70%)] blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Large CTA Panel */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0a0f24] to-[#050816] border border-white/10 p-8 sm:p-14 lg:p-16 text-center shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Subtle top border highlight */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e1635] border border-cyan-500/30 mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-widest text-cyan-300 uppercase">
              {contact.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Let's Build Something <span className="gradient-text">Extraordinary</span> Together.
          </h2>

          {/* Description */}
          <p className="mt-5 text-base sm:text-lg text-slate-200 max-w-xl mx-auto leading-relaxed font-normal">
            {contact.description}
          </p>

          {/* Quick email display with copy */}
          <div className="mt-8 inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
            <span className="text-xs sm:text-sm font-mono text-cyan-300">{contact.email}</span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Copy email address"
              title="Copy email"
            >
              {copied ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Action Buttons: Email Me, GitHub, LinkedIn */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {/* Email Me Button */}
            <a
              href={`mailto:${contact.email}`}
              className="btn-gradient-primary px-7 py-3.5 rounded-xl text-white font-bold text-sm sm:text-base flex items-center gap-2 active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Email Me Directly</span>
            </a>

            {/* Download CV */}
            <a
              href={contact.cvUrl}
              download="NguyenHoangAnhKhoa_CV.pdf"
              className="btn-glass px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base flex items-center gap-2 active:scale-95 shadow-md"
            >
              <FileDown className="w-4 h-4 text-cyan-400" />
              <span>Download CV (PDF)</span>
            </a>

            {/* GitHub */}
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="btn-glass px-5 py-3.5 rounded-xl font-medium text-sm sm:text-base flex items-center gap-2 active:scale-95"
            >
              <Github className="w-4 h-4 text-slate-300" />
              <span>GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-glass px-5 py-3.5 rounded-xl font-medium text-sm sm:text-base flex items-center gap-2 active:scale-95"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Availability Status */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-medium">{personal.status}</span>
            </span>
            <span>•</span>
            <span>Ho Chi Minh City, Vietnam (GMT+7)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
