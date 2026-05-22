import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { getCurrentUser } from "../services/authService";
import { getProfile } from "../services/profileService";

const TABS = ["الدروس", "التلاميذ", "الإحصائيات"];
const SUBJECTS = ["math", "arabic", "french", "islamic", "civic", "science"];

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".ad-root *,.ad-root *::before,.ad-root *::after{box-sizing:border-box;margin:0;padding:0}",
".ad-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".ad-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".ad-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:ad-d1 14s ease-in-out infinite alternate}",
".ad-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:ad-d2 11s ease-in-out infinite alternate}",
"@keyframes ad-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes ad-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".ad-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".ad-content{position:relative;z-index:2}",
".ad-hero{position:relative;padding:24px 20px 22px;text-align:center}",
".ad-back{position:absolute;top:20px;right:16px;background:var(--border-faint);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif}",
".ad-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:78px;height:78px;margin:8px 0 10px}",
".ad-logo-bg{position:absolute;inset:0;border-radius:22px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong)}",
".ad-logo-em{position:relative;font-size:38px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6))}",
".ad-title{font-size:23px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
".ad-sub{font-size:13px;color:var(--text-faint)}",
".ad-body{padding:0 16px}",
".ad-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}",
".ad-stat{background:var(--surface-2);border:1px solid var(--border-soft);border-radius:14px;padding:14px 8px;text-align:center;box-shadow:0 4px 16px rgba(0,0,0,.3)}",
".ad-stat-em{font-size:22px;margin-bottom:4px}",
".ad-stat-n{font-size:22px;font-weight:900;line-height:1}",
".ad-stat-l{font-size:11px;color:var(--text-muted);margin-top:4px}",
".ad-tabs{display:grid;grid-template-columns:repeat(3,1fr);background:var(--surface-softer);border:1px solid var(--border-soft);border-radius:14px;padding:4px;margin-bottom:16px;gap:4px}",
".ad-tab{padding:11px 4px;border:none;border-radius:10px;background:transparent;color:var(--text-muted);font-family:'Tajawal',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s}",
".ad-tab.active{background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;box-shadow:0 4px 12px rgba(232,160,32,.3)}",
".ad-card{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:20px;margin-bottom:14px;box-shadow:var(--shadow-hero)}",
".ad-card-t{font-weight:800;color:var(--gold);font-size:16px;margin-bottom:14px}",
".ad-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}",
".ad-label{font-size:12px;font-weight:600;color:var(--text-muted);display:block;margin-bottom:5px}",
".ad-input{width:100%;padding:11px 14px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface-softer);color:var(--text);font-family:'Tajawal',sans-serif;font-size:14px;outline:none;direction:rtl;transition:border-color .2s}",
".ad-input:focus{border-color:rgba(232,160,32,.5)}",
".ad-input::placeholder{color:var(--text-dim)}",
".ad-input option{background:#0c1322;color:#fff}",
".ad-msg{padding:10px 14px;border-radius:10px;font-size:13px;margin-bottom:10px;text-align:center;font-weight:600}",
".ad-add{width:100%;padding:13px;border:none;border-radius:12px;font-family:'Tajawal',sans-serif;font-size:14px;font-weight:800;transition:transform .15s}",
".ad-add:active{transform:scale(.97)}",
".ad-sec{display:flex;align-items:center;gap:8px;margin-bottom:12px}",
".ad-sec-bar{width:4px;height:20px;border-radius:4px;background:linear-gradient(180deg,var(--gold),var(--gold-deep))}",
".ad-sec-t{font-size:16px;font-weight:800;color:#fff}",
".ad-list{display:flex;flex-direction:column;gap:10px}",
".ad-item{background:var(--surface-2);border:1px solid var(--border-soft);border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:12px;box-shadow:0 4px 14px rgba(0,0,0,.3)}",
".ad-item-main{flex:1;min-width:0}",
".ad-item-t{font-weight:700;color:var(--text);font-size:14px}",
".ad-item-s{color:var(--text-muted);font-size:12px;margin-top:2px}",
".ad-del{width:32px;height:32px;border-radius:50%;background:rgba(239,68,68,.15);color:#f87171;border:none;cursor:pointer;font-size:15px;flex-shrink:0}",
".ad-rank{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.3);color:var(--gold);display:grid;place-items:center;font-weight:800;flex-shrink:0;font-size:14px}",
".ad-pts{font-weight:900;color:var(--gold);font-size:15px;flex-shrink:0}",
".ad-empty{text-align:center;padding:30px;color:var(--text-faint);font-size:14px}",
".ad-statgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}",
".ad-statbox{background:var(--surface-softer);border:1px solid var(--border-soft);border-radius:14px;padding:18px;text-align:center}",
".ad-statbox-n{font-size:26px;font-weight:900;line-height:1}",
".ad-statbox-l{color:var(--text-muted);font-size:12px;margin-top:6px}",
].join("\n");

export default function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [stats, setStats] = useState({ lessons: 0, students: 0, progress: 0 });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("math");
  const [grade, setGrade] = useState("1");
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      if (!u) { setAuthorized(false); return; }
      const prof = await getProfile(u.id);
      if (prof?.role === "admin") { setAuthorized(true); loadData(); }
      else { setAuthorized(false); }
    })();
  }, []);

  async function loadData() {
    setLoading(true);
    const [l, s, p] = await Promise.all([
      supabase.from("lessons").select("*").order("created_at", { ascending: false }).limit(20),
      supabase.from("profiles").select("*").order("points", { ascending: false }).limit(20),
      supabase.from("progress").select("id", { count: "exact" }),
    ]);
    setLessons(l.data || []);
    setStudents(s.data || []);
    setStats({ lessons: l.data?.length || 0, students: s.data?.length || 0, progress: (p as any).count || 0 });
    setLoading(false);
  }

  async function addLesson() {
    if (!title.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("lessons").insert([{ title, subject, grade: Number(grade), content, is_published: true }]);
    if (error) { setMsg("❌ " + error.message); }
    else { setMsg("✅ تم إضافة الدرس!"); setTitle(""); setContent(""); loadData(); }
    setLoading(false);
    setTimeout(() => setMsg(""), 3000);
  }

  async function deleteLesson(id: string) {
    if (!confirm("هل تريد حذف هذا الدرس؟")) return;
    await supabase.from("lessons").delete().eq("id", id);
    setLessons(prev => prev.filter(l => l.id !== id));
  }

  const statCards = [
    { label: "الدروس", value: stats.lessons, icon: "📖", color: "#3B82F6" },
    { label: "التلاميذ", value: stats.students, icon: "👦", color: "#22C55E" },
    { label: "النشاط", value: stats.progress, icon: "📊", color: "var(--gold)" },
  ];

  if (authorized === null) {
    return (<div style={{ minHeight: "100dvh", background: "var(--bg)", color: "var(--gold)", display: "grid", placeItems: "center", fontFamily: "Tajawal, sans-serif", fontSize: 16 }}>⏳ جاري التحقق...</div>);
  }
  if (authorized === false) {
    return (<div style={{ minHeight: "100dvh", background: "var(--bg)", color: "#fff", display: "grid", placeItems: "center", textAlign: "center", padding: 30, fontFamily: "Tajawal, sans-serif", direction: "rtl" }}><div><div style={{ fontSize: 60, marginBottom: 16 }}>🔒</div><div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>غير مصرّح لك</div><div style={{ color: "var(--text-muted)", fontSize: 14 }}>هذه الصفحة مخصّصة للإدارة فقط</div><button onClick={() => navigate("/")} style={{ marginTop: 20, padding: "12px 24px", border: "none", borderRadius: 12, background: "linear-gradient(135deg,var(--gold),var(--gold-deep))", color: "#000", fontFamily: "Tajawal, sans-serif", fontWeight: 800, fontSize: 14 }}>العودة للرئيسية</button></div></div>);
  }

  if (authorized === null) {
    return (<div style={{ minHeight: "100dvh", background: "var(--bg)", color: "var(--gold)", display: "grid", placeItems: "center", fontFamily: "Tajawal, sans-serif", fontSize: 16 }}>⏳ جاري التحقق...</div>);
  }
  if (authorized === false) {
    return (<div style={{ minHeight: "100dvh", background: "var(--bg)", color: "#fff", display: "grid", placeItems: "center", textAlign: "center", padding: 30, fontFamily: "Tajawal, sans-serif", direction: "rtl" }}><div><div style={{ fontSize: 60, marginBottom: 16 }}>🔒</div><div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>غير مصرّح لك</div><div style={{ color: "var(--text-muted)", fontSize: 14 }}>هذه الصفحة مخصّصة للإدارة فقط</div><button onClick={() => navigate("/")} style={{ marginTop: 20, padding: "12px 24px", border: "none", borderRadius: 12, background: "linear-gradient(135deg,var(--gold),var(--gold-deep))", color: "#000", fontFamily: "Tajawal, sans-serif", fontWeight: 800, fontSize: 14 }}>العودة للرئيسية</button></div></div>);
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="ad-root">
        <div className="ad-orb ad-ob" /><div className="ad-orb ad-og" /><div className="ad-grid" />
        <div className="ad-content">
          <div className="ad-hero">
            <button className="ad-back" onClick={() => navigate("/")}>← رجوع</button>
            <div className="ad-logo">
              <div className="ad-logo-bg" />
              <span className="ad-logo-em">🧑‍🏫</span>
            </div>
            <h1 className="ad-title">لوحة الإدارة</h1>
            <div className="ad-sub">إدارة المحتوى والتلاميذ</div>
          </div>

          <div className="ad-body">
            <div className="ad-stats">
              {statCards.map((s, i) => (
                <div key={i} className="ad-stat" style={{ borderTop: "3px solid " + s.color }}>
                  <div className="ad-stat-em">{s.icon}</div>
                  <div className="ad-stat-n" style={{ color: s.color }}>{s.value}</div>
                  <div className="ad-stat-l">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="ad-tabs">
              {TABS.map((t, i) => (
                <button key={i} className={"ad-tab" + (tab === i ? " active" : "")} onClick={() => setTab(i)}>{t}</button>
              ))}
            </div>

            {/* الدروس */}
            {tab === 0 && (
              <>
                <div className="ad-card">
                  <div className="ad-card-t">➕ درس جديد</div>
                  <div className="ad-row2">
                    <div>
                      <label className="ad-label">المادة</label>
                      <select className="ad-input" value={subject} onChange={e => setSubject(e.target.value)}>
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="ad-label">السنة</label>
                      <select className="ad-input" value={grade} onChange={e => setGrade(e.target.value)}>
                        {[1, 2, 3, 4, 5].map(g => <option key={g} value={String(g)}>السنة {g}</option>)}
                      </select>
                    </div>
                  </div>
                  <input className="ad-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="عنوان الدرس" style={{ marginBottom: 10 }} />
                  <textarea className="ad-input" value={content} onChange={e => setContent(e.target.value)} placeholder="محتوى الدرس..." rows={3} style={{ marginBottom: 10, resize: "vertical" }} />
                  {msg && <div className="ad-msg" style={{ background: msg.includes("✅") ? "rgba(34,197,94,.15)" : "rgba(239,68,68,.15)", color: msg.includes("✅") ? "#4ade80" : "#f87171" }}>{msg}</div>}
                  <button className="ad-add" onClick={addLesson} disabled={!title.trim() || loading}
                    style={{ background: title.trim() ? "linear-gradient(135deg,var(--gold),var(--gold-deep))" : "var(--border)", color: title.trim() ? "#000" : "var(--text-faint)", cursor: title.trim() ? "pointer" : "default" }}>
                    {loading ? "جاري الإضافة..." : "إضافة الدرس ✓"}
                  </button>
                </div>

                <div className="ad-sec">
                  <div className="ad-sec-bar" />
                  <div className="ad-sec-t">الدروس ({lessons.length})</div>
                </div>
                <div className="ad-list">
                  {lessons.map(l => (
                    <div key={l.id} className="ad-item">
                      <div className="ad-item-main">
                        <div className="ad-item-t">{l.title}</div>
                        <div className="ad-item-s">{l.subject} — السنة {l.grade}</div>
                      </div>
                      <button className="ad-del" onClick={() => deleteLesson(l.id)}>✕</button>
                    </div>
                  ))}
                  {lessons.length === 0 && <div className="ad-empty">لا توجد دروس بعد</div>}
                </div>
              </>
            )}

            {/* التلاميذ */}
            {tab === 1 && (
              <div className="ad-list">
                {students.map((s, i) => (
                  <div key={s.id} className="ad-item">
                    <div className="ad-rank">{i + 1}</div>
                    <div className="ad-item-main">
                      <div className="ad-item-t">{s.full_name || "تلميذ"}</div>
                      <div className="ad-item-s">السنة {s.grade}</div>
                    </div>
                    <div className="ad-pts">{s.points || 0} نقطة</div>
                  </div>
                ))}
                {students.length === 0 && <div className="ad-empty">لا يوجد تلاميذ بعد</div>}
              </div>
            )}

            {/* الإحصائيات */}
            {tab === 2 && (
              <div className="ad-card">
                <div style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}>📊</div>
                <div className="ad-statgrid">
                  {[
                    { label: "إجمالي الدروس", value: stats.lessons, color: "#3B82F6" },
                    { label: "إجمالي التلاميذ", value: stats.students, color: "#22C55E" },
                    { label: "إجمالي النشاط", value: stats.progress, color: "var(--gold)" },
                    { label: "متوسط النشاط", value: stats.students ? Math.round(stats.progress / stats.students) : 0, color: "#a855f7" },
                  ].map((s, i) => (
                    <div key={i} className="ad-statbox">
                      <div className="ad-statbox-n" style={{ color: s.color }}>{s.value}</div>
                      <div className="ad-statbox-l">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
