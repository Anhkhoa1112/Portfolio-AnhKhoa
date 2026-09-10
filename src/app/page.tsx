import { Navbar } from "@/src/components/Navbar";
import { Hero } from "@/src/components/Hero";
import { About } from "@/src/components/About";
import { Skills } from "@/src/components/Skills";
import { Projects } from "@/src/components/Projects";
import { Experience } from "@/src/components/Experience";
import { Contact } from "@/src/components/Contact";
import { Footer } from "@/src/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent text-[#f1f5f9] selection:bg-cyan-500/30 selection:text-white">
      {/* Floating Rounded Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex flex-col">
        {/* HERO + 3D ID CARD */}
        <Hero />

        {/* ABOUT */}
        <About />

        {/* SKILLS */}
        <Skills />

        {/* PROJECTS */}
        <Projects />

        {/* EXPERIENCE */}
        <Experience />

        {/* CONTACT */}
        <Contact />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
