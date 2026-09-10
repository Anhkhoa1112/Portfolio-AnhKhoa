"use client";

import { Mail, Phone, MapPin, Calendar, Github, Globe } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";
import { dictionaries } from "@/dictionaries";

export default function CVPage() {
  const { language, toggleLanguage } = useLanguage();
  const cv = dictionaries[language].cv;

  return (
    <div className="min-h-screen bg-[#525659] py-10 px-0 flex justify-center print:bg-white print:p-0 print:m-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&display=swap');
        
        .cv-page, .cv-page * {
          font-family: 'Montserrat', sans-serif !important;
          -webkit-font-smoothing: antialiased;
        }
        
        @page { 
          size: A4;
          margin: 0;
        }

        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print { display: none !important; }

          .cv-bg {
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }

          .cv-outer {
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            width: 210mm !important;
            max-width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            background: white !important;
          }

          .cv-container {
            padding: 12mm 15mm !important;
            height: 297mm !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

      <div className="cv-bg min-h-screen bg-[#525659] py-10 px-0 flex justify-center print:bg-white print:p-0 print:m-0">
        <div className="cv-outer w-full max-w-[210mm] bg-white shadow-2xl text-black">
          <div className="cv-container cv-page p-[12mm_15mm]" id="cv-content">
            
            {/* HEADER SECTION */}
            <header className="text-center mb-3">
              <h1 className="text-[32px] font-[900] uppercase tracking-tighter leading-none mb-1 text-black">
                {cv.name}
              </h1>
              
              <div className="flex justify-center mb-3">
                {/* No black background in template, just bold text */}
                <span className="text-[12px] font-[800] uppercase tracking-[0.1em] text-black">
                  {cv.role}
                </span>
              </div>

              {/* Icons are thin, text is small, no bullets */}
              <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-1 text-[9px] font-[600] mb-3 text-black">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" strokeWidth={1.5} /> {cv.contact.dob}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3" strokeWidth={1.5} /> {cv.contact.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3" strokeWidth={1.5} /> {cv.contact.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" strokeWidth={1.5} /> {cv.contact.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Github className="w-3 h-3" strokeWidth={1.5} /> {cv.contact.github}
                </span>
              </div>

              {/* Not italic, plain centered text */}
              <p className="max-w-[650px] mx-auto text-[9.5px] font-[500] leading-[1.6] text-center text-black">
                {cv.summary}
              </p>
            </header>

            {/* VERY thick line separating header from body */}
            <div className="border-t-[3px] border-black my-3"></div>

            {/* CAREER OBJECTIVES */}
            <section className="mb-4">
              <h2 className="text-[13px] font-[900] uppercase tracking-tight mb-2 border-b-[2px] border-black pb-0.5 text-black">
                {cv.careerObjectives.title}
              </h2>
              <div className="space-y-1">
                <p className="text-[9.5px] leading-[1.5] text-black font-[500]">
                  <span className="font-[800]">{cv.careerObjectives.shortTerm.label}:</span>{" "}
                  {cv.careerObjectives.shortTerm.text}
                </p>
                <p className="text-[9.5px] leading-[1.5] text-black font-[500]">
                  <span className="font-[800]">{cv.careerObjectives.longTerm.label}:</span>{" "}
                  {cv.careerObjectives.longTerm.text}
                </p>
              </div>
            </section>

            {/* EDUCATION & SKILLS - TWO COLUMNS */}
            <div className="grid grid-cols-[55%_45%] gap-x-8 mb-4">
              {/* EDUCATION */}
              <section>
                <h2 className="text-[13px] font-[900] uppercase tracking-tight mb-2 border-b-[2px] border-black pb-0.5 text-black">
                  {cv.education.title}
                </h2>
                <div>
                  <h3 className="text-[10px] font-[800] uppercase leading-tight mb-1">
                    {cv.education.degree}
                  </h3>
                  <p className="text-[9.5px] font-[500] text-black mb-1.5">
                    {cv.education.uni}
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-[500] text-black">
                      {cv.education.period}
                    </span>
                    {/* Square black badge */}
                    <span className="bg-black text-white text-[9px] font-[800] px-2 py-[2px] rounded-none">
                      GPA: {cv.education.gpa}
                    </span>
                  </div>
                  <ul className="text-[9px] font-[500] space-y-[2px] ml-3.5 list-disc text-black">
                    {cv.education.achievements.map((item, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: item }}></li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* SKILLS */}
              <section>
                <h2 className="text-[13px] font-[900] uppercase tracking-tight mb-2 border-b-[2px] border-black pb-0.5 text-black">
                  {cv.skills.title}
                </h2>
                <div className="space-y-2">
                  {cv.skills.categories.map((cat, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <p className="text-[8px] font-[700] uppercase tracking-wider text-black">
                        {cat.label}
                      </p>
                      <div className="flex flex-wrap gap-x-1.5 gap-y-1.5">
                        {cat.items.map((skill) => (
                          <span
                            key={skill}
                            className={`text-[8px] font-[700] px-1.5 py-[2px] rounded-none uppercase ${
                              cat.style === "filled"
                                ? "bg-black text-white border-[1px] border-black"
                                : "bg-white text-black border-[1px] border-black"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* EXPERIENCE & PROJECTS */}
            <section>
              <h2 className="text-[13px] font-[900] uppercase tracking-tight mb-1 border-b-[2px] border-black pb-0.5 text-black">
                {cv.projects.title}
              </h2>
              
              {/* FIELDSET BOX FOR FEATURED PROJECTS */}
              <fieldset className="border-[1.5px] border-black px-4 pb-3 pt-0 mt-2">
                <legend className="text-[11px] font-[900] uppercase tracking-wider px-2 ml-1 text-black">
                  FEATURED PROJECTS
                </legend>

                {/* Projects List */}
                <div className="space-y-3.5 mt-1">
                  {/* Period indicator */}
                  <p className="text-[9px] font-[700] text-black">
                    {cv.projects.period}
                  </p>

                  {cv.projects.items.map((project, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="mb-1.5">
                        <h4 className="text-[10px] font-[900] uppercase mb-0.5 leading-tight text-black">
                          {project.name}
                        </h4>
                        {/* Technologies line without italic, with standard black color */}
                        <p className="text-[8.5px] font-[600] text-black">
                          {project.tech}
                        </p>
                      </div>

                      <ul className="text-[9px] font-[500] space-y-[3px] ml-3.5 list-disc leading-[1.5] text-black marker:text-black">
                        {project.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </fieldset>
            </section>

            {/* PRINT CONTROLS */}
            <div className="mt-8 flex justify-center gap-4 no-print pb-8">
              <button
                onClick={toggleLanguage}
                className="px-6 py-3 border-2 border-black font-black text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                {language === "en" ? "Vietnamese" : "Tiếng Anh"}
              </button>
              <button
                onClick={() => window.print()}
                className="px-8 py-3 bg-black text-white font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all"
              >
                {cv.footer.export}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
