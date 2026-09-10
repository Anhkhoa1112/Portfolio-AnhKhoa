"use client";

import { motion } from "framer-motion";

const roles = [
  {
    title: "Backend Developer — Đồ án Phát triển Web (HUTECH)",
    period: "2025 – 2026",
    bullets: [
      "Phát triển hệ thống backend API bằng ASP.NET Core, áp dụng mô hình MVC và Repository Pattern.",
      "Thiết kế cơ sở dữ liệu SQL Server, xây dựng migrations và seed data với Entity Framework Core.",
      "Tích hợp Authentication/Authorization sử dụng JWT token và ASP.NET Identity.",
    ],
  },
  {
    title: "Fullstack Developer — Đồ án Lập trình Ứng dụng Web",
    period: "2024 – 2025",
    bullets: [
      "Xây dựng ứng dụng web full-stack với ASP.NET Core MVC và SQL Server.",
      "Thiết kế giao diện responsive với HTML, CSS, JavaScript và Bootstrap.",
      "Triển khai các tính năng CRUD, quản lý phân quyền người dùng và upload file.",
      "Áp dụng Docker để containerize ứng dụng cho môi trường dev local.",
    ],
  },
  {
    title: "Developer — Các Đồ án Cơ sở",
    period: "2022 – 2024",
    bullets: [
      "Học và thực hành các kiến thức nền tảng: C#, OOP, cấu trúc dữ liệu và giải thuật.",
      "Thực hiện các đồ án nhỏ về quản lý (QLSV, quản lý thư viện) sử dụng Windows Forms và SQL Server.",
      "Làm quen với Git/GitHub cho quản lý mã nguồn và làm việc nhóm.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-red-500">Experience</span> & Projects
          </h2>

          <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Kinh nghiệm thực tế qua các đồ án và dự án tại trường đại học.
          </p>

          <div className="space-y-8">
            {roles.map((role, index) => (
              <motion.article
                key={role.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="border border-white/10 p-6 sm:p-8 rounded-lg hover:border-red-500/30 transition-colors duration-300"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between mb-4">
                  <h3 className="text-lg font-bold tracking-tight text-white">
                    {role.title}
                  </h3>
                  <span className="text-sm text-red-500 font-medium whitespace-nowrap">
                    {role.period}
                  </span>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-300">
                  {role.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
