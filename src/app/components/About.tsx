"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Code, Briefcase } from "lucide-react";

const infoItems = [
  { icon: MapPin, label: "Vị trí", value: "Nha Trang, Khánh Hòa" },
  { icon: Clock, label: "Kinh nghiệm", value: "< 1 năm (Đồ án)" },
  { icon: Code, label: "Chuyên môn", value: "Backend .NET" },
  { icon: Briefcase, label: "Trạng thái", value: "Sẵn sàng thực tập" },
];

export function About() {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="text-red-500">About</span> Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Là sinh viên năm 4 ngành Công nghệ Thông tin tại Đại học Công nghệ TP.HCM (HUTECH),
                mình đam mê xây dựng các hệ thống backend vững chắc, có khả năng mở rộng.
                Với nền tảng về C# và ASP.NET Core, mình luôn tìm tòi cách áp dụng clean code
                và các design patterns vào dự án thực tế.
              </p>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Trong quá trình học tại HUTECH, mình đã thực hiện nhiều đồ án liên quan đến
                phát triển web và hệ thống backend. Mình tin rằng công nghệ có sức mạnh
                biến đổi ý tưởng thành hiện thực và tạo ra những giá trị ý nghĩa.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {infoItems.map((item) => (
                  <div key={item.label} className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="w-4 h-4 text-red-500" />
                      <h3 className="text-red-500 font-medium text-sm">
                        {item.label}
                      </h3>
                    </div>
                    <p className="text-gray-300">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-red-500/20 to-transparent rounded-lg flex items-center justify-center">
                <div className="w-64 h-64 bg-red-500/10 rounded-full flex items-center justify-center border-2 border-red-500/30">
                  <Code className="w-24 h-24 text-red-500" />
                </div>
              </div>
              {/* Decorative */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-red-500 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-500 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
