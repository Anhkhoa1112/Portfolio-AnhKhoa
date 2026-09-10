"use client";

import React from "react";
import { Briefcase, Calendar, Building2, Award } from "lucide-react";
import { portfolioData } from "@/lib/data";

export const Experience: React.FC = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-24 sm:py-32 relative border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-[32rem] h-[32rem] bg-[radial-gradient(circle,rgba(0,229,255,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase">
            {experience.eyebrow}
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
          Academic &amp; <span className="gradient-text">Professional Journey</span>
        </h2>

        {/* Vertical Timeline */}
        <div className="mt-12 sm:mt-16 relative pl-6 sm:pl-10 border-l border-white/10 space-y-12">
          {experience.items.map((item, index) => {
            const isActive = item.status === "active";

            return (
              <div key={item.id} className="relative group">
                {/* Timeline Node Point with Status Indicator */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-400 border-[#050816] shadow-[0_0_15px_rgba(0,229,255,0.9)] scale-110"
                      : "bg-[#0e1635] border-white/30 group-hover:border-cyan-400"
                  }`}
                />

                {/* Timeline Card */}
                <div className="p-6 sm:p-7 rounded-2xl glass-card border border-white/8 group-hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)]">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                        {item.role}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {item.badge && (
                        <span
                          className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider ${
                            isActive
                              ? "bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 shadow-sm"
                              : "bg-white/5 border border-white/10 text-slate-400"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.period}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-mono text-cyan-300 mb-4">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span>{item.organization}</span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
