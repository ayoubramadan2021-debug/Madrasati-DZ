import { createContext, useContext, useEffect, useState } from "react";
import { getTranslation } from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("app_language") || "ar"
  );

  useEffect(() => {
    localStorage.setItem("app_language", language);

    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = language;
  }, [language]);

  const t = getTranslation(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
