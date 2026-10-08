/**
 * Editorial content strings — the single source of truth for the
 * journal-style UI: header, hero, chapter index, command palette.
 * Every user-facing string has EN/VI parity (checked by tests).
 */
export const chapters = [
  { id: "about", index: "01" },
  { id: "experience", index: "02" },
  { id: "projects", index: "03" },
  { id: "skills", index: "04" },
  { id: "awards", index: "05" },
  { id: "terminal", index: "06" },
  { id: "contact", index: "07" },
] as const;

export const editorialContent = {
  header: {
    wordmark: "NTA",
    alias: "@satohjiro",
    status: { en: "Open for opportunities", vi: "Sẵn sàng cho cơ hội mới" },
    openPalette: { en: "Command palette", vi: "Bảng lệnh" },
    toggleTheme: { en: "Toggle theme", vi: "Đổi giao diện" },
    toggleLanguage: { en: "Switch language", vi: "Đổi ngôn ngữ" },
    menu: { en: "Menu", vi: "Menu" },
    close: { en: "Close", vi: "Đóng" },
  },
  hero: {
    volume: { en: "Portfolio — Vol. 2026", vi: "Hồ sơ năng lực — Vol. 2026" },
    nameLine1: "NGUYEN",
    nameLine2: "TRAN ANH",
    role: {
      en: "Software Engineer — Full-Stack & Frontend",
      vi: "Kỹ sư Phần mềm — Full-Stack & Frontend",
    },
    alias: "@SatohJiro",
    description: {
      en: "Software Engineer with 3+ years building high-performance web apps, micro-frontends at NTT Docomo, and production AI tools.",
      vi: "Kỹ sư phần mềm với hơn 3 năm kinh nghiệm phát triển web, micro-frontend NTT Docomo và tích hợp AI.",
    },
    ctaResume: { en: "Download CV", vi: "Tải CV" },
    ctaProjects: { en: "View projects", vi: "Xem dự án" },
    ctaTerminal: { en: "$ terminal", vi: "$ terminal" },
    meta: {
      location: {
        label: { en: "Location", vi: "Địa điểm" },
        value: { en: "Ho Chi Minh City", vi: "TP. Hồ Chí Minh" },
      },
      experience: {
        label: { en: "Experience", vi: "Kinh nghiệm" },
        value: { en: "3+ years", vi: "3+ năm" },
      },
      focus: {
        label: { en: "Focus", vi: "Chuyên sâu" },
        value: { en: "Web platforms · AI", vi: "Nền tảng Web · AI" },
      },
      education: {
        label: { en: "Education", vi: "Học vấn" },
        value: { en: "Valedictorian, NLU", vi: "Thủ khoa, ĐH Nông Lâm" },
      },
    },
    marquee: [
      "React",
      "Vue.js",
      "Next.js",
      "TypeScript",
      "Micro-frontends",
      "Spring Boot",
      "FastAPI",
      "GPT-4",
      "RabbitMQ",
      "PostgreSQL",
    ],
    scroll: { en: "Scroll", vi: "Cuộn xuống" },
  },
  chapters: {
    about: {
      title: { en: "About", vi: "Giới thiệu" },
      description: {
        en: "Nong Lam University IT Valedictorian combined with 3+ years of hands-on web software engineering experience.",
        vi: "Tốt nghiệp Thủ khoa ngành CNTT ĐH Nông Lâm TP.HCM kết hợp hơn 3 năm kinh nghiệm thực chiến phát triển ứng dụng Web.",
      },
    },
    experience: {
      title: { en: "Experience", vi: "Kinh nghiệm" },
      description: {
        en: "Over 3 years of software development across enterprise Japanese clients, SaaS platforms, and AI tools.",
        vi: "Hơn 3 năm kinh nghiệm lập trình thực tế qua các môi trường doanh nghiệp Nhật Bản, SaaS CRM và dự án AI.",
      },
    },
    projects: {
      title: { en: "Projects", vi: "Dự án" },
      description: {
        en: "Selected work — production systems at NTT Docomo and Salesforce, AI tools, and academic research.",
        vi: "Các dự án tiêu biểu — hệ thống production tại NTT Docomo và Salesforce, công cụ AI và nghiên cứu học thuật.",
      },
    },
    skills: {
      title: { en: "Skills", vi: "Kỹ năng" },
      description: {
        en: "Core expertise in frontend engineering and performance optimization, backed by micro-frontends, backend APIs, and AI integrations.",
        vi: "Thế mạnh nòng cốt về Frontend & tối ưu hiệu năng, kết hợp kinh nghiệm thực tế với các kiến trúc Micro-frontend, Backend APIs và tích hợp AI.",
      },
    },
    awards: {
      title: { en: "Honors", vi: "Vinh danh" },
      description: {
        en: "Recognitions from university leadership and company teams for academic performance and project contributions.",
        vi: "Sự ghi nhận từ nhà trường và công ty cho thành tích học tập xuất sắc và đóng góp phát triển sản phẩm.",
      },
    },
    terminal: {
      title: { en: "Terminal", vi: "Terminal" },
      description: {
        en: "Prefer the command line? Explore the portfolio the old-school way.",
        vi: "Thích dùng dòng lệnh? Khám phá portfolio theo cách cổ điển.",
      },
    },
    contact: {
      title: { en: "Contact", vi: "Liên hệ" },
      description: {
        en: "Reach out directly via email, phone, or professional networks below.",
        vi: "Liên hệ trực tiếp qua email, điện thoại hoặc các mạng xã hội nghề nghiệp bên dưới.",
      },
    },
  },
  palette: {
    placeholder: { en: "Type a command or search…", vi: "Gõ lệnh hoặc tìm kiếm…" },
    empty: { en: "No matching commands", vi: "Không tìm thấy lệnh phù hợp" },
    groupJump: { en: "Go to", vi: "Chuyển tới" },
    groupAction: { en: "Actions", vi: "Hành động" },
    copied: { en: "Email copied to clipboard", vi: "Đã sao chép email" },
    actionResume: { en: "Open resume", vi: "Mở resume" },
    actionTheme: { en: "Toggle theme", vi: "Đổi giao diện" },
    actionLanguage: { en: "Switch language (EN/VI)", vi: "Đổi ngôn ngữ (EN/VI)" },
    actionCopyEmail: { en: "Copy email address", vi: "Sao chép địa chỉ email" },
    actionHire: { en: "Hire me — fast track", vi: "Tuyển dụng — ưu tiên" },
  },
} as const;

export type EditorialContent = typeof editorialContent;
export type ChapterId = keyof typeof editorialContent.chapters;
