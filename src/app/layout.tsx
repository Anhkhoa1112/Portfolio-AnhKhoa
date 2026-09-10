import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/src/context/LanguageContext";
import { ThemeProvider } from "@/src/context/ThemeContext";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07080c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bin-dev.vercel.app"),
  title: "Bi Nè — Software Developer | Digital Identity & Systems Architecture",
  description:
    "Production-quality developer portfolio of Bi Nè (Nguyễn Hoàng Anh Khoa). Specializing in backend systems, distributed architectures, cloud scalability, and modern web experiences.",
  keywords: [
    "Bi Nè",
    "Nguyễn Hoàng Anh Khoa",
    "Software Developer",
    "Backend Engineer",
    "Next.js",
    "NestJS",
    "Spring Boot",
    "Neo4j",
    "Distributed Systems",
    "Digital Identity",
  ],
  authors: [{ name: "Bi Nè (Nguyễn Hoàng Anh Khoa)" }],
  openGraph: {
    title: "Bi Nè — Software Developer | Digital Identity & Systems",
    description:
      "Engineering Scalable Systems with Precision & Craft. Explore full-stack projects, architecture case studies, and 3D digital identity.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/avatar.jpg",
        width: 1200,
        height: 630,
        alt: "Bi Nè - Software Developer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#07080c] text-[#f1f5f9] antialiased selection:bg-cyan-500/30 selection:text-white`}
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
