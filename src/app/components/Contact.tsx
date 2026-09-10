"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Mail, Phone, Github } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Anhkhoa1112",
    Icon: Github,
  },
  {
    name: "Email",
    url: "mailto:Hoanganhkhoa160404@gmail.com",
    Icon: Mail,
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Cảm ơn bạn đã liên hệ! Mình sẽ phản hồi sớm nhất có thể.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Get <span className="text-red-500">In Touch</span>
          </h2>

          <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Mình luôn sẵn sàng lắng nghe về cơ hội thực tập, dự án thú vị,
            hoặc đơn giản là một cuộc trò chuyện về công nghệ.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-red-500">
                Kết nối với mình
              </h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Vị trí</p>
                    <p className="text-gray-400">Nha Trang, Khánh Hòa</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-400">Hoanganhkhoa160404@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Điện thoại</p>
                    <p className="text-gray-400">0344 378 620</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <h4 className="text-lg mb-4 text-white font-medium">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-800 hover:bg-red-500 text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                      title={link.name}
                    >
                      <link.Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2 font-medium">
                    Tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none text-white placeholder-gray-500"
                    placeholder="Tên của bạn"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none text-white placeholder-gray-500"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white mb-2 font-medium">
                    Tin nhắn
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none text-white resize-none placeholder-gray-500"
                    placeholder="Hãy cho mình biết về dự án của bạn hoặc đơn giản là chào hỏi!"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300 font-medium"
                >
                  Gửi Tin Nhắn
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2026 Nguyễn Hoàng Anh Khoa. Made with ❤️ and lots of coffee.
          </p>
        </div>
      </footer>
    </section>
  );
}
