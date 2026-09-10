"use client";

import { motion } from "framer-motion";
import {
  ServerCog,
  Database,
  Globe,
  GitBranch,
  Container,
  Code2,
  Layers,
  Terminal,
} from "lucide-react";

const skills = [
  {
    label: "C# / .NET",
    description: "Xây dựng backend API với ASP.NET Core, áp dụng Clean Architecture và các design patterns.",
    Icon: ServerCog,
  },
  {
    label: "ASP.NET Core",
    description: "Phát triển RESTful API, Authentication/Authorization, Entity Framework Core.",
    Icon: Layers,
  },
  {
    label: "SQL Server",
    description: "Thiết kế CSDL, viết stored procedures, tối ưu truy vấn phức tạp.",
    Icon: Database,
  },
  {
    label: "Entity Framework",
    description: "ORM cho .NET, Code-First migrations, LINQ queries, quan hệ dữ liệu.",
    Icon: Code2,
  },
  {
    label: "HTML / CSS / JS",
    description: "Nền tảng web frontend, responsive design, tương tác DOM cơ bản.",
    Icon: Globe,
  },
  {
    label: "React / Next.js",
    description: "Xây dựng giao diện SPA, component-based architecture, server-side rendering.",
    Icon: Terminal,
  },
  {
    label: "Git / GitHub",
    description: "Quản lý mã nguồn, branching strategy, pull requests và code review.",
    Icon: GitBranch,
  },
  {
    label: "Docker",
    description: "Containerization ứng dụng, docker-compose cho môi trường dev local.",
    Icon: Container,
  },
];

const inverted = new Set([1, 3, 5, 6]);

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-red-500">Skills</span> & Technologies
          </h2>

          <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Các công nghệ và kỹ năng mà mình đã học và áp dụng qua các đồ án.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {skills.map(({ label, description, Icon }, idx) => {
              const isInv = inverted.has(idx);
              return (
                <motion.article
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className={`group relative aspect-square border border-white/20 flex flex-col items-center justify-center p-4 transition-all duration-300 overflow-hidden cursor-pointer ${
                    isInv
                      ? "bg-red-500/10 hover:bg-red-500 hover:text-white"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  {/* Default: Icon + Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
                    <Icon className="h-10 w-10 text-red-500 group-hover:text-white" />
                    <p className="text-sm font-bold tracking-tight text-center uppercase">
                      {label}
                    </p>
                  </div>

                  {/* Hover: Description */}
                  <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <h3 className="text-xs font-black uppercase mb-2 opacity-50">
                      {label}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium leading-tight">
                      {description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
