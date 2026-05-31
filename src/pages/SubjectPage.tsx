import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import appData from "../data/appData";
import { useLang } from "../i18n/LanguageContext";
import { getWorlds, getMyWorldProgress } from "../services/worldsService";
import JourneyMap from "../shared/components/JourneyMap";

const SUBJECT_COLORS: Record<string, string> = {
  math: "#22C55E", arabic: "#EF4444", french: "#3B82F6",
  islamic: "#A855F7", civic: "#F97316", science: "#06B6D4",
};
const SUBJECT_GLOW: Record<string, string> = {
  math: "#16a34a", arabic: "#dc2626", french: "#2563eb",
  islamic: "#9333ea", civic: "#ea580c", science: "#0891b2",
};

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".sb-root *,.sb-root *::before,.sb-root *::after{box-sizing:border-box;margin:0;padding:0}",
".sb-root{min-height:100dvh;background:var(--bg);font-family:Tajawal,sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".sb-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".sb-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:sb-d1 14s ease-in-out infinite alternate}",
".sb-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:sb-d2 11s ease-in-out infinite alternate}",
"@keyframes sb-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes sb-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".sb-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".sb-content{position:relative;z-index:2}",
".sb-hero{position:relative;padding:24px 20px 30px;text-align:center}",
".sb-back{position:absolute;top:20px;right:16px;background:var(--border-faint);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:Tajawal,sans-serif;transition:background .2s}",
".sb-back:active{background:var(--border-soft)}",
".sb-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:88px;height:88px;margin:12px 0 14px;opacity:0;transform:scale(.7);transition:opacity .7s cubic-bezier(.34,1.56,.64,1),transform .7s cubic-bezier(.34,1.56,.64,1)}",
".sb-logo.in{opacity:1;transform:scale(1)}",
".sb-logo-bg{position:absolute;inset:0;border-radius:26px;border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong),inset 0 1px 0 var(--border-soft)}",
".sb-logo-em{position:relative;font-size:44px;filter:drop-shadow(0 0 16px rgba(0,0,0,.4))}",
".sb-title{font-size:28px;font-weight:900;line-height:1;margin-bottom:10px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0;transform:translateY(14px);transition:opacity .6s ease .2s,transform .6s ease .2s}",
".sb-title.in{opacity:1;transform:translateY(0)}",
".sb-badge{display:inline-block;background:rgba(255,255,255,.07);border:1px solid var(--border);padding:5px 16px;border-radius:20px;font-size:12px;color:var(--text-muted);font-weight:600;opacity:0;transition:opacity .6s ease .35s}",
".sb-badge.in{opacity:1}",
].join("\n");

export default function SubjectPage() {
  const { t, lang } = useLang();
  const { gradeId, subject } = useParams();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [worlds, setWorlds] = useState<any[]>([]);
  const [lockedOpen, setLockedOpen] = useState(false);
  const [progress, setProgress] = useState<any[]>([]);

  const currentSubject = (appData.subjects || []).find((s: any) => s.slug === subject);
  const color = SUBJECT_COLORS[subject || ""] || "var(--gold)";
  const glow = SUBJECT_GLOW[subject || ""] || "var(--gold-deep)";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!subject || !gradeId) return;
    getWorlds(subject, Number(gradeId))
      .then((data) => setWorlds(data));
    getMyWorldProgress()
      .then((p) => setProgress(p))
      .catch(() => {})
  }, [subject, gradeId]);

  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS}</style>
      <div className="sb-root">
        <div className="sb-orb sb-ob" />
        <div className="sb-orb sb-og" />
        <div className="sb-grid" />
        <div className="sb-content">
          <div className="sb-hero">
            <button className="sb-back" onClick={() => navigate(`/grade/${gradeId}`)}>← {t("btn_back")}</button>
            <div className={cx("sb-logo", mounted && "in")}>
              <div className="sb-logo-bg" style={{ background: "linear-gradient(145deg," + color + "33," + glow + "22)" }} />
              <span className="sb-logo-em">{currentSubject?.icon || "📘"}</span>
            </div>
            <h1 className={cx("sb-title", mounted && "in")}>{currentSubject ? t(("subj_" + currentSubject.slug) as any) : subject}</h1>
            <div className={cx("sb-badge", mounted && "in")}>{t("sb_year_badge")} {gradeId} {t("sb_primary")}</div>
          </div>
          <JourneyMap
            worlds={worlds}
            progress={progress}
            lang={lang}
            onOpen={(id) => navigate(`/world/${id}`)}
            onLocked={() => setLockedOpen(true)}
          />
        </div>
        {lockedOpen && (
          <div
            onClick={() => setLockedOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", zIndex: 100, padding: 20 }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ background: "var(--surface)", border: "1px solid rgba(232,160,32,.35)", borderRadius: 24, padding: "32px 26px", maxWidth: 340, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,.5)", fontFamily: "Tajawal,sans-serif", direction: "rtl" }}
            >
              <div style={{ fontSize: 56, marginBottom: 14 }}>🔒</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text)", marginBottom: 10 }}>هذا العالم مقفل</div>
              <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 24 }}>أكمل العالم السابق أولاً لتفتح مغامرة جديدة! 💪</div>
              <button
                onClick={() => setLockedOpen(false)}
                style={{ width: "100%", padding: 14, border: "none", borderRadius: 14, background: "linear-gradient(135deg,var(--gold),var(--gold-deep))", color: "#000", fontFamily: "Tajawal,sans-serif", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 18px rgba(232,160,32,.35)" }}
              >
                حسناً 👍
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
