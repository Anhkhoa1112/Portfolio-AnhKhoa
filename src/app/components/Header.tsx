"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => scrollToSection("home")}
            className="text-red-500 text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            Anh Khoa
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white/80 hover:text-red-500 transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            <Link
              href="/cv"
              target="_blank"
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              View CV
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white hover:text-red-500 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-white/80 hover:text-red-500 transition-colors duration-200 py-2"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
