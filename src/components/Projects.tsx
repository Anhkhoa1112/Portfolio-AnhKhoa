"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  Github,
  ExternalLink,
  Eye,
  X,
  Layers,
  Wrench,
  AlertCircle,
  CheckCircle2,
  UserCheck,
} from "lucide-react";
import { portfolioData, Project } from "@/lib/data";

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects } = portfolioData;

  const triggerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenModal = (project: Project, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    // Restore focus to the triggering element
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  };

  // Keyboard navigation & accessibility for the modal: Escape to close and Tab focus trap
  useEffect(() => {
    if (!selectedProject) return;

    // Focus close button initially
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseModal();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

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
                    onClick={(e) => handleOpenModal(project, e)}
                    className="btn-gradient-primary px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-lg"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Case Study</span>
                  </button>

                  {/* Only render Live Demo button if a distinct demo URL exists */}
                  {project.demoUrl && project.demoUrl !== project.githubUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl bg-white/10 text-white font-medium text-xs flex items-center gap-1.5 hover:bg-white/20 transition-colors border border-white/20"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
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

      {/* Case Study Modal Dialog with Strict Accessibility (Escape, Focus-Trap, ARIA) */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#0a0f24] border border-white/15 p-6 sm:p-8 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Eyebrow & Role Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-2 pr-12">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  CASE STUDY // {selectedProject.id.toUpperCase()}
                </span>
                {selectedProject.caseStudy?.role && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                    <UserCheck className="w-3 h-3" />
                    <span>{selectedProject.caseStudy.role}</span>
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {selectedProject.title}
              </h3>
              <p className="mt-1 text-sm font-mono text-cyan-400">{selectedProject.subtitle}</p>

              {/* Media Visual: Screenshot or Dedicated Architecture Diagram */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden my-6 border border-white/10 bg-slate-950">
                <Image
                  src={selectedProject.detailImage || selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Structured Engineering Sections */}
              <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
                {/* 1. Overview */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-2 flex items-center gap-1.5">
                    <FolderGit2 className="w-4 h-4 text-cyan-400" />
                    <span>System Overview</span>
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedProject.caseStudy?.overview || selectedProject.description}
                  </p>
                </div>

                {/* 2. Key Architecture & Engineering Decisions */}
                {selectedProject.caseStudy?.architecture && selectedProject.caseStudy.architecture.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold mb-2.5 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span>Architecture &amp; Key Engineering Decisions</span>
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-normal">
                      {selectedProject.caseStudy.architecture.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-mono mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 3. Main Contributions */}
                {selectedProject.caseStudy?.contributions && selectedProject.caseStudy.contributions.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold mb-2.5 flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-cyan-400" />
                      <span>Key Technical Contributions</span>
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-normal">
                      {selectedProject.caseStudy.contributions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 4. Challenges & Results */}
                {selectedProject.caseStudy && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-1.5 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                        <span>Core Engineering Challenge</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {selectedProject.caseStudy.challenges}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Validated Outcomes</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {selectedProject.caseStudy.results}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Technologies & Protocols */}
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
                {selectedProject.demoUrl && selectedProject.demoUrl !== selectedProject.githubUrl && (
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
                  className="btn-gradient-primary px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 shadow-lg"
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
