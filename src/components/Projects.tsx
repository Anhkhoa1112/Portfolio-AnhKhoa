"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, Github, ExternalLink, Eye, X, CheckCircle2 } from "lucide-react";
import { portfolioData, Project } from "@/lib/data";

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-24 sm:py-32 relative border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/3 w-[36rem] h-[36rem] bg-[radial-gradient(circle,rgba(108,99,255,0.16)_0%,transparent_70%)] blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 mb-3">
          <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase">
            {projects.eyebrow}
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
          Featured <span className="gradient-text">Engineering Projects</span>
        </h2>

        {/* Project Grid: 2 cols Desktop & Tablet, 1 col Mobile */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.items.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl glass-card border border-white/8 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
            >
              {/* Image Container with Hover Scale & Overlay Actions */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f24] via-transparent to-transparent opacity-85" />

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#050816]/85 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-semibold tracking-wider uppercase shadow-md">
                      FEATURED SYSTEM
                    </span>
                  </div>
                )}

                {/* Overlay Action Buttons on Hover */}
                <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="btn-gradient-primary px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-lg"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Case Study</span>
                  </button>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl bg-white/10 text-white font-medium text-xs flex items-center gap-1.5 hover:bg-white/20 transition-colors border border-white/20"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Demo</span>
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-white/10 text-white font-medium text-xs flex items-center gap-1.5 hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                      PROJECT // {project.id.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed line-clamp-3 font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-2">
                  {project.tags?.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#0a0f24] border border-white/15 p-6 sm:p-8 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  PROJECT SPECIFICATION
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {selectedProject.title}
              </h3>
              <p className="mt-1 text-sm font-mono text-cyan-400">{selectedProject.subtitle}</p>

              {/* Modal Image */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden my-6 border border-white/10 bg-slate-950">
                <Image
                  src={selectedProject.detailImage || selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Full Description */}
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>{selectedProject.description}</p>
              </div>

              {/* Tech Stack */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                  TECHNOLOGIES &amp; PROTOCOLS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags?.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Links */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gradient-primary px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live System</span>
                  </a>
                )}
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Repository</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
