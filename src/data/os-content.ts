/**
 * SatohOS content strings — bilingual (EN/VI) parity enforced by
 * src/__tests__/os-content.test.ts. Terminal/boot log lines stay ASCII.
 */
export const osContent = {
  boot: {
    osName: "SatohOS",
    version: "v3.0.1",
    arch: "x86_64-nextjs",
    lines: [
      "[  ok  ] satohos kernel v3.0.1 - x86_64-nextjs",
      "[  ok  ] mounted /dev/talent -> /home/satohjiro",
      "[  ok  ] loaded modules: react - vue - spring-boot - fastapi",
      "[  ok  ] ai.pipeline: gpt-4 ... online",
      "[  ok  ] locale: en_US / vi_VN ... ready",
      "[  ok  ] status: open_for_opportunities = true",
    ],
    skip: { en: "click or press Esc to skip", vi: "nhấn Esc hoặc click để bỏ qua" },
  },
  menuBar: {
    osName: "SatohOS",
    status: { en: "Open for opportunities", vi: "Sẵn sàng nhận cơ hội mới" },
    openPalette: { en: "Command palette", vi: "Bảng lệnh" },
    toggleTheme: { en: "Toggle theme", vi: "Đổi giao diện" },
    toggleLanguage: { en: "Switch language", vi: "Đổi ngôn ngữ" },
  },
  hero: {
    windowTitle: "nta@satohos: ~",
    eyebrow: {
      en: "Software Engineer · Full-Stack & Frontend",
      vi: "Kỹ sư Phần mềm · Full-Stack & Frontend",
    },
    name: "Nguyen Tran Anh",
    alias: "@SatohJiro",
    description: {
      en: "Software Engineer with 3+ years building high-performance web apps, micro-frontends at NTT Docomo, and production AI tools.",
      vi: "Kỹ sư phần mềm với hơn 3 năm kinh nghiệm phát triển web, micro-frontend NTT Docomo và tích hợp AI.",
    },
    terminalPrompt: "$ whoami",
    terminalOutput: [
      "role: software-engineer",
      "focus: [web-platforms, micro-frontends, ai-tools]",
      "honor: valedictorian — gpa 3.6/4.0",
      "status: open_for_opportunities",
    ],
    ctaResume: { en: "Download CV / Resume", vi: "Tải CV & Xem Resume" },
    ctaProjects: { en: "View Projects", vi: "Xem Dự Án" },
    ctaTerminal: { en: "$ terminal", vi: "$ terminal" },
    stats: {
      years: { en: "Years Experience", vi: "Năm Kinh nghiệm" },
      gpa: { en: "Valedictorian GPA", vi: "Thủ Khoa GPA (NLU)" },
      awards: { en: "Honors & Awards", vi: "Giải Thưởng / Vinh Danh" },
      perf: { en: "Performance Gain", vi: "Tối ưu Render" },
    },
  },
  dock: {
    label: { en: "Sections", vi: "Các mục" },
    openPalette: { en: "Command palette", vi: "Bảng lệnh" },
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

export type OsContent = typeof osContent;
