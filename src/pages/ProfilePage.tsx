import { useEffect, useState } from "react";
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

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName]       = useState("");
  const [saving, setSaving]   = useState(false);
  const [points, setPoints]   = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const { data: session } = await supabase.auth.getSession();
      const user = session?.session?.user;
      if (!user) { setLoading(false); return; }
      const { data: prof } = await supabase
        .from("profiles").select("*").eq("id", user.id).single();
      const { data: prog } = await supabase
        .from("progress").select("points,completed").eq("profile_id", user.id);
      setProfile(prof);
      setName(prof?.full_name || "");
      if (prog) {
        setPoints(prog.reduce((s: number, i: any) => s + Number(i.points||0), 0));
        setCompleted(prog.filter((i: any) => i.completed).length);
      }
    } catch(e) {}
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const user = session?.session?.user;
      if (user) {
        await supabase.from("profiles").update({ full_name: name }).eq("id", user.id);
        setProfile((p: any) => ({ ...p, full_name: name }));
      }
    } catch(e) {}
    setEditing(false);
    setSaving(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/auth");
  }

  if (loading) return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, display:"grid", placeItems:"center" }}>
      <div style={{ color:C.textMuted, fontSize:16 }}>⏳ جاري التحميل...</div>
    </div>
  );

  if (!profile) return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ fontSize:64, marginBottom:16 }}>🔐</div>
      <div style={{ fontWeight:700, color:C.text, fontSize:18, marginBottom:8 }}>سجّل الدخول أولاً</div>
      <button onClick={() => navigate("/auth")}
        style={{ padding:"14px 32px", border:"none", borderRadius:14, background:C.primary, color:"white", fontFamily:"'Cairo',sans-serif", fontSize:15, fontWeight:700, cursor:"pointer" }}>
        تسجيل الدخول
      </button>
    </div>
  );

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, paddingBottom:100 }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${C.primary},${C.primaryLight})`, padding:"24px 16px 48px", borderRadius:"0 0 28px 28px" }}>
        <button onClick={() => navigate("/")}
          style={{ color:"white", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:16, fontFamily:"'Cairo',sans-serif" }}>
          ← رجوع
        </button>
        <div style={{ textAlign:"center" }}>
          <div style={{ width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"grid", placeItems:"center", fontSize:40, margin:"0 auto 12px" }}>👦</div>
          <div style={{ color:"white", fontSize:22, fontWeight:800 }}>{profile.full_name || "تلميذ"}</div>
        </div>
      </div>

      <div style={{ padding:"0 16px", marginTop:-20 }}>

        {/* الإحصائيات */}
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:18, padding:20, marginBottom:14, boxShadow:C.shadow, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", textAlign:"center" }}>
          <div>
            <div style={{ fontSize:22, fontWeight:900, color:C.accent }}>{points}</div>
            <div style={{ color:C.textMuted, fontSize:11 }}>النقاط</div>
          </div>
          <div>
            <div style={{ fontSize:22, fontWeight:900, color:C.success }}>{completed}</div>
            <div style={{ color:C.textMuted, fontSize:11 }}>مكتمل</div>
          </div>
          <div>
            <div style={{ fontSize:22, fontWeight:900, color:C.primary }}>{profile.grade || "—"}</div>
            <div style={{ color:C.textMuted, fontSize:11 }}>السنة</div>
          </div>
        </div>

        {/* تعديل الاسم */}
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:18, padding:20, marginBottom:14, boxShadow:C.shadow }}>
          <div style={{ fontWeight:700, color:C.text, fontSize:16, marginBottom:14 }}>معلوماتي</div>
          {editing ? (
            <>
              <input value={name} onChange={e => setName(e.target.value)}
                style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:`1.5px solid ${C.primary}`, fontFamily:"'Cairo',sans-serif", fontSize:14, outline:"none", marginBottom:12, boxSizing:"border-box" as any, direction:"rtl" }} />
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={handleSave} disabled={saving}
                  style={{ flex:1, padding:"11px", border:"none", borderRadius:12, background:C.success, color:"white", fontFamily:"'Cairo',sans-serif", fontSize:14, fontWeight:700, cursor:"pointer" }}>
                  {saving ? "..." : "حفظ ✓"}
                </button>
                <button onClick={() => setEditing(false)}
                  style={{ flex:1, padding:"11px", border:`1.5px solid ${C.border}`, borderRadius:12, background:"transparent", color:C.textMuted, fontFamily:"'Cairo',sans-serif", fontSize:14, cursor:"pointer" }}>
                  إلغاء
                </button>
              </div>
            </>
          ) : (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ color:C.text, fontSize:15, fontWeight:600 }}>{profile.full_name || "—"}</span>
              <button onClick={() => setEditing(true)}
                style={{ padding:"8px 16px", border:`1.5px solid ${C.border}`, borderRadius:10, background:"transparent", color:C.primary, fontFamily:"'Cairo',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                تعديل ✏️
              </button>
            </div>
          )}
        </div>

        {/* روابط */}
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:18, overflow:"hidden", marginBottom:14, boxShadow:C.shadow }}>
          {[
            { icon:"📊", label:"تقدمي", path:"/progress" },
            { icon:"⭐", label:"المفضلة", path:"/favorites" },
            { icon:"🔔", label:"الإشعارات", path:"/notifications" },
          ].map((item, i) => (
            <button key={i} onClick={() => navigate(item.path)}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:14, padding:"16px", border:"none", borderBottom: i < 2 ? `1px solid ${C.border}` : "none", background:"transparent", fontFamily:"'Cairo',sans-serif", cursor:"pointer" }}>
              <span style={{ fontSize:22 }}>{item.icon}</span>
              <span style={{ fontWeight:600, color:C.text, fontSize:15, flex:1 }}>{item.label}</span>
              <span style={{ color:C.textMuted, fontSize:18 }}>←</span>
            </button>
          ))}
        </div>

        <button onClick={handleLogout}
          style={{ width:"100%", padding:"14px", border:"none", borderRadius:16, background:"#FDECEA", color:C.error, fontFamily:"'Cairo',sans-serif", fontSize:15, fontWeight:700, cursor:"pointer" }}>
          تسجيل الخروج 🚪
        </button>
      </div>
    </div>
  );
}
