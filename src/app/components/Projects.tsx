"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Hệ thống Quản lý Thư viện Sách",
    description:
      "Ứng dụng web quản lý mượn/trả sách với ASP.NET Core MVC. Tích hợp hệ thống phân quyền, tìm kiếm nâng cao và báo cáo thống kê.",
    tech: "ASP.NET Core MVC • SQL Server • Entity Framework • Bootstrap",
    href: "https://github.com/Anhkhoa1112",
    icon: Github,
  },
  {
    title: "API Backend E-Learning Platform",
    description:
      "RESTful API cho nền tảng học trực tuyến. Quản lý khóa học, người dùng, tiến độ học tập. Authentication bằng JWT và role-based authorization.",
    tech: "ASP.NET Core Web API • SQL Server • JWT • Docker",
    href: "https://github.com/Anhkhoa1112",
    icon: ExternalLink,
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Featured <span className="text-red-500">Projects</span>
          </h2>

          <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Các dự án tiêu biểu mình đã thực hiện trong quá trình học tập.
          </p>

          <div className="space-y-8">
            {projects.map((p, idx) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-gray-900 border border-white/10 p-6 sm:p-8 rounded-lg hover:border-red-500/30 transition-colors duration-300"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {p.title}
                  </h3>
                  <span className="text-sm text-gray-400">2025 – 2026</span>
                </div>

                <p className="mt-4 text-gray-300 leading-relaxed">
                  {p.description}
                </p>

                <p className="mt-3 text-xs font-medium tracking-tight text-red-500/80">
                  {p.tech}
                </p>

                <div className="mt-6">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200 rounded-sm text-sm font-medium"
                  >
                    <p.icon className="h-4 w-4" />
                    View Source
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
