import { useLang } from "../store/langStore";

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      style={{ position: "absolute", top: 10, right: 10 }}
    >
      {lang === "ar" ? "EN" : "AR"}
    </button>
  );
}
