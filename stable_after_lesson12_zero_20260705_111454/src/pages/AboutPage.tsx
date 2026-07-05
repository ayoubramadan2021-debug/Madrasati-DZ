import { useNavigate } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";

const CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
  ".ab-root *,.ab-root *::before,.ab-root *::after{box-sizing:border-box;margin:0;padding:0}",
  ".ab-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
  ".ab-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
  ".ab-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%)}",
  ".ab-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%)}",
  ".ab-content{position:relative;z-index:2}",
  ".ab-hero{position:relative;padding:24px 20px 26px;text-align:center}",
  ".ab-back{position:absolute;top:20px;right:16px;background:var(--border-faint);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif}",
  ".ab-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:78px;height:78px;margin:8px 0 10px}",
  ".ab-logo-bg{position:absolute;inset:0;border-radius:22px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong)}",
  ".ab-logo-em{position:relative;font-size:38px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6))}",
  ".ab-title{font-size:24px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
  ".ab-sub{font-size:13px;color:var(--text-faint)}",
  ".ab-body{padding:0 16px}",
  ".ab-card{background:var(--surface-2);border:1px solid var(--border-soft);border-radius:18px;padding:20px;margin-bottom:14px;box-shadow:0 4px 16px rgba(0,0,0,.3)}",
  ".ab-card-t{font-size:16px;font-weight:800;color:var(--gold);margin-bottom:10px}",
  ".ab-card-p{font-size:14px;color:var(--text-muted);line-height:1.9}",
  ".ab-ver{text-align:center;font-size:12px;color:var(--text-faint);opacity:.7;margin-top:10px}",
].join("\n");

export default function AboutPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  return (
    <>
      <style>{CSS}</style>
      <div className="ab-root">
        <div className="ab-orb ab-ob" />
        <div className="ab-orb ab-og" />
        <div className="ab-content">
          <div className="ab-hero">
            <button className="ab-back" onClick={() => navigate(-1)}>← {t("btn_back")}</button>
            <div className="ab-logo">
              <div className="ab-logo-bg" />
              <span className="ab-logo-em">🎓</span>
            </div>
            <h1 className="ab-title">{t("app_name")}</h1>
            <div className="ab-sub">{t("ab_tagline")}</div>
          </div>

          <div className="ab-body">
            <div className="ab-card">
              <div className="ab-card-t">{t("ab_who_t")}</div>
              <div className="ab-card-p">{t("ab_who_d")}</div>
            </div>

            <div className="ab-card">
              <div className="ab-card-t">{t("ab_vision_t")}</div>
              <div className="ab-card-p">{t("ab_vision_d")}</div>
            </div>

            <div className="ab-card">
              <div className="ab-card-t">{t("ab_contact_t")}</div>
              <div className="ab-card-p">{t("ab_contact_d")}</div>
            </div>

            <div className="ab-ver">{t("version")}</div>
          </div>
        </div>
      </div>
    </>
  );
}
