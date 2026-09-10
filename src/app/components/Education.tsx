"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const certifications = [
  "Chứng chỉ Tin học cơ bản",
  "Hoàn thành khóa ASP.NET Core",
  "Git & GitHub Fundamentals",
  "SQL Server Database Design",
];

export function Education() {
  return (
    <section id="education" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-red-500">Education</span> & Learning
          </h2>

          <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Hành trình học tập và phát triển kỹ năng công nghệ.
          </p>

          {/* Education Card */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row gap-8"
            >
              <div className="lg:w-1/2">
                <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-red-500 text-white font-medium">
                      Đang theo học
                    </span>
                    <span className="text-gray-400">2022 – 2026</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Kỹ sư Công nghệ Thông tin
                  </h3>

                  <p className="text-red-500 mb-4 font-medium">
                    Đại học Công nghệ TP.HCM (HUTECH)
                  </p>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Được đào tạo các kiến thức nền tảng về lập trình, cơ sở dữ liệu,
                    cấu trúc dữ liệu và phát triển phần mềm. Trong quá trình học đã
                    thực hiện nhiều đồ án liên quan đến phát triển web và hệ thống backend.
                  </p>

                  <div>
                    <h4 className="text-white mb-3 font-medium">Môn học chính:</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Lập trình C#",
                        "Cơ sở dữ liệu",
                        "Cấu trúc dữ liệu & Giải thuật",
                        "Phát triển Web",
                        "Công nghệ phần mềm",
                      ].map((course) => (
                        <span
                          key={course}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-red-500/20 to-transparent rounded-full flex items-center justify-center">
                  <GraduationCap className="w-24 h-24 text-red-500" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold mb-8">
              <span className="text-red-500">Certifications</span> & Achievements
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center gap-3"
                >
                  <Award className="w-5 h-5 text-red-500 shrink-0" />
                  <p className="text-gray-300 text-sm text-left">{cert}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
