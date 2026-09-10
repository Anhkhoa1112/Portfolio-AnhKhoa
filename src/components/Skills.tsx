"use client";

import React from "react";
import { Layout, Server, Database, Terminal, Wrench } from "lucide-react";
import { portfolioData } from "@/lib/data";

const iconMap = {
  Layout: Layout,
  Server: Server,
  Database: Database,
  Terminal: Terminal,
};

export const Skills: React.FC = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-24 sm:py-32 relative border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-[32rem] h-[32rem] bg-[radial-gradient(circle,rgba(0,229,255,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 mb-3">
          <Wrench className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase">
            {skills.eyebrow}
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
          Technical <span className="gradient-text">Mastery &amp; Stack</span>
        </h2>

        {/* 2x2 Grid on Desktop */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skills.categories.map((category) => {
            const IconComponent = iconMap[category.iconName as keyof typeof iconMap] || Terminal;

            return (
              <div
                key={category.id}
                className="group relative p-8 rounded-2xl glass-card border border-white/8 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,229,255,0.18)] flex flex-col justify-between"
              >
                {/* Subtle Ambient Hover Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/8 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-colors pointer-events-none" />

                <div>
                  {/* Top Bar: Icon + Category Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0e1635] border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/60 transition-all shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400/70 uppercase tracking-widest font-semibold">
                      SYSTEM // 0{category.id === "frontend" ? "1" : category.id === "backend" ? "2" : category.id === "data-cloud" ? "3" : "4"}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                    {category.description}
                  </p>
                </div>

                {/* Technology Tags */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200 group-hover:border-cyan-500/30 group-hover:text-cyan-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
