import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "sl" | "it" | "en";
export type Text = Record<Lang, string>;

export const LANGS: { code: Lang; label: string; locale: string }[] = [
  { code: "sl", label: "Slovenščina", locale: "sl-SI" },
  { code: "it", label: "Italiano", locale: "it-IT" },
  { code: "en", label: "English", locale: "en-GB" },
];

const STORAGE_KEY = "lecite-lang";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (text: string | Text) => string;
};

const LangContext = createContext<LangContextValue>({
  lang: "sl",
  setLang: () => {},
  t: (text) => (typeof text === "string" ? text : text.sl),
});

export function LangProvider({ children }: { children: ReactNode }) {
  // Server render is always Slovenian; the saved choice is applied after hydration.
  const [lang, setLangState] = useState<Lang>("sl");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "it" || saved === "en") setLangState(saved);
    } catch {
      // storage unavailable (private mode) — stay on Slovenian
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  const t = (text: string | Text) => (typeof text === "string" ? text : text[lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
