import { describe, it, expect } from "vitest";
import {
  contactData,
  summaryData,
  statsData,
  skillsData,
  experienceData,
  projectsData,
  educationData,
  awardsData,
} from "../data/portfolio-content";

describe("portfolio-content data integrity", () => {
  it("validates contactData structure and required fields", () => {
    expect(contactData.email).toBe("trananhq2345@gmail.com");
    expect(contactData.phone).toContain("98 970 2459");
    expect(contactData.github).toBe("https://github.com/SatohJiro");
    expect(contactData.linkedin).toBe("https://www.linkedin.com/in/satohjiro/");
    expect(contactData.location.en).toBeTruthy();
    expect(contactData.location.vi).toBeTruthy();
  });

  it("validates summaryData contains bilingual career highlights", () => {
    expect(summaryData.en.length).toBeGreaterThanOrEqual(2);
    expect(summaryData.vi.length).toBeGreaterThanOrEqual(2);
    expect(summaryData.en[0]).toContain("Valedictorian");
    expect(summaryData.vi[0]).toContain("Thủ khoa");
  });

  it("validates statsData metrics", () => {
    expect(statsData.yearsExperience).toBe("3+");
    expect(statsData.gpa).toBe("3.6/4.0");
    expect(statsData.valedictorianRank).toBe("#1 Top");
    expect(Number(statsData.awardsCount)).toBeGreaterThanOrEqual(3);
  });

  it("validates skillsData categories and items", () => {
    expect(skillsData.length).toBeGreaterThanOrEqual(3);
    skillsData.forEach((category) => {
      expect(category.id).toBeTruthy();
      expect(category.label.en).toBeTruthy();
      expect(category.label.vi).toBeTruthy();
      expect(category.skills.length).toBeGreaterThan(0);
      category.skills.forEach((skill) => {
        expect(skill.name).toBeTruthy();
        expect(skill.category).toBe(category.id);
      });
    });
  });

  it("validates experienceData contains key career positions", () => {
    expect(experienceData.length).toBeGreaterThanOrEqual(3);
    const companies = experienceData.map((exp) => exp.company);
    expect(companies).toContain("Hero Solutions");
    expect(companies).toContain("Nexus Zone");
    expect(companies).toContain("TMA Solutions");

    // NTT Docomo ahamo platform in Hero Solutions
    const heroExp = experienceData.find((e) => e.company === "Hero Solutions");
    expect(heroExp?.projectHighlights[0].name).toContain("ahamo");
    expect(heroExp?.projectHighlights[0].technologies).toContain("Vue.js");
  });

  it("validates projectsData categories and descriptions", () => {
    expect(projectsData.length).toBeGreaterThanOrEqual(2);
    projectsData.forEach((project) => {
      expect(project.id).toBeTruthy();
      expect(project.name.en).toBeTruthy();
      expect(project.name.vi).toBeTruthy();
      expect(project.technologies.length).toBeGreaterThan(0);
    });
  });

  it("validates education and awards", () => {
    expect(educationData.school.en).toContain("Nong Lam University");
    expect(educationData.gpa.en).toContain("3.6 / 4.0");
    expect(awardsData.length).toBeGreaterThanOrEqual(3);
  });
});
