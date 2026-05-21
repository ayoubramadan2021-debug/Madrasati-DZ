import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import appData from "../data/appData";

const SUBJECT_COLORS: Record<string, string> = {
  math: "#22C55E", arabic: "#EF4444", french: "#3B82F6",
  islamic: "#A855F7", civic: "#F97316", science: "#06B6D4",
};
const SUBJECT_GLOW: Record<string, string> = {
  math: "#16a34a", arabic: "#dc2626", french: "#2563eb",
  islamic: "#9333ea", civic: "#ea580c", science: "#0891b2",
};

const SECTIONS = [
  { slug: "lessons",   icon: "📖", name: "الدروس",         desc: "شروحات مبسطة حسب المستوى",     color: "#3B82F6", glow: "#2563eb" },
  { slug: "exercises", icon: "✏️", name: "التمارين",       desc: "تمارين تفاعلية مع تصحيح فوري", color: "#22C55E", glow: "#16a34a" },
  { slug: "quizzes",   icon: "📝", name: "الاختبارات",     desc: "اختبارات قصيرة لقياس الفهم",   color: "#E8A020", glow: "#c97d0a" },
  { slug: "progress",  icon: "⭐", name: "النقاط والتقدم", desc: "متابعة مستوى التلميذ",         color: "#F97316", glow: "#ea580c" },
];

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".sb-root *,.sb-root *::before,.sb-root *::after{box-sizing:border-box;margin:0;padding:0}",
".sb-root{min-height:100dvh;background:#07101f;font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".sb-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".sb-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:sb-d1 14s ease-in-out infinite alternate}",
".sb-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:sb-d2 11s ease-in-out infinite alternate}",
"@keyframes sb-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes sb-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".sb-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".sb-content{position:relative;z-index:2}",
".sb-hero{position:relative;padding:24px 20px 30px;text-align:center}",
".sb-back{position:absolute;top:20px;right:16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.8);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;transition:background .2s}",
".sb-back:active{background:rgba(255,255,255,.12)}",
".sb-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:88px;height:88px;margin:12px 0 14px;opacity:0;transform:scale(.7);transition:opacity .7s cubic-bezier(.34,1.56,.64,1),transform .7s cubic-bezier(.34,1.56,.64,1)}",
".sb-logo.in{opacity:1;transform:scale(1)}",
".sb-logo-bg{position:absolute;inset:0;border-radius:26px;border:1px solid rgba(232,160,32,.4);box-shadow:0 8px 32px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.08)}",
".sb-logo-em{position:relative;font-size:44px;filter:drop-shadow(0 0 16px rgba(0,0,0,.4))}",
".sb-title{font-size:28px;font-weight:900;line-height:1;margin-bottom:10px;background:linear-gradient(135deg,#fff 25%,#E8A020 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0;transform:translateY(14px);transition:opacity .6s ease .2s,transform .6s ease .2s}",
".sb-title.in{opacity:1;transform:translateY(0)}",
".sb-badge{display:inline-block;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);padding:5px 16px;border-radius:20px;font-size:12px;color:rgba(255,255,255,.6);font-weight:600;opacity:0;transition:opacity .6s ease .35s}",
".sb-badge.in{opacity:1}",
".sb-body{padding:0 16px;display:grid;grid-template-columns:1fr 1fr;gap:12px}",
".sb-card{position:relative;border-radius:20px;overflow:hidden;cursor:pointer;min-height:150px;animation:sb-pop .5s ease backwards;transition:transform .2s}",
".sb-card:active{transform:scale(.96)}",
"@keyframes sb-pop{from{opacity:0;transform:translateY(20px) scale(.9)}to{opacity:1;transform:translateY(0) scale(1)}}",
".sb-card-bg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(15,25,45,.96),rgba(10,16,30,.98));border:1px solid rgba(255,255,255,.08);border-radius:20px}",
".sb-card-glow{position:absolute;inset:0;border-radius:20px;opacity:.6}",
".sb-card-in{position:relative;height:100%;padding:18px 14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center}",
".sb-card-ic{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;font-size:26px}",
".sb-card-n{font-size:16px;font-weight:800;color:#fff}",
".sb-card-d{font-size:11px;color:rgba(255,255,255,.45);line-height:1.5}",
].join("\n");

export default function SubjectPage() {
  const { gradeId, subject } = useParams();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  const currentSubject = (appData.subjects || []).find((s: any) => s.slug === subject);
  const color = SUBJECT_COLORS[subject || ""] || "#E8A020";
  const glow = SUBJECT_GLOW[subject || ""] || "#c97d0a";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

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
            <button className="sb-back" onClick={() => navigate(`/grade/${gradeId}`)}>← رجوع</button>
            <div className={cx("sb-logo", mounted && "in")}>
              <div className="sb-logo-bg" style={{ background: "linear-gradient(145deg," + color + "33," + glow + "22)" }} />
              <span className="sb-logo-em">{currentSubject?.icon || "📘"}</span>
            </div>
            <h1 className={cx("sb-title", mounted && "in")}>{currentSubject?.name || subject}</h1>
            <div className={cx("sb-badge", mounted && "in")}>السنة {gradeId} ابتدائي</div>
          </div>

          <div className="sb-body">
            {SECTIONS.map((sec, i) => (
              <div
                key={sec.slug}
                className="sb-card"
                style={{ animationDelay: (0.35 + i * 0.1) + "s", boxShadow: "0 6px 22px rgba(0,0,0,.35)" }}
                onClick={() => navigate(`/grade/${gradeId}/subject/${subject}/section/${sec.slug}`)}
              >
                <div className="sb-card-bg" />
                <div className="sb-card-glow" style={{ boxShadow: "inset 0 0 30px " + sec.color + "14", borderTop: "3px solid " + sec.color, borderRadius: "20px 20px 0 0" }} />
                <div className="sb-card-in">
                  <div className="sb-card-ic" style={{ background: "linear-gradient(145deg," + sec.color + "26," + sec.color + "12)", border: "1px solid " + sec.color + "33" }}>
                    {sec.icon}
                  </div>
                  <div className="sb-card-n">{sec.name}</div>
                  <div className="sb-card-d">{sec.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
