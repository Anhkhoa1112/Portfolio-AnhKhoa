export type Language = "en" | "vi";

export const dictionaries = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      resume: "Resume",
    },
    cv: {
      name: "NGUYEN HOANG ANH KHOA",
      role: "BACKEND DEVELOPER",
      contact: {
        email: "hoanganhkhoa160404@gmail.com",
        phone: "034 437 8620",
        dob: "16/04/2004",
        location: "Ho Chi Minh City, Vietnam",
        github: "github.com/anhkhoa1112",
        portfolio: "Portfolio"
      },
      summary: "4th-year Software Engineering student. Passionate about building robust, highly scalable backend systems. With experience in .NET, Spring Boot, NodeJS, NestJS, I focus on clean architecture, performance optimization, and applying best practices in software development.",
      careerObjectives: {
        title: "CAREER OBJECTIVES",
        shortTerm: {
          label: "Short-term",
          text: "Apply knowledge in .NET, Spring Boot to develop core backend features, while learning real-world workflows, improving programming skills and teamwork in a professional environment."
        },
        longTerm: {
          label: "Long-term",
          text: "Become a Backend Developer with strong expertise, capable of building and optimizing systems, gradually approaching modern software architectures."
        }
      },
      education: {
        title: "EDUCATION",
        degree: "ENGINEER IN SOFTWARE ENG.",
        uni: "Ho Chi Minh City University of Technology (HUTECH)",
        period: "2022 - 2026",
        gpa: "3.18",
        achievements: [
          "Awards: Semi-Finalist IT Got Talent 2025",
          "English: Studying TOEIC (Target 650)"
        ]
      },
      skills: {
        title: "SKILLS",
        categories: [
          { label: "Language", items: [".NET", "Java", "NodeJS"], style: "outlined" },
          { label: "Framework", items: ["Spring Boot", ".NET Core"], style: "outlined" },
          { label: "Database", items: ["MySQL", "MongoDB"], style: "outlined" },
          { label: "DevOps", items: ["Docker"], style: "filled" },
          { label: "Tools", items: ["Git", "ANTIGRAVITY", "OPENCODE", "CURSOR"], style: "outlined" }
        ]
      },
      projects: {
        title: "EXPERIENCE & PROJECTS",
        subtitle: "BACKEND",
        period: "Course Projects | 2024 - Present",
        items: [
          {
            name: "QLTT - CHARITY MANAGEMENT SYSTEM / BACKEND DEVELOPER",
            link: "https://github.com/minhne198/DoAn_LTWeb.git",
            tech: "Tech: ASP.NET Core MVC 8.0, SQL Server, Entity Framework Core, Bootstrap 5",
            bullets: [
              "Built Campaign Listing feature with sorting by creation date and priority level.",
              "Developed APIs and business logic for campaign detail pages including financial goals, donation lists and comments.",
              "Implemented Donation feature allowing users to submit amounts with attached messages.",
              "Built data processing logic for supporter lists and real-time campaign progress updates."
            ]
          },
          {
            name: "THINKAI E-LEARNING PLATFORM / BACKEND DEVELOPER",
            link: "https://github.com/ThinkAI-team/thinkai-backend.git",
            tech: "Tech: Spring Boot 3, MySQL, Railway, Docker",
            bullets: [
              "Developed user dashboard API, aggregating learning data and course progress.",
              "Built course structure API, organizing content by modules and lessons.",
              "Implemented content delivery API supporting video and document lessons.",
              "Handled PDF file streaming for document viewer, optimizing content loading and display.",
              "Developed learning progress tracking, auto-updating lesson completion status."
            ]
          },
          {
            name: "ENTERPRISE KNOWLEDGE GRAPH (EKG) / BACKEND DEVELOPER & TESTER",
            link: "https://github.com/bnhminh1010/ChatBot_Enterprise_knowledge_Graph.git",
            tech: "Tech: Neo4j, NestJS (Node.js, TypeScript), Next.js, Redis, Gemini, JWT",
            bullets: [
              "Built authentication and authorization system using JWT (login, logout, refresh token).",
              "Implemented RBAC with Admin (full CRUD) and Viewer (read-only) roles.",
              "Enhanced security with HttpOnly cookies for token storage.",
              "Developed unified search API (/search) for system-wide queries.",
              "Built chat module using Redis for conversation history and metrics tracking.",
              "Implemented health check endpoints to monitor Neo4j, Redis, and AI services status.",
              "Wrote unit tests and integration tests for backend modules.",
              "Performed API testing with Swagger/OpenAPI.",
              "Evaluated performance and accuracy of AI chatbot system using 3-tier architecture (Neo4j, Ollama, Gemini)."
            ]
          }
        ]
      },
      footer: {
        export: "PRINT / SAVE AS PDF",
        print: "Print CV"
      }
    },
    hero: {
      greeting: "Hello, I'm Anh Khoa.",
      title: "Backend Developer & DevOps Engineer.",
      description:
        "As a senior IT student specializing in backend development and DevOps, I aim to apply my skills in NestJS, Spring Boot, Neo4j, and Docker to build scalable and reliable systems. My long-term goal is to grow into a Senior Backend Engineer.",
    },
    skills: {
      title: "Skills & Technologies",
    },
    skillsDesc: {
      NodeJS: "Built backend APIs for EKG System using NestJS and Next.js.",
      "Spring Boot": "Developed RESTful APIs and managed lifecycle for ThinkAI e-learning platform.",
      Neo4j: "Architected enterprise knowledge graph modeling 80+ employees and 300+ relationships.",
      PostgreSQL: "Designed schemas and optimized complex queries for focus apps and e-learning platforms.",
      Docker: "Containerized applications and optimized multi-stage builds to reduce image size by 90%.",
      Linux: "Administrated Linux environments, hardening security and managing server resources.",
      Git: "Maintained version control with strict branch protection rules and GitOps workflows.",
      "CI/CD": "Designed automated pipelines including SAST scanning, testing, and deployment.",
    },
    experience: {
      title: "Experience",
      jobs: [
        {
          title: "Fullstack Developer @ Enterprise Knowledge Graph (EKG System)",
          period: "Oct 2025 – Present",
          bullets: [
            "Architected an enterprise knowledge graph using Neo4j, modeling 80+ employees, 6 departments, and over 300 relationships.",
            "Integrated graph algorithms to analyze personnel relationships within the organization.",
            "In charge of backend architecture design, data modeling, and collaborating directly with a 3-member team.",
          ],
        },
        {
          title: "Backend Developer @ ZenDo – Focus & Productivity App",
          period: "Sep 2025 – Oct 2025",
          bullets: [
            "Developed backend features for a time management mobile application using Supabase.",
            "Built authentication flows (login, signup, session) and real-time task synchronization.",
            "Designed database schema for tasks, focus sessions, statistics, and user progress.",
            "Optimized database queries and implemented structured error handling to improve API reliability.",
          ],
        },
        {
          title: "Backend Developer & DevOps @ ThinkAI",
          period: "2026",
          bullets: [
            "Developed Spring Boot backend API for the ThinkAI e-learning platform using MySQL and JPA/Hibernate.",
            "Containerized the system using Docker and set up a fast local development environment via docker-compose.",
            "Managed the software development lifecycle, ensuring optimal backend stability and easy deployment.",
          ],
        },
      ]
    },
    projects: {
      title: "Featured Projects",
      viewSource: "View Source",
      items: [
        {
          title: "Enterprise Knowledge Graph (EKG)",
          description: "Enterprise Knowledge Graph built with Neo4j, NestJS, and Next.js. Integrates 3-tier routing AI Chat (Neo4j direct / Ollama RAG / Gemini) and Redis caching for conversation history.",
          meta: "Neo4j • NestJS • Next.js • Redis • Ollama • Gemini",
        },
        {
          title: "ThinkAI Backend",
          description: "Spring Boot backend API for the ThinkAI e-learning platform. Utilizes MySQL and JPA/Hibernate, packaged with Docker for quick local environment setup via docker-compose.",
          meta: "Java (Spring Boot) • MySQL • JPA/Hibernate • Docker • Maven",
        }
      ]
    },
    serverStatus: {
      label: "System Core",
      online: "Operational",
      offline: "System Down",
      checking: "Checking...",
      region: "Region",
      visitorIP: "Visitor IP",
    },
    terminal: {
      button: "Terminal",
      welcome: "AnhKhoaOS v1.0.0 (Linux x86_64)\nSystem ready. Type 'help' to see available commands.",
      prompt: "guest@anhkhoa-portfolio:~$",
      commandNotFound: "-bash: {0}: command not found. This incident will be reported.",
      help: "Available commands:\n  help      - Show this help message\n  whoami    - Show information about me\n  skills    - List core skills\n  projects  - List featured projects\n  download  - Download my resume\n  clear     - Clear the terminal screen\n  lang      - Switch language (e.g., lang vi, lang en)",
    },
    gitops: {
      latestCommit: "Latest Commit",
      fetching: "Fetching CI/CD status...",
      status: "Status",
      success: "SUCCESS",
    },
    devops: {
      title: "System Observability",
      kubernetes: "K8s ReplicaSet",
      killPod: "Kill a Pod to test Self-Healing",
      grafana: "Grafana Dash (Mini)",
      cpu: "CPU",
      mem: "MEM",
      healthy: "Healthy",
    },
    pipeline: {
      title: "CI/CD Pipeline Architecture",
      source: "Source Code",
      sourceDesc: "Triggered on push to main branch or PR creation. Follows strict branch protection rules.",
      sast: "Lint & SAST",
      sastDesc: "Runs ESLint, Prettier, and Trivy container scanning. Fails fast to save cloud runner minutes and prevent CVEs.",
      test: "Unit Test",
      testDesc: "Executes Jest/Vitest suites. Requires minimum 80% coverage to proceed to build stage.",
      build: "Build Image",
      buildDesc: "Utilizes Docker Multi-stage builds. Compiles code in heavy builder layer, extracts only binary to Alpine base reducing image size by 90%.",
      registry: "Push Registry",
      registryDesc: "Pushes optimized Docker image to GitHub Container Registry (GHCR) / AWS ECR with secure tag signing.",
      deploy: "Deploy",
      deployDesc: "ArgoCD detects drift and updates Kubernetes manifests, or Vercel Edge automatically serves new static assets.",
    },
  },
  vi: {
    nav: {
      about: "Giới thiệu",
      skills: "Kỹ năng",
      experience: "Kinh nghiệm",
      projects: "Dự án",
      resume: "Tải CV",
    },
    cv: {
      name: "NGUYỄN HOÀNG ANH KHOA",
      role: "BACKEND DEVELOPER",
      contact: {
        email: "hoanganhkhoa160404@gmail.com",
        phone: "034 437 8620",
        dob: "16/04/2004",
        location: "TP. Hồ Chí Minh, Việt Nam",
        github: "github.com/anhkhoa1112",
        portfolio: "Portfolio"
      },
      summary: "Sinh viên năm 4 chuyên ngành Công nghệ phần mềm. Đam mê xây dựng các hệ thống backend mạnh mẽ, có khả năng mở rộng cao. Với kinh nghiệm làm việc cùng .NET, Spring Boot, NodeJS, NestJS, mình luôn tập trung vào việc xây dựng kiến trúc sạch, tối ưu hiệu suất và áp dụng các best practices trong phát triển phần mềm.",
      careerObjectives: {
        title: "MỤC TIÊU NGHỀ NGHIỆP",
        shortTerm: {
          label: "Ngắn hạn",
          text: "Áp dụng kiến thức về .NET, Spring Boot để phát triển các chức năng backend cơ bản, đồng thời học hỏi thêm về quy trình làm việc thực tế, cải thiện kỹ năng lập trình và làm việc nhóm trong môi trường doanh nghiệp."
        },
        longTerm: {
          label: "Dài hạn",
          text: "Trở thành Backend Developer vững chuyên môn, có khả năng xây dựng và tối ưu hệ thống, từng bước tiếp cận các kiến trúc phần mềm hiện đại."
        }
      },
      education: {
        title: "HỌC VẤN",
        degree: "KỸ SƯ CÔNG NGHỆ PHẦN MỀM",
        uni: "Đại học Công nghệ TP.HCM (HUTECH)",
        period: "2022 - 2026",
        gpa: "3.18",
        achievements: [
          "Thành tựu: Bán kết cuộc thi IT Got Talent 2025",
          "Ngoại ngữ: Đang học TOEIC (Mục tiêu 650)"
        ]
      },
      skills: {
        title: "KỸ NĂNG",
        categories: [
          { label: "Ngôn ngữ", items: [".NET", "Java", "NodeJS"], style: "outlined" },
          { label: "Framework", items: ["Spring Boot", ".NET Core"], style: "outlined" },
          { label: "Database", items: ["MySQL", "MongoDB"], style: "outlined" },
          { label: "DevOps", items: ["Docker"], style: "filled" },
          { label: "Công cụ", items: ["Git", "ANTIGRAVITY", "OPENCODE", "CURSOR"], style: "outlined" }
        ]
      },
      projects: {
        title: "KINH NGHIỆM & DỰ ÁN",
        subtitle: "BACKEND",
        period: "Đồ án Môn học | 2024 - Hiện tại",
        items: [
          {
            name: "QLTT - HỆ THỐNG QUẢN LÝ TỪ THIỆN / BACKEND DEVELOPER",
            link: "https://github.com/minhne198/DoAn_LTWeb.git",
            tech: "Công nghệ: ASP.NET Core MVC 8.0, SQL Server, Entity Framework Core, Bootstrap 5",
            bullets: [
              "Xây dựng chức năng hiển thị danh sách chiến dịch (Campaign Listing), hỗ trợ sắp xếp theo ngày tạo và mức độ ưu tiên.",
              "Phát triển API và xử lý nghiệp vụ cho trang chi tiết chiến dịch, bao gồm hiển thị mục tiêu tài chính, danh sách đóng góp và bình luận.",
              "Triển khai chức năng quyên góp (Donation), cho phép người dùng nhập số tiền và gửi lời nhắn kèm theo.",
              "Xây dựng logic xử lý dữ liệu cho danh sách người ủng hộ và cập nhật tiến độ chiến dịch theo thời gian thực."
            ]
          },
          {
            name: "THINKAI E-LEARNING PLATFORM / BACKEND DEVELOPER",
            link: "https://github.com/ThinkAI-team/thinkai-backend.git",
            tech: "Công nghệ: Spring Boot 3, MySQL, Railway, Docker",
            bullets: [
              "Phát triển API dashboard người dùng, tổng hợp dữ liệu học tập và tiến độ khóa học.",
              "Xây dựng API cấu trúc khóa học, tổ chức nội dung theo module và lesson.",
              "Triển khai API phân phối nội dung bài học hỗ trợ video và tài liệu.",
              "Xử lý streaming file PDF cho trình xem tài liệu, tối ưu việc tải và hiển thị nội dung học tập.",
              "Phát triển chức năng theo dõi tiến độ học tập, tự động cập nhật trạng thái hoàn thành bài học."
            ]
          },
          {
            name: "ENTERPRISE KNOWLEDGE GRAPH (EKG) / BACKEND DEVELOPER & TESTER",
            link: "https://github.com/bnhminh1010/ChatBot_Enterprise_knowledge_Graph.git",
            tech: "Công nghệ: Neo4j, NestJS (Node.js, TypeScript), Next.js, Redis, Gemini, JWT",
            bullets: [
              "Xây dựng hệ thống xác thực và phân quyền sử dụng JWT (login, logout, refresh token).",
              "Triển khai RBAC với các vai trò Admin (full CRUD) và Viewer (read-only).",
              "Tăng cường bảo mật bằng HttpOnly cookies cho token.",
              "Phát triển API tìm kiếm tổng hợp (/search) phục vụ truy vấn toàn hệ thống.",
              "Xây dựng module chat, sử dụng Redis để lưu trữ lịch sử hội thoại và theo dõi metrics.",
              "Triển khai các health check endpoints để giám sát trạng thái Neo4j, Redis và AI services.",
              "Viết unit test và integration test cho các module backend.",
              "Thực hiện kiểm thử API với Swagger/OpenAPI.",
              "Đánh giá hiệu năng và độ chính xác của hệ thống AI chatbot theo kiến trúc 3-tier (Neo4j, Ollama, Gemini)."
            ]
          }
        ]
      },
      footer: {
        export: "IN / LƯU PDF",
        print: "In CV"
      }
    },
    hero: {
      greeting: "Xin chào, mình là Anh Khoa.",
      title: "Backend Developer & DevOps Engineer.",
      description:
        "Là một sinh viên CNTT năm cuối chuyên về lập trình Backend và DevOps, mình mong muốn áp dụng các kỹ năng về NestJS, Spring Boot, Neo4j và Docker để xây dựng các hệ thống có khả năng mở rộng và độ tin cậy cao. Mục tiêu dài hạn của mình là trở thành một Senior Backend Engineer.",
    },
    skills: {
      title: "Kỹ năng & Công nghệ",
    },
    skillsDesc: {
      NodeJS: "Xây dựng API backend cho hệ thống EKG bằng NestJS và Next.js.",
      "Spring Boot": "Phát triển RESTful API và quản lý vòng đời trọn gói cho nền tảng e-learning ThinkAI.",
      Neo4j: "Thiết kế kiến trúc knowledge graph mô hình hóa hơn 80 nhân viên và 300 mối quan hệ.",
      PostgreSQL: "Thiết kế CSDL và tối ưu hóa truy vấn phức tạp cho các ứng dụng quản lý thời gian.",
      Docker: "Đóng gói ứng dụng (Containerization) và tối ưu hóa multi-stage build giảm 90% dung lượng.",
      Linux: "Quản trị môi trường Linux, tăng cường bảo mật và cấp phát tài nguyên máy chủ.",
      Git: "Quản lý mã nguồn với các quy tắc bảo vệ nhánh nghiêm ngặt và luồng GitOps.",
      "CI/CD": "Thiết kế đường ống tự động với luồng DevSecOps (quét SAST, kiểm thử, triển khai).",
    },
    experience: {
      title: "Kinh nghiệm làm việc",
      jobs: [
        {
          title: "Fullstack Developer @ Enterprise Knowledge Graph (Hệ thống EKG)",
          period: "Tháng 10 2025 – Hiện tại",
          bullets: [
            "Thiết kế kiến trúc knowledge graph doanh nghiệp bằng Neo4j, mô hình hóa hơn 80 nhân viên, 6 phòng ban và hơn 300 mối quan hệ.",
            "Tích hợp các thuật toán đồ thị (graph algorithms) để phân tích mối quan hệ nhân sự.",
            "Đảm nhận thiết kế kiến trúc Backend, mô hình hóa dữ liệu và làm việc trực tiếp với nhóm 3 người.",
          ],
        },
        {
          title: "Backend Developer @ ZenDo – Ứng dụng Tập trung & Hiệu suất",
          period: "Tháng 09 2025 – Tháng 10 2025",
          bullets: [
            "Phát triển backend cho ứng dụng điện thoại quản lý thời gian sử dụng Supabase.",
            "Xây dựng luồng xác thực (đăng nhập, đăng ký, phiên làm việc) và đồng bộ hóa công việc theo thời gian thực.",
            "Thiết kế cơ sở dữ liệu cho các đầu việc, phiên tập trung, thống kê và tiến độ người dùng.",
            "Tối ưu truy vấn dữ liệu và thiết lập chuẩn hóa bắt lỗi để tăng độ ổn định cho API.",
          ],
        },
        {
          title: "Backend Developer & DevOps @ ThinkAI",
          period: "2026",
          bullets: [
            "Phát triển Spring Boot API cho hệ thống e-learning ThinkAI với MySQL và JPA/Hibernate.",
            "Đóng gói hệ thống với Docker và thiết lập môi trường phát triển cục bộ nhanh chóng bằng docker-compose.",
            "Quản lý vòng đời phát triển phần mềm, đảm bảo sự ổn định của backend và dễ dàng triển khai.",
          ],
        },
      ]
    },
    projects: {
      title: "Dự án Nổi bật",
      viewSource: "Mã nguồn",
      items: [
        {
          title: "Enterprise Knowledge Graph (EKG)",
          description: "Hệ thống tri thức doanh nghiệp cấu trúc bởi Neo4j, NestJS và Next.js. Tích hợp định tuyến Chat AI 3 lớp (Trực tiếp Neo4j / Ollama RAG / Gemini) và Redis cache cho lịch sử chat.",
          meta: "Neo4j • NestJS • Next.js • Redis • Ollama • Gemini",
        },
        {
          title: "ThinkAI Backend",
          description: "Spring Boot API cho nền tảng e-learning ThinkAI. Sử dụng MySQL và JPA/Hibernate, triển khai bằng Docker giúp setup nhanh trên môi trường local qua docker-compose.",
          meta: "Java (Spring Boot) • MySQL • JPA/Hibernate • Docker • Maven",
        }
      ]
    },
    serverStatus: {
      label: "Lõi Hệ Thống",
      online: "Đang Hoạt Động",
      offline: "Mất Kết Nối",
      checking: "Đang Kiểm Tra...",
      region: "Khu vực",
      visitorIP: "IP Truy Cập",
    },
    terminal: {
      button: "Terminal",
      welcome: "AnhKhoaOS v1.0.0 (Linux x86_64)\nHệ thống đã sẵn sàng. Gõ 'help' để xem các lệnh khả dụng.",
      prompt: "guest@anhkhoa-portfolio:~$",
      commandNotFound: "-bash: {0}: không tìm thấy lệnh. Sự cố này sẽ được báo cáo.",
      help: "Các lệnh khả dụng:\n  help      - Hiển thị thông báo hướng dẫn này\n  whoami    - Xem thông tin về tôi\n  skills    - Xem danh sách kỹ năng\n  projects  - Xem danh sách dự án\n  download  - Tải xuống CV của tôi\n  clear     - Xóa màn hình\n  lang      - Đổi ngôn ngữ (VD: lang vi, lang en)",
    },
    gitops: {
      latestCommit: "Bản triển khai mới nhất",
      fetching: "Đang lấy trạng thái CI/CD...",
      status: "Trạng thái",
      success: "THÀNH CÔNG",
    },
    devops: {
      title: "Khả Năng Quan Sát Hệ Thống",
      kubernetes: "K8s ReplicaSet",
      killPod: "Bấm Kill để test Self-Healing",
      grafana: "Grafana Dash (Mini)",
      cpu: "CPU",
      mem: "MEM",
      healthy: "Ổn định",
    },
    pipeline: {
      title: "Kiến trúc CI/CD Pipeline",
      source: "Mã Nguồn (Source)",
      sourceDesc: "Kích hoạt khi có lệnh Push lên nhánh main hoặc tạo PR. Tuân thủ luật bảo vệ nhánh nghiêm ngặt.",
      sast: "Lint & SAST",
      sastDesc: "Chạy phân tích tính tĩnh (Trivy/SonarQube). Bắt lỗi sớm (Fail-fast) chặn rủi ro bảo mật (CVE) và tiết kiệm chi phí Server.",
      test: "Unit Test",
      testDesc: "Thực thi kịch bản kiểm thử (Jest/Vitest). Yêu cầu độ bao phủ mã nguồn (Coverage) tối thiểu 80% để được build.",
      build: "Build Image",
      buildDesc: "Áp dụng Docker Multi-stage build. Loại bỏ các thư viện rác, chỉ mang file thực thi sang Alpine Linux giúp giảm 90% dung lượng.",
      registry: "Push Registry",
      registryDesc: "Đẩy image siêu nhẹ lên Github Container Registry (GHCR) hoặc AWS ECR kèm theo bảo mật chữ ký (Tag signing).",
      deploy: "Triển khai (Deploy)",
      deployDesc: "Sử dụng ArgoCD tự động đồng bộ (GitOps) xuống Kubernetes Cluster hoặc chạy Vercel Edge tự động trích xuất file tĩnh.",
    },
  },
};

export type Dictionary = typeof dictionaries.en;
