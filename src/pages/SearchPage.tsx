import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".se-root *,.se-root *::before,.se-root *::after{box-sizing:border-box;margin:0;padding:0}",
".se-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".se-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".se-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:se-d1 14s ease-in-out infinite alternate}",
".se-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:se-d2 11s ease-in-out infinite alternate}",
"@keyframes se-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes se-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".se-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".se-content{position:relative;z-index:2}",
".se-hero{position:relative;padding:24px 20px 20px;text-align:center}",
".se-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:76px;height:76px;margin:8px 0 10px}",
".se-logo-bg{position:absolute;inset:0;border-radius:22px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong)}",
".se-logo-em{position:relative;font-size:36px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6))}",
".se-title{font-size:24px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
".se-sub{font-size:13px;color:var(--text-faint)}",
".se-search-wrap{padding:0 16px;margin-bottom:18px}",
".se-search{width:100%;padding:15px 18px;border-radius:16px;border:1.5px solid var(--border);background:var(--surface-softer);color:var(--text);font-family:'Tajawal',sans-serif;font-size:15px;outline:none;transition:border-color .2s}",
".se-search::placeholder{color:var(--text-dim)}",
".se-search:focus{border-color:rgba(232,160,32,.5)}",
".se-body{padding:0 16px}",
".se-state{text-align:center;padding:40px 20px;color:var(--text-faint);font-size:14px}",
".se-sec{display:flex;align-items:center;gap:10px;margin:18px 0 12px}",
".se-sec-bar{width:4px;height:20px;border-radius:4px}",
".se-sec-t{font-size:16px;font-weight:800;color:#fff}",
".se-sec-c{margin-right:auto;background:var(--border-faint);color:var(--text-muted);border-radius:20px;padding:2px 12px;font-size:12px;font-weight:700}",
".se-item{display:block;text-decoration:none;position:relative;background:var(--surface-2);border:1px solid var(--border-soft);border-radius:14px;padding:14px 16px;margin-bottom:10px;overflow:hidden;animation:se-slide .4s ease backwards;transition:transform .2s}",
".se-item:active{transform:scale(.98)}",
"@keyframes se-slide{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}",
".se-item-strip{position:absolute;right:0;top:0;bottom:0;width:4px;border-radius:0 14px 14px 0}",
".se-item-t{font-weight:700;color:var(--text);font-size:14px;margin-bottom:3px}",
".se-item-d{color:var(--text-faint);font-size:12px;line-height:1.5}",
].join("\n");

function SearchPage() {
  const [query, setQuery] = useState("");
  const [lessons, setLessons] = useState<any[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadContent(); }, []);

  async function loadContent() {
    setLoading(true);
    try {
      const { supabase } = await import("../lib/supabaseClient");
      const { data: ls } = await supabase.from("lessons").select("*");
      const { data: ex } = await supabase.from("exercises").select("*");
      setLessons(ls || []);
      setExercises(ex || []);
    } catch (e) {}
    setLoading(false);
  }

  const cleanQuery = query.trim().toLowerCase();

  const filteredLessons = lessons.filter((lesson) =>
    `${lesson.title} ${lesson.content} ${lesson.subject} ${lesson.grade}`.toLowerCase().includes(cleanQuery)
  );

  const filteredExercises = exercises.filter((exercise) =>
    `${exercise.title} ${exercise.question} ${exercise.subject} ${exercise.grade}`.toLowerCase().includes(cleanQuery)
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="se-root">
        <div className="se-orb se-ob" /><div className="se-orb se-og" /><div className="se-grid" />
        <div className="se-content">
          <div className="se-hero">
            <div className="se-logo">
              <div className="se-logo-bg" />
              <span className="se-logo-em">🔎</span>
            </div>
            <h1 className="se-title">البحث</h1>
            <div className="se-sub">ابحث عن درس أو تمرين داخل المنصة</div>
          </div>

          <div className="se-search-wrap">
            <input
              className="se-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="اكتب كلمة البحث..."
            />
          </div>

          <div className="se-body">
            {loading ? (
              <div className="se-state">⏳ جاري تحميل المحتوى...</div>
            ) : !query ? (
              <div className="se-state">اكتب في مربع البحث لعرض النتائج 🔍</div>
            ) : (
              <>
                {/* الدروس */}
                <div className="se-sec">
                  <div className="se-sec-bar" style={{ background: "linear-gradient(180deg,#3B82F6,#2563eb)" }} />
                  <div className="se-sec-t">📖 الدروس</div>
                  <div className="se-sec-c">{filteredLessons.length}</div>
                </div>
                {filteredLessons.length === 0 ? (
                  <div className="se-state">لا توجد دروس مطابقة</div>
                ) : (
                  filteredLessons.map((lesson, i) => (
                    <Link
                      key={lesson.id}
                      to={`/lesson/${lesson.id}`}
                      className="se-item"
                      style={{ animationDelay: (i * 0.05) + "s" }}
                    >
                      <div className="se-item-strip" style={{ background: "linear-gradient(180deg,#3B82F6,#2563eb)" }} />
                      <div className="se-item-t">{lesson.title}</div>
                      <div className="se-item-d">المادة: {lesson.subject} | السنة: {lesson.grade}</div>
                    </Link>
                  ))
                )}

                {/* التمارين */}
                <div className="se-sec">
                  <div className="se-sec-bar" style={{ background: "linear-gradient(180deg,var(--gold),var(--gold-deep))" }} />
                  <div className="se-sec-t">✍️ التمارين</div>
                  <div className="se-sec-c">{filteredExercises.length}</div>
                </div>
                {filteredExercises.length === 0 ? (
                  <div className="se-state">لا توجد تمارين مطابقة</div>
                ) : (
                  filteredExercises.map((exercise, i) => (
                    <Link
                      key={exercise.id}
                      to={`/exercise/${exercise.id}`}
                      className="se-item"
                      style={{ animationDelay: (i * 0.05) + "s" }}
                    >
                      <div className="se-item-strip" style={{ background: "linear-gradient(180deg,var(--gold),var(--gold-deep))" }} />
                      <div className="se-item-t">{exercise.title}</div>
                      <div className="se-item-d">{exercise.question}</div>
                    </Link>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
