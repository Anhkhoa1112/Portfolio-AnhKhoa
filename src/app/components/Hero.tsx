"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background decorative dots */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-2 h-2 bg-red-500 rounded-full" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-red-500 rounded-full" />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-red-500 rounded-full" />
        <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-red-500 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-red-500 rounded-full" />
      </div>

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Hello, I&apos;m </span>
            <span className="text-red-500">Anh Khoa</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            Backend Developer — .NET / ASP.NET Core
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Sinh viên năm 4 chuyên ngành Công nghệ phần mềm tại HUTECH.
            Đam mê xây dựng các hệ thống backend mạnh mẽ và có khả năng mở rộng.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-sm font-medium"
            >
              Tìm Hiểu Thêm
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 border border-red-500 hover:bg-red-500 transition-colors duration-200 rounded-sm font-medium"
            >
              Liên Hệ
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-red-500 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
