# 🚀 Bi Nè Portfolio — 3D Interactive Developer Portfolio & Systems Architecture

> Nền tảng Portfolio cá nhân thế hệ mới của **Nguyễn Hoàng Anh Khoa (Bi Nè)**, kết hợp công nghệ **3D WebGL tương tác vật lý (Three.js & Rapier Physics)** với kiến trúc hiện đại **Next.js 16 (App Router)**, **React 19** và **Tailwind CSS v4**.

---

## ✨ Features

### 🪪 Interactive 3D Identity Card (Lanyard Physics)
Thẻ lập trình viên 3D tương tác mô phỏng vật lý con lắc thực tế với `@react-three/rapier` và `meshline`, cho phép kéo thả trực tiếp, mô phỏng chuyển động quán tính, lật 2 mặt (3D flip) và tùy biến texture thời gian thực.

### 🌐 Bilingual Support (i18n) & Dual Theme
Hỗ trợ chuyển đổi song ngữ linh hoạt (**Tiếng Việt / English**) thông qua `LanguageContext` và hệ thống từ điển `dictionaries.ts`, kết hợp cùng phong cách giao diện công nghệ **Midnight Cosmic** & **Crimson Red** với hiệu ứng ánh sáng gradient rực rỡ.

### 🛠 Showcase Dự án Thực Tế & Kiến Trúc Hệ Thống
Trình diễn chi tiết các dự án phần mềm tiêu biểu (Hệ thống đồ thị tri thức doanh nghiệp **EKG & AI Chatbot**, nền tảng giáo dục **ThinkAI E-Learning**, hệ thống quản lý từ thiện **QLTT**) cùng các tiêu chuẩn Clean Architecture, RESTful API và tối ưu hóa hiệu năng.

### 💼 Career Timeline & CV Trực Tuyến
Tích hợp dòng thời gian kinh nghiệm làm việc thực tế (Backend Intern tại Bệnh viện Ung Bướu), học vấn tại ĐH Công nghệ TP.HCM (HUTECH) và chức năng tải CV chuyên nghiệp định dạng PDF chỉ với 1 click.

---

## 🛠 Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Core** | Next.js 16 (App Router), React 19, TypeScript | Kiến trúc Server/Client Components, tối ưu hóa SEO & hiệu năng tải trang |
| **3D & Physics Engine** | Three.js, React Three Fiber, Drei, Rapier 3D | Render WebGL canvas, mô phỏng va chạm vật lý RigidBody & dây đeo MeshLine |
| **Styling & Animation** | Tailwind CSS v4, Framer Motion, Lucide Icons | Thiết kế Glassmorphism hiện đại, responsive mượt mà và micro-animations |
| **State & i18n** | React Context API, Dictionary Store | Quản lý đa ngôn ngữ (EN/VI) & theme chuyển đổi mượt mà |
| **Tooling & Code Quality** | ESLint 9, PostCSS, TypeScript 5 (Strict Mode) | Chuẩn hóa mã nguồn, type-safety và quản lý dependencies tối ưu |
| **Deployment & Hosting** | Vercel Edge Network | Tự động hóa CI/CD, phân phối nội dung toàn cầu với tốc độ cao |

---

## 📁 Project Structure

```text
porfolio_khoa/
├── public/
│   ├── assets/                     # 3D Model (.glb), textures dây đeo & thẻ ID
│   ├── projects/                   # Ảnh minh họa các dự án tiêu biểu (EKG, ThinkAI, QLTT)
│   ├── NguyenHoangAnhKhoa_CV.pdf   # Hồ sơ năng lực (CV) của tác giả
│   └── avatar.jpg                  # Ảnh chân dung lập trình viên
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root Layout, cấu hình font (Inter, JetBrains Mono) & SEO Metadata
│   │   ├── page.tsx                # Trang chủ SPA (Hero, About, Skills, Projects, Experience, Contact)
│   │   └── globals.css             # Tailwind CSS v4 directives, custom gradient glow & grid mesh
│   ├── components/
│   │   ├── Card3DLanyard.tsx       # 3D Canvas, Rapier Physics engine và dây đeo tương tác
│   │   ├── DeveloperCard3D.tsx     # Thẻ ID lập trình viên 3D tương tác lật mặt (Flip)
│   │   ├── Hero.tsx                # Hero section với visual 3D & nút điều hướng Call-to-Action
│   │   ├── About.tsx               # Giới thiệu bản thân, triết lý kiến trúc & code snippet
│   │   ├── Skills.tsx              # Ma trận kỹ năng chuyên môn (Frontend, Backend, Database, DevOps)
│   │   ├── Projects.tsx            # Danh sách các dự án nổi bật kèm liên kết GitHub/Demo
│   │   ├── Experience.tsx          # Dòng thời gian kinh nghiệm thực tế & học vấn
│   │   ├── Contact.tsx             # Form kết nối, thông tin liên hệ và tải CV
│   │   ├── Navbar.tsx              # Floating navigation bar & nút chuyển đổi ngôn ngữ
│   │   └── Footer.tsx              # Footer hiển thị bản quyền và social links
│   └── context/
│       ├── LanguageContext.tsx     # Quản lý trạng thái đa ngôn ngữ (VI/EN)
│       └── ThemeContext.tsx        # Quản lý bộ chủ đề giao diện màu sắc
├── lib/
│   └── data.ts                     # Dữ liệu tập trung cho projects, kỹ năng và thông tin cá nhân
├── dictionaries.ts                 # Từ điển dịch song ngữ (Tiếng Việt & English)
├── package.json                    # Khai báo thư viện & kịch bản chạy lệnh
└── README.md                       # Tài liệu hướng dẫn dự án (bạn đang đọc tại đây)
```

---

## 🚀 Quick Start

### Điều kiện tiên quyết (Prerequisites)
- **Node.js**: Phiên bản `18.18.0` trở lên (Khuyến nghị **Node.js 20+**)
- **Trình quản lý gói**: `npm`, `pnpm` hoặc `yarn`
- **Trình duyệt**: Hỗ trợ WebGL 2.0 (Chrome, Edge, Firefox, Safari)

### Các bước cài đặt (Development Setup)

```bash
# 1. Clone repository về máy cá nhân
git clone https://github.com/anhkhoa1112/porfolio_khoa.git
cd porfolio_khoa

# 2. Cài đặt các gói phụ thuộc (dependencies)
npm install

# 3. Khởi chạy môi trường phát triển (Development Server)
npm run dev
```

Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000) để trải nghiệm giao diện và tương tác với thẻ 3D.

### Lệnh biên dịch dự án (Build & Production)

```bash
# Kiểm tra lỗi cú pháp và type-check
npm run lint

# Tạo bản dựng tối ưu hóa cho môi trường Production
npm run build

# Khởi chạy máy chủ Production
npm run start
```

---

## ⚙️ Environment Variables

Nếu cần cấu hình các dịch vụ mở rộng (như Contact Form API, Analytics, v.v.), tạo file `.env.local` ở thư mục gốc:

```env
# Frontend Base URL
NEXT_PUBLIC_SITE_URL=https://bin-dev.vercel.app
```

---

## 📖 Key Modules & Architecture

| Module / File | Mô tả chi tiết |
| :--- | :--- |
| [`Card3DLanyard.tsx`](file:///d:/porfolio1/porfolio_khoa/src/components/Card3DLanyard.tsx) | Canvas WebGL chứa mô hình thẻ 3D, physics simulation với `@react-three/rapier`, tương tác chuột (drag & release) |
| [`DeveloperCard3D.tsx`](file:///d:/porfolio1/porfolio_khoa/src/components/DeveloperCard3D.tsx) | Component thẻ thông tin sinh viên & kỹ sư phần mềm với hiệu ứng xoay lật 2 mặt |
| [`data.ts`](file:///d:/porfolio1/porfolio_khoa/lib/data.ts) | Nguồn dữ liệu trung tâm chứa toàn bộ thông tin cá nhân, metrics, kỹ năng và dự án |
| [`dictionaries.ts`](file:///d:/porfolio1/porfolio_khoa/dictionaries.ts) | Bản đồ ngôn ngữ chi tiết phục vụ hệ thống song ngữ VI / EN |
| [`globals.css`](file:///d:/porfolio1/porfolio_khoa/src/app/globals.css) | Định nghĩa các bộ màu Midnight Blue, Cosmic Glow, lưới Grid Mesh và hiệu ứng đèn neon |

---

## 👤 Developer Profile

| Thông tin | Chi tiết |
| :--- | :--- |
| **Họ và tên** | **Nguyễn Hoàng Anh Khoa (Bi Nè)** |
| **Chuyên môn** | Backend Developer / Software Engineer (.NET, Spring Boot, Node.js/NestJS, Next.js) |
| **Học vấn** | Cử nhân Kỹ thuật Phần mềm (Software Engineering) - HUTECH University (2022 - 2026) |
| **Email** | [hoanganhkhoa160404@gmail.com](mailto:hoanganhkhoa160404@gmail.com) |
| **Số điện thoại** | 0344 378 620 |
| **GitHub** | [github.com/anhkhoa1112](https://github.com/anhkhoa1112) |
| **LinkedIn** | [linkedin.com/in/anhkhoa1112](https://linkedin.com/in/anhkhoa1112) |
| **Địa chỉ** | TP. Hồ Chí Minh, Việt Nam |

---

## 🗓 Roadmap

- [x] **Phase 1: Core Experience** — Hoàn thiện UI Cyberpunk/Midnight, tích hợp thẻ 3D Lanyard với Rapier physics, hệ thống song ngữ i18n và responsive trên desktop/mobile.
- [ ] **Phase 2: Mobile Performance & Case Studies** — Tối ưu hóa frame rate WebGL trên các thiết bị mobile cấu hình thấp và bổ sung trang xem chi tiết kiến trúc của từng dự án.
- [ ] **Phase 3: AI Assistant Integration** — Tích hợp trợ lý ảo AI (Google Gemini API) ngay trên portfolio để trả lời tự động câu hỏi phỏng vấn của nhà tuyển dụng về kinh nghiệm và dự án của tác giả.

---

## 📝 Contributing

Mọi đóng góp nhằm cải thiện hiệu năng, giao diện hoặc bổ sung tính năng đều được hoan nghênh:

1. **Fork** repository này về tài khoản cá nhân.
2. Tạo nhánh tính năng mới (`git checkout -b feature/amazing-feature`).
3. Commit các thay đổi (`git commit -m 'feat: Add amazing feature'`).
4. Push nhánh lên GitHub (`git push origin feature/amazing-feature`).
5. Mở một **Pull Request** để thảo luận và merge mã nguồn.

---

## 📄 License

Dự án này được phát hành dưới giấy phép **MIT License** — xem chi tiết tại file [LICENSE](file:///d:/porfolio1/porfolio_khoa/LICENSE).

---

<p align="center">
  Được thiết kế và phát triển với ❤️ bởi <b>Nguyễn Hoàng Anh Khoa (Bi Nè)</b>
</p>
