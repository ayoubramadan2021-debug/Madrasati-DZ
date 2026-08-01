import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ar } from "./ar";
import { fr } from "./fr";
import type { TranslationKeys } from "./ar";

type Lang = "ar" | "fr";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: TranslationKeys) => string;
  dir: "rtl" | "ltr";
};

const dictionaries: Record<Lang, Record<TranslationKeys, string>> = { ar, fr };

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): Lang {
  try {
    const saved = localStorage.getItem("app_lang");
    if (saved === "ar" || saved === "fr") return saved;
  } catch {
    /* تجاهل */
  }
  return "ar";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    try {
      localStorage.setItem("app_lang", lang);
    } catch {
      /* تجاهل */
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (l: Lang) => setLangState(l);
  const toggleLang = () => setLangState((p) => (p === "ar" ? "fr" : "ar"));
  const t = (key: TranslationKeys) => dictionaries[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}

// اسم بديل للتوافق مع الصفحات القديمة
export const useLanguage = useLang;
