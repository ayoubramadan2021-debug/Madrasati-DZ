import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import appData from "../data/appData";
import { getExercisesBySubject } from "../services/exerciseService";

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
".sc-root *,.sc-root *::before,.sc-root *::after{box-sizing:border-box;margin:0;padding:0}",
".sc-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".sc-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".sc-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:sc-d1 14s ease-in-out infinite alternate}",
".sc-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:sc-d2 11s ease-in-out infinite alternate}",
"@keyframes sc-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes sc-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".sc-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".sc-content{position:relative;z-index:2}",
".sc-hero{position:relative;padding:24px 20px 28px;text-align:center}",
".sc-back{position:absolute;top:20px;right:16px;background:var(--border-faint);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;transition:background .2s}",
".sc-back:active{background:var(--border-soft)}",
".sc-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;margin:12px 0 12px;opacity:0;transform:scale(.7);transition:opacity .7s cubic-bezier(.34,1.56,.64,1),transform .7s cubic-bezier(.34,1.56,.64,1)}",
".sc-logo.in{opacity:1;transform:scale(1)}",
".sc-logo-bg{position:absolute;inset:0;border-radius:24px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong),inset 0 1px 0 var(--border-soft)}",
".sc-logo-em{position:relative;font-size:38px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6));animation:sc-bob 4s ease-in-out infinite}",
"@keyframes sc-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}",
".sc-title{font-size:26px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0;transform:translateY(14px);transition:opacity .6s ease .2s,transform .6s ease .2s}",
".sc-title.in{opacity:1;transform:translateY(0)}",
".sc-sub{font-size:13px;color:var(--text-faint);opacity:0;transition:opacity .6s ease .35s}",
".sc-sub.in{opacity:1}",
".sc-body{padding:0 16px}",
".sc-list{display:flex;flex-direction:column;gap:12px}",
".sc-item{position:relative;background:var(--surface-2);border:1px solid var(--border-soft);border-radius:16px;padding:15px 16px;display:flex;align-items:center;gap:14px;cursor:pointer;overflow:hidden;animation:sc-slide .5s ease backwards;transition:transform .2s}",
".sc-item:active{transform:scale(.98)}",
"@keyframes sc-slide{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}",
".sc-item-strip{position:absolute;right:0;top:0;bottom:0;width:4px;border-radius:0 16px 16px 0}",
".sc-item-ic{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;font-size:22px;flex-shrink:0}",
".sc-item-body{flex:1;min-width:0}",
".sc-item-t{font-weight:700;color:var(--text);font-size:15px}",
".sc-item-d{color:var(--text-faint);font-size:12px;margin-top:3px}",
".sc-item-ar{width:32px;height:32px;border-radius:50%;color:var(--text);display:grid;place-items:center;font-weight:700;flex-shrink:0;font-size:14px}",
".sc-empty{text-align:center;padding:50px 20px;color:var(--text-faint)}",
".sc-empty-em{font-size:44px;margin-bottom:10px}",
].join("\n");

export default function SectionPage() {
  const { gradeId, subject, section } = useParams();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  const currentSubject = (appData.subjects || []).find((s: any) => s.slug === subject);
  const color = SUBJECT_COLORS[subject || ""] || "var(--gold)";
  const glow = SUBJECT_GLOW[subject || ""] || "var(--gold-deep)";

  const lessons   = currentSubject?.lessons   || [];
  const [exercises, setExercises] = useState<any[]>([]);
  const [exLoading, setExLoading] = useState(false);
  const quizzes   = (currentSubject as any)?.quizzes || [];

  const isLessons   = section === "lessons";
  const isExercises = section === "exercises";
  const isQuizzes   = section === "quizzes";
  const isProgress  = section === "progress";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (section !== "exercises" || !subject) return;
    setExLoading(true);
    getExercisesBySubject(subject, Number(gradeId))
      .then((data) => { console.log("EX_DEBUG:", subject, Number(gradeId), data); setExercises(data || []); })
      .catch((e) => { console.log("EX_ERROR:", e); setExercises([]); })
      .finally(() => setExLoading(false));
  }, [section, subject, gradeId]);


  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");

  const headEmoji = isLessons ? "📖" : isExercises ? "✏️" : isQuizzes ? "📝" : "⭐";
  const headTitle = isLessons ? "الدروس" : isExercises ? "التمارين" : isQuizzes ? "الاختبارات" : "النقاط والتقدم";

  return (
    <>
      <style>{CSS}</style>
      <div className="sc-root">
        <div className="sc-orb sc-ob" />
        <div className="sc-orb sc-og" />
        <div className="sc-grid" />

        <div className="sc-content">
          <div className="sc-hero">
            <button className="sc-back" onClick={() => navigate(`/grade/${gradeId}/subject/${subject}`)}>← رجوع</button>
            <div className={cx("sc-logo", mounted && "in")}>
              <div className="sc-logo-bg" />
              <span className="sc-logo-em">{headEmoji}</span>
            </div>
            <h1 className={cx("sc-title", mounted && "in")}>{headTitle}</h1>
            <div className={cx("sc-sub", mounted && "in")}>{currentSubject?.name} — السنة {gradeId} ابتدائي</div>
          </div>

          <div className="sc-body">
            {/* الدروس */}
            {isLessons && (
              <div className="sc-list">
                {lessons.length === 0 && <div className="sc-empty"><div className="sc-empty-em">📚</div><div style={{fontWeight:800,color:"var(--text)",marginBottom:4}}>الدروس قريباً!</div><div style={{fontSize:13}}>نعمل على إضافة دروس هذه المادة. عُد قريباً ✨</div></div>}
                {lessons.map((lesson: any, i: number) => (
                  <div key={lesson.id} className="sc-item" style={{ animationDelay: (0.3 + i * 0.07) + "s", boxShadow: "0 4px 18px rgba(0,0,0,.3)" }}
                    onClick={() => navigate(`/lesson/${lesson.id}`)}>
                    <div className="sc-item-strip" style={{ background: "linear-gradient(180deg," + color + "," + glow + ")" }} />
                    <div className="sc-item-ic" style={{ background: color + "22", border: "1px solid " + color + "30" }}>📖</div>
                    <div className="sc-item-body">
                      <div className="sc-item-t">{lesson.title}</div>
                      <div className="sc-item-d">{lesson.desc}</div>
                    </div>
                    <div className="sc-item-ar" style={{ background: color }}>←</div>
                  </div>
                ))}
              </div>
            )}

            {/* التمارين */}
            {isExercises && (
              <div className="sc-list">
                {exercises.length === 0 && <div className="sc-empty"><div className="sc-empty-em">✏️</div><div style={{fontWeight:800,color:"var(--text)",marginBottom:4}}>التمارين قريباً!</div><div style={{fontSize:13}}>سنضيف تمارين تفاعلية ممتعة هنا قريباً 🎯</div></div>}
                {exercises.map((ex: any, i: number) => (
                  <div key={ex.id} className="sc-item" style={{ animationDelay: (0.3 + i * 0.07) + "s", boxShadow: "0 4px 18px rgba(0,0,0,.3)" }}
                    onClick={() => navigate(`/exercise/${ex.id}`)}>
                    <div className="sc-item-strip" style={{ background: "linear-gradient(180deg,var(--gold),var(--gold-deep))" }} />
                    <div className="sc-item-ic" style={{ background: "rgba(232,160,32,.15)", border: "1px solid rgba(232,160,32,.3)" }}>✏️</div>
                    <div className="sc-item-body">
                      <div className="sc-item-t">{ex.title}</div>
                      <div className="sc-item-d">{ex.question}</div>
                    </div>
                    <div className="sc-item-ar" style={{ background: "var(--gold)" }}>←</div>
                  </div>
                ))}
              </div>
            )}

            {/* الاختبارات */}
            {isQuizzes && (
              <div className="sc-list">
                {quizzes.length === 0 && <div className="sc-empty"><div className="sc-empty-em">📝</div><div style={{fontWeight:800,color:"var(--text)",marginBottom:4}}>الاختبارات قريباً!</div><div style={{fontSize:13}}>اختبارات قصيرة لقياس فهمك ستكون متاحة قريباً 🌟</div></div>}
                {quizzes.map((q: any, i: number) => (
                  <div key={q.id || i} className="sc-item" style={{ animationDelay: (0.3 + i * 0.07) + "s", boxShadow: "0 4px 18px rgba(0,0,0,.3)" }}
                    onClick={() => navigate(`/quiz`)}>
                    <div className="sc-item-strip" style={{ background: "linear-gradient(180deg,#A855F7,#9333ea)" }} />
                    <div className="sc-item-ic" style={{ background: "rgba(168,85,247,.15)", border: "1px solid rgba(168,85,247,.3)" }}>📝</div>
                    <div className="sc-item-body">
                      <div className="sc-item-t">{q.title || `اختبار ${i + 1}`}</div>
                      <div className="sc-item-d">{q.questions?.length || 0} سؤال</div>
                    </div>
                    <div className="sc-item-ar" style={{ background: "#A855F7" }}>←</div>
                  </div>
                ))}
              </div>
            )}

            {/* النقاط والتقدم */}
            {isProgress && (
              <div className="sc-list">
                <div className="sc-item" style={{ animationDelay: "0.3s", boxShadow: "0 4px 18px rgba(0,0,0,.3)" }}
                  onClick={() => navigate("/progress")}>
                  <div className="sc-item-strip" style={{ background: "linear-gradient(180deg,#F97316,#ea580c)" }} />
                  <div className="sc-item-ic" style={{ background: "rgba(249,115,22,.15)", border: "1px solid rgba(249,115,22,.3)" }}>📊</div>
                  <div className="sc-item-body">
                    <div className="sc-item-t">عرض تقدمي الكامل</div>
                    <div className="sc-item-d">نقاطك ودروسك المكتملة</div>
                  </div>
                  <div className="sc-item-ar" style={{ background: "#F97316" }}>←</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
