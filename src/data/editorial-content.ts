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
  { id: "contact", index: "06" },
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
      en: "Software Engineer — Frontend focus, full-stack experience",
      vi: "Kỹ sư Phần mềm — Chuyên Frontend, có kinh nghiệm Full-Stack",
    },
    alias: "@SatohJiro",
    description: {
      en: "3+ years shipping production web apps. Currently building ahamo for NTT Docomo with Vue.js and React.",
      vi: "Hơn 3 năm phát triển ứng dụng web production. Hiện xây dựng ahamo cho NTT Docomo bằng Vue.js và React.",
    },
    ctaResume: { en: "View resume", vi: "Xem CV" },
    ctaProjects: { en: "View projects", vi: "Xem dự án" },
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
        value: { en: "Frontend · Web platforms", vi: "Frontend · Nền tảng Web" },
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
        en: "Professional background, education, and the areas I work in day to day.",
        vi: "Tóm tắt kinh nghiệm, học vấn và các mảng tôi làm việc hằng ngày.",
      },
    },
    experience: {
      title: { en: "Experience", vi: "Kinh nghiệm" },
      description: {
        en: "Three companies — from an enterprise Japanese client to a CRM platform and AI tooling.",
        vi: "Ba công ty — từ khách hàng doanh nghiệp Nhật Bản đến nền tảng CRM và công cụ AI.",
      },
    },
    projects: {
      title: { en: "Projects", vi: "Dự án" },
      description: {
        en: "Selected work — client platforms (NTT Docomo, CRM), an award-winning AI tool, and academic projects.",
        vi: "Dự án tiêu biểu — nền tảng cho khách hàng (NTT Docomo, CRM), công cụ AI đạt giải và dự án học thuật.",
      },
    },
    skills: {
      title: { en: "Skills", vi: "Kỹ năng" },
      description: {
        en: "Frontend is the core strength; backend, AI, and tooling have been applied in real projects.",
        vi: "Frontend là thế mạnh chính; backend, AI và công cụ đã được áp dụng trong dự án thực tế.",
      },
    },
    awards: {
      title: { en: "Honors", vi: "Vinh danh" },
      description: {
        en: "Recognitions from university leadership and company teams for academic performance and project contributions.",
        vi: "Sự ghi nhận từ nhà trường và công ty cho thành tích học tập xuất sắc và đóng góp phát triển sản phẩm.",
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
    actionHire: { en: "Contact for hiring", vi: "Liên hệ tuyển dụng" },
  },
} as const;

export type EditorialContent = typeof editorialContent;
export type ChapterId = keyof typeof editorialContent.chapters;
