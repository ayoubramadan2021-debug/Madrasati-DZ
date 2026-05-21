import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLessons } from "../services/lessonService";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".ls-root *,.ls-root *::before,.ls-root *::after{box-sizing:border-box;margin:0;padding:0}",
".ls-root{min-height:100dvh;background:#07101f;font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".ls-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".ls-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:ls-d1 14s ease-in-out infinite alternate}",
".ls-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:ls-d2 11s ease-in-out infinite alternate}",
"@keyframes ls-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes ls-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".ls-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".ls-content{position:relative;z-index:2}",
".ls-hero{position:relative;padding:24px 20px 28px;text-align:center}",
".ls-back{position:absolute;top:20px;right:16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.8);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;transition:background .2s}",
".ls-back:active{background:rgba(255,255,255,.12)}",
".ls-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;margin:12px 0 12px;opacity:0;transform:scale(.7);transition:opacity .7s cubic-bezier(.34,1.56,.64,1),transform .7s cubic-bezier(.34,1.56,.64,1)}",
".ls-logo.in{opacity:1;transform:scale(1)}",
".ls-logo-bg{position:absolute;inset:0;border-radius:24px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:0 8px 32px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.08)}",
".ls-logo-em{position:relative;font-size:40px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6));animation:ls-bob 4s ease-in-out infinite}",
"@keyframes ls-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}",
".ls-title{font-size:26px;font-weight:900;line-height:1;background:linear-gradient(135deg,#fff 25%,#E8A020 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0;transform:translateY(14px);transition:opacity .6s ease .2s,transform .6s ease .2s}",
".ls-title.in{opacity:1;transform:translateY(0)}",
".ls-body{padding:0 16px}",
".ls-state{text-align:center;padding:50px 20px;color:rgba(255,255,255,.5);font-size:15px}",
".ls-list{display:flex;flex-direction:column;gap:12px}",
".ls-card{position:relative;background:linear-gradient(135deg,rgba(15,25,45,.96),rgba(10,16,30,.98));border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:18px;box-shadow:0 6px 22px rgba(0,0,0,.3);overflow:hidden;animation:ls-slide .5s ease backwards}",
"@keyframes ls-slide{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}",
".ls-card-strip{position:absolute;right:0;top:0;bottom:0;width:4px;border-radius:0 18px 18px 0;background:linear-gradient(180deg,#E8A020,#c97d0a)}",
".ls-num{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:9px;background:rgba(232,160,32,.12);color:#E8A020;font-weight:800;font-size:13px;margin-bottom:8px}",
".ls-card-t{color:#fff;font-size:17px;font-weight:800;margin-bottom:6px}",
".ls-card-c{color:rgba(255,255,255,.5);font-size:13px;line-height:1.7}",
".ls-btns{display:flex;gap:10px;margin-top:14px}",
".ls-open{flex:1;padding:13px;border-radius:13px;border:none;background:linear-gradient(135deg,#E8A020,#c97d0a);color:#000;font-family:'Tajawal',sans-serif;font-weight:800;font-size:14px;cursor:pointer;box-shadow:0 4px 14px rgba(232,160,32,.3);transition:transform .15s}",
".ls-open:active{transform:scale(.97)}",
".ls-quiz{flex:1;padding:13px;border-radius:13px;border:1.5px solid rgba(168,85,247,.5);background:rgba(168,85,247,.12);color:#c084fc;font-family:'Tajawal',sans-serif;font-weight:800;font-size:14px;cursor:pointer;transition:transform .15s,background .2s}",
".ls-quiz:active{transform:scale(.97);background:rgba(168,85,247,.2)}",
].join("\n");

export default function LessonPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!subjectId) return;
    setLoading(true);
    getLessons(subjectId)
      .then((data) => setLessons(data || []))
      .finally(() => setLoading(false));
  }, [subjectId]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS}</style>
      <div className="ls-root">
        <div className="ls-orb ls-ob" />
        <div className="ls-orb ls-og" />
        <div className="ls-grid" />

        <div className="ls-content">
          <div className="ls-hero">
            <button className="ls-back" onClick={() => navigate(-1)}>← رجوع</button>
            <div className={cx("ls-logo", mounted && "in")}>
              <div className="ls-logo-bg" />
              <span className="ls-logo-em">📚</span>
            </div>
            <h1 className={cx("ls-title", mounted && "in")}>الدروس</h1>
          </div>

          <div className="ls-body">
            {loading ? (
              <div className="ls-state">⏳ جاري التحميل...</div>
            ) : lessons.length === 0 ? (
              <div className="ls-state">📭 لا توجد دروس</div>
            ) : (
              <div className="ls-list">
                {lessons.map((l, i) => (
                  <div key={l.id} className="ls-card" style={{ animationDelay: (0.3 + i * 0.07) + "s" }}>
                    <div className="ls-card-strip" />
                    <div className="ls-num">{i + 1}</div>
                    <div className="ls-card-t">{l.title}</div>
                    <div className="ls-card-c">{l.content}</div>
                    <div className="ls-btns">
                      <button className="ls-open" onClick={() => navigate(`/lesson/${l.id}`)}>فتح الدرس ←</button>
                      <button className="ls-quiz" onClick={() => navigate(`/quiz/${l.id}`)}>الاختبار 🧠</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
