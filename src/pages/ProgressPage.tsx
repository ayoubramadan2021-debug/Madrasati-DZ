import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  accent: "#E8A020", success: "#2E7D5E",
  surface: "#FFFFFF", surface2: "#F7F9FC",
  text: "#1A2540", textMuted: "#8A97AA",
  border: "#D8E2F0", shadow: "0 2px 12px rgba(27,58,107,0.09)",
};

export default function ProgressPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) { setLoading(false); return; }
      const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(prof);
      const { data: prog } = await supabase.from("progress").select("*").eq("profile_id", user.id);
      setProgress(prog || []);
      setLoading(false);
    }
    load();
  }, []);

  const points    = progress.reduce((s, i) => s + Number(i.points || 0), 0);
  const completed = progress.filter(i => i.completed).length;
  const total     = progress.length;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, paddingBottom:32 }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${C.primary},${C.primaryLight})`, padding:"20px 16px 28px", borderRadius:"0 0 28px 28px", marginBottom:16 }}>
        <button onClick={() => navigate("/")} style={{ color:"white", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:12, fontFamily:"'Cairo',sans-serif" }}>
          ← رجوع
        </button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:48, marginBottom:8 }}>📊</div>
          <h1 style={{ margin:"0 0 4px", color:"white", fontSize:22, fontWeight:800 }}>تقدمي</h1>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13 }}>
            {profile?.full_name || "تلميذ"}
          </div>
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>

        {loading && (
          <div style={{ textAlign:"center", padding:40, color:C.textMuted }}>⏳ جاري التحميل...</div>
        )}

        {!loading && !profile && (
          <div style={{ background:C.surface, borderRadius:18, padding:24, textAlign:"center", boxShadow:C.shadow }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🔐</div>
            <div style={{ fontWeight:700, color:C.text, fontSize:16, marginBottom:8 }}>سجّل الدخول أولاً</div>
            <button onClick={() => navigate("/auth")} style={{ padding:"12px 24px", border:"none", borderRadius:12, background:C.primary, color:"white", fontFamily:"'Cairo',sans-serif", fontSize:14, fontWeight:700, cursor:"pointer" }}>
              تسجيل الدخول
            </button>
          </div>
        )}

        {!loading && profile && (
          <>
            {/* الإحصائيات */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:16 }}>
              <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderTop:`3px solid ${C.accent}`, borderRadius:14, padding:"14px 8px", textAlign:"center", boxShadow:C.shadow }}>
                <div style={{ fontSize:22, fontWeight:900, color:C.accent }}>{points}</div>
                <div style={{ color:C.textMuted, fontSize:11, marginTop:2 }}>النقاط</div>
              </div>
              <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderTop:`3px solid ${C.success}`, borderRadius:14, padding:"14px 8px", textAlign:"center", boxShadow:C.shadow }}>
                <div style={{ fontSize:22, fontWeight:900, color:C.success }}>{completed}</div>
                <div style={{ color:C.textMuted, fontSize:11, marginTop:2 }}>مكتمل</div>
              </div>
              <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderTop:`3px solid ${C.primary}`, borderRadius:14, padding:"14px 8px", textAlign:"center", boxShadow:C.shadow }}>
                <div style={{ fontSize:22, fontWeight:900, color:C.primary }}>{pct}%</div>
                <div style={{ color:C.textMuted, fontSize:11, marginTop:2 }}>التقدم</div>
              </div>
            </div>

            {/* شريط التقدم */}
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:18, padding:20, marginBottom:16, boxShadow:C.shadow }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontWeight:700, color:C.text, fontSize:14 }}>التقدم الإجمالي</span>
                <span style={{ color:C.primary, fontWeight:700, fontSize:14 }}>{completed}/{total}</span>
              </div>
              <div style={{ background:C.surface2, borderRadius:20, height:10, overflow:"hidden" }}>
                <div style={{ width:`${pct}%`, height:"100%", borderRadius:20, background:`linear-gradient(90deg,${C.primary},${C.primaryLight})`, transition:"width 0.5s" }} />
              </div>
            </div>

            {/* سجل التقدم */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <div style={{ width:4, height:20, borderRadius:4, background:C.accent }} />
              <div style={{ fontSize:18, fontWeight:700, color:C.text }}>سجل النشاط</div>
            </div>

            {progress.length === 0 && (
              <div style={{ textAlign:"center", padding:40, color:C.textMuted }}>
                <div style={{ fontSize:40 }}>📭</div>
                <div style={{ marginTop:8 }}>لا يوجد نشاط بعد</div>
              </div>
            )}

            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {progress.map((p) => (
                <div key={p.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:"14px 16px", display:"flex", alignItems:"center", gap:14, boxShadow:C.shadow }}>
                  <div style={{ width:44, height:44, borderRadius:12, background: p.completed ? "#E8F5EF" : "#EBF1FA", display:"grid", placeItems:"center", fontSize:20, flexShrink:0 }}>
                    {p.completed ? "✅" : "⏳"}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, color:C.text, fontSize:14 }}>درس {p.lesson_id}</div>
                    <div style={{ color:C.textMuted, fontSize:12, marginTop:2 }}>
                      {p.completed ? "مكتمل" : "قيد التقدم"}
                    </div>
                  </div>
                  <div style={{ fontWeight:900, color:C.accent, fontSize:16 }}>+{p.points || 0}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
