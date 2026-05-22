import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import appData from "../data/appData";
import { useLanguage } from "../i18n/LanguageContext";

const SUBJECT_COLORS: Record<string, string> = {
  math:    "#22C55E",
  arabic:  "#EF4444",
  french:  "#3B82F6",
  islamic: "#A855F7",
  civic:   "#F97316",
  science: "#06B6D4",
};
const SUBJECT_GLOW: Record<string, string> = {
  math:    "#16a34a",
  arabic:  "#dc2626",
  french:  "#2563eb",
  islamic: "#9333ea",
  civic:   "#ea580c",
  science: "#0891b2",
};
const FALLBACK = ["#22C55E","#EF4444","#3B82F6","#A855F7","#F97316","#06B6D4","var(--gold)","#1B3A6B"];
const FALLBACK_GLOW = ["#16a34a","#dc2626","#2563eb","#9333ea","#ea580c","#0891b2","var(--gold-deep)","#0f2444"];

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".gr-root *,.gr-root *::before,.gr-root *::after{box-sizing:border-box;margin:0;padding:0}",
".gr-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".gr-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".gr-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:gr-d1 14s ease-in-out infinite alternate}",
".gr-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:gr-d2 11s ease-in-out infinite alternate}",
"@keyframes gr-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes gr-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".gr-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".gr-content{position:relative;z-index:2}",
".gr-hero{position:relative;padding:24px 20px 30px;text-align:center}",
".gr-back{position:absolute;top:20px;right:16px;background:var(--border-faint);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;text-decoration:none;transition:background .2s}",
".gr-back:active{background:var(--border-soft)}",
".gr-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:84px;height:84px;margin:12px 0 14px;opacity:0;transform:scale(.7);transition:opacity .7s cubic-bezier(.34,1.56,.64,1),transform .7s cubic-bezier(.34,1.56,.64,1)}",
".gr-logo.in{opacity:1;transform:scale(1)}",
".gr-logo-bg{position:absolute;inset:0;border-radius:26px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong),inset 0 1px 0 var(--border-soft)}",
".gr-logo-em{position:relative;font-size:42px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6));animation:gr-bob 4s ease-in-out infinite}",
"@keyframes gr-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}",
".gr-title{font-size:28px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0;transform:translateY(14px);transition:opacity .6s ease .2s,transform .6s ease .2s}",
".gr-title.in{opacity:1;transform:translateY(0)}",
".gr-sub{font-size:13px;color:var(--text-faint);opacity:0;transition:opacity .6s ease .35s}",
".gr-sub.in{opacity:1}",
".gr-list{padding:0 16px;display:flex;flex-direction:column;gap:12px}",
".gr-card{position:relative;border-radius:20px;overflow:hidden;text-decoration:none;display:block;animation:gr-slide .5s ease backwards;transition:transform .2s ease}",
".gr-card:active{transform:scale(.98)}",
"@keyframes gr-slide{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}",
".gr-card-bg{position:absolute;inset:0;background:var(--surface-2);border:1px solid var(--border-soft);border-radius:20px}",
".gr-strip{position:absolute;right:0;top:0;bottom:0;width:5px;border-radius:0 20px 20px 0}",
".gr-card-in{position:relative;padding:18px 18px 18px 20px;display:flex;align-items:center;gap:14px}",
".gr-ic{width:56px;height:56px;border-radius:16px;display:grid;place-items:center;font-size:28px;flex-shrink:0}",
".gr-tx{flex:1;min-width:0}",
".gr-nm{font-size:18px;font-weight:800;color:var(--text);display:block;margin-bottom:3px}",
".gr-ds{font-size:12px;color:var(--text-faint)}",
".gr-ar{width:36px;height:36px;border-radius:11px;background:var(--surface-soft);display:grid;place-items:center;flex-shrink:0;font-size:16px;color:var(--text-faint)}",
].join("\n");

export default function GradePage() {
  const { t } = useLanguage() || { t: {} as any };
  const { gradeId: id } = useParams();
  const grade = appData.grades.find((g: any) => String(g.id) === String(id));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const tm = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(tm);
  }, []);

  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS}</style>
      <div className="gr-root">
        <div className="gr-orb gr-ob" />
        <div className="gr-orb gr-og" />
        <div className="gr-grid" />

        <div className="gr-content">
          <div className="gr-hero">
            <Link to="/" className="gr-back">← رجوع</Link>
            <div className={cx("gr-logo", mounted && "in")}>
              <div className="gr-logo-bg" />
              <span className="gr-logo-em">🎒</span>
            </div>
            <h1 className={cx("gr-title", mounted && "in")}>{grade ? grade.name : `السنة ${id}`}</h1>
            <div className={cx("gr-sub", mounted && "in")}>اختر المادة التي تريد تعلمها</div>
          </div>

          <div className="gr-list">
            {(appData.subjects || []).map((subject: any, i: number) => {
              const color = SUBJECT_COLORS[subject.slug] || FALLBACK[i % FALLBACK.length];
              const glow = SUBJECT_GLOW[subject.slug] || FALLBACK_GLOW[i % FALLBACK_GLOW.length];
              return (
                <Link
                  key={subject.slug}
                  to={`/grade/${id}/subject/${subject.slug}`}
                  className="gr-card"
                  style={{ animationDelay: (0.4 + i * 0.08) + "s", boxShadow: "0 4px 20px rgba(0,0,0,.35)" }}
                >
                  <div className="gr-card-bg" />
                  <div className="gr-strip" style={{ background: "linear-gradient(180deg," + color + "," + glow + ")" }} />
                  <div className="gr-card-in">
                    <div className="gr-ic" style={{ background: "linear-gradient(145deg," + color + "22," + color + "10)", border: "1px solid " + color + "30" }}>
                      {subject.icon}
                    </div>
                    <div className="gr-tx">
                      <span className="gr-nm">{subject.name}</span>
                      <span className="gr-ds">دروس وتمارين هذه السنة</span>
                    </div>
                    <div className="gr-ar">←</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
