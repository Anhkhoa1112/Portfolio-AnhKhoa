export interface ProjectCaseStudy {
  overview: string;
  role: string;
  architecture: string[];
  contributions: string[];
  challenges: string;
  results: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  detailImage?: string;
  githubUrl: string;
  demoUrl?: string;
  featured?: boolean;
  caseStudy?: ProjectCaseStudy;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  skills: string[];
}

export interface TimelineItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  badge?: string;
  status: 'active' | 'completed';
  highlights?: string[];
}

export const portfolioData = {
  personal: {
    name: "BI NÈ",
    fullName: "Nguyễn Hoàng Anh Khoa",
    shortName: "Khoa",
    role: "Software Developer",
    focus: "Backend Systems & Cloud Architectures",
    tagline: "Engineering Scalable Systems with Precision & Craft.",
    status: "AVAILABLE FOR WORK",
    email: "hoanganhkhoa160404@gmail.com",
    phone: "0344 378 620",
    location: "Ho Chi Minh City, Vietnam",
    github: "https://github.com/anhkhoa1112",
    linkedin: "https://linkedin.com/in/anhkhoa1112",
    cvUrl: "/NguyenHoangAnhKhoa_CV.pdf",
  },

  navigation: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "// DIGITAL IDENTITY / V1.0",
    headlinePart1: "Engineering",
    headlineAccent: "Scalable Systems",
    headlinePart2: "with Precision & Craft.",
    bio: "Hi, I'm Bi Nè — Software Developer crafting high-performance web applications, resilient cloud architectures, and immersive digital experiences.",
    ctaPrimary: "Explore Selected Work",
    ctaSecondary: "Flip ID Card",
    metrics: [
      { value: "4+", label: "Projects" },
      { value: "24+", label: "Technologies" },
      { value: "99.9%", label: "Attention to Detail" },
    ],
  },

  idCard: {
    university: "HUTECH UNIVERSITY",
    faculty: "FACULTY OF SOFTWARE ENGINEERING",
    name: "NGUYEN HOANG ANH KHOA",
    alias: "BI NÈ",
    title: "BACKEND DEVELOPER // SE",
    studentId: "2280601416",
    academicYear: "2022 — 2026",
    gpa: "3.18 / 4.0",
    clearance: "LEVEL 04 // FULL ACCESS",
    issueDate: "SEP 2022",
    expiryDate: "JUL 2026",
    chipSerial: "NFC-84920-SE",
    avatar: "/avatar.jpg",
    barcode: "||| |||| || ||||| || |||||| ||||",
    qrUrl: "https://github.com/anhkhoa1112",
  },

  about: {
    eyebrow: "// ENGINEERING PROFILE & BACKEND ARCHITECTURE",
    heading: "Architecting Scalable & Resilient Backend Systems.",
    paragraphs: [
      "Hi, I'm Anh Khoa — a Backend Engineer focused on architecting reliable REST APIs, optimizing core business workflows, and engineering highly scalable backend services.",
      "My core strengths center around the .NET ecosystem, Spring Boot, and Node.js. I bring extensive production experience in database modeling (SQL & MongoDB), fine-grained authorization (RBAC), low-latency Redis caching layers, and cross-system integrations.",
      "I place high priority on Clean Architecture, security-by-design, and effortless scalability. I firmly believe disciplined systems thinking paired with maintainable code is the cornerstone of software that thrives under demanding enterprise workloads.",
    ],
    codeSnippet: {
      filename: "developer.ts",
      language: "typescript",
      code: `const developer = {
  name: "Nguyễn Hoàng Anh Khoa",
  role: "Backend Developer",

  stack: [
    ".NET",
    "Spring Boot",
    "Node.js"
  ],

  architecture: [
    "REST API",
    "RBAC",
    "Workflow",
    "Caching"
  ],

  database: [
    "SQL Server",
    "MySQL",
    "MongoDB",
    "Redis"
  ],

  devops: [
    "Docker",
    "GitHub Actions"
  ]
};`,
    },
    statistics: [
      { value: "4+", label: "Production & Course Projects" },
      { value: "99.9%", label: "System Availability & Precision" },
      { value: "24+", label: "Frameworks & Dev Toolchains" },
    ],
  },

  skills: {
    eyebrow: "// TECHNICAL EXPERTISE",
    heading: "Disciplined Tooling for Modern Architecture",
    categories: [
      {
        id: "frontend",
        title: "Frontend Engineering",
        iconName: "Layout",
        description: "Crafting fluid, high-performance user interfaces with responsive architecture and motion design.",
        skills: ["React 19", "Next.js 16 (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      },
      {
        id: "backend",
        title: "Backend & APIs",
        iconName: "Server",
        description: "Architecting resilient RESTful APIs and clean domain-driven service layers.",
        skills: ["Node.js / NestJS", "Spring Boot 3 (Java)", "ASP.NET Core 8.0 MVC", "C# / .NET Core", "JWT & RBAC", "Clean Architecture"],
      },
      {
        id: "data-cloud",
        title: "Data & Cloud",
        iconName: "Database",
        description: "Modeling high-throughput schemas across relational, graph, and in-memory caches.",
        skills: ["Neo4j (Cypher Graphs)", "PostgreSQL / MySQL", "SQL Server / EF Core", "Redis (Cache & Queues)", "MongoDB", "Railway / Cloud VPS"],
      },
      {
        id: "devops-testing",
        title: "DevOps & Testing",
        iconName: "Terminal",
        description: "Automating workflows with containerization, continuous integration, and test suites.",
        skills: ["Docker & Multi-stage Builds", "Git / GitHub Actions", "CI/CD Pipelines", "Swagger / OpenAPI", "Unit & Integration Testing", "Linux Admin"],
      },
    ],
  },

  projects: {
    eyebrow: "// SELECTED PROJECTS / REAL IMPACT",
    heading: "Engineered for Real Impact",
    items: [
      {
        id: "ekg-system",
        title: "Enterprise Knowledge Graph (EKG)",
        subtitle: "Graph Data Modeling & 3-Tier AI Chatbot System",
        description:
          "Architected an enterprise graph database modeling 80+ employees and 300+ structural relationships with Neo4j. Integrated an intelligent 3-tier AI chatbot powered by Ollama and Gemini AI, secured via JWT HttpOnly cookies and monitored with Redis latency metrics.",
        tags: ["NestJS", "Neo4j", "Redis", "Gemini AI", "Next.js", "Docker"],
        image: "/projects/ekg_main.jpg",
        detailImage: "/projects/ekg_detail.jpg",
        githubUrl: "https://github.com/bnhminh1010/ChatBot_Enterprise_knowledge_Graph.git",
        featured: true,
        caseStudy: {
          role: "Lead Backend Architect & AI Tester",
          overview:
            "An enterprise knowledge graph and AI chatbot system designed to model organizational structures, personnel capabilities, and department hierarchies while answering employee inquiries via multi-tier AI services.",
          architecture: [
            "Neo4j graph database schema modeling 80+ employees and 300+ structural relationships via Cypher queries.",
            "3-tier AI chatbot orchestration routing queries between local Ollama LLMs and Google Gemini AI.",
            "JWT authentication with HttpOnly cookies & Redis metrics logging for low-latency session validation.",
          ],
          contributions: [
            "Modeled corporate entity nodes, relations, and Cypher indexing strategies for fast graph traversal.",
            "Configured automated Swagger / OpenAPI test suites for comprehensive API validation.",
            "Designed defensive error-handling filters and token lifecycle guards across NestJS services.",
          ],
          challenges:
            "Structuring non-relational graph relationships while maintaining low query response times across multi-level organizational trees.",
          results:
            "Successfully validated 300+ structural graph relationships with automated test suites and ironclad JWT security.",
        },
      },
      {
        id: "thinkai-platform",
        title: "ThinkAI E-Learning Platform",
        subtitle: "Scalable Course Management & Streaming Delivery",
        description:
          "Engineered a production-ready educational backend in Spring Boot 3 with structured module/lesson hierarchies. Implemented efficient chunked streaming for video lessons and PDF readers alongside real-time user progress tracking algorithms.",
        tags: ["Spring Boot 3", "Java", "MySQL", "Docker", "Railway", "REST APIs"],
        image: "/projects/thinkai_main.jpg",
        detailImage: "/projects/thinkai_detail.jpg",
        githubUrl: "https://github.com/ThinkAI-team/thinkai-backend.git",
        featured: true,
        caseStudy: {
          role: "Backend Developer & DevOps",
          overview:
            "A comprehensive educational backend providing structured course catalog management, user progress algorithms, and multimedia streaming delivery for online learners.",
          architecture: [
            "Multi-layer Spring Boot 3 REST service architecture structured around domain-driven design.",
            "Chunked byte-range streaming delivery pipeline for multimedia lessons and embedded PDF readers.",
            "Containerized deployment using Docker on Railway cloud infrastructure.",
          ],
          contributions: [
            "Architected relational MySQL schemas with foreign-key constraints for courses, chapters, and lessons.",
            "Built streaming controllers supporting range requests to prevent memory buffering spikes.",
            "Configured Dockerized build pipelines for reproducible deployments to cloud environments.",
          ],
          challenges:
            "Handling concurrent lesson video requests efficiently without exhausting heap memory on cloud containers.",
          results:
            "Delivered reliable multi-format course streaming with clean API separation and automated cloud builds.",
        },
      },
      {
        id: "qltt-charity",
        title: "QLTT - Charity Management System",
        subtitle: "Transparent Campaign & Real-Time Donation Engine",
        description:
          "Developed an end-to-end fundraising web application with ASP.NET Core MVC 8.0 and SQL Server. Engineered prioritized campaign listing algorithms, transaction processing with donor notes, and live financial progress visualizers.",
        tags: ["ASP.NET Core 8.0", "C#", "EF Core", "SQL Server", "Bootstrap 5"],
        image: "/projects/qltt_main.jpg",
        detailImage: "/projects/qltt_detail.jpg",
        githubUrl: "https://github.com/minhne198/DoAn_LTWeb.git",
        featured: false,
        caseStudy: {
          role: "Fullstack / Backend Developer",
          overview:
            "A public fundraising and transparent donation tracking platform ensuring full accountability and verifiable records for charitable campaigns.",
          architecture: [
            "ASP.NET Core 8.0 MVC architecture leveraging Entity Framework Core (Code-First migrations).",
            "Relational database design on Microsoft SQL Server with strict ACID transactional guarantees.",
            "Server-rendered dynamic views with real-time financial progress calculation.",
          ],
          contributions: [
            "Engineered prioritized campaign querying algorithms and categorical filtering pipelines.",
            "Built atomic financial transaction logging to record donor contributions safely.",
            "Developed responsive administrative portals for campaign approval and donation ledger audits.",
          ],
          challenges:
            "Ensuring transactional consistency and preventing race conditions during concurrent donation submissions.",
          results:
            "Delivered a fully functional, transparent fundraising system with verified transactional accuracy.",
        },
      },
      {
        id: "apexcloud-gateway",
        title: "ApexCloud Distributed API Gateway",
        subtitle: "High-Throughput Reverse Proxy & Rate Limiting",
        description:
          "Engineered a lightweight edge gateway featuring distributed token-bucket rate limiting, automatic JWT verification, and zero-downtime health probing across upstream microservices.",
        tags: ["Node.js", "TypeScript", "Redis", "Docker", "NGINX", "Security"],
        image: "/projects/apexcloud_arch.svg",
        detailImage: "/projects/apexcloud_arch.svg",
        githubUrl: "https://github.com/anhkhoa1112",
        featured: false,
        caseStudy: {
          role: "Systems Architect & Developer",
          overview:
            "A high-concurrency API edge gateway and reverse proxy built to protect upstream microservices from traffic surges and enforce centralized security policies.",
          architecture: [
            "High-throughput asynchronous reverse proxy layer built in Node.js and TypeScript.",
            "Distributed token-bucket rate limiter with sliding-window evaluation backed by Redis in-memory storage.",
            "Centralized JWT verification header inspection and automated upstream health probing.",
          ],
          contributions: [
            "Implemented rate-limiting algorithms with atomic Redis operations to prevent API abuse.",
            "Structured edge authentication so downstream services receive pre-validated security claims.",
            "Configured Dockerized multi-stage containerization with zero-downtime health checking probes.",
          ],
          challenges:
            "Enforcing low-latency distributed rate limiting across concurrent requests without incurring significant network round-trip delays.",
          results:
            "Robust edge traffic filtering, zero-downtime upstream health monitoring, and modular reverse proxy routing.",
        },
      },
    ] as Project[],
  },

  experience: {
    eyebrow: "// EXPERIENCE & ACADEMIC HONORS",
    heading: "Experience & Academic Journey",
    items: [
      {
        id: "exp-1",
        role: "Backend Engineer & AI Tester",
        organization: "Enterprise Knowledge Graph Project",
        period: "2024 — Present",
        badge: "CURRENT",
        status: "active",
        description:
          "Lead backend architect for graph entity modeling in Neo4j, designing RBAC auth modules, and running automated Swagger/OpenAPI test suites across multi-tier AI services.",
      },
      {
        id: "exp-2",
        role: "Backend Developer & DevOps",
        organization: "ThinkAI Platform Team",
        period: "2024 — 2025",
        badge: "PRODUCTION",
        status: "completed",
        description:
          "Built high-throughput Spring Boot REST APIs, architected MySQL schemas, and configured Dockerized CI/CD pipelines deployed to Railway cloud environments.",
      },
      {
        id: "exp-3",
        role: "Semi-Finalist Awardee",
        organization: "IT Got Talent 2025 Competition",
        period: "2025",
        badge: "HONOR",
        status: "completed",
        description:
          "Recognized for software engineering problem-solving, architectural design under tight competition constraints, and team-based rapid prototyping.",
      },
      {
        id: "exp-4",
        role: "Engineer in Software Engineering",
        organization: "Ho Chi Minh City University of Technology (HUTECH)",
        period: "2022 — 2026",
        badge: "GPA 3.18 / 4.0",
        status: "active",
        description:
          "Specializing in Software Engineering with rigorous coursework in Algorithms, Operating Systems, Database Management, Cloud Computing, and Software Architecture.",
      },
    ],
  },

  contact: {
    eyebrow: "// GET IN TOUCH",
    heading: "Let's Build Something Meaningful.",
    description:
      "Whether you have an idea, a project, or an interesting engineering problem to solve, let's build something useful together.",
    email: "hoanganhkhoa160404@gmail.com",
    github: "https://github.com/anhkhoa1112",
    linkedin: "https://linkedin.com/in/anhkhoa1112",
    cvUrl: "/NguyenHoangAnhKhoa_CV.pdf",
  },
};
