"use client";

import { motion } from "framer-motion";

const hobbies = [
  {
    title: "Chơi Cầu lông",
    description:
      "Thường xuyên chơi cầu lông để rèn luyện sức khỏe và tăng khả năng phản xạ, giúp giữ tinh thần năng động.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.3 2c-.4.2-.8.5-1.1.8L8.5 5.5c-.9.9-1.2 2.2-.8 3.4l-5.1 5.1c-.4.4-.4 1 0 1.4l2 2c.4.4 1 .4 1.4 0l5.1-5.1c1.2.4 2.5.1 3.4-.8l2.7-2.7c1.2-1.2 1.2-3.1 0-4.2l-1.4-1.4 3.5-3.5-1.4-1.4-3.5 3.5-1.4-1.4c-.2-.2-.4-.3-.6-.3z" />
      </svg>
    ),
  },
  {
    title: "Tìm hiểu Công nghệ",
    description:
      "Thích tìm hiểu các công nghệ mới liên quan đến lập trình backend và phát triển phần mềm.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
      </svg>
    ),
  },
];

export function Hobbies() {
  return (
    <section id="hobbies" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            My <span className="text-red-500">Hobbies</span>
          </h2>

          <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Ngoài lập trình, đây là những hoạt động giúp mình giữ cân bằng và cảm hứng.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gray-900 p-8 rounded-lg hover:bg-gray-800 transition-colors duration-300 h-full">
                  <div className="text-red-500 mb-5 group-hover:scale-110 transition-transform duration-300">
                    {hobby.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {hobby.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {hobby.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fun fact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-red-500">
                Fun Fact
              </h3>
              <p className="text-lg text-gray-300">
                Mình tin rằng việc chơi cầu lông giúp luyện phản xạ rất tốt —
                kỹ năng này cũng áp dụng được khi debug code! 🏸💻
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
