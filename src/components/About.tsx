"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Copy, Check, FileCode, Layers, Database, Box } from "lucide-react";
import { portfolioData } from "@/lib/data";

export const About: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { about } = portfolioData;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(about.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-24 sm:py-32 relative border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[30rem] h-[30rem] bg-[radial-gradient(circle,rgba(108,99,255,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Label */}
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase">
            {about.eyebrow}
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
          Architecting <span className="gradient-text">Scalable &amp; Resilient</span> Backend Systems.
        </h2>

        {/* Two-column Layout: Bio & Technical Code Visual */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: Personal Introduction & Feature Cards */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-base leading-relaxed font-normal">
            <p className="text-slate-300">
              Hi, I'm <strong className="text-white font-semibold">Anh Khoa</strong> — a Backend Engineer focused on architecting reliable REST APIs, optimizing core business workflows, and engineering highly scalable backend services.
            </p>

            <p className="text-slate-300">
              My core strengths center around the <span className="text-cyan-400 font-semibold">.NET</span> ecosystem, <span className="text-cyan-400 font-semibold">Spring Boot</span>, and <span className="text-cyan-400 font-semibold">Node.js</span>. I bring extensive production experience in database modeling (SQL &amp; MongoDB), fine-grained authorization (RBAC), low-latency Redis caching layers, and cross-system integrations.
            </p>

            <p className="text-slate-300">
              I place high priority on Clean Architecture, security-by-design, and effortless scalability. I firmly believe disciplined systems thinking paired with maintainable code is the cornerstone of software that thrives under demanding enterprise workloads.
            </p>

            {/* 3 Architecture Pillar Cards */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="p-4 rounded-xl bg-[#0a0f24]/80 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3 text-cyan-400">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                  Clean Architecture &amp; Domain Separation
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Isolating business logic from infrastructure with ironclad boundaries and high test coverage.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl bg-[#0a0f24]/80 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3 text-cyan-400">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                  Fault-Tolerant DB &amp; Cache-First Strategy
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Defensive schema modeling, atomic transactions, and sub-millisecond distributed caching.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-xl bg-[#0a0f24]/80 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3 text-cyan-400">
                  <Box className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                  Automated Software Delivery
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Deterministic deployments using containerized Docker images and automated CI/CD pipelines.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Sophisticated Developer Workspace / Code Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl glass-card border border-white/10 shadow-2xl overflow-hidden">
              {/* Window Title Bar */}
              <div className="bg-[#0e1430] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="ml-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{about.codeSnippet.filename}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors p-1"
                  aria-label="Copy developer profile code snippet"
                  title="Copy snippet"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-cyan-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Content Body with Syntax Highlighting Look */}
              <pre className="p-6 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-slate-200 selection:bg-cyan-500/30">
                <code>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-cyan-400">developer</span> = &#123;{"\n"}
                  {"  "}name: <span className="text-emerald-400">"Nguyễn Hoàng Anh Khoa"</span>,{"\n"}
                  {"  "}role: <span className="text-emerald-400">"Backend Developer"</span>,{"\n\n"}
                  {"  "}stack: [
                  <span className="text-emerald-400">".NET"</span>,{" "}
                  <span className="text-emerald-400">"Spring Boot"</span>,{" "}
                  <span className="text-emerald-400">"Node.js"</span>
                  ],{"\n\n"}
                  {"  "}architecture: [
                  <span className="text-emerald-400">"REST API"</span>,{" "}
                  <span className="text-emerald-400">"RBAC"</span>,{" "}
                  <span className="text-emerald-400">"Workflow"</span>,{" "}
                  <span className="text-emerald-400">"Caching"</span>
                  ],{"\n\n"}
                  {"  "}database: [
                  <span className="text-emerald-400">"SQL Server"</span>,{" "}
                  <span className="text-emerald-400">"MySQL"</span>,{" "}
                  <span className="text-emerald-400">"MongoDB"</span>,{" "}
                  <span className="text-emerald-400">"Redis"</span>
                  ],{"\n\n"}
                  {"  "}devops: [
                  <span className="text-emerald-400">"Docker"</span>,{" "}
                  <span className="text-emerald-400">"GitHub Actions"</span>
                  ]{"\n"}
                  &#125;;
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
