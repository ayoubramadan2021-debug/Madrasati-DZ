import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  accent: "#E8A020", success: "#2E7D5E",
  error: "#C0392B", surface: "#FFFFFF",
  surface2: "#F7F9FC", text: "#1A2540",
  textMuted: "#8A97AA", border: "#D8E2F0",
  shadow: "0 2px 12px rgba(27,58,107,0.09)",
};

const TABS = ["الدروس","التلاميذ","الإحصائيات"];
const SUBJECTS = ["math","arabic","french","islamic","civic","science"];

export default function AdminPage() {
  const navigate  = useNavigate();
  const [tab, setTab]         = useState(0);
  const [lessons, setLessons] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [stats, setStats]     = useState({ lessons:0, students:0, progress:0 });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState("");
  const [title, setTitle]     = useState("");
  const [subject, setSubject] = useState("math");
  const [grade, setGrade]     = useState("1");
  const [content, setContent] = useState("");

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    const [l, s, p] = await Promise.all([
      supabase.from("lessons").select("*").order("created_at", { ascending:false }).limit(20),
      supabase.from("profiles").select("*").order("points", { ascending:false }).limit(20),
      supabase.from("progress").select("id", { count:"exact" }),
    ]);
    setLessons(l.data || []);
    setStudents(s.data || []);
    setStats({ lessons:l.data?.length||0, students:s.data?.length||0, progress:(p as any).count||0 });
    setLoading(false);
  }

  async function addLesson() {
    if (!title.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("lessons").insert([{ title, subject, grade:Number(grade), content, is_published:true }]);
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

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, paddingBottom:100 }}>

      <div style={{ background:`linear-gradient(135deg,${C.primary},${C.primaryLight})`, padding:"20px 16px 24px", borderRadius:"0 0 28px 28px", marginBottom:16 }}>
        <button onClick={() => navigate("/")} style={{ color:"white", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:12, fontFamily:"'Cairo',sans-serif" }}>← رجوع</button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:48, marginBottom:8 }}>🧑‍🏫</div>
          <h1 style={{ margin:"0 0 4px", color:"white", fontSize:22, fontWeight:800 }}>لوحة الإدارة</h1>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13 }}>إدارة المحتوى والتلاميذ</div>
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>

        {/* الإحصائيات */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
          {[
            { label:"الدروس", value:stats.lessons, icon:"📖", color:C.primary },
            { label:"التلاميذ", value:stats.students, icon:"👦", color:C.success },
            { label:"النشاط", value:stats.progress, icon:"📊", color:C.accent },
          ].map((s,i) => (
            <div key={i} style={{ background:C.surface, border:`1px solid ${C.border}`, borderTop:`3px solid ${s.color}`, borderRadius:14, padding:"12px 8px", textAlign:"center", boxShadow:C.shadow }}>
              <div style={{ fontSize:20 }}>{s.icon}</div>
              <div style={{ fontSize:20, fontWeight:900, color:s.color }}>{s.value}</div>
              <div style={{ color:C.textMuted, fontSize:11 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* التبويبات */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", background:C.surface, borderRadius:14, padding:4, marginBottom:16, boxShadow:C.shadow }}>
          {TABS.map((t,i) => (
            <button key={i} onClick={() => setTab(i)}
              style={{ padding:"10px 4px", border:"none", borderRadius:10, background:tab===i ? C.primary : "transparent", color:tab===i ? "white" : C.textMuted, fontFamily:"'Cairo',sans-serif", fontSize:13, fontWeight:700, cursor:"pointer" }}>
              {t}
            </button>
          ))}
        </div>

        {/* الدروس */}
        {tab === 0 && (
          <>
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:18, padding:20, marginBottom:14, boxShadow:C.shadow }}>
              <div style={{ fontWeight:700, color:C.text, fontSize:16, marginBottom:14 }}>➕ درس جديد</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                <div>
                  <label style={{ fontSize:12, fontWeight:600, color:C.textMuted, display:"block", marginBottom:4 }}>المادة</label>
                  <select value={subject} onChange={e => setSubject(e.target.value)}
                    style={{ width:"100%", padding:"10px", borderRadius:10, border:`1.5px solid ${C.border}`, fontFamily:"'Cairo',sans-serif", fontSize:13, outline:"none", direction:"rtl" }}>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:12, fontWeight:600, color:C.textMuted, display:"block", marginBottom:4 }}>السنة</label>
                  <select value={grade} onChange={e => setGrade(e.target.value)}
                    style={{ width:"100%", padding:"10px", borderRadius:10, border:`1.5px solid ${C.border}`, fontFamily:"'Cairo',sans-serif", fontSize:13, outline:"none", direction:"rtl" }}>
                    {[1,2,3,4,5].map(g => <option key={g} value={String(g)}>السنة {g}</option>)}
                  </select>
                </div>
              </div>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="عنوان الدرس"
                style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:`1.5px solid ${C.border}`, fontFamily:"'Cairo',sans-serif", fontSize:14, outline:"none", marginBottom:10, boxSizing:"border-box" as any, direction:"rtl" }} />
              <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="محتوى الدرس..." rows={3}
                style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:`1.5px solid ${C.border}`, fontFamily:"'Cairo',sans-serif", fontSize:14, outline:"none", marginBottom:10, resize:"none", boxSizing:"border-box" as any, direction:"rtl" }} />
              {msg && <div style={{ padding:"10px 14px", borderRadius:10, background:msg.includes("✅")?"#E8F5EF":"#FDECEA", color:msg.includes("✅")?C.success:C.error, fontSize:13, marginBottom:10, textAlign:"center" }}>{msg}</div>}
              <button onClick={addLesson} disabled={!title.trim()||loading}
                style={{ width:"100%", padding:"13px", border:"none", borderRadius:12, background:title.trim()?C.primary:C.border, color:"white", fontFamily:"'Cairo',sans-serif", fontSize:14, fontWeight:700, cursor:title.trim()?"pointer":"default" }}>
                {loading ? "جاري الإضافة..." : "إضافة الدرس ✓"}
              </button>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <div style={{ width:4, height:20, borderRadius:4, background:C.accent }} />
              <div style={{ fontSize:16, fontWeight:700, color:C.text }}>الدروس ({lessons.length})</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {lessons.map(l => (
                <div key={l.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:"14px 16px", display:"flex", alignItems:"center", gap:12, boxShadow:C.shadow }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, color:C.text, fontSize:14 }}>{l.title}</div>
                    <div style={{ color:C.textMuted, fontSize:12, marginTop:2 }}>{l.subject} — السنة {l.grade}</div>
                  </div>
                  <button onClick={() => deleteLesson(l.id)}
                    style={{ width:32, height:32, borderRadius:"50%", background:"#FDECEA", color:C.error, border:"none", cursor:"pointer", fontSize:16 }}>✕</button>
                </div>
              ))}
              {lessons.length===0 && <div style={{ textAlign:"center", padding:30, color:C.textMuted }}>لا توجد دروس بعد</div>}
            </div>
          </>
        )}

        {/* التلاميذ */}
        {tab === 1 && (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {students.map((s,i) => (
              <div key={s.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:"14px 16px", display:"flex", alignItems:"center", gap:12, boxShadow:C.shadow }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:C.primaryLight, color:"white", display:"grid", placeItems:"center", fontWeight:800, flexShrink:0 }}>{i+1}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:C.text, fontSize:14 }}>{s.full_name||"تلميذ"}</div>
                  <div style={{ color:C.textMuted, fontSize:12 }}>السنة {s.grade}</div>
                </div>
                <div style={{ fontWeight:900, color:C.accent, fontSize:15 }}>{s.points||0} نقطة</div>
              </div>
            ))}
            {students.length===0 && <div style={{ textAlign:"center", padding:30, color:C.textMuted }}>لا يوجد تلاميذ بعد</div>}
          </div>
        )}

        {/* الإحصائيات */}
        {tab === 2 && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:18, padding:24, boxShadow:C.shadow }}>
            <div style={{ fontSize:48, textAlign:"center", marginBottom:16 }}>📊</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {[
                { label:"إجمالي الدروس", value:stats.lessons, color:C.primary },
                { label:"إجمالي التلاميذ", value:stats.students, color:C.success },
                { label:"إجمالي النشاط", value:stats.progress, color:C.accent },
                { label:"متوسط النشاط", value:stats.students ? Math.round(stats.progress/stats.students) : 0, color:"#6A1B9A" },
              ].map((s,i) => (
                <div key={i} style={{ background:C.surface2, borderRadius:14, padding:16, textAlign:"center" }}>
                  <div style={{ fontSize:24, fontWeight:900, color:s.color }}>{s.value}</div>
                  <div style={{ color:C.textMuted, fontSize:12, marginTop:4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
