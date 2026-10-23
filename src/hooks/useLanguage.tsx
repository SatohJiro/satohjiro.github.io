"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { Language } from "@/types";
import { telemetry } from "@/lib/telemetry";

const STORAGE_KEY = "satoh_portfolio_lang";

// In-memory choice keeps toggling working when localStorage is blocked.
let chosenLanguage: Language | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readLanguage(): Language {
  if (chosenLanguage) return chosenLanguage;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "vi") return saved;
  } catch {
    // storage unavailable — fall through to browser language
  }
  return navigator.language.toLowerCase().startsWith("vi") ? "vi" : "en";
}

function writeLanguage(lang: Language) {
  chosenLanguage = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isVi: boolean;
  isEn: boolean;
  t: <T>(content: { en: T; vi: T }) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Static export prerenders in English; the stored/browser language applies after hydration.
  const language = useSyncExternalStore<Language>(subscribe, readLanguage, () => "en");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    writeLanguage(lang);
    telemetry.track("lang_change", lang, { from: language, to: lang });
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "en" ? "vi" : "en";
    setLanguage(nextLang);
  };

  const t = <T,>(content: { en: T; vi: T }): T => {
    return content[language];
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isVi: language === "vi",
        isEn: language === "en",
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
